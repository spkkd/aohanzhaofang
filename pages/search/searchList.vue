<template>
    <view>
		<!-- <u-navbar :is-back="true" title="房源列表" :border-bottom="false"></u-navbar> -->
       <u-sticky offset-top="0">
            <view class="sticky">
                <filterDropdown :menuTop="0" :filterData="filterData" :defaultSelected="defaultSelected" :updateMenuName="true" @confirm="confirm" dataFormat="Object"></filterDropdown>
            </view>
        </u-sticky> 
		<emptyHouseData :isShow="isShowEmpty" :pubType="this.pubType"></emptyHouseData>
        <view class="u-p-l-10 u-p-r-10 waterfall">
			<block v-show="isHideData">
				<u-waterfall v-model="flowList" ref="uWaterfall">
							   <template #left="{ leftList }">
							        <view v-for="(item, index) in leftList" :key="index" class="demo-warter">
							            <u-lazy-load
							                threshold="750" borderRadius="12" :image="item.faceUrl" :index="index"
							                @click="clickImage(item.id)"
							            ></u-lazy-load>
							            <view class="item-title">{{ item.type ==1 ? "出售":"出租"}}  | {{ item.villageName }} | {{item.houseNum + item.houseHall + item.toiletNum}} | {{item.decoration}}  </view>
							            <view class="item-price">{{ item.type==1 ? item.price +"万元" : item.ratePrice+"元/年" }}</view>
							            <view class="item-desc">{{ item.learnAreaName }}  | {{ item.roomArea }}㎡ | {{ item.houseTypeName }} </view>
							        </view>
							    </template>
							   <template #right="{ rightList }">
							        <view v-for="(item, index) in rightList" :key="index" class="demo-warter">
							            <u-lazy-load
							                threshold="750" borderRadius="12" :image="item.faceUrl" :index="index"
							                @click="clickImage(item.id)"
							            ></u-lazy-load>
							          <view class="item-title">{{ item.type ==2 ? "出租":"出售"}}  | {{ item.villageName }} | {{item.houseNum + item.houseHall + item.toiletNum}} | {{item.decoration}} </view>
							          <view class="item-price">{{ item.type==2? item.ratePrice+"元/年" : item.price +"万元"  }}</view>
							          <view class="item-desc">{{ item.learnAreaName }}  | {{ item.roomArea }}㎡ | {{ item.houseTypeName }} </view>
							        </view>
							    </template> 
				</u-waterfall>
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="findHouseList" style="height: 80rpx;line-height: 80rpx;"></u-loadmore>
				<u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>
				<u-no-network></u-no-network>
			</block>
	   </view>
    </view>
</template>

<script>
	import config from "@/common/config.js" // 全局配置文件
	import searchData from '@/common/utils/searchData.js';//筛选菜单数据
    import filterDropdown from '@/components/zy/filterDropdown.vue';
	import emptyHouseData from "@/components/empty/emptyHouseData.vue";
    export default {
        components: {
            filterDropdown,emptyHouseData
        },
        data() {
            return {
				indexArr: [],
				valueArr: [],
                defaultSelected: [],
                filterData: [],
				searchData:{},
				pubType:0,
				pageNum: 1,
				pageSize: 20,
				scrollTop: 0,
				houseList: [],
                loadStatus: 'loadmore',
                flowList: [],
				isShowEmpty:false,
				isHideData:false
            }
        },
        onLoad(option) {
			let type = option.type;
			this.pubType = option.type;
			let villageName = option.villageName;
			this.searchData = {};
			if(villageName){
				this.searchData.villageName = villageName;
			}
            // 获取房源数据
            this.findHouseList();
			//获取学区
			this.findLearnVillageList();
			// 获取小区数据
			//this.findVillageList();
			//获取发布性质
			this.getPubQualityList();
			//获取装修
		//	this.getDecorationList();
		    //获取楼层
		    this.getFloorType();
			//获取居室
			this.getHouseTypeList();
			//获取厅室
		    this.getTingTypeList();
			//获取卫室
			this.getWeiTypeList();
			//加载房源亮点
			//this.getHouseFeatureList(type);
			//获取建成年份
			this.getBuildYearList();
			//加载楼梯类型
			this.getFloorList();
			//加载价格区间
			if(type==1){
				this.getSellHousePriceArea();
			}else{
				this.getRateHousePriceArea();
			}
			//房屋面积
			this.getHouseAreaDictValue();
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
        	this.pageNum = 1
        	this.flowList = []
        	this.$refs.uWaterfall.clear();
        	// 获取数据
        	this.findHouseList();
        	// 关闭刷新
        	uni.stopPullDownRefresh();
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
			/* 获取发布性质数据 */
			getPubQualityList(){
				searchData[2].submenu=[{
                "name": "不限",
                "value": "不限"}];
				let dictType="house_pub_type";
				this.$u.api.getDictDataApi(dictType).then(res => {
				let zdDatas=res.data;
				zdDatas.map((param)=>{
						searchData[2].submenu.push({
							name: param.dictLabel,
							value: param.dictValue
						})
					});
					this.filterData = searchData;
				});
			},
			//获取租房价格区间 
            getRateHousePriceArea(){
				searchData[3].submenu=[{
                    "name": "不限",
                    "value": "不限"}];
				searchData[3].name="租金";
				let dictType="rate_house_price_area";
				this.$u.api.getDictDataApi(dictType).then(res => {
				let zdDatas=res.data;
				zdDatas.map((param)=>{
					searchData[3].submenu.push({
							name: param.dictLabel,
							value: param.dictValue
				        });
					});
					this.filterData = searchData;
				});
			},
			//获取售房价格区间 
            getSellHousePriceArea(){
				searchData[3].submenu=[{
                "name": "不限",
                "value": "不限"}];
				searchData[3].name="售价";
				let dictType="sell_house_price_area";
				this.$u.api.getDictDataApi(dictType).then(res => {
				let zdDatas=res.data;
				zdDatas.map((param)=>{
					searchData[3].submenu.push({
							name: param.dictLabel,
							value: param.dictValue
				        });
					});
					this.filterData = searchData;
				});
			},
			//获取房屋面积
			getHouseAreaDictValue(){
				searchData[4].submenu=[{
				"name": "不限",
				"value": "不限"}];
				let dictType="house_area_type";
				this.$u.api.getDictDataApi(dictType).then(res => {
				let zdDatas=res.data;
				zdDatas.map((param)=>{
					searchData[4].submenu.push({
							name: param.dictLabel,
							value: param.dictValue
				        });
					});
					this.filterData = searchData;
				});
			},
			/* 获取装修类型 */
			getDecorationList(){
				searchData[4].submenu[3].submenu=[];
				let dictType="decoration_type";
				this.$u.api.getDictDataApi(dictType).then(res => {
				let zdDatas=res.data;
				zdDatas.map((param)=>{
						searchData[4].submenu[3].submenu.push({
							name: param.dictLabel,
							value: param.dictValue
				        });
					});
					this.filterData = searchData;
				});
			},
			//获取楼层
			getFloorType(){
				let dictType="floor_type_code";
				searchData[5].submenu[3].submenu=[{"name":"不限","value":"不限"}];
				this.$u.api.getDictDataApi(dictType).then(res => {
				   let zdDatas=res.data;
				    zdDatas.map((param)=>{
						searchData[5].submenu[3].submenu.push({
							name: param.dictLabel,
							value: param.dictValue
						});
				   	});
					this.filterData = searchData;
				});
			},
			/*
			 获取建成年份数据
			 */
			getBuildYearList(){
				let dictType="build_year_type";
				searchData[5].submenu[4].submenu=[{"name":"不限","value":"不限"}];
				this.$u.api.getDictDataApi(dictType).then(res => {
				   let zdDatas=res.data;
				    zdDatas.map((param)=>{
						searchData[5].submenu[4].submenu.push({
							name: param.dictLabel,
							value: param.dictValue
						});
						
				   	});
					this.filterData = searchData;
				});
			},
			/* 获取房源亮点 */
			getHouseFeatureList(val){
				searchData[4].submenu[4].submenu=[];
				let dictCode=""
				if(val==1){
					dictCode="sellHouse_feature_code";
				}else{
					dictCode="rateHouse_feture_code";
				}
				this.$u.api.getDictDataApi(dictCode).then(res => {
					let zdDatas=res.data;
					zdDatas.map((param)=>{
						let obj = {name: param.dictValue,value:param.dictValue};
						searchData[4].submenu[4].submenu.push(obj);
					});
					this.filterData = searchData;
				});
			},
			/* 获取楼梯数据 */
			getFloorList(){
				this.floorList=[];
				searchData[5].submenu[5].submenu=[{"name":"不限","value":"不限"}];
				let dictType="step_type";
				this.$u.api.getDictDataApi(dictType).then(res => {
					let zdDatas=res.data;
					zdDatas.map((param)=>{
							let obj={
							name:param.dictLabel,
							value:param.dictValue};
							searchData[5].submenu[5].submenu.push(obj);
					});
					this.filterData = searchData;
				});
			},
			/* 获取居室 */
			getHouseTypeList(){
				// searchData[5].submenu[1].submenu=[{"name": "不限","value": "不限"}];
				 let houseTypeList = this.getHuXingList("houseHall_type");	
				 searchData[5].submenu[0].submenu=houseTypeList;
				 this.filterData = searchData;
			},
			/**获取厅室**/
			getTingTypeList(){
				 //searchData[5].submenu[0].submenu=[{"name": "不限","value": "不限"}];
				 let houseTypeList = this.getHuXingList("house_ting_type");	
				 searchData[5].submenu[1].submenu=houseTypeList ;
				 this.filterData = searchData;
			},
			/**获取卫室**/
			getWeiTypeList(){
				// searchData[5].submenu[2].submenu=[{"name": "不限","value": "不限"}];
				 let houseTypeList = this.getHuXingList("house_wei_type");	
				 searchData[5].submenu[2].submenu=houseTypeList;
				 this.filterData = searchData;
			},
			/* 获取户型信息 */
			getHuXingList(parm){
				let huxingList=[];
				this.$u.api.getDictDataApi(parm).then(res => {
				let zdDatas=res.data;
				huxingList.push({name:"不限",value:"不限"});
				zdDatas.map((param)=>{
						let obj={
						name:param.dictLabel,
						value:param.dictValue};
						huxingList.push(obj);
					});
				});
				return huxingList;
			},
            findHouseList() {
            	let url = "/api/houseApi/findHouseRoomList";
				let defaultData = {
					state:5,
					type:this.pubType,
					//villageCity:uni.getStorageSync('lifeData').vuex_city,
            		pageNum: this.pageNum,
            		pageSize: this.pageSize,
            		orderByColumn: 'update_time,create_time',
            		isAsc: 'desc'
            	}
            	this.$u.get(url, {...defaultData,...this.searchData}).then(result => {
					let data = result.rows;
					if(data.length==0 || data==null ){
						this.isHideData=true;
						this.isShowEmpty=true;
						return this.loadStatus = 'nomore';
					}else{
						this.isHideData=false;
						this.isShowEmpty=false;
					}
            		if(this.pageNum>1 && data.length < this.pageSize){
            			return this.loadStatus = 'nomore';
            		}
            		this.houseList = data;
            		for (let i = 0; i < this.houseList.length; i++) {
            		    // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
            		    let item = this.houseList[i]
            			if(!item.faceUrl.includes(config.staticUrl)){
            				item.image = config.staticUrl+item.faceUrl
            			}else{
            				item.image = item.faceUrl
            			}	
            			if(this.$u.test.isEmpty(item.houseNum)){
            				item.houseNum = ''
            			}
            			if(this.$u.test.isEmpty(item.houseHall)){
            				item.houseHall = ''
            			}
            			if(this.$u.test.isEmpty(item.toiletNum)){
            				item.toiletNum = ''
            			}
						if( this.$u.test.isEmpty(item.faceUrl) ){
							item.faceUrl=config.defaultHouseImageUrl;
						}
            		    this.flowList.push(item);
            		}
            		++ this.pageNum 
            		this.loadStatus = 'loadmore';
            	});
            },
			//加载小区数据
			findVillageList(id) {
			    searchData[1].submenu=[{
                "name": "不限",
                "value": "不限"}];
				this.$u.api.getVillageListApi({
				   //city:uni.getStorageSync('lifeData').vuex_city,
					businessType:"villageArea",
				 	parentId:id,
            		orderByColumn: 'name',
            		isAsc: 'desc'}).then(result => {
					const data = result.rows
					for (let i = 0; i < data.length; i++) {
					    let item = data[i]
						searchData[1].submenu.push({
							name: item.name,
							value: item.id
						})
					}
					this.filterData = searchData;
				});
			},
			findLearnVillageList() {
				searchData[0].submenu=[{
                "name": "不限","value": "不限"}];
				this.$u.api.getVillageListApi({
				   //city:uni.getStorageSync('lifeData').vuex_city,
					businessType:"learnArea",
					orderByColumn: 'name',
					isAsc: 'desc'}).then(result => {
					const data = result.rows;
					
					for (let i = 0; i < data.length; i++) {
					    let item = data[i]
						searchData[0].submenu.push({
							name: item.name,
							value: item.id
						})
					}
					this.filterData = searchData;
				});
			},
			clickImage(houseId) {
			    this.$u.route({
			    	url: '/pages/detail/detail',
			    	params: {
			    		houseId: houseId
			    	}
			    })
			},
			//下拉菜单触发搜索
			confirm(e) {
				//debugger;
				//学区id
				let learnVillageId = e.value[0][0];
				//小区id
				let villageId = e.value[1][0];
				//房屋性质
				let houseXingZhi = e.value[2][0];
				//房屋售价/租金
                let housePrice = e.value[3][0];
				//获取房屋面积
				let houseAreaMj = e.value[4][0];
				//居室
				let housejUType = e.value[5][0][0];
                //厅室
				let houseTingType = e.value[5][1][0];			
				//卫室
				let houseWeiType = e.value[5][2][0];
                //装修
			//	let decoration = e.value[4][3];
				//房源亮点
				//let feature = e.value[4][4];
			//	let decoration = e.value[5][3];
			     //楼层
			    let houseFloorNum = e.value[5][3][0];
			    //建成年份
				let houseBuidYear = e.value[5][4][0];	
				//楼梯
                let floorType = e.value[5][5][0];
                 //学区id
				 if( !this.$u.test.isEmpty(learnVillageId) ){
					  if(learnVillageId=="不限"){
						   this.searchData.learnVillageId="";
					  }else{
					     this.findVillageList(learnVillageId);	  
					    this.searchData.learnVillageId=learnVillageId;
					  }
				 }
                 //小区id
				 if( !this.$u.test.isEmpty(villageId) ){
					   if(villageId=="不限"){
						   this.searchData.villageId="";
					   }else{
						 this.searchData.villageId=villageId;   
					   }
				 }
                 //房屋性质
				 if( !this.$u.test.isEmpty(houseXingZhi) ){
					  if(houseXingZhi=="不限"){
						 this.searchData.houseType="";  
					  }else{
						  this.searchData.houseType=houseXingZhi;  
					  }
				 }
				 //价格
				 if(this.pubType==1){
					 if(!this.$u.test.isEmpty(housePrice)){
						 if(housePrice=="不限"){
							this.searchData.sellPrice="";
						 }else{
							this.searchData.sellPrice = housePrice; 
						 }
					 }
				 }else{
					if(!this.$u.test.isEmpty(housePrice)){
						 if(housePrice=="不限"){
							this.searchData.ratePrice=""; 
						 }else{
							this.searchData.ratePrice = housePrice; 
						 }
					 }
				 }
				 //房屋面积
				 if(!this.$u.test.isEmpty(houseAreaMj)){
					 if(houseAreaMj=="不限"){
						 this.searchData.roomArea="";
					 }else{
						 this.searchData.roomArea=houseAreaMj;
					 }
				 }
				 //居室
				 if( !this.$u.test.isEmpty(housejUType) ){
					 if(housejUType=="不限"){
						 this.searchData.houseNum="";
					 }else{
						this.searchData.houseNum=housejUType; 
					 }
				 }
				 //厅室
				 if( !this.$u.test.isEmpty(houseTingType) ){
					 console.log(houseTingType);
					 if(houseTingType=="不限"){
						 this.searchData.houseHall="";
					 }else{
						this.searchData.houseHall=houseTingType; 
					 }
				 }
				 //卫室
				 if( !this.$u.test.isEmpty(houseWeiType) ){
					 if(houseWeiType=="不限"){
						 this.searchData.toiletNum="";
					 }else{
						this.searchData.toiletNum=houseWeiType; 
					 }
				 }
				 //楼梯类型
				 if( !this.$u.test.isEmpty(floorType) ){
					  if(floorType=="不限"){
					    this.searchData.stepType="";	  
					  }else{
						   this.searchData.stepType=floorType;
					  }
				 }
				 //建成年份
				 if( !this.$u.test.isEmpty(houseBuidYear) ){
					  if(houseBuidYear=="不限"){
						  this.searchData.houseBuildYear="";	  
					  }else{
						   this.searchData.houseBuildYear=houseBuidYear;
					  }
				 }
				 //楼层
				 if( !this.$u.test.isEmpty(houseFloorNum) ){
					if(houseFloorNum=="不限"){
						  this.searchData.floor="";	  
					  }else{
						   this.searchData.floor=houseFloorNum;
					  }
				 }
				this.pageNum = 1
				this.houseList = []
				this.flowList = []
				this.$refs.uWaterfall.clear();
				this.findHouseList()
			},
			code(){
				this.$mytip.toast('请咨询技术支持')
			}
        }
    }
</script>

<style lang="scss" scoped>
	.waterfall{
		// padding-top: 85rpx;
	}
	
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
	    font-size: 28rpx;
	    color: $u-main-color;
	    font-weight: bold;
		padding-top: 5rpx;
		padding-left: 10rpx;
	}
	
	.item-price {
	    font-weight: normal;
	    font-size: 32rpx;
	    color: $u-type-warning;
	}
	
	.item-desc {
	    font-weight: normal;
	    font-size: 26rpx;
	    color: $u-tips-color;
		padding-bottom: 5rpx;
		padding-left: 10rpx;
	}
	
	.item-tag {
	    font-size: 24rpx;
	    color: $u-tips-color;
	    margin-top: 3px;
	}
</style>
