/*
	存放全局公用状态
*/

const COLLAPSEHANDLE = 'COLLAPSEHANDLE';
const CHECKTAGHANDLE = 'CHECKTAGHANDLE';
const REMOVETAGHANDLE = 'REMOVETAGHANDLE';
const ADDTAGHANDLE = 'ADDTAGHANDLE';
const TAGGROPUHANDLE = 'TAGGROPUHANDLE';
const CUSTHEMEHANDLE = 'CUSTHEMEHANDLE';
const FRONTTAGHANDLE = 'FRONTTAGHANDLE';

import cookies from '@/common/util/cookies.js'
import member from '@/common/util/member.js'
import themeSoure from '@/common/lib/manage/themeConfig.js'


/**
 * 状态对象
 */
const state = {
	collapse: false, // 侧边伸缩 
	drawer: false, // 右边的抽屉
	editableTags: [], // 打开的标签数据
	defaultActive: '', // 左侧与右侧菜单默认打开的
	cusTheme: {}, // 自定义的主题
	sidePath: '', //前端左侧标记
	userIcon: require('@/common/imgs/tubiao1.png')
}

/**
 * 	包含多个基于state的getter计算属性对象
 */
const getters = {
	//头部菜单的主题格式
	topMeun: (state) => {
		let tsoure = {};
		if (state.cusTheme.topMeun) {
			tsoure = themeSoure.filter(t => t.theme_color == state.cusTheme.topMeun);
			if (tsoure.length != 0) { return tsoure[0]; }
		}
		return themeSoure[0];
	},
	/// 界面标题
	title: state => {
		let tsoure = {};
		if (state.cusTheme.topMeun) {
			tsoure = themeSoure.filter(t => t.theme_color == state.cusTheme.title);
			if (tsoure.length != 0) { return tsoure[0]; }
		}
		return themeSoure[0];
	},
	/// 左边菜单栏
	leftMeun: state => {
		let tsoure = {};
		if (state.cusTheme.topMeun) {
			tsoure = themeSoure.filter(t => t.theme_color == state.cusTheme.leftMeun);
			if (tsoure.length != 0) { return tsoure[0]; }
		}
		return themeSoure[0];
	}
}

/**
 * 通过 mutations 间接更新state的多个方法的对象
 * //  context  上下文
 */
const actions = {
	// 侧边伸缩修改
	collapseHandle(context, val) {
		context.commit(COLLAPSEHANDLE, val);
	},
	// 当前打开的菜单
	checkTagHandle(context, val) {
		context.commit(CHECKTAGHANDLE, val);
	},
	// 添加打开的标签
	addtaghandle(context, val) {
		context.commit(ADDTAGHANDLE, val);
	},
	// 移除打开的页面标签
	removeTagHandle(context, val) {
		context.commit(REMOVETAGHANDLE, val);
	},
	// 标签的批量操作
	tagGropuhandle(context, val) {
		context.commit(TAGGROPUHANDLE, val);
	},
	// 主题的操作
	cusThemehandle(context, val) {
		context.commit(CUSTHEMEHANDLE, val);
	},
	frontTagHandle(context, val) {
		context.commit(FRONTTAGHANDLE, val);
	}
}

/**
 * 直接跟新state的多个方法的对象
 */
const mutations = {
	// 侧边伸缩修改
	[COLLAPSEHANDLE](state, val) {
		state.collapse = val;
	},
	// 当前打开的菜单
	[CHECKTAGHANDLE](state, val) {
		state.defaultActive = val;
	},
	//  添加打开的标签
	[ADDTAGHANDLE](state, val) {
		let existIndex = state.editableTags.filter(et => et.path == val.path);
		if (existIndex.length != 1) {
			state.editableTags.push(val);
		}
	},
	//移除打开的页面标签
	[REMOVETAGHANDLE](state, val) {
		let tabs = state.editableTags;
		let activeName = state.defaultActive;
		if (activeName === val) {
			tabs.forEach((tab, index) => {
				if (tab.path === val) {
					let nextTab = tabs[index + 1] || tabs[index - 1];
					if (nextTab) {
						activeName = nextTab.path;
					}
				}
			});
		}
		state.defaultActive = activeName;
		state.editableTags = tabs.filter((tab) => tab.path !== val);
	},
	// 标签的批量操作
	[TAGGROPUHANDLE](state, command) {
		// 已打开标签中的第一个值
		let routes = JSON.parse(cookies.get(member.ADMINACC));
		console.log("路由的数据：", routes);
		let fristRoute = routes[0].children[0].path;
		switch (command) {
			case "current":
				if (state.defaultActive != fristRoute) {
					this.commit('global/REMOVETAGHANDLE', state.defaultActive);
				}
				break;
			case "other":
				// 如果当前打开的路由不是第一个路由，
				// 则要保存当前路由和第一个路由
				if (state.defaultActive != fristRoute) {
					state.editableTags = state.editableTags.filter(
						(tab) => tab.path == state.defaultActive || tab.path == fristRoute
					);
				} else {
					state.editableTags = state.editableTags.filter(
						(tab) => tab.path == fristRoute
					);
				}
				break;
			case "all":
				state.editableTags = state.editableTags.filter(
					(tab) => tab.path == fristRoute
				);
				state.defaultActive = fristRoute;
				break;
			default:
				break;
		}
	},
	/// 主题的操作
	[CUSTHEMEHANDLE](state, val) {
		state.cusTheme = val;
	},
	[FRONTTAGHANDLE](state, val) {
		state.sidePath = val;
	}
}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}
