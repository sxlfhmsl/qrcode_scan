<!-- 不允许编辑的table -->
<template>
	<view :class="topAttr.classContent" :style="topAttr.styleContent">
		<view class="flex" :class="rowAttr.classContent" :style="rowAttr.styleContent" v-for="(rowAttr,index) in rowsAttr" :key="index">
			<view style="flex: auto;" 
				:class="commonAttr.classContent + ' ' + colAttr.classContent" 
				:style="commonAttr.styleContent + ';' + colAttr.styleContent"
				v-for="(colAttr,colIndex) in rowAttr.cols" 
				:key="index + '-' + colIndex"
			>{{colAttr.content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			topAttr: {
				// 顶部元素 必须包含两类内容 {classContent:class内容,styleContent:自定义样式内容}
				required: true
			},
			commonAttr: {
				// 列表公用内容 必须包含两类内容 {classContent:class内容,styleContent:自定义样式内容}
				required: true
			},
			rowsAttr: {
				// 列表公用内容 必须包含两类内容 [{classContent:class内容,styleContent:自定义样式内容, cols:[{classContent:class内容,styleContent:自定义样式内容,content: 显示的内容}]}]
				required: true
			},
		},
		methods: {

		}
	}
</script>

<style>

</style>
