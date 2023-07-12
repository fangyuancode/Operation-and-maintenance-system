<template>
  <el-form class="lay-con-layer" label-width="100px" v-loading="loading" status-icon :model="dataObj" :rules="rules" ref="adminM">
    <el-page-header class="form-header" @back="resetForm('adminM')" content="新增管理员"> </el-page-header>
    <el-row>
      <el-col :xs="24" :sm="8">
        <el-form-item label="账号" prop="Account">
          <el-input v-model="dataObj.Account"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-form-item label="密码" prop="AdminPsw">
          <el-input v-model="dataObj.AdminPsw"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-form-item label="昵称" prop="AccName">
          <el-input v-model="dataObj.AccName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="8">
        <el-form-item label="手机号码" prop="Phone">
          <el-input v-model.number="dataObj.Phone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-form-item label="邮箱" prop="Email">
          <el-input v-model="dataObj.Email"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-form-item label="微信号" prop="AdminWeChat">
          <el-input v-model="dataObj.AdminWeChat"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="8">
        <el-form-item label="部门" prop="AdminGroupIDTag">
          <el-select v-model="dataObj.AdminGroupIDTag" placeholder="请选择部门">
            <el-option :label="item.GroupName" :value="item.GroupId" v-for="item in eData.groupList" :key="item.GroupId"> </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-form-item label="角色" prop="FKRole">
          <el-select v-model="dataObj.FKRole" placeholder="请选择角色">
            <el-option :label="item.RoleName" :value="item.RoleId" v-for="item in eData.roleList" :key="item.RoleId"> </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="8">
        <el-form-item label="管理员状态" prop="IsAdminState">
          <el-switch v-model="dataObj.IsAdminState" active-text="已启用" inactive-text="已禁用"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-form-item label="性别" prop="Sex">
          <el-radio-group size="mini" v-model="dataObj.Sex">
            <el-radio-button :label="0">男</el-radio-button>
            <el-radio-button :label="1">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="form-center">
      <el-button type="primary" @click="submitForm('adminM')">保 存</el-button>
      <el-button @click="resetForm('adminM')">关 闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import verifiy from '@/common/util/verifiy.js'
export default {
  name: 'AdminCreateForm',
  props: {
    eData: Object,
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      dataObj: {
        Account: '',
        AdminPsw: '',
        AccName: '',
        Phone: '',
        Email: '',
        IsAdminState: true,
        Sex: 1,
        FKRole: '',
        AdminGroupIDTag: '',
      },
      rules: {
        Account: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
        ],
        AdminPsw: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur',
          },
        ],
        AccName: verifiy.text_20,
        Phone: verifiy.number_11,
        Email: verifiy.email,
        FKRole: verifiy.select,
        AdminGroupIDTag: verifiy.select,
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        console.log(this.dataObj)
        if (valid) {
          this.$api.adminM.create(this.dataObj).then((res) => {
            this.onSubmit(true)
          })
        }
        this.loading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.onSubmit(false)
    },
  },
}
</script>

<style>
</style>
