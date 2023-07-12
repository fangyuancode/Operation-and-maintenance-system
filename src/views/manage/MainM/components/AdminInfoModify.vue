<template>
	<el-form label-width="100px" ref="adminM"   v-loading="loading" :model="adminM" :rules="rules" 
		style="max-width: 350px;">
		<el-form-item label="账号" prop="Account">
			<el-input :value="adminM.Account" :disabled="true"></el-input>
		</el-form-item>
		<el-form-item label="昵称" prop="AccName">
			<el-input v-model="adminM.AccName"></el-input>
		</el-form-item>
		<el-form-item label="管理员状态" prop="IsAdminState">
			<el-switch v-model="adminM.IsAdminState"  :disabled="true"></el-switch>
		</el-form-item>
		<el-form-item label="性别" prop="Sex">
			<el-radio-group size="mini" v-model="adminM.Sex">
            	<el-radio-button :label="0">男</el-radio-button>
            	<el-radio-button :label="1">女</el-radio-button>
          	</el-radio-group>
		</el-form-item>
		<el-form-item label="角色" prop="FKRole">
			<el-input :value="adminM.AdminRoleName" :disabled="true"></el-input>
		</el-form-item>
		<el-form-item label="手机号码" prop="Phone">
			<el-input v-model="adminM.Phone"></el-input>
		</el-form-item>
		<el-form-item label="邮箱" prop="Email">
			<el-input v-model="adminM.Email"></el-input>
		</el-form-item>
		<el-form-item label="微信号" prop="AdminWeChat">
			<el-input v-model="adminM.AdminWeChat"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('adminM')">修改</el-button>
			<el-button @click="resetForm('adminM')">关闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "AdminInfoModify",
		props: {
			adminId: {
				type: Number,
				default: 0,
				required: true
			},
			onSubmit: {
				type: Function,
				default: () => {}
			}
		},
		data() {
			return {
				loading: true,
				adminM: {
					Account: '',
					AccName: '',
					Phone: '',
					Email: '',
					AdminWeChat:'',
					IsAdminState: true,
					Sex: 0,
					FKRole: '',
					AdminRoleName:''
				},
				rules: {
					AccName: this.$verifiy.text_20,
					Phone: this.$verifiy.number_11,
					Email: this.$verifiy.email,
				},
			}
		},
		methods: {
			init() {
				this.$api.adminM.query(this.adminId)
				.then(res => {
					this.adminM = res;
					console.log(res);
					this.loading = false;
				})
				.catch(e => {
					this.loading = false;
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					console.log(this.adminM)
					if (valid) {
						this.$api.adminM.update(this.adminM).then(res => {
							this.$layer.msgSuccess(res);
							this.onSubmit();
						});
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.onSubmit(false);
			},
		},
		beforeMount() {
			this.init();
		}
	}
</script>

<style scoped="scoped">

</style>
