import ajax from '@/common/util/ajax.js'
/*入库接口*/
let path = '/api/EnterLibrary/';

// https://localhost:44347/api/EnterLibrary/Query?SectionIdTag=&MaterialIdTag=
/* 备件信息列表 */
export const getSparePartInfo = (params) => {
    return ajax({
        url: path + 'Query',
        method: 'get',
        params
    })
}
// /* 备件添加 https://localhost:44347/api/EnterLibrary/AddMoreData */
export const addSparePart = (data) => {
    return ajax({
        url: path + 'AddMoreData',
        method: 'post',
        data
    })
}
//删除 https://localhost:44347/api/EnterLibrary/Delete?id=1
export const deletelistItem = (params) => {
    return ajax({
        url: path + 'Delete',
        method: 'delete',
        params
    })
}
// https://localhost:44347/api/EnterLibrary/Update
/* 修改入库信息 */
export const updateHouseInfo = (data) => {
    return ajax({
        url: path + 'Update',
		method: 'put',
        data
    })
}

