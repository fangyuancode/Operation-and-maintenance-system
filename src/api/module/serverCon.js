/*
	数据请求接口模块
*/
import ajax from '@/common/util/ajax.js'

let path = '/api/ServerSetMessageM/';

//获取服务器连接信息
export const getSer = (params) => {
	return ajax({
		url: path,
		method: 'get',
		params
	})
}
//获取服务器类型集合
export const getSerType = () => {
	return ajax({
		url: path+'SerTypeQueryMore',
		method: 'get',
	})
}
//更新和创建服务器连接信息
export const update = (data) => {
	return ajax({
		url: path,
		method: 'post',
		data
	})
}
//测试连接
export const testCon = ()=>{
	return ajax({
		url:path+'TestConnection',
		method:'get',
	});
}

