<template>
	<div class="lay-con-layer">
		<el-page-header class="form-header" @back="resetForm(false)" content="批量上传"> </el-page-header>
		<el-upload ref="upload" :action="actionUrl" :headers="headers" accept=".xlsx,.xls" :file-list="fileList"
			:auto-upload="false" :on-change="changeHandle" :on-progress="progressHandle" :on-success="successHandle">
			<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
			<el-button v-if="isSucceed" size="small" type="success" plain @click="resetForm(true)">完 成</el-button>
			<div slot="tip" class="el-upload__tip" v-html="tips"></div>
		</el-upload>
		<el-card>
			<div slot="header">
				<span>信息提示<span style="color: #0055AF;font-size: 12px;">(注：行数不包括顶端标题行)</span></span>
			</div>
			<div v-html="uploadTips.replace(/\n/g,'<br/>')">
			</div>
		</el-card>
	</div>
</template>

<script>
	/*Excel 批量上传组件*/
	export default {
		name: 'ExcelBatchImport',
		props: {
			onSubmit: Function,
			actionUrl: {
				type: String,
				required: true,
				default: ''
			},
		},
		data() {
			return {
				fileList: [], // 需要上传的文件
				tips: '', // 文件选择时提示
				headers: [], // 上传的头部消息
				uploadTips: '', // 上传之后提示的消息
				timer: '', // 计时器
				isSucceed:false
			};
		},
		methods: {
			init() {
				let token = this.$cookies.get(this.$member.TOKEN); // cookie 模拟值
				this.headers = {
					token: token,
				};
			},
			submitUpload() {
				console.log('文件：', this.fileList.length);
				if (this.fileList.length != 0) {
					this.uploadTips = '开始上传，请耐心等待...\n';
				} else {
					this.$message({
						showClose: true,
						message: '请先选择需要导入的文件',
						type: 'warning'
					});
				}
				this.$refs.upload.submit();
			},
			progressHandle(event, file, fileList) {
				console.log(event, '文件：', file);
				let percent = event.percent;
				if (percent == 100) {
					this.uploadTips += '文件上传成功; \n 正在进行数据校验，请等待...\n';
					let time = Math.round(Math.random() * (5 - 1) + 1)
					console.log('随机：', time);
					if (file.size < 10000) {
						time = time * 1;
					} else if (file.size > 10000 && file.size < 15000) {
						time = time * 10;
					} else if (file.size > 15000) {
						time = time * 1000;
					}
					this.timer = setTimeout(() => {
						this.uploadTips += '数据校验成功; \n 正在进行数据添加，请等待...\n';
					}, time);
				}
			},
			// 文件改变时的操作
			changeHandle(file, fileList) {
				console.log('文件改变', file);
				this.fileList = [];
				this.fileList.push(file);
			},
			// 上传成功时候的操作
			successHandle(res, file, fileList) {
				console.log(res);
				clearTimeout(this.timer);
				if (res.IsSuccess) {
					this.uploadTips += res.Data;
					this.isSucceed=true;
				} else {
					this.uploadTips += res.ErrorMessage;
				}
			},
			//返回
			resetForm(tag) {
      			this.onSubmit(tag)
			}
			
		},
		created() {
			this.init();
		},
		deactivated() {
			clearTimeout(this.timer);
		}
	}
</script>

<style>

</style>
