<template>
  <div class="lay-container">
    <div class="lay-container-pan" v-show="isMain">
      <!-- START 头部搜索 -->
      <div class="lay-container-condition">
        <el-form :inline="true" :model="queryform" class="demo-form-inline">
          <el-form-item label="台账类型">
            <el-select v-model="queryform.EquipTypeIdTag" @change="dataSoure" placeholder="">
              <el-option v-for="item in equipTypeArray" :label="item.EquipTypeName" :value="item.EquipTypeId" :key="item.EquipTypeId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开启状态">
            <el-select v-model="queryform.EquipPropertyState" @change="dataSoure">
              <el-option label="开启" :value="true"></el-option>
              <el-option label="关闭" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- END -->
      <!-- START 主题内容 -->
      <div class="lay-container-content">
        <div style="border: 1px soild">
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
          <ux-table-column title="属性名" width="280px">
            <template slot-scope="scope">
              <input class="input-edit" type="text" v-model="scope.row.EquipPropertyName" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.EquipPropertyName }}</span>
            </template>
          </ux-table-column>
          <ux-table-column title="英文名" width="280px">
            <template slot-scope="scope">
              <input class="input-edit" type="text" v-model="scope.row.EquipPropertyEnglish" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.EquipPropertyEnglish }}</span>
            </template>
          </ux-table-column>
          <ux-table-column title="属性单位" width="280px">
            <template slot-scope="scope">
              <input class="input-edit" type="text" v-model="scope.row.EquipPropertyUnit" v-show="scope.row.Iseditor" />
              <span v-show="!scope.row.Iseditor">{{ scope.row.EquipPropertyUnit }}</span>
            </template>
          </ux-table-column>
          <ux-table-column title="属性状态" width="280px">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.EquipPropertyState" :disabled="!scope.row.Iseditor">
                <el-radio-button label="true">开启</el-radio-button>
                <el-radio-button label="false">关闭</el-radio-button>
              </el-radio-group>
            </template>
          </ux-table-column>
          <ux-table-column title="台账类型" width="280px">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.EquipTypeIdTag" :disabled="!scope.row.Iseditor">
                <el-option v-for="item in equipTypeArray" :label="item.EquipTypeName" :value="item.EquipTypeId" :key="item.EquipTypeId"></el-option>
              </el-select>
            </template>
          </ux-table-column>
          <ux-table-column title="操作" fixed="right" width="280px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle v-if="!scope.row.Iseditor" @click="edit(scope.row, scope)"> </el-button>
              <el-button type="success" size="mini" icon="el-icon-check" circle v-if="scope.row.Iseditor" @click="edit(scope.row, scope)"> </el-button>
              <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？" @confirm="del(scope.row, scope)">
                <el-button style="margin-left: 5px" slot="reference" size="mini" type="danger" icon="el-icon-delete" circle> </el-button>
              </el-popconfirm>
            </template>
          </ux-table-column>
        </ux-grid>
        <div style="height: 60px"></div>
      </div>
      <!-- END -->
      <cusPagination :total="totalCount" :actionBar="pageBarhandle"></cusPagination>
    </div>

    <!-- START 添加 -->
    <equipPropertyCreate v-if="isAddform" @onSubmit="addSubmit"></equipPropertyCreate>
    <!-- END -->
  </div>
</template>

<script>
import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import equipPropertyCreate from './components/EquipPropertyCreate.vue'
import { equipTypes } from '@/api/common.js'

export default {
  name: 'EquipPropertyM',
  data() {
    return {
      oldRow: '',
      dataTable: [], // 部门的表格数据
      queryform: {
        PageIndex: 1,
        PageSize: 50,
        EquipTypeIdTag: '',
        EquipPropertyState: true,
      },
      loading: true, // 表单加载动画
      isMain: true, // 主窗显示
      isAddform: false, // 添加弹窗的显示
      totalCount: 0,
      equipTypeArray: [],
    }
  },
  components: {
    cusPagination,
    equipPropertyCreate,
  },
  methods: {
    init() {
      equipTypes().then((res) => {
        this.equipTypeArray = res.CurrentPageData
        this.queryform.EquipTypeIdTag = this.equipTypeArray[0].EquipTypeId
      })

      this.dataSoure()
    },
    // 分页栏的操作
    pageBarhandle(page) {
      this.queryform.PageIndex = page.pageindex
      this.queryform.PageSize = page.pagesize
      this.dataSoure()
    },
    //添加的窗口
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
        if (this.$verifiy.textValid(row.EquipPropertyName, 30)) {
          return
        }
        if (this.$verifiy.textValid(row.EquipPropertyEnglish, 30)) {
          return
        }
        if (this.$verifiy.textValid(row.EquipPropertyUnit, 20)) {
          return
        }

        if (JSON.stringify(row) != this.oldRow) {
          this.$api.equipPropertyM
            .update(row)
            .then((res) => {
              this.$layer.msgSuccess(res)
              this.$set(row, 'Iseditor', false)
            })
            .catch((err) => {})
        }
      } else {
        this.$set(row, 'Iseditor', true)
        this.oldRow = JSON.stringify(row)
      }
    },
    //删除
    del(row, scope) {
      this.$api.equipPropertyM
        .remove({
          id: row.SectionId,
        })
        .then((res) => {
          this.$layer.msgSuccess(res)
          this.dataSoure()
        })
    },
    // 数据
    async dataSoure() {
      this.loading = true
      await this.$api.equipPropertyM
        .query(this.queryform)
        .then((res) => {
          console.log('数据列表：', res)
          this.dataTable = res.CurrentPageData
          this.totalCount = res.TotalCount
        })
        .finally((f) => {
          this.loading = false
        })
    },
    currChange(curr) {
      this.dataTable.forEach((d) => {
        if (d.Iseditor && d.EquipPropertyId != curr.EquipPropertyId) {
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