<template>
  <el-upload class="avatar-uploader" action="/api/UserM/ImageUpload" :show-file-list="false" :data="reqData"
    :headers="headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" accept=".jpg,.png">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
/* 上传组件 */
export default {
  name: 'CusUploading',
  props: {
    action: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imageUrl: '',
      headers: { token: '' },
      reqData: {},
    }
  },
  methods: {
    init() {
      let token = this.$cookies.get(this.$member.TOKEN)
      this.headers = {
        token: token,
      }
    },
    // 上传成功的回调
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = res.Data
      console.log(this.imageUrl)
    },
    // 上传文件之前的钩子
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
  },
  created() {
    this.init()
  },
}
</script>

<style>
</style>
