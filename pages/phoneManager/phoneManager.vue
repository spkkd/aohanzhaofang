<template>
	<view class="u-wrap">
		<view class="u-search-box">
			<view class="u-search-inner">
				<u-field
				 label-width="0"
			     v-model="searchKeyWord"
			     :placeholder="phonePlaceHolderContent"
				 maxlength="20"
				>
				 <u-button
				  style="position: relative; left: 11px; font-size: 15px;"
				  size="medium" 
				  shape="circle"
				  slot="right" type="success" @click="searchPhone">搜索</u-button>
				</u-field>
			</view>
		</view>
		<view class="u-menu-wrap">
		 <scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
			<view v-for="(item,index) in phoneList" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
			 :data-current="index" @tap.stop="swichMenu(index)">
				<text class="u-line-1">{{item.name}}</text>
			</view>
		 </scroll-view>
		 <block  v-for="(item,index) in phoneList" :key="index">
			<scroll-view scroll-y class="right-box" v-if="current==index">
					 <view class="page-view">
							 <block v-for="(item,index1) in item.phoneData" :key="index1">
									<view class="class-item">
										<view class="item-container">
											<view class="phoneList-box" style="display: flex; ">
												<view class="phoneList-box-left" style="
												padding-top: 2px;
												display: flex; 
												flex-direction: column;">
													<view style="font-size: 15px; font-weight: bold;">{{item.phoneDesc}}</view>
													<view style="display: flex;margin-top: 4px;">
														<u-icon name="phone" size="40" color="#909399"></u-icon>
														<text class="u-icon-name">{{item.phoneNumber}}</text>
													</view>
												</view>
												<view class="phoneList-box-right" style="display: flex; padding-left: 2px; position: absolute; right:13px; ">
													<view style="display: flex; align-items: center;">	
													      <view @click="likePhone(item)">
															  <u-icon name="heart" :size="40" color="#dd3c27" v-if="!item.currentUserIsLike"></u-icon>
															  <u-icon name="heart-fill" color="#ff0000" :size="40" v-if="item.currentUserIsLike"></u-icon>
														  </view>
														<text>{{item.phoneLike}}</text>
													</view>
													<view>
														<u-button type="error" 
														@click="callPhone(item)"
														style="background-color: red; color: aliceblue; position: relative;left: 7px;" >打电话</u-button>
													</view>
												</view>
											</view>
										</view>
								</view>
						 </block>
					</view> 
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script>
import classifyData from "@/common/classify.data.js";
import config from "../../common/config";
	export default {
		data() {
			return {
				phoneList:[], //电话数据
				phoneCount:0, //收录号码数量
				phonePlaceHolderContent:"", //电话搜索框内容
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				searchKeyWord:'' //电话号码
			}
		},
		computed: {
			
		},
		onLoad(){
			//校验token令牌信息
			 this.validLoginToken();
			//加载电话信息数据
			 this.getPhoneList(this.searchKeyWord);
		},
		methods: {
			//用户登录时校验token
			validLoginToken(){
				let lifeData = uni.getStorageSync('lifeData');
				let token = lifeData.vuex_token
				if (token!=null || token!="") {
					//校验当前token是否合法
					this.$u.api.checkTokenIsExpireApi({
						token:token
					}).then(result=>{
						 if(result.data){
							 return uni.reLaunch({
							     url: '../login/login',
							 });
						 }
					});
				}else{
					return uni.reLaunch({
					    url: '../login/login',
					});
				}
			},
			//搜索电话信息
			searchPhone(){
				let queryWord = this.searchKeyWord;
				this.getPhoneList(queryWord);
			},
			//打电话
			callPhone(data){
				let phoneNumber=data.phoneNumber;
				let phoneId=data.id;
				if(phoneNumber==null || phoneNumber==""){
					this.$mytip.failToast("未获取到当前用户手机号码!");
					return;
				}
				uni.makePhoneCall({
					phoneNumber: phoneNumber,
					success: () => {
						//记录当前用户通话记录
						this.savephoneLog(phoneId);
					},
					fail() {
						this.$mytip.failToast("拨打失败,请稍后再试!");
					}
				});
			},
			// 点赞
			likePhone(data){
				let url = config.baseUrl+'/app/phoneInfo/likePhone';
				let likeStateParam = data.currentUserIsLike == true ? "1" : "0";
				let tipMsg =  data.currentUserIsLike == true ? "已取消点赞" : "点赞成功";
				this.$u.get(url,{
					phoneId: data.id,
					likeState:likeStateParam
				}).then((obj)=>{
					let respCode = obj.code;
					if(respCode==200){
						this.$mytip.toast(tipMsg);
						this.getPhoneList(this.searchKeyWord);
					}
				});
			},
			//保存通话记录
			savephoneLog(id){
				const url = config.baseUrl+'/app/phoneInfo/savaPhoneLog';
				this.$u.get(url,{
					phoneId: id
				}).then((obj)=>{
					let respCode = obj.code;
					if(respCode!=200){
						this.$mytip.failToast("拨打失败,请稍后再试!");
					}
				});
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
		   /* 加载电话信息数据 */
			getPhoneList(param){
				 this.$mytip.tipLoading("数据加载中").then((obj)=>{
					console.log("加载成功") 
				 }); 
				const url = config.baseUrl+'/app/phoneInfo/list';
				this.$u.get(url, {
				    orderByColumn: 'like_count',
				    isAsc: 'desc',
					concatName:param
				}).then((obj) => {
					this.$mytip.hideLoading();
				    let data = obj.rows;
					let dataCount = obj.total;
					this.phonePlaceHolderContent="输入联系人(已收录"+dataCount+"个号码";
					this.phoneCount = dataCount;
					this.phoneList=data;
				});
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(index == this.current) return ;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		padding: 1rpx 2rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
		padding-top: 9px;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
