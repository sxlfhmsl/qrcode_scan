<template>
	<scroll-view class="padding-sm bg-white">
		<view class="flex margin-top-sm">
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom solid-top" style="width: 30%;">原材料名称</view>
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom solid-top" style="width: 30%;">材料编号</view>
			<view class="flex-treble padding-sm col-auto-line solid" style="width: 40%;">规格</view>
		</view>
		<view class="flex" v-for="(item,index) in itemData" :key="index">
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom" style="width: 30%;">{{item.materialName}}</view>
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom" style="width: 30%;">{{item.materialCode}}</view>
			<view class="flex-treble padding-sm col-auto-line solid-left solid-bottom solid-right" style="width: 40%;">{{item.materialSpecs}}</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'pdSourceInfo',
		props: {
			itemData: {
				required: true,
				default: function() {
					return [];
				}
			}
		},
		data() {
			return {
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
