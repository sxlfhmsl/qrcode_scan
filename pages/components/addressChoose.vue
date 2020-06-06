<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				地址选择
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-punch" style="background-color: rgba(255,255,255,0);"></text>
			</block>
		</cu-custom>
		
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map 
					style="width: 100%;" 
					:style="'height: calc(100vh - ' + CustomBar + 'rpx);'" 
					:latitude="center.latitude" 
					:longitude="center.longitude" 
					:markers="covers">
				</map>
			</view>
		</view>
		
		<button
			class="cuIcon cuIcon-locationfill cu-btn lg line-blue"
			style="position: fixed; z-index: 100;right: 20rpx;"
			:style="'top: ' + (CustomBar + 70) + 'rpx;' "
			@tap="toLocation"
		></button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				'center': {
					'longitude': 104.06575163597108,    // 经度
					'latitude': 30.65744964620209,      // 纬度
				},
				'covers': [{
					'id': 'choose',
					'longitude': 104.06575163597108,
					'latitude': 30.65744964620209,
					'title': '天府广场',
				}]
			}
		},
		methods: {
			toLocation: function() {
				
			}
		}
	}
</script>

<style>

</style>
