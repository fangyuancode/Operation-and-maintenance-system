<template>
  <div class="lay-container">
    <div class="lay-container-pan">
      <div class="lay-container-condition">
        <h3>库存管理</h3>
      </div>
      <div class="lay-container-content">
        <!-- <div>
          <el-button type="primary" plain size="mini" @click="addFrom">新增</el-button>
          <el-button size="mini" icon="el-icon-refresh-right" @click="init"></el-button>
        </div> -->
        <LibraryTable :dataTable="dataTable"></LibraryTable>
        <CusPagination :total="totalCount" :actionBar="pageBarhandle"></CusPagination>
      </div>
    </div>
  </div>
</template>

<script>
import CusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import LibraryTable from './components/LibraryTable.vue'
export default {
  name: 'LibraryM',
  data: () => {
    return {
      dataTable: [], // 部门的表格数据
      queryform: {
        PageIndex: 1,
        PageSize: 10,
      },
      totalCount: 0,
    }
  },
  components: {
    LibraryTable,
    CusPagination,
  },
  methods: {
    init() {
      this.dataSoure()
    },
    // 分页栏的操作
    pageBarhandle(page) {
      this.queryform.PageIndex = page.pageindex
      this.queryform.PageSize = page.pagesize
      this.dataSoure()
    },
    // 数据
    async dataSoure() {
      this.loading = true
      console.log(this.$api.libraryM)
      await this.$api.libraryM
        .query(this.queryform)
        .then((res) => {
          console.log('----', res)
          this.dataTable = res.CurrentPageData
          this.totalCount = res.TotalCount
        })
        .finally((f) => {
          this.loading = false
        })
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang='scss' scoped>
</style>