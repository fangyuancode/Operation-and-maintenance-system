import ajax from '@/common/util/ajax.js'

/*公共接口*/
let path = '/api/CommonM/';


// 运行部门
// https://localhost:44347/api/CommonM/Groups
export const getDepartmentlist = (params) => {
    return ajax({
        url: path + 'Groups',
        method: 'get',
        params
    })
}
//位置信息列表请求 https://localhost:44347/api/CommonM/LibraryPlaces

export const getLocationlist = (params) => {
    return ajax({
        url: path + 'LibraryPlaces',
        method: 'get',
        params
    })
}

// 备件集合 https://localhost:44347/api/CommonM/Materials?MaterialName=
export const getSparepartlist = (params) => {
    return ajax({
        url: path + 'Materials',
        method: 'get',
        params
    })
}
