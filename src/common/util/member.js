// side模块显示
let sideModule = [
	{ id: 1, title: '主页', icon: 'bi-house' },
	{ id: 2, title: '组织管理', icon: 'bi-people-fill' },
	{ id: 3, title: '权限管理', icon: 'bi-box-seam' },
	{ id: 10, title: '系统服务', icon: 'bi-gear' },
	// 以下为前端
	{ id: 11, title: '工作台', icon: 'bi-hdd-stack' },
	{ id: 12, title: '台账查询', icon: 'el-icon-document' },
	{ id: 15, title: '变更', icon: 'bi-files' },
	{ id: 16, title: '分析', icon: 'bi-graph-down' }
];

export default {
	// 普通常量
	DOMAINNAME: 'https://localhost:44390/', // 域名
	SIDEMODULE: sideModule, // side模块显示
	ACCOUNTPATH: '/VfBasics', //后端权限宿主路径

	// cookies常量
	TOKEN: '_TOKEN', // 票据
	ADMININFO: '_ADMININFO', // 管理员信息	
	USERINFO: '_USERINFO', // 用户的信息
	ADMINACC: '_ADMINACC', // 后台权限
	FRONTACC: '_FRONTACC',//前端权限
	CODEVAILD: '_CODEVAILD', //验证次数
	THEMECONFIG_ADMIN: '_THEMECONFIG_ADMIN', // 后台的主题配置（ cookies 名称 ）
	FRONTPATH: '_FRONTPATH', //存储前端路径标记
}
