<template>
  <el-form @submit.native.prevent class="lay-con-layer" ref="manufacturerM" label-width="100px" :model="manufacturerM" :rules="rules">
    <el-page-header class="form-header" @back="resetForm('manufacturerM')" content="新增制造商"></el-page-header>
    <el-form-item label="制造商名:" prop="ManufacturerName">
      <el-input v-model="manufacturerM.ManufacturerName"></el-input>
    </el-form-item>
    <el-form-item label="联系电话:" prop="Telephone">
      <el-input v-model="manufacturerM.Telephone"></el-input>
    </el-form-item>
    <el-form-item label="联系人:" prop="ContactPerson">
      <el-input v-model="manufacturerM.ContactPerson"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('manufacturerM')">保 存</el-button>
      <el-button @click="resetForm('manufacturerM')">关 闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Create',
  data() {
    return {
      sectionArray: [],
      manufacturerM: {
        ManufacturerName: '',
        Telephone: '',
        ContactPerson: '',
      },
      rules: {
        DeviceNumber: this.$verifiy.text_30,
        DeviceName: this.$verifiy.text_20,
        FKSectionId: this.$verifiy.text_20,
      },
      factoryArray: [],
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.manufacturerM
            .create(this.manufacturerM)
            .then((res) => {
              this.$emit('change', true)
            })
            .catch((err) => {})
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