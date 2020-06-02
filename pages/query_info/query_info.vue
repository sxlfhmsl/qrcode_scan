<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				信息查询
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-qrcode" style="background-color: rgba(255,255,255,0);"></text>
			</block>
		</cu-custom>
		<!-- <view style="text-align: center; margin-top: 30vh;">
			<view class="basis-sm bg-grey padding-sm radius">
				<button
					class="cu-btn bg-olive lg shadow cuIcon-qrcode"
					style="width: 100vw; height: 100vw; font-size: 80vw;"
				></button>
			</view>
		</view> -->
		<view>
			<view class="flex padding justify-center">
			</view>
			<view class="flex padding justify-center">
			</view>
			<view class="flex padding justify-center">
			</view>
			
			
			<view class="flex padding justify-center cu-form-group margin-top">
				<view class="title">编号:</view>
				<input class="uni-input" placeholder="请输入编号" name="input" v-model="itemCode" @confirm="jumpDetails('code', itemCode)"></input>
			</view>
			<view class="flex padding justify-center" style="margin-top: 10vh;">
				<button
					class="cu-btn bg-white lg"
					style="
						width: 40vw; 
						height: 40vw; 
						font-size: 22vw;
						background-image: url(../../static/scancode.png);
						background-size: 40vw 40vw;
					"
					@tap="qrcodeScan"
				></button>
			</view>
			
			<view class="text-center font-title-simkai-nocolor" style="font-size: 40rpx; color: #1296db">扫一扫</view>
		</view>
	</view>
</template>

<script>
	import Url from "@/pages/components/network/request/url";
	
	export default {
		data() {
			return {
				itemCode: '',
			}
		},
		methods: {
			/**
			 * @description 扫描开始
			 * @param {Object} e
			 */
			qrcodeScan: function(e) {
				uni.scanCode({
				    onlyFromCamera: true,
					scanType: ['qrCode'],
				    success: res => {
				        // console.log('条码类型：' + res.scanType);
				        // console.log('条码内容：' + res.result);
						if (res.result.indexOf(Url.resBaseUrl) != -1) {
							let buf = res.result.split('/');
							this.itemCode = (buf[buf.length - 1] == ''? buf[buf.length - 2]: buf[buf.length - 1]);
							this.jumpDetails('id', this.itemCode);
						}
				    }
				});
			},
			/**
			 * @description 跳转至详情页
			 * @param {Object} itemType 种类支持 code id
			 * @param {Object} itemCode 实际的值
			 */
			jumpDetails: function(itemType, itemCode) {
				uni.navigateTo({
					url: '/pages/query_info/prodect_details?itemType=' + itemType + '&itemCode=' + itemCode
				});
				this.itemCode = '';
			}
		}
	}
</script>

<style>

</style>
