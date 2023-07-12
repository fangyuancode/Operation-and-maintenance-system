<template>
  <div class="lay-container">
    <div class="lay-container-pan" v-show="isMain">
      <!-- START 头部搜索 -->
      <div class="lay-container-condition">
        <h3>制造商管理</h3>
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
          :border="false"
          show-overflow-tooltips
          v-loading="loading"
          element-loading-text="数据加载中..."
          element-loading-spinner="el-icon-loading"
          :data="dataTable"
          @current-change="currChange"
        >
          <ux-table-column title="制造商名" field="ManufacturerName">
            <template slot-scope="scope">
              <input class="input-edit" type="text" v-model="scope.row.ManufacturerName" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.ManufacturerName }}</span>
            </template>
          </ux-table-column>
          <ux-table-column title="制造商电话" field="Telephone">
            <template slot-scope="scope">
              <input class="input-edit" type="text" v-model="scope.row.Telephone" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.Telephone }}</span>
            </template>
          </ux-table-column>
          <ux-table-column title="制造商联系人" field="ContactPerson">
            <template slot-scope="scope">
              <input class="input-edit" type="text" v-model="scope.row.ContactPerson" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.ContactPerson }}</span>
            </template>
          </ux-table-column>

          <ux-table-column title="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle v-if="!scope.row.Iseditor" @click="edit(scope.row, scope)"> </el-button>
              <el-button type="success" size="mini" icon="el-icon-check" circle v-if="scope.row.Iseditor" @click="edit(scope.row, scope)"> </el-button>
              <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？" @confirm="del(scope.row, scope)">
                <el-button style="margin-left: 5px" slot="reference" size="mini" type="danger" icon="el-icon-delete" circle> </el-button>
              </el-popconfirm>
            </template>
          </ux-table-column>
        </ux-grid>
      </div>
      <!-- END -->
      <cusPagination :total="totalCount" :actionBar="pageBarhandle"></cusPagination>
    </div>

    <!-- START 添加 -->
    <Create @change="addSubmit" v-if="isAddform"></Create>
    <!-- END -->
  </div>
</template>

<script>
import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import Create from './components/Create.vue'
export default {
  name: 'ManufacturerM',
  data() {
    return {
      oldRow: '',
      dataTable: [], // 部门的表格数据
      queryform: {
        PageIndex: 1,
        PageSize: 10,
      },
      loading: true, // 表单加载动画
      isMain: true, //主窗显示
      isAddform: false, // 添加弹窗的显示
      totalCount: 0,
    }
  },
  components: {
    cusPagination,
    Create,
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
    // 编辑
    edit(row, scope) {
      if (row.Iseditor) {
        if (this.$verifiy.textValid(row.ManufacturerName, 30, '制造商名')) {
          return
        }
        if (this.$verifiy.textValid(row.Telephone, 20, '制造商电话')) {
          return
        }
        if (this.$verifiy.textValid(row.ContactPerson, 20, '制造商联系人')) {
          return
        }
        if (JSON.stringify(row) != this.oldRow) {
          this.$api.manufacturerM
            .update(row)
            .then((res) => {
              this.$layer.msgSuccess(res)
            })
            .catch((err) => {})
        }
        this.$set(row, 'Iseditor', false)
      } else {
        this.$set(row, 'Iseditor', true)
        this.oldRow = JSON.stringify(row)
      }
    },
    //删除
    del(row, scope) {
      this.$api.manufacturerM
        .remove({
          id: row.ManufacturerId,
        })
        .then((res) => {
          this.$layer.msgSuccess(res)
          this.dataSoure()
        })
    },
    // 数据
    async dataSoure() {
      this.loading = true
      await this.$api.manufacturerM
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
        if (d.Iseditor && d.ManufacturerId != curr.ManufacturerId) {
          d.Iseditor = false
        }
      })
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped="scoped">
.span-edit {
  position: absolute;
  width: 42px;
  height: 26px;
  z-index: 99;
}
</style>