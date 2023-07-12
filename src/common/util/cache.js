/*localStorage 本地缓存*/
export default {
	/*设置*/
	set: (key, val) => {
		document.localStorage.setItem(key, val)
	},
	get: (key) => {
		return document.localStorage.getItem(key)
	},
	del: (key) => {
		document.localStorage.removeItem(key)
	}
}
