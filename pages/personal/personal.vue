<template name="personal">
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">
				个人信息
			</block>
			<block slot="right">
				<button 
					@click="ToSettingPage" 
					class="cu-btn cuIcon-settingsfill lg round text-white" 
					style="background-color: rgba(255,255,255,0);"
				></button>
				<button 
					@click="Logout" 
					class="cu-btn alicon-icon-poweroff lg round text-white" 
					style="background-color: rgba(255,255,255,0);"
				></button>
			</block>
		</cu-custom>
		
		<view class="grid margin col-2" style="background-color: #f2f2f2; border-radius: 50rpx; margin-top: 70rpx;">
			<view class="padding">
				<view class="font-title-simhei dept" style="margin-bottom: 150rpx;">
					{{userInfo.dept.simpleName? userInfo.dept.simpleName: ''}}
				</view>
				<view class="cu-avatar text-black" style="font-size: 100rpx; width: auto; height: auto; background-color: #f2f2f2;">
					<view
						class="cu-tag badge"
						style="font-size: 30rpx;background-color: rgba(0,0,0,0);top: 10upx;right: -30upx;"
						:style="'color:' + (userInfo.user.sex == 'M'? 'rgb(217, 217, 25)': 'pink')"
					>
						<text class="cuIcon" :class="userInfo.user.sex == 'M'? 'alicon-icon-sex-nan': 'alicon-icon-sex-nv'"></text>
					</view>
					{{userInfo.user.name? userInfo.user.name: ''}}
				</view>
			</view>
			<view class="padding text-right">
				<image style="width: 250rpx; height: 250rpx; border-radius: 25rpx;" src="../../static/user.jpg" mode="scaleToFill"></image>
			</view>
		</view>
		
		<view class="cu-list menu sm-border card-menu margin-top" style="background-color: #f2f2f2;">
			<view class="cu-item arrow" style="background-color: #f2f2f2;">
				<view class="content">
					<text class="text-black font-title-simhei-nocolor">账户:</text>
					<text class="text-black font-content-simsun">{{userInfo.user.account? userInfo.user.account: ''}}</text>
				</view>
			</view>
			
			<view class="cu-item arrow" style="background-color: #f2f2f2;">
				<view class="content">
					<text class="text-black font-title-simhei-nocolor">创建:</text>
					<text class="text-black font-content-simsun">{{userInfo.user.createTime? userInfo.user.createTime: ''}}</text>
				</view>
			</view>
			
			<view class="cu-item arrow" style="background-color: #f2f2f2;">
				<view class="content">
					<text class="text-black font-title-simhei-nocolor">生日:</text>
					<text class="text-black font-content-simsun">{{userInfo.user.birthday? userInfo.user.birthday: ''}}</text>
				</view>
			</view>
			
			<view class="cu-item arrow" style="background-color: #f2f2f2;">
				<view class="content">
					<text class="text-black font-title-simhei-nocolor">邮箱:</text>
					<text class="text-black font-content-simsun">{{userInfo.user.email? userInfo.user.email: ''}}</text>
				</view>
			</view>
			
			<view class="cu-item arrow" style="background-color: #f2f2f2;">
				<view class="content">
					<text class="text-black font-title-simhei-nocolor">手机:</text>
					<text class="text-black font-content-simsun">{{userInfo.user.phone? userInfo.user.phone: ''}}</text>
				</view>
			</view>
			
			<view class="cu-item arrow" style="background-color: #f2f2f2;">
				<view class="content">
					<text class="text-black font-title-simhei-nocolor">部门:</text>
					<text class="text-black font-content-simsun">{{userInfo.dept.fullName? userInfo.dept.fullName: ''}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import UserRequest from "@/pages/components/network/request/user"
	
	export default {
		name: 'personal',
		data() {
			return {
				userRequest: new UserRequest(),
				userInfo: {
					'dept': '',
					'user': ''
				},
			}
		},
		methods: {
			ToSettingPage: function(e) {
				uni.navigateTo({
					'url': '/pages/personal/setting'
				})
			},
			Logout: function(e) {
				uni.removeStorageSync('token');
				uni.redirectTo({
					url: '/pages/index/index'
				});
			}
		},
		mounted: function(){
			this.userRequest.info(data => {
				this.userInfo = data;
			});
		}
	}
</script>

<style>
	.dept:after {
		content: "\e6a3";
		font-family: 'cuIcon';
		height: 30upx;
		border-bottom-width: 0px;
		line-height: 30upx;
		top: 0;
		bottom: 0;
		margin: auto;
		color: gray;
	}
</style>
