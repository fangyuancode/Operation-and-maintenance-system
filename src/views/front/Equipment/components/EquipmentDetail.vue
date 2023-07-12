<template>
	<div style="height:100%;  box-sizing: border-box;">
		<div class="equ-detail">
			<div class="equ-detail-item">
				<el-descriptions class="detail-left-main" :column="3" size="medium">
					<el-descriptions-item label="台账类型">{{equipmentM.EquipTypeName}}</el-descriptions-item>
					<el-descriptions-item label="设备分类">{{equipmentM.EquipClassifyName}}</el-descriptions-item>
					<el-descriptions-item label="所属工厂">{{equipmentM.FactoryName}}</el-descriptions-item>
					<el-descriptions-item label="所属部门">{{equipmentM.SectionName}}</el-descriptions-item>
					<el-descriptions-item label="所属装置">{{equipmentM.DeviceName}}</el-descriptions-item>
					<el-descriptions-item label="所属区域">{{equipmentM.AreaName}}</el-descriptions-item>
					<el-descriptions-item label="PI标记">{{equipmentM.PITag}}</el-descriptions-item>
					<el-descriptions-item label="仪表名称">{{equipmentM.EquipmentName}}</el-descriptions-item>
					<el-descriptions-item label="仪表位号">
						<el-tag size="mini">{{equipmentM.EquipmentTag}}</el-tag>
					</el-descriptions-item>
					<el-descriptions-item label="EM设备号">{{equipmentM.EMEquipTag}}</el-descriptions-item>
				</el-descriptions>
				<div class="detail-left-equannex">
				<!-- 	<h4 style="margin-left: 20px;">设备附件</h4> -->
					<equipAnnex class="equ-detail-equipAnnex" :detailTag="true" :equipId="equipmentM.EquipmentId"></equipAnnex>
				</div>
			</div>
			<div class="equ-detail-item">
				<equipProperty :detailTag="true" :equPrVEditID="equipmentM.EquipmentId" :equipPropertyArray="equipPropertyArray"></equipProperty>
			</div>
		</div>
	</div>
</template>

<script>
	import equipProperty from './EquipProperty.vue'
	import equipAnnex from './EquipAnnex.vue'
	/**
	 * @description 设备的详情
	 * 
	 */
	export default {
		name: 'EquipmentDetail',
		props: {
			equipmentM: {
				type: Object,
				default: {}
			},
			equipPropertyArray: {
				type: Array,
				default: []
			}
		},
		data: () => {
			return {

			}
		},
		components: {
			equipProperty,
			equipAnnex
		},
		methods: {
			closeFrom() {
				this.$emit('change');
			}
		},
	}
</script>

<style lang='scss' scoped>
	.equ-detail {
		width: 100%;
		display: flex;
	}

	.equ-detail-item {
		width: 50%;
		height: 70vh;
		border: 1px dashed #E4E7ED;
		margin: 10px;
		box-sizing: border-box;
	}

	.detail-left-main {
		height: 30%;
		margin: 20px 0px 20px 20px;
		overflow-y: scroll;
	}

	::v-deep .el-descriptions-item__label {
		color: #000000;
	}

	.detail-left-equannex {
		height: 70%;
		border-top: 1px solid #DCDFE6;
	}

	.equ-detail-equipAnnex {
		height: 90%;
	}
</style>