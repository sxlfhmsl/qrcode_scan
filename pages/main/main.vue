<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">二维码</block>
		</cu-custom>
		<basics v-if="PageCur == 'basics'"></basics>
		<components v-if="PageCur == 'component'"></components>
		<plugin v-if="PageCur == 'plugin'"></plugin>
		<!-- <view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/basics' + [PageCur == 'basics' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'basics' ? 'text-green' : 'text-gray'">元素</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/component' + [PageCur == 'component' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'component' ? 'text-green' : 'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/plugin' + [PageCur == 'plugin' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'plugin' ? 'text-green' : 'text-gray'">扩展</view>
			</view>
		</view> -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view :class="PageCur == 'basics'? 'action text-green': 'action text-gray'" @click="NavChange" data-cur="basics">
				<view class="cuIcon-homefill"></view>
				首页
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				发布
			</view>
			<view :class="PageCur == 'plugin'? 'action text-green': 'action text-gray'" @click="NavChange" data-cur="basics">
				<view class="cuIcon-my"></view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			PageCur: 'basics'
		};
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
		}
	}
};
</script>

<style></style>
