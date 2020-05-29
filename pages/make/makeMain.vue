<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{title}}
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-punch" style="background-color: rgba(255,255,255,0);"></text>
			</block>
		</cu-custom>
		
		<view style="height: 320rpx;">
			<view style="
				position: fixed;
				width: 100%;
				z-index: 1024;
			" :style="'top:' + CustomBar + 'px'">
				<pdBaseInfo></pdBaseInfo>
				<scroll-view scroll-x class="bg-white nav solid-top solid-bottom text-center" scroll-with-animation :scroll-left="TabPage_tabInfo.scrollLeft">
					<view 
						class="cu-item"
						:class="item.id==TabPage_tabInfo.TabCur?'text-blue cur':''" v-for="(item,index) in TabPage_tabInfo.TabItems"
						:key="index"
						@tap="TabPage_tabSelect"
						:data-id="item.id"
						:scroll-left="TabPage_tabInfo.scrollLeft"
					>
						{{item.title}}
					</view>
				</scroll-view>
			</view>
		</view>
		
		
		<scroll-view v-show="TabPage_tabInfo.TabCur==='pdSource'">
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin" @tap="toNextStep">下一步</button>
			</view>
		</scroll-view>
		
		<scroll-view v-show="TabPage_tabInfo.TabCur==='pdMake'">
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin" @tap="closePages">关闭</button>
				<button class="cu-btn bg-blue round lg shadow margin" @tap="saveMake">保存</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import pdBaseInfo from '@/pages/components/pdBaseInfo';
	import TabPage from "@/pages/components/custom-tab-page";
	export default {
		components: {
			pdBaseInfo
		},
		name: 'makeMain',
		extends: TabPage,
		data() {
			return {
				'title': ''
			}
		},
		methods: {
			/**
			 * @description 跳转到下一步
			 */
			toNextStep: function() {
				this.TabPage_tabInfo.TabCur = 'pdMake';
			},
			/**
			 * @description 关闭页面
			 * @param {Object} e 事件对象
			 */
			closePages: function(e) {
				uni.navigateBack({
					
				});
			},
			/**
			 * @description 保存结果
			 * @param {Object} e 事件对象
			 */
			saveMake: function(e) {
				
			}
		},
		mounted:function(){
			this.TabPage_tabInfo.TabItems = [{
				title: '原材料',
				id: 'pdSource'
			}, {
				title: '产品制作',
				id: 'pdMake'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
		}
	}
</script>

<style>

</style>
