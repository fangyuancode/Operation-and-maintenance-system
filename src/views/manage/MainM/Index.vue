<template>
  <div>
    <el-container :style="{ height: clientPage.height + 'px' }">
      <!-- 左侧 START -->
      <el-aside :style="leftStyle" class="cus-aside" width="200px">
        <!-- 界面标题 START -->
        <div class="cus-title" :style="{ 'background-color': titleM.theme_color, color: titleM.text_color }">
          <!-- <img src="../../../common/imgs/logo.png" /> -->
          管理系统
        </div>
        <!-- END -->

        <!-- 菜单 START -->
        <el-menu
          :default-active="defaultActive"
          :style="{ height: clientPage.height - 62 + 'px' }"
          class="left-menu-vertical"
          :background-color="leftMeun.theme_color"
          :text-color="leftMeun.text_color"
          :active-text-color="leftMeun.active_color"
          :collapse="collapse"
          :unique-opened="true"
        >
          <el-submenu :index="item.path" v-for="item of routerMenu" popper-class="cus-submenu" :key="item.path">
            <template slot="title">
              <i :class="item.icon" style="margin-right: 10px; font-size: 17px" :style="{ color: leftMeun.text_color }"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item :index="`${child.path}`" @click="handleTag(child)" v-for="(child, i) of item.children" :key="i">
              {{ child.title }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- END -->
      </el-aside>
      <!-- END -->

      <!-- 右侧 START -->
      <el-container>
        <el-header class="cus-header">
          <menuHeader :clientPage="clientPage"></menuHeader>
        </el-header>

        <!-- 页面主体 START  -->
        <el-main class="cus-main">
          <keep-alive :include="editableTags.map((et) => et.path)">
            <router-view></router-view>
          </keep-alive>
        </el-main>
        <!-- END  -->

        <!-- <el-footer class="cus-footer">
					世纪恒祥 @2021
				</el-footer> -->
      </el-container>
      <!-- END -->
    </el-container>
  </div>
</template>

<script>
import { adminRouterMenu } from '@/common/lib/manage/routerMenu.js'
import menuHeader from './components/MenuHeader.vue'

import { mapState, mapGetters } from 'vuex'
export default {
  name: 'MainMIndex',
  data() {
    return {
      clientPage: {
        //浏览器页面宽高
        height: 0,
        width: 0,
      },
      leftStyle: {
        'background-color': '',
        width: '200px',
      }, // 左边的样式
      routerMenu: [], // 路由菜单
      openTag: [], // 已经打开的标签数组
      fullscreen: false, // 全屏
    }
  },
  components: {
    menuHeader,
  },
  computed: {
    ...mapState({
      collapse: (state) => state.global.collapse,
      editableTags: (state) => state.global.editableTags,
      defaultActive: (state) => state.global.defaultActive,
    }),
    ...mapGetters('global', {
      titleM: 'title',
    }),
    leftMeun: function () {
      let leftM = this.$store.getters['global/leftMeun']
      this.leftStyle['background-color'] = leftM.theme_color
      return leftM
    },
  },
  methods: {
    // 点击菜单时页面标签的操作
    handleTag(param) {
      let tagUrl = param.path
      let title = param.title
      console.log(tagUrl)
      // 菜单点击的同时标签定位
      this.$nextTick(() => {
        let tagSectEle = document.querySelector('#cus-tag-section') //标签盒子
        let tagboxEle = document.querySelector('#cus-tag-box') // 外层遮挡的盒子

        let secWidth = tagSectEle.offsetWidth
        let boxWidth = tagboxEle.offsetWidth
        let boxleftSet = tagboxEle.offsetLeft // 标签盒子目前的偏移量
        let tagEle = document.getElementById(`tag-${tagUrl}`)
        let tagleftSet = tagEle.offsetLeft // 对应标签的左偏移量
        // 判断当前的tag盒子的长度是否大于外层遮挡的盒子
        if (boxWidth > secWidth) {
          // 当前盒子显示部分偏移量的范围
          let leftScope = 4 - boxleftSet
          let rightScope = leftScope + secWidth
          // 标签需要偏移的量
          let offSet = '4'
          if (tagleftSet < leftScope) {
            // 此处需要计算的时相右移动的量
            // 范围的最小值 - 标签的偏移量
            let toRight = leftScope - tagleftSet
            // 自身的左偏移量 + 需要偏移的量
            offSet = boxleftSet + toRight
          } else if (tagleftSet + tagEle.offsetWidth > rightScope) {
            // 此处需要计算的时相左移动的量
            // (标签的左偏移量 + 标签的宽度) - 范围最大值 + 标签宽度/2
            let toLeft = tagleftSet + tagEle.offsetWidth - rightScope + tagEle.offsetWidth / 2
            offSet = boxleftSet - toLeft
          } else {
            return
          }
          tagboxEle.style.left = offSet + 'px'
        } else if (boxleftSet < 4) {
          tagboxEle.style.left = '4px'
        }
      })
      let existIndex = this.editableTags.findIndex((t) => t.path == tagUrl)
      if (existIndex == -1) {
        this.$store.dispatch('global/addtaghandle', {
          // 标签的数据
          title,
          path: tagUrl,
        })
      }
      // 修改选择项
      this.$store.dispatch('global/checkTagHandle', tagUrl)
    },
  },
  watch: {
    collapse: {
      handler(newVal, oldVal) {
        if (newVal) {
          if (this.clientPage.width <= 800) {
            this.leftStyle.width = '0 !important'
          } else {
            this.leftStyle.width = '65px !important'
          }
        } else {
          this.leftStyle.width = '200px !important'
        }
        console.log('左边的样式： ', this.leftStyle)
      },
    },
    defaultActive: {
      handler(newVal, oldVal) {
        console.log('新值： ', newVal, '旧值：', oldVal)
        if (newVal == undefined || newVal == '' || newVal == null) {
          this.$router.push(`${this.$member.ACCOUNTPATH}/404`)
          return
        } else {
          if (this.$route.path !== `${this.$member.ACCOUNTPATH}/${this.defaultActive}`) {
            this.$router.push(this.defaultActive).catch((err) => err)
          }
        }
        console.log(this.editableTags.map((et) => et.path))
      },
    },
  },
  async created() {
    /* 后台主题初始化 */
    let themConfig = this.$cookies.get(this.$member.THEMECONFIG_ADMIN)
    if (themConfig) {
      this.$store.dispatch('global/cusThemehandle', JSON.parse(themConfig))
    }
    /* 部分数据的初始化 */
    this.routerMenu = await adminRouterMenu()
    // 打开的路由
    let openUrl = this.routerMenu[0].children[0]
    // 添加已经打开过的路由
    this.$store.dispatch('global/addtaghandle', openUrl)
    // 设置当前的打开路由
    this.$store.dispatch('global/checkTagHandle', openUrl.path)
  },
  mounted() {
    /*获得初始的览器页面的宽高*/
    this.clientPage.height = window.innerHeight
    this.clientPage.width = window.innerWidth
    // 设置侧边栏的显示状态
    if (this.clientPage.width <= 800) {
      this.$store.dispatch('global/collapseHandle', true)
    } else {
      this.$store.dispatch('global/collapseHandle', false)
    }

    /* 窗口或框架被调整大小时， 动态获得浏览器页面的宽高 */
    window.onresize = () => {
      return (() => {
        this.$nextTick(() => {
          this.clientPage.height = window.innerHeight
          this.clientPage.width = window.innerWidth
          if (this.clientPage.width <= 800) {
            this.$store.dispatch('global/collapseHandle', true)
          } else {
            this.$store.dispatch('global/collapseHandle', false)
          }
        })
      })()
    }
  },
}
</script>

<style scoped="scoped">
/*页面左侧  */
.cus-aside {
  overflow: hidden !important;
  box-shadow: 2px 0 6px rgb(0 21 41 / 55%);
  z-index: 30;
  transition: all 0.5s;
  top: 0;
}

.cus-title {
  position: relative;
  height: 60px;
  text-align: center;
  line-height: 61px;
  color: #fff;
  border-bottom: 1px solid #b3c0d1;
}
.cus-title::before {
  content: '';
  position: absolute;
  top: 25%;
  right: 140px;
  width: 30px;
  height: 30px;
  background-image: url(../../../common/imgs/logo.png);
  background-size: 100%;
}

.left-menu-vertical {
  text-align: left;
  z-index: 100;
  overflow-y: auto !important;
}

.left-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}

/* 定义滚动条样式 */
.left-menu-vertical::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: rgba(240, 240, 240, 1);
}

.cus-submenu {
  background-color: antiquewhite !important;
}

/* 页面右侧部分的样式 */
.cus-header {
  height: 102px !important;
  /* min-height: 102px !important; */
  padding: 0 !important;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18), 0 0 6px rgba(0, 0, 0, 0.04);
  z-index: 20;
}

/* 左边栏的小白线 */
.left-menu-vertical {
  border-right: none !important;
}

.cus-header-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  height: 39px;
  line-height: 40px;
  text-align: center;
}

.cus-header-leftcol {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-left: 50px;
  position: relative;
}

.cus-tag-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
}

.cus-main {
  background-color: #e9eef3;
  color: #333;
  overflow: hidden;
  padding: 10px;
}

.cus-footer {
  height: 30px !important;
  padding: 0;
  line-height: 30px;
  text-align: center;
  background-color: #b3c0d1;
}
</style>
