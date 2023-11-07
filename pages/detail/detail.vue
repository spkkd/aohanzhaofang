<template>
	<view v-if="isShowEmpty">
		<view class="centre">
			<image :src="empty" mode=""></image>
			<view class="explain">
				当前房源已下架
				<view class="tips">可以再去逛逛</view>
			</view>
			<view class="btn" @click="goHome">首页</view>
		</view>
	</view>
    <view class="u-margin-left-20 u-margin-right-20" v-else>
		<u-navbar :is-back="true" :title="navTitle" :border-bottom="false"
		back-text="返回" :custom-back="goHome" ></u-navbar>
        <view>
            <u-swiper :list="swiperlist" :height="750" mode="number" effect3d effect3d-previous-margin="20" :interval="5000" @click="clickImg"></u-swiper>
        </view>
		<view class="item u-margin-top-5">
			<view class="item-title">{{ room.type ==1 ? "出售":"出租"}}  | {{ room.villageName }} | {{room.houseNum + room.houseHall + room.toiletNum}} | {{room.decoration}}  | {{room.floor}} | {{room.roomArea}}㎡</view>
			<view class="item-price">¥{{ room.type==1 ? room.price+"万" : room.ratePrice+"/年" }}</view>
		</view>
		<view class="item" style="display: flex;align-items: center;flex-wrap: wrap;">
			 <view v-for="(item,index) in tagList" :key="index"
			  style="background-color: #f5f5f5;color: #606266;margin-right: 15rpx;
			  margin-top: 15rpx;padding: 0 10rpx;height: 60rpx;line-height: 60rpx;">
				{{item.title}}
			</view>
		</view>
		<u-row gutter="10">
			<u-col span="3">
				<view class="demo-layout">
					<span style="font-weight:bold;">性质:</span>{{room.houseTypeName == null ? "" : room.houseTypeName}} 
				</view>
			</u-col>
			<!-- 只有是房屋出售时才显示建成年份 -->
			<u-col span="4" v-if="room.type==1">
				<view class="demo-layout">
					<span style="font-weight:bold;">建成年份:</span>{{room.houseBuildYear==null ? "" : room.houseBuildYear+'年' }} 
				</view>
			</u-col>
			<u-col span="2">
				<view class="demo-layout">
					<span style="font-weight:bold;">朝向:</span>{{room.direction==null  ? "" : room.direction}} 
				</view>
			</u-col>
			<u-col span="3">
				<view class="demo-layout">
					<span style="font-weight:bold;">楼梯类型:</span>{{room.stepType==null ? "":room.stepType}} 
				</view>
			</u-col>
		</u-row>
		
		<view v-if="room.introduce">
			<u-gap height="10" bg-color="#f8f8f8"></u-gap>
			<u-card title="房源描述" :border="false" :head-border-bottom="false" padding="0" title-size="38">
				<view class="u-padding-top-45 item" slot="body">
					{{room.introduce}}
				</view>
			</u-card>
		</view>
		<u-gap height="1" bg-color="#f8f8f8"></u-gap>
		<view style="position: relative;">
			<u-card title="小区介绍" :border="false" :head-border-bottom="false" padding="0" title-size="38">
				<view class="u-padding-top-45" slot="body">
					<view class="u-flex" style="justify-content: space-between;">
						<view class="item">
						    <view>所属学区：{{room.learnAreaName}}</view>
							<view>建筑年份：{{village.year!=null ? village.year+'年':""}}</view>
							<view>建筑类型：{{village.type!=null ? village.type:""}}</view>
						</view>
						<image :src="village.imageUrl" mode="widthFix" 
						style="width: 250rpx;height: 200rpx;"></image> 
					</view>
				</view>
			</u-card>
		</view>
		<u-gap height="1" bg-color="#f8f8f8"></u-gap>
		<view style="position: relative;">
			<u-card :title="room.villageName" :border="false" :head-border-bottom="false" padding="0" title-size="38">
				<view class="u-padding-top-45" slot="body">
					<map :latitude="latitude" :longitude="longitude">
						<cover-view style='width:100%;height:100%;' @click="clickMap"></cover-view>
					</map>
					<view 
					 @click="clickMap"
					style="margin-top: 30rpx;padding-left: 10rpx;height:80rpx;
					line-height: 80rpx;background-color: #fdfdfd;border-radius: 6px;
					display: flex;justify-content: space-between;
					padding-right: 10rpx;color: #909399;
					">
						<view>
							<u-icon name="map" color="#909399" size="30"></u-icon>
							<text style="margin-left: 8rpx;">
								房源直线距离约 {{distance}} km
							</text>
						</view>
						<view>
							<text style="margin-right: 3rpx;">
								导航
							</text>
							<u-icon name="arrow-right" color="#909399" size="30"></u-icon>
						</view>
					</view>
					<view style="margin-left: 10rpx;font-size: 12px;
							color: #ff0000">
						*数据仅供参考，请以实际看房为准
					</view>
				</view>
			</u-card>
		</view>
		<u-gap height="3" bg-color="#f8f8f8"></u-gap>
		<view style="position: relative;">
			<u-card title="服务介绍" :border="false" :head-border-bottom="false" padding="0" title-size="38">
				<view class="u-padding-top-35" slot="body">
					<u-cell-group :border="false">
						<u-cell-item icon="level" title="品质-两类品质保障，入住更无忧" :arrow="false" hover-class="none" :border-bottom="false"></u-cell-item>
						<u-cell-item icon="level" title="品质-两类品质保障，服务有保障" :arrow="false" hover-class="none" :border-bottom="false"></u-cell-item>
					</u-cell-group>
				</view>
			</u-card>
		</view>
		<!-- <u-gap height="1" bg-color="#f8f8f8"></u-gap> 
		<view style="position: relative;">
			<u-card title="评价" :border="false" :head-border-bottom="false" padding="0" title-size="38">				
				<view class="u-padding-top-35" slot="body" >					
					<u-cell-group :border="false" style="text-indent:2em;">
						{{evaluate}} 						
						<u-cell-item  :arrow="false" hover-class="none" :border-bottom="false">
							{{credt}} 
						</u-cell-item>
					</u-cell-group>
					<text @click="moreEval" v-if="havem" style="text-align: center;font-size: 12px;color: seagreen;padding-left: 40%;">全部评价（{{evalsize}}）</text>
					<text v-if="evalsize==0" style="text-align: center;font-size: 12px;padding-left: 45%;">暂无评论数据</text>
				</view>					
			</u-card>
		</view>		 -->
		<!-- <u-gap height="3" bg-color="#f8f8f8"></u-gap> -->
		 <u-gap height="3" bg-color="#f8f8f8"></u-gap> 
		<view style="position: relative;padding-bottom: 83px;" v-if="room.agentName!=null && room.agentName!=''">
			<u-card title="经纪人" :border="false" :head-border-bottom="false" padding="0" title-size="38">
				<view class="u-padding-top-45" slot="body">
					<view class="u-flex">
					    <view class="u-m-r-20">
					        <u-avatar :src="room.agentAvatar" size="80"></u-avatar>
					    </view>
					    <view class="u-flex-1">
							<view class="u-font-16 u-p-b-40">{{room.agentName}}</view>
					         <view class="u-font-12 u-p-b-10">{{room.agentPhone}}</view>
					    </view>
					</view>
					<view class="arrow-right" @click="clickItem">
						<view class="phone">
							<u-icon name="phone" class="u-p-l-10" color="#d1d1d1"
							size="40"
							></u-icon>
						</view>
					</view>
				</view>
			</u-card>
		</view>		
		<view class="navigation">
			<view class="left">
				<button type="default" open-type="contact"  class="clearBtn"
				style="font-size: 14px;color: #6a6a6a;">
					<view class="item">
						<u-icon name="server-fill" :size="40"></u-icon>
						<view class="text">客服</view>	
					</view>
				</button>
				<view class="item" @click="heartHouse">
					<u-icon name="heart" :size="40" v-if="!room.heart"></u-icon>
					<u-icon name="heart-fill" color="#ff9900" :size="20" v-if="room.heart"></u-icon>
					<view class="text">收藏</view>
				</view>
				<button type="default" open-type="share"  class="clearBtn"
				style="font-size: 14px;color: #6a6a6a;">
					<view class="item">
						<u-icon name="zhuanfa" :size="20"></u-icon>
						<view class="text">分享</view>
					</view> 
				</button>
			</view>
			<view class="right" @click="clickItem">
				<view class="btn">联系房主</view>
			</view>
		</view>
    </view>
</template>

<script>
	import config from "@/common/config.js" // 全局配置文件
    export default {
        data() {
            return {
				room: {
					villageName:'',
					houseNum:'',
					houseHall:'',
					toiletNum:'',
					roomType:'',
					direction:'',
					price:'',
					introduce:'',
					heart:false,
					// 
					ratePrice:0,
					// 学区名称
					learnAreaName:"",
					// 学区id
					learnVillageId:"",
					direction:"",
					typeName:"",
					houseType:"",
					// 性质
					houseTypeName:"",
					// 厅室
					houseCode:"",
					// 详细地址
					detailAddress:"",
					type: 0,
					typeName: "",
					stepType: "",
					// 楼号
					buildNum:"",
					// 单元
					roomUnit:"",
					// 室号
					houseNo:"",
					//状态
					state: 0,
					//状态名称
					stateName: "",
					// 房屋面积
					roomArea:"",
					// 经济人
					agentName:"",
					// 经济人联系电话
					agentPhone:"",
					// 经济人头像
					agentAvatar:"",
					//纬度
					longitude:"",
					//经度
					latitude:"",
					//楼层
					floor:"",
					//业主电话
					owerPhone:""
				},
				//判断如果当前数据为空则显示此处信息
				isShowEmpty:false,
				/* 小区名称 */
				village: {
					year:'',
					type:'',
					green:'',
					// 房源小区资源路径
					imageUrl:""
				},
                swiperlist: [],
                tagList: [],
				//评价列表
				evaluList:[],
				user: {},
				longitude: 120.14,
				latitude: 30.35, 
				distance:0,
				//自己的评论
				ownevalu:'',
				houseId:null,
				evalsize:0,
				havem:false,
				evaluate:'',
				credt:'',
				// 导航栏标题
				navTitle:"",
				//数据为空时显示
				empty:'/static/empty/default.png',
            }
        },
		onLoad: function (option) {
			let houseId = option.houseId //上个页面传递的参数。
			this.houseId =houseId
			// 渲染当前房源信息
			this.findHouseById(houseId);
			//监听弹出微信分享菜单时出现的项目
			uni.showShareMenu({
				withShareTicket:false,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
			     menus:["shareAppMessage","shareTimeline"]
			});
			
			
			// // 在页面中定义激励视频广告
			// let videoAd = null
			// // 在页面onLoad回调事件中创建激励视频广告实例
			// if (wx.createRewardedVideoAd) {
			//   videoAd = wx.createRewardedVideoAd({
			// 	adUnitId: 'adunit-8cd5789a01a51891'
			//   })
			//   videoAd.onLoad(() => {
			// 	  console.log('激励视频 成功加载广告')
			//   })
			//   videoAd.onError((err) => {})
			//   videoAd.onClose((res) => {
			// 	  console.log('激励视频 成功关闭广告')
			//   })
			// }
			// // 用户触发广告后，显示激励视频广告
			// if (videoAd) {
			//   videoAd.show().catch(() => {
			// 	// 失败重试
			// 	videoAd.load()
			// 	  .then(() => videoAd.show())
			// 	  .catch(err => {
			// 		console.log('激励视频 广告显示失败')
			// 	  })
			//   })
			// }
		},
		onUnload() {
			//离开页面时将当前分享页面中的东西置空
			this.$u.mpShare = {
				title:'',
				imageUrl:''
			}
		},
		//发送给朋友
		/* onShareAppMessage(res) {
			console.log("触发的是发送给朋友");
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			let houseId = this.houseId;
			if (houseId) {
				return {
					title: '欢迎使用xxx商城',
					type: 0,
					path: '/pages/index/index?id=' + houseId,
					summary: "",
					imageUrl: "https://58d.oss-cn-hangzhou.aliyuncs.com/goods/ttg_1596073788000.png"
				}
			}
		}, */
		//分享到朋友圈
		/* onShareTimeline(res) {
			console.log("触发的是分享到朋友圈");
		    let houseId = this.houseId;
			if (houseId) {
				return {
					title: '欢迎使用xxx商城',
					type: 0,
					query: 'id=' + houseId,
					summary: "",
					imageUrl: "https://58d.oss-cn-hangzhou.aliyuncs.com/goods/ttg_1596073788000.png"
				}
			}
		}, */
        methods: {
            //返回首页功能
			goHome(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
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
			/* 收藏房源功能 */
			heartHouse(){
			 	this.validLoginToken();
				this.$u.api.saveHouseHeartApi({
					heart: this.room.heart,
					houseId: this.room.id
				}).then(result => {
					this.room.heart = !this.room.heart
					this.$mytip.toast(result.msg)
				});
			},
        //返回
		goHome(){
			uni.navigateBack({
				delta: 1
			});
		},
      //联系经纪人
      clickItem() {
		let agentPhone = this.room.agentPhone; 
		if(this.$u.test.isEmpty(agentPhone)){
			let params={type:"联系电话"};
			  this.$u.api.getServiceItemApi(params)
			  .then(res=>{
				let resData=res.data;
				 if(res.code==200){
				  uni.makePhoneCall({
					phoneNumber: resData.title,
				  });
				}
			  });
		  return;	  
		}
		uni.makePhoneCall({
			 phoneNumber: agentPhone,
		});
      },
	  //联系房主
	  connectHouseOwner(){
		  let houseOwnerPhone = this.room.owerPhone;
		  uni.makePhoneCall({
		  	 phoneNumber: houseOwnerPhone
		  });
	  },
			//查看房源详情
			findHouseById(houseId){
				if(this.$u.test.isEmpty(houseId)){
					this.isShowEmpty=true;
					return;
				}
				let url = "api/houseApi/findHouseById";
				this.$u.get(url, {
					id: houseId
				}).then(result => {
					let room = result.data;
					if(room==null){
						this.isShowEmpty=true;
						return;
					}
					if(room.type==1){
					   this.navTitle="房源出售";
					}else{
					   this.navTitle="房源出租";
					}
					this.village = room.village ;
				    this.village.imageUrl = config.staticUrl+this.village.imageUrl;
					if(this.$u.test.isEmpty(room.houseNum)){
						room.houseNum = ''
					}
					if(this.$u.test.isEmpty(room.houseHall)){
						room.houseHall = ''
					}
					if(this.$u.test.isEmpty(room.toiletNum)){
						room.toiletNum = ''
					}
					if( this.$u.test.isEmpty(room.faceUrl) ){
						item.faceUrl=config.defaultHouseImageUrl;
					}
					if(this.$u.test.isEmpty(room.floor)){
						room.floor = ''
					}else{
						room.floor = room.floor;
					}
					if(room.imageList!=null && room.imageList.length>0){
						//填充房源轮播图
						this.swiperlist = room.imageList.map(val=>{
								let imgUrl = config.baseUrl+val.imagePath;
								return {
									title: val.imageName,
									image: imgUrl
								}
						 });
					}else{
						this.swiperlist=[];
						let defaultImageObj ={title: "default.jpg",image: config.defaultHouseImageUrl};
						this.swiperlist.push(defaultImageObj);
					}
				//	console.log(this.swiperlist);
					//房源标签
					this.tagList = room.featureList.map(val=>{
						return {
							title: val.feature,
						}
					});
					//房源经济人
					 if(room.agentAvatar!=null && !room.agentAvatar.includes(config.staticUrl)){
						room.agentAvatar = config.baseUrl+room.agentAvatar
					 } 
					//this.user = room.user
					this.room = room;
					// 判断是否收藏
					this.selectHouseHeart(houseId);
					//查询房源评价
				//	this.selectHouseEvals(houseId);
					
					// 分享自定义标题与图片
					let shareTitle = ''
					let shareVaillageInfo = this.room.villageName + " " + this.room.houseNum + this.room.houseHall + this.room.toiletNum + " " + this.room.decoration;
					if(room.type ==1){
						shareTitle = "出售"+" "+shareVaillageInfo+" ¥" + this.room.price+"万"
					}else{
						shareTitle = "出租"+" "+shareVaillageInfo+ " ¥" + this.room.ratePrice+"/年"
					}
					this.$u.mpShare = {
						title:  shareTitle, 
						//imageUrl:config.staticUrl+this.room.faceUrl
						imageUrl:this.room.faceUrl
					}
					
					// 添加到浏览历史
					let houseHistory = uni.getStorageSync('houseHistory')
					if(!houseHistory){
						houseHistory = []
					}
					// 如果超过20个了，则删除最后一个
					if(houseHistory.length >= 20){
						houseHistory.pop()
					}
					houseHistory.push(this.room)
					// 数据去重
					const keyArr = [];
					houseHistory.forEach((element,index) => {
						keyArr.push(element.code);  // 通过code来判断
					});
					const newArr = [];
					const newKey = new Set(keyArr);  // key去重
					newKey.forEach(item =>{
						const index = keyArr.findIndex(item2 => item2 === item);
						newArr.push(houseHistory[index]);
					})
					uni.setStorageSync('houseHistory',newArr)
					// 经纬度
					this.longitude = room.longitude;
					this.latitude = room.latitude;
					
					// 计算地铁距离
					let lat1 = 39.909
					let lng1 = 116.39742
					let lat2 = this.latitude
					let lng2 = this.longitude
					uni.getLocation({
						type: 'gcj02',
						success: res=> {
							lat1 = res.latitude
							lng1 = res.longitude
							this.distance = this.getDistance(lat1,lng1 ,lat2 , lng2);
						}
					});
				});
			},
			selectHouseHeart(houseId){
				// 判断是否有userId
				let lifeData = uni.getStorageSync('lifeData');
				let vuex_user = lifeData.vuex_user
				if(vuex_user){
					let url = "api/houseApi/selectHouseHeart";
					this.$u.get(url, {
						houseId: houseId,
						userId: vuex_user.user.userId,
					}).then(result => {
						this.room.heart = result.data
					});
				}
			},			
			selectHouseEvals(houseId){
				let url = "api/houseApi/selectHouseEvals";
				this.$u.get(url, {
					houseId: houseId,
					pageNum: 1,
					pageSize: 1
				}).then(result => {	
					console.log(result)
					console.log(result.rows[0])
					if(result.total >0){
						this.evaluate = result.rows[0].evaluate;
						if(this.evaluate.length>30){
							this.evaluate = this.evaluate .substring(0, 30)+"......";
						}
						this.credt=result.rows[0].createTime;
						this.havem=true;
						this.evalsize = result.total;
					}					
				});
			},
			moreEval() {
				this.$u.route({
					url: '/pages/detail/evalList',
					params: {
						houseId: this.houseId
					}
				})
			},
			clickImg(index){
				let imgArr = this.swiperlist.map(val=>{
					return val.image
				})
				console.log(imgArr);
				 // 预览图片
				uni.previewImage({
					current: index,
					urls: imgArr
				});
			},
			clickMap(e){
				uni.openLocation({
					longitude: Number(this.longitude),
					latitude: Number(this.latitude),
					name: this.room.villageName,
					address: this.room.address
				})
			},
			getDistance(lat1, lng1, lat2, lng2) {
			    lat1 = lat1 || 0;
				lng1 = lng1 || 0;
				lat2 = lat2 || 0;
				lng2 = lng2 || 0;
				var rad1 = lat1 * Math.PI / 180.0;
				var rad2 = lat2 * Math.PI / 180.0;
				var a = rad1 - rad2;
				var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				var r = 6378137;
				var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));
				return (distance/1000).toFixed(2);
			}
        }
    }
</script>

<style>
    /* page不能写带scope的style标签中，否则无效 */
    page {
        background-color: rgb(255, 255, 255);
    }
</style>


<style lang="scss" scoped>
	.demo-layout{
		white-space: nowrap;
	}
	map {
		width: 100%;
		height: 350rpx;
	}
	.bg-purple {
			background: #d3dce6;
		}
	.bg-purple-light {
		background: #e5e9f2;
	}
    //判空区域样式
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

	
	.item{
		padding: 25rpx;
		line-height: 80rpx;
		margin-top: -30rpx;
	}
	
    .item-title {
        font-size: 42rpx;
        color: $u-main-color;
        font-weight: bold;
    }

    .item-price {
        font-weight: normal;
        font-size: 45rpx;
        color: $u-type-error;
    }

    .item-desc {
        font-weight: normal;
        font-size: 36rpx;
        color: $u-tips-color;
    }
	
	.arrow-right{
		position: absolute;
		top: 80rpx;
		right: 28rpx;
		font-weight: normal;
		font-size: 28rpx;
		color: $u-tips-color;
		.phone{
			width: 90rpx;height:90rpx;
			border-radius: 100%;
			box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.1);
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	
	.wayClass{
		color: #606266;
		padding: 30rpx;
		line-height: 50rpx;
	}

	.clearBtn{
		margin:0;
		padding: 0;
		line-height: 1;
		background-color: #FFFFFF;
	}
	
	.clearBtn::after{
	    position: unset !important;
	    border: unset;
	}
	
	.navigation {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0rpx 15rpx;
		background-color: #ffffff;
		box-shadow:0 -1px 1px 0 rgba(0, 0, 0, 0.05);
		z-index: 9999;
		.left {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 38rpx;
			font-size: 14px;
			color: #6a6a6a;
			.item {
				display: flex;
				.text{
					margin-left: 4rpx;
				}
			}
		}
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			.btn {
				line-height: 66rpx;
				margin-left: 30rpx;
				padding: 5rpx 50rpx;
				color: #ffffff;
				border-radius:  36rpx;
				background-color: #2979ff;
			}
		}
	}
</style>
