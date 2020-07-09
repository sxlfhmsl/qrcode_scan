<template>
	<scroll-view class="padding-sm bg-white">
		<!-- <view class="flex margin-top-sm">
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom solid-top" style="width: 50%;">品种名称</view>
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom solid-top" style="width: 50%;">批次号</view>
			<view class="flex-treble padding-sm col-auto-line solid" style="width: 40%;">规格</view>
		</view> -->
		<view class="margin-top margin-bottom" v-for="(item,index) in itemData" :key="index">
			<!-- @tap="jumpToDetail(item.materialId)" -->
			<!-- <view class="flex-twice padding-sm col-auto-line solid-left solid-bottom" style="width: 50%;">{{item.materialName}}</view>
			<view class="flex-twice padding-sm col-auto-line solid-left solid-bottom" style="width: 50%;">{{item.materialCode}}</view>
			<view class="flex-treble padding-sm col-auto-line solid-left solid-bottom solid-right" style="width: 40%;">{{item.materialSpecs}}</view> -->
			<materialDetailMode :materialId="item.materialId"></materialDetailMode>
		</view>
	</scroll-view>
</template>

<script>
	import materialDetailMode from "@/pages/components/materialDetailMode.vue"
	
	export default {
		name: 'pdSourceInfo',
		components: {
			materialDetailMode
		},
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
			jumpToDetail: function(id) {
				uni.navigateTo({
					url: '/pages/components/materialDetail?id=' + id,
				});
			}
		}
	}
</script>

<style>
	.col-auto-line {
		word-wrap:break-word;
		word-break:normal;
	}
</style>
