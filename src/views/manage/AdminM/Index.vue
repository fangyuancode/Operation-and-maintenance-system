<template>
  <div class="lay-container">
    <div class="lay-container-pan" v-show="isMain">
      <!-- START 头部搜索 -->
      <div class="lay-container-condition">
        <el-form class="lay-con-form" :inline="true" :model="queryform">
          <el-form-item label="部门">
            <el-select v-model="queryform.AdminGroupIDTag" placeholder="" @change="dataSoure">
              <el-option class="option-form" label="全部" value=""></el-option>
              <el-option :label="item.GroupName" :value="item.GroupId" v-for="item in eData.groupList" :key="item.GroupId"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="queryform.RoleId" placeholder="" @change="dataSoure">
              <el-option class="option-form" label="全部" value=""></el-option>
              <el-option :label="item.RoleName" :value="item.RoleId" v-for="item in eData.roleList" :key="item.RoleId"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="queryform.AdminName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="dataSoure">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- END -->
      <!-- START 主题内容 -->
      <div class="lay-container-content">
        <div>
          <el-button type="primary" plain size="mini" @click="addForm">新增</el-button>
          <el-button size="mini" icon="el-icon-refresh-right" @click="dataSoure"></el-button>
        </div>
        <ux-grid
          class="lay-container-table"
          :border="false"
          show-overflow-tooltips
          v-loading="loading"
          element-loading-text="数据加载中..."
          element-loading-spinner="el-icon-loading"
          :data="dataTable"
        >
          <ux-table-column field="Account" title="账号"> </ux-table-column>
          <ux-table-column field="AccName" title="姓名"> </ux-table-column>
          <ux-table-column field="AdminRoleName" title="角色名称"> </ux-table-column>
          <ux-table-column field="AdminGroupName" title="部门"></ux-table-column>
          <ux-table-column field="Email" title="邮箱"> </ux-table-column>
          <ux-table-column field="AdminLastDateString" title="最后登录时间"> </ux-table-column>
          <ux-table-column field="LastLogIP" title="登录IP"> </ux-table-column>
          <ux-table-column title="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handletableCol('edit', scope.row)"> </el-button>
              <el-tooltip content="重置密码" placement="top" effect="light">
                <el-button size="mini" type="info" icon="el-icon-key" circle @click="handletableCol('reset', scope.row)"> </el-button>
              </el-tooltip>
              <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？" @confirm="handletableCol('del', scope.row)">
                <el-button style="margin-left: 5px" slot="reference" size="mini" type="danger" icon="el-icon-delete" circle> </el-button>
              </el-popconfirm>
            </template>
          </ux-table-column>
        </ux-grid>
      </div>
      <cusPagination :total="totalCount" :actionBar="pageBarhandle"></cusPagination>
    </div>
    <!-- END -->
    <!-- START 添加 -->
    <adminCreate v-if="isAddform" :onSubmit="addSubmit" :eData="eData"></adminCreate>
    <!-- END 添加 -->
    <!-- START 编辑 -->
    <adminEdit v-if="isEditform" :onSubmit="editSubmit" :eData="eData"></adminEdit>
    <!-- END 编辑 -->
  </div>
</template>

<script>
import { roles, groups } from '@/api/common.js'
import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import adminCreate from './components/AdminCreate.vue'
import adminEdit from './components/AdminEdit.vue'

export default {
  name: 'AdminM',
  data() {
    return {
      queryform: {
        AdminName: '',
        AdminAcc: '',
        RoleId: '',
        AdminGroupIDTag: '',
      },
      eData: {
        dataObj: {},
        roleList: [],
        groupList: [],
      },
      dataTable: [], // 数据
      page: {
        pageindex: 1,
        pagesize: 10,
      }, //分页
      totalCount: 0,
      loading: true, // 表单加载动画
      isMain: true, //主窗口
      isAddform: false, // 添加弹窗的显示
      isEditform: false, // 编辑窗口
    }
  },
  components: {
    cusPagination,
    adminCreate,
    adminEdit,
  },
  methods: {
    init() {
      roles().then((res) => {
        this.eData.roleList = res.CurrentPageData
      })
      groups().then((res) => {
        this.eData.groupList = res.CurrentPageData
      })
      this.dataSoure()
    },
    // 分页栏的操作
    pageBarhandle(page) {
      this.page.pageindex = page.pageindex
      this.page.pagesize = page.pagesize
      this.dataSoure()
    },
    // 添加
    addForm() {
      this.isAddform = true
      this.isMain = false
    },
    // 添加回调
    addSubmit(refresh) {
      this.isAddform = false
      this.isMain = true
      if (refresh) {
        this.dataSoure()
      }
    },
    // 编辑回调
    editSubmit(refresh) {
      this.isEditform = false
      this.isMain = true
      if (refresh) {
        this.dataSoure()
      }
    },
    // 表单的操作栏
    handletableCol(type, row) {
      console.log(row)
      if (type == 'edit') {
        this.eData.dataObj = row
        this.isEditform = true
        this.isMain = false
      } else if (type == 'reset') {
        this.$confirm('确定重置密码？', '信息提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$api.adminM
              .resetPwd({
                id: row.AdminId,
              })
              .then((res) => {
                this.$layer.msgSuccess(res)
              })
          })
          .catch(() => {})
      } else if (type == 'del') {
        this.$api.adminM
          .remove({
            id: row.AdminId,
          })
          .then((res) => {
            this.$layer.msgSuccess(res)
            this.dataSoure()
          })
          .catch(() => {})
      }
    },
    // 数据
    dataSoure() {
      this.loading = true
      let data = {
        PageIndex: this.page.pageindex,
        PageSize: this.page.pagesize,
        AdminName: this.queryform.AdminName,
        RoleId: this.queryform.RoleId,
        AdminGroupIDTag: this.queryform.AdminGroupIDTag,
      }
      this.$api.adminM
        .queryMore(data)
        .then((res) => {
          this.totalCount = res.TotalCount
          this.dataTable = res.CurrentPageData
          this.dataTable.forEach((item) => {
            let temp = this.eData.groupList.find((g) => g.GroupId == item.AdminGroupIDTag)
            if (item.AdminGroupIDTag <= 0) {
              item.AdminGroupName = '未分部门'
            } else {
              item.AdminGroupName = temp.GroupName
            }
          })
        })
        .finally((f) => {
          this.loading = false
        })
    },
  },
  beforeMount() {
    this.init()
  },
}
</script>

<style scoped="scoped">
</style>
