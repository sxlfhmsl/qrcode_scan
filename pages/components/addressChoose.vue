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
					ref="locationMap"
					id="locationMap"
					style="width: 100%;" 
					:style="'height: calc(100vh - ' + (CustomBar * 2) + 'rpx);'" 
					:latitude="center.latitude" 
					:longitude="center.longitude" 
					:markers="covers">
					<cover-view
						class="font-content-simsun"
						style="
							background-color: rgba(255, 255, 255, 0.8);
							border-radius: 20rpx;
							color: #000000;
							font-size: 30rpx;
							border: #000000 solid 2rpx;
							position: fixed;
							z-index: 100;
							left: 20rpx;
							height: 80rpx;
							width: 500rpx;
							top: 100rpx;
							font-size: 30rpx;
							line-height: 2.5em;
						"
						:style="'top: ' + (CustomBar * 2) + 'rpx;width: calc(100vw - ' + 140 + 'rpx);'"
					>
						{{'  ' + covers[0].title}}
					</cover-view>
					
					<cover-image
						src="~@/static/location.png"
						style="border-radius: 40rpx; border: gray solid 1rpx; position: fixed; z-index: 100;right: 20rpx; width: 80rpx; height: 80rpx;"
						:style="'top: ' + (CustomBar * 2) + 'rpx;' "
						@tap="toLocation"
					>
					</cover-image>
					
					<cover-image
						src="~@/static/bigger.png"
						style="border: #000000 solid 2rpx; position: fixed; z-index: 100;right: 20rpx; width: 80rpx; height: 80rpx; bottom: 120rpx;"
						@tap="lower"
					>
					</cover-image>
					
					<cover-image
						src="~@/static/lower.png"
						style="border: #000000 solid 2rpx; position: fixed; z-index: 100;right: 20rpx; width: 80rpx; height: 80rpx; bottom: 40rpx;"
						@tap="toLocation"
					>
					</cover-image>
					
					<cover-view
						class="cu-btn bg-gradual-blue font-content-simkai text-center shadow"
						style="font-size: 50rpx; border-radius: 80rpx; border: #fff solid 2rpx; position: fixed; z-index: 100;right: 20rpx; width: 160rpx; height: 160rpx; bottom: 40rpx; left: calc(50vw - 80rpx);"
						@tap="confirm"
					>确定</cover-view>
				</map>
			</view>
		</view>
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
					'iconPath': '../../static/pos.png',
				}],
				map: null
			}
		},
		methods: {
			toLocation: function() {
				
			},
			
			bigger: function() {
				
			},
			
			lower: function() {
				
			},
			
			confirm: function() {
				
			}
		},
		mounted: function(){
		},
		onReady: function() {
			this.map = this.$refs.locationMap;
		}
	}
</script>

<style>
	
</style>
