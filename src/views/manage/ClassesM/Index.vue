<template>
  <div class="lay-container">
    <div class="lay-container-pan" v-show="isMain">
      <!-- START 头部搜索 -->
      <div class="lay-container-condition">
        <el-form class="lay-con-form" :inline="true" :model="queryform">
          <el-form-item>
            <el-select v-model="queryform.GroupId" @change="dataSoure">
              <el-option v-if="isManage" label="全部" value=""></el-option>
              <el-option :label="item.GroupName" :value="item.GroupId" v-for="item in groupList" :key="item.GroupId"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班组名">
            <el-input v-model="queryform.ClassesName"></el-input>
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
          <el-button size="mini" @click="synchron()">手动同步</el-button>
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
          <ux-table-column title="班组名称">
            <template slot-scope="scope">
              <input class="input-edit" type="text" v-model="scope.row.ClassesName" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.ClassesName.trim() }}</span>
            </template>
          </ux-table-column>
          <ux-table-column title="状态">
            <template slot-scope="scope">
              <span class="span-edit" v-show="!scope.row.Iseditor"></span>
              <el-switch v-model="scope.row.IsClassesState"></el-switch>
            </template>
          </ux-table-column>
          <ux-table-column field="UserNumber" title="用户数"> </ux-table-column>
          <ux-table-column label="部门">
            <template slot-scope="scope">
              <span class="span-edit" v-show="!scope.row.Iseditor"></span>
              <el-select size="small" style="width: 120px" v-model="scope.row.FKGroupId">
                <el-option :label="item.GroupName" :value="item.GroupId" v-for="item in groupList" :key="item.GroupId"> </el-option>
              </el-select>
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
      <cusPagination :total="totalCount" :actionBar="pageBarhandle"></cusPagination>
      <!-- END 主体内容 -->
    </div>
    <create v-if="isAddform" :onSubmit="addSubmit" :groups="groupList" :queryForm="queryform"></create>
  </div>
</template>

<script>
import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import create from './components/ClassesCreat.vue'
import { groups } from '@/api/common.js'
export default {
  name: 'ClassesM',
  data() {
    return {
      queryform: {
        ClassesName: '',
        GroupId: '',
        isManage: true, //是否是管理部门
      },
      oldRow: '',
      dataTable: [], //表数据
      groupList: [], // 部门集合
      page: {
        pageindex: 1,
        pagesize: 10,
      }, //分页
      totalCount: 0, //总数
      loading: true, // 表单加载动画
      isMain: true, //主窗口
      isAddform: false, // 添加窗口
      isManage: true, //是否是管理部门
    }
  },
  components: {
    cusPagination,
    create,
  },
  methods: {
    async init() {
      await groups().then((g) => {
        this.groupList = g.CurrentPageData
        let loginMsg = JSON.parse(this.$cookies.get(this.$member.ADMININFO))
        this.queryform.isManage = loginMsg.IsManageGroup
        if (!this.queryform.isManage) {
          this.groupList = this.groupList.filter((g) => g.GroupId == loginMsg.AdminGroupIdTag)
          this.queryform.GroupId = loginMsg.AdminGroupIdTag
        }
      })
      this.dataSoure()
    },
    // 分页栏的操作
    pageBarhandle(page) {
      this.page.pageindex = page.pageindex
      this.page.pagesize = page.pagesize
      this.dataSoure()
    },
    addForm() {
      this.isAddform = true
      this.isMain = false
    },
    // 新增回调
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
        if (this.$verifiy.textValid(row.ClassesName, 20)) {
          return
        }
        if (JSON.stringify(row) != this.oldRow) {
          this.$api.classesM
            .update(row)
            .then((res) => {
				this.$layer.msgSuccess(res)
            }).catch((err) => {})
        }
        row.Iseditor = false
      } else {
        row.Iseditor = true
        this.oldRow = JSON.stringify(row)
      }
    },
    //删除
    del(row, scope) {
      this.$api.classesM
        .remove({
          id: row.ClassesId,
        })
        .then((res) => {
         	this.$layer.msgSuccess(res)
          	this.dataSoure()
        }).catch((err) => {})
    },
    currChange(curr) {
       this.dataTable.forEach(d=>{
        if(d.Iseditor && d.UserId!=curr.UserId){d.Iseditor=false}
      })
    },
    //手动同步
    synchron() {
      this.$api.classesM.synchron()
	  	.then((res) => {
        	this.$layer.msgSuccess(res)
        	this.dataSoure()
      	}).catch((err) => {})
    },
    // 数据
    async dataSoure() {
      this.loading = true
      let query = {
        PageIndex: this.page.pageindex,
        PageSize: this.page.pagesize,
        GroupId: this.queryform.GroupId,
        ClassesName: this.queryform.ClassesName,
      }
      await this.$api.classesM
        .queryMore(query)
        .then((res) => {
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

<style>
.span-edit {
  position: absolute;
  width: 120px;
  height: 30px;
  z-index: 99;
}
</style>
