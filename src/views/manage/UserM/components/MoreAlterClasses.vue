<template>
  <div>
    <div>
      <h4 class="con-h4">选中部门：<span> {{mData.groupName}} </span> | 选中人数：<span> {{mData.userIdList.length}} </span></h4>
    </div>
    <el-form class="lay-con-layer" label-width="100px" :model="requestData">
      <el-form-item label=" 班组:">
        <el-select v-model="requestData.ClassesIdTag">
		  <el-option  label="请选择" :value="requestData.ClassesIdTag"></el-option>
          <el-option :label="item.ClassesName" :value="item.ClassesId" v-for="item in mData.classesGList" :key="item.ClassesId"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('requestData')">修 改</el-button>
        <el-button @click="resetForm('requestData')">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MoreAlterClasses',
  props: {
    onSubmit: {
      type: Function,
      default: () => {},
    },
    mData: Object,
  },
  data() {
    return {
      loading: true,
      requestData: {
        UserIdList: [],
        ClassesIdTag: 0,
      },
    }
  },
  methods: {
    submitForm() {
      this.requestData.UserIdList = this.mData.userIdList;
	  console.log(this.requestData);
      this.$api.userM
        .MoreAlter(this.requestData)
        .then((res) => {
          this.onSubmit(true, res)
		  this.loading = false
        })
        .catch((err) => {
          this.loading = false
        })
    },
    resetForm() {
      this.onSubmit(false)
    },
  },
}
</script>
<style>
.con-h4{padding: 0 0 20px 30px;}
</style>
