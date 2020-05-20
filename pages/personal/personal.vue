<template name="personal">
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">
				个人信息
			</block>
			<block slot="right">
				<button @click="ToSettingPage" class="cu-btn cuIcon-settingsfill lg round text-white" style="background-color: rgba(255,255,255,0);"></button>
				<button class="cu-btn alicon-icon-poweroff lg round text-white" style="background-color: rgba(255,255,255,0);"></button>
			</block>
		</cu-custom>
	</view>
</template>

<script>
	export default {
		name: "personal",
		data() {
			return {
			}
		},
		methods: {
			ToSettingPage: function(e) {
				uni.navigateTo({
					'url': '/pages/personal/setting'
				})
			},
			Logout: function(e) {
				
			}
		}
	}
</script>

<style>

</style>
