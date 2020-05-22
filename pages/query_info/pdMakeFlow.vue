<template>
	<scroll-view class="bg-white padding-sm">
		<pdMakeFlowItem v-for="(flowItem, index) in flowItems" :key="index" :flowItem="flowItem"></pdMakeFlowItem>
	</scroll-view>
</template>

<script>
	import pdMakeFlowItem from '@/pages/query_info/pdMakeFlowItem';
	
	export default {
		name: 'pdMakeFlow',
		components: {
			pdMakeFlowItem
		},
		data() {
			return {
				flowItems: [{}, {}, {}, {}, {}]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
