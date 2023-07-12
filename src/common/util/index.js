/*工具类统一集成 */
import cookies from '@/common/util/cookies.js'
import cache from '@/common/util/cache.js'
import member from '@/common/util/member.js'
import layer from '@/common/util/layer.js'
import verifiy from '@/common/util/verifiy.js'

/* 三方工具类 */
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default {
	install(Vue) {
		Vue.prototype.$nProgress = nProgress
		// cookies
		Vue.prototype.$cookies = cookies
		// 本地缓存
		Vue.prototype.$cache = cache
		// 常量
		Vue.prototype.$member = member
		// 弹窗
		Vue.prototype.$layer = layer
		// 表单的验证
		Vue.prototype.$verifiy = verifiy
	}
}