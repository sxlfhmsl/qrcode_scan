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
					show-location="true"
					ref="locationMap"
					id="locationMap"
					style="width: 100%;" 
					:scale="scale"
					:style="'height: calc(100vh - ' + (CustomBar * 2) + 'rpx);'" 
					:latitude="center.latitude" 
					:longitude="center.longitude" 
					:markers="covers"
				>
					<cover-view
						class="font-content-simsun"
						style="
							background-color: rgba(255, 255, 255, 0.8);
							border-radius: 20rpx;
							color: #000000;
							border: #000000 solid 2rpx;
							position: fixed;
							z-index: 100;
							left: 20rpx;
							height: 80rpx;
							width: 500rpx;
							top: 100rpx;
							font-size: 25rpx;
							line-height: 3em;
							word-wrap:break-word;
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
						@tap="bigger"
					>
					</cover-image>
					
					<cover-image
						src="~@/static/lower.png"
						style="border: #000000 solid 2rpx; position: fixed; z-index: 100;right: 20rpx; width: 80rpx; height: 80rpx; bottom: 40rpx;"
						@tap="lower"
					>
					</cover-image>
					
					<cover-view
						class="bg-blue text-center"
						style="
							line-height: 2.7em;
							font-size: 50rpx;
							border-radius: 1.5em;
							border: #fff solid 2rpx;
							position: fixed;
							z-index: 100;
							width: 3em;
							height: 3em;
							bottom: 40rpx;
							left: calc(50vw - 1.5em);
						"
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
				'map': null,
				'scale': 16,
				'type': null,
				'mapSearch': weex.requireModule('mapSearch')  
			}
		},
		methods: {
			mapTap: function(point) {
				this.getAddress(point.longitude, point.latitude);
			},
			
			getAddress: function(longitude, latitude) {
				this.center.longitude = longitude;
				this.center.latitude = latitude;
				
				this.covers[0].longitude = longitude;
				this.covers[0].latitude = latitude;
				
				this.mapSearch.reverseGeocode({
					'point': {
						'longitude': longitude,
						'latitude': latitude
					}
				}, result => {
						if (result.type = 'success') {
							this.covers[0].title = result.address;
						}
				});
			},
			
			toLocation: function() {
				this.scale = 16;
				uni.getLocation({
					success: result => {
						this.getAddress(result.longitude, result.latitude);
						this.$nextTick(() => {
							this.map.moveToLocation();
						});
					}
				})
			},
			
			bigger: function() {
				this.map.getScale({
					success: result => {
						let scale =  Math.trunc(result.scale + 1);
						if (scale <= 18) {
							this.scale = scale;
						}
					}
				});
			},
			
			lower: function() {
				this.map.getScale({
					success: result => {
						let scale =  Math.trunc(result.scale - 1);
						if (scale >= 5) {
							this.scale = scale;
						}
					}
				});
			},
			
			confirm: function() {
				uni.$emit('addrChooseComp', {
					'type': this.type,
					'address': this.covers[0].title,
					'longitude': this.covers[0].longitude,
					'latitude': this.covers[0].latitude,
				});
				uni.navigateBack({
					
				});
			}
		},
		mounted: function(){
		},
		onReady: function() {
			this.map = uni.createMapContext('locationMap', this);
			this.$nextTick(() => {
				this.toLocation();
			});
			
			// #ifdef APP-PLUS || APP-PLUS-NVUE
			this.map.$getAppMap().onclick = this.mapTap;
			// #endif
		},
		onLoad:function(option){
			this.type = option.type;
		}
	}
</script>

<style>
	
</style>
