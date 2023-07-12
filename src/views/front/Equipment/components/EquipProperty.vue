<template>
  <div class="lay-con-layer">
    <ux-grid
      class="lay-container-table cus-property-table"
      :border="false"
      show-overflow-tooltips
      v-loading="loading"
      element-loading-text="数据加载中..."
      element-loading-spinner="el-icon-loading"
      :data="dataTable"
    >
      <ux-table-column field="EquipPropertyName" title="属性名称"> </ux-table-column>
      <ux-table-column field="EquipPropertyUnit" title="属性单位"> </ux-table-column>
      <ux-table-column field="EquipPropValue" title="属性值">
        <template slot-scope="scope">
          <el-input style="max-width: 150px" v-model="scope.row.EquipPropValue" v-show="scope.row.Iseditor" size="mini"></el-input>
          <span v-show="!scope.row.Iseditor">{{ scope.row.EquipPropValue }}</span>
        </template>
      </ux-table-column>
    </ux-grid>
  </div>
</template>

<script>
/**
 * 存储设备属性信息
 * @param {Number} equPrVEditID  设备id
 * @param {Array}  equipPropertyArray  设备的属性信息
 */
export default {
  name: 'EquipProperty',
  props: {
    equPrVEditID: {
      type: Number,
      default: 0,
    },
    equipPropertyArray: {
      type: Array,
      default: [],
    },
    detailTag: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      loading: false,
      dataTable: [],
      oldRow: '',
    }
  },
  methods: {
    init() {
      if (this.equipPropertyArray) {
        this.dataTable = JSON.parse(JSON.stringify(this.equipPropertyArray))
      }
    },
    closeFrom() {
      this.$emit('change')
    },
  },
  mounted() {
    console.log(this.detailTag)
  },
  created() {
    this.init()
  },
}
</script>

<style lang='scss' scoped>
.cus-property-table {
  height: calc(100% - 30px);
}
</style>