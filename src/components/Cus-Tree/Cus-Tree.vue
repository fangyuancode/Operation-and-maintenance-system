<template>
	<div class="cus-tree">
		<div v-for="(node,index) in tree_data"
			:key="index"
			class="">
			<cus-tree-node
				:node="node"
				:noLine="false"
				:treeData="tree_data"
				:allOpen="allOpen"
				:addHanlde="addHanlde"
				:delHandle="delHandle"
				:editHandle="editHandle">
			</cus-tree-node>
		</div>
	</div>
</template>

<script>
	/**
	 * @description 自定义树形组件
	 * @param {Array}  treeData       树型组件的数据
	 * @param {Boolean}  allOpen      子节点全部打开
	 * 
	 * @event {Function()} addHanlde  添加的操作
	 * @event {Function()} delHandle  删除的操作
	 * @event {Function()} editHandle 修改的操作 
	 */
	import cusTreeNode from './Cus-Tree-Node.vue'

	export default {
		name: 'cusTree',
		props: {
			treeData: {
				type: Array,
				default: []
			},
			allOpen: {
				type: Boolean,
				default: true
			},
		},
		components: {
			cusTreeNode
		},
		data: () => {
			return {
				tree_data: []
			}
		},
		methods: {
			addHanlde(node) {
				this.$emit('addHanlde', node);
			},
			delHandle(node) {
				this.$emit('delHandle', node);
			},
			editHandle(node) {

				this.$emit('editHandle', node);
			}
		},
		watch: {
			treeData: {
				handler() {
					this.tree_data = JSON.parse(JSON.stringify(this.treeData))
					console.log('节点修改监听');
				},
				deep: true
			}
		},
		created() {
			console.log(this.treeData);
			this.tree_data = JSON.parse(JSON.stringify(this.treeData))
		}
	}
</script>

<style lang="scss" scoped>
	.cus-tree {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
