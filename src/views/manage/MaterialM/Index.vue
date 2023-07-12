<template>
  <div class="lay-container">
    <div class="lay-container-pan" v-show="isMain">
      <!-- START 头部搜索 -->
      <div class="lay-container-condition">
        <h3>材料类型管理</h3>
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
          <ux-table-column title="材料名" field="MaterialName"> </ux-table-column>
          <ux-table-column title="规格" field="Specification"> </ux-table-column>
          <ux-table-column title="型号" field="Version"> </ux-table-column>
          <ux-table-column title="单位" field="Unit"> </ux-table-column>
          <ux-table-column title="制造商" width="250">
            <template slot-scope="scope">
              <el-select v-model="scope.row.ManufacturerIdTag" size="small" :disabled="!scope.row.Iseditor">
                <el-option :label="item.ManufacturerName" :value="item.ManufacturerId" v-for="item in manufacturerArr" :key="item.ManufacturerId"> </el-option>
              </el-select>
            </template>
          </ux-table-column>
          <ux-table-column title="材料类型" width="250">
            <template slot-scope="scope">
              <el-select v-model="scope.row.MaterialTypeIdTag" size="small" :disabled="!scope.row.Iseditor">
                <el-option :label="item.MaterialTypeName" :value="item.MaterialTypeId" v-for="item in materialTypeArr" :key="item.MaterialTypeId"> </el-option>
              </el-select>
            </template>
          </ux-table-column>
          <ux-table-column title="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="edit(scope.row)"> </el-button>
              <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？" @confirm="del(scope.row)">
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
    <MaterialCreate v-if="isAddform" :manufacturerArr="manufacturerArr" :materialTypeArr="materialTypeArr" @change="addSubmit"></MaterialCreate>
    <!-- END -->

    <!-- Start 编辑 -->
    <MaterialEdit   v-if="isEditform" :editModel="editModel" :manufacturerArr="manufacturerArr" :materialTypeArr="materialTypeArr" @change="editSubmit"></MaterialEdit>
    <!-- END -->
  </div>
</template>

<script>
import { materialTypes, manufacturers } from '@/api/common'

import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import MaterialCreate from './components/MaterialCreate.vue'
import MaterialEdit from './components/MaterialEdit.vue'

export default {
  name: 'MaterialM',
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
      isEditform: false, // 编辑窗口的显示
      totalCount: 0,
      materialTypeArr: [], // 材料类型数组
      manufacturerArr: [], // 制造商数组
      editModel: {}, // 用来编辑的模型
    }
  },
  components: {
    cusPagination,
    MaterialCreate,
    MaterialEdit,
  },
  methods: {
    init() {
      manufacturers().then((res) => {
        this.manufacturerArr = res.CurrentPageData
      })
      materialTypes().then((res) => {
        this.materialTypeArr = res.CurrentPageData
      })
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
    edit(row) {
      this.editModel = row
      this.isMain = false
      this.isEditform = true
    },
    editSubmit(refresh) {
      this.isEditform = false
      this.isMain = true
      if (refresh) {
        this.dataSoure()
      }
    },
    //删除
    del(row, scope) {
      this.$api.materialM
        .remove({
          id: row.MaterialId,
        })
        .then((res) => {
          this.$layer.msgSuccess(res)
          this.dataSoure()
        })
    },
    // 数据
    async dataSoure() {
      this.loading = true
      await this.$api.materialM
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
        if (d.Iseditor && d.MaterialId != curr.MaterialId) {
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