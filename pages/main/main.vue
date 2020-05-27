<template>
	<view>
		<!-- content pages -->
		<worktable v-show="PageCur == 'worktable'"></worktable>
		<personal v-show="PageCur == 'personal'"></personal>
		
		<!-- foot bar -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view :class="PageCur == 'worktable'? 'action text-blue': 'action text-gray'" @click="NavChange" data-cur="worktable">
				<view class="cuIcon-homefill"></view>
				工作台
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-camerafill bg-blue shadow" @click="ScanQrCode"></button>
				扫描
			</view>
			<view :class="PageCur == 'personal'? 'action text-blue': 'action text-gray'" @click="NavChange" data-cur="personal">
				<view class="cuIcon-peoplefill"></view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			PageCur: 'worktable'
		};
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
		},
		ScanQrCode: function(e) {
			// scan qrcode
			uni.scanCode({
			    onlyFromCamera: true,
				scanType: ['qrCode'],
			    success: res => {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
					uni.navigateTo({
						url: '/pages/query_info/prodect_details?title=钢管0001&itemCode=' + res.result
					});
			    }
			});
		}
	}
};
</script>

<style>
	
</style>
