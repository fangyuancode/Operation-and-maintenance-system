<template>
	<ux-grid
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
</template>

<script>
	import axios from 'axios'
	import { equipAnnexInfo } from '@/api/front/equipment'
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
			// 数据源
			datasoure() {
				this.loading = true
				equipAnnexInfo({ equId: this.equipId })
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
		height: calc(100% - 30px);
	}
</style>