<template>
	<view class="content" style="margin-top: 50%">
		<view class="header">
			<image src="/static/logo.png"></image>
		</view>
		
		<view v-if="showLogin" class="list">
			<view class="list-call">
				<text>用户名:</text>
				<input class="biaoti" v-model="username" type="text" maxlength="11" placeholder="输入用户名" :value="username"/>
			</view>
			<view class="list-call">
				<text>密&nbsp;&nbsp;&nbsp;&nbsp;码:</text>
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="输入密码" password="true" :value="password"/>
			</view>
			
		</view>
		
		<button v-if="showLogin" class="margin cu-btn bg-blue round lg shadow"style="width: 300rpx;" @tap="login">登录</button>
	</view>
</template>

<script>
	import UserRequest from "@/pages/components/network/request/user";
	export default {
		data() {
			return {
				username: '',
				password: '',
				showLogin: false,
				userRequset: new UserRequest()
			}
		},
		onLoad() {

		},
		methods: {
			login: function(e) {
				this.userRequset.login(this.username, this.password, (data) => {
					uni.setStorage({
						key: 'username',
						data: this.username
					});
					
					uni.setStorage({
						key: 'password',
						data: this.password
					});
					
					uni.redirectTo({
						url: '/pages/main/main'
					});
				});
			},
		},
		mounted:function(){
			
			uni.getStorage({
				key: 'username',
				success: (res) => {
					this.username = res.data;
				}
			});
			
			uni.getStorage({
				key: 'password',
				success: (res) => {
					this.password = res.data;
				}
			});
			
			let token = uni.getStorageSync('token');
			if (token == undefined || token == null || token == '') {
				this.showLogin = true;
			}
			else {
				uni.redirectTo({
					url: '/pages/main/main'
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.content {
			display: flex;
			flex-direction: column;
			justify-content:center;
	}
	.header {
		width:161upx;
		height:161upx;
		background:rgba(63,205,235,1);
		box-shadow:0upx 12upx 13upx 0upx rgba(63,205,235,0.47);
		border-radius:50%;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161upx;
		height:161upx;
		border-radius:50%;
	}
	
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}
	.list-call{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230,230,230,1);
	}
	.list-call .img{
		width: 60upx;
		height: 60upx;
	}
	.list-call .biaoti{
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}
	.xieyi{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}
	.xieyi text{
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>
