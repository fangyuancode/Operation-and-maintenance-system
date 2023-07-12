<template>
	<div class="lay-container">
		<div class="lay-container-pan" v-show="isMain">
			<!-- START 头部搜索 -->
			<div class="lay-container-condition">
				<el-form :inline="true" :model="queryform" class="demo-form-inline">
					<el-form-item label="验证筛选">
						<el-select v-model="queryform.FactoryIdTag" placeholder="全部工厂" @change="dataSoure">
							<el-option
								v-for="item in factoryArray"
								:label="item.FactoryName"
								:value="item.FactoryId"
								:key="item.FactoryId"></el-option>
						</el-select>
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
					<ux-table-column title="工厂部门名称">
						<template slot-scope="scope">
							<input class="input-edit" type="text" v-model="scope.row.SectionName"
								v-show="scope.row.Iseditor" />
							<span v-show="!scope.row.Iseditor">{{ scope.row.SectionName }}</span>
						</template>
					</ux-table-column>
					<ux-table-column title="所属工厂">
						<template slot-scope="scope">
							<el-select size="mini" :disabled="!scope.row.Iseditor" v-model="scope.row.FactoryIdTag">
								<el-option
									v-for="item in factoryArray"
									:label="item.FactoryName"
									:value="item.FactoryId"
									:key="item.FactoryId"></el-option>
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
		<sectionCreate v-if="isAddform" @onSubmit="addSubmit"></sectionCreate>
		<!-- END -->

	</div>
</template>

<script>
	import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
	import sectionCreate from './components/SectionCreate.vue'
	import { factorys } from '@/api/common.js'

	export default {
		name: 'FactoryM',
		data() {
			return {
				oldRow: '',
				dataTable: [], // 部门的表格数据
				queryform: {
					PageIndex: 1,
					PageSize: 10,
					FactoryIdTag: ""
				},
				loading: true, // 表单加载动画
				isMain: true, //主窗显示
				isAddform: false, // 添加弹窗的显示
				totalCount: 0,
				factoryArray: []
			}
		},
		components: {
			cusPagination,
			sectionCreate
		},
		methods: {
			init() {
				factorys().then(res => {
					this.factoryArray = res.CurrentPageData;
				})
				this.dataSoure()
			},
			// 分页栏的操作
			pageBarhandle(page) {
				this.queryform.PageIndex = page.pageindex
				this.queryform.PageSize = page.pagesize
				this.dataSoure()
			},
			//添加的窗口
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
					this.$set(row, 'SectionName', row.SectionName.trim())
					if (this.$verifiy.textValid(row.SectionName, 20)) {
						return
					}
					if (JSON.stringify(row) != this.oldRow) {
						this.$api.sectionM
							.update(row)
							.then((res) => {
								this.$layer.msgSuccess(res)
								this.$set(row, 'Iseditor', false)
							}).catch((err) => {})
					} else
						this.$set(row, 'Iseditor', false)
				} else {
					this.$set(row, 'Iseditor', true)
					this.oldRow = JSON.stringify(row)
				}
			},
			//删除
			del(row, scope) {
				this.$api.sectionM
					.remove({
						id: row.SectionId
					})
					.then((res) => {
						this.$layer.msgSuccess(res)
						this.dataSoure()
					})
			},
			// 数据
			async dataSoure() {
				this.loading = true
				await this.$api.sectionM
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
			currChange(curr) {
				this.dataTable.forEach(d => {
					if (d.Iseditor && d.SectionId != curr.SectionId) { d.Iseditor = false }
				})
			},
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