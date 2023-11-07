<template>
	<view>
		<view class="u-content">
			<u-parse :html="content"
			:autosetTitle="true"
			:show-with-animation="true"
			:selectable="true"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		onLoad(option) {
			this.getServiceItemList();
		},
		methods:{
			/* 获取服务条目相关数据 */
			 getServiceItemList(){
				let params={type:"隐私协议"}; 
				this.content="";
				this.$u.api.getServiceItemApi(params)
				.then(res=>{
					let resData=res.data;
					if(res.code==200){
					   this.content = resData.content;
					}		
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
</style>
<style lang="scss" scoped>
	.u-content{
		margin:0 10rpx;
		padding: 24rpx;
		font-size: 34rpx;
		color: $u-main-color;
		line-height: 1.8;
		white-space: pre-wrap !important;
	}
</style>

