<template name="worktable">
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">
				{{this.softwareInfo.defaultTitle}}
			</block>
		</cu-custom>
		
		<!-- 所有的按钮 -->
		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator hover-class="none" url="/pages/personal/software_info" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in models" :key="index">
					<view class="nav-title" style="font-size: 1em; margin-right: 2em;">{{item.title}}</view>
					<view class="nav-name" style="margin-bottom: 0rpx;">{{item.childCount}}</view>
					<text :class="item.icon"></text>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'worktable',
		data() {
			return {
				models: [{
					title: '原材料管理',
					childCount: '1',
					color: 'cyan',
					icon: 'alicon-icon-database-fill'
				}, {
					title: '产品制作',
					childCount: '2',
					color: 'cyan',
					icon: 'cuIcon-punch'
				}, {
					title: '安装施工',
					childCount: '1',
					color: 'cyan',
					icon: 'cuIcon-repair'
				}, {
					title: '人员管理',
					childCount: '1',
					color: 'cyan',
					icon: 'cuIcon-peoplefill'
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.page {
		margin-top: 30vh;
	}
</style>
