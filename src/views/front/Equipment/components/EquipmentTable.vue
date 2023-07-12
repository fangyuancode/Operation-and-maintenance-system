<template>
  <ux-grid class="con-body-table" :border="false" show-overflow-tooltips element-loading-text="数据加载中..." element-loading-spinner="el-icon-loading" :data="dataTable">
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
       <!--  <el-select size="mini" v-model="scope.row.EquipTypeIdTag" >
          <el-option v-for="item in equipTypeArray" :label="item.EquipTypeName" :value="item.EquipTypeId" :key="item.EquipTypeId"></el-option>
        </el-select> -->

         <el-select  v-model="scope.row.EquipTypeIdTag" :disabled="!scope.row.Iseditor"    placeholder="">
            <el-option v-for="item in equipClassifyArray" :label="item.EquipClassifyName" :value="item.EquipClassifyId" :key="item.EquipClassifyId"></el-option>
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
    <slot v-solt="scope"></slot>
  </ux-grid>
</template>

<script>
export default {
  name: '',
  props: {
    dataTable: [],
    equipTypeArray: [], // 设备类型
    equipClassifyArray: [], // 设备分类
    sectionArray: [], // 工厂部门
    deviceArray: [], //装置
    areaArray: [], //区域
    equipPropertyArray: [], // 属性名称
    equPValueArray: [], // 属性值
    annexHandle: Function, // 附件点击事件
  },
  data: () => {
    return {}
  },
  methods: {
    /*  annexHandle(row) {
      this.$emit('annexHandle', row)
    }, */
    //  行选中事件
    currChange(curr) {
      this.$emit('currChange', curr)
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
}
</script>

<style lang='scss' scoped>
</style>