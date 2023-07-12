import ajax from '@/common/util/ajax.js'

/*数据请求接口模块*/
let path = '/api/LibraryM/';


/*单条或多条数据查询*/
export const query = (params) => {
	return ajax({
		url: path,
		method: 'get',
		params
	})
}
