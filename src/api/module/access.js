import ajax from "@/common/util/ajax.js"

/*  权限增删改查通用接口 */
let path = '/api/AccessM/';

/*添加*/
export const create = (data) => {
	return ajax({
		url: path,
		method: 'post',
		data
	})
}

/* 删除*/
export const remove = (params) => {
	return ajax({
		url: path,
		method: 'delete',
		params
	})
}

/* 修改*/
export const update = (data) => {
	return ajax({
		url: path,
		method: 'put',
		data
	})
}

/*父级权限查询*/
export const queryParent = () => {
	return ajax({
		url: path + 'QueryParAcc',
		method: 'get',
		params: {
			dateTime: new Date()
		}
	})
}

/*获得所有的关联权限*/
export const queryAllConnAcc = (params) => {
	return ajax({
		url: `${path}AllConnAcc`,
		method: 'get',
		params
	})
}

/* 权限关联*/
export const realtionAcc = (data) => {
	return ajax({
		url: path + 'RealtionAcc',
		method: 'post',
		data
	})
}

/*单条数据查询*/
export const query = (params) => {
	return ajax({
		url: path + params,
		method: 'get',
	})
}


/*多条数据查询*/
export const queryMore = (params) => {
	return ajax({
		url: path,
		method: 'get',
		params
	})
}

/*批量导出*/
export const batchExport = (params) => {
	return ajax({
		url: path + 'BatchExport',
		method: 'get',
		params
	})
}
