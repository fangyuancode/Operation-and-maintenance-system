<template>
  <div class="con-body">
    <div class="con-body-search">
      <el-form :inline="true">
        <!-- <el-form-item class="form-item-margin">
          <el-select style="width: 150px">
            <el-option label="全部" value=""></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item class="form-item-margin">
          <el-input v-model="val"></el-input>
        </el-form-item>
      </el-form>
      <hr style="height: 1px; border: none; border-top: 1px solid #dcdfe6" />
    </div>
    <div class="con-body-pan">
      <div class="pan-content">这里是内容</div>
      <!-- <cusPagination :total="1000" :actionBar="pageBarhandle"></cusPagination> -->
    </div>
  </div>
</template>

<script>
	 
	export default {
		data() {
			return {
				val: '',
				objTest: {
					id: 1,
					title: '111'
				},
				node: '',
			}
		},
		methods: {

		}
	}
</script>

<style >
</style>