<template>
	<div>
		<!-- 头部导航栏 START -->
		<el-menu
			class="cus-menu"
			mode="horizontal"
			:background-color="topMeun.theme_color"
			:text-color="topMeun.text_color"
			:active-text-color="topMeun.active_color">
			<el-menu-item index="1" @click="topHandle('collapse')">
				<i :class="{ 'bi-text-indent-right': !collapse, 'bi-text-indent-left': collapse }" :style="cusMeunIcon"
					title="侧边伸缩"></i>
			</el-menu-item>
			<el-menu-item index="2" v-show="clientPage.width > 800">
				<router-link to="/Front/Login" target="_blank"><i class="bi-globe2" :style="cusMeunIcon" title="首页"></i>
				</router-link>
			</el-menu-item>
			<el-menu-item index="5" v-show="clientPage.width > 220" class="cus-user-icon cus-menu-item">
				<el-dropdown @command="adminHandle">
					<span :style="cusMeunIcon"> {{ adminInfo.LoginName }} <i class="el-icon-arrow-down el-icon--right"
							:style="cusMeunIcon"></i> </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="infoModify">修改信息</el-dropdown-item>
						<el-dropdown-item command="pwdModify">修改密码</el-dropdown-item>
						<el-dropdown-item command="signout">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-menu-item>
			<el-menu-item index="4" @click="topHandle('screen')" v-show="clientPage.width > 800" class="cus-menu-item">
				<i
					class="bi"
					:class="{ 'bi-arrows-fullscreen': !fullscreen, 'bi-fullscreen-exit': fullscreen }"
					:style="cusMeunIcon"
					:title="fullscreen == false ? '全屏' : '退出全屏'"></i>
			</el-menu-item>
			<el-menu-item index="3" class="cus-menu-item" title="主题" v-show="clientPage.width > 800">
				<el-popover placement="bottom" width="300" trigger="click">
					<cus-Theme></cus-Theme>
					<i slot="reference" class="bi bi-palette" :style="cusMeunIcon"></i>
				</el-popover>
			</el-menu-item>
		</el-menu>
		<!-- 头部导航栏 END -->

		<!-- 页面菜单标签操作 START -->
		<meunTag></meunTag>
		<!-- 页面菜单标签操作 END -->

		<!-- START  管理员信息修改弹窗-->
		<el-dialog title="我的信息修改" :visible.sync="infoModifyForm" width="450px" append-to-body>
			<adminEdit :adminId="adminInfo.AdminId" :onSubmit="infoModify" v-if="infoModifyForm"></adminEdit>
		</el-dialog>
		<!-- END  管理员信息修改弹窗-->

		<!-- START  管理员密码修改弹窗-->
		<el-dialog title="我的密码修改" :visible.sync="adminPwdModifyFrom" width="450px" append-to-body>
			<adminPwdModify @onSubmit="adminPwdModify" v-if="adminPwdModifyFrom"> </adminPwdModify>
		</el-dialog>
		<!-- END  管理员密码修改弹窗-->
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import screenfull from 'screenfull'
	import cusTheme from '@/views/manage/MainM/components/Theme.vue'
	import adminEdit from './AdminInfoModify.vue'
	import adminPwdModify from './AdminPwdModify.vue'
	import meunTag from './MeunTag.vue'

	export default {
		name: 'MenuHeader',
		props: {
			clientPage: Object,
		},
		data() {
			return {
				fullscreen: false, // 全屏状态
				adminInfo: {
					AdminId: 0,
					LoginName: '',
				},
				infoModifyForm: false,
				adminPwdModifyFrom: false,
				adminId: 0, // 管理员的id
				activeName: 'second',
				cusMeunIcon: {}, // 菜单图标的颜色
			}
		},
		components: {
			cusTheme,
			adminEdit,
			adminPwdModify,
			meunTag,
		},
		computed: {
			...mapState({
				collapse: (state) => state.global.collapse, // 侧边伸缩
			}),
			topMeun: function() {
				let topM = this.$store.getters['global/topMeun']
				this.cusMeunIcon['color'] = topM.text_color
				return topM
			},
		},
		methods: {
			async init() {
				let admininfo = await this.$cookies.get(this.$member.ADMININFO)
				console.log(admininfo)
				this.adminInfo = JSON.parse(admininfo)
			},
			// 顶部的操作
			topHandle(tag) {
				switch (tag) {
					case 'collapse':
						this.$store.dispatch('global/collapseHandle', !this.collapse)
						break
					case 'theme':
						this.drawer = true
						break
					case 'screen':
						this.toggleFullScreen()
						break
					default:
						break
				}
			},
			// 全屏
			toggleFullScreen() {
				if (!screenfull.isEnabled) {
					this.$notify({
						title: '温馨提示',
						message: '您的浏览器无法使用全屏功能，请更换谷歌浏览器或者请手动点击F11按钮全屏展示！',
					})
					return false
				}
				screenfull.toggle()
				if (screenfull.isFullscreen) {
					this.fullscreen = false
				} else {
					this.fullscreen = true
				}
			},
			adminHandle(tag) {
				// 用户信息修改
				if (tag == 'infoModify') {
					this.infoModifyForm = true
				} else if (tag == 'pwdModify') {
					this.adminPwdModifyFrom = true
				} else if (tag == 'signout') {
					this.$confirm('确认退出？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					}).then(() => {
						this.$router.push('/AdminM/LoginM').then(() => {
							this.$store.dispatch('global/tagGropuhandle', 'all')
							this.$cookies.delAll()
						})
					})
				}
			},
			// 管理员信息修改回调
			infoModify() {
				this.infoModifyForm = false
			},
			// 密码修改回调
			adminPwdModify() {
				this.adminPwdModifyFrom = false
				this.$confirm('密码修改成功，需从新登入方可生效，确定退出吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.$router.push('/LoginM').then(() => {
						this.$store.dispatch('global/tagGropuhandle', 'all')
						this.$cookies.delAll()
					})
				})
			},
			handleClick(tab, event) {
				console.log(tab, event)
			},
		},
		beforeMount() {
			this.init()
		},
	}
</script>

<style scoped="scoped">
	table {
		width: 100%;
	}

	.cus-menu {
		padding-left: 25px;
		flex-wrap: nowrap !important;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
	}

	.cus-menu-item {
		float: right !important;
	}

	.cus-user-icon {
		margin-right: 20px !important;
	}

	i {
		font-size: 20px;
	}
</style>
