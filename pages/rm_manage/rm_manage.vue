<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				原材料管理
			</block>
			<block slot="right">
				<button 
					@tap="createRMInfo" 
					class="cu-btn cuIcon-roundadd lg round text-white" 
					style="background-color: rgba(255,255,255,0);"
				></button>
			</block>
		</cu-custom>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			/**
			 * @description 创建原材料信息
			 */
			createRMInfo: function() {
				
			}
		}
	}
</script>

<style>

</style>
