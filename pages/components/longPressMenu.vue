<!-- 长按微信菜单，空置此方案暂不使用 -->

<template>
	<view class="shade" v-show="showShade" @tap="hidePop" ref="mainView">
		<view class="pop" :style="popStyle" :class="{'show':showPop}">
			<view @tap="pickerMenu('details')">详情</view>
			<view v-for="(item, index) in extendBtns" :key="index" @tap="pickerMenu(item.type)" :data-index="index">{{item.title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'longPressMenu',
		props: {
			position: {
				required: true,
				default: '',
			},
			targetId: null,
			extendBtns: {
				required: true,
			}
		},
		watch: {
			position: {
				handler: function(val) {
					if (val) {
						if (val != '') {
							this.showMenu(val);
						}
					}
				}
			}
		},
		data() {
			return {
				showShade: false,
				showPop: false,
				winSize: {},
				popStyle: ''
			}
		},
		methods: {
			hidePop: function() {
				this.showPop = false;
				setTimeout(() => {
					this.showShade = false;
				}, 250);
			},
			showMenu: function(style) {
				// console.log(event)
				// let [touches, style] = [event.touches[0], ""];
				
				// /* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
				// if (touches.clientY > (this.winSize.height / 2)) {
				// 	style = `bottom:${this.winSize.height-touches.clientY}px;`;
				// } else {
				// 	style = `top:${touches.clientY}px;`;
				// }
				// if (touches.clientX > (this.winSize.witdh / 2)) {
				// 	style += `right:${this.winSize.witdh-touches.clientX}px`;
				// } else {
				// 	style += `left:${touches.clientX}px`;
				// }
				
				
				this.popStyle = style;
				this.showShade = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPop = true;
					}, 10);
				});
			},
			pickerMenu: function(btnType) {
				console.log({'btnType': btnType, 'productId': targetId})
				// this.$emit('productTap', );
			}
		},
		mounted: function(){
			uni.getSystemInfo({
				success: (res) => {
					this.winSize = {
						"witdh": res.windowWidth,
						"height": res.windowHeight
					}
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		-webkit-touch-callout: none;
	
		.pop {
			position: fixed;
			z-index: 101;
			width: 200upx;
			box-sizing: border-box;
			font-size: 28upx;
			text-align: left;
			color: #333;
			background-color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			line-height: 80upx;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);
	
			&.show {
				transform: scale(1, 1);
			}
	
			&>view {
				padding: 0 20upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;
	
				&:active {
					background-color: #f3f3f3;
				}
			}
		}
	}
</style>
