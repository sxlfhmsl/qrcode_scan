<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{title}}
			</block>
		</cu-custom>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				itemCode: ''
			}
		},
		methods: {
			
		},
		onLoad:function(option){
			this.title = (option.title? option.title: this.title);
			this.itemCode = (option.itemCode? option.itemCode: this.itemCode);
		}
	}
</script>

<style>

</style>
