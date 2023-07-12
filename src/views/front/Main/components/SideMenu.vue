<template>
	<div class="box-side">
		<div class="side-header">
			<img style="width: 32px" alt="" src="@/common/imgs/logo.png" />
		</div>
		<div class="side-body">
			<ul>
				<el-tooltip class="item" effect="dark" placement="right" :content="item.title"
					v-for="item of routerMenu" :key="item.path">
					<li class="si-menu-item" :class="item.isActiv ? 'si-menu-item-activ' : ''" @click="sideMenu(item)">
						<i class="bi" :class="item.icon"></i>
					</li>
				</el-tooltip>
			</ul>
		</div>
		<div class="side-footer">
			<div class="side-pic" @click="userShow = !userShow" tabindex="0" @blur="userShow = false">
				<img style="width: 35px; height: 35px; border-radius: 100%" alt="" :src="userIcon" @error="imgError" />
				<transition name="el-zoom-in-bottom">
					<div class="side-user" v-show="userShow">
						<ul class="cus-list-out">
							<li @click="userInfoFrom = true">用户信息</li>
							<li @click="userPwdModifyFrom = true">修改密码</li>
							<li @click="$router.push('/AdminM/LoginM')">进入后台</li>
							<li @click="quit()">退出</li>
						</ul>
					</div>
				</transition>
			</div>
		</div>

		<!-- START  用户信息修改-->
		<el-dialog title="用户信息修改" :visible.sync="userInfoFrom" width="450px" append-to-body>
			<UserInfoModify @onSubmit="userInfoModify()" v-if="userInfoFrom"></UserInfoModify>
		</el-dialog>
		<!-- END  用户信息修改-->

		<!-- START  用户密码修改-->
		<el-dialog title="用户密码修改" :visible.sync="userPwdModifyFrom" width="450px" append-to-body>
			<UserPwdModify @onSubmit="userPwdModify" v-if="userPwdModifyFrom"></UserPwdModify>
		</el-dialog>
		<!-- END  用户密码修改-->
	</div>
</template>

<script>
	/**
	 * @description 左侧菜单
	 * @param {Array} routerMenu 路由菜单
	 */
	import UserPwdModify from './UserPwdModify.vue'
	import UserInfoModify from './UserInfoModify.vue'
	import { mapState } from 'vuex'

	export default {
		name: 'SideMenu',
		props: {
			routerMenu: {
				type: Array,
				default: []
			}
		},
		components: {
			UserPwdModify,
			UserInfoModify
		},
		computed: {
			...mapState({
				userIcon: (state) => state.global.userIcon // 用户图像
			}),
		},
		data() {
			return {
				userShow: false,
				noticeTag: false,
				userInfoFrom: false,
				userPwdModifyFrom: false,
			}
		},
		methods: {
			init() {
				let userInfo = JSON.parse(this.$cookies.get(this.$member.USERINFO));
				//console.log(userInfo, userInfo.UserImgUrl);
				this.$store.state.global.userIcon = "/Content/Uicon/" + userInfo.UserImgUrl;
			},
			// 菜单的点击操作	
			sideMenu(item) {
				this.$emit('change', item)
			},
			// 用户信息修改
			userInfoModify() {
				this.userInfoFrom = false;
			},
			// 图片的显示错误
			imgError(err) {
				this.$store.state.global.userIcon = require('@/common/imgs/tubiao1.png');
			},
			// 用户的密码修改
			userPwdModify(tag) {
				this.userPwdModifyFrom = false;
				if (!tag) { return; }
				this.$confirm('密码修改成功，需从新登入方可生效，确定退出吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.$router.push('/Front/Login').then(() => {
						this.$cookies.delAll()
					})
				})
			},
			// 退出
			quit() {
				this.$confirm('确定退出吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.$router.push('/Front/Login').then(() => {
						this.$cookies.delAll()
					})
				})
			}
		},
		beforeMount() {
			this.init();
		}
	}
</script>

<style scoped="scoped">
	/* side-header、side-body */
	.box-side {
		width: 60px;
		height: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		background-color: #75b9d9;
	}

	.side-header {
		text-align: center;
		padding: 10px;
		height: 40px;
	}

	.side-body {
		height: 100%;
		overflow: auto;
	}

	.side-body ul {
		background-color: #75b9d9;
	}

	.si-menu-item {
		color: #dfe0e0;
		height: 55px;
		line-height: 55px;
		font-size: 20px;
		cursor: pointer;
		text-align: center;
		box-sizing: border-box;
	}

	.si-menu-item:hover {
		color: #ffffff;
		font-weight: 900;
		background: linear-gradient(90deg, #75b9d9, #3c88cf);
	}

	.si-menu-item-activ {
		background: linear-gradient(90deg, #75b9d9, #3c88cf);
	}

	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
	.side-body::-webkit-scrollbar {
		width: 0;
		/*对垂直流动条有效*/
		height: 0px;
		/*对水平流动条有效*/
	}

	/* end */

	/* side-footer */
	.side-pic {
		text-align: center;
		width: 100%;
		padding: 16px 0;
	}

	.side-user {
		width: 200px;
		text-align: center;
		color: #fff;
		font-size: 10px;
		position: absolute;
		bottom: 10px;
		left: 64px;
		z-index: 99;
	}

	.cus-list-out {
		cursor: pointer;
		background-color: #fff;
		color: #000;
		z-index: 9;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	}

	.cus-list-out li {
		list-style: none;
		height: 40px;
		line-height: 40px;
		padding: 0 20px;
	}

	.cus-list-out li:hover {
		background: linear-gradient(to right, #75b9d9, #3c88cf);
	}

	.cus-list-out li:nth-child(2) {
		border-bottom: 1px solid #eaf0fa;
	}

	/* end */
</style>
