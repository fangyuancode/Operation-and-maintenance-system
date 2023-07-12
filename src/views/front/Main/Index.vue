<template>
  <div class="box">
    <!-- 左侧 -->
    <SideMenu @change="sideMenu" :routerMenu="routerMenu"></SideMenu>
    <!-- END -->

    <!-- 内容 -->
    <div class="box-content">
      <!-- 内容TOP -->
      <TopMenu :childNav="childNav" @change="topNav"></TopMenu>
      <!-- END -->
      <div class="box-main">
          <router-view></router-view>
      </div>
    </div>
    <!-- END -->
  </div>
</template>

<script>
import { frontRouterMenu } from '@/common/lib/manage/routerMenu.js'
import cusPagination from '@/components/Cus-Pagination/Cus-Pagination.vue'
import SideMenu from './components/SideMenu.vue'
import TopMenu from './components/TopMenu.vue'

export default {
  name: 'IndexLayout',
  data() {
    return {
      userShow: false,
      routerMenu: [], // 路由菜单
      childNav: {}, // 菜单导航
      frontPath: '', // 左侧路径标记
    }
  },
  components: {
    cusPagination,
    SideMenu,
    TopMenu,
  },
  computed: {},
  methods: {
    //初始化
    init() {
      // 获取
      this.frontPath = this.$cookies.get(this.$member.FRONTPATH)
      if (this.frontPath) {
        this.$store.dispatch('global/frontTagHandle', this.frontPath)
        let arrPath = this.frontPath.split('/')
        this.routerMenu.forEach((r) => {
          r.isActiv = false
          if (r.path == arrPath[0]) {
            this.childNav = r
            this.childNav.children.forEach((c) => {
              c.isNavActiv = false
              if (c.path == arrPath[1]) {
                c.isNavActiv = true
              }
            })
          }
        })
      } else {
        this.childNav = this.routerMenu[0]
        this.childNav.children[0].isNavActiv = true
      }
      this.childNav.isActiv = true
    },
    //左侧点击操作
    sideMenu(child) {
      this.childNav = child
      this.routerMenu.forEach((r) => {
        if (r.isActiv) {
          r.isActiv = false
        }
      })
      this.childNav.isActiv = true
      let navp = '',
        count = 0
      this.childNav.children.forEach((c) => {
        if (c.isNavActiv) {
          navp = c.path
        } else {
          count++
        }
      })
      if (navp == '') {
        navp = this.childNav.children[0].path
      }

      if (count >= this.childNav.children.length) {
        this.childNav.children[0].isNavActiv = true
      }

      this.frontPath = `${child.path}/${navp}`
      console.log("child",this.frontPath);

      // 全局中添加路径
      this.$store.dispatch('global/frontTagHandle', this.frontPath)
      // 将配置缓存在本地
      this.$cookies.set(this.$member.FRONTPATH, this.frontPath)
    },
    topNav(nav) {
      this.frontPath = `${this.childNav.path}/${nav.path}`
      this.childNav.children.forEach((c) => {
        c.isNavActiv = false
        if (c.path == nav.path) {
          c.isNavActiv = true
        }
      })
      // 全局中添加路径
      this.$store.dispatch('global/frontTagHandle', this.frontPath)
      // 将配置缓存在本地
      this.$cookies.set(this.$member.FRONTPATH, this.frontPath)
    },
  },
  watch: {
    frontPath(nv, ov) {
      if (this.frontPath == null || nv == ov) {
        return
      }
      let cnv = this.frontPath.split('/')
      if (this.$route.path == '/' + cnv[1]) {
        return
      }
      this.$router.push(cnv[1]).then((res) => {
        if (res.path == '/404') {
          this.$cookies.del(this.$member.FRONTPATH)
        }
      })
    },
  },
  created() {
    this.routerMenu = new frontRouterMenu()
    this.routerMenu.forEach((r) => {
      r.isActiv = false
      r.children.forEach((c) => {
        c.isNavActiv = false
      })
    })
  },
  mounted() {
    /* 路由初始化 */
    this.init()

    document.onkeydown = (e) => {
      if (e.keyCode == 13 && e.ctrlKey) {
        this.$router.push('/AdminM/LoginM')
        return
      }
    }
  },
}
</script>

<style scoped='scoped' lange="scss">
.box {
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;
  display: flex;
  overflow-y: hidden;
}

.box-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}
.box-main {
  height: 100%;
  overflow: hidden;
  padding: 10px;
}
.con-body {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.con-body-search{
  margin-bottom: 10px;
}
.form-item-margin{
  margin-bottom: 10px;
}
</style>
