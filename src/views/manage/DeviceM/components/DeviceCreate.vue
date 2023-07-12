<template>
	<el-form @submit.native.prevent class="lay-con-layer" ref="deviceM" label-width="100px" :model="deviceM"
		:rules="rules">
		<el-page-header class="form-header" @back="resetForm('deviceM')" content="新增装置"></el-page-header>
		<el-form-item label="装置编号:" prop="DeviceNumber">
			<el-input v-model="deviceM.DeviceNumber"></el-input>
		</el-form-item>
		<el-form-item label="装置名称:" prop="DeviceName">
			<el-input v-model="deviceM.DeviceName"></el-input>
		</el-form-item>
		<el-form-item label="工厂部门:" prop="FKSectionId">
			<el-select v-model="deviceM.FKSectionId" placeholder="请选择工厂部门">
				<el-option-group
					v-for="group in factoryArray"
					v-if="factHSect(group.FactoryId)"
					:label="group.FactoryName"
					:value="group.FactoryId"
					:key="group.FactoryId">
					<el-option
						v-for="item in sectionArray"
						v-if="group.FactoryId == item.FactoryIdTag"
						:label="item.SectionName"
						:value="item.SectionId"
						:key="item.SectionId"></el-option>
				</el-option-group>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('deviceM')">保 存</el-button>
			<el-button @click="resetForm('deviceM')">关 闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import { sections, factorys } from '@/api/common.js'

	export default {
		name: 'DeviceCreate',
		data() {
			return {
				sectionArray: [],
				deviceM: {
					DeviceNumber: '',
					DeviceName: '',
					FKSectionId: ''
				},
				rules: {
					DeviceNumber: this.$verifiy.text_50,
					DeviceName: this.$verifiy.text_50,
					FKSectionId: this.$verifiy.select
				},
				factoryArray: []
			}
		},
		methods: {
			submitForm(formName) {
				this.loading = true
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$api.deviceM
							.create(this.deviceM)
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
			/**
			 * 判断当前的工厂是否存在部门
			 * @param {Object} fId 
			 */
			factHSect(fId) {
				let sects = this.sectionArray.filter(s => s.FactoryIdTag == fId);
				if (sects.length > 0)
					return true;
				else
					return false;
			}
		},
		created() {
			sections().then(res => {
				this.sectionArray = res.CurrentPageData;
			})

			factorys().then(res => {
				this.factoryArray = res.CurrentPageData;
			})
		}
	}
</script>

<style scoped>

</style>