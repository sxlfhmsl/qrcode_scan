<template>
	<view>
		<!-- content pages -->
		<worktable v-show="PageCur == 'worktable'"></worktable>
		<personal v-show="PageCur == 'personal'"></personal>
		
		<!-- foot bar -->
		<view class="cu-bar tabbar shadow foot" style="background-color: #f2f2f2;">
			<view class="font-title-simhei-nocolor" :class="PageCur == 'worktable'? 'action text-blue': 'action text-gray'" @click="NavChange" data-cur="worktable">
				<view class="cuIcon-homefill"></view>
				工作台
			</view>
			<view class="action text-gray add-action font-title-simhei-nocolor">
				<button class="cu-btn cuIcon-camerafill bg-blue shadow" @click="ScanQrCode"></button>
				扫描
			</view>
			<view class="font-title-simhei-nocolor" :class="PageCur == 'personal'? 'action text-blue': 'action text-gray'" @click="NavChange" data-cur="personal">
				<view class="cuIcon-peoplefill"></view>
				我的
			</view>
		</view>
		
		<view class="cu-modal" :class="updateModelShow? 'show': ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请更新</view>
				</view>
				<view class="padding-xl">
					软件版本升级，请更新
				</view>
				
				<!-- 进度条 -->
				<view class="padding">
					<view class="cu-progress round active striped">
						<view class="bg-green" :style="'width: ' + downloadFileProgress + '%;'">{{downloadFileProgress}}%</view>
					</view>
				</view>
				
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="quit">退出</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="update">更新</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Url from "@/pages/components/network/request/url";
import SystemRequest from "@/pages/components/network/request/system"
	
export default {
	data() {
		return {
			PageCur: 'worktable',
			systemRequest: new SystemRequest(),
			updateModelShow: false,
			updateFileUrl: '',
			downloadFileProgress: 0,
			updateClicked: false,
		};
	},
	methods: {
		quit: function(e) {
			// #ifdef APP-PLUS || APP-PLUS-NVUE
			plus.runtime.quit();
			// #endif
		},
		update: function(e) {
			if (this.updateClicked) {
				uni.showToast({
					title: '请勿多次点击更新',
				});
				return;
			}
			this.updateClicked = true;
			// #ifdef APP-PLUS || APP-PLUS-NVUE
			if (this.updateFileUrl != null && this.updateFileUrl != undefined && this.updateFileUrl != '') {
				const downloadTask = uni.downloadFile({
					url: this.updateFileUrl,
					success: tempFilePath => {
						this.updateClicked = false;
						if (tempFilePath.statusCode == 200) {
							plus.runtime.install(tempFilePath.tempFilePath, {}, function(){
								
							}, function() {
								plus.runtime.quit();
							});
						}
						else {
							plus.runtime.quit();
						}
					}
				});
				
				// 进度条
				downloadTask.onProgressUpdate(res => {
				    this.downloadFileProgress = res.progress;
				});
			}
			else {
				plus.runtime.quit();
			}
			// #endif
		},
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
		},
		ScanQrCode: function(e) {
			// scan qrcode
			uni.scanCode({
			    // onlyFromCamera: true,
				scanType: ['qrCode'],
			    success: res => {
			        // console.log('条码类型：' + res.scanType);
			        // console.log('条码内容：' + res.result);
					if (res.result.indexOf(Url.resBaseUrl) != -1) {
						let buf = res.result.split('/');
						let code = (buf[buf.length - 1] == ''? buf[buf.length - 2]: buf[buf.length - 1]);
						uni.navigateTo({
							url: '/pages/query_info/prodect_details?itemType=id&itemCode=' + code
						});
					}
			    }
			});
		}
	},
	mounted:function(){
		// #ifdef APP-PLUS || APP-PLUS-NVUE
		if (plus.runtime.appid != "HBuilder") {
			this.systemRequest.appCurrentVersion( result => {
				if (result != null && result != undefined) {
					let version = plus.runtime.version + ' ' + plus.runtime.versionCode;
					if (result.version != version) {
						// 开始下载并更新
						this.updateFileUrl = result.url;
						this.updateModelShow = true;
					}
				}
				else {
					this.updateModelShow = true;
				}
			});
		}
		// #endif
	}
};
</script>

<style>
	
</style>
