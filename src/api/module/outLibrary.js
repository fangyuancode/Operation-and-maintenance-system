import ajax from '@/common/util/ajax.js'

/*数据请求接口模块*/
let path = '/api/OutLibraryM/';

/* 添加*/
export const create = (data) => {
    return ajax({
        url: path,
        method: 'post',
        data
    })
}

/*单条或多条数据查询*/
export const query = (params) => {
    return ajax({
        url: path,
        method: 'get',
        params
    })
}
