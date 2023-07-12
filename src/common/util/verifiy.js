import { Message } from 'element-ui'
/*输入框的校验规则*/

const require = {
	required: true,
	message: '不能为空',
	trigger: 'blur'
}
//选项
const select = {
	required: true,
	message: '请选择',
	trigger: 'change'
}

// 导出的规则
const verifiy = {
	userAcc: [require, {
		message: '只允许字母数字下划线，限3-18位',
		trigger: "blur",
		pattern: /^[a-zA-Z0-9_\\s·]{3,18}$/,
	},
		{
			message: "首尾不能出现下划线\'_\'",
			trigger: "blur",
			pattern: /(?!^\_)|(?!\__)|(?!\_+$)/,
		},
		{
			message: '不能全为数字',
			trigger: "blur",
			pattern: /(?!\d+$)[\dA-Za-z\u4e00-\u9fa5]{3,18}/,
		},
	],
	pwd: [require, {
		message: '密码必须6到18位，且不能出现空格',
		trigger: "blur",
		pattern: /^[\S]{6,18}$/,
	}],
	phone: [require, {
		message: '手机号必须11位数字，且不能出现空格',
		trigger: "blur",
		pattern: /^[0-9]{11}$/
	}],
	text_10: [require, {
		max: 10,
		message: '长度不超过10个字符',
		trigger: 'blur'
	}],
	text_20: [require, {
		max: 20,
		message: '长度不超过20个字符',
		trigger: 'blur'
	}],
	text_30: [require, {
		max: 30,
		message: '长度不超过30个字符',
		trigger: 'blur'
	}],
	text_50: [require, {
		max: 50,
		message: '长度不超过50个字符',
		trigger: 'blur'
	}],
	text_100: [require, {
		max: 100,
		message: '长度不超过100个字符',
		trigger: 'blur'
	}],
	text_200: [require, {
		max: 200,
		message: '长度不超过200个字符',
		trigger: 'blur'
	}],
	number: [require, {
		type: 'number',
		message: '必须是数字',
		trigger: "blur",
	}],
	number_2: [require, {
		message: '0-99个数字',
		trigger: "blur",
		pattern: /^[0-9]{0,2}$/,
	}],
	number_11: [require, {
		message: '长度必须为11个字符数字',
		trigger: "blur",
		pattern: /^[0-9]{11}$/,
	}],
	email: [require, {
		type: 'email',
		message: '请输入正确的邮箱地址',
		trigger: ['blur', 'change']
	}],
	select: select,
	//验证输入有效性 val:值，num:范围最大数
	/* textValid(val, num) {
		if (val.length > num || val.length <= 0) {
			Message({
				message: `字数必须1-${num}范围`,
				type: 'warning',
			});
			return true;
		}
		return false;
	}, */

	//验证输入有效性 val:值，num:范围最大数, tips：提示
	textValid(val, num, tips) {
		if (tips) {
			if (val.trim().length > num || val.trim().length <= 0) {
				Message({
					dangerouslyUseHTMLString: true,
					message: `<strong>${tips}</strong> 长度在 1~${num} 个字符`,
					type: 'warning',
				});
				return true;
			}
		} else {
			if (val.length > num || val.length <= 0) {
				Message({
					message: `字数必须1-${num}范围`,
					type: 'warning',
				});
				return true;
			}
		}
		return false;
	},
	//验证输入有效性 val:值，num:范围最大数 , tips：提示
	numberValid(val, num, tips) {
		console.log(/^[\d]*$/.test(val));
		if (!/^[\d]*$/.test(val)) {
			Message({
				dangerouslyUseHTMLString: true,
				message: `<strong>${tips}</strong> 必须是正整数`,
				type: 'warning',
			});
			return true;
		}
		if (num != 0 || num != '') {
			if (val > num || val < 0) {
				Message({
					dangerouslyUseHTMLString: true,
					message: `<strong>${tips}</strong> 数字大小范围是 0~${num}`,
					type: 'warning',
				});
				return true;
			}
		}
		return false;
	},


	//验证输入有效性 val:值
	accValid(val) {
		if (!new RegExp("^[a-zA-Z0-9_\\s·]{3,18}$").test(val)) {
			return '只允许字母数字下划线，限3-18位'
		}
		if (/(^\_)|(\__)|(\_+$)/.test(val)) {
			return '首尾不能出现下划线\'_\''
		}
		if (/^\d+\d+\d$/.test(val)) {
			return '不能全为数字'
		}
	},
	phoneValid(val) {
		if (!/^[0-9]{11}$/.test(val)) {
			return '手机号必须11位数字，且不能出现空格'
		}
	},
}

export default verifiy
