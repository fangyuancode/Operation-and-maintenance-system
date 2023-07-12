 <template>
 	<el-form @submit.native.prevent class="lay-con-layer" ref=" libraryPlaceM" label-width="100px" :model=" libraryPlaceM"
 		:rules="rules">
 		<el-page-header class="form-header" @back="resetForm(' libraryPlaceM')" content="新增设备分类"> </el-page-header>
 		<el-form-item label="库名:" prop="LibraryPlaceName">
 			<el-input v-model=" libraryPlaceM.LibraryPlaceName"></el-input>
 		</el-form-item>
 		<el-form-item label="部门:" prop="SectionIdTag">
 			<el-select v-model="libraryPlaceM.SectionIdTag">
 				<el-option
 					v-for="item in sectionArr"
 					:label="item.SectionName"
 					:value="item.SectionId"
 					:key="item.SectionId"></el-option>
 			</el-select>
 		</el-form-item>
 		<el-form-item>
 			<el-button type="primary" @click="submitForm(' libraryPlaceM')">保 存</el-button>
 			<el-button @click="resetForm(' libraryPlaceM')">关 闭</el-button>
 		</el-form-item>
 	</el-form>
 </template>

 <script>
 	import { sections } from '@/api/common'

 	export default {
 		name: 'EquipClassifyCreate',
 		data() {
 			return {
 				sectionArr: [],
 				libraryPlaceM: {
 					LibraryPlaceName: '',
 					SectionIdTag: ''
 				},
 				rules: {
 					LibraryPlaceName: this.$verifiy.text_20,
 					SectionIdTag: this.$verifiy.select
 				},
 			}
 		},
 		methods: {
 			init() {
 				sections().then(res => {
 					this.sectionArr = res.CurrentPageData
 				})
 			},
 			submitForm(formName) {
 				this.loading = true
 				this.$refs[formName].validate((valid) => {
 					if (valid) {
 						this.$api.libraryPlaceM
 							.create(this.libraryPlaceM)
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
 		created() {
 			this.init()
 		}
 	}
 </script>

 <style scoped="scoped">

 </style>