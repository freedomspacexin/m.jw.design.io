<template>
	<div>
		<!-- home也轮播图 -->
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(img,index) in imgs" :key="index"><a :href="img.url"><img :src="img.imgurl"></a></mt-swipe-item>
        </mt-swipe>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				imgs:[],
				split:'',
			}
		},
		props:['url'],
		created(){
			var urls = this.url.split('?');
			switch(urls[0]){
				case 'home_banner.json':
					this.$ajax('home_banner.json')
						.then(res=>{
							this.imgs = res.data;
					})
					.catch(err=>{
						console.log(err);
					});
				case 'goodsDetail.json':
					var id = urls[1].split('=')[1];
					this.$ajax.get('goodsDetail.json')
						.then(res=>{
							this.imgs = res.data.find(function(item){
								return item.id === parseInt(id);
							}).img_urls;
						})
						.catch(err=>{

						});
				break;
			}
		}
	}
</script>
<style scoped>
/*轮播图样式*/
.mint-swipe{
    height:160px; 
}
.mint-swipe img {
	width: 100%;
}
</style>