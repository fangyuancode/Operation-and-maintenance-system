/*前台的页面路由存放的模板*/
//import textExm from "../../views/front/Index/Index.vue"

const front = [{
	path: '/Front/Login',
	component: () => import('@/views/front/Login/Login.vue'),
	meta: { // 自定义数据
		isAuth: false, // 是否需要授权
		title: '登录' // 页面标题
	}
},
{
	path: '/',
	component: () => import('@/views/front/Main/Index.vue'),
	redirect: 'Main',
	meta: { // 自定义数据
		isAuth: true, // 是否需要授权
		title: '主页' // 页面标题
	},
	children: [
		{
			path: 'Main',
			component: () => import('@/views/front/Main/Main.vue'),
			meta: { // 自定义数据
				isAuth: true, // 是否需要授权
				title: '工作台' // 页面标题
			}
		},
		{
			path: 'Equipment',
			component: () => import('@/views/front/Equipment/Index.vue'),
			meta: { // 自定义数据
				isAuth: true, // 是否需要授权
				title: '台账' // 页面标题
			}
		},
		{
			path: 'ChanageEquip',
			component: () => import('@/views/front/EquipVaryRecord/ChanageEquip.vue'),
			meta: { // 自定义数据
				isAuth: true, // 是否需要授权
				title: '变更列表' // 页面标题
			}
		},
		{
			path: 'ChanageRecord',
			component: () => import('@/views/front/EquipVaryRecord/ChanageRecord.vue'),
			meta: { // 自定义数据
				isAuth: true, // 是否需要授权
				title: '变更记录' // 页面标题
			}
		},


		// 备品备件
		{
			path: 'SpareParts',
			component: () => import('@/views/front/SpareParts/index.vue'),
			meta: { // 自定义数据
				isAuth: true, // 是否需要授权
				title: '台账' // 页面标题
			}
		},
		{
			path: 'WareHouse',
			component: () => import('@/views/front/SpareParts/WareHouse/WareHouse.vue'),
			meta: { // 自定义数据
				isAuth: true, // 是否需要授权
				title: '入库' // 页面标题
			},

		},
		{
			path: 'OutBound',
			component: () => import('@/views/front/SpareParts/OutBound/OutBound.vue'),
			meta: { // 自定义数据
				isAuth: true, // 是否需要授权
				title: '出库' // 页面标题
			}
		},
		{
			path: 'addItem',
			component: () => import('@/views/front/SpareParts/WareHouse/addItem.vue'),
		},
		{
			path: 'outItem',
			component: () => import('@/views/front/SpareParts/OutBound/outItem.vue'),
		}
	]
},
];

export default front
