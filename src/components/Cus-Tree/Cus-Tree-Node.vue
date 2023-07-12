<template>
  <div class="cus-tree-node">
    <div class="cus-tree-entry">
      <span class="cus-tree-main" @click="nodeHandle(node, $event)">
        <span>
          <i
            v-if="(node.child && node.child.length > 0) || node.pid == 0"
            style="z-index: 1"
            class="cus-tree-icon"
            :class="{ 'el-icon-folder': !nodeOpenTag, 'el-icon-folder-opened': nodeOpenTag }"
          ></i>
          <i v-if="(!node.child || node.child.length <= 0) && node.pid != 0" class="cus-tree-icon el-icon-document"></i>
        </span>
        <span>
          <span v-show="nodeEditTag" @click.stop>
            <el-input size="mini" v-model="node.title"></el-input>
          </span>
          <span v-show="!nodeEditTag" class="cus-tree-txt">
            <span v-if="node.child && node.child.length > 0" style="font-weight: bolder"> {{ node.title }} ({{ node.id }}) </span>
            <span v-else-if="!node.child || node.child.length <= 0"> {{ node.title }} ({{ node.id }}) </span>
          </span>
        </span>
      </span>
      <!-- 编辑栏 -->
      <span class="tree-handle-tool">
        <i v-show="nodeEditTag && node.title.trim().length > 0" class="el-icon-check" @click="submitHandle"></i>
        <i v-show="nodeEditTag" class="el-icon-close" @click="closeHandle"></i>

        <i v-show="!nodeEditTag" class="el-icon-plus" @click="nodeCreate"></i>
        <i v-show="!nodeEditTag" class="el-icon-edit-outline" @click="nodeEdit"></i>
        <i v-show="!nodeEditTag" class="el-icon-delete" @click="nodeDelete"></i>
      </span>
    </div>
    <!-- 递归轮询出下一级的树节点 -->
    <template v-if="node.child && node.child.length > 0">
      <el-collapse-transition v-for="child in node.child" :key="child.id">
        <div v-show="nodeOpenTag">
          <cusTreeNode :node="child" :treeData="treeData" :addHanlde="addHanlde" :delHandle="delHandle" :editHandle="editHandle"></cusTreeNode>
        </div>
      </el-collapse-transition>
    </template>
  </div>
</template>

<script>
/**
 * @description 树形节点
 * @param {Object}  node	        节点的数据
 * @param {Boolean}  allOpen	    子节点全部打开
 * @param {Array}  treeData       树型组件的数据
 * @param {Boolean}  noLine		    开启树形的线条
 *
 * @event {Function()} addHanlde  添加的操作
 * @event {Function()} delHandle  删除的操作
 * @event {Function()} editHandle 修改的操作
 */
export default {
  name: 'cusTreeNode',
  props: {
    node: {
      type: Object,
      default: {},
    },
    allOpen: {
      type: Boolean,
      default: true,
    },
    treeData: {
      type: Array,
      default: [],
    },
    noLine: {
      type: Boolean,
      default: false,
    },
    addHanlde: {
      type: Function,
      default: () => {},
    },
    delHandle: {
      type: Function,
      default: () => {},
    },
    editHandle: {
      type: Function,
      default: () => {},
    },
  },
  data: () => {
    return {
      nodeOpenTag: false, // 节点打开标志
      nodeEditTag: false, // 节点编辑标志
      oldNodeTitle: '',
    }
  },
  methods: {
    inputHandle() {},
    // 子级节点的展开操作
    nodeHandle(node, e) {
      this.nodeOpenTag = !this.nodeOpenTag
    },
    // 节点创建
    nodeCreate() {
      let treeArr = this.treeToArray(this.treeData)
      let addNode = treeArr.filter((t) => t.id == '')
      if (addNode && addNode[0]) {
        return this.$layer.msg('已有未确定的添加')
      }
      this.recQueryHandle(this.treeData, 'create')
    },
    // 节点删除
    nodeDelete() {
      this.delHandle(this.node)
    },
    // 节点编辑
    nodeEdit() {
      this.nodeEditTag = true
      this.oldNodeTitle = this.node.title
    },
    // 提交操作
    submitHandle() {
      this.recQueryHandle(this.treeData, 'submit')
    },
    // 关闭操作
    closeHandle() {
      this.nodeEditTag = false
      this.recQueryHandle(this.treeData, 'close')
    },
    // 递归查询
    recQueryHandle(treeData, tag) {
      // 当前操作的节点
      let curNode = this.node
      treeData.forEach((item) => {
        if (item.id === curNode.id) {
          // 添加元素
          if (tag === 'create') {
            // 先查询是否已有追加的元素
            if (!curNode.child) {
              this.$set(item, 'child', [])
            }
            // 查询当前同层新增且未提交的节点
            let addTag = item.child.filter((t) => t.id == '')
            if (addTag.length > 0) {
              this.$layer.msg('已有未确定的添加')
              return
            }
            // 添加节点
            item.child.push({ title: '新建子节点', id: '', edit: true, pid: item.id })
          }
          // 删除元素
          else if (tag === 'del') {
            let index = treeData.findIndex((t) => t.id == curNode.id)
            treeData.splice(index, 1)
          }
          // 编辑元素
          else if (tag === 'edit') {
            this.oldNodeTitle = this.node.title
          }
          // 节点的提交事件
          else if (tag == 'submit') {
            // id为空为添加数据
            if (curNode.id == '') {
              var existIndex = item.title.indexOf('/')
              if (existIndex != -1) return this.$layer.msg('不允许存在 / 字符存在')
              this.addHanlde(curNode)
            } else {
              // id 不为空为编辑数据
              if (item.title === this.oldNodeTitle) return (this.nodeEditTag = false)
              // 特殊字符查询
              var existIndex = item.title.indexOf('/')
              if (existIndex != -1) return this.$layer.msg('不允许存在 / 字符存在')
              this.editHandle(curNode)
            }
          }
          // 节点的修改或添加状态的关闭状态
          else if (tag == 'close') {
            // id 若为空则删除
            if (curNode.id == '') {
              treeData.pop()
            } else {
              item.title = this.oldNodeTitle
            }
          }
          return
        }
        if (item.child) {
          this.recQueryHandle(item.child, tag)
        }
      })
    },
    // 获取扁平化的数据
    treeToArray(tree) {
      var res = []
      for (const item of tree) {
        const { child, ...i } = item
        if (child && child.length) {
          res = res.concat(this.treeToArray(child))
        }
        res.push(i)
      }
      return res
    },
    layerTips(title) {},
  },
  watch: {
    node() {
      this.nodeEditTag = this.node.edit
    },
  },
  created() {
    this.nodeOpenTag = this.allOpen
    this.nodeEditTag = this.node.edit
  },
  mounted() {
    this.oldNodeTitle = this.node.title
  },
}
</script>

<style lang='scss' scoped>
/* 树节点 */
.cus-tree-node {
  line-height: 30px;
  padding-left: 23px;
  position: relative;
}

/* 单个书节点的显示主体 */
.cus-tree-entry {
  display: flex;
  line-height: 30px;
  cursor: pointer;
}

.cus-tree-entry:hover .tree-handle-tool {
  display: block;
}

.cus-tree-main {
  display: flex;
  font-size: 15px;

  span:first-child {
    padding-right: 8px;
  }
}

/* 树的操作栏工具 */
.tree-handle-tool {
  display: none;
  padding-left: 10px;

  i {
    padding: 0 5px;
    font-weight: 9;
  }

  i:hover {
    opacity: 0.5;
  }
}

.cus-tree-icon {
  background-color: #ffffff;
  z-index: 2;
  position: relative;
}

/* 树节点的标题 */
.cus-tree-txt:hover {
  text-decoration: underline;
  color: #a8a8a8;
}

/* 子节点的连线 */
//.node-child-inline {}
</style>