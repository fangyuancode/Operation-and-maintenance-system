<template>
  <el-pagination
    class="lay-con-pagin"
    :class="{ 'page-shadow': true }"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="curPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
/* 分页组件 */
export default {
  name: 'CusPagination',
  props: {
    /*总数*/
    total: {
      type: Number,
      required: true,
    },
    // 当前页数
    currentPage: {
      type: Number,
      default: 1,
    },
    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default: () => [10, 50, 100, 200, 300, 500],
    },
    // 每页显示条目个数，支持 .sync 修饰符
    pageSize: {
      type: Number,
      default: 10,
    },
    // 设置当前显示的页面
    currentChange: {
      type: Function,
      default: () => {},
    },
    // 设置每页显示的条数
    sizeChange: {
      type: Function,
      default: () => {},
    },
    actionBar: {
      type: Function,
      default: () => {},
    },
	// 阴影
    shadow: true,
  },
  data() {
    return {
      page: {
        pageindex: 1,
        pagesize: 10,
      },
      curPage: 1,
    }
  },
  methods: {
    // 设置每页显示的条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page.pagesize = val
      this.actionBar(this.page)
    },
    // 设置当前显示的页面
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page.pageindex = val
      this.actionBar(this.page)
    },
  },
  watch: {
    curPage: {
      handler(nVal, oVal) {
        console.log('改变：', nVal, oVal)
        this.page.pageindex = nVal
        this.actionBar(this.page)
      },
    },
  },
  created() {
    this.curPage = this.currentPage
  },
}
</script>

<style>

</style>
