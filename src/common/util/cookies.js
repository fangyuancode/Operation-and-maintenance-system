/*cookie 工具*/

const port = document.location.port;

import member from '@/common/util/member.js'

const cookies = {
	//  读取cookies
	get: (key) => {
		key = key + '&' + port;
		let reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
		let arr = document.cookie.match(reg)
		if (arr)
			return (decodeURI(arr[2]));
		else
			return null;
	},
	// 设置
	set: (key, val, expiredays) => {
		key = key + '&' + port;
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = key + "=" + encodeURI(val) + ((expiredays == null) ? "" : ";expires=" + exdate
			.toGMTString()) + ";path = /";
	},
	// 删除
	del: (key) => {
		let oldKey = key;
		key = key + '&' + port;
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = cookies.get(oldKey);
		if (cval != null)
			document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
	},
	// 删除所有
	delAll: () => {
		for (const key in member) {
			let index = member[key].indexOf('_');
			console.log(index);
			if (index == 0) {
				cookies.del(member[key]);
			}
		}
	}
}

export default cookies
