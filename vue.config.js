const { defineConfig } = require('@vue/cli-service')

// const name = process.env.VUE_APP_TITLE || '恒祥自控管理系统' // 网页标题
const port = process.env.port || process.env.npm_config_port || 80 // 端口

module.exports = defineConfig({
	transpileDependencies: true,
	// 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
	outputDir: 'dist',
	// 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
	assetsDir: 'static',
	// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	productionSourceMap: false,
	// 禁用语法检查
	lintOnSave: false,
	// webpack-dev-server 相关配置
	devServer: {
		host: 'localhost',
		port: port,
		// open: true, // 默认打开浏览器
		proxy: {
			// 代理服务器
			'/api': {
				target: 'https://localhost:44347/', 
				ws: true, // 用于支持websocket
				changeOrigin: true 
			},
			'/Content': {
				target: 'https://localhost:44347/', 
				ws: true, // 用于支持websocket
				changeOrigin: true 
			},
		}
	},
	configureWebpack: config => {

	},
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = '基准项目'
				return args
			})
		config
			.optimization.minimizer('terser').tap((args) => {
				args[0].terserOptions.compress.drop_console = true
				return args
			})
	},
})
