<template>
	<div class="back">
		<div class="sysTitle sysTitle-small">
				<img class="systitle-img" src="@/common/imgs/logo.png" />
				智 慧 运 维 综 合 服 务 管 理 系 统
			</div>
		<div class="panel-lr panel-left">
			<div class="sys-img"><img src="@/common/imgs/left-bg.svg" /></div>
		</div>
		<div class="panel-lr panel-right">
			<div class="loginBox loginBox-width">
				<div class="loginTitle">
					<span>系 统 登 录</span>
				</div>
				<el-input placeholder="输入账号" ref="input1" clearable v-model="dataSoure.LoginAccount" @keyup.enter.native="login"></el-input>
				<el-input placeholder="输入密码" ref="input2" show-password v-model="dataSoure.LoginPwd" @keyup.enter.native="login"></el-input>
				<div class="valify" v-show="isVaild">
					<el-input placeholder="请输入验证码" ref="input3" v-model="dataSoure.codeVal" @keyup.enter.native="login"></el-input>
					<img class="img-vaild" alt="验证码图片" title="看不清？点击换一个。" src="" ref="imgm" @click="changeImg" />
				</div>
				<button type="button" class="loginButton" @click="login">登 录</button>
			</div>
		</div>
		<div class="back-after">© 2022-{{new Date().getFullYear()}} 宁波世纪恒祥自控技术有限公司</div>
	</div>
</template>

<script>
	export default {
		name: 'LoginM',
		data() {
			return {
				dataSoure: {
					LoginAccount: 'admin', //登陆账号
					LoginPwd: '111111', //登陆密码
					codeVal: '', //验证码
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
				console.log(this.loginNum);
				const res = await this.$api.loginM.login(this.dataSoure).catch(error => {
					this.changeImg()
					console.log(error)
				})
				if (res) {
					// 登录的票据存储
					this.$cookies.set(this.$member.TOKEN, res.Token, 2)
					res.Token = ''
					// 存储管理员的信息
					this.$cookies.set(this.$member.ADMININFO, JSON.stringify(res), 2)
					// 跳转到后台页面
					this.$router.push(this.$member.ACCOUNTPATH)
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
			handelTab(i, e) {
				this.$refs.input2.focus()
			},
		},
		beforeMount() {
			this.init()
		},
	}
</script>

<style scoped="scoped">
	.back {
		min-height: 600px;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-attachment: fixed;
		background-position: center;
		display: flex;
	}

	.back::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to top right, #1ab3c7, #6e78cf);
		background-size: cover;
		background-attachment: fixed;
		background-position: center;
		z-index: -1;
	}

	.back-after {
		position: absolute;
		bottom: 20px;
		left: 0;
		width: 100%;
		text-align: center;
		color: #b6b6b8;
		white-space: nowrap;
	}
	.panel-lr{
		padding: 0 10px;
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@media (max-height:650px) {
    	.back-after {
			position: absolute;
			top: 606px;
			left: 0;
			width: 100%;
			text-align: center;
			color: #b6b6b8;
			white-space: nowrap;
		}
	}
	@media (max-width:600px) {
		.panel-left{width:0%;padding:0}
		.panel-right{width:100%}
		.sys-img{display: none;}
		.loginBox-width{width:auto;}
		.sysTitle-small{width:100%;text-align: center;font-size:20px;}
	}
	@media (min-width:601px) {
		.sysTitle-small{left:8%;font-size:26px;}
	}
	.sysTitle {
		position: absolute;
		top:120px;
		color:#f2f2f2;
	}
	.systitle-img{
		width: 40px;
		height: 40px;
		display: inline-block;
		vertical-align: middle;
	}
	.sys-img>img{
		width:100%;
		max-width: 450px;
		margin-top: 60px;
	}

	.loginBox {
		box-sizing: border-box;
		min-width: 360px;
		width:60%;
		height: 480px;
		background-color: rgba(232, 232, 232, 0.05);
		border-radius: 10px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.loginTitle {
		text-align: center;
		width: 100%;
		color: #fff;
	}

	.loginTitle>span {
		font-size: 25px;
		font-weight: 400;
		white-space: nowrap;
	}

	.loginBox /deep/ .el-input__inner {
		background: none;
		border: none;
		border-radius: 0;
		color: #fff;
		border-bottom: 1px solid #fff;
	}

	.loginBox /deep/ .el-input__inner::placeholder {
		font-size: 12px;
		font-family: Arial;
		letter-spacing: 5px;
		color: #d8d8da !important;
		padding-left: 13px;
		padding-top: 9px;
	}

	.loginButton {
		width: 100%;
		height: 45px;
		line-height: 30px;
		background-color: #6e78cf;
		border-radius: 10px;
		border: none;
		color: #fff;
	}

	.loginButton:hover {
		cursor: pointer;
		background-color: #646fd3;
	}

	.valify {
		width: 100%;
		position: relative;
	}

	.img-vaild {
		position: absolute;
		bottom: 3px;
		right: 10px;
		width: 70px;
		height: 40px;
	}
</style>

