<template>
  <el-form class="lay-con-layer" label-width="100px" v-loading="loading" :model="dataObj" ref="upAdmin">
    <el-form-item label="角色" prop="RoleId" :rules="$verifiy.select">
      <el-select v-model="dataObj.RoleId">
        <el-option :label="item.RoleName" :value="item.RoleId" v-for="item in roleList" :key="item.RoleId"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('upAdmin')">升级</el-button>
      <el-button @click="resetForm('upAdmin')">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { roles } from '@/api/common.js'

export default {
  name: 'UserMUpAdminForm',
  props: {
    onSubmit: {
      type: Function,
      default: () => {},
    },
    uId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: true,
      roleList: [],
      dataObj: {
        UserId: '',
        RoleId: '',
      },
    }
  },
  methods: {
    init() {
      this.dataObj.UserId = this.uId
      console.log(this.dataObj)
      roles().then((res) => {
        this.roleList = res.CurrentPageData
        this.loading = false
      })
    },
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.userM
            .upAdmin(this.dataObj)
            .then((res) => {
              this.$layer.msgSuccess(res)
              this.onSubmit()
              console.log(res)
            })
            .catch((err) => {
              this.loading = false
            })
        } else this.loading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.onSubmit()
    },
  },
  created() {
    this.init()
  },
}
</script>

<style>
</style>
