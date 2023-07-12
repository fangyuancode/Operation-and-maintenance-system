<template>
  <div class="lay-container">
    <div class="lay-container-pan" v-show="isMain">
      <!-- START 头部搜索 -->
      <div class="lay-container-condition">
        <h3 style="padding: 10px 0">库位置管理</h3>
      </div>
      <!-- END -->
      <!-- START 主题内容 -->
      <div class="lay-container-content">
        <div>
          <el-button type="primary" plain size="mini" @click="addFrom">新增</el-button>
          <el-button size="mini" icon="el-icon-refresh-right" @click="init(true)"></el-button>
        </div>
        <div class="cus-tree-container">
          <cusTree v-loading="loading" :treeData="treeData" @addHanlde="create" @delHandle="del" @editHandle="edit"> </cusTree>
        </div>
      </div>
      <!-- END -->
    </div>
    <LibraryPlaceCreate v-if="isAddform" @onSubmit="addSubmit"></LibraryPlaceCreate>
  </div>
</template>

<script>
import cusTree from '@/components/Cus-Tree/Cus-Tree.vue'
import LibraryPlaceCreate from './components/LibraryPlaceCreate.vue'

export default {
  name: 'LibraryPlaceM',
  data() {
    return {
      loading: true, // 表单加载动画
      isMain: true, //主窗显示
      isAddform: false, // 添加弹窗的显示
      treeData: [], // 树形的数据
      result: null, // 递归的数据
    }
  },
  components: {
    cusTree,
    LibraryPlaceCreate,
  },
  methods: {
    init(tag) {
      if (tag) {
        this.treeData = []
      }
      this.dataSoure()
    },
    //添加窗口
    addFrom() {
      this.isAddform = true
      this.isMain = false
    },
    // 添加窗口的回调
    addSubmit(refresh) {
      this.isAddform = false
      this.isMain = true
      if (refresh) {
        this.dataSoure()
      }
    },
    // 创建新的的子节点
    create(node) {
      console.log(JSON.stringify(node))
      let nodePar = this.queryParNode(this.treeData, node.pid)
      if (!nodePar) {
        console.error('错误的数据')
      }
      console.log('父级的节点：', nodePar)
      let equClassM = {
        LibraryPlaceName: node.title.trim(),
        LibraryPlaceParId: node.pid,
        GroupIdTag: nodePar.secid,
      }
      console.log('添加是的数据：', node)
      this.$api.libraryPlaceM.create(equClassM).then((res) => {
        this.$layer.msgSuccess('位置添加成功')
        node.id = res
        node.secid = nodePar.secid
        console.log(node)
        // 数据添加
        this.recQueryHandle(this.treeData, node, 'add')
      })
    },
    // 编辑
    edit(node) {
      if (this.$verifiy.textValid(node.title, 20)) {
        return
      }
      this.$api.libraryPlaceM
        .update({
          LibraryPlaceId: node.id,
          LibraryPlaceName: node.title.trim(),
        })
        .then((res) => {
          this.$layer.msgSuccess(res)
          node.edit = false
          this.recQueryHandle(this.treeData, node, 'edit')
        })
    },
    //删除
    del(node) {
      this.$api.libraryPlaceM.remove({ id: node.id }).then((res) => {
        this.$layer.msgSuccess(res)
        this.recQueryHandle(this.treeData, node, 'del')
      })
    },
    // 数据
    async dataSoure() {
      this.loading = true
      await this.$api.libraryPlaceM
        .query()
        .then((res) => {
          this.treeData = []
          let pageData = res.CurrentPageData
          let tree_data = []
          pageData.forEach((item) => {
            tree_data.push({
              id: item.LibraryPlaceId,
              title: item.LibraryPlaceName,
              pid: item.LibraryPlaceParId,
              secid: item.GroupIdTag,
            })
          })
          console.log(tree_data)
          // 查询顶级的分类
          var upData = this.objToTree(tree_data, 0)
          console.log(upData)
          this.treeData = upData
        })
        .finally((f) => {
          this.loading = false
        })
    },
    // 对数据进行递归的排序添加
    objToTree(treeList, root) {
      const arr = []
      // 1.遍历
      treeList.forEach((item) => {
        // 2.首次传入pid为0  判断treeList的pid是否为0 如果为空就是一级节点
        if (item.pid === root) {
          // 找到之后就要去找item下面有没有子节点  以 item.id 作为 父 id, 接着往下找
          const child = this.objToTree(treeList, item.id)
          ///console.log('子节点查询：', item.pid, item.title, child);
          if (child.length > 0) {
            // 如果child的长度大于0,说明找到了子节点
            item.child = child
          }
          // 将item项, 追加到arr数组中
          arr.push(item)
        }
      })
      return arr
    },
    // 对数据进行递归修改
    recQueryHandle(treeData, curNode, tag) {
      // 当前操作的节点
      treeData.forEach((item) => {
        // 添加节点
        if (tag == 'add' && item.id == curNode.pid) {
          if (!item.child) {
            this.$set(item, 'child', [])
          }
          curNode.edit = false
          item.child.push(curNode)
        }
        // 编辑或删除节点
        if (item.id === curNode.id) {
          if (tag == 'edit') {
            this.$set(item, 'edit', false)
            this.$set(item, 'title', curNode.title)
            this.$set(item, 'secid', curNode.secid)
          } else if (tag === 'del') {
            let index = treeData.findIndex((t) => t.id == curNode.id)
            treeData.splice(index, 1)
          }
        }
        // 递归调用
        if (item.child) this.recQueryHandle(item.child, curNode, tag)
      })
    },
    // 查询父级节点
    queryParNode(treeData, pid) {
      treeData.forEach((nodeItem) => {
        if (nodeItem.id == pid) {
          this.result = nodeItem
          console.log('上层的数据：', JSON.stringify(nodeItem))
        }
        if (nodeItem.child) this.result = this.queryParNode(nodeItem.child, pid)
      })
      return this.result
    },
  },
  created() {
    this.dataSoure()
  },
}
</script>

<style lang="scss" scoped>
</style>