<template>
	<view>
		<!-- 标题 -->
		<view class="flex margin-left-sm margin-right-sm font-title-simkai-nocolor">
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
				class="padding-sm col-auto-line text-white text-center solid-right font-title-simhei"
				style="flex: auto; width: 25%; background-color: #dad8d8"
			>
				{{item.title}}
			</view>
			
			<!-- 内容 -->
			<view
				class="padding-sm col-auto-line bg-white solid-right font-content-simsun"
				style="flex: auto; width: 75%; background-color: white"
			>
				<input v-if="item.type == 'text'" v-model="item.value" :id="item.id" @change="inputChange(item.id, item.value)" style="height: 100%; width: 100%;"/>
				<image 
					v-if="item.type == 'image'"
					mode="widthFix"
					:src="showPictureObj[item.id]? Url.resBaseUrl + showPictureObj[item.id]: ''"
					@tap="pictureChooseList(picInt, item.title, item.id)"
					:id="item.id"
				></image>
				<picker v-if="item.type == 'date'" :value="item.value" mode="date" @change="dateChange($event)" :id="item.id" style="height: 100%; width: 100%;">
					<input v-model="item.value" disabled="true" style="height: 100%; width: 100%;"/>
				</picker>
				<picker v-if="item.type == 'worker'" @change="workerPickerChange($event, item.id)" range-key="label" :value="workerIndex" :range="workersLocal" style="height: 100%; width: 100%;" :id="item.id">
					<view class="picker">
						{{workerIndex == null? '': workers[workerIndex].workerName + '-' + workers[workerIndex].dictName}}
					</view>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	import SystemRequest from "@/pages/components/network/request/system";
	import ProductRequest from "@/pages/components/network/request/product";
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
			},
			'workers': {
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
				'systemRequest': new SystemRequest(),
				'workerIndex': null,
				'Url': Url,
				workersLocal: [],
				pictureEventName: '',
				showPictureObj: {}
			}
		},
		methods: {
			pictureChangeResponse: function(picInfo) {
				if (this.pictureEventName == picInfo.id) {
					this.applyChange(picInfo.id, picInfo.att);
				}
				this.$set(this.showPictureObj, picInfo.id, picInfo.att);
				uni.$off(this.pictureEventName, this.pictureChangeResponse);
				this.pictureEventName = '';
			},
			pictureChooseList: function(type, title, id) {
				this.pictureEventName = id;
				uni.$on(this.pictureEventName, this.pictureChangeResponse);
				uni.navigateTo({
					'url': '/pages/components/imageChoose?type=' + type + '&title=' + title + '&id=' + this.pictureEventName
				});
			},
			pictureChoose: function(id, srcValue) {
				uni.chooseImage({
				    count: 1,
				    success: res => {
						this.systemRequest.attUpload(this.picInt, res.tempFilePaths[0], result => {
							this.applyChange(id, result.att);
							this.viewData.itemData.forEach(item => {
								if (item.id == id) {
									item.value = result.att;
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
				this.$emit('itemChange', {'id': id, 'value': value});
			},
			workerPickerChange: function(e, id) {
				this.workerIndex = e.detail.value;
				this.applyChange(id, this.workers[this.workerIndex].id);
			},
		},
		mounted: function(){
			this.viewData.itemData = this.itemData;
			this.viewData.title = this.title;
			
			this.$nextTick(() => {
				this.viewData.itemData.forEach(item => {
					if (item.type == 'image') {
						this.$set(this.showPictureObj, item.id, item.value);
					}
					
					if (item.type == 'worker') {
						this.workers.forEach((wItem, wIndex) => {
							if (wItem.id == item.value) {
								this.workerIndex = wIndex;
							}
						});
					}
				});
				
				this.workers.forEach((item, index) => {
					this.workersLocal.push(item);
					this.workersLocal[index].label = item.workerName + '-' + item.dictName;
				});
			});
		},
		destroyed: function() {
			uni.$off(this.pictureEventName, this.pictureChangeResponse);
		}
	}
</script>

<style>
	* {
		font-size: 25rpx;
	}
</style>
