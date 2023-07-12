<template>
	<div class="lay-con-layer">
		<el-page-header v-if="!detailTag" class="form-header equAnn" @back="closeFrom()" content="设备附件"></el-page-header>
		<div style="display: flex" v-if="!detailTag">
			<el-upload
				action="api/EquipAnnexM/EquAUpload"
				:data="equipAnnexM"
				accept=".pdf,.doc,.docx,xls,.xlsx,.rar,.zip"
				:multiple="false"
				:file-list="fileList"
				:show-file-list="false"
				:headers="headers"
				:before-upload="beforeUpload"
				:on-success="successHandle">
				<el-button icon="el-icon-plus" plain size="mini" type="primary"></el-button>
			</el-upload>
			<el-button style="margin-left: 10px" size="mini" icon="el-icon-refresh-right" @click="init"></el-button>
		</div>
		<ux-grid
			class="lay-container-table"
			:border="false"
			show-overflow-tooltips
			:data="dataTable">
			<ux-table-column title="文件名称">
				<template slot-scope="scope">
					<a class="cus-pre-annex" :href="'/Content/EquipAnnex/' + scope.row.EquipURL" target="_blank">{{ scope.row.EquipAnnexName }}</a>
				</template>
			</ux-table-column>
			<ux-table-column title="文件大小">
				<template slot-scope="scope">
					<span v-if="scope.row.EquipAnnexSize < 1024 * 1024">{{ (scope.row.EquipAnnexSize / 1024).toFixed(2) }} KB</span>
					<span v-if="scope.row.EquipAnnexSize > 1024 * 1024">{{ (scope.row.EquipAnnexSize / 1024 / 1024).toFixed(2) }} MB</span>
				</template>
			</ux-table-column>
			<ux-table-column field="EQUploadPerson" title="上传人"> </ux-table-column>
			<ux-table-column field="EQUploadDateTime" title="上传时间"> </ux-table-column>
			<ux-table-column title="操作">
				<template slot-scope="scope">
					<el-button title="下载" size="mini" circle icon="bi-cloud-arrow-down" @click="download(scope.row)"></el-button>
					<el-button v-if="!detailTag" type="danger" size="mini " circle icon="el-icon-delete" @click="del(scope.row.EquipAnnexId)"></el-button>
				</template> </ux-table-column>
		</ux-grid>

	</div>
</template>

<script>
	import axios from 'axios'
	/**
	 * @description 设备的附件管理
	 */
	export default {
		name: 'EquipAnnex',
		props: {
			equipId: {
				type: Number,
				default: 0,
			},
			detailTag: {
				type: Boolean,
				default: false,
			},
		},
		data: () => {
			return {
				loading: true,
				fileList: [], // 需要上传的文件
				headers: {}, // 上传的头部消息
				dataTable: [],
				equipAnnexM: { EquipId: 0 },
			}
		},
		methods: {
			init() {
				let token = this.$cookies.get(this.$member.TOKEN) // cookie 模拟值
				this.headers = {
					token: token,
				}
				this.datasoure()
			},
			// 上传之前的回调函数
			beforeUpload(file) {
				console.log(file)
				const isLt4M = file.size / 1024 / 1024 < 4
				if (!isLt4M) {
					this.$layer.msgError('上传头像图片大小不能超过 4MB!')
				}
				var fileArr = file.name.split('.')
				console.log(fileArr)
				this.equipAnnexM.EquipAnnexName = `${fileArr[0]}-${this.equipId}00${this.dataTable.length + 1}.${fileArr[1]}`
				this.equipAnnexM.EquipId = this.equipId
				console.log(file)
				this.fileList = []
				this.fileList.push(file)
				return isLt4M
			},
			// 上传成功时候的操作
			successHandle(res, file, fileList) {
				if (!res.IsSuccess) {
					this.$layer.msgError(res.ErrorMessage)
				} else this.datasoure()
			},
			// 附件的下载
			download(row) {
				axios({
						url: 'api/EquipAnnexM/EquADownload',
						method: 'get',
						params: { fileName: row.EquipURL },
						responseType: 'blob',
					})
					.then((res) => {
						console.log(res)
						if (res.status == 204) {
							this.$layer.notifyError('附件丢失，无法下载！')
							return
						}
						//创建一个隐藏的a链接
						const link = document.createElement('a')
						let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' }) //文件流处理
						link.style.display = 'none' //去除a标签的样式
						//设置连接
						link.href = URL.createObjectURL(blob)
						link.download = row.EquipAnnexName
						document.body.appendChild(link)
						//模拟点击事件
						link.click()
						//移除创建的a标签
						window.URL.revokeObjectURL(link.href)
						document.body.removeChild(link)
					})
					.catch((err) => {
						console.log(err)
						this.$layer.msgError('下载失败')
					})
			},
			// 删除
			del(id) {
				this.$api.equipAnnexM.remove({ id: id }).then((res) => {
					this.datasoure()
				})
			},
			// 关闭窗体
			closeFrom() {
				this.$emit('change')
			},
			// 数据源
			datasoure() {
				this.loading = true
				this.$api.equipAnnexM
					.queryMore({ FKEquipId: this.equipId })
					.then((res) => {
						console.log(res)
						this.dataTable = res.CurrentPageData
					})
					.finally((f) => {
						this.loading = false
					})
			},
		},
		created() {
			this.init()
		},
	}
</script>

<style lang='scss' scoped>
	.equipAnnex-table {
		height: calc(100% - 80px);
	}
</style>