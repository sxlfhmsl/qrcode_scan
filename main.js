import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue';
Vue.component('cu-custom',cuCustom);

import worktable from './pages/worktable/worktable.vue';
Vue.component('worktable',worktable);

import personal from './pages/personal/personal.vue';
Vue.component('personal',personal);

// 定义全局变量
Vue.prototype.softwareInfo = {
	'defaultTitle': '管道信息化管理系统',                         // 系统默认标题
	'version': 'debug_version',                                 // 版本号
	'owner': 'LuSheng'                                          ,// 版权所属
	'showMap': false
};

// #ifdef APP-PLUS || APP-PLUS-NVUE
if (plus.runtime.appid != "HBuilder") {
	Vue.prototype.softwareInfo.version = plus.runtime.version + ' ' + plus.runtime.versionCode;
	Vue.prototype.softwareInfo.owner = '成都朝为科技';
}
// #endif

// 确定产品列表多功能展现方式
Vue.prototype.productShowType = 'longpress'                     // 长按
Vue.prototype.productShowType = 'slide'                         // 滑动
Vue.prototype.productShowType = 'button'                         // 滑动

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
