<template>
  <el-form @submit.native.prevent class="lay-con-layer" ref="materialTypeM" label-width="100px" :model="materialTypeM" :rules="rules">
    <el-page-header class="form-header" @back="resetForm('materialTypeM')" content="新增制造商"></el-page-header>
    <el-form-item label="制造商名:" prop="MaterialTypeName">
      <el-input v-model="materialTypeM.MaterialTypeName"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('materialTypeM')">保 存</el-button>
      <el-button @click="resetForm('materialTypeM')">关 闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Create',
  data() {
    return {
      sectionArray: [],
      materialTypeM: {
        MaterialTypeName: '',
      },
      rules: {
        MaterialTypeName: this.$verifiy.text_30,
      },
      factoryArray: [],
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.materialTypeM
            .create(this.materialTypeM)
            .then((res) => {
              this.$emit('change', true)
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('change', false)
    },
  },
}
</script>

<style scoped>
</style>