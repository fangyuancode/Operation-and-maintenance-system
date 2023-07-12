import ajax from '@/common/util/ajax.js'
/*入库接口*/
let path = '/api/OutLibrary/';

// https://localhost:44347/api/OutLibrary/Query?GroupIdTag=&MaterialName=&LibraryPlaceIdTag=
/* 出库信息列表 */
export const getoutBoundTable = (params) => {
    return ajax({
        url: path + 'Query',
        method: 'get',
        params
    })
}
// 批量出库https://localhost:44347/api/OutLibrary/AddMoreData
export const batchOutbound = (data) => {
    return ajax({
        url: path + 'AddMoreData',
        method: 'post',
        data
    })
}
// 删除出库表信息https://localhost:44347/api/OutLibrary/Delete?id=1
export const deleteOutlistItem = (params) => {
    return ajax({
        url: path + 'Delete',
        method: 'delete',
        params
    })
}
// 修改出库信息https://localhost:44347/api/OutLibrary/Query

/*修改*/
export const changeOuttable = (data) => {
    return ajax({
        url: path + ' Query',
        method: 'put',
        data
    })
}