import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * 导入自定义的路由
 */
import front from './modules/front.js'
import manage from './modules/manage.js'
import common from './modules/common.js'

import cookies from '@/common/util/cookies.js'
import member from '@/common/util/member.js'

Vue.use(VueRouter)

const routes = [...front, ...manage, ...common]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

/*全局前置路由守卫 --- 初始化的时候调用、切换的时候调用*/
router.beforeEach(async (to, from, next) => {
	//console.log('前置路由守卫：', to, from);
	let token = cookies.get(member.TOKEN),
		adminInfo = JSON.parse(cookies.get(member.ADMININFO)),
		path = to.path;
	console.log('此次访问路径：', path);
	let toAdminM = /^\/VfBasics/.test(path)
	// console.log(to.meta.isAuth) 
	// 判断是否需要验证票据
	if (to.meta.isAuth) {
		// 判断票据是否为空
		if (token != null && token.length != 0) {
			console.log('去后台的路由：', toAdminM)
			// 判断是否为去后台的路由
			if (toAdminM) {
				// 判断是否有进入后台的权限(管理员)
				if (adminInfo && adminInfo.IsAdmin) {
					next();
				} else {
					// 跳转至未授权提示页面
					router.push('Unauthorized')
				}
			} else {
				if (adminInfo) {
					router.push('Front/Login')
				} else {
					next()
				}
			}
		} else {
			// 判断是否为去后台的路由
			if (toAdminM) {
				// 票据为空且是去后台的路由直接跳转后台登录页面
				router.push('/AdminM/LoginM');
			} else {
				// 前端登录界面
				router.push('/Front/Login');
			}
		}
	} else {
		next()
	}
})


/*后置路由守卫*/
router.afterEach((to, from) => {
	let titleM = '智慧运维综合服务管理系统-'
	let titleF = '智慧运维综合服务平台-'
	let isToAdminM = /^\/VfBasics/.test(to.path) || /^\/AdminM/.test(to.path)
	if (isToAdminM) {
		document.title = titleM + to.meta.title || titleM
	} else {
		document.title = titleF + to.meta.title || titleF
	}
})

/*当路由发生错误的时候*/
router.onError(callback => {
	console.log(callback)
})

export default router