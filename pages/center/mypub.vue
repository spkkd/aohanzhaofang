<template>
	<view>
		<u-navbar :is-back="true" title="我的发布" :border-bottom="false"></u-navbar>
		<view class="wrap">
			<scroll-view scroll-y style="height: 100%;width: 100%;">
				<view class="page-box">
					<view v-if="isShowEmpty">
						<view class="centre">
							<image :src="empty" mode=""></image>
							<view class="explain">
								您还没有发布房源
								<view class="tips">可以去逛逛</view>
							</view>
							<view class="btn" @click="goHome">首页</view>
						</view>
					</view>
					<view v-else
					 class="order" v-for="(item, index) in heartList" :key="index">
						<view class="top">
							<view class="left">
								<view class="store">{{ item.houseTypeName }}</view>
								<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
							</view>
						</view>
						<view class="item" @click="viewImage(item.id)">
							<view class="left"><image :src="item.faceUrl" mode="aspectFill"></image></view>
							<view class="content">
								<view class="title u-line-2">{{ item.type ==1 ? "出售":"出租"}}  | {{ item.villageName }} | {{item.houseNum + item.houseHall + item.toiletNum}} | {{item.decoration}} </view>
								<view class="price">{{ item.type==1 ? item.price +"万元" : item.ratePrice+"元/月" }}</view>
								<view class="type">
									  <view class="item-desc">{{ item.houseNum + item.houseHall + item.toiletNum }} | {{ item.roomArea }}㎡ | {{ item.houseTypeName }} </view>
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="evaluate btn" style="background-color: firebrick; color: aliceblue;" @click="deletePubHouse(item.id)">删除</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/config.js" // 全局配置文件
	export default {
		data() {
			return {
				empty:'/static/empty/default.png',
				heartList: [],
				isShowEmpty:false,
				pageNum: 1,
				pageSize: 100,
				showDeleteModel:false,
				id:""
			};
		},
		onLoad() {
			this.findHouseList();
		},
		methods: {
			/* 查询我的发布 */
			findHouseList() {
				this.heartList=[];
			    const url = '/api/houseApi/findHouseRoomList';
				let lifeData = uni.getStorageSync('lifeData');
				let vuex_user = lifeData.vuex_user
			    this.$u.get(url, {
			        state: 5,
				    publishId:vuex_user.user.userId,
			        pageNum: this.pageNum,
			        pageSize: this.pageSize,
			        orderByColumn: 'update_time,create_time',
			        isAsc: 'desc',
			    }).then((result) => {
			        const data = result.rows;
			        this.houseList = data;
					if(data.length==0){
						this.isShowEmpty=true;
						return;
					}
			        for (let i = 0; i < this.houseList.length; i++) {
			            const item = this.houseList[i];
			            if (this.$u.test.isEmpty(item.houseNum)) {
			                item.houseNum = '';
			            }
			            if (this.$u.test.isEmpty(item.houseHall)) {
			                item.houseHall = '';
			            }
			            if (this.$u.test.isEmpty(item.toiletNum)) {
			                item.toiletNum = '';
			            }
						if( this.$u.test.isEmpty(item.faceUrl) ){
							item.faceUrl=config.defaultHouseImageUrl;
						}
						this.heartList.push(item);
			        }
			    });
			},
			//删除自己发布的房源信息
			deletePubHouse(houseId){
				 this.id = "";
				 this.id = houseId;
				uni.showModal({
					title:'提示',
					content:'您确认要删除该房源信息?',
					success: res=> {
						if (res.confirm) {
							this.deleteHouse();
						}
					}
				});
			},
			//删除我的发布
			deleteHouse(){
				if(!this.id){
					this.$mytip.failToast('未获取到要删除的房源,请重试!');
					return ;
				}
				 this.$u.api.removePubHouseApi({houseId:this.id}).then(res=>{
					 if(res.code==200){
						 this.$mytip.successToast('删除成功!');
						 this.showDeleteModel=false;
						 this.findHouseList();
						 uni.$emit('findIndexHouseList');
					 }else{
						  this.$mytip.failToast('删除失败,请重试!');
					 }
				 });
			},
			//返回首页
			goHome(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			viewImage(houseId){
				this.$u.route({
					url: '/pages/detail/detail',
					params: {
						houseId: houseId
					}
				})
			}
		}
	};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		.empty{
			overflow: hidden;
			.tip{
				color: #909399  ;
			}
			.btn {
				color:#fff ;
				background-color: #2979ff;
				width:200rpx;
				padding: 15rpx 28rpx;
				border-radius: 130rpx;
				margin: 30rpx 0 0 100rpx;
			}
		}
	}
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;
		.top {
			display: flex;
			justify-content: space-between;
			.left {
				display: flex;
				align-items: center;
				.store {
					// margin: 0 10rpx;
					font-size: 32rpx;
				}
			}
			.right {
				color: #2979ff;
			}
		}
		.item {
			display: flex;
			margin: 20rpx 0 0 0;
			.left {
				margin-right: 30rpx;
				image {
					width: 150rpx;
					height: 150rpx;
					border-radius: 10rpx;
				}
			}
			.content {
				.title {
					font-weight: bold;
					font-size: 28rpx;
					line-height: 50rpx;
				}
				.price{
					margin: 10rpx 0;
					font-size: 30rpx;
				}
				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}
				.desc {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}
			}
		}
		.bottom {
			display: flex;
			margin-top: 20rpx;
			padding: 0 10rpx;
			justify-content: flex-end;
			align-items: center;
			.btn {
				margin-left: 20rpx;
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}
			.evaluate {
				color: $u-tips-color;
			}
		}
	}
	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;
		image {
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
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}

	.buttom {
		.loginType {
			font-size: 14px;
			position: fixed;
			right: 30rpx;
			bottom: 120rpx;
			width: 60px;
			height: 60px;
			padding: 4px;
			cursor: pointer;
			background: #FFF;
			text-align: center;
			line-height: 60px;
			border-radius: 100%;
			-webkit-box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.1),inset 0px -1px 0px 0px rgba(0,0,0,0.1);
			box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.1),inset 0px -1px 0px 0px rgba(0,0,0,0.1);
		}
	}
</style>
