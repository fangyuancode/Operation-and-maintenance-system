import { getDepartmentlist, getLocationlist } from "@/api/front/common"

import { getoutBoundTable } from "@/api/front/outBound"

/**
 * 状态对象
 */
const state = {
    departMentList: [],
    locationList: [],
    outBoundtTable: [],
    //处理后的位置数据
    addressList: [],
    // 用户的部门数据
    userdepartMent: []
}


/**
 * 直接跟新state的多个方法的对象
 */
const mutations = {
    changeDepartMent(state, payload) {
        state.departMentList = payload
    },
    changeLocationlist(state, payload) {
        state.locationList = payload
    },
    changeoutBoundtTable(state, payload) {
        state.outBoundtTable = payload;
    },
    // 位置数据
    changeAddressList(state, payload) {
        state.addressList = payload;
    },
    // 用户部门数据
    changeUserdepartMent(state, payload) {
        state.userdepartMent = payload;
    }
}

/**
 * 通过 mutations 间接更新state的多个方法的对象
 */
const actions = {
    //1. 请求部门数据
    async getDepartment(context) {
        const res = await getDepartmentlist({ id: '' })
        context.commit('changeDepartMent', res?.CurrentPageData)
    },
    //2.  请求位置数据
    async getLocation(context) {
        const res = await getLocationlist({ groupId: 'groupId' })
        context.commit('changeLocationlist', res.CurrentPageData)
    },
    // 3. 出库备件列表
    async getOutDoundtTable(context, payload) {
        const res = await getoutBoundTable(payload)
        context.commit('changeoutBoundtTable', res.CurrentPageData)
    },
}

/**
 * 	包含多个基于state的getter计算属性对象
 */
const getters = {

}

export default {
    namespaced: true, // 为 true 使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
    state,
    actions,
    getters,
    mutations
}