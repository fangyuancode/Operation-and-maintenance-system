<template>
	<el-form ref="adminM" label-width="100px" :model="adminM" status-icon :rules="rules" 
		style="max-width: 350px;">
		<el-form-item label="旧密码" prop="OldPassword">
			<el-input v-model="adminM.OldPassword" type="password"></el-input>
		</el-form-item>
		<el-form-item label="新密码" prop="NewPassword">
			<el-input v-model="adminM.NewPassword" type="password"></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="ConfirmPassword">
			<el-input v-model="adminM.ConfirmPassword" type="password"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('adminM')">修 改</el-button>
			<el-button @click="resetForm('adminM')">关 闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "AdminPwdModify",
		props: {
			onSubmit: {
				type: Function,
				default: () => {}
			}
		},
		data() {
			var validateNewPassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (value.length < 6 || value.length > 20) {
					callback(new Error('长度在 6 到 20 个字符'));
				} else {
					if (this.adminM.ConfirmPassword !== '') {
						this.$refs.adminM.validateField('ConfirmPassword');
					}
					callback();
				}
			};
			var validateConfirmPassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value.length < 6 || value.length > 20) {
					callback(new Error('长度在 6 到 20 个字符'));
				} else if (value !== this.adminM.NewPassword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				adminM: {
					OldPassword: '',
					NewPassword: '',
					ConfirmPassword: ''
				},
				rules: {
					OldPassword: [{
							required: true,
							message: '请输入旧的密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '长度在 6 到 20 个字符',
							trigger: 'blur'
						}
					],
					NewPassword: [{
						validator: validateNewPassword,
						trigger: 'blur'
					}],
					ConfirmPassword: [{
						validator: validateConfirmPassword,
						trigger: 'blur'
					}]
				},
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					console.log(this.adminM, valid)
					if (valid) {
						this.$api.loginM.update(this.adminM).then(res => {
							this.onSubmit(true);
						}).catch(()=>{});
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.onSubmit(false);
			},
		},

	}
</script>

<style>

</style>
