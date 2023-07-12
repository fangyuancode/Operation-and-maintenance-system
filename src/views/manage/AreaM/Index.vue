<template>
	<div class="lay-container">
		<div class="lay-container-pan" v-show="isMain">
			<!-- START 头部搜索 -->
			<div class="lay-container-condition">
				<el-form :inline="true" :model="queryform" class="demo-form-inline">
					<el-form-item label="工厂部门">
						<el-select v-model="queryform.FKSectionId" placeholder="全部工厂部门" @change="sectHandle">
							<el-option label="全部工厂部门" value=""></el-option>
							<el-option
								v-for="item in sectionArray"
								:label="item.SectionName"
								:value="item.SectionId"
								:key="item.SectionId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="装置">
						<el-select v-model="queryform.DeviceIdTag" @change="dataSoure">
							<el-option label="全部装置" value=""></el-option>
							<el-option
								v-for="item in deviceArray"
								v-if="item.FKSectionId==queryform.FKSectionId"
								:label="item.DeviceName"
								:value="item.DeviceId"
								:key="item.DeviceId"></el-option>
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
					<ux-table-column title="区域名称">
						<template slot-scope="scope">
							<input class="input-edit" type="text" v-model="scope.row.AreaName"
								v-show="scope.row.Iseditor" />
							<span v-show="!scope.row.Iseditor">{{ scope.row.AreaName.trim() }}</span>
						</template>
					</ux-table-column>
					<ux-table-column title="所属装置">
						<template slot-scope="scope">
							<el-select size="mini" :disabled="!scope.row.Iseditor" v-model="scope.row.DeviceIdTag" placeholder="">
								<el-option
									v-for="item in deviceFilter(scope.row.DeviceIdTag)"
									:label="item.DeviceName"
									:value="item.DeviceId"
									:key="item.DeviceId"></el-option>
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
		<areaCreate v-if="isAddform" :sectionArray="sectionArray" :deviceArray="deviceArray" @onSubmit="addSubmit"></areaCreate>
		<!-- END -->

	</div>
</template>

<script>
	import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
	import areaCreate from './components/AreaCreate.vue'
	import { sections, devices } from '@/api/common.js'
	export default {
		name: 'AreaM',
		data() {
			return {
				oldRow: '',
				dataTable: [], // 部门的表格数据
				queryform: {
					PageIndex: 1,
					PageSize: 10,
					FKSectionId: '', // 部门 id
					DeviceIdTag: '' // 装置 id
				},
				loading: true, // 表单加载动画
				isMain: true, //主窗显示
				isAddform: false, // 添加弹窗的显示
				totalCount: 0,
				sectionArray: [], // 工厂部门
				deviceArray: [] // 装置
			}
		},
		components: {
			cusPagination,
			areaCreate
		},
		methods: {
			init() {
				sections().then(res => {
					this.sectionArray = res.CurrentPageData;
				})
				devices().then(res => {
					this.deviceArray = res.CurrentPageData;
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
					if (this.$verifiy.textValid(row.AreaName, 30)) {
						return
					}
					if (JSON.stringify(row) != this.oldRow) {
						this.$api.areaM
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
				this.$api.areaM
					.remove({
						id: row.AreaId
					})
					.then((res) => {
						this.$layer.msgSuccess(res)
						this.dataSoure()
					})
			},
			// 数据
			async dataSoure() {
				this.loading = true
				await this.$api.areaM
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
					if (d.Iseditor && d.AreaId != curr.AreaId) { d.Iseditor = false }
				})
			},
			// 工厂部门的操作
			sectHandle() {
				this.queryform.DeviceIdTag = '';
				this.dataSoure();
			},
			/**
			 * 根据装置id获取当前装置所在部门的所有装置
			 * @param {Object} devId  装置id
			 */
			deviceFilter(devId) {
				let devItem = this.deviceArray.filter(d => d.DeviceId == devId);
				if (!devItem[0]) { return []; }
				console.log('装置ID:', devId, '工厂部门：', devItem[0].FKSectionId);
				let devArr = this.deviceArray.filter(d => d.FKSectionId == devItem[0].FKSectionId);
				return devArr;
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