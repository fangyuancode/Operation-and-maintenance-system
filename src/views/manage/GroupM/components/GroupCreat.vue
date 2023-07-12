<template>
  <el-form class="lay-con-layer" ref="GroupM" label-width="100px" :model="GroupM" :rules="rules">
    <el-page-header class="form-header" @back="resetForm('GroupM')" content="新增部门"> </el-page-header>
    <el-form-item label="部门名称:" prop="GroupName">
      <el-input v-model="GroupM.GroupName"></el-input>
    </el-form-item>
    <el-form-item label="是否同步更新:">
      <el-switch v-model="GroupM.IsSynchron" active-text="是" inactive-text="否"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('GroupM')">保 存</el-button>
      <el-button @click="resetForm('GroupM')">关 闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'GroupCreatForm',
  props: {
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      GroupM: {
        GroupName: '',
        IsSynchron: false,
      },
      rules: {
        GroupName: this.$verifiy.text_20,
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.groupM
            .create(this.GroupM)
            .then((res) => {
              this.onSubmit(true)
            }).catch((err) => {})
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.onSubmit(false)
    },
  },
}
</script>

<style scoped="scoped">
</style>
