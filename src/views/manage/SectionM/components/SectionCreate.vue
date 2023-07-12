<template>
	<el-form @submit.native.prevent class="lay-con-layer" ref="sectionM" label-width="100px" :model="sectionM"
		:rules="rules">
		<el-page-header class="form-header" @back="resetForm('sectionM')" content="新增工厂部门"></el-page-header>
		<el-form-item label="工厂部门:" prop="SectionName">
			<el-input v-model="sectionM.SectionName"></el-input>
		</el-form-item>
		<el-form-item label="工厂:" prop="FactoryIdTag">
			<el-select v-model="sectionM.FactoryIdTag" placeholder="请选择工厂">
				<el-option
					v-for="item in factorys"
					:label="item.FactoryName"
					:value="item.FactoryId"
					:key="item.FactoryId"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('sectionM')">保 存</el-button>
			<el-button @click="resetForm('sectionM')">关 闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import { factorys } from '@/api/common.js'

	export default {
		name: 'FactoryCreate',
		data() {
			return {
				factorys: [],
				sectionM: {
					FactoryName: '',
					FactoryIdTag: ''
				},
				rules: {
					FactoryName: this.$verifiy.text_20,
					FactoryIdTag: this.$verifiy.select
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.loading = true
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$api.sectionM
							.create(this.sectionM)
							.then((res) => {
								this.$emit('onSubmit', true)
							}).catch((err) => {})
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
				this.$emit('onSubmit', false)
			}
		},
		created() {
			factorys().then(res => {
				this.factorys = res.CurrentPageData;
			})
		}
	}
</script>

<style scoped="scoped">
</style>