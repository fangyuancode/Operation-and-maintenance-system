<template>
  <div class="lay-container">
    <div class="lay-container-pan" v-show="isMain">
      <!-- START 头部搜索 -->
      <div class="lay-container-condition">
        <h3 style="padding: 10px 0">设备分类</h3>
      </div>
      <!-- END -->
      <!-- START 主题内容 -->
      <div class="lay-container-content">
        <div>
          <el-button type="primary" plain size="mini" @click="addFrom">新增</el-button>
          <el-button size="mini" icon="el-icon-refresh-right" @click="init(true)"></el-button>
        </div>
        <div class="cus-tree-container">
          <cusTree :treeData="treeData" @addHanlde="create" @delHandle="del" @editHandle="edit"></cusTree>
        </div>
      </div>
      <!-- END -->
    </div>

    <!-- START 添加 -->
    <equipClassifyCreate v-if="isAddform" @onSubmit="addSubmit"></equipClassifyCreate>
    <!-- END -->
  </div>
</template>

<script>
import equipClassifyCreate from './components/EquipClassifyCreate.vue'
import cusTree from '@/components/Cus-Tree/Cus-Tree.vue'

export default {
  name: 'EquipClassifyM',
  data() {
    return {
      loading: true, // 表单加载动画
      isMain: true, //主窗显示
      isAddform: false, // 添加弹窗的显示
      treeData: [],
    }
  },
  components: {
    equipClassifyCreate,
    cusTree,
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
      let equClassM = {
        EquipClassifyName: node.title.trim(),
        EquipParClassifyTag: node.pid,
      }
      console.log('添加是的数据：', node)
      this.$api.equipClassifyM.create(equClassM).then((res) => {
        console.log('分类ID:', res)
        this.$layer.msgSuccess('分类添加成功')
        console.log('数据添加', this.treeData)
        node.id = res
        this.recQueryHandle(this.treeData, node, 'add')
      })
    },
    // 编辑
    edit(node) {
      if (this.$verifiy.textValid(node.title, 20)) {
        return
      }
      this.$api.equipClassifyM
        .update({
          EquipClassifyId: node.id,
          EquipClassifyName: node.title.trim(),
        })
        .then((res) => {
          this.$layer.msgSuccess(res)
          node.edit = false
          this.recQueryHandle(this.treeData, node, 'edit')
          console.log('------：', this.treeData)
        })
        .catch((err) => {})
    },
    //删除
    del(node) {
      this.$api.equipClassifyM.remove({ id: node.id }).then((res) => {
        this.$layer.msgSuccess(res)
        this.recQueryHandle(this.treeData, node, 'del')
      })
    },
    // 数据
    async dataSoure() {
      this.loading = true
      await this.$api.equipClassifyM
        .query({
          PageIndex: 0,
          PageSize: 0,
        })
        .then((res) => {
          this.treeData = []
          let pageData = res.CurrentPageData
          let tree_data = []
          pageData.forEach((item) => {
            tree_data.push({
              id: item.EquipClassifyId,
              title: item.EquipClassifyName,
              pid: item.EquipParClassifyTag,
            })
          })
          // 查询顶级的分类
          var _data = this.objToTree(tree_data, 0)
          this.treeData = _data
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
        if (tag == 'add' && item.id == curNode.pid) {
          if (!item.child) {
            this.$set(item, 'child', [])
          }
          curNode.edit = false
          item.child.push(curNode)
        }

        if (item.id === curNode.id) {
          if (tag == 'edit') {
            this.$set(item, 'edit', false)
            this.$set(item, 'title', curNode.title)
          } else if (tag === 'del') {
            let index = treeData.findIndex((t) => t.id == curNode.id)
            treeData.splice(index, 1)
          }
        }

        if (item.child) {
          this.recQueryHandle(item.child, curNode, tag)
        }
      })
    },
  },
  mounted() {
    this.dataSoure()
  },
}
</script>

<style scoped="scoped" lang="scss">
.span-edit {
  position: absolute;
  width: 42px;
  height: 26px;
  z-index: 99;
}

.cus-tree-container {
  height: calc(100% - 60px);
  overflow-y: scroll;
}
</style>