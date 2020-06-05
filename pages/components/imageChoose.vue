<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{title}}
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-pic" style="background-color: rgba(255,255,255,0);"></text>
			</block>
		</cu-custom>
	</view>
</template>

<script>
	import SystemRequest from "@/pages/components/network/request/system";
	
	export default {
		data() {
			return {
				title: '',
				type: null,
				systemRequest: new SystemRequest(),
			}
		},
		methods: {
			
		},
		onLoad: function(option) {
			this.title = option.title;
			this.type = option.type;
			
			if (this.type != null && this.type != undefined) {
				this.systemRequest.attList(this.type, result => {
					console.log(result);
				});
			}
		}
	}
</script>

<style>

</style>
