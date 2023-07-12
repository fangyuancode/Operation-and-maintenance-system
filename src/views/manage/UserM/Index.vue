<template>
	<div class="lay-container">
		<div class="lay-container-pan" v-show="isMain">
			<!-- START 头部搜索 -->
			<div class="lay-container-condition">
				<el-form class="lay-con-form" :inline="true" :model="queryform">
					<el-form-item label="部门">
						<el-select class="select-width" v-model="queryform.GroupId" @change="changeGroup">
							<el-option v-if="isManage" label="全部" value=""></el-option>
							<el-option :label="item.GroupName" :value="item.GroupId" v-for="item in groupList" :key="item.GroupId"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="班组">
						<el-select class="select-width" v-model="queryform.ClassesId" @change="dataSoure">
							<el-option label="全部" value=""></el-option>
							<el-option :label="item.ClassesName" :value="item.ClassesId" v-for="item in moreAData.classesGList" :key="item.ClassesId"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态">
						<el-select class="select-width" v-model="queryform.IsState" @change="dataSoure">
							<el-option label="全部" value=""></el-option>
							<el-option label="启用" :value="true"> </el-option>
							<el-option label="禁用" :value="false"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="工号">
						<el-input class="select-width" v-model="queryform.UserAcc"></el-input>
					</el-form-item>
					<el-form-item label="姓名">
						<el-input class="select-width" v-model="queryform.UserName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="dataSoure">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<!-- END 头部搜索 -->
			<!-- START 主题内容 -->
			<div class="lay-container-content">
				<div>
					<el-button type="primary" plain size="mini" @click="addForm">新增</el-button>
					<el-button size="mini" @click="MoreAform">批量分组</el-button>
					<el-button size="mini" @click="synchron()">手动同步</el-button>
					<el-button size="mini">导出用户</el-button>
					<el-button size="mini" @click="init"><i class="el-icon-refresh-right"></i></el-button>
				</div>
				<ux-grid
					class="lay-container-table"
					:border="false"
					show-overflow-tooltips
					v-loading="loading"
					element-loading-text="数据加载中..."
					element-loading-spinner="el-icon-loading"
					:data="dataTable"
					@current-change="currChange"
					@selection-change="selectionChange">
					<ux-table-column type="checkbox" width="55"></ux-table-column>
					<ux-table-column field="UserAccount" title="账号(工号)"> </ux-table-column>
					<ux-table-column field="UserNick" title="昵称">
						<template slot-scope="scope">
							<input class="input-edit" type="text" v-model="scope.row.UserNick" v-show="scope.row.Iseditor" />
							<span v-show="!scope.row.Iseditor">{{ scope.row.UserNick }}</span>
						</template>
					</ux-table-column>
					<ux-table-column field="UserName" title="姓名">
						<template slot-scope="scope">
							<input class="input-edit" type="text" v-model="scope.row.UserName" v-show="scope.row.Iseditor" />
							<span v-show="!scope.row.Iseditor">{{ scope.row.UserName }}</span>
						</template>
					</ux-table-column>
					<ux-table-column field="UserPhone" title="手机号">
						<template slot-scope="scope">
							<input class="input-edit" type="number" v-model="scope.row.UserPhone" v-show="scope.row.Iseditor" />
							<span v-show="!scope.row.Iseditor">{{ scope.row.UserPhone }}</span>
						</template>
					</ux-table-column>
					<ux-table-column field="UserSex" title="性别">
						<template slot-scope="scope">
							<div>
								<span class="span-edit" v-show="!scope.row.Iseditor"></span>
								<el-radio-group size="mini" v-model="scope.row.UserSex">
									<el-radio-button :label="0">男</el-radio-button>
									<el-radio-button :label="1">女</el-radio-button>
								</el-radio-group>
							</div>
						</template>
					</ux-table-column>
					<ux-table-column field="UserInGroupName" title="部门">
						<template slot-scope="scope">
							<span class="span-edit" v-show="!scope.row.Iseditor"></span>
							<el-select size="small" style="width: 120px" :disabled="scope.row.GradeTag != 0" v-model="scope.row.GroupIdTag" @change="colChangeGroup(scope.row)">
								<el-option :value="0" label="未分部门"></el-option>
								<el-option :label="item.GroupName" :value="item.GroupId" v-for="item in groupList" :key="item.GroupId"> </el-option>
							</el-select>
						</template>
					</ux-table-column>
					<ux-table-column field="ClassesName" title="班组">
						<template slot-scope="scope">
							<span class="span-edit" v-show="!scope.row.Iseditor"></span>
							<el-select size="small" style="width: 120px" v-model="scope.row.ClassesIdTag">
								<el-option :value="0" label="未分组"></el-option>
								<el-option :label="item.ClassesName" :value="item.ClassesId" v-for="item in scope.row.ClassesGList" :key="item.ClassesId"> </el-option>
							</el-select>
						</template>
					</ux-table-column>
					<ux-table-column sortable field="IsUserState" title="状态">
						<template slot-scope="scope">
							<span class="span-edit" v-show="!scope.row.Iseditor"></span>
							<el-switch v-model="scope.row.IsUserState"></el-switch>
						</template>
					</ux-table-column>

					<ux-table-column title="操作" width="180">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" icon="el-icon-edit" circle v-if="!scope.row.Iseditor" @click="edit(scope.row, scope)"> </el-button>
							<el-button type="success" size="mini" icon="el-icon-check" circle v-if="scope.row.Iseditor" @click="edit(scope.row, scope)"> </el-button>
							<el-tooltip content="重置密码" placement="top" effect="light">
								<el-button size="mini" type="info" icon="el-icon-key" circle @click="reset(scope.row)"> </el-button>
							</el-tooltip>
							<el-tooltip content="升级管理员" placement="top" effect="light">
								<el-button v-if="isManage" type="warning" size="mini" icon="el-icon-user" circle :disabled="!scope.row.IsUserState" @click="upAdmin(scope.row, scope)"> </el-button>
							</el-tooltip>
							<el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？" @confirm="del(scope.row)">
								<el-button style="margin-left: 5px" slot="reference" size="mini" type="danger" icon="el-icon-delete" circle :disabled="scope.row.GradeTag != 0"> </el-button>
							</el-popconfirm>
						</template>
					</ux-table-column>
				</ux-grid>
			</div>
			<cusPagination :total="totalCount" :actionBar="pageBarhandle"></cusPagination>
			<!-- END  -->
		</div>
		<!-- START 添加 -->
		<create v-if="isAddform" :onSubmit="addSubmit" :groupList="groupList"></create>
		<!-- END 添加 -->
		<!-- START 批量分组 -->
		<el-dialog title="批量分组" width="450px" :visible.sync="isMoreAform">
			<moreAlter v-if="isMoreAform" :mData="moreAData" :onSubmit="moreAlterSubmit"></moreAlter>
		</el-dialog>
		<!-- END -->
		<!-- START 升级管理员 -->
		<el-dialog title="升级管理员" width="450px" :visible.sync="isUpAdminForm">
			<upAdmin v-if="isUpAdminForm" :uId="userId" :onSubmit="upAdminSubmit"></upAdmin>
		</el-dialog>
		<!-- END -->
	</div>
</template>

<script>
	import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
	import ExportExcel from '@/common/util/exportExcel.js'
	import moreAlter from './components/MoreAlterClasses.vue'
	import upAdmin from './components/UpAdmin.vue'
	import create from './components/UserCreate.vue'

	import { groups, classes } from '@/api/common.js'
	export default {
		name: 'UserM',
		data() {
			return {
				queryform: {
					GroupId: '',
					ClassesId: '',
					IsState: true,
					UserAcc: '',
					UserName: '',
				},
				moreAData: {
					groupName: '',
					userIdList: [], //选中用户ID集合
					classesGList: [], //部门下的班组集合
				},
				oldRow: '',
				userId: '',
				dataTable: [], //表数据
				groupList: [], // 部门集合
				classesList: [], // 班组
				loading: true,
				page: {
					pageindex: 1,
					pagesize: 10,
				}, //分页
				totalCount: 0,
				isMain: true, //主窗口
				isAddform: false, // 添加弹窗的显示
				isMoreAform: false, // 批量修改窗口控制
				isUpAdminForm: false, //升级管理员
				isManage: true, //是否是管理部门
			}
		},
		components: {
			cusPagination,
			moreAlter,
			upAdmin,
			create,
		},
		methods: {
			async init() {
				await groups().then((g) => {
					this.groupList = g.CurrentPageData
					let loginMsg = JSON.parse(this.$cookies.get(this.$member.ADMININFO))
					console.log(loginMsg)
					this.isManage = loginMsg.IsManageGroup
					if (!this.isManage) {
						this.groupList = this.groupList.filter((g) => g.GroupId == loginMsg.AdminGroupIdTag)
						this.queryform.GroupId = loginMsg.AdminGroupIdTag
					}
				})
				//加载班组
				classes().then((c) => {
					this.classesList = c.CurrentPageData
					this.moreAData.classesGList = this.classesList.filter((c) => c.FKGroupId == this.queryform.GroupId)
				})
				this.dataSoure()
			},
			//切换部门
			changeGroup() {
				this.queryform.ClassesId = ''
				this.moreAData.classesGList = this.classesList.filter((c) => c.FKGroupId == this.queryform.GroupId)
				this.dataSoure()
			},
			//每列修改部门
			colChangeGroup(row) {
				row.ClassesIdTag = 0
				row.ClassesGList = this.classesList.filter((c) => c.FKGroupId == row.GroupIdTag)
			},
			//添加
			addForm() {
				this.isMain = false
				this.isAddform = true
			},
			//添加回调
			addSubmit(refresh) {
				this.isAddform = false
				this.isMain = true
				if (refresh) {
					this.dataSoure()
				}
			},
			//批量修改
			MoreAform() {
				let gId = this.queryform.GroupId
				if (gId === '') {
					this.$layer.msgWarning('请先选择一个部门')
					return
				}
				if (this.moreAData.userIdList.length <= 0) {
					this.$layer.msgWarning('至少选择一个用户吧')
					return
				}
				this.moreAData.groupName = this.groupList.find((g) => g.GroupId == gId).GroupName
				console.log(this.moreAData.userIdList)
				this.isMoreAform = true
			},
			//批量修改回调
			moreAlterSubmit(refresh) {
				this.isMoreAform = false
				if (refresh) {
					this.dataSoure()
				}
			},
			reset(row) {
				console.log('密码重置', 111);
				this.$confirm('确定重置密码？', '信息提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					})
					.then(() => {
						console.log('密码重置');
						this.$api.userM.pwdReset({
							uId: row.UserId,
						}).then((res) => {
							this.$layer.msgSuccess(res)
						})
					})
					.catch(() => {})
			},
			//升级管理员
			upAdmin(row) {
				this.userId = row.UserId
				this.isUpAdminForm = true
			},
			//升级管理员回调
			upAdminSubmit(refresh) {
				this.isUpAdminForm = false
				if (refresh) {
					this.dataSoure()
				}
			},
			// 编辑
			edit(row, scope) {
				if (row.Iseditor) {
					let AccV = this.$verifiy.accValid(row.UserNick)
					if (AccV != undefined) {
						this.$layer.msgWarning(AccV)
						return
					}
					if (this.$verifiy.textValid(row.UserName, 20)) {
						return
					}
					let phoneV = this.$verifiy.phoneValid(row.UserPhone)
					if (phoneV != undefined) {
						this.$layer.msgWarning(phoneV)
						return
					}
					if (JSON.stringify(row) != this.oldRow) {
						this.$api.userM
							.update(row)
							.then((res) => {
								this.$layer.msgSuccess(res)
							}).catch((err) => {});
					}
					row.Iseditor = false
				} else {
					row.Iseditor = true
					this.oldRow = JSON.stringify(row)
				}
			},
			//删除
			del(row) {
				this.$api.userM
					.remove({
						id: row.UserId,
					})
					.then((res) => {
						this.$layer.msgSuccess(res)
						this.dataSoure()
					})
			},
			//监听表当前行
			currChange(curr) {
				this.dataTable.forEach(d => {
					if (d.Iseditor && d.UserId != curr.UserId) { d.Iseditor = false }
				})
			},
			//监听表选中行
			selectionChange(selection) {
				this.moreAData.userIdList = selection.map((i) => {
					return i.UserId
				})
			},
			// 分页栏的操作
			pageBarhandle(page) {
				this.page.pageindex = page.pageindex
				this.page.pagesize = page.pagesize
				this.dataSoure()
			},
			//手动同步用户
			synchron() {
				this.$api.userM.synchron().then((res) => {
					this.$layer.msgSuccess(res)
					this.dataSoure()
				})
			},
			// 数据源
			async dataSoure() {
				this.loading = true
				let query = {
					PageIndex: this.page.pageindex,
					PageSize: this.page.pagesize,
					GroupId: this.queryform.GroupId,
					ClassesId: this.queryform.ClassesId,
					IsState: this.queryform.IsState,
					UserName: this.queryform.UserName,
					UserAcc: this.queryform.UserAcc,
				}
				console.log(query)
				await this.$api.userM
					.queryMore(query)
					.then((res) => {
						this.totalCount = res.TotalCount
						this.dataTable = res.CurrentPageData
						this.dataTable.forEach((item) => {
							let tempL = this.classesList.filter((c) => c.FKGroupId == item.GroupIdTag)
							if (tempL.length > 0) {
								item.ClassesGList = tempL
							}
						})
					})
					.finally((f) => {
						this.loading = false
					})
			},
			//导出
			exportAcc() {
				// excel 头部
				let excel_headers = [
					{ key: 'UserAccount', title: '工号' },
					{ key: 'UserName', title: '姓名' },
					{ key: 'UserSex', title: '性别' },
					{ key: 'UserInGroupName', title: '部门' },
					{ key: 'InPostDate', title: '入职时间' },
					{ key: 'OutPostDate', title: '离职时间' },
					{ key: 'UserPhone', title: '联系电话' },
				]
				// excel 数据
				let excel_data = []
				this.$api.userM.batchExport().then((res) => {
					let excel_data = res.CurrentPageData
					excel_data.forEach((item) => {
						item.UserSex = item.UserSex == 0 ? '男' : '女'
					})
					ExportExcel(excel_headers, excel_data, `世纪恒祥--用户数据表.xlsx`)
				})
			},
		},
		beforeMount() {
			this.init()
		},
	}
</script>

<style scoped="scoped">
	.select-width {
		width: 150px;
	}
</style>
