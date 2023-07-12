import ajax from '@/common/util/ajax.js'

/*用户的数据接口*/
let path = '/api/Equipment/';


/* 查询 */
export const equQuery = (params) => {
    return ajax({
        url: path + 'Query',
        method: 'get',
        params
    })
}

/* 获取属性名称信息 */
export const equProInfo = (params) => {
    return ajax({
        url: path + 'EquipPropertyInfo',
        method: 'get',
        params
    })
}

/* 查询属性的值 */
export const equPValue = (params) => {
    return ajax({
        url: path + 'EquPropOEquPValue',
        method: 'get',
        params
    })
}

/* 设备台账属性 */
export const equipAnnexInfo = (params) => {
    return ajax({
        url: path + 'EquipAnnexInfo',
        method: 'get',
        params
    })
}
