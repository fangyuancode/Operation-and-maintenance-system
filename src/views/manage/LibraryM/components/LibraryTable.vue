<template>
  <ux-grid
    class="lay-container-table"
    :border="false"
    show-overflow-tooltips
    element-loading-text="数据加载中..."
    element-loading-spinner="el-icon-loading"
    :data="dataTable"
    @current-change="currChange"
  >
    <ux-table-column title="部门" field="GroupName"> </ux-table-column>
    <ux-table-column title="材料" field="MaterialName"> </ux-table-column>
    <ux-table-column title="存放位置">
      <template slot-scope="scope">
        <span>{{ scope.row.MaterialIdTag }}</span>
      </template>
    </ux-table-column>
    <ux-table-column title="条码" field="Code"> </ux-table-column>
    <ux-table-column title="数量" field="Quantity"> </ux-table-column>
    <ux-table-column title="备注" field="Remarks"> </ux-table-column>
    <ux-table-column title="入库时间" field="EnterDateTime"> </ux-table-column>
    <ux-table-column title="入库人" field="EnterPerson"> </ux-table-column>
    <!-- <ux-table-column title="操作">
      <template slot-scope="scope">
        <el-button type="success" size="mini" icon="el-icon-check" circle v-if="scope.row.Iseditor" @click="edit(scope.row, scope)"> </el-button>
      </template>
    </ux-table-column> -->
  </ux-grid>
</template>

<script>
export default {
  name: 'LibraryTable',
  props: {
    dataTable: [], // 表格数据
  },
  data: () => {
    return {}
  },
  methods: {},
}
</script>

<style lang='scss' scoped>
</style>