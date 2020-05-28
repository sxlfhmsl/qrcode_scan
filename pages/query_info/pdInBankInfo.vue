<template>
	<view>
		<tableNoEditEgA :rowsAfterTitle="rowsAfterTitle" :rawData="rawData"></tableNoEditEgA>
	</view>
</template>

<script>
	import tableNoEditEgA from "@/pages/components/tableNoEditEgA";
	import TableEgAElem from "@/pages/components/tableEgAElem";
	import Url from "@/pages/components/network/request/url";
	
	export default {
		name: 'pdInBankInfo',
		props: {
			itemData: {
				required: true
			}
		},
		watch: {
			itemData: {
				handler: function (val, oldVal) {
					if (val !== null && val !== undefined) {
						this.flushData(val);
					}
				}
			}
		},
		components: {
			tableNoEditEgA
		},
		data() {
			return {
				rowsAfterTitle: [],
				rawData: {}
			}
		},
		methods: {
			// createData: function() {
			// 	this.rowsAfterTitle.push(new TableEgAElem('入库时间', '', '25%', '75%', '#dad8d8', 'white'));
			// 	this.rowsAfterTitle.push(new TableEgAElem('负责人', '', '25%', '75%', '#dad8d8', 'white'));
			// 	this.rowsAfterTitle.push(new TableEgAElem('合格证编号', '', '25%', '75%', '#dad8d8', 'white'));
			// 	this.rowsAfterTitle.push(new TableEgAElem('合格证照片', '', '25%', '75%', '#dad8d8', 'white'));
			// }
			flushData: function(data) {
				if (data !== null && data !== undefined) {
					this.rowsAfterTitle.push(new TableEgAElem('入库时间', data.enterDate, '25%', '75%', '#dad8d8', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('负责人', data.leaderName, '25%', '75%', '#dad8d8', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('合格证编号', data.certificateCode, '25%', '75%', '#dad8d8', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('合格证照片', Url.resBaseUrl + data.certificateAtt, '25%', '75%', '#dad8d8', 'white', 'image'));
					this.rawData = data;
				}
			}
		},
		mounted: function() {
			if (this.itemData !== null && this.itemData !== undefined) {
				this.flushData(this.itemData);
			}
		}
	}
</script>

<style>
	.col-auto-line {
		word-wrap:break-word;
		word-break:normal;
	}
	* {
		font-size: 25rpx !important;
	}
</style>
