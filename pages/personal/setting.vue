<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				设置
			</block>
		</cu-custom>
		
		<view class="cu-list menu sm-border">
			
			<!-- #ifdef APP-PLUS || APP-PLUS-NVUE -->
			<view class="cu-item arrow" @tap="cacheDialogToggle">
				<view class="content">
					<text class="cuIcon-delete text-red"></text>
					<text class="text-grey">清除缓存</text>
					<text class="text-grey custom-text-right">{{this.h5plusCacheSize}}</text>
				</view>
			</view>
			
			<!-- 对话框 -->
			<view class="cu-modal" :class="cacheClearConfirmDialog? 'show': ''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">请确认</view>
						<view class="action" @tap="cacheDialogToggle">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						是否清理缓存?
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub text-green solid-left" @tap="cacheDialogToggle">取消</view>
						<view class="action margin-0 flex-sub  solid-left" @tap="clearCache">确定</view>
					</view>
				</view>
			</view>
			<!-- #endif -->
			
			<view class="cu-item arrow" @tap="jumpSoftwareInfoPage">
				<view class="content">
					<text class="cuIcon-info text-blue"></text>
					<text class="text-grey">关于软件</text>
					<text class="text-grey custom-text-right">{{this.softwareInfo.version}}</text>
				</view>
			</view>
		</view>
		<view class="padding-xl flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="logout">退出登录</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// #ifdef APP-PLUS || APP-PLUS-NVUE
				h5plusCacheSize: '',
				cacheClearConfirmDialog: false
				// #endif
			}
		},
		methods: {
			// #ifdef APP-PLUS || APP-PLUS-NVUE
			/**
			 * @description 计算缓存大小
			 */
			calculateCacheSize: function() {
				plus.cache.calculate((size) => {
					let sizeCache = parseInt(size); 
					if (sizeCache == 0) {
						this.h5plusCacheSize = "0B";
					} else if (sizeCache < 1024) {
						this.h5plusCacheSize = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						this.h5plusCacheSize = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						this.h5plusCacheSize = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						this.h5plusCacheSize = (sizeCache / 1073741824).toFixed(2) + "GB"; 
					}
				});   
			},
			/**
			 * @description 清除缓存
			 */
			clearCache: function() {
				if (plus.os.name == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					let len = files.length;
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径
						plus.io.resolveLocalFileSystemURL(filePath, (entry) => {
							if (entry.isDirectory) {
								entry.removeRecursively((entry) => { //递归删除其下的所有文件及子目录
									uni.showToast({
										title: '缓存清理完成',
										duration: 2000 ,
									});
									this.cacheDialogToggle();
									this.calculateCacheSize(); // 重新计算缓存
								}, (e) => {
									this.cacheDialogToggle();
									console.log(e.message)
								});
							} else {
								this.cacheDialogToggle();
								entry.remove();
							}
						}, (e) => {
							this.cacheDialogToggle();
							console.log('文件路径读取失败')
						});
					}
				} 
				else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错
					plus.cache.clear(() => {
						uni.showToast({
							title: '缓存清理完成',
							duration: 2000,
						});
						this.cacheDialogToggle();
						this.calculateCacheSize();
					});
				}  
			},
			cacheDialogToggle: function(e) {
				this.cacheClearConfirmDialog = !this.cacheClearConfirmDialog;
			},
			// #endif
			jumpSoftwareInfoPage: function(e) {
				uni.navigateTo({
					'url': '/pages/personal/software_info'
				});
			},
			logout: function(e) {
				console.log("你点击退出登录按钮");
			}
		},
		mounted() {
			// #ifdef APP-PLUS || APP-PLUS-NVUE
			this.calculateCacheSize();
			// #endif
		}
	}
</script>

<style>
	.custom-text-right {
		position: absolute;
		right: 60rpx;
	}
</style>
