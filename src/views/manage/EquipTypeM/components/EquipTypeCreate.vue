<template>
	<el-form @submit.native.prevent class="lay-con-layer" ref="equipTypeM" label-width="100px" :model="equipTypeM"
		:rules="rules">
		<el-page-header class="form-header" @back="resetForm('equipTypeM')" content="新增设备类型"> </el-page-header>
		<el-form-item label="设备类型名:" prop="EquipTypeName">
			<el-input v-model="equipTypeM.EquipTypeName"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('equipTypeM')">保 存</el-button>
			<el-button @click="resetForm('equipTypeM')">关 闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'EquipTypeCreate',
		data() {
			return {
				equipTypeM: {
					EquipTypeName: ''
				},
				rules: {
					EquipTypeName: this.$verifiy.text_20,
				},
			}
		},
		methods: {
			submitForm(formName) {
				this.loading = true
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$api.equipTypeM
							.create(this.equipTypeM)
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
