<template>
  <el-form v-loading="loading" label-width="100px" ref="userInfo" :model="userInfo" :rules="rules" style="max-width: 350px">
    <el-form-item label="账号" prop="UserAccount">
      <el-input :value="userInfo.UserAccount" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="UserNick">
      <el-input v-model="userInfo.UserNick"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="UserName">
      <el-input v-model="userInfo.UserName" disabled></el-input>
    </el-form-item>
    <el-form-item label="图像" prop="UserIcon">
      <div class="cus-img-upload">
        <el-upload
          class="avatar-uploader"
          ref="updateUserInfo"
          :action="url"
          :headers="headers"
          :file-list="fileList"
          accept="image/png, image/jpeg"
          :show-file-list="false"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onError"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-form-item>
    <el-form-item label="性别" prop="UserSex">
      <el-radio-group size="mini" v-model="userInfo.UserSex" disabled>
        <el-radio-button :label="0">男</el-radio-button>
        <el-radio-button :label="1">女</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="部门" prop="GroupName">
      <el-input :value="userInfo.GroupName" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="班组" prop="ClassesName">
      <el-input :value="userInfo.ClassesName" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="UserPhone">
      <el-input v-model="userInfo.UserPhone" disabled></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="UserEmail">
      <el-input v-model="userInfo.UserEmail"></el-input>
    </el-form-item>
    <el-form-item label="虚拟短号" prop="UserCornet">
      <el-input v-model="userInfo.UserCornet"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('userInfo')">修改</el-button>
      <el-button @click="resetForm('userInfo')">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { modifyUserInfo, queryUInfo } from '@/api/front/UserAuthor'

export default {
  name: 'UserInfoModify',
  data() {
    return {
      userInfo: {
        UserName: '',
        UserNick: '',
        UserSex: 0,
        UserIcon: '',
        UserPhone: '',
        UserEmail: '',
        UserAccount: '',
        GroupIdTag: '',
        ClassesIdTa: '',
        GroupName: '',
        ClassesName: '',
        UserCornet: '',
      },
      rules: {
        UserName: this.$verifiy.text_20,
        UserPhone: this.$verifiy.number_11,
        UserEmail: this.$verifiy.email,
        UserCornet: [
          {
            pattern: /^[0-9]{0,8}$/,
            message: '必须是数字,且长度不超过8个字符',
            trigger: 'blur',
          },
        ],
      },
      // 上传的地址
      url: '/api/UserAuthor/UploadUserIcon',
      // 加载
      loading: true,
      // 图片路径
      imageUrl: '',
      // 图片集合
      fileList: [],
      // 请求的头部
      headers: {
        token: '',
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.userInfo)
        if (valid) {
          modifyUserInfo(this.userInfo).then((res) => {
            console.log(res)
            this.$emit('onSubmit')
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('onSubmit')
    },
    // 文件状态改变时的钩子
    onChange(file, fileList) {
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 <= 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2M!')
        this.fileList = []
        this.imageUrl = ''
        this.userInfo.UserIcon = ''
      } else {
        this.fileList == [] ? this.fileList.push(file) : (this.fileList[0] = file)
        this.imageUrl = URL.createObjectURL(file.raw)
        this.userInfo.UserIcon = file.name
      }
      console.log('文件集合：', fileList)
      return isLt2M
    },
    // 文件上传之前执行的方法
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 <= 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2M!')
        return false
      }
    },
    // 文件上传成功
    onSuccess(res, file) {
      this.loading = false
      if (res.IsSuccess) {
        this.$message.success('图像修改成功')
      } else {
        this.$message.error(res.ErrorMessage)
      }
    },
    // 文件上传失败
    onError() {
      this.loading = false
      this.$message.error('个人信息修改失败。')
    },
    // 提交
  },
  beforeMount() {
    queryUInfo()
      .then((res) => {
        this.userInfo = res
        this.imageUrl = '/Content/Uicon/' + res.UserIcon
        console.log('用户信息：', res)
      })
      .finally(() => {
        this.loading = false
      })
    let token = this.$cookies.get(this.$member.TOKEN)
    this.headers = {
      token: token,
    }
  },
}
</script>

<style scoped="scoped">
.avatar-uploader /deep/.el-upload {
  border: 1px dashed #e3e3e3 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>
