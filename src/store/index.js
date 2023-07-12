/*
	Vue 最核心的管理对象 store
*/

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const modules = {}

// 遍历当前目录下的modules文件夹的所有以 .js 结尾的文件,不遍历子目录
const require_module = require.context('./modules', false, /\.js$/)

require_module.keys().forEach(file_name => {
	// file_name.slice(2, -3) 从第二位开始至倒数第三位（前后都不包括）
	modules[file_name.slice(2, -3)] = require_module(file_name).default
})

// 创建并暴露store
export default new Vuex.Store({
	modules: modules,
	// 当state中的值发生改变，此时localStorage中的vuex的值会同步把state中的所有值存储起来，当页面刷
	// 新的时候，state的值会从localStorage自动获取vuex的value值，赋值到state中
	plugins: [createPersistedState()]

})
