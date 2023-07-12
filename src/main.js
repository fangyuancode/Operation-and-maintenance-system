import Vue from 'vue'
import App from './App.vue'

/*第三方组件*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {UxGrid,UxTableColumn} from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css'

/*自定义组件*/
import router from './router'
import store from './store'
import utils from '@/common/util'
import api from '@/api/index.js'

// 全局挂载
Vue.prototype.$api = api

// 注册模块
Vue.use(ElementUI)
Vue.use(utils)
Vue.use(UxGrid)
Vue.use(UxTableColumn)


/* 关闭vue的版本信息提示 */
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this; //安装全局事件总线
	},
}).$mount('#app')
