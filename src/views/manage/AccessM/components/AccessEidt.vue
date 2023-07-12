<template>
	<el-form class="lay-con-layer" label-width="100px" v-loading="loading" status-icon :model="accM" :rules="rules" ref="accM">
		<el-page-header class="form-header" @back="resetForm('accM')" content="编辑权限"> </el-page-header>
		<el-form-item label="父级" v-if="accM.AccParTag != 0">
			<el-select v-model="accM.AccParTag">
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
		<el-form-item label="side显示" v-if="accM.TierTag === 1 && accM.AccParTag != 0">
			<el-select v-model="accM.SideTag">
				<el-option label="未选择" :value="0"></el-option>
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
		name: 'AccessMEidtFrom',
		props: {
			eData: Object,
			parentList: Array,
			onSubmit: Function,
		},
		data() {
			return {
				loading: true,
				sideList: [],
				accM: {},
				rules: {
					AccName: verifiy.text_20,
					AccUrl: verifiy.text_50,
					TierTag: verifiy.number,
				},
			}
		},
		methods: {
			init() {
				this.sideList = this.$member.SIDEMODULE
				this.accM = this.eData
				this.loading = false
			},
			//保存
			submitForm(formName) {
				this.loading = true
				this.$refs[formName].validate((valid) => {
					console.log(this.accM)
					if (valid) {
						this.$api.accessM
							.update(this.accM)
							.then((res) => {
								this.$layer.msgSuccess(res)
								this.onSubmit(true)
							})
							.catch((err) => {
								console.log(err)
							})
					}
					this.loading = false
				})
			},
			resetForm(formName) {
				this.onSubmit(false)
			},
		},
		beforeMount() {
			this.init()
		},
	}
</script>

<style scoped="scoped">
	.el-input {
		width: auto;
	}
</style>
