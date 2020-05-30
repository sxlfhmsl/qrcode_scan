<template>
	<view>
		<!-- 标题 -->
		<view class="flex margin-left-sm margin-right-sm">
			<view 
				class="padding-sm col-auto-line text-white soild margin-top-sm"
				style="width: 100%;flex: auto; background-color: #5c9ed6"
			>
				{{viewData.title}}
			</view>
		</view>
		
		<!-- 下部 -->
		<view
			class="flex margin-left-sm margin-right-sm solid-left solid-bottom solid-top"
			v-for="(item, index) in this.viewData.itemData"
			:key="index"
		>
			<!-- 标题 -->
			<view 
				class="padding-sm col-auto-line text-white text-center solid-right"
				style="flex: auto; width: 25%; background-color: #dad8d8"
			>
				{{item.title}}
			</view>
			
			<!-- 内容 -->
			<view
				class="padding-sm col-auto-line bg-white solid-right"
				style="flex: auto; width: 75%; background-color: white"
			>
				<input v-if="item.type == 'text'" v-model="item.value" :id="item.id" @change="inputChange(item.id, item.value)" style="height: 100%; width: 100%;"/>
				<image v-if="item.type == 'image'" mode="widthFix" :src="item.value" @tap="pictureChoose(item.id)" :id="item.id"></image>
				<picker v-if="item.type == 'date'" mode="date" @change="dateChange($event)" :id="item.id" style="height: 100%; width: 100%;">
					<input v-model="item.value" disabled="true" style="height: 100%; width: 100%;"/>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	import SystemRequest from "@/pages/components/network/request/system";
	import Url from "@/pages/components/network/request/url";
	
	export default {
		name: 'standardEditTable',
		props: {
			'itemData': {
				//结构[{id: '', value: '', title: '', type: 'image or text'}]
				'required': true,
			},
			'title': {
				'required': true,
				default: 'kkkk'
			},
			'picInt': {
				'required': true,
			}
		},
		watch: {
			itemData: {
				handler: function(val, oldval){
					this.viewData.itemData = val;
				}
			},
			title: {
				handler: function(val, oldval){
					this.viewData.title = val;
				}
			}
		},
		data() {
			return {
				'viewData': {
					itemData: [],
					'title': ''
				},
				'systemRequest': new SystemRequest()
			}
		},
		methods: {
			pictureChoose: function(id) {
				uni.chooseImage({
				    count: 1,
				    success: res => {
						this.systemRequest.attUpload(this.picInt, res.tempFilePaths[0], result => {
							this.applyChange(id, result.att);
							this.viewData.itemData.forEach(item => {
								if (item.id == id) {
									item.value = Url.resBaseUrl + result.att;
								}
							});
						})
				    }
				});
			},
			inputChange: function(id, value) {
				this.applyChange(id, value);
			},
			dateChange: function(e) {
				let value = e.detail.value;
				this.viewData.itemData.forEach(item => {
					if (item.id == e.currentTarget.id) {
						item.value = value; 
					}
				});
				this.applyChange(e.currentTarget.id, e.detail.value);
			},
			applyChange: function(id, value) {
				console.log(id, value);
			}
		},
		mounted: function(){
			this.viewData.itemData = this.itemData;
			this.viewData.title = this.title;
		}
	}
</script>

<style>
	* {
		font-size: 25rpx;
	}
</style>
