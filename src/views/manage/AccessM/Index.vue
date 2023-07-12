<template>
	<div class="lay-container">
		<div class="lay-container-pan" v-show="isMain">
			<!-- START 头部搜索 -->
			<div class="lay-container-condition">
				<el-form :inline="true" :model="queryform" class="demo-form-inline">
					<el-form-item label="父级筛选">
						<el-select v-model="queryform.ParentTag" @change="dataSoure">
							<el-option label="全部" value=""></el-option>
							<el-option :label="item.ParAccName" :value="item.ParAccId" v-for="item in parentList" :key="item.ParAccId"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="验证筛选">
						<el-select v-model="queryform.IsIgnore" @change="dataSoure">
							<el-option label="无需验证" :value="true"></el-option>
							<el-option label="需要验证" :value="false"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<!-- END -->
			<!-- START 主题内容 -->
			<div class="lay-container-content">
				<div>
					<el-button type="primary" plain size="mini" @click="addform">新增</el-button>
					<el-button type="success" size="mini" @click="batchImportFrom">批量导入</el-button>
					<el-button type="warning" size="mini" @click="exportAcc">批量导出</el-button>
					<el-button size="mini" icon="el-icon-refresh-right" @click="init"></el-button>
				</div>
				<ux-grid
					class="lay-container-table"
					:border="false"
					show-overflow-tooltips
					v-loading="loading"
					element-loading-text="数据加载中..."
					element-loading-spinner="el-icon-loading"
					:data="dataTable">
					<ux-table-column field="AccName" title="权限名"> </ux-table-column>
					<ux-table-column field="AccUrl" title="权限路径"> </ux-table-column>
					<ux-table-column field="AccParTagName" title="父级"> </ux-table-column>
					<ux-table-column field="IsFrontAcc" title="前端权限标记">
						<template slot-scope="scope">
							{{ scope.row.IsFrontAcc==true?'前端':'后端' }}
						</template>
					</ux-table-column>
					<ux-table-column field="IsIgnore" title="验证">
						<template slot-scope="scope">
							{{ scope.row.IsIgnore==false?'√':'×'}}
						</template>
					</ux-table-column>
					<ux-table-column field="TierTag" title="层标记"> </ux-table-column>
					<ux-table-column field="RelationStr" title="关联的权限"> </ux-table-column>
					<ux-table-column title="操作">
						<template slot-scope="scope">
							<el-tooltip content="权限关联" placement="top" effect="light">
								<el-button @click="handletableCol('related', scope.row)" size="mini" type="success" icon="bi bi-gear-wide-connected" circle>
								</el-button>
							</el-tooltip>
							<el-button @click="handletableCol('edit', scope.row)" size="mini" type="primary" icon="el-icon-edit" circle> </el-button>
							<el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？" @confirm="handletableCol('del', scope.row)">
								<el-button style="margin-left: 8px" slot="reference" size="mini" type="danger" icon="el-icon-delete" circle> </el-button>
							</el-popconfirm>
						</template>
					</ux-table-column>
				</ux-grid>
			</div>
			<cusPagination :total="totalCount" :actionBar="pageBarhandle"></cusPagination>
			<!-- END -->
		</div>

		<!-- START 添加 -->
		<accessCreate v-if="isAddform" :parentList="parentList" :onSubmit="addSubmit"></accessCreate>
		<!-- END  -->

		<!-- START 权限批量导入 -->
		<batchImport v-if="isBatchImportFrom" :onSubmit="batchSubmit" actionUrl="/api/AccessM/BatchImport"> </batchImport>
		<!-- END -->

		<!-- START  权限关联-->
		<accessRelation v-if="isRelatedform" :eData="eData" :onSubmit="relatedSubmit"></accessRelation>
		<!-- END -->

		<!-- START 编辑 -->
		<accessEidt v-if="isEditform" :parentList="parentList" :eData="eData" :onSubmit="editSubmit"> </accessEidt>
		<!-- END -->
	</div>
</template>

<script>
	import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
	import accessCreate from './components/AccessCreate.vue'
	import accessEidt from './components/AccessEidt.vue'
	import accessRelation from './components/AccessRelation.vue'
	import batchImport from '@/components/Cus-BatchImport/Cus-BatchImport.vue'
	import ExportExcel from '@/common/util/exportExcel.js'
	export default {
		name: 'AccessM',
		data() {
			return {
				queryform: {
					ParentTag: '',
					IsIgnore: false,
				},
				parentList: [], // 父级权限
				dataTable: [], // 权限数据
				isMain: true,
				isAddform: false,
				isEditform: false,
				isRelatedform: false,
				isBatchImportFrom: false,
				eData: {},

				loading: true,
				page: {
					pageindex: 1,
					pagesize: 10,
				}, //分页
				totalCount: 0,
			}
		},
		components: {
			cusPagination,
			accessCreate,
			accessEidt,
			accessRelation,
			batchImport,
		},
		methods: {
			init() {
				this.$api.accessM.queryParent().then((res) => {
					this.parentList = res.CurrentPageData
					this.totalCount = res.TotalCount
				})
				this.dataSoure()
			},
			//添加窗口
			addform() {
				this.isMain = false
				this.isAddform = true
			},
			// 添加回调
			addSubmit(refresh) {
				this.isAddform = false
				this.isMain = true
				if (refresh) {
					this.dataSoure()
				}
			},
			//权限批量导入
			batchImportFrom() {
				this.isMain = false
				this.isBatchImportFrom = true
			},
			//权限批量导入回调
			batchSubmit(refresh) {
				this.isBatchImportFrom = false
				this.isMain = true
				if (refresh) {
					this.dataSoure()
				}
			},
			// 编辑回调
			editSubmit(refresh) {
				this.isEditform = false
				this.isMain = true
				if (refresh) {
					this.dataSoure()
				}
			},
			// 权限关联回调
			relatedSubmit(refresh) {
				this.isRelatedform = false
				this.isMain = true
				if (refresh) {
					this.dataSoure()
				}
			},
			// 表单的操作栏
			handletableCol(type, row) {
				console.log(row)
				if (type == 'edit') {
					this.eData = row
					this.isEditform = true
					this.isMain = false
				} else if (type === 'related') {
					this.eData = row
					this.isRelatedform = true
					this.isMain = false
				} else if (type == 'del') {
					this.$api.accessM
						.remove({
							id: row.AccId,
						})
						.then((res) => {
							this.$layer.msgSuccess(res)
							this.dataSoure()
						})
						.catch((err) => {
							console.log(err)
						})
				}
			},
			// 分页栏的操作
			pageBarhandle(page) {
				this.page.pageindex = page.pageindex
				this.page.pagesize = page.pagesize
				this.dataSoure()
			},
			// 数据源
			async dataSoure() {
				this.loading = true
				await this.$api.accessM
					.queryMore({
						PageIndex: this.page.pageindex,
						PageSize: this.page.pagesize,
						IsIgnore: this.queryform.IsIgnore,
						ParentTag: this.queryform.ParentTag,
					})
					.then((res) => {
						this.totalCount = res.TotalCount
						this.dataTable = res.CurrentPageData
					})
					.finally((f) => {
						this.loading = false
					})
			},
			exportAcc() {
				// excel 头部
				let excel_headers = [
					{ key: 'AccId', title: 'ID' },
					{ key: 'AccName', title: '权限名称' },
					{ key: 'AccUrl', title: '网址URL' },
					{ key: 'AccParTagName', title: '父级名称' },
					{ key: 'IsFrontAcc', title: '前端权限标记' },
					{ key: 'TierTag', title: '层标记' },
					{ key: 'IsIgnore', title: '无需验证' },
					{ key: 'SideTag', title: 'side模块' },
				]
				// excel 数据
				this.$api.accessM.batchExport().then((res) => {
					console.log('权限的批量导出：', res.CurrentPageData)
					let resData = res.CurrentPageData
					if (resData == null) {
						return
					}
					// 获得父级权限
					let parAccs = resData.filter((rd) => rd.AccParTag == 0) // 用于数据分组
					let parAccs_Copy = parAccs // 用于数据循环
					let excel_data = []
					// 循环分组添加数据
					parAccs_Copy.forEach((par) => {
						par.AccParTagName = '顶级'
						par.IsIgnore = par.IsIgnore ? 1 : 0
						par.IsFrontAcc = par.IsFrontAcc ? 0 : 1
						// 根据当前父级权限获得相对应的子级权限
						let childAccs = resData.filter((rd) => rd.AccParTag == par.AccId)
						console.log(childAccs)
						excel_data.push(par)
						// 循环添加父级权限名称
						for (var i = 0; i < childAccs.length; i++) {
							childAccs[i].AccParTagName = par.AccName
							childAccs[i].IsIgnore = childAccs[i].IsIgnore ? 1 : 0
							childAccs[i].IsFrontAcc = childAccs[i].IsFrontAcc == true ? 0 : 1
							excel_data.push(childAccs[i])
						}
					})
					console.log('EXCEL 数据：', excel_headers, excel_data)
					ExportExcel(excel_headers, excel_data, `权限表.xlsx`)
				})
			},
		},
		beforeMount() {
			this.init()
		},
	}
</script>
<style scoped="scoped">
	
</style>
