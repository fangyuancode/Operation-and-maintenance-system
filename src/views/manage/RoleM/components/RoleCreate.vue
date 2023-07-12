<template>
  <el-form class="lay-con-layer" label-width="100px" ref="roleM" :model="roleM" :rules="rules">
    <el-page-header class="form-header" @back="resetForm('roleM')" content="新增角色"> </el-page-header>
    <el-row>
      <el-col :span="12">
        <el-form-item label="角色名称" prop="RoleName">
          <el-input v-model="roleM.RoleName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="角色状态" prop="IsRoleState" >
          <el-switch v-model="roleM.IsRoleState" active-text="开启" inactive-text="关闭"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="角色描述" prop="Description">
      <el-input type="textarea" v-model="roleM.Description" maxlength="100" show-word-limit></el-input>
    </el-form-item>
    <el-form-item class="form-center">
      <el-button type="primary" @click="submitForm('roleM')">保 存</el-button>
      <el-button @click="resetForm('roleM')">关 闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'RoleCreateFrom',
  props: {
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      roleM: {
        RoleName: '',
        IsRoleState: true,
        Description: '',
      },
      rules: {
        RoleName: this.$verifiy.text_20,
        Description: this.$verifiy.text_100,
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.roleM
            .create(this.roleM)
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
