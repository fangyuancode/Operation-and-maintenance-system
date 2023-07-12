<template>
  <div class="con-body">
    <div class="con-body-search"></div>
    <div class="con-body-pan">
      <CusPagination :total="totalCount" :actionBar="pageBarhandle"></CusPagination>
    </div>
  </div>
</template>

<script>
import CusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import libraryM from './components/LibraryTable.vue'
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