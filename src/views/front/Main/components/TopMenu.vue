<template>
  <div class="con-top">
    <div class="con-top-title">
      <i style="color: #3c88cf; font-size: 20px" class="bi" :class="childNav.icon"></i>
      <span> {{ childNav.title }}</span>
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="con-top-nav">
      <a :class="item.isNavActiv ? 'con-top-nav-activx' : ''" v-for="item of childNav.children" :key="item.path" @click="topNav(item)">{{ item.title }}</a>
    </div>
    <div class="con-top-right">
      <el-popover placement="bottom" trigger="click" stretch="true" @tab-click="handleClick">
        <div class="cus-topIcon-item" slot="reference">
          <el-badge value="2" type="primary">
            <i class="bi bi-bell"></i>
          </el-badge>
        </div>
        <el-tabs type="border-card" style="width: 350px; max-height: 500px; box-shadow: ">
          <el-tab-pane label="@我">
            <span>11</span>
            <el-divider></el-divider>
            <span>22...</span>
          </el-tab-pane>
          <el-tab-pane label="公司通知"> 通知 </el-tab-pane>
          <el-tab-pane label="私信"> 私信 </el-tab-pane>
        </el-tabs>
        <div class="LookAllnotice">查看全部</div>
      </el-popover>
      <div class="cus-topIcon-item" @click="topHandle('screen')">
        <i :class="{ 'bi-arrows-fullscreen': !fullscreen, 'bi-fullscreen-exit': fullscreen }" :title="fullscreen == false ? '全屏' : '退出全屏'"></i>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description  头部菜单
 * @param {Object} childNav   菜单导航
 */
import screenfull from 'screenfull'

export default {
  name: 'TopMenu',
  props: {
    childNav: {
      type: Object,
      default: {},
    },
  },

  data() {
    return {
      fullscreen: false, // 全屏
    }
  },
  methods: {
    topNav(nav) {
      this.$emit('change', nav)
    },
    // 头部菜单栏的操作
    topHandle(tag) {
      switch (tag) {
        case 'screen':
          this.toggleFullScreen()
          break
        default:
          break
      }
    },
    // 信息选项卡的点击事件
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 全屏
    toggleFullScreen() {
      if (!screenfull.isEnabled) {
        this.$notify({
          title: '温馨提示',
          message: '您的浏览器无法使用全屏功能，请更换谷歌浏览器或者请手动点击F11按钮全屏展示！',
        })
        return false
      }
      screenfull.toggle()
      if (screenfull.isFullscreen) {
        this.fullscreen = false
      } else {
        this.fullscreen = true
      }
    },
  },
  mounted() {},
}
</script>

<style>
.el-popover {
  padding: 0;
}
</style>

<style scoped="scoped">
/* con-top/con-nav/con-right  */
.con-top {
  height: 50px;
  width: 100%;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 4px 8px rgb(0 0 0 / 3%);
  position: relative;
  display: flex;
  z-index: 2;
  align-items: center;
  box-sizing: border-box;
}

.con-top-title {
  min-width: 74px;
  font-size: 16px;
  color: #333;
  line-height: 24px;
  font-weight: 600;
}

.con-top-nav {
  display: flex;
  color: #333;
  font-size: 16px;
  text-align: center;
  height: 50px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.con-top-nav a {
  display: block;
  line-height: 49px;
  cursor: pointer;
  position: relative;
  padding: 0 18px;
}

.con-top-nav a::before {
  content: '';
  border-bottom: 1px solid #3c88cf;
  width: 0;
  height: 49px;
  position: absolute;
  left: 50%;
}
.con-top-nav a:hover {
  color: #3c88cf;
  font-weight: 500;
}
.con-top-nav a:hover::before {
  border-bottom: 1px solid rgb(60, 136, 207,0.7);
  left: 2%;
  width: 96%;
  transition: 0.3s;
}

.con-top-nav-activx {
  color: #3c88cf;
  border-bottom: 1px solid #3c88cf;
  font-weight: 500;
  position: relative;
}

.con-top-right {
  display: flex;
  margin-left: auto;
  right: 0;
}

.con-top-right .cus-topIcon-item {
  display: block;
  margin: 0 10px;
  width: 30px;
  cursor: pointer;
  text-align: center;
}

.con-top-right .cus-topIcon-item:hover {
  border-radius: 3px;
  background-color: #eff4ff;
  text-align: center;
}

.LookAllnotice {
  height: 35px;
  line-height: 35px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-top: 0;
  text-align: right;
  padding-right: 10px;
  cursor: pointer;
}

/* end */
</style>
