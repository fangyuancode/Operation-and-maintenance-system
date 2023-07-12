<template>
	<el-form @submit.native.prevent class="lay-con-layer" ref="equCM" label-width="100px" :model="equCM"
		:rules="rules">
		<el-page-header class="form-header" @back="resetForm('equCM')" content="新增设备分类"> </el-page-header>
		<el-form-item label="设备分类名:" prop="EquipClassifyName">
			<el-input v-model="equCM.EquipClassifyName"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('equCM')">保 存</el-button>
			<el-button @click="resetForm('equCM')">关 闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'EquipClassifyCreate',
		data() {
			return {
				equCM: {
					EquipClassifyName: ''
				},
				rules: {
					EquipClassifyName: this.$verifiy.text_20,
				},
			}
		},
		methods: {
			submitForm(formName) {
				this.loading = true
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$api.equipClassifyM
							.create(this.equCM)
							.then((res) => {
								this.$emit('onSubmit', true)
							}).catch((err) => {})
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
				this.$emit('onSubmit', false)
			},
		},
	}
</script>

<style scoped="scoped">

</style>
