<template>
  <div class="lay-container">
    <h3 class="ser-top">数据库服务器配置</h3>
    <el-form :model="server" :rules="rules" ref="server" label-width="100px">
      <el-form-item label="数据库类型:" prop="SerTypeId">
        <el-select v-model="server.SerTypeId" @change="change()">
          <el-option :label="item.SerTypeName" :value="item.SerTypeId" v-for="item in serTypeList" :key="item.SerTypeId"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="ser-input" label="服务器地址:" prop="ServerCon">
        <el-input v-model="server.ServerCon"></el-input>
      </el-form-item>
      <el-form-item class="ser-input" label="数据库名:" prop="SerSQLDB">
        <el-input v-model="server.SerSQLDB"></el-input>
      </el-form-item>
      <el-form-item class="ser-input" label="数据库帐号:" prop="ServerSQLAcc">
        <el-input v-model="server.ServerSQLAcc"></el-input>
      </el-form-item>
      <el-form-item class="ser-input" label="数据库密码:" prop="ServerSQLPsd">
        <el-input v-model="server.ServerSQLPsd" type="password"></el-input>
      </el-form-item>
      <el-form-item class="ser-input" label="监控任务状态">
        <el-switch v-model="server.IsJobOpen" active-text="开启" inactive-text="关闭"
        title="建议打开人员同步"
         @change="swChange()"> </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button @click="testCon()">测试连接</el-button>
        <el-button type="primary" @click="save('server')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import verifiy from '@/common/util/verifiy.js'
export default {
  name: 'SerSetM',
  data() {
    return {
      loading: true,
      server: {
        ServerConId: 0,
        SerTypeId: '',
        ServerCon: '',
        SerSQLDB: '',
        ServerSQLAcc: '',
        ServerSQLPsd: '',
        IsJobOpen: false,
      }, //服务信息模型
      rules: {
        SerTypeId: verifiy.select,
        ServerCon: verifiy.text_50,
        SerSQLDB: verifiy.text_20,
        ServerSQLAcc: verifiy.text_20,
        ServerSQLPsd: verifiy.pwd,
      }, //验证输入
      serTypeList: [], //服务器类型集合
      jobObj: {}, //任务数对象
    }
  },
  methods: {
    init() {
      this.$api.serConM
        .getSerType()
        .then((res) => {
          this.serTypeList = res.CurrentPageData
        })
        .finally((f) => {
          this.loading = false
        })
    },
    //切换类型
    change() {
      let tId = this.server.SerTypeId
      this.$api.serConM
        .getSer({
          typeId: tId,
        })
        .then((res) => {
          console.log(res)
          this.server = res
          if (res.ServerConId == 0) {
            this.server.SerTypeId = tId
          }
        })
    },
    //监控任务转换
    swChange() {
      let open = this.server.IsJobOpen
      let sId = this.server.ServerConId
      console.log(open)
      console.log(sId)
      if(!open && sId != 0){this.$layer.msgWarning('人员同步已关闭，本系统将无法更新人员信息。')}
      if(open && sId!=0){this.$layer.msgSuccess('人员同步已打开。')}

      //#region 注销内容
      // if (!open && sId != 0) {
      //    this.$layer.msgSuccess('人员同步已关闭，本系统将无法更新人员信息。')
      //   this.$confirm('关闭此任务，将无法同步人员信息，确认关闭吗？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //   })
      //     .then(() => {
      //       this.$layer.msgSuccess('人员同步已关闭，本系统将无法更新人员信息。')
      //     })
      //     .catch(() => {
      //       this.server.IsJobOpen = !open
      //     })
      // }
      //#endregion
      
    },
    //测试连接
    testCon() {
      if (this.server.ServerConId != 0) {
        this.$api.serConM
          .testCon()
          .then((res) => {
            console.log(res)
            this.$layer.msgSuccess(res)
          })
          .catch((err) => {})
      }
    },
    //保存
    save(formName) {
      console.log(this.server)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.serConM
            .update(this.server)
            .then((res) => {
              this.$layer.msgSuccess(res)
              this.onSubmit(true)
            })
            .catch((err) => {})
        }
      })
    },
  },
  beforeMount() {
    this.init()
  },
}
</script>

<style scoped="scoped">
.ser-top {
  margin-bottom: 15px;
}
.ser-input {
  max-width: 500px;
}
.jobNum-span {
  margin-left: 10px;
}
.jobNum-span>cite{
	cursor: pointer;
}

.jobNum-cite {
  color: green;
}
</style>
