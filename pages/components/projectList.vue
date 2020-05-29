<template>
	<view class="cu-list menu">
		<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item, index) in itemData" :key="index"
		 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
			<view class="content margin-top margin-bottom">
				<view class="text-black margin-bottom-sm">
					<text class="margin-right-sm">{{item.categoryName}}</text>
					<text class="margin-left-sm text-sm">{{item.name}}</text>
				</view>
				<view class="text-gray text-sm margin-top-sm">
					时间：{{item.createDate}}  
				</view>
			</view>
			<view class="action margin-top margin-bottom">
				<view class="text-blue text-right margin-bottom-sm"><text class="text-white cuIcon cuIcon-full"></text>{{item.deptName}}</view>
				<view class="text-blue text-right margin-top-sm"><text class="text-white cuIcon cuIcon-full"></text>{{item.place}}</view>
			</view>
			<view class="move">
				<view class="bg-blue" @tap="btnTap('details', item.id)">详情</view>
				<view 
					v-for="(btnItem, index) in btnExtends" 
					:key="index" 
					:style="'background-color:' + btnItem.color"
					@tap="btnTap(btnItem.type, item.id)"
				>{{btnItem.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'projectList',
		props: {
			itemData: {
				required: true,
			},
			btnExtends: {
				required: true,
			}
		},
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null
			}
		},
		methods: {
			// ListTouch触摸开始
			ListTouchStart: function(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove: function(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd: function(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			
			btnTap: function(btnType, projectId) {
				if (btnType === 'details') {
					uni.navigateTo({
						url: '/pages/query_info/prodect_details?itemType=id&itemCode=' + projectId
					});
				}
				else {
					this.$emit('project_tap', {'btnType': btnType, 'projectId': projectId});
				}
			}
			
		},
		mounted:function(){
			
		}
	}
</script>

<style>

</style>
