<template>
  <div>
    <el-form @submit.native.prevent class="lay-con-layer" :inline="true" ref="materialM" label-width="100px" :model="materialM" :rules="rules">
      <el-page-header class="form-header" @back="resetForm('materialM')" content="编辑材料"></el-page-header>
      <div style="display: inline">
        <el-form-item label="材料名:" prop="MaterialName">
          <el-input v-model="materialM.MaterialName"></el-input>
        </el-form-item>
        <el-form-item label="规格:" prop="Specification">
          <el-input v-model="materialM.Specification"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="型号:" prop="Version">
          <el-input v-model="materialM.Version"></el-input>
        </el-form-item>
        <el-form-item label="单位:" prop="Unit">
          <el-input v-model="materialM.Unit"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="制造商:" prop="ManufacturerIdTag">
          <el-select v-model="materialM.ManufacturerIdTag">
            <el-option :label="item.ManufacturerName" :value="item.ManufacturerId" v-for="item in manufacturerArr" :key="item.ManufacturerId"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="材料类型:" prop="MaterialTypeIdTag">
          <el-select v-model="materialM.MaterialTypeIdTag">
            <el-option :label="item.MaterialTypeName" :value="item.MaterialTypeId" v-for="item in materialTypeArr" :key="item.MaterialTypeId"> </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div style="margin: 25px">
        <el-form-item>
          <el-button type="primary" @click="submitForm('materialM')">保 存</el-button>
          <el-button @click="resetForm('materialM')">关 闭</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MaterialEdit',
  props: {
    materialTypeArr: [], // 材料类型数组
    manufacturerArr: [], // 制造商数组
    editModel: {},
  },
  data() {
    return {
      materialM: {},
      rules: {
        MaterialName: this.$verifiy.text_30,
        Specification: this.$verifiy.text_20,
        Version: this.$verifiy.text_20,
        Unit: this.$verifiy.text_10,
        ManufacturerIdTag: this.$verifiy.select,
        MaterialTypeIdTag: this.$verifiy.select,
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.materialM.update(this.materialM).then((res) => {
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
  created() {
    console.log(this.materialM)
    this.materialM = JSON.parse(JSON.stringify(this.editModel))
  },
}
</script>

<style scoped>
</style>