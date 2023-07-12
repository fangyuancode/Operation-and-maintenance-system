import ajax from "@/common/util/ajax.js"

/*后台管理员数据请求接口模块*/
let path = '/api/AdminAccM/';

/* 添加*/
export const create = (data) => {
	return ajax({
		url: path,
		method: 'post',
		data
	})
}

/*删除*/
export const remove = (params) => {
	return ajax({
		url: path,
		method: 'delete',
		params
	})
}

/*修改*/
export const update = (data) => {
	return ajax({
		url: path,
		method: 'put',
		data
	})
}

/*重置密码*/
export const resetPwd = (data) => {
	return ajax({
		url: path + 'ResetPwd',
		method: 'post',
		data: data.id
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
	}, {
		load: false
	})
}
