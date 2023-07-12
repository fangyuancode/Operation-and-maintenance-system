<template>
	<div class="wrapper" ref="ref_wrapper">
		<div class="container">
			<div class="scene">
				<div class="circle" :style="screenNum">

				</div>
				<div class="blue">
					<div class="content" :style="screenNum">
						<span class="piece"></span>
						<span class="piece"></span>
						<span class="piece"></span>
					</div>
				</div>
				<div class="yelllow">
					<div class="content" :style="screenNum">
						<span class="piece"></span>
						<span class="piece"></span>
						<span class="piece"></span>
					</div>
				</div>
				<div class="red">
					<div class="content" :style="screenNum">
						<span class="piece"></span>
						<span class="piece"></span>
						<span class="piece"></span>
					</div>
				</div>
				<div class="title" :style="screenNum">
					<span class="TF">
						{{hint.title}}
					</span>
					<span class="TB">
						{{hint.title}}
					</span>
				</div>
			</div>
			<div class="tltieBox">
				<div class="text" :style="screenNum">
					<span>{{hint.text}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SvLayout',
		data() {
			return {
				hint: {
					title: '404',
					text: '非常抱歉，您要找的页面走丢了'
				},
				smallNum: '',
				bigNum: '',
				bigtextNum: '',
				smalltextNum: ''
			}
		},
		mounted() {
			// 屏幕监听
			window.addEventListener('resize', this.screenH)
			this.screenH()
		},
		methods: {
			screenH() {
				// 获取高度，和宽度
				const screenheigth = this.$refs.ref_wrapper.offsetHeight
				const screenwidth = this.$refs.ref_wrapper.offsetWidth
				const srceenNum = screenheigth - screenwidth > 0 ? screenwidth : screenheigth
				// console.log(screenheigth,screenwidth,srceenNum)
				this.smallNum = srceenNum - 300
				this.bigNum = srceenNum - 100
				this.smalltextNum = srceenNum / 30
				this.bigtextNum = srceenNum / 3
				console.log(this.smallNum, this.bigNum, this.smalltextNum, this.bigtextNum)
			}
		},
		computed: {
			screenNum() {
				return {
					"--smallNum": this.smallNum + "px",
					"--bigNum": this.bigNum + "px",
					"--smalltextNum": this.smalltextNum + "px",
					"--bigtextNum": this.bigtextNum + "px"
				}
			}
		}
	}
</script>

<style scoped="scoped">
	* {
		margin: 0;
		padding: 0;
		-moz-user-select: none;
		/*火狐*/
		-webkit-user-select: none;
		/*webkit浏览器*/
		-ms-user-select: none;
		/*IE10*/
		-khtml-user-select: none;
		/*早期浏览器*/
		user-select: none;
	}

	.wrapper,
	.container,
	.scene,
	.circle {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background-color: rgba(217, 237, 255, .5);
		overflow: hidden;
	}

	@keyframes circle {
		0 {
			width: 0px;
			height: 0px;
		}

		50% {
			width: 0px;
			height: 0px;
		}

		100% {
			width: 600px;
			height: 600px;
		}
	}

	@keyframes circle2 {
		0 {
			width: 0px;
			height: 0px;
		}

		50% {
			width: 0px;
			height: 0px;
		}

		100% {
			width: 800px;
			height: 800px;
		}
	}

	@keyframes content {
		0% {
			width: 0;
			opacity: 0;
		}

		50% {
			opacity: 1;
		}
	}

	@keyframes pieceLeft {
		0 {}

		50% {
			left: 80%;
			width: 10%;
		}
	}

	@keyframes pieceRight {
		0% {}

		50% {
			left: 20%;
			width: 10%;
		}
	}

	@keyframes anime404 {
		0% {
			opacity: 0;
			font-size: 900px;
		}

		30% {
			opacity: 1;
		}

		70% {
			font-size: 200px;
		}

		85% {
			font-size: 230px;
		}

		100% {
			font-size: var(--bigtextNum);
		}
	}

	@keyframes animePs {
		0% {
			width: 0;
		}

		100% {
			width: 392px;
		}
	}

	@keyframes animeShow {
		from {
			border-right: none;
		}

		to {
			border-right: 2px solid #9bd3f1;
		}
	}

	.circle::before {
		content: '';
		position: absolute;
		width: var(--smallNum);
		height: var(--smallNum);
		background-color: rgba(217, 237, 255, .3);
		border-radius: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: inset 5px 20px 40px rgba(133, 178, 182, .6), inset 5px 0px 5px rgba(133, 178, 182, .6), inset 5px 5px 20px rgba(133, 178, 182, .6), 2px 2px 5px rgba(133, 178, 182, .6);
		animation: circle 1.5s backwards;
	}

	.circle::after {
		content: '';
		position: absolute;
		width: var(--bigNum);
		height: var(--bigNum);
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: inset 5px 20px 40px rgba(133, 178, 182, .6), inset 5px 0px 5px rgba(133, 178, 182, .6), inset 5px 5px 20px rgba(133, 178, 182, .6), 2px 2px 5px rgba(133, 178, 182, .6);
		animation: circle2 1s backwards;
	}

	.content {
		position: relative;
		width: var(--bigNum);
		height: var(--bigNum);
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: content 0.6s 1s backwards;
	}

	.wrapper .container .scene .blue,
	.wrapper .container .scene .yelllow,
	.wrapper .container .scene .red,
	.wrapper .container .scene .title {
		/* transform: translate3d(-20.2px, -49.7px, 0px); */
		/* transform-style: preserve-3d; */
		/* backface-visibility: hidden; */
		position: absolute;
		display: block;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 60%;
		height: 60%;
	}

	.blue .content .piece {
		border: 2px solid #55b9dd;
		/* background: linear-gradient(90deg, #86cfa9 13.7%, #4fe23f 94.65%) */
	}

	.yelllow .content .piece {
		border: 2px solid #93ccdd;
		/* background: linear-gradient(90deg, #edf195 13.7%, #eb9fea 94.65%) */
	}

	.red .content .piece {
		border: 2px solid #ffffff;
		/* background: linear-gradient(90deg,#9689cb  13.7%, #e66f89 94.65%) */
	}

	.blue .content .piece:nth-child(1) {
		position: absolute;
		left: 5%;
		top: 15%;
		height: 30px;
		width: 170px;
		border-radius: 15px;
		animation: pieceLeft 5.5s infinite 2.2s Ease-in;
	}

	.blue .content .piece:nth-child(2) {
		position: absolute;
		left: 95%;
		top: 55%;
		height: 50px;
		width: 150px;
		border-radius: 25px;
		animation: pieceRight 4.5s infinite 2.2s Ease-in;
	}

	.blue .content .piece:nth-child(3) {
		position: absolute;
		left: 70%;
		top: 85%;
		height: 30px;
		width: 190px;
		border-radius: 15px;
		animation: pieceRight 7.5s infinite 2.2s Ease-in;
	}

	.yelllow .content .piece:nth-child(1) {
		position: absolute;
		left: 80%;
		top: 25%;
		height: 30px;
		width: 160px;
		border-radius: 15px;
		animation: pieceRight 6.5s infinite 2.2s Ease-in;
	}

	.yelllow .content .piece:nth-child(2) {
		position: absolute;
		left: 0%;
		top: 70%;
		height: 20px;
		width: 130px;
		border-radius: 15px;
		animation: pieceLeft 7s infinite 2.2s ease-in;
	}

	.yelllow .content .piece:nth-child(3) {
		position: absolute;
		left: 35%;
		top: 95%;
		height: 10px;
		width: 120px;
		border-radius: 15px;
		animation: pieceLeft 6.5s infinite 2.2s Ease-in;
	}

	.red .content .piece:nth-child(1) {
		position: absolute;
		left: 15%;
		top: 77%;
		height: 40px;
		width: 100px;
		border-radius: 20px;
		animation: pieceLeft 5s infinite 2.2s Ease-in;
	}

	.red .content .piece:nth-child(2) {
		position: absolute;
		left: 80%;
		top: 5%;
		height: 40px;
		width: 180px;
		border-radius: 20px;
		animation: pieceRight 6s infinite 2.2s Ease-in;
	}

	.red .content .piece:nth-child(3) {
		position: absolute;
		left: -10%;
		top: 42%;
		height: 30px;
		width: 160px;
		border-radius: 20px;
		animation: pieceLeft 6.5s infinite 2.2s Ease-in;
	}

	/* 字体 */


	.TF {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		/* 				font-size: 200px;
 */
		font-weight: 700;
		/* 字体间隔 */
		letter-spacing: 4px;
		color: white;
		z-index: 2;
		animation: anime404 0.6s both;
		animation-delay: 1.2s;
		white-space: nowrap;
	}

	.TB {
		position: absolute;
		top: 38%;
		left: 48%;
		transform: translate(-50%, -50%);
		/* 				font-size: 200px;
 */
		font-weight: 600;
		/* 字体间隔 */
		letter-spacing: 4px;
		color: white;
		z-index: 2;
		animation: anime404 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
		animation-delay: 1.2s;
		color: #609b9c;
		z-index: 1;
		animation-delay: 1s;
		filter: blur(10px);
		opacity: 0.8;
		white-space: nowrap;
	}

	.text {
		position: absolute;
		box-sizing: border-box;
		top: 60%;
		left: 50%;
		transform: translate(-50%);
		color: #81ccee;
		width: 0;
		border-right: none;
		font-size: var(--smalltextNum);
		white-space: nowrap;
		overflow: hidden;
		animation: animePs 4s steps(9) 3s forwards, animeShow 1.5s 3s infinite;
	}
</style>
