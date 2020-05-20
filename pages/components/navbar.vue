<template>
	<cu-custom bgColor="bg-gradual-blue" :isBack="isBack">
		<block slot="content">
			{{this.barTitle}}
		</block>
		<block slot="right" v-if="buttons.length > 0">
			<button class="cu-btn cuIcon-settingsfill lg round text-white" style="background-color: rgba(255,255,255,0);"></button>
			<button class="cu-btn alicon-icon-poweroff lg round text-white" style="background-color: rgba(255,255,255,0);"></button>
		</block>
	</cu-custom>
</template>

<script>
	export default {
		props:['barTitle', 'isBack', 'buttons'],
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
