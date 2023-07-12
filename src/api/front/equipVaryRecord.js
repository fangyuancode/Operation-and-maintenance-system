import ajax from '@/common/util/ajax.js'

/*用户的数据接口*/
let path = '/api/EquipVaryRecord/';


/* 变更添加 */
export const eqvrCreate = (data) => {
    return ajax({
        url: path + 'Create',
        method: 'post',
        data
    })
}

/* 变更的信息 */
export const eqvrUpData = (data) => {
    return ajax({
        url: path + 'UpData',
        method: 'post',
        data
    })
}

/** 获取变更信息 */
export const eqvrQuery = (params) => {
    return ajax({
        url: path + 'Query',
        method: 'get',
        params
    })
}

/*  变更的数据列表 */
export const chanageDataList = (params) => {
    return ajax({
        url: path + 'GetChanageDataList',
        method: 'get',
        params
    })
}