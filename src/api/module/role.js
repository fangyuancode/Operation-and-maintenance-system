import ajax from "@/common/util/ajax.js"

/*后台工厂数据请求接口模块*/
let path = '/api/RoleM/';

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

/*单条数据查询*/
export const query = (params) => {
	return ajax({
		url: path,
		method: 'get',
		params
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

/*配置角色的权限*/
export const setRoleAcc = (data) => {
	return ajax({
		url: path + 'SetRoleAccess/',
		method: 'post',
		data
	})
}

/*配置中获取所有权限列表*/
export const getAcces = () => {
	return ajax({
		url: path + 'GetAcces',
		method: 'get',
	})
}

/* 配置中获取所有权限列表*/
export const getAccesSet = (data) => {
	return ajax({
		url: path + 'GetAccesSet/',
		method: 'post',
		data
	})
}
