/*后台菜单部分的路由*/
import { queryAccs } from "@/api/common.js"
import cookies from '@/common/util/cookies.js'
import member from '@/common/util/member.js'
import frontRoutes from './frontMeun.js'

// console.log('frontRoutes：', frontRoutes);

const adminRoutes = [{
	path: 'MainM',
	title: '主页',
	icon: 'bi-house', // 菜单图标
	children: [{
		path: 'MainM',
		title: '控制台'
	}]
},
{
	path: 'GroupM',
	title: '组织管理',
	icon: 'bi-people', // 菜单图标
	children: [{
		path: 'GroupM',
		title: '部门管理'
	},
	{
		path: 'ClassesM',
		title: '班组管理'
	},
	{
		path: 'UserM',
		title: '用户管理'
	},
	]
},
{
	path: 'RoleAccessManage', // 菜单地址
	title: '权限管理', // 菜单标题
	icon: 'bi-box-seam', // 菜单图标
	children: [{
		path: 'AccessM',
		title: '权限管理'
	},
	{
		path: 'RoleM',
		title: '角色管理'
	},
	{
		path: 'AdminM',
		title: '管理员管理'
	}
	]
},
{
	path: 'BookM', // 菜单地址
	title: '台账管理', // 菜单标题
	icon: ' bi-book', // 菜单图标
	children: [{
		path: 'EquipTypeM',
		title: '台账类型'
	},
	{
		path: 'EquipClassifyM',
		title: '设备分类'
	},
	{
		path: 'FactoryM',
		title: '工厂管理'
	},
	{
		path: 'SectionM',
		title: '工厂部门'
	},
	{
		path: 'DeviceM',
		title: '装置管理'
	},
	{
		path: 'AreaM',
		title: '区域管理'
	},
	{
		path: 'EquipPropertyM',
		title: '设备属性管理'
	},
	{
		path: 'EquipmentM',
		title: '设备台账'
	},
	]
},
{
	path: 'MaterialM', // 菜单地址
	title: '备品备件', // 菜单标题
	icon: 'bi-wrench', // 菜单图标
	children: [{
		path: 'ManufacturerM',
		title: '制造商管理'
	}, {
		path: 'MaterialTypeM',
		title: '材料类型'
	},
	{
		path: 'MaterialM',
		title: '材料管理'
	},
	{
		path: 'LibraryPlaceM',
		title: '库位置管理'
	},
	{
		path: 'LibraryM',
		title: '库存管理'
	}
	]
},

{
	path: 'SerConM', // 菜单地址
	title: '系统服务', // 菜单标题
	icon: 'bi-server', // 菜单图标
	children: [{
		path: 'SerSetM',
		title: '服务器管理'
	},]
},
]

const adminRouterMenu = async () => {
	let routes = []; // 路由菜单
	let sideModule = member.SIDEMODULE;
	sideModule = sideModule.slice(0, 9);
	let adminInfo = cookies.get(member.ADMININFO);
	console.log('adminInfo:', adminInfo);

	/// 获得服务端的后台页面的路由集合
	let res = await queryAccs();
	// console.log('后台的权限：', res);

	// 如果数据库里面的权限数据为空
	if (res.TotalCount == 0) {
		routes = adminRoutes;
	} else {
		// 第一个菜单的标志
		let frist = 1;
		sideModule.forEach((side, index) => {
			let route = {
				path: index + 'path', // 菜单地址
				title: side.title, // 菜单标题
				icon: side.icon, // 菜单图标
				children: [] // 子级路由
			};
			let childRs = res.CurrentPageData.filter(acc => acc.SideTag == side.id);
			if (frist == 1 && childRs.length == 0) {
				let main = {
					path: 'MainM',
					title: '控制台',
				};
				route.children.push(main);
			} else {
				childRs.forEach(child => {
					let cRot = {
						path: child.AccUrl,
						title: child.AccName
					}
					route.children.push(cRot);
				})
			}
			routes.push(route);
			frist++;
		})

	}
	routes = routes.filter(r => r.children.length > 0)
	// 将后台权限存入cookies
	cookies.set(member.ADMINACC, JSON.stringify(routes), 2);
	return routes;
}

const frontRouterMenu = () => {
	cookies.set(member.FRONTACC, JSON.stringify(frontRoutes), 2);
	return frontRoutes;
}
// console.log("frontRouterMenu", frontRouterMenu);
export { adminRouterMenu, frontRouterMenu }