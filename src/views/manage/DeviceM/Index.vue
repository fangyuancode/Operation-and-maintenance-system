<template>
	<div class="lay-container">
		<div class="lay-container-pan" v-show="isMain">
			<!-- START 头部搜索 -->
			<div class="lay-container-condition">
				<el-form :inline="true" :model="queryform" class="demo-form-inline">
					<el-form-item label="工 厂">
						<el-select v-model="queryform.FactoryIdTag" placeholder="全部工厂" @change="secLink('fact')">
							<el-option label="全部工厂" value=""></el-option>
							<el-option
								v-for="item in factoryArray"
								:label="item.FactoryName"
								:value="item.FactoryId"
								:key="item.FactoryId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="工厂部门">
						<el-select v-model="queryform.FKSectionId" @change="secLink('sec')">
							<el-option label="全部工厂部门" value=""></el-option>
							<el-option
								v-for="item in sectionArray"
								v-if="item.FactoryIdTag==queryform.FactoryIdTag"
								:label="item.SectionName"
								:value="item.SectionId"
								:key="item.SectionId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="装置编号:" prop="DeviceNumber" v-show="inputQTag">
						<el-input v-model="queryform.DeviceNumber"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button icon="el-icon-search" type="primary" @click="dataSoure"></el-button>
					</el-form-item>
				</el-form>
			</div>
			<!-- END -->
			<!-- START 主题内容 -->
			<div class="lay-container-content">
				<div>
					<el-button type="primary" plain size="mini" @click="addFrom">新增</el-button>
					<el-button size="mini" icon="el-icon-refresh-right" @click="init"></el-button>
				</div>
				<ux-grid
					class="lay-container-table"
					:border="false"
					show-overflow-tooltips
					v-loading="loading"
					element-loading-text="数据加载中..."
					element-loading-spinner="el-icon-loading"
					:data="dataTable"
					@current-change="currChange">
					<ux-table-column title="装置编号">
						<template slot-scope="scope">
							<input class="input-edit" type="text" v-model="scope.row.DeviceNumber"
								v-show="scope.row.Iseditor" />
							<span v-show="!scope.row.Iseditor">{{ scope.row.DeviceNumber }}</span>
						</template>
					</ux-table-column>
					<ux-table-column title="装置名称">
						<template slot-scope="scope">
							<input class="input-edit" type="text" v-model="scope.row.DeviceName"
								v-show="scope.row.Iseditor" />
							<span v-show="!scope.row.Iseditor">{{ scope.row.DeviceName }}</span>
						</template>
					</ux-table-column>
					<ux-table-column title="所属工厂">
						<template slot-scope="scope">
							<span>{{ scope.row.FactoryName ? scope.row.FactoryName : '' }}</span>
						</template>
					</ux-table-column>
					<ux-table-column title="工厂部门名">
						<template slot-scope="scope">
							<el-select size="mini" :disabled="!scope.row.Iseditor" v-model="scope.row.FKSectionId">
								<el-option
									v-for="item in getSection(scope.row)"
									:label="item.SectionName"
									:value="item.SectionId"
									:key="item.SectionId"></el-option>
							</el-select>
						</template>
					</ux-table-column>

					<ux-table-column title="操作">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" icon="el-icon-edit" circle v-if="!scope.row.Iseditor"
								@click="edit(scope.row, scope)">
							</el-button>
							<el-button type="success" size="mini" icon="el-icon-check" circle v-if="scope.row.Iseditor"
								@click="edit(scope.row, scope)">
							</el-button>
							<el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？"
								@confirm="del(scope.row, scope)">
								<el-button style="margin-left: 5px" slot="reference" size="mini" type="danger"
									icon="el-icon-delete" circle> </el-button>
							</el-popconfirm>
						</template>
					</ux-table-column>
				</ux-grid>
			</div>
			<!-- END -->
			<cusPagination :total="totalCount" :actionBar="pageBarhandle"></cusPagination>
		</div>

		<!-- START 添加 -->
		<deviceCreate v-if="isAddform" @onSubmit="addSubmit"></deviceCreate>
		<!-- END -->


	</div>
</template>

<script>
	import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
	import deviceCreate from './components/DeviceCreate.vue'
	import { factorys, sections } from '@/api/common.js'

	export default {
		name: 'DeviceM',
		data() {
			return {
				oldRow: '',
				dataTable: [], // 部门的表格数据
				queryform: {
					PageIndex: 1,
					PageSize: 10,
					FactoryIdTag: '', // 工厂ID标
					FKSectionId: '',
					DeviceNumber: '',
				},
				loading: true, // 表单加载动画
				isMain: true, //主窗显示
				isAddform: false, // 添加弹窗的显示
				isEditform: false, // 编辑的弹窗
				totalCount: 0,
				factoryArray: [],
				sectionArray: [],
				inputQTag: false
			}
		},
		components: {
			cusPagination,
			deviceCreate,
		},
		methods: {
			init() {
				factorys().then(res => {
					this.factoryArray = res.CurrentPageData;
				})
				sections().then(res => {
					this.sectionArray = res.CurrentPageData;
				})
				this.dataSoure()
			},
			// 分页栏的操作
			pageBarhandle(page) {
				this.queryform.PageIndex = page.pageindex
				this.queryform.PageSize = page.pagesize
				this.dataSoure()
			},
			//添加窗口
			addFrom() {
				this.isAddform = true
				this.isMain = false
			},
			// 添加窗口的回调
			addSubmit(refresh) {
				this.isAddform = false
				this.isMain = true
				if (refresh) {
					this.dataSoure()
				}
			},
			// 编辑 
			edit(row, scope) {
				if (row.Iseditor) {
					this.$set(row, 'SectionName', row.DeviceName.trim())
					if (this.$verifiy.textValid(row.DeviceName, 50)) {
						return
					}
					this.$set(row, 'SectionName', row.DeviceNumber.trim())
					if (this.$verifiy.textValid(row.DeviceNumber, 50)) {
						return
					}
					if (JSON.stringify(row) != this.oldRow) {
						this.$api.deviceM
							.update(row)
							.then((res) => {
								this.$layer.msgSuccess(res)
							}).catch((err) => {})
					}
					this.$set(row, 'Iseditor', false)
				} else {
					this.$set(row, 'Iseditor', true)
					this.oldRow = JSON.stringify(row)
				}
			},
			//删除
			del(row, scope) {
				this.$api.deviceM
					.remove({
						id: row.DeviceId
					})
					.then((res) => {
						this.$layer.msgSuccess(res)
						this.dataSoure()
					})
			},
			// 数据
			async dataSoure() {
				this.loading = true
				await this.$api.deviceM
					.query(this.queryform)
					.then((res) => {
						console.log('数据列表：', res);
						this.dataTable = res.CurrentPageData
						this.totalCount = res.TotalCount
					})
					.finally((f) => {
						this.loading = false
					})
			},
			// 部门关联
			secLink(tag) {
				if (tag == 'fact') {
					this.queryform.FKSectionId = '';
					this.queryform.DeviceNumber = '';
					this.inputQTag = false;
					this.dataSoure();
				} else if (tag == 'sec') {
					this.queryform.DeviceNumber = '';
					if (this.queryform.FKSectionId == '')
						this.inputQTag = false;
					else
						this.inputQTag = true;
					this.dataSoure();
				}
			},
			/**
			 * * 根据部门id查询当前工厂下面所有的部门
			 * @param {Object} id    部门id
			 * @param {Object} row   行数据
			 */
			getSection(row) {
				let sect = this.sectionArray.filter(s => s.SectionId == row.FKSectionId);
				if (sect.length > 0) { // 查工厂
					console.log('查询出来的工厂：', sect[0].FactoryIdTag);
					let factory = this.factoryArray.filter(f => f.FactoryId == sect[0].FactoryIdTag);
					this.$set(row, 'FactoryName', factory[0].FactoryName)
				}
				let sectArray = this.sectionArray.filter(s => s.FactoryIdTag == sect[0].FactoryIdTag);
				return sectArray;
			},
			currChange(curr) {
				this.dataTable.forEach(d => {
					if (d.Iseditor && d.DeviceId != curr.DeviceId) { d.Iseditor = false }
				})
			}
		},
		mounted() {
			this.init();
		},
	}
</script>

<style scoped="scoped">
	.span-edit {
		position: absolute;
		width: 42px;
		height: 26px;
		z-index: 99;
	}
</style>