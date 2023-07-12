/*
	公共页面路由存放的模板
*/

const common = [
	/* {
			path: '/',
			redirect: 'Ciopsys',
			// redirect: '/Front/Login',
		}, */
	{
		path: '/Unauthorized',
		component: () => import('@/views/common/Error/Unauthorized.vue'),
		meta: { // 自定义数据
			isAuth: false, // 是否需要授权
			title: '未授权' // 页面标题
		}
	},
	{
		path: '/404',
		component: () => import('@/views/common/Error/404.vue'),
		meta: { // 自定义数据
			isAuth: false,
			title: '未授权'
		}
	},
	{
		redirect: '404',
		path: '*'
	}
]

export default common
