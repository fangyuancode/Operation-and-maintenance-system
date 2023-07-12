/*
	数据请求接口模块
*/
import ajax from '@/common/util/ajax.js'


let path = '/api/ClassesM/';

/* 添加*/
export const create= (data) => {
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

/* 单条数据查询*/
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
//手动同步班组
export const synchron = () => {
	return ajax({
		url: path + 'SynchronClasses',
		method: 'get',
	})
}
