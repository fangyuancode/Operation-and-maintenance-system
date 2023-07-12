/* ajax 请求函数的封装模块
	返回值：Promise对象
*/

import axios from "axios"

import cookies from '@/common/util/cookies.js'
import member from '@/common/util/member.js'
import NProgress from 'nprogress'

import { Notification } from 'element-ui'

/**
 * @param options 请求的配置选项
 * @param custom 自定义的配置
 */
export default function ajax(options, custom = {
	load: true
}) {
	return new Promise((resolve, reject) => {
		// 创建 axios 实例
		const instance = new axios.create({
			method: 'get',
			// 基础url前缀
			//baseUrl: baseUrl,
			// 请求头信息
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			// 参数
			data: {},
			// 设置超时时间
			timeout: 8000,
			// 携带凭证
			// withCredentials: true,
			// 返回数据类型
			responseType: 'json',
		});
		// 添加请求拦截器
		instance.interceptors.request.use(
			config => {
				NProgress.start()
				/* 从 cookies 里面拿到 token ,并携带 */
				let token = cookies.get(member.TOKEN);
				if (token) {
					config.headers.token = token
					//config.headers.Authorization = 'BasicAuthorize ' + token;
				} else {
					// 重定向到登录页面
					// router.push('/login')
				}
				return config;
			},
			(err) => {
				return Promise.reject(err);
			}
		)
		// 添加响应拦截器
		instance.interceptors.response.use(
			response => { // 响应成功
				NProgress.done();
				let res = response.data;
				//console.log('响应拦截：', res);
				if (res.IsSuccess) {
					if (res.CurrentPageData)
						return res;
					else
						return res.Data;
				} else {
					Notification({
						title: '警告',
						message: res.ErrorMessage,
						type: 'warning',
						duration: 3000
					});
					return Promise.reject(res.ErrorMessage) // 返回接口返回的错误信息
				}
			},
			err => {
				if (err && err.response) {
					switch (err.response.status) {
						case 400:
							err.message = '请求错误'
							break;
						case 401:
							err.message = '未授权，请登录'
							break;
						case 403:
							err.message = '未授权，拒绝访问请求'
							break;
						case 404:
							err.message = `请求地址出错: ${err.response.config.url}`
							break;
						case 405:
							err.message = `请求不被允许`
							break;
						case 408:
							err.message = '请求超时'
							break;
						case 500:
							err.message = '服务器内部错误'
							break;
						case 501:
							err.message = '服务未实现'
							break;
						case 502:
							err.message = '网关错误'
							break;
						case 503:
							err.message = '服务不可用'
							break;
						case 504:
							err.message = '网关超时'
							break;
						case 505:
							err.message = 'HTTP版本不受支持'
							break;
						default:
							err.message = '未知错误'
							break;
					}
				} else {
					err.message = '请求超时';
				}
				Notification({
					title: '警告',
					message: err.message,
					type: 'error'
				});
				NProgress.done();
				return Promise.reject(err) // 返回接口返回的错误信息
			}
		)
		// 请求处理
		instance(options).then(res => {
			resolve(res);
			return false;
		}).catch(error => {
			reject(error);
			console.log(error, options);
		})
	})
}
