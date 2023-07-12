<template>
  <el-form class="lay-con-layer" label-width="100px" v-loading="loading" status-icon :model="dataObj" :rules="rules" ref="UserM">
    <el-page-header class="form-header" @back="resetForm('UserM')" content="新增用户"> </el-page-header>
    <el-row>
      <el-col :xs="24" :sm="8">
        <el-form-item label="昵称" prop="UserNick">
          <el-input v-model="dataObj.UserNick"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-form-item label="密码" prop="UserPwd">
          <el-input v-model="dataObj.UserPwd"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="8">
        <el-form-item label="姓名" prop="UserName">
          <el-input v-model="dataObj.UserName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-form-item label="手机号码" prop="UserPhone">
          <el-input v-model.number="dataObj.UserPhone"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
       <el-col :xs="24" :sm="8">
        <el-form-item label="部门" prop="GroupIdTag">
          <el-select v-model="dataObj.GroupIdTag" placeholder="请选择部门">
            <el-option :label="item.GroupName" :value="item.GroupId" v-for="item in groupList" :key="item.GroupId"> </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-form-item label="状态" prop="IsUserState">
          <el-switch v-model="dataObj.IsUserState" active-text="启用" inactive-text="禁用"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-form-item label="性别" prop="UserSex">
          <el-radio-group size="mini" v-model="dataObj.UserSex">
            <el-radio-button :label="0">男</el-radio-button>
            <el-radio-button :label="1">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="form-center">
      <el-button type="primary" @click="submitForm('UserM')">保 存</el-button>
      <el-button @click="resetForm('UserM')">关 闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import verifiy from '@/common/util/verifiy.js'
export default {
  name: 'UserCreateForm',
  props: {
    groupList: Array,
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      dataObj: {
        UserNick: '',
        UserPwd: '',
        UserName: '',
        UserPhone: '',
        IsUserState: true,
        UserSex: 1,
        GroupIdTag: '',
      },
      rules: {
        UserNick: verifiy.userAcc,
        UserPwd: verifiy.pwd,
        UserName: verifiy.text_20,
        UserPhone: verifiy.number_11,
        GroupIdTag: verifiy.select,
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        console.log(this.dataObj)
        if (valid) {
          this.$api.userM.create(this.dataObj).then((res) => {
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
