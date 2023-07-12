<template>
  <div class="con-body">
    <div class="con-body-search">
      <el-form size="mini" :inline="true" :model="queryform">
        <el-form-item label="台账类型">
          <el-select v-model="queryform.EquipTypeIdTag" @change="init(false)" placeholder="">
            <el-option v-for="item in equipTypeArray" :label="item.EquipTypeName" :value="item.EquipTypeId" :key="item.EquipTypeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备分类">
          <el-select v-model="queryform.EquipClassifyIdTag" @change="dataSoure" placeholder="">
            <el-option v-for="item in equipClassifyArray" :label="item.EquipClassifyName" :value="item.EquipClassifyId" :key="item.EquipClassifyId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属工厂">
          <el-select v-model="queryform.FactoryIdTag" @change="fsdLink('fact')" placeholder="">
            <el-option v-for="item in factoryArray" :label="item.FactoryName" :value="item.FactoryId" :key="item.FactoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="queryform.SectionIdTag" @change="fsdLink('sect')" placeholder="">
            <template v-for="item in sectionArray">
              <el-option v-if="item.FactoryIdTag == queryform.FactoryIdTag" :label="item.SectionName" :value="item.SectionId" :key="item.SectionId"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="所属装置">
          <el-select v-model="queryform.DeviceIdTag" @change="dataSoure()" placeholder="">
            <template v-for="item in deviceArray">
              <el-option v-if="item.FKSectionId == queryform.SectionIdTag" :label="item.DeviceName" :value="item.DeviceId" :key="item.DeviceId"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="设备位号">
          <el-input style="width: 206px" v-model="queryform.EquipmentTag"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input style="width: 206px" v-model="queryform.EquipmentName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="dataSoure"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <hr style="height: 1px; border: none; border-top: 1px solid #dcdfe6" />
    <div>
      <el-button size="mini" icon="el-icon-refresh-right" @click="init"></el-button>
    </div>
    <div class="con-body-pan">
      <EquipmentTable
        v-loading="loading"
        :equipTypeArray="equipTypeArray"
        :equipClassifyArray="equipClassifyArray"
        :sectionArray="sectionArray"
        :deviceArray="deviceArray"
        :dataTable="dataTable"
        :equipPropertyArray="equipPropertyArray"
        :equPValueArray="equPValueArray"
        :annexHandle="annexHandle"
      >
        <ux-table-column title="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="bi-steam" circle title="设备属性" @click="equProFrom(scope.row)"> </el-button>
            <el-button type="primary" size="mini" icon="el-icon-search" circle title="查看" @click="lookForm(scope.row)"> </el-button>
            <el-button type="primary" size="mini" icon="bi-card-list" circle title="详情" @click="detailFrom(scope.row)"> </el-button>
          </template>
        </ux-table-column>
      </EquipmentTable>
      <CusPagination :total="totalCount" :actionBar="pageBarhandle"></CusPagination>
    </div>
    <el-dialog title="附件" :visible.sync="isEquipAnnexTag" width="70%" :lock-scroll="false" append-to-body>
      <EquipAnnex v-if="isEquipAnnexTag" :equipId="equipId"></EquipAnnex>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEquipAnnexTag = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="isLookFormTag" width="70%">
      <LookForm
        v-if="isLookFormTag"
        :equipTypeArray="equipTypeArray"
        :equipClassifyArray="equipClassifyArray"
        :factoryArray="factoryArray"
        :sectionArray="sectionArray"
        :equipmentM="equipmentM"
        :deviceArray="deviceArray"
        :areaArray="areaArray"
      ></LookForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isLookFormTag = false">关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="属性" :visible.sync="isEquPropertyTag" width="70%">
      <EquipProperty v-if="isEquPropertyTag" :equipPropertyArray="equipPropertyArray"></EquipProperty>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEquPropertyTag = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="isDetailTag" width="90%" fullscreen>
      <EquipmentDetail v-if="isDetailTag" :equipmentM="equipmentM" :equipPropertyArray="equipPropertyArray"></EquipmentDetail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDetailTag = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { equipTypes, equipClassifys, factorys, sections, devices, areas } from '@/api/common.js'
import { equQuery, equProInfo, equPValue } from '@/api/front/equipment'

import CusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import EquipmentTable from './components/EquipmentTable.vue'
import EquipAnnex from './components/EquipAnnex.vue'
import EquipProperty from './components/EquipProperty.vue'
import EquipmentDetail from './components/EquipmentDetail.vue'
import LookForm from './components/LookForm.vue'

export default {
  name: 'Equipment',
  data() {
    return {
      loading: true, // 表单加载动画
      equipTypeArray: [], // 设备类型
      equipClassifyArray: [], // 设备分类
      factoryArray: [], // 工厂
      sectionArray: [], // 工厂部门
      deviceArray: [], //装置
      areaArray: [], //区域
      equPValueArray: [], // 设备的属性值
      equipPropertyArray: [], // 属性集合
      equipPropertyArray: [], // 属性集合
      dataTable: [],
      totalCount: 0, // 表格数据大小
      queryform: { PageIndex: 1, PageSize: 10 },
      equipId: 0, // 台账id
      isMain: true, // 主窗体显示标记
      isLookFormTag: false, // 查看窗口标记
      isEquipAnnexTag: false, // 附件窗体显示标记
      isEquPropertyTag: false, // 属性窗口
      isDetailTag: false, // 详情的弹窗
      equipmentM: {}, // 设备模型
    }
  },
  components: {
    EquipAnnex,
    EquipmentTable,
    CusPagination,
    EquipProperty,
    EquipmentDetail,
    LookForm,
  },
  methods: {
    init(initTag) {
      equipTypes().then((res) => {
        this.equipTypeArray = res.CurrentPageData
        if (this.equipTypeArray.length < 0) {
          return
        }
        console.log('初始的标记:', initTag)
        if (initTag == true) {
          this.queryform.EquipTypeIdTag = this.equipTypeArray[0].EquipTypeId
          console.log(this.equipTypeArray[0].EquipTypeId)
        }
        this.dataSoure()
        console.log(this.queryform)
        // 获取属性名称信息
        equProInfo({ equId: this.queryform.EquipTypeIdTag }).then((res) => {
          this.equipPropertyArray = res.CurrentPageData
        })
        // 获取属性值
        equPValue(this.queryform).then((res) => {
          this.equPValueArray = res.CurrentPageData
        })
      })
      equipClassifys().then((res) => {
        this.equipClassifyArray = res.CurrentPageData
      })
      factorys().then((res) => {
        this.factoryArray = res.CurrentPageData
      })
      sections().then((res) => {
        this.sectionArray = res.CurrentPageData
      })
      devices().then((res) => {
        this.deviceArray = res.CurrentPageData
      })
      areas().then((res) => {
        this.areaArray = res.CurrentPageData
      })
    },
    // 附件数量的点击
    annexHandle(row) {
      this.equipId = row.EquipmentId
      this.isMain = false
      this.isEquipAnnexTag = true
    },
    // 查看的窗口
    lookForm(row) {
      this.equipmentM = row
      this.isMain = false
      this.isLookFormTag = true
    },
    // 查看的回滚
    lookFormCallB() {
      this.isLookFormTag = false
      this.isMain = true
    },
    // 属性窗口打开
    equProFrom(row) {
      this.equipId = row.EquipmentId
      // 属性与其对应的值
      this.equipPropertyArray.forEach((item) => {
        let eqpVal = this.equPValueArray.filter((ep) => ep.FKEquipId == row.EquipmentId && ep.EquipPropertyIDTag == item.EquipPropertyId)
        if (eqpVal[0]) {
          this.$set(item, 'EquipPropValue', eqpVal[0].EquipPropValue)
        } else this.$set(item, 'EquipPropValue', '')
      })
      this.isMain = false
      this.isEquPropertyTag = true
    },
    // 分页栏的操作
    pageBarhandle(page) {
      this.queryform.PageIndex = page.pageindex
      this.queryform.PageSize = page.pagesize
      this.dataSoure()
    },
    // 详情
    detailFrom(row) {
      var equModel = JSON.parse(JSON.stringify(row))
      var equtype = this.equipTypeArray.filter((e) => e.EquipTypeIdTag == equModel.EquipTypeId)
      if (equtype[0]) {
        this.$set(equModel, 'EquipTypeName', equtype[0].EquipTypeName)
      }
      var equClass = this.equipClassifyArray.filter((e) => e.EquipClassifyIdTag == equModel.EquipClassifyId)
      if (equClass[0]) {
        equModel.EquipClassifyName = equClass[0].EquipClassifyName
      }
      var factory = this.factoryArray.filter((f) => f.FactoryIdTag == equModel.FactoryId)
      if (factory[0]) {
        equModel.FactoryName = factory[0].FactoryName
      }
      var section = this.sectionArray.filter((f) => f.SectionIdTag == equModel.SectionId)
      if (section[0]) {
        equModel.SectionName = section[0].SectionName
      }
      var device = this.deviceArray.filter((f) => f.DeviceIdTag == equModel.DeviceId)
      if (device[0]) {
        equModel.DeviceName = device[0].DeviceName
      }
      var area = this.areaArray.filter((f) => f.AreaIdTag == equModel.AreaId)
      if (area[0]) {
        equModel.AreaName = area[0].AreaName
      }
      console.log(equModel)
      this.equipmentM = equModel
      // 属性与其对应的值
      this.equipPropertyArray.forEach((item) => {
        let eqpVal = this.equPValueArray.filter((ep) => ep.FKEquipId == row.EquipmentId && ep.EquipPropertyIDTag == item.EquipPropertyId)
        if (eqpVal[0]) {
          this.$set(item, 'EquipPropValue', eqpVal[0].EquipPropValue)
        } else this.$set(item, 'EquipPropValue', '')
      })
      this.isDetailTag = true
      this.isMain = false
    },
    /* 表格数据源 */
    dataSoure(data) {
      this.loading = true
      equQuery(this.queryform)
        .then((res) => {
          this.dataTable = res.CurrentPageData
          this.totalCount = res.TotalCount
        })
        .finally((f) => {
          this.loading = false
        })
    },
    // 行选中事件
    currChange(curr) {
      this.dataTable.forEach((d) => {
        if (d.Iseditor && d.EquipmentId != curr.EquipmentId) {
          d.Iseditor = false
        }
      })
    },
    /**
     * 工厂、部门、装置的联动
     * @param {Object} tag
     */
    fsdLink(tag) {
      switch (tag) {
        case 'fact':
          this.queryform.SectionIdTag = ''
          this.queryform.DeviceIdTag = ''
          this.dataSoure()
          break
        case 'sect':
          this.queryform.DeviceIdTag = ''
          this.dataSoure()
          break
        default:
          break
      }
    },
    /**
     * 属性值的获取
     *   equId 设备
     *   epId 设备属性
     */
    eproValTxt(equ, epty) {
      var equId = equ.EquipmentId
      var epId = epty.EquipPropertyId
      if (this.equPValueArray.length < 0) {
        return ''
      }
      let epVal = this.equPValueArray.filter((ep) => ep.FKEquipId == equId && ep.EquipPropertyIDTag == epId)
      return epVal[0] ? epVal[0].EquipPropValue : ''
    },
  },
  created() {
    this.init(true)
  },
}
</script>

<style lang="scss" scoped>
</style>