<template>
  <div class="lay-container">
    <div class="lay-container-pan" v-show="isMain">
      <!-- START 头部搜索 -->
      <div class="lay-container-condition">
        <el-form class="lay-con-form" :inline="true" :model="queryform">
          <el-form-item label="角色名">
            <el-input v-model="queryform.RoleName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="dataSoure">查 询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- END 头部搜索 -->
      <!-- START 主体内容 -->
      <div class="lay-container-content">
        <div>
          <el-button type="primary" plain size="mini" @click="addForm">新增</el-button>
          <el-button size="mini" icon="el-icon-refresh-right" @click="dataSoure"></el-button>
        </div>
        <el-table
          class="lay-container-table"
          v-loading="loading"
          element-loading-text="数据加载中..."
          highlight-current-row
          show-overflow-tooltips
          element-loading-spinner="el-icon-loading"
          :data="dataTable"
          @current-change="currChange"
        >
          <el-table-column label="角色名称">
            <template slot-scope="scope">
              <input class="input-edit" type="text" v-model="scope.row.RoleName" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.RoleName.trim() }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色状态">
            <template slot-scope="scope">
              <span class="span-edit" v-show="!scope.row.Iseditor"></span>
              <el-switch v-model="scope.row.IsRoleState"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="角色描述">
            <template slot-scope="scope">
              <input class="input-edit" type="text" v-model="scope.row.Description" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.Description.trim() }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip content="权限配置" placement="bottom" effect="light">
                <el-button type="warning" size="mini" icon="el-icon-setting" circle @click="accessSet(scope.row, scope)"></el-button>
              </el-tooltip>
              <el-button type="primary" size="mini" icon="el-icon-edit" circle v-if="!scope.row.Iseditor" @click="edit(scope.row, scope)">
              </el-button>
              <el-button type="success" size="mini" icon="el-icon-check" circle v-if="scope.row.Iseditor" @click="edit(scope.row, scope)">
              </el-button>
              <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？" @confirm="del(scope.row, scope)">
                <el-button style="margin-left: 5px" slot="reference" size="mini" type="danger" icon="el-icon-delete" circle> </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <cusPagination :total="TotalCount" :actionBar="pageBarhandle"></cusPagination>
      </div>
      <!-- END  -->
    </div>
    <!-- START 权限分配 -->
    <accessSet v-if="isAccessSetfrom" :rId="rId" :onSubmit="accSetSubmit"></accessSet>
    <!-- END -->
    <!-- START 添加 -->
    <roleCreate v-if="isAddform" :onSubmit="addRoleHandle"></roleCreate>
    <!-- END -->
  </div>
</template>

<script>
import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import roleCreate from './components/RoleCreate.vue'
import accessSet from './components/AccessSet.vue'

export default {
  name: 'RoleM',
  data() {
    return {
      queryform: {
        RoleName: '',
      },
      loading:true,
      dataTable: [], // 角色的数据，
      page: {
        pageindex: 1,
        pagesize: 10,
      }, //分页
      TotalCount: 0,
      isMain: true, //主窗口
      isAddform: false, // 添加角色的弹窗的显示
      isAccessSetfrom: false, //配置权限窗口
      rId: '',
    }
  },
  components: {
    cusPagination,
    roleCreate,
    accessSet,
  },
  methods: {
    // 添加角色
    addForm() {
      this.isAddform = true
      this.isMain = false
    },
    // 添加角色回调
    addRoleHandle(valid) {
      this.isAddform = false
      this.isMain = true
      if (valid) {
        this.dataSoure()
      }
    },
    //权限分配
    accessSet(row) {
      this.rId = row.RoleId
      this.isAccessSetfrom = true
      this.isMain = false
    },
    // 权限分配的回调函数
    accSetSubmit() {
      this.isAccessSetfrom = false
      this.isMain = true
    },
    // 编辑
    edit(row, scope) {
      if (row.Iseditor) {
        if (this.$verifiy.textValid(row.RoleName, 20)) {
          return
        }
        if (this.$verifiy.textValid(row.Description, 100)) {
          return
        }
        if (JSON.stringify(row) != this.oldRow) {
          this.$api.roleM
            .update(row)
            .then((res) => {
              this.$layer.msgSuccess(res)
            })
            .catch((err) => {})
        }
        row.Iseditor = false
      } else {
        row.Iseditor = true
        this.oldRow = JSON.stringify(row)
      }
    },
    //删除
    del(row, scope) {
      this.$api.roleM
        .remove({
          id: row.RoleId,
        })
        .then((res) => {
          this.$layer.msgSuccess(res)
          this.dataSoure()
        })
    },
    currChange(curr, old) {
      if (old != null && old.Iseditor) {
        old.Iseditor = false
      }
    },
    // 分页栏的操作
    pageBarhandle(page) {
      this.page.pageindex = page.pageindex
      this.page.pagesize = page.pagesize
      this.dataSoure()
    },
    async dataSoure() {
      this.loading = true
      await this.$api.roleM
        .queryMore({
          PageIndex: this.page.pageindex,
          PageSize: this.page.pagesize,
          RoleName: this.queryform.RoleName,
        })
        .then((res) => {
          this.dataTable = res.CurrentPageData
          this.TotalCount = res.TotalCount
        }).catch(()=>{}).finally((f) => {
          this.loading = false
        })
    },
  },
  mounted() {
     this.dataSoure()
  },
}
</script>

<style scoped="scoped">
</style>
