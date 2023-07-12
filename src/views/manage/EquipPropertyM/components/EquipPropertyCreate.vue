<template>
	<el-form @submit.native.prevent class="lay-con-layer" ref="equipPropertyM" label-width="100px"
		:model="equipPropertyM"
		:rules="rules">
		<el-page-header class="form-header" @back="resetForm('equipPropertyM')" content="新增设备属性"></el-page-header>
		<el-form-item label="属 性 名:" prop="EquipPropertyName">
			<el-input v-model="equipPropertyM.EquipPropertyName"></el-input>
		</el-form-item>
		<el-form-item label="英 文 名:" prop="EquipPropertyEnglish">
			<el-input v-model="equipPropertyM.EquipPropertyEnglish"></el-input>
		</el-form-item>
		<el-form-item label="设备类型:" prop="EquipTypeIdTag">
			<el-select v-model="equipPropertyM.EquipTypeIdTag" placeholder="请选择设备类型">
				<el-option
					v-for="item in equipTypes"
					:label="item.EquipTypeName"
					:value="item.EquipTypeId"
					:key="item.EquipTypeId"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="单 位:" prop="EquipPropertyUnit">
			<el-input v-model="equipPropertyM.EquipPropertyUnit"></el-input>
		</el-form-item>
		<el-form-item label="状 态:" prop="EquipPropertyState">
			<el-radio-group v-model="equipPropertyM.EquipPropertyState">
				<el-radio-button :label="true">开启</el-radio-button>
				<el-radio-button :label="false">关闭</el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('equipPropertyM')">保 存</el-button>
			<el-button @click="resetForm('equipPropertyM')">关 闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import { equipTypes } from '@/api/common.js'

	export default {
		name: 'FactoryCreate',
		data() {
			return {
				equipTypes: [],
				equipPropertyM: {
					EquipPropertyName: '',
					EquipPropertyEnglish: '',
					EquipTypeIdTag: '',
					EquipPropertyUnit: '',
					EquipPropertyState: true
				},
				rules: {
					EquipPropertyName: this.$verifiy.text_30,
					EquipPropertyEnglish: this.$verifiy.text_30,
					EquipTypeIdTag: this.$verifiy.select,
					EquipPropertyUnit: this.$verifiy.text_20
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.loading = true
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$api.equipPropertyM
							.create(this.equipPropertyM)
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
			equipTypes().then(res => {
				this.equipTypes = res.CurrentPageData;
			})
		}
	}
</script>

<style scoped="scoped">
</style>