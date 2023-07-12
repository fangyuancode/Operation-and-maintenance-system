import ajax from '@/common/util/ajax.js'

/*用户的数据接口*/
let path = '/api/UserAuthor/';

/*添加*/
export const login = (data) => {
	return ajax({
		url: path + 'Login',
		method: 'post',
		data
	})
}

/**
 * 用户的密码修改
 */
export const modifyUserPwd = (data) => {
	return ajax({
		url: path + 'ModifyUserPwd',
		method: 'post',
		data
	})
}
/**
 * 用户的信息查询
 */
export const queryUInfo = () => {
	return ajax({
		url: path + 'QueryUInfo',
		method: 'get',
	})
}

/**
 * 用户的信息修改
 */
export const modifyUserInfo = (data) => {
	return ajax({
		url: path + 'ModifyUserInfo',
		method: 'post',
		data
	})
}

