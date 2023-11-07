<template>
	<view v-if="isShow">
		<view class="centre">
			<image :src="empty" mode="" class="houseImage"></image>
			<view class="explain">
				很遗憾未找到,您还没有发布
				<view class="tips" @click="goHome()">再逛逛</view>
			</view>
			<view class="btn" @click="goToPubHousePage()">现在去发布</view>
		</view>
	</view>
</template>

<script>
	export default{
	  data() {
		  return{
		    empty:'/static/empty/default.png',
	     }
	  },
	  // 配置组件接收参数
	  props:{
		  //是否显示在当前页面上
		  isShow:{
		    type: Boolean,
		    default: false
		  },
		  // 发布类型
		  pubType:{
			type:Number,
			default:1
		  }
	  },
	  methods:{
		  //返回首页功能
		  goHome(){
		  	uni.switchTab({
		  		url: '/pages/index/index'
		  	});
		  },
		  // 跳转到房源发布页面
		  goToPubHousePage(){
			  this.$u.route({
			  	url:'/pages/detail/publishHouse',
			  	params: {
			  	    type:this.pubType
			  	}
			  });
		  }
	  }
	}
</script>

<style lang="scss" scoped>
	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;
		.houseImage {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}
		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background-image:linear-gradient(to left,#2979ff,rgba(#2979ff,0.6));
		}
	}
</style>