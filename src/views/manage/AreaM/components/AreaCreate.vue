<template>
	<el-form @submit.native.prevent class="lay-con-layer" ref="areaM" label-width="100px" :model="areaM"
		:rules="rules">
		<el-page-header class="form-header" @back="resetForm('areaM')" content="新增区域"></el-page-header>
		<el-form-item label="工厂部门:" prop="DeviceIdTag">
			<el-select v-model="areaM.DeviceIdTag" placeholder="请选择装置">
				<el-option-group
					v-for="group in sectionArray"
					v-if="sectHDev(group.SectionId)"
					:label="group.SectionName"
					:value="group.SectionId"
					:key="group.SectionId">
					<el-option
						v-for="item in deviceArray"
						v-if="group.SectionId == item.FKSectionId"
						:label="item.DeviceName"
						:value="item.DeviceId"
						:key="item.DeviceId"></el-option>
				</el-option-group>
			</el-select>
		</el-form-item>
		<el-form-item label="区域名称:" prop="AreaName">
			<el-input v-model="areaM.AreaName"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('areaM')">保 存</el-button>
			<el-button @click="resetForm('areaM')">关 闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'AreaCreate',
		props: {
			sectionArray: [],
			deviceArray: []
		},
		data() {
			return {
				areaM: {
					DeviceIdTag: '',
					AreaName: ''
				},
				rules: {
					DeviceIdTag: this.$verifiy.select,
					AreaName: this.$verifiy.text_30
				},
			}
		},
		methods: {
			submitForm(formName) {
				this.loading = true
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$api.areaM
							.create(this.areaM)
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
			 * 判断当前工厂部门是否存在装置
			 * @param {Object} sId  工厂部门id
			 */
			sectHDev(sId) {
				let devs = this.deviceArray.filter(s => s.FKSectionId == sId);
				if (devs.length > 0)
					return true;
				else
					return false;
			}
		},
		created() {

		}
	}
</script>

<style scoped="scoped">
</style>