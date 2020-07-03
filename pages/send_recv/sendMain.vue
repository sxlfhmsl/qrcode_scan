<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{title}}
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-deliver" style="background-color: rgba(255,255,255,0);"></text>
			</block>
		</cu-custom>
		
		<view :style="'height: ' + frontBarHeight + 'rpx;'">
			<view 
				ref="frontBar" id="frontBar"
				style="
				position: fixed;
				width: 100%;
				z-index: 1024;
			" :style="'top:' + CustomBar + 'px'">
				<pdBaseInfo :itemData="pdBaseInfoData"></pdBaseInfo>
			</view>
		</view>
		
		<scroll-view>
			<view class="flex margin-left-sm margin-right-sm margin-top-sm solid-left solid-bottom solid-top">
				<view 
					class="font-title-simhei-nocolor padding-sm col-auto-line text-white text-center solid-right bg-gradual-blue" 
					style="flex: auto; width: 25%;"
				>
					*发货时间:
				</view>
				
				<view
					class="padding-sm col-auto-line bg-white solid-right"
					style="flex: auto; width: 75%; background-color: white"
				>
					<picker mode="date" :value="sendData.date" @change="dateChange($event)" style="height: 100%; width: 100%;">
						<input class="font-content-simsun" v-model="sendData.date" disabled="true" style="height: 100%; width: 100%;"/>
					</picker>
				</view>
			</view>
			
			<view class="flex margin-left-sm margin-right-sm solid-left solid-bottom solid-top">
				<view 
					class="font-title-simhei-nocolor padding-sm col-auto-line text-white text-center solid-right bg-gradual-blue" 
					style="flex: auto; width: 25%;"
				>
					*客户单位:
				</view>
				
				<view
					class="padding-sm col-auto-line bg-white solid-right"
					style="flex: auto; width: 75%; background-color: white"
				>
					<picker class="font-content-simsun" mode="multiSelector" range-key="name" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray" style="height: 100%; width: 100%;">
						<view class="picker font-content-simsun">
							{{multiArray[0][multiIndex[0]]? multiArray[0][multiIndex[0]].name: ' '}}
							{{multiArray[1][multiIndex[1]]? multiArray[1][multiIndex[1]].name: ' '}}
							{{multiArray[2][multiIndex[2]]? multiArray[2][multiIndex[2]].name: ' '}}
						</view>
					</picker>
				</view>
			</view>
			
			<view class="flex margin-left-sm margin-right-sm solid-left solid-bottom solid-top">
				<view 
					class="font-title-simhei-nocolor padding-sm col-auto-line text-white text-center solid-right bg-gradual-blue" 
					style="flex: auto; width: 25%;"
				>
					发货地址:
				</view>
				
				<view
					class="padding-sm col-auto-line bg-white"
					style="flex: auto; width: calc(75% - 60rpx); background-color: white"
					:style="'width: calc(75% - ' + (softwareInfo.showMap? 60: 0) + 'px)'"
				>
					<input class="font-content-simsun" v-model="sendData.sendAddr" style="height: 100%; width: 100%;"/>
				</view>
				
				<view
					v-if="softwareInfo.showMap"
					class="col-auto-line bg-white solid-right padding-bottom-sm padding-top-sm"
					style="flex: auto; width: 60rpx; background-color: white"
				>
					<button class="cu-btn sm cuIcon cuIcon-locationfill bg-blue" @tap="addressChoose('send')"></button>
				</view>
			</view>
			
			<view class="flex margin-left-sm margin-right-sm solid-left solid-bottom solid-top">
				<view 
					class="font-title-simhei-nocolor padding-sm col-auto-line text-white text-center solid-right bg-gradual-blue" 
					style="flex: auto; width: 25%;"
				>
					收货地址:
				</view>
				
				<view
					class="padding-sm col-auto-line bg-white"
					style="flex: auto; width: calc(75% - 60rpx); background-color: white"
					:style="'width: calc(75% - ' + (softwareInfo.showMap? 60: 0) + 'px)'"
				>
					<input class="font-content-simsun" v-model="sendData.recvAddr" style="height: 100%; width: 100%"/>
				</view>
				
				<view
					v-if="softwareInfo.showMap"
					class="col-auto-line bg-white solid-right padding-bottom-sm padding-top-sm"
					style="flex: auto; width: 60rpx; background-color: white"
				>
					<button class="cu-btn sm cuIcon cuIcon-locationfill bg-blue" @tap="addressChoose('recv')"></button>
				</view>
			</view>
			
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin" @tap="closePages">关闭</button>
				<button class="cu-btn bg-blue round lg shadow margin" @tap="saveRecv">保存</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import pdBaseInfo from '@/pages/components/pdBaseInfo';
	import ProductRequest from "@/pages/components/network/request/product";
	
	export default {
		components: {
			pdBaseInfo
		},
		data() {
			return {
				'productId': null,
				'productRequest': new ProductRequest(),                     // 产品网络请求对象
				'rawProductData': null,                                     // 原始数据
				'pdBaseInfoData': {},                                       // 基础页面显示数据
				'title': '',                                                // 标题
				'sendData': {                                               // 发货数据
					'date': '',                                             // 日期
					'unit': {                                               // 客户单位
						'id': 0,
						'name': '顶级'
					},
					'sendAddr': '',                                         // 发货地址
					'recvAddr': '',                                         // 收货地址
				},
				multiArray: [
					[],
					[],
					[]
				],
				multiIndex: [0, 0, 0],
				multiIndexBuffer: [0, 0, 0],
				deptFormatData: {},
				'frontBarHeight': 400,
			}
		},
		methods: {
			addressChooseComp: function(result) {
				if (result.type == 'send') {
					this.sendData.sendAddr = result.address;
				}
				else if (result.type == 'recv') {
					this.sendData.recvAddr = result.address;
				}
			},
			addressChoose: function(type) {
				uni.navigateTo({
					url: '/pages/components/addressChoose?type=' + type
				});
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value;
				let buffer = this.multiArray[2][this.multiIndex[2]];
				if (buffer == undefined || buffer == null || buffer.id == -1) {
					buffer = this.multiArray[1][this.multiIndex[1]];
					if (buffer != undefined && buffer != null && buffer.id != -1) {
						this.sendData.unit.id = buffer.id;
						this.sendData.unit.name = buffer.name;
					}
				}
				else {
					this.sendData.unit.id = buffer.id;
					this.sendData.unit.name = buffer.name;
				}
			},
			MultiColumnChange(e) {
				// data.multiIndex[e.detail.column] = e.detail.value;
				this.multiIndexBuffer[e.detail.column] = e.detail.value;
				switch(e.detail.column) {
					case 0:
						let id = this.multiArray[0][e.detail.value].id;
						let childrenSen = this.multiArray[0][this.multiIndexBuffer[0]].children;
						Object.keys(childrenSen).forEach(key => {
							this.multiArray[1].push(childrenSen[key]);
						});
					break;
					case 1:
						let idLevel2 = this.multiArray[1][e.detail.value].id;
						if (idLevel2 != -1) {
							this.multiArray[2].splice(0, this.multiArray[2].length, {'id': -1, 'name': ''});
							Object.keys(this.multiArray[1][e.detail.value].children).forEach(key => {
								this.multiArray[2].push(this.multiArray[1][e.detail.value].children[key]);
							});
							console.log(this.multiArray[2]);
						}
						else {
							this.multiArray[2].splice(0, this.multiArray[2].length);
						}
					break;
				};
			},
			/**
			 * @description 加载产品信息
			 */
			loadProductInfo: function() {
				this.productRequest.detailById(this.productId, data => {
					this.rawProductData = data;
					if (data !== null) {
						this.title = data.product.code;
						this.pdBaseInfoData = data.product;
						this.calcFlowHeight();
					}
				});
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
			 * @description 收货
			 * @param {Object} e 事件
			 */
			saveRecv: function(e) {
				if (this.productId !== null) {
					if (this.sendData.date == '') {
						uni.showToast({
							title: '请输入发货日期'
						});
						return;
					}
					else if (this.sendData.unit.id == null) {
						uni.showToast({
							title: '请输入单位'
						});
						return;
					}
					else {
						this.productRequest.delivery(this.productId, 
							this.sendData.date, undefined, this.sendData.unit.id, 
							this.sendData.unit.name, this.sendData.sendAddr, 
							this.sendData.recvAddr, result => {
								uni.showToast({
									title: '发货完成'
								});
								uni.setStorageSync('flushPage', true);
								uni.navigateBack({
									
								});
						});
					}
				}
			},
			dateChange: function(e) {
				this.sendData.date = e.detail.value;
			},
			loadDeptData: function() {
				this.productRequest.deptTree(result => {
					this.deptFormatData[0] = {'name': '顶级', 'id': 0, children: {}};
					let pids = [0, 999999999, 999999999];
					result.forEach((item, index) => {
						if (item.pId == pids[0]) {
							this.deptFormatData[pids[0]].children[item.id] = item;
							this.deptFormatData[pids[0]].children[item.id].children = {};
							pids[1] = item.id;
						}
						else if (item.pId == pids[1]) {
							this.deptFormatData[pids[0]].children[pids[1]].children[item.id] = item;
							this.deptFormatData[pids[0]].children[pids[1]].children[item.id].children = {};
							pids[2] = item.id;
						}
						else if (item.pId == pids[2]) {
							this.deptFormatData[pids[0]].children[pids[1]].children[pids[2]].children[item.id] = item;
							this.deptFormatData[pids[0]].children[pids[1]].children[pids[2]].children[item.id].children = {};
						}
						else {
							this.deptFormatData[item.id] = item;
							this.deptFormatData[item.id].children = {};
							pids[0] = item.id;
						}
					});
					
					this.multiArray[0] =[];
					let deptKeys = Object.keys(this.deptFormatData);
					deptKeys.forEach(item => {
						this.multiArray[0].push(this.deptFormatData[item]);
					});
					
					if (deptKeys.length == 1) {
						let childrenSen = this.multiArray[0][0].children;
						deptKeys = Object.keys(childrenSen);
						deptKeys.forEach(item => {
							this.multiArray[1].push(childrenSen[item]);
						});
					}
					
					// 提供一个默认值
					this.sendData.unit.name = this.multiArray[1][0];
				});
			},
			/**
			 * @description 计算tabBar高度
			 */
			calcFlowHeight: function() {//tabBarEle
				this.$nextTick(() => {
					setTimeout(() => {
						let frontBar = uni.createSelectorQuery().select("#frontBar");
						frontBar.boundingClientRect((data) => {
							if (data && data.height) {
								this.frontBarHeight = data.height * 2;
							}
						}).exec();
					}, 200);
				})
			}
		},
		onLoad: function(option) {
			this.productId = (option.productId? option.productId: this.productId);
			this.loadProductInfo();
			this.loadDeptData();
			
			uni.$on('addrChooseComp', this.addressChooseComp);
		},
		destroyed:function(){
			uni.$off('addrChooseComp', this.addressChooseComp);
		}
	}
</script>

<style>
</style>
