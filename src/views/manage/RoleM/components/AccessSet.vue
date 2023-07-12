<template>
  <div class="lay-con-layer">
    <el-row><el-button class="header-btn" type="primary" plain size="mini" round  @click="submit()">保 存</el-button></el-row>
	<el-page-header class="form-header" @back="close" content="权限配置"> </el-page-header>
    <el-tree class="tree-scroll" show-checkbox default-expand-all node-key="id" ref="tree" v-loading="loading" highlight-current :data="treeData"> </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    rId: {
      type: Number,
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      treeData: [],
      loading: true,
    }
  },
  methods: {
    init() {
      this.$api.roleM.getAcces().then((res) => {
        let accs = []
        res.CurrentPageData.forEach((parAcc) => {
          // 父级权限
          let parA = {
            id: parAcc.ParAccId,
            label: parAcc.ParAccName,
            children: [],
          }
          // 子级权限
          parAcc.AccList.forEach((childAcc) => {
            let childA = {
              id: childAcc.AccId,
              label: childAcc.AccName,
            }
            parA.children.push(childA)
          })
          accs.push(parA)
        })
        this.treeData = accs
        console.log(this.rId)
      })
      // 绑定角色已经配置好的权限
      this.$api.roleM
        .getAccesSet({
          RoleId: this.rId,
        })
        .then((config) => {
          console.log(config)
          this.$refs.tree.setCheckedKeys(config.AccIdList)
        })
        .finally((f) => {
          this.loading = false
        })
    },
    submit() {
      let accIds = this.$refs.tree.getCheckedKeys()
      console.log(accIds)
      this.treeData.forEach((td) => {
        let index = accIds.findIndex((id) => id == td.id)
        if (index != -1) {
          accIds.splice(index, 1)
        }
      })
      console.log(accIds)
      this.$api.roleM
        .setRoleAcc({
          RoleId: this.rId,
          AccIdList: accIds,
        })
        .then((res) => {
          console.log(res)
        })
      this.onSubmit(true)
    },
    close() {
      this.onSubmit(false)
    },
    // 树的节点操作
    checkedKeyHandle() {
      let accIds = this.$refs.tree.getCheckedKeys()
      this.treeData.forEach((td) => {
        accIds.remove(td.id)
      })
      return accIds
    },
  },
  beforeMount() {
    this.init()
    console.log(this.rId)
  },
}
</script>

<style scoped="scoped">
@import url('@/common/css/treeStyle.css');
.tree-scroll{height: 95%;overflow: scroll;}
.header-btn{
  position: absolute;
  left: 230px;
}
</style>
