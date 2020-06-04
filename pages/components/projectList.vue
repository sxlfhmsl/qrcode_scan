<template>
	<view class="cu-list menu">
		<view class="cu-item margin-bottom-sm margin-top-sm shadow"
			style="background-color: #f2f2f2;"
			:class="modalName=='move-box-'+ index?'move-cur':''"
			v-for="(item, index) in itemData" :key="index"
			:id="item.createDate? item.id: item.productId" 
			@longpress="longpress($event, index, item.createDate? item.id: item.productId)"
			@touchstart="ListTouchStart($event, index)"
			@touchmove="ListTouchMove($event, index)"
			@touchend="ListTouchEnd($event, index)"
			:data-target="'move-box-' + index"
			@tap="btnTap('details', item.createDate? item.id: item.productId)"
		>
			<view class="content margin-top margin-bottom">
				<view class="text-black margin-bottom">
					<text class="margin-right-sm">{{item.categoryName}}</text>
					<text class="text-white cuIcon cuIcon-full" style="color: #f2f2f2;"></text>
					<text class="margin-left-sm text-sm">{{item.name}}</text>
				</view>
				<view class="text-gray text-sm margin-top">
					{{item.deptName}}
				</view>
			</view>
			
			<view class="action margin-top margin-bottom margin-right-sm">
				<view class="text-gray text-right margin-bottom" style="line-height: 2em;">
					<text v-if="!(item.createDate? item.createDate: item.recevieDate)" class="text-white cuIcon cuIcon-full" style="color: #f2f2f2;">
					</text>
					{{item.createDate? item.createDate: item.recevieDate}}
				</view>
				<view class="text-blue text-right margin-top" style="line-height: 2em;">
					<text v-if="!item.place" class="text-white cuIcon cuIcon-full" style="color: #f2f2f2;">
					</text>
					{{item.place}}
				</view>
			</view>
			
			<view v-if="productShowType == 'button'" class="action margin-top margin-bottom">
				<view
					class="padding-bottom-sm"
					v-for="(btnItem, btnIndex) in btnExtends"
					:key="btnIndex"
				>
					<button 
						class="cu-btn round shadow"
						:class="'bg-' + btnItem.color"
						@tap.stop="btnTap(btnItem.type, item.createDate? item.id: item.productId)"
					>
						{{btnItem.title}}
					</button>
				</view>
			</view>
			
			<view
				v-if="(productShowType == 'longpress' && btnExtends.length > 1) || productShowType == 'slide'"
				class="move"
			>
				<view class="bg-blue" @tap.stop="btnTap('details', item.createDate? item.id: item.productId)">详情</view>
				<view 
					v-if="specBtnIsTapable[index] && specBtnIsTapable[index][btnIndex]"
					v-for="(btnItem, btnIndex) in btnExtends" 
					:key="btnIndex" 
					:style="'background-color:' + btnItem.color"
					@tap.stop="btnTap(btnItem.type, item.createDate? item.id: item.productId)"
				>{{btnItem.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import PermissionRequest from '@/pages/components/network/request/permission';
	
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
		watch: {
			'itemData': {
				handler: function(val, oldVal) {
					this.checkBtnSpecial(val, this.btnExtends);
				}
			}
		},
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				specBtnIsTapable: {},
				permissionRequest: new PermissionRequest()
			}
		},
		methods: {
			// 长按跳转至高级功能
			longpress: function(event, index, itemId) {
				if (this.productShowType != 'longpress') {
					return;
				}
				if (event && index != null && itemId != null) {
					if (this.specBtnIsTapable[index] && this.btnExtends.length == 1) {
						if (this.specBtnIsTapable[index][0]) {
							this.$emit('productTap', {'btnType': this.btnExtends[0].type, 'productId': itemId});
						}
					}
				}
			},
			// ListTouch触摸开始
			ListTouchStart: function(e, index) {
				if ((this.productShowType == 'longpress' && this.btnExtends.length > 1) || this.productShowType == 'slide') {
					this.listTouchStart = e.touches[0].pageX;
				}
			},
			
			// ListTouch计算方向
			ListTouchMove: function(e) {
				if ((this.productShowType == 'longpress' && this.btnExtends.length > 1) || this.productShowType == 'slide') {
					this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
				}
			},
			
			// ListTouch计算滚动
			ListTouchEnd: function(e) {
				if ((this.productShowType == 'longpress' && this.btnExtends.length > 1) || this.productShowType == 'slide') {
					if (this.listTouchDirection == 'left') {
						this.modalName = e.currentTarget.dataset.target;
					} else {
						this.modalName = null;
					}
					this.listTouchDirection = null;
				}
			},
			
			btnTap: function(btnType, productId, event) {
				if (btnType === 'details') {
					uni.navigateTo({
						url: '/pages/query_info/prodect_details?itemType=id&itemCode=' + productId
					});
				}
				else {
					this.$emit('productTap', {'btnType': btnType, 'productId': productId});
				}
			},
			
			/**
			 * @description 检查产品是否可以点击特殊按钮
			 * @param {Object} itemData 带展示产品列表
			 * @param {Object} btns 特殊按钮权限 
			 */
			checkBtnSpecial: function(itemData, btns) {
				itemData.forEach((item, index) => {
					this.specBtnIsTapable[index] = {};
					btns.forEach((itemBtn, indexBtn) => {
						this.permissionRequest.data(itemBtn.perNum, item.createDate? item.id: item.productId, (data) => {
							this.specBtnIsTapable[index][indexBtn] = data;
						});
					});
				});
			}
			
		},
		mounted:function(){
			this.checkBtnSpecial(this.itemData, this.btnExtends);
		}
	}
</script>

<style>
	.cu-list+.cu-list {
		margin-top: 0px !important;
	}
</style>
