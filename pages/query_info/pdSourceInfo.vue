<template>
	<scroll-view class="padding-sm bg-white">
		<view class="flex margin-top-sm">
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom solid-top" style="width: 30%;">原材料名称</view>
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom solid-top" style="width: 30%;">材料编号</view>
			<view class="flex-treble padding-sm col-auto-line solid" style="width: 40%;">规格</view>
		</view>
		<view class="flex" v-for="(sourceItem,index) in sourceItems" :key="index">
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom" style="width: 30%;">{{sourceItem.name}}</view>
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom" style="width: 30%;">{{sourceItem.code}}</view>
			<view class="flex-treble padding-sm col-auto-line solid-left solid-bottom solid-right" style="width: 40%;">{{sourceItem.size}}</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'pdSourceInfo',
		data() {
			return {
				sourceItems: [{
					name: 'PCCP',
					code: '3',
					size: ''
				}, {
					name: '钢板',
					code: '1',
					size: '36cm * 95cm'
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.col-auto-line {
		word-wrap:break-word;
		word-break:normal;
	}
</style>
