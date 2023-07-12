import ajax from '@/common/util/ajax.js'

/*数据请求接口模块*/
let path = '/api/EquipPropertyM/';

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

/*单条或多条数据查询*/
export const query = (params) => {
	return ajax({
		url: path,
		method: 'get',
		params
	})
}


/*根据设备的类型获取属性的信息*/
export const equPropOEquPre = (params) => {
	return ajax({
		url: path + 'EquPropOEquPre',
		method: 'get',
		params
	})
}
/*获取设备属性的值*/
export const addOREditEPV = (data) => {
	return ajax({
		url: path + 'AddOREditEPV',
		method: 'post',
		data
	})
}