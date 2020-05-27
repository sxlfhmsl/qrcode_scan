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
				<input class="uni-input" placeholder="请输入编号" name="input" :value="itemCode" @confirm="jumpDetails"></input>
			</view>
			<view class="flex padding justify-center">
				<button
					class="cu-btn bg-olive lg shadow cuIcon-qrcode"
					style="width: 40vw; height: 40vw; font-size: 22vw;"
					@tap="qrcodeScan"
				></button>
			</view>
		</view>
	</view>
</template>

<script>
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
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						this.itemCode = res.result;
						this.jumpDetails();
				    }
				});
			},
			/**
			 * @description 跳转至详情页
			 */
			jumpDetails: function() {
				uni.navigateTo({
					url: '/pages/query_info/prodect_details?title=钢管0001&itemCode=' + this.itemCode
				});
				this.itemCode = '';
			}
		}
	}
</script>

<style>

</style>
