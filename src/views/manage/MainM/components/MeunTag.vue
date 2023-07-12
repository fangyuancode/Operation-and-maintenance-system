<template>
  <!-- 页面标签操作 START -->
  <div class="cus-header-row">
    <div class="cus-header-leftcol">
      <div class="cus-tag-move" @click="moveTag('left')"><i class="el-icon-arrow-left"></i></div>
      <div class="cus-tag-section" id="cus-tag-section">
        <div class="cus-tag-box" id="cus-tag-box">
          <el-tag
            class="cus-tag"
            :key="item.path"
            v-for="(item, index) in editableTags"
            :closable="index != 0"
            :effect="`${defaultActive == item.path ? effect.dark : effect.plain}`"
            @close="removeTag(item.path)"
            @click="checkTag(item.path)"
            :id="`tag-${item.path}`"
          >
            <div v-if="index == 0" class="el-icon-house"></div>
            <i v-else-if="index != 0">
              {{ item.title }}
            </i>
          </el-tag>
        </div>
      </div>
      <div class="cus-tag-move" @click="moveTag('right')">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div>
      <el-dropdown class="cus-dropdown-menubox" @command="TagGropuhandle">
        <span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="current">关闭当前标签页</el-dropdown-item>
          <el-dropdown-item command="other">关闭其它标签页</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有标签页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
  <!-- 页面标签操作 END -->
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MeunTag',
  data() {
    return {
      effect: {
        dark: 'dark',
        light: 'light',
        plain: 'plain',
      }, // 标签的主题
    }
  },
  computed: {
    ...mapState({
      editableTags: (state) => state.global.editableTags, // 已打开过的标签数组
      defaultActive: (state) => state.global.defaultActive, // 当前打开页面的标签
    }),
  },
  methods: {
    // 选中标签时的触发
    checkTag(targetName) {
      //var keys = this.$options.parent.componentInstance.keys;
      console.log(this.$options)
      this.$store.dispatch('global/checkTagHandle', targetName)
    },
    // 移除标签
    removeTag(targetName) {
      console.log(this.$options.name)
      this.$store.dispatch('global/removeTagHandle', targetName)
    },
    // 操控标签左右移动
    moveTag(direction) {
      let tagSectEle = document.querySelector('#cus-tag-section') //标签盒子
      let tagboxEle = document.querySelector('#cus-tag-box') // 外层遮挡的盒子
      let secWidth = tagSectEle.offsetWidth // 标签盒子的宽度
      let boxWidth = tagboxEle.offsetWidth // 外层盒子的宽度
      let boxleftSet = tagboxEle.offsetLeft // 目前的偏移量
      if (direction === 'right') {
        // 标签向左移动的时
        // tag 标签盒子宽度于外层盒子的宽度时
        if (boxWidth >= secWidth) {
          //console.log("左偏移量Start：", boxleftSet);
          if (boxWidth - Math.abs(boxleftSet) > secWidth) {
            tagboxEle.style.left = `${boxleftSet - secWidth / 2}px`
          } else {
            if (boxWidth - Math.abs(boxleftSet) >= 0 && boxWidth - Math.abs(boxleftSet) <= secWidth / 2) {
              tagboxEle.style.left = `${boxleftSet - secWidth / 2}px`
            }
          }
        } else {
          tagboxEle.style.left = `4px`
        }
      } else {
        // 标签向右移动的时
        // tag 标签盒子宽度于外层盒子的宽度时
        if (boxWidth >= secWidth) {
          if (boxleftSet + secWidth / 2 < 4) {
            tagboxEle.style.left = `${boxleftSet + secWidth / 2}px`
          } else {
            tagboxEle.style.left = `4px`
          }
        } else {
          tagboxEle.style.left = `4px`
        }
      }
    },
    // 标签的批量操作
    TagGropuhandle(command) {
      this.$store.dispatch('global/tagGropuhandle', command)
    },
  },
  watch: {
    editableTags: {
      deep: true,
      handler(newVal, oldVal) {
        let tagSectEle = document.querySelector('#cus-tag-section') //标签盒子
        let tagboxEle = document.querySelector('#cus-tag-box') // 外层遮挡的盒子
        let secWidth = tagSectEle.offsetWidth // 标签盒子的宽度
        let boxWidth = tagboxEle.offsetWidth // 外层盒子的宽度
        if (boxWidth > secWidth) {
          tagboxEle.style.left = `4px`
        }
      },
    },
  },
}
</script>

<style scoped>
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

.cus-tag-section {
  width: 100%;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0;
}

.cus-tag-box {
  height: 34px;
  display: flex;
  flex-direction: row;
  margin: 4px 4px;
  position: absolute;
  left: 4px;
  top: 0px;
  transition-duration: 0.9s;
}

.cus-tag-section::-webkit-scrollbar {
  width: 1px;
  height: 3px;
  background-color: rgba(240, 240, 240, 1);
}

.cus-tag-move {
  height: 40px;
  width: 40px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.02);
}

.cus-tag {
  cursor: pointer;
  margin-left: 3px;
}

.cus-dropdown-menubox {
  float: right;
  width: 40px;
  height: 40px;
  border-left: 1px solid #e9eef3;
  border-right: 1px solid #e9eef3;
}
</style>
