<template>
	<div class="lay-container">
		<div class="cus-title">头部菜单</div>
		<ul class="theme-content">
			<li class="cus-theme-item" :style="{'background-color':color}"
				:class="{'them-this bi-check2':themConfig.topMeun==color,}" v-for="color in colors" :key="color"
				@click="themeCheck('topMeun',color)">
			</li>
		</ul>

		<div class="cus-title">界面标题</div>
		<ul class="theme-content">
			<li class="cus-theme-item" :style="{'background-color':color}"
				:class="{'them-this bi-check2':themConfig.title==color,}" v-for="color in colors" :key="color"
				@click="themeCheck('title',color)">
			</li>
		</ul>

		<div class="cus-title">左侧边栏</div>
		<ul class="theme-content">
			<li class="cus-theme-item" :style="{'background-color':color}"
				:class="{'them-this bi-check2':themConfig.leftMeun==color,}" v-for="color in colors" :key="color"
				@click="themeCheck('leftMeun',color)">
			</li>
		</ul>

	</div>
</template>

<script>
	import themColor from '@/common/lib/manage/themeConfig.js'
	export default {
		name: "Theme_Compont",
		data() {
			return {
				themConfig: {
					topMeun: '#ff263b', // 头部菜单
					title: '#ff263b', // 标题
					leftMeun: '#ff263b' // 左侧菜单	
				},
				colors: []
			}
		},
		methods: {
			/**
			 * 主题的颜色设置
			 * @param {Object} type	 类型
			 * @param {Object} color 颜色
			 */
			themeCheck(type, color) {
				this.themConfig[type] = color;
				// 全局添加样式名称：data-theme，并在sessionStorage获取对应的样式名称的值。
				this.$store.dispatch('global/cusThemehandle', this.themConfig);
				// 将配置缓存在本地
				this.$cookies.set(this.$member.THEMECONFIG_ADMIN, JSON.stringify(this.themConfig), 1000);
			}
		},
		created() {
			themColor.forEach(item => {
				this.colors.push(item.theme_color);
			})

			// 获得缓存的主题样式
			let themConfigAdmin = this.$cookies.get(this.$member.THEMECONFIG_ADMIN);
			if (themConfigAdmin) { this.themConfig = JSON.parse(themConfigAdmin); }

		}
	}
</script>

<style lang="scss" scoped>
	.cus-title {
		margin-top: 10px;
		font-size: 18px;
	}

	.theme-content {
		display: flex;
		flex-direction: row;
		margin-top: 10px;
	}

	.theme-content li {
		list-style: none;
		margin: 3px;
	}

	.cus-theme-item {
		width: 28px;
		height: 28px;
		border-radius: 30px;
		font-size: 28px;
		line-height: 28px;
	}

	.them-this {
		color: #c3c5bd;
		border: 1px solid #000000;
	}
</style>
