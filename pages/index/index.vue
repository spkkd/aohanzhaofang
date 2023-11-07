<template>
    <view class="u-p-l-10 u-p-r-10">
        <!-- 搜索 -->
        <u-navbar :isBack="false">
            <view style="display: flex;justify-content: center;align-items: center;">
                <view class="u-p-20" @click="location">
                    {{ vuex_city == '' ? '选择' : vuex_city }}
                    <u-icon name="arrow-down-fill" class="u-p-l-10" color="#515356"></u-icon>
                </view>
                <!-- #ifdef MP-WEIXIN -->
                <u-search
                    v-model="keyword" placeholder="你想住在哪儿" inputAlign="center" :showAction="false" :clearabled="true"
                    :disabled="true" style="width: 380rpx;" @click="search"
                ></u-search>
                <!-- #endif -->
                <!-- #ifndef MP-WEIXIN -->
                <u-search
                    v-model="keyword" placeholder="你想住在哪儿" inputAlign="center" :showAction="false" :clearabled="true"
                    :disabled="true" style="width: 580rpx;" @click="search"
                ></u-search>
                <!-- #endif -->
            </view>
        </u-navbar>
        <!-- 隐私政策弹窗 -->
        <u-popup
            v-model="showPrivateAgre" borderRadius="10"
            mode="center"
            length="67%"
            :mask="isShowMask"
            :maskCloseAble="isShowMaskCloseAble"
        >
            <view class="privateAgreTitle">
                <text class="privateAgreTitle-text">隐私政策授权提示</text>
            </view>
            <view class="privateAgreCotentConfirm">
                <text class="privateAgreCotent-confirm-text">
                    欢迎使用本产品! 为了更好的保护您的个人权益,在使用本产品前,请先阅读同意以下内容:
                </text>
            </view>
            <view class="privateAgreCotentContent">
                <u-parse :html="privateAgcontent"></u-parse>
            </view>
            <view class="privateAgreCotentConfirm">
                <text class="privateAgreCotent-confirm-text">如您同意以上内容,请点击同意并继续,开始使用我们的产品和服务!</text>
            </view>
            <view class="privateAgre-agreeBtnContainer">
                <button class="privateAgre-agreeBtn" size="medium" @click="agreePrivateAgre">同意并继续</button>
                <view>
                    <button class="privateAgre-disAgreeBtn" size="medium" @click="rejectPrivateAgre">不同意</button>
                </view>
            </view>
        </u-popup>
        <!-- 首页轮播 -->
        <view>
            <!-- 流量主-腾讯banner广告 -->
            <!-- <ad unit-id="adunit-fcfdcc4d7095b6b1" ad-intervals="30"></ad> -->
            <!-- 轮播图 -->
            <!-- #ifndef MP-WEIXIN -->
            <!-- <u-swiper :list="swiperList" height="350"></u-swiper> -->
            <!-- #endif -->
            <u-swiper :list="swiperList" height="350" @click="moreInfo"></u-swiper>
        </view>
        <view>
            <!-- 菜单导航栏 -->
            <view class="rowClass">
                <u-row>
                    <u-col v-for="(item, index) in navList" :key="index" span="3" textAlign="center">
                        <view class="u-padding-20" hoverClass="hoverClass" @tap="clickNav(item)">
                            <image :src="item.src" style="width: 90rpx;height: 90rpx;" mode="widthFix"></image>
                            <view class="tabName">{{ item.name }}</view>
                        </view>
                    </u-col>
                </u-row>
            </view>
            <u-gap height="10"></u-gap>
            <!-- 通知功能暂时收起 -->
            <view @click="notice">
                <u-notice-bar
                    mode="vertical" :list="noticeList" type="primary" moreIcon
                    bgColor="#fff" :duration="5000" borderRadius="150"
                ></u-notice-bar>
            </view>
            <!-- 分割条 -->
            <u-gap height="10"></u-gap>
            <u-tabs ref="tabs" :list="list" active-color="#2979ff" inactive-color="#606266" font-size="30" :current="current" @change="change"></u-tabs>
            <emptyHouseData :isShow="isShowEmpty"></emptyHouseData>
			<u-waterfall ref="uWaterfall" v-model="flowList">
                <template #left="{ leftList }">
                    <view v-for="(item, index) in leftList" :key="index" class="demo-warter">
                        <u-lazy-load
                            threshold="750" borderRadius="12" :image="item.faceUrl" :index="index"
                            @click="clickImage(item.id)"
                        ></u-lazy-load>
                        <view class="item-title">{{ item.type ==1 ? "出售":"出租"}}  | {{ item.villageName }} | {{item.houseNum + item.houseHall + item.toiletNum}} | {{item.decoration}}  </view>
                        <view class="item-price">{{ item.type==1 ? item.price +"万元" : item.ratePrice+"元/年" }}</view>
                        <view class="item-desc">{{ item.learnAreaName }} | {{ item.roomArea }}㎡ | {{ item.houseTypeName }} </view>
                    </view>
                </template>
               <template #right="{ rightList }">
                    <view v-for="(item, index) in rightList" :key="index" class="demo-warter">
                        <u-lazy-load
                            threshold="750" borderRadius="12" :image="item.faceUrl" :index="index"
                            @click="clickImage(item.id)"
                        ></u-lazy-load>
                      <view class="item-title">{{ item.type ==2 ? "出租":"出售"}}  | {{ item.villageName }} | {{item.houseNum + item.houseHall + item.toiletNum}} | {{item.decoration}}  </view>
                      <view class="item-price">{{ item.type==2? item.ratePrice+"元/年" : item.price +"万元"  }}</view>
                      <view class="item-desc">{{ item.learnAreaName }}  | {{ item.roomArea }}㎡ | {{ item.houseTypeName }} </view>
                    </view>
                </template> 
            </u-waterfall>
        </view>
		<u-modal :showTitle="false" 
		:showConfirmButton="false" 
		:showCancelButton="true"  
		title="发布房源"
		:value="showPublishModel" 
		cancelText="关闭" 
		@cancel="showPublishModel=false">
		   <view class="buttonContainer" style="display: flex; flex-direction: column;padding-left: 26%; padding: 20px;">
			   <u-button type="error" size="medium" style="margin: 8px; margin-top: 17px; margin-left: 44px;" @click="publishSelHouseInfo()">发布房屋出售信息</u-button>
			   <u-button type="primary" size="medium" style="margin: 8px; margin-top: 24px;  margin-left: 44px;"  @click="publishRateHouseInfo()">发布房屋出租信息</u-button>
		   </view>
		</u-modal>
        <!-- 加载更多的标签 -->
        <u-loadmore bgColor="rgb(240, 240, 240)" :status="loadStatus" style="height: 80rpx;line-height: 80rpx;" @loadmore="findHouseList"></u-loadmore>
        <!-- 向上滚动  -->
        <u-back-top :scrollTop="scrollTop" top="1000"></u-back-top>
        <!-- 无网路提示的标签 -->
        <u-no-network></u-no-network>
        <!-- 联系客服 -->
        <view class="buttom">
            <view class="loginType">
                <view class="item wechat">
                    <view class="icon"><u-icon size="60" name="server-man" color="#999" @click="server"></u-icon></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import config from '@/common/config.js'; // 全局配置文件
	import emptyHouseData from "@/components/empty/emptyHouseData.vue";
    export default {
		components: {
		    emptyHouseData
		},
        data() {
            return {
                keyword: '',
                pageNum: 1,
                pageSize: 20,
                scrollTop: 0,
                houseList: [],
				defaultHouseWord:"看房随时",
                swiperList: [],
                noticeList: [],
                navList: [
					{ name: '发布房源', src: '/static/img/index/cover/index_cover4.png', type: '3'},
                    { name: '房屋出售', src: '/static/img/index/cover_2022/index_cover3.png', type: '1'},
                    { name: '房屋出租', src: '/static/img/index/cover_2022/index_cover1.png', type: '2' },
                    {name:'电话本',src:"/static/img/index/cover_2022/phoneManager.png",url:"/pages/phoneManager/phoneManager"}
                ],
                loadStatus: 'loadmore',
                flowList: [],
                uvCode: uni.getStorageSync('uvCode'),
				// 静态url
				staticUrl:  config.staticUrl,
                /* 控制是否展示隐私政策 */
                showPrivateAgre: false,
                privateAgreMode: 'center',
                isShowMask: true,
                isShowMaskCloseAble: false,
				/* 控制是否展示发布房屋弹出模态框 */
				showPublishModel:false,
				// 隐私协议
                privateAgcontent: "",
				// 联系电话
				phoneNumber:"",
                //房源搜索类型
                houseSearchType:1,
				//是否展示为空
				isShowEmpty:false,
                //Tab切换
                list: [{
					name: '出售'
				},{
					name: '出租'
				}],
                //默认tab标签为出售
				current: 0,
				isShowEmpty:false,
				isHideData:false
            };
        },
        onLoad() {
            // 检查是否点了同意隐私协议
            this.checkIsAgreePrivate();
            // 检查是否已选择城市，如果未选择，跳转到选择城市页面
            this.checkCity();
			//获取广告信息数据
			this.getAdvertismentSwiperList();
			//获取客服电话
			this.getContactPhoneInfo();
			/* 获取服务条目信息 */
			this.getServiceItemList();
            //根据当前默认tab标签切换显示
            if(this.current==0){
                this.houseSearchType=1;
            }else{
                this.houseSearchType=2;
            }
            // 获取数据
            this.findHouseList();
			//获取通知列表
            this.getNoticecList();
            // 流量统计
             this.appSysFlowInfo();
            uni.$on('findIndexHouseList', (obj) => {
                // 获取数据
                this.findHouseList(1);
            });
        },
        onUnload() {
            // 移除监听事件
            uni.$off('findIndexHouseList');
        },
        onPageScroll(e) {
            this.scrollTop = e.scrollTop;
        },

        onReachBottom() {
            this.loadStatus = 'loading';
            // 获取数据
            this.findHouseList();
        },

        // 下拉刷新
        onPullDownRefresh() {
            // 获取数据
            this.findHouseList(1);
            // 关闭刷新
            uni.stopPullDownRefresh();
        },

        methods: {
            //当用户点击切换tab时触发搜索
            change(index) {
				this.current = index;
				this.isShowEmpty=false,
				this.isHideData=false
				this.loadStatus= 'loadmore';
                //出售
                if(index==0){
                    this.houseSearchType=1;
                }else if(index==1){
                    this.houseSearchType=2;
                }
                this.findHouseList(1);
			},
			getContactPhoneInfo(){
				let params={type:"联系电话"}; 
				this.$u.api.getServiceItemApi(params)
				.then(res=>{
					let resData=res.data;
					if(res.code==200){
					    this.phoneNumber=resData.title;
					}		
				});
			},
			/* 获取服务条目相关数据 */
			 getServiceItemList(){
				let params={type:"隐私协议"}; 
				this.privateAgcontent="";
				this.$u.api.getServiceItemApi(params)
				.then(res=>{
					let resData=res.data;
					if(res.code==200){
					   this.privateAgcontent = resData.content;
					}		
				});
			},
			/* 获取广告信息轮播数据 */
			getAdvertismentSwiperList(){
				this.swiperList=[];
				this.$u.api.getAdvertisementApi()
				.then(res=>{
					let resData=res.data;
					for (let i = 0; i < resData.length; i++) {
						 let resp = resData[i];						
						 let obj={image:config.baseUrl+resp.advertUrl,title:resp.advertName,url:resp.advertAddress};
						 this.swiperList.push(obj);
					}
			
				});
			},
            /* 检查是否同意了隐私协议 */
            checkIsAgreePrivate() {
                const isAgree = uni.getStorageSync('agreePrivate');
                if (isAgree == 'false' || isAgree == null || isAgree == '') {
                    this.showPrivateAgre = true;
                } else {
                    this.showPrivateAgre = false;
                }
            },

            checkCity() {
                // 检查是否已选择城市，如果未选择，跳转到选择城市页面
                const lifeData = uni.getStorageSync('lifeData');
                const vuex_city = lifeData.vuex_city;
                // console.log(vuex_city.length);
                if (!vuex_city || vuex_city.length == 0) {
                    // 没有token 则跳转到登录
                    return this.$u.route('/pages/location/location');
                }
            },

            location() {
                this.$u.route({
                    url: 'pages/location/location',
                });
            },

            search() {
                this.$u.route({
                    url: 'pages/search/search',
                });
            },


            /* 同意隐私政策 */
            agreePrivateAgre() {
                this.showPrivateAgre = false;
                uni.setStorageSync('agreePrivate', 'true');
            },


            /* 拒绝隐私政策 */
            rejectPrivateAgre() {
                this.showPrivateAgre = false;
                uni.setStorageSync('agreePrivate', 'false');
            },

            notice() {
                this.$u.route({
                    url: 'pages/notice/notice',
                });
            },
            findHouseList(type = 0) {
                if (type == 1) {
                    this.pageNum = 1;
                    this.flowList = [];
                    this.$refs.uWaterfall.clear();
                }
                const url = '/api/houseApi/findHouseRoomList';
                this.$u.get(url, {
                    state: 5,
                  //  villageCity: uni.getStorageSync('lifeData').vuex_city,
                    type: this.houseSearchType,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    orderByColumn: 'update_time,create_time',
                    isAsc: 'desc',
                }).then((result) => {
                    let data = result.rows;
					if(data.length==0 || data==null ){
						this.isHideData=true;
						this.isShowEmpty=true;
						return this.loadStatus = 'nomore';
					}
                    if (this.pageNum > 1 && data.length < this.pageSize) {
                        return this.loadStatus = 'nomore';
                    }
                    this.houseList = data;
                    for (let i = 0; i < this.houseList.length; i++) {
                        // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
                        let item = this.houseList[i];
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
                        this.flowList.push(item);
                    }
                    ++this.pageNum;
                    this.loadStatus = 'loadmore';
                });
            },

            clickSearch() {
                this.$u.route('/pages/search/search');
            },
            //点击图片进入房源详情
            clickImage(houseId) {
                this.$u.route({
                    url: '/pages/detail/detail',
                    params: {
                        houseId,
                    },
                });
            },
			/* 发布房屋出售信息 */
			publishSelHouseInfo(){
				this.showPublishModel=false;
				this.$u.route({
					url:'/pages/detail/publishHouse',
					params: {
					    type:1
					}
				});
			},
			/* 发布房屋出租信息 */
			publishRateHouseInfo(item){
				this.showPublishModel=false;
				this.$u.route({
					url:'/pages/detail/publishHouse',
					params: {
					    type:2
					}
				});
			},
            //点击导航栏跳转 
            clickNav(item) {
                if (item.url) {
                    return this.$u.route(item.url);
                }
				//发布房源
				if(item.type =='3'){
					this.showPublishModel =true;
				}else {
                    return this.$u.route({
                        url: '/pages/search/searchList',
                        params: {
                            type: item.type,
                        },
                    });
                }
            },
            code() {
                this.$mytip.toast('请咨询作者');
            },
			 //首页流量统计
            appSysFlowInfo() {
				 const uvCode = uni.getStorageSync('uvCode');
				 this.$u.api.upFlowApi(uvCode)
				 .then(res=>{
				 	  uni.setStorageSync('uvCode', res.data.data);
				 });
            },
			// 练习客服
            server() {
                uni.makePhoneCall({
                    phoneNumber: this.phoneNumber,
                });
            },
            getNoticecList() {
                const url = '/api/notice/findNoticeList';
                this.$u.get(url, {
                    pageNum: 1,
                    pageSize: 50,
                    orderByColumn: 'create_time',
                    isAsc: 'desc',
                }).then((obj) => {
                    let data = obj.rows;
                    data.filter((item) => {
                        this.noticeList.push(item.noticeTitle);
                    });
                });
            },
			//点击广告触发
            moreInfo(e) {
				 let data =this.swiperList[e];
				 let paramData =JSON.parse(JSON.stringify(data)); 
				 return this.$u.route({
				     url: '/pages/webview/webview',
				     params: {
				         title: paramData.title,
						 src: paramData.url
				     },
				 });
            },
        },
    };
</script>

<style lang="scss" scoped>
	// 隐私政策授权提示样式定义
	.privateAgreTitle{
	     display: flex;
		 align-items: center;
		 justify-content: center;
		 position: relative;
		  top:9px;
	}
	.privateAgreTitle-text{
		font-size: 18px;
		margin:10px;
	 }

	.privateAgreCotentConfirm{
		font-size: 12px;
		width: 100%;
		padding: 0 auto;
	}
	.privateAgreCotent-confirm-text{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 9px;
	}
	.privateAgreCotentContent{
		 background-color: #F3F5FB;
		 margin:5px;
		 padding: 4px;
		 padding-left: 10px;
		 font-size: 12px;
		 overflow-y: auto;
		 height: 100px;
		 align-items: center;
		 justify-content: center;
		 word-wrap: break-word;
	     color: #000;
		 box-sizing: content-box;
	}

	.privateAgreCotentContent-text{
		align-items: center;
		justify-content: center;
		word-wrap: break-word;
	}
	.privateAgreCotentContentConfirm{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.privateAgreCotentContentConfirm-text{
		font-size: 18px;
		margin:10px;
	}
	.privateAgre-agreeBtnContainer{
		width: 100%;
		padding: 3px;
		margin: 0 auto;
		height: 109px;
	}
	.privateAgre-agreeBtn{
		background-color: #23C993;
		border-radius: 2px;
		align-items: center;
		color: #fff;
		font-size: 16px;
	}
	.privateAgre-disAgreeBtn{
		background-color: #fff;
		color: #96A1BD;
		border: #fff;
		font-size: 14px;
		position: relative;
        top:5px;
	}
	.privateAgre-disAgreeBtn::after{
		border: none;
	}
		// 隐私政策授权提示样式定义结束
	.nomore {
		background-color: $u-bg-color;
	}

	.search{
		width: 54px;
		height: 44px;

		&:active{
			background-color: $u-bg-color;
		}
	}

	.rowClass{
		border-radius: 8px;
		background-color: rgb(255, 255, 255);
		margin-top: 10rpx;
	}

	.hoverClass{
		background-color: #E4E7ED;
	}

	.tabName{
		font-size: 28rpx;
		color: $u-main-color;
	}

	.demo-warter {
	    border-radius: 8px;
	    margin-top: 3px;
	    background-color: #ffffff;
	    padding: 3px;
	    position: relative;
	}

	.u-close {
	    position: absolute;
	    top: 20rpx;
	    right: 20rpx;
	}

	.item-cover {
	    font-size: 55rpx;
	    color: $u-type-warning;
	}

	.item-title {
	    font-size: 27rpx;
	    color: $u-main-color;
	   // font-weight: bold;
		padding-top: 5rpx;
		padding-left: 10rpx;
	}

	.item-price {
	    font-weight: normal;
	    font-size: 32rpx;
	    color: $u-type-error;
	}

	.item-desc {
	    font-weight: normal;
	    font-size: 24rpx;
	    color: $u-tips-color;
		padding-bottom: 5rpx;
		padding-left: 10rpx;
	}

	.item-tag {
	    font-size: 24rpx;
	    color: $u-tips-color;
	    margin-top: 3px;
	}

	.buttom {
		.loginType {
			font-size: 14px;
			position: fixed;
			right: 30rpx;
			bottom: 300rpx;
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
