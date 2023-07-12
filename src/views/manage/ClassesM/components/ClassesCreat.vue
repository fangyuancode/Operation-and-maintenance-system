<template>
  <el-form class="lay-con-layer" label-width="100px" ref="dataFrom" :model="dataFrom" :rules="rules">
    <el-page-header class="form-header" @back="resetForm('dataFrom')" content="新增班组"> </el-page-header>
    <el-form-item label="部门" prop="FKGroupId">
      <el-select v-model="dataFrom.FKGroupId">
        <el-option v-if="queryForm.isManage" label="请选择" value=""></el-option>
        <el-option :label="item.GroupName" :value="item.GroupId" v-for="item in groups" :key="item.GroupId"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="班组名:" prop="ClassesName">
      <el-input v-model="dataFrom.ClassesName"></el-input>
    </el-form-item>
    <el-form-item label="状态:">
      <el-switch v-model="dataFrom.IsClassesState" active-text="启用" inactive-text="禁用"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dataFrom')">保 存</el-button>
      <el-button @click="resetForm('dataFrom')">关 闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ClassesCreatForm',
  props: {
    onSubmit: {
      type: Function,
      default: () => {},
    },
    queryForm:Object,
    groups: Array,
  },
  data() {
    return {
      dataFrom: {
        ClassesName: '',
        FKGroupId: '',
        IsClassesState: true,
      },
      rules: {
        FKGroupId: this.$verifiy.select,
        ClassesName: this.$verifiy.text_20,
      },
    }
  },
  methods: {
    //保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.classesM
            .create(this.dataFrom)
            .then((res) => {
              this.$layer.msgSuccess(res)
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
  mounted() {
    this.dataFrom.FKGroupId = this.queryForm.GroupId
  },
}
</script>

<style scoped="scoped">
</style>
