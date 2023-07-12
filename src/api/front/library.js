
// https://localhost:44347/api/Library/Query?SectionIdTag=&MaterialIdTag=&LibraryPlaceIdTag=

import ajax from '@/common/util/ajax.js'

/*备件查询接口*/
let path = '/api/Library/';


// 备件查询
export const getSparepartlist = (params) => {
    return ajax({
        url: path + 'GroupIdTag',
        method: 'get',
        params
    })
}
