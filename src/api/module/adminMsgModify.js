/* 管理员信息修改接口 */
import ajax from "@/common/util/ajax.js"

let path = '/api/AdminAuthorM/';
/* 登录 */
export const login = (data, config) => {
	return ajax({
		url: path + 'Login',
		method: 'post',
		data
	})
}
/* 验证 */
export const loginVaild = () => {
	return ajax({
		url: path + 'Validata',
		method: 'get',
	})
}

/*管理员密码的修改 */
export const update = (data, config) => {
	return ajax({
		url: path,
		method: 'put',
		data
	})
}

/*管理员个人信息的修改 */
export const adminInfoModify = (data, config) => {
	return ajax({
		url: path + 'adminInfoModify',
		method: 'post',
		data
	})
}
