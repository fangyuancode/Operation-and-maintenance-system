/**
 * 状态对象
 */
const state = {
	
}

/**
 * 	包含多个基于state的getter计算属性对象
 */
const getters = {}

/**
 * 通过 mutations 间接更新state的多个方法的对象
 */
const actions = {}

/**
 * 直接跟新state的多个方法的对象
 */
const mutations = {}

export default {
    namespaced: true, // 为 true 使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
    state,
    actions,
    getters,
    mutations
}