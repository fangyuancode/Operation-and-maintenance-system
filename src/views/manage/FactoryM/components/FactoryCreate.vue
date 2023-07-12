<template>
	<el-form @submit.native.prevent class="lay-con-layer" ref="factoryM" label-width="100px" :model="factoryM"
		:rules="rules">
		<el-page-header class="form-header" @back="resetForm('factoryM')" content="新增工厂"></el-page-header>
		<el-form-item label="工厂名:" prop="FactoryName">
			<el-input v-model="factoryM.FactoryName"></el-input>
		</el-form-item>
		<el-form-item label="维护部门:" prop="SerGroupIdTag">
			<el-select v-model="factoryM.SerGroupIdTag">
				<el-option
					v-for="item in groupArr"
					:label="item.GroupName"
					:value="item.GroupId"
					:key="item.GroupId"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('factoryM')">保 存</el-button>
			<el-button @click="resetForm('factoryM')">关 闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import { groups } from '@/api/common.js'
	export default {
		name: 'FactoryCreate',
		data() {
			return {
				groupArr: [],
				factoryM: {
					FactoryName: '',
					
				},
				rules: {
					FactoryName: this.$verifiy.text_20,
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.loading = true
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$api.factoryM
							.create(this.factoryM)
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
		mounted() {
			groups().then(res => {
				this.groupArr = res.CurrentPageData;
			})
		}

	}
</script>

<style scoped="scoped">
</style>