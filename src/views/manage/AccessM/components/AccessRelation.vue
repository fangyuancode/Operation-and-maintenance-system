<template>
  <div class="lay-con-layer" v-loading="loading">
    <el-page-header class="form-header" @back="handle(false)" content="关联权限"> </el-page-header>
    <div style="padding: 10px; min-height: 120px; line-height: 120px">
      <!-- 暂无数据 -->
      <el-checkbox-group v-model="checkList">
        <el-checkbox :label="item.AccId" border v-for="item in connAccSoure" :key="item.AccId">
          {{ item.AccName }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="line"></div>
    <el-row style="margin: 20px; text-align: center">
      <el-button type="primary" @click="handle(true)">保 存</el-button>
      <el-button @click="handle(false)">关 闭</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AccessRelationForm',
  props: {
    onSubmit: Function,
    eData: Object,
  },
  data() {
    return {
      loading: true,
      connAccSoure: [],
      checkList: [], // 已选择的关联权限
    }
  },
  methods: {
    init() {
      this.$api.accessM
        .queryAllConnAcc({
          id: this.eData.AccId,
        })
        .then((res) => {
          this.connAccSoure = res.CurrentPageData
          console.log('可关联的权限：', res)
          let reStr = this.eData.RelationStr
          if (reStr != null && reStr.length != 0) {
            this.checkList = [...reStr.split(',')]
            this.checkList = this.checkList.map(Number)
          }
          console.log('已经关联的权限：', this.checkList)
        })
        .finally((f) => {
          this.loading = false
        })
    },
    //关联
    handle(tag) {
      if (tag) {
        this.loading = true
        this.$api.accessM
          .realtionAcc({
            accId: this.eData.AccId,
            relaStr: this.checkList.join(','),
          })
          .then((res) => {
            this.$layer.msgSuccess(res)
            this.onSubmit(tag)
          })
          .catch((err) => {})
      } else {
        this.onSubmit(tag)
      }
      this.loading = false
    },
  },
  beforeMount() {
    this.init()
  },
}
</script>

<style scoped="scoped">
.line {
  width: 100%;
  height: 0;
  border-top: 1px solid #eee;
}
</style>
