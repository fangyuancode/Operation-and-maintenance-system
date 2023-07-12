<template>
	<div class="back">
		<div class="back-body">
			<div class="back-body-info">
				<div class="back-title">
					<img style="width:32px;position: absolute;" alt="" src="@/common/imgs/logo.png">
					<h3 style="padding-left: 40px;padding-top:3px">智 慧 运 维 综 合 服 务 平 台</h3>
				</div>
				<div class="info-image">
					<img alt="" src="@/common/imgs/logoimg.png">
				</div>
			</div>
			<div class="back-body-content">
				<h3>系统登录</h3>
				<el-input class="login-input" placeholder="输入工号/昵称" ref="input1" clearable
					v-model="dataSoure.LoginAccount" @keyup.enter.native="login"></el-input>
				<el-input class="login-input" placeholder="输入密码" ref="input2" show-password v-model="dataSoure.LoginPwd"
					@keyup.enter.native="login"></el-input>
				<div class="valify" v-show="isVaild">
					<el-input class="vaild-input" placeholder="请输入验证码" ref="input3" v-model="dataSoure.codeVal"
						@keyup.enter.native="login"></el-input>
					<img class="img-vaild" alt="验证码图片" title="看不清？点击换一个。" src="" ref="imgm" @click="changeImg" />
				</div>
				<el-button type="primary" class="login-button" @click="login">登 陆</el-button>
				<div class="content-footer">
					<span><a href="">还没账号？</a></span>
					<span><a href="#">忘记密码？</a></span>
				</div>
			</div>
		</div>
		<div class="back-after">© 2023-{{new Date().getFullYear()}} 宁波世纪恒祥自控技术有限公司</div>
		<router-link to="/AdminM/LoginM" target="_blank">后端</router-link>
	</div>
</template>

<script>
	import { login } from '@/api/front/UserAuthor.js'

	export default {
		name: 'Login',
		data() {
			return {
				dataSoure: {
					LoginAccount: 'test', //登陆账号
					LoginPwd: '111111', //登陆密码
					codeVal: '', //验证码
					Port: ''
				},
				isVaild: false,
				codeImg: '',
				loginNum: 0,
			}
		},
		methods: {
			async init() {
				this.loginNum = await this.$cookies.get(this.$member.CODEVAILD)
				if (this.loginNum > 1) {
					this.isVaild = true
				}
				this.changeImg();

				this.dataSoure.Port = location.port;
			},
			// 登录
			async login() {
				if (this.$verifiy.textValid(this.dataSoure.LoginAccount, 20)) {
					this.$refs.input1.focus()
					return
				}
				if (this.$verifiy.textValid(this.dataSoure.LoginPwd, 50)) {
					this.$refs.input2.focus()
					return
				}
				if (this.loginNum > 1) {
					this.isVaild = true
					if (this.dataSoure.codeVal.length <= 0) {
						this.$layer.msgWarning('请输入验证码')
						return
					}
					if (this.dataSoure.codeVal.toUpperCase() != this.codeImg) {
						this.$layer.msgWarning('验证码不符，请重新输入')
						this.changeImg()
						this.dataSoure.codeVal = ''
						this.$refs.input3.focus()
						return
					}
				}
				this.loginNum += 1;
				this.$cookies.set(this.$member.CODEVAILD, this.loginNum)
				//console.log(this.loginNum);
				const res = await login(this.dataSoure).catch(error => {
					this.changeImg()
					console.log(error)
				})
				//console.log('登录信息：', res);
				if (res) {
					// 删除 所有的cookies
					this.$cookies.delAll();
					// 登录的票据存储
					this.$cookies.set(this.$member.TOKEN, res.Ticket)
					res.Ticket = ''
					// 存储管理员的信息
					this.$cookies.set(this.$member.USERINFO, JSON.stringify(res), 2)
					// 前端首页
					this.$router.push('/')
					this.$cookies.set(this.$member.CODEVAILD, 0)
				}
			},
			changeImg() {
				this.$api.loginM.loginVaild().then((res) => {
					this.$refs.imgm.src = 'data:image/png;base64,' + res.ImgByte
					this.codeImg = res.CodeStr.toUpperCase()
					console.log(this.codeImg)
				})
			},
		},
		beforeMount() {
			this.init()
		},
	}
</script>

<style scoped="scoped">
	.back {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background-color: #fafafa;
		background: linear-gradient(to top right, #bbeaf0, #babddb);
	}

	.back-body {
		min-height: 480px;
		padding: 40px 0;
		width: 1000px;
		display: flex;
		margin: 0 auto;
		flex-direction: row;
		box-shadow: 0 2px 30px #5f6f7c17;
		background-color: rgba(255, 255, 255, 0.9);
	}

	.back-after {
		margin-top: 20px;
		width: 1000px;
		color: #aaa;
		text-align: center;
		line-height: 25px;
		font-size: 14px;
		padding: 0 40px;
		cursor: default;
	}

	.back-body-info {
		display: flex;
		width: 500px;
		padding: 0 42px;
		flex: 1;
		flex-direction: column;
		border-right: 1px solid #eee;
	}

	.info-image {
		display: flex;
		width: 100%;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.back-body-content {
		padding: 0 40px;
		text-align: center;
	}

	.back-body-content h3 {
		font-size: 20px;
		color: #333;
		line-height: 20px;
		margin: 30px 0;
	}

	.login-input {
		margin-bottom: 30px;
	}

	.login-input /deep/.el-input__inner {
		height: 50px;
	}

	.login-button {
		width: 100%;
	}

	.content-footer {
		font-size: 13px;
		margin-top: 10px;
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		line-height: 20px;
	}

	.content-footer a {
		color: #6698ff;
		text-decoration: none;
		background-color: transparent;
	}

	.valify {
		width: 100%;
		position: relative;
		margin-bottom: 24px;
	}

	.vaild-input /deep/.el-input__inner {
		border: none;
		border-bottom: 1px solid #DCDFE6;
		border-radius: 0;
		height: 50px;
	}

	.img-vaild {
		position: absolute;
		bottom: 3px;
		right: 10px;
		width: 70px;
		height: 40px;
	}
</style>
