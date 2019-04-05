<template>
    <div>
			<!-- 路由留坑 -->
	        <transition name="router" mode="out-in">
			  <router-view></router-view>
	        </transition>
			<!-- 公共底部内容 -->
        <nav class="mui-bar mui-bar-tab">
        	<router-link class="mui-tab-item" :to="{name:'home'}">
        	    <span class="icomoon_font icomoon_font_home"></span>
        	    <span class="mui-tab-label">首页</span>
        	</router-link>
        	<router-link class="mui-tab-item" :to="{name:'member'}">
        	    <span class="icomoon_font icomoon_font_category"></span>
        	    <span class="mui-tab-label">分类</span>
        	</router-link>
        	<router-link class="mui-tab-item" :to="{name:'shopcart'}">
        	    <span class="icomoon_font icomoon_font_active"><span class="mui-badge"></span></span>
        	    <span class="mui-tab-label">活动</span>
        	</router-link>
        	<router-link class="mui-tab-item" :to="{name:'search'}">
        	    <span class="icomoon_font icomoon_font_cart"></span>
        	    <span class="mui-tab-label">购物车</span>
        	</router-link>
        	<router-link class="mui-tab-item" :to="{name:'search'}">
        	    <span class="icomoon_font icomoon_font_personal"></span>
        	    <span class="mui-tab-label">个人中心</span>
        	</router-link>
    	</nav>
	        
    </div>
</template>
<script>
    // export default {

    // }
</script>
<style>
/*过渡动画*/
.router-enter-active, .router-leave-active{
    transition:opacity 0.5s;/*opacity 作于的动画属性  过渡时间*/
}
.router-enter, .router-leave-to{
    opacity: 0;/*某一时该状态*/
}
</style>