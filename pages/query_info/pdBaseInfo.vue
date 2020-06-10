<template>
	<view>
		<tableNoEditEgA :rowsAfterTitle="rowsAfterTitle" :rawData="rawData"></tableNoEditEgA>
	</view>
</template>

<script>
	import tableNoEditEgA from "@/pages/components/tableNoEditEgA";
	import TableEgAElem from "@/pages/components/tableEgAElem";
	
	export default {
		name: 'pdBaseInfo',
		props: {
			itemData: {
				required: true,
				default: null
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
			/**
			 * @description 刷新数据
			 * @param {Object} data 数据
			 */
			flushData: function(data) {
				this.rowsAfterTitle.splice(0, this.rowsAfterTitle.length);
				if (data !== null && data !== undefined) {
					this.rowsAfterTitle.push(new TableEgAElem('管节号', data.code, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('产品类型', data.categoryName, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('制造单位', data.deptName, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('工程名称', data.projectName, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('产品规格', data.specs, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('牌号', data.brandNum, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('制作标准', data.standard, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('生产日期', data.createDate, '30%', '70%', '#f2f2f2;', 'white'));
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

</style>
