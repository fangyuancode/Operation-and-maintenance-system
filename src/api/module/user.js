import ajax from '@/common/util/ajax.js'

/*用户的数据接口*/
let path = '/api/UserM/';

/*添加*/
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


/*密码重置*/
export const pwdReset = (params) => {
	return ajax({
		url: path + 'ResetUserPwd',
		method: 'post',
		params
	})
}

/*升级成管理员*/
export const upAdmin = (data) => {
	return ajax({
		url: path + 'UpAdmin',
		method: 'post',
		data
	})
}
/*批量修改班组*/
export const MoreAlter = (data) => {
	return ajax({
		url: path + '/MoreAlter',
		method: 'put',
		data
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

/*同步用户*/
export const synchron = () => {
	return ajax({
		url: path + 'SynChronUser',
		method: 'get',
	})
}
