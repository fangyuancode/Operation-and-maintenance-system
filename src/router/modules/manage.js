/*
	后台的页面路由存放的模板
*/
import member from '@/common/util/member.js'
const front = [{
		path: '/AdminM/LoginM',
		component: () => import('@/views/manage/LoginM/LoginM.vue'),
		meta: { // 自定义数据
			isAuth: false, // 是否需要授权
			title: '后台登录' // 页面标题
		}
	},
	{
		path: member.ACCOUNTPATH,
		redirect: member.ACCOUNTPATH + '/MainM',
		component: () => import('@/views/manage/MainM/Index.vue'),
		meta: { // 自定义数据
			isAuth: true, // 是否需要授权
			title: '后台管理' // 页面标题
		},
		children: [{
				path: 'MainM',
				component: () => import('@/views/manage/MainM/Main.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '主页' // 页面标题
				}
			},
			{
				path: 'GroupM',
				component: () => import('@/views/manage/GroupM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '部门管理' // 页面标题
				}
			},
			{
				path: 'ClassesM',
				component: () => import('@/views/manage/ClassesM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '班组管理' // 页面标题
				}
			},
			{
				path: 'AccessM',
				component: () => import('@/views/manage/AccessM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '权限管理' // 页面标题
				}
			},
			{
				path: 'RoleM',
				component: () => import('@/views/manage/RoleM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '角色管理' // 页面标题
				}
			},
			{
				path: 'AdminM',
				component: () => import('@/views/manage/AdminM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '管理员管理' // 页面标题
				}
			},
			{
				path: 'UserM',
				component: () => import('@/views/manage/UserM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '用户管理' // 页面标题
				}
			},
			{
				path: 'EquipTypeM',
				component: () => import('@/views/manage/EquipTypeM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '设备类型' // 页面标题
				}
			},
			{
				path: 'EquipClassifyM',
				component: () => import('@/views/manage/EquipClassifyM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '设备分类' // 页面标题
				}
			},
			{
				path: 'FactoryM',
				component: () => import('@/views/manage/FactoryM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '工厂管理' // 页面标题
				}
			},
			{
				path: 'SectionM',
				component: () => import('@/views/manage/SectionM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '工厂部门管理' // 页面标题
				}
			},
			{
				path: 'DeviceM',
				component: () => import('@/views/manage/DeviceM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '装置管理' // 页面标题
				}
			},
			{
				path: 'AreaM',
				component: () => import('@/views/manage/AreaM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '区域管理' // 页面标题
				}
			},
			{
				path: 'EquipPropertyM',
				component: () => import('@/views/manage/EquipPropertyM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '设备属性管理' // 页面标题
				}
			},
			{
				path: 'EquipmentM',
				component: () => import('@/views/manage/EquipmentM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '设备台账' // 页面标题
				}
			},
			{
				path: 'ManufacturerM',
				component: () => import('@/views/manage/ManufacturerM/Index.vue'),
				meta: {
					isAuth: true,
					title: '制造商管理'
				}
			},
			{
				path: 'MaterialTypeM',
				component: () => import('@/views/manage/MaterialTypeM/Index.vue'),
				meta: {
					isAuth: true,
					title: '材料类型'
				}
			},
			{
				path: 'MaterialM',
				component: () => import('@/views/manage/MaterialM/Index.vue'),
				meta: {
					isAuth: true,
					title: '材料管理'
				}
			},
			{
				path: 'LibraryPlaceM',
				component: () => import('@/views/manage/LibraryPlaceM/Index.vue'),
				meta: {
					isAuth: true,
					title: '材料管理'
				}
			},

			{
				path: 'SerSetM',
				component: () => import('@/views/manage/SerSetM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '服务器管理' // 页面标题
				}
			},
			{
				path: '404',
				component: () => import('@/views/common/Error/404.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '404' // 页面标题
				}
			},
			{
				path: 'LibraryM',
				component: () => import('@/views/manage/LibraryM/Index.vue'),
				meta: { // 自定义数据
					isAuth: true, // 是否需要授权
					title: '库存信息' // 页面标题
				}
			},
			{
				redirect: '404',
				path: '*'
			}
		]
	},
];

export default front