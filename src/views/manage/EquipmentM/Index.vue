<template>
  <div class="lay-container">
    <div class="lay-container-pan" v-show="isMain">
      <!-- START 头部搜索 -->
      <div class="lay-container-condition cus-head-search">
        <el-form size="mini" :inline="true" :model="queryform" class="demo-form-inline">
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
              <el-option v-for="item in sectionArray" v-if="item.FactoryIdTag == queryform.FactoryIdTag" :label="item.SectionName" :value="item.SectionId" :key="item.SectionId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属装置">
            <el-select v-model="queryform.DeviceIdTag" @change="dataSoure()" placeholder="">
              <el-option v-for="item in deviceArray" v-if="item.FKSectionId == queryform.SectionIdTag" :label="item.DeviceName" :value="item.DeviceId" :key="item.DeviceId"></el-option>
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
      <!-- END -->
      <!-- START 主题内容 -->
      <div class="lay-container-content">
        <div>
          <el-button type="primary" plain size="mini" @click="addFrom">新增</el-button>
          <el-button size="mini" icon="el-icon-refresh-right" @click="init"></el-button>
        </div>
        <ux-grid
          class="lay-container-table"
          :border="true"
          show-overflow-tooltips
          v-loading="loading"
          element-loading-text="数据加载中..."
          element-loading-spinner="el-icon-loading"
          :data="dataTable"
          @current-change="currChange"
        >
          <ux-table-column title="所属部门" width="12%">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.SectionIdTag" :disabled="!scope.row.Iseditor">
                <el-option v-for="item in sectionArray" :label="item.SectionName" :value="item.SectionId" :key="item.SectionId"></el-option>
              </el-select>
            </template>
          </ux-table-column>
          <ux-table-column title="装置名称" width="12%">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.DeviceIdTag" :disabled="!scope.row.Iseditor">
                <el-option v-for="item in deviceArray" :label="item.DeviceName" :value="item.DeviceId" :key="item.DeviceId"></el-option>
              </el-select>
            </template>
          </ux-table-column>
          <ux-table-column title="台账类型" width="135px">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.EquipTypeIdTag" :disabled="!scope.row.Iseditor">
                <el-option v-for="item in equipTypeArray" :label="item.EquipTypeName" :value="item.EquipTypeId" :key="item.EquipTypeId"></el-option>
              </el-select>
            </template>
          </ux-table-column>
          <ux-table-column title="设备名称" width="150px">
            <template slot-scope="scope">
              <el-input size="mini" type="text" v-model="scope.row.EquipmentName" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.EquipmentName }}</span>
            </template>
          </ux-table-column>
          <ux-table-column title="设备位号" width="135px">
            <template slot-scope="scope">
              <el-input size="mini" type="text" v-model="scope.row.EquipmentTag" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.EquipmentTag }}</span>
            </template>
          </ux-table-column>
          <ux-table-column title="EM设备号" width="100px">
            <template slot-scope="scope">
              <el-input size="mini" type="text" v-model="scope.row.EMEquipTag" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.EMEquipTag }}</span>
            </template>
          </ux-table-column>
          <ux-table-column title="台账分类" width="135px">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.EquipTypeIdTag" :disabled="!scope.row.Iseditor">
                <el-option v-for="item in equipTypeArray" :label="item.EquipTypeName" :value="item.EquipTypeId" :key="item.EquipTypeId"></el-option>
              </el-select>
            </template>
          </ux-table-column>
          <ux-table-column field="EquipAnnexCount" title="附件数" width="80px">
            <template slot-scope="scope">
              <span style="color: #55aaff; cursor: pointer; font-size: 19px; text-decoration: underline" @click="annexHandle(scope.row)">
                {{ scope.row.EquipAnnexCount }}
              </span>
            </template>
          </ux-table-column>
          <ux-table-column field="CreateDateTime" title="创建时间" width="80px"> </ux-table-column>
          <ux-table-column field="CreatePerson" title="创建人" width="80px"> </ux-table-column>
          <ux-table-column width="12%" :title="item.EquipPropertyName" v-for="item in equipPropertyArray" :key="item.EquipPropertyId">
            <template slot-scope="scope">
              <span> {{ eproValTxt(scope.row, item) }} </span>
            </template>
          </ux-table-column>
          <ux-table-column title="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="bi-steam" circle title="设备属性" @click="equProFrom(scope.row)"> </el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" circle title="编辑" @click="editFrom(scope.row, scope)"> </el-button>
              <el-button type="primary" size="mini" icon="el-icon-search" circle title="详情" @click="detailFrom(scope.row)"> </el-button>
              <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？" @confirm="del(scope.row, scope)">
                <el-button style="margin-left: 5px" slot="reference" size="mini" type="danger" title="删除" icon="el-icon-delete" circle> </el-button>
              </el-popconfirm>
            </template>
          </ux-table-column>
        </ux-grid>
      </div>
      <!-- END -->
      <cusPagination :total="totalCount" :actionBar="pageBarhandle"></cusPagination>
    </div>

    <!-- START 添加 -->
    <equipmentCreate
      :equipTypeArray="equipTypeArray"
      :equipClassifyArray="equipClassifyArray"
      :factoryArray="factoryArray"
      :sectionArray="sectionArray"
      :deviceArray="deviceArray"
      :areaArray="areaArray"
      v-if="isAddform"
      @onSubmit="addSubmit"
    >
    </equipmentCreate>
    <!-- END -->
    <!-- START 编辑 -->
    <equipmentEdit
      :equipTypeArray="equipTypeArray"
      :equipClassifyArray="equipClassifyArray"
      :factoryArray="factoryArray"
      :sectionArray="sectionArray"
      :equipmentM="equipmentM"
      :deviceArray="deviceArray"
      :areaArray="areaArray"
      v-if="isEditform"
      @onSubmit="editSubmit"
    >
    </equipmentEdit>
    <!-- END -->
    <!-- START 	设备的属性 -->
    <equipProperty :equPrVEditID="equipmentId" :equipPropertyArray="equipPropertyArray" v-if="isEquPropertyTag" @change="equProCallback"></equipProperty>
    <!-- END -->
    <!-- START 设备附件 -->
    <equipAnnex :equipId="equipmentId" v-if="isEquipAnnexTag" @change="annexCallB"></equipAnnex>
    <!-- END -->
    <!-- START 设备的详情 -->
    <equipmentDetail :equipmentM="equipmentM" :equipPropertyArray="equipPropertyArray" v-if="isDetailTag" @change="detailCallBk"></equipmentDetail>
    <!-- END -->
  </div>
</template>

<script>
import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import equipmentCreate from './components/EquipmentCreate.vue'
import equipmentEdit from './components/EquipmentEdit.vue'
import equipProperty from './components/EquipProperty.vue'
import equipAnnex from './components/EquipAnnex.vue'
import equipmentDetail from './components/EquipmentDetail.vue'

import { equipTypes, equipClassifys, factorys, sections, devices, areas } from '@/api/common.js'

export default {
  name: 'EquipmentM',
  data() {
    return {
      oldRow: '',
      dataTable: [], // 部门的表格数据
      queryform: {
        PageIndex: 1,
        PageSize: 10,
        EquipTypeIdTag: '',
        EquipClassifyIdTag: '',
        FactoryIdTag: '',
        SectionIdTag: '',
        DeviceIdTag: '',
        EquipmentTag: '',
        EquipmentName: '',
      }, // 查询模型
      loading: true, // 表单加载动画
      isMain: true, // 主窗显示
      isAddform: false, // 添加弹窗的显示
      isEditform: false, // 编辑的弹窗
      isEquPropertyTag: false, // 属性的弹窗
      isEquipAnnexTag: false, // 附件弹窗
      isDetailTag: false, // 详情的弹窗
      totalCount: 0, // 总数量
      equipTypeArray: [], // 设备类型
      equipClassifyArray: [], // 设备分类
      factoryArray: [], // 工厂
      sectionArray: [], // 工厂部门
      deviceArray: [], //装置
      areaArray: [], //区域
      equipPropertyArray: [], // 属性集合
      equipmentM: {}, // 设备模型
      equPValueArray: [], // 设备的属性值
      equipmentId: 0, //  当前操作行的设备id
    }
  },
  components: {
    cusPagination,
    equipmentCreate,
    equipmentEdit,
    equipProperty,
    equipAnnex,
    equipmentDetail,
  },
  methods: {
    init(initTag) {
      equipTypes().then((res) => {
        this.equipTypeArray = res.CurrentPageData
        if (this.equipTypeArray.length > 0) {
          console.log('初始的标记:', initTag)
          if (initTag == true) {
            this.queryform.EquipTypeIdTag = this.equipTypeArray[0].EquipTypeId
            console.log(this.equipTypeArray[0].EquipTypeId)
          }
          this.dataSoure()
          // 获取属性名称信息
          this.$api.equipPropertyM.equPropOEquPre({ equId: this.queryform.EquipTypeIdTag }).then((res) => {
            this.equipPropertyArray = res.CurrentPageData
          })
          // 获取属性值
          this.$api.equipmentM.equPropOEquPValue(this.queryform).then((res) => {
            this.equPValueArray = res.CurrentPageData
          })
        }
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
    // 分页栏的操作
    pageBarhandle(page) {
      this.queryform.PageIndex = page.pageindex
      this.queryform.PageSize = page.pagesize
      this.dataSoure()
    },
    //添加窗口
    addFrom() {
      this.isAddform = true
      this.isMain = false
    },
    // 添加窗口的回调
    addSubmit(refresh) {
      this.isAddform = false
      this.isMain = true
      if (refresh) {
        this.dataSoure()
      }
    },
    // 属性窗口打开
    equProFrom(row) {
      console.log(row)
      this.equipmentId = row.EquipmentId
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
    // 属性值修改的回调
    equProCallback() {
      this.isMain = true
      this.isEquPropertyTag = false
      // 获取属性值
      this.$api.equipmentM.equPropOEquPValue(this.queryform).then((res) => {
        console.log('属性值获取', res)
        this.equPValueArray = res.CurrentPageData
      })
    },
    // 编辑
    editFrom(row) {
      this.equipmentM = JSON.parse(JSON.stringify(row))
      this.isMain = false
      this.isEditform = true
    },
    // 编辑设备类型
    editSubmit(row, scope) {
      this.isEditform = false
      this.isMain = true
      this.dataSoure()
    },
    // 附件数量的点击
    annexHandle(row) {
      console.log(row)
      this.equipmentId = row.EquipmentId
      this.isMain = false
      this.isEquipAnnexTag = true
    },
    // 附件的回调
    annexCallB() {
      this.isMain = true
      this.isEquipAnnexTag = false
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
    // 详情界面的回调
    detailCallBk() {
      this.isDetailTag = false
      this.isMain = true
    },
    //删除
    del(row, scope) {
      this.$api.equipmentM
        .remove({
          id: row.SectionId,
        })
        .then((res) => {
          this.$layer.msgSuccess(res)
          this.dataSoure()
        })
    },
    // 数据
    async dataSoure() {
      this.loading = true
      await this.$api.equipmentM
        .query(this.queryform)
        .then((res) => {
          this.dataTable = res.CurrentPageData
          this.totalCount = res.TotalCount
        })
        .finally((f) => {
          this.loading = false
        })
    },
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
     * @param {Object} equId 设备
     * @param {Object} epId 设备属性
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
  mounted() {
    this.init(true)
  },
}
</script>

<style scoped="scoped">
.cus-head-search {
  position: relative;
}

.cus-btn-icon {
  position: absolute;
  cursor: pointer;
  font-size: 18px;
}

.span-edit {
  position: absolute;
  width: 42px;
  height: 26px;
  z-index: 99;
}
</style>