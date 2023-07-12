module.exports = {
	//此项是用来告诉eslint找当前配置文件不能往父级查找
	root: true,
	//此项指定环境的全局变量，下面的配置指定为node环境
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	//此项是用来指定javaScript语言类型和风格
	parserOptions: {
		parser: '@babel/eslint-parser'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		"no-irregular-whitespace": "off", //这禁止掉 空格报错检查
		"no-unused-vars": 'off' ,// 不检查未使用的声明
		
	}
}
