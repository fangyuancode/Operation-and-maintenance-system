<template>
	<div class="lay-con-layer">
		<el-page-header v-if="!detailTag" class="form-header" @back="closeFrom()" content="编辑设备属性值"></el-page-header>
		<ux-grid
			class="lay-container-table cus-property-table"
			:border="false"
			show-overflow-tooltips
			v-loading="loading"
			element-loading-text="数据加载中..."
			element-loading-spinner="el-icon-loading"
			:data="dataTable"
			@current-change="currChange">
			<ux-table-column field="EquipPropertyName" title="属性名称"> </ux-table-column>
			<ux-table-column field="EquipPropertyUnit" title="属性单位"> </ux-table-column>
			<ux-table-column field="EquipPropValue" title="属性值">
				<template slot-scope="scope">
					<el-input style="max-width: 150px;" v-model="scope.row.EquipPropValue"
						v-show="scope.row.Iseditor" size="mini"></el-input>
					<span v-show="!scope.row.Iseditor">{{ scope.row.EquipPropValue }}</span>
				</template>
			</ux-table-column>
			<ux-table-column title="操作" v-if="!detailTag">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" icon="el-icon-edit" circle v-if="!scope.row.Iseditor"
						@click="edit(scope.row)">
					</el-button>
					<el-button type="success" size="mini" icon="el-icon-check" circle v-if="scope.row.Iseditor"
						@click="edit(scope.row)">
					</el-button>
				</template>
			</ux-table-column>
		</ux-grid>
	</div>
</template>

<script>
	/**
	 * 存储设备属性信息
	 * @param {Number} equPrVEditID  设备id
	 * @param {Array}  equipPropertyArray  设备的属性信息
	 */
	export default {
		name: 'EquipProperty',
		props: {
			equPrVEditID: {
				type: Number,
				default: 0
			},
			equipPropertyArray: {
				type: Array,
				default: [],
			},
			detailTag: {
				type: Boolean,
				default: false
			}
		},
		data: () => {
			return {
				loading: false,
				dataTable: [],
				oldRow: ""
			}
		},
		methods: {
			init() {
				if (this.equipPropertyArray) { this.dataTable = JSON.parse(JSON.stringify(this.equipPropertyArray)); }
			},
			closeFrom() {
				this.$emit('change')
			},
			edit(row) {
				if (row.Iseditor) {
					if (this.$verifiy.textValid(row.EquipPropValue, 20)) {
						return
					}
					if (JSON.stringify(row) != this.oldRow) {
						var queryData = {
							FKEquipId: this.equPrVEditID,
							EquipPropertyIDTag: row.EquipPropertyId,
							EquipPropValue: row.EquipPropValue
						};
						this.$api.equipPropertyM
							.addOREditEPV(queryData)
							.then((res) => {
								this.$layer.msgSuccess(res)
								this.$set(row, 'Iseditor', false)
							}).catch((err) => {})
					} else
						this.$set(row, 'Iseditor', false)
				} else {
					this.$set(row, 'Iseditor', true)
					this.oldRow = JSON.stringify(row)
				}
			},
			currChange(curr) {
				this.dataTable.forEach(d => {
					if (d.Iseditor && d.EquipPropertyId != curr.EquipPropertyId) { d.Iseditor = false }
				})
			},
		},
		mounted() {
			console.log(this.detailTag);
		},
		created() {
			this.init();
		}
	}
</script>

<style lang='scss' scoped>
	.cus-property-table {
		height: calc(100% - 30px);
	}
</style>