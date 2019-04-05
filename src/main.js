'use strict';
import Vue from 'vue';
import App from './app.vue';
//第三方组件---------- start-------------
//路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//界面组件（mint-ui）
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
//全部安装组件，实际开发要求为按需配置安装组件
Vue.use(Mint);

//http组件：axios组件
import Axios from 'axios';
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = '/server/api/';

//第三方组件---------- end-------------
//默认样式重置
import './static/css/reset.css';
import './static/css/common.css';

//自定义组件---------- start------------
import Home from './components/home/home.vue';
import topSearch from './components/topsearch/topsearch.vue';
import mySwiper from './components/common/myswiper.vue';
import categoryTitle from './components/common/categorytitle.vue';


//自定义组件---------- end------------

//Axios拦截器监听请求发送和响应作出相应的加载界面
Axios.interceptors.request.use(function(config){
    //显示图标
    Mint.Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
	return config;
});

Axios.interceptors.response.use(function(config){
	//隐藏图标
    Mint.Indicator.close();
    //获取到config中的data，进行加工
	return config;
})

/*全局自定义组件*/
Vue.component('topSearch',topSearch);
Vue.component('mySwiper',mySwiper);
Vue.component('categoryTitle',categoryTitle);


//路由规则
const routes = [
	{ path:'/', redirect:'/home' },
	{name:'home', path:'/home', component:Home},
];

//linkActiveClass 为router-link选中样式设置
let router = new VueRouter({
	linkActiveClass:'mui-active',
	routes
});

new Vue({
	el:'#app-enter',
	router:router,
	render:creater=>creater(App)
});