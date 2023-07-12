<template>
	<el-form class="lay-con-layer" label-width="100px" v-loading="loading" status-icon :model="accM" :rules="rules" ref="accM">
		<el-page-header class="form-header" @back="resetForm('accM')" content="新增权限"> </el-page-header>
		<el-form-item label="父级">
			<el-select v-model="accM.AccParTag">
				<el-option label="顶级" value="0"></el-option>
				<el-option :label="item.ParAccName" :value="item.ParAccId" v-for="item in parentList" :key="item.ParAccId"> </el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="权限名" prop="AccName">
			<el-input v-model="accM.AccName"></el-input>
		</el-form-item>
		<el-form-item label="路径名" prop="AccUrl">
			<el-input v-model="accM.AccUrl"></el-input>
		</el-form-item>
		<el-form-item label="层标记" prop="TierTag">
			<el-input v-model.number="accM.TierTag"></el-input>
		</el-form-item>
		<el-form-item label="side显示" v-if="accM.TierTag == 1">
			<el-select v-model="accM.SideTag">
				<el-option :label="item.title" :value="item.id" v-for="item in sideList" :key="item.id"> </el-option>
			</el-select>
		</el-form-item>
		<div style="display: flex;">
			<el-form-item label="前端权限" prop="IsFrontAcc">
				<el-switch v-model="accM.IsFrontAcc" active-text="是" inactive-text="否"></el-switch>
			</el-form-item>
			<el-form-item label="无需验证" prop="IsIgnore">
				<el-switch v-model="accM.IsIgnore" active-text="是" inactive-text="否"></el-switch>
			</el-form-item>
		</div>

		<el-form-item>
			<el-button type="primary" @click="submitForm('accM')">保 存</el-button>
			<el-button @click="resetForm('accM')">关 闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import verifiy from '@/common/util/verifiy.js'
	export default {
		name: 'AccessMCreateFrom',
		props: {
			parentList: Array,
			onSubmit: Function
		},
		data() {
			return {
				loading: false,
				sideList: [],
				accM: {
					AccName: '',
					AccUrl: '',
					AccParTag: '0',
					TierTag: '',
					IsIgnore: false,
					SideTag: '',
				},
				rules: {
					AccName: verifiy.text_20,
					AccUrl: verifiy.text_50,
					TierTag: verifiy.number,
				},
			}
		},
		methods: {
			submitForm(formName) {
				this.loading = true
				this.$refs[formName].validate((valid) => {
					console.log(this.accM)
					if (valid) {
						this.$api.accessM
							.create(this.accM)
							.then((res) => {
								this.onSubmit(true)
								console.log(res)
							})
							.catch((err) => {
								console.log(err)
							})
					}
					this.loading = false
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
				this.onSubmit(false)
			},
		},
		mounted() {
			this.sideList = this.$member.SIDEMODULE
		},
	}
</script>

<style scoped="scoped">
	.el-input {
		width: auto;
	}
</style>
