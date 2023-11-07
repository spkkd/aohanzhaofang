<template>
	<view class="">
		<view class="wrap">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				
				<u-form-item :label-position="labelPosition" label="性质" prop="houseTypeName" label-width="180"
				:leftIconStyle="{color:'#d5d5d5'}" required>
					<u-input :border="border" type="select" :select-open="pubQualitySelectShow" v-model="model.houseTypeName" placeholder="请选择性质(必选)" @click="pubQualitySelectShow = true"></u-input>
				</u-form-item>
				
				<u-form-item :label-position="labelPosition" label="学区名称" prop="learnAreaName" label-width="180"
				 :leftIconStyle="{color:'#d5d5d5'}" required>
					<u-input :border="border" type="select" :select-open="learnAreaSelectShow" v-model="model.learnAreaName" placeholder="请选择学区(必选)" @click="learnAreaSelectShow = true"></u-input>
				</u-form-item>
		     	<u-form-item :label-position="labelPosition" label="小区名称" prop="villageName" label-width="180"
				 :leftIconStyle="{color:'#d5d5d5'}" required>
					<u-input :border="border" type="select" :select-open="selectShow" v-model="model.villageName" placeholder="请选择小区(必选)" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="所在位置选择" prop="address" label-width="180"
				 :leftIconStyle="{color:'#d5d5d5'}" right-icon="map"
				:rightIconStyle="{color:'#d5d5d5'}">
					<u-input :border="border" placeholder="请在地图选择所在位置" v-model="model.address" type="text" disabled
					@click="chooseAddress"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" prop="detailAddress" label="详细地址" label-width="150"  required>
					<u-input :border="border" type="select" :select-open="selectAddressShow" v-model="model.detailAddress" placeholder="请选择详细地址" @click="selectAddressShow = true"></u-input>
				</u-form-item>
				<u-form-item  :label-position="labelPosition" label="门牌号" prop="houseNo" label-width="180"
				:leftIconStyle="{color:'#d5d5d5'}" required>
					<u-input :border="border" placeholder="请输入门牌号(必填)" v-model="model.houseNo" type="number"></u-input>
				</u-form-item> 
				<u-form-item  :label-position="labelPosition" label="装修" prop="decoration" label-width="180" :leftIconStyle="{color:'#d5d5d5'}">
					<u-input :border="border" type="select" placeholder="请选择装修(必选) "   v-model="model.decoration" @click="decorationShow=true"></u-input>
				</u-form-item>
				<u-form-item label-width="150" :label-position="labelPosition" label="楼梯类型" >
					<u-input :border="border" type="select" :select-open="floorShow" v-model="model.stepType" placeholder="请选择楼梯类型" @click="floorShow = true"></u-input>
				</u-form-item>
				<u-form-item  label-width="150" :label-position="labelPosition" label="面积" required>
					<u-input :border="border" placeholder="请输入面积" v-model="model.roomArea" type="digit"></u-input>
				</u-form-item>
				<u-form-item  label-width="150" :label-position="labelPosition" label="售价" required v-if="type==1">
					<u-input :border="border" placeholder="请输入售价(单位:万)" v-model="model.sellPrice" type="number" ></u-input>
				</u-form-item>
				<u-form-item  label-width="150" :label-position="labelPosition" label="租金" required v-if="type==2">
					<u-input :border="border" placeholder="请输入租金(单位:元)" v-model="model.ratePrice" type="number" ></u-input>
				</u-form-item>
				<u-form-item  :label-position="labelPosition" label="建成年份" prop="buildYear" label-width="180" :leftIconStyle="{color:'#d5d5d5'}" v-if="type==1">
					<u-input :border="border" type="select" placeholder="请选择建成年份(必选) "   v-model="model.houseBuildYear" @click="buildYearShow=true"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="户型" label-width="150" required>
					<u-input :border="border" type="select" :select-open="selectHouseTypeShow" v-model="model.houseLayout" placeholder="请选择户型" @click="selectHouseTypeShow = true"></u-input>
				</u-form-item>
				<u-form-item label-width="150" :label-position="labelPosition" label="朝向" >
					<u-input :border="border" type="select" :select-open="directionShow" v-model="model.direction" placeholder="请选择朝向" @click="directionShow = true"></u-input>
				</u-form-item>
 				 <u-form-item  :label-position="labelPosition" label="业主姓名" prop="ownerName" label-width="180"
				 :leftIconStyle="{color:'#d5d5d5'}">
					<u-input :border="border" placeholder="请输入业主姓名(必填)" v-model="model.ownerName" type="text"></u-input>
				</u-form-item> 
				<u-form-item  :label-position="labelPosition" label="业主电话" prop="owerPhone" label-width="180"
				 :leftIconStyle="{color:'#d5d5d5'}" required>
					<u-input :border="border" placeholder="请输入业主电话(必填)" v-model="model.owerPhone" type="number" maxlength="11"></u-input>
				</u-form-item>
				<u-form-item  label-width="150"  :label-position="labelPosition" label="房源亮点" required>
					<u-checkbox-group @change="checkboxGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">{{ item.name }}</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="房源图片" label-width="150" required>
					<u-upload 
					:custom-btn="true" ref="uUpload" :auto-upload="true" :action="fileUploadUrl" 
					:max-size="10 * 1024 * 1024" max-count="9" width="160" height="160"
					 :size-type="siteType" @on-change="changeImageAction" @on-remove="imageDeleteAction">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
						</view>
					</u-upload>
				</u-form-item>
				<u-form-item  label-width="150"  :label-position="labelPosition" label="房源描述">
					<u-input type="textarea" :border="border" placeholder="请填写房屋描述" v-model="model.introduce" />
				</u-form-item>
			</u-form>
			<!-- 流量主-腾讯视频广告 -->
			<!-- <ad unit-id="adunit-c6cdd74f48eed506" ad-type="video" ad-theme="white"></ad> -->
			 <!-- 发布性质选择-->
			 <u-select mode="single-column" :list="pubQualityList" v-model="pubQualitySelectShow" @confirm="pubQualityAreaConfirm"></u-select> 
			 <!--学区选择-->
			 <u-select mode="single-column" :list="learnAreaList" v-model="learnAreaSelectShow" @confirm="selectlearnAreaConfirm"></u-select> 
			 <!-- 房屋朝向性质选择-->
		  	 <u-select mode="single-column" :list="directionList" v-model="directionShow" @confirm="directionConfirm"></u-select>
			 <!-- 选择楼梯-->
			 <u-select mode="single-column" :list="floorList" v-model="floorShow" @confirm="selectFloorConfirm"></u-select> 
			 <!-- 选择建成年份-->
			 <u-select mode="single-column" :list="buildYearList" v-model="buildYearShow" @confirm="selectbuildYearConfirm"></u-select> 	
			 <!-- 选择户型-->
			 <u-select mode="mutil-column" :list="houseTypeList" v-model="selectHouseTypeShow" @confirm="selectHouseTypeConfirm"></u-select>
			 <!-- 选择详细位置-->
			 <u-select mode="mutil-column" :list="houseAddressList" v-model="selectAddressShow" @confirm="selectAddressConfirm"></u-select>
			 <!-- 选择小区 -->
			 <u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select> 
			 <!-- 选择装修 -->
		 	 <u-select mode="single-column" :list="decorationList" v-model="decorationShow" @confirm="decorationConfirm"></u-select>
			 <u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
			 <!-- 支付loading-->
			 <u-mask :show="isShowLoading">
			     <view style="display: flex;justify-content: center;align-items: center;height: 100%;">
			         <u-loading mode="flower" size="90" />
			     </view>
			 </u-mask>
		</view>
 	   <view class="bottom-btn">
			<u-button type="primary" @click="submit">立即发布</u-button>
		</view> 
	</view>
</template>

<script>
import config from '@/common/config.js'; 
export default {
	data() {
		let that = this;
		return {
			actionSheetShow: false,
			// 是否展示支付框
			isShowLoading:false,
			type: 0,
			//默认为未启用微信支付
			weChatPayEnableStatus:"",
			//发布订单号
			publishOrderNumber:"",
			model: {
				/* 1:发布出售信息 2:发布出租信息 */
				type: 0,
				houseType: '',
				roomLabel: '',
				villageName: '',
				villageId: '',
				address: '',
				houseNo: '',
				//装修
				decoration:'',
				//房东
				ownerName:'',
				//房东电话
				owerPhone:'',
				//Todo 这里报错导致下拉框渲染不出来
				payType:'',
				createName: '',
				publishId:'',
				state: 0,
				longitude: 0,
				latitude: 0,
				/* 学区名称 */
				learnAreaName:'',
				/* 学区id */
				learnAreaId:'',
				/* 发布性质名称 */
				pubQualityName:"",
				/* 发布性质id */
				pubQualityId:"",
				/* 房屋面积 */
				houseArea:"",
				/* 房源描述 */
				introduce:"",
				/* 房源亮点选择 */
				featureList:[],
				/* 房屋朝向 */
				directionVo:"",
				/* 楼梯 */
				floorVo:"",
				/* 建成年份 */
				buildYear:"",
				/* 户型 */
				houseLayout:"",
				// 性质
				houseType:"",
				/* 楼号 */
				buildNum:"",
				/* 单元 */
				buildUnit:"",
				/* 楼层 */
				buildFloorNum:"",
				/* 房源图片 */
				imageList:[]
			},
			fileUploadUrl:"",
			selectList: [],
			/* 学区数据 */
			learnAreaList:[],
			/* 发布性质选择 */
			pubQualityList:[],
			/* 房屋朝向 */
			directionList:[],
			/* 建成年份 */
			buildYearList:[],
			/* 房屋详细地址 */
			houseAddressList:[],
			/* 户型 */
			houseTypeList:[],
		    decorationList:[],
			/* 房源亮点选择 */
			checkboxList: [],
			/* 楼梯选中列表 */
			floorList:[],
			actionSheetList: [
				{
					text: '月付'
				},
				{
					text: '季付'
				},
				{
					text: '半年付'
				},
				{
					text: '年付'
				}
			],
			rules: {
				detailAddress:[
					{
						required: true,
						message: '请选择详细地址',
						trigger: ['change','blur'],
					}
				],
				learnAreaName:[
					{
						required: true,
						message: '请选择学区',
						trigger: ['change','blur'],
					}
				],
				villageName: [
					{
						required: true,
						message: '请选择小区',
						trigger: ['change','blur'],
					}
				],
				 address: [
					{
						required: true,
						message: '请输入详细地址',
						trigger: ['change','blur'],
					}
				], 
				houseTypeName: [
					{
						required: true,
						message: '请选择发布性质',
						trigger: ['change','blur'],
					}
				],
				houseNo: [
					{
						required: true,
						message: '请输入门牌号',
						trigger: ['change','blur'],
					}
				],
				decoration: [
					{
						required: true,
						message: '请选择装修',
						trigger: ['change','blur'],
					}
				],
				ownerName: [
					{
						required: true,
						message: '请输入业主姓名',
						trigger: ['change','blur'],
					}
				],
				owerPhone: [
					{
						required: true,
						message: '请输入业主电话',
						trigger: ['change','blur'],
					}
				]
			},
			// 选中的照片
			fileList:[],
			border: false,
			check: false,
			selectShow: false,
			radioCheckWidth: 'auto',
			radioCheckWrap: false,
			/* 学区选择下拉框是否展示 */
			learnAreaSelectShow:false,
			/* 发布性质下拉框是否展示 */
			pubQualitySelectShow:false,
			decorationShow: false,
			/* 房屋朝向是否显示 */
			directionShow:false,
			/* 楼梯是否显示 */
			floorShow:false,
			/* 建成年份选择 */
			buildYearShow:false,
			/* 选择户型 */
			selectHouseTypeShow:false,
			/* 选择详细位置 */
			selectAddressShow:false,
			labelPosition: 'left',
			errorType: ['toast'],
			//默认为压缩图
			siteType:['compressed']
		};
	},
	onLoad(option) {
		this.validLoginToken();
		this.fileUploadUrl =this.$u.api.uploadFileUrl;
		 let loginInfo = uni.getStorageSync('lifeData').vuex_user;
	     if(loginInfo!=null){
			 let userName = loginInfo.userName;
			 let  userId=loginInfo.userId;
			 if(userName!=null || userName!='undefined'){
			 			 this.createName = userName;
			 }
			 if(userId!=null || userId!='undefined'){
			 			 this.publishId = userId;
			 }	
		 }
		let houseId = option.houseId //上个页面传递的参数。
		if(houseId){
			// 渲染当前房源信息
			this.findHouseById(houseId);
		}
		let publishType = option.type;
		if(publishType){
			this.type=publishType;
			this.model.type=publishType;
		}
		//是否启用微信支付配置
		this.isEnabledWeChatPay();
		//自动生成发布时订单号
		this.autoGenerateOrderNumber();
		/* 加载学区数据 */
		this.getLearnAreaList();
		 /* 获取发布性质数据*/
		this.getPubQualityList();
		/* 加载小区数据 */
	//	this.findVillageList();
		/* 加载房屋朝向 */
		this.getDirectionList();
		/* 加载楼梯数据 */
		this.getFloorList();
		/* 获取建成年份列表 */
		this.getBuildYearList();
		/* 获取房屋详细地址 */
		this.gethouseAddressList();
		/* 获取装修列表 */
		this.getDecorationList();
		//获取户型数据
		this.getHouseTypeList();
		//获取房源亮点数据
	    this.getHouseCheckBoxList(publishType);
		// 定位经纬度
		/* uni.getLocation({
			 type: 'gcj02',
			 // 当指定 high 时，期望精度值为100m，当指定 best 时期望精度值为20m
			 accuracy:'best',
			 // 开启高精度定位
			 isHighAccuracy:true,
			 success: (res) => {
			 	this.longitude=res.longitude
			 	this.latitude= res.latitude
			 }
		}); */
		uni.$on('changeAddressConfig', (address,lon,lat) => {
			// 获取数据
			this.changeAddressConfig(address,lon,lat);
		})
	},
	onUnload() {
		// 移除监听事件  
		uni.$off('changeAddressConfig');
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		resetInput(){
			 let defaultObj={
				type: this.model.type,
				/* 1:发布出售信息 2:发布出租信息 */
				houseType: '',
				roomLabel: '',
				villageName: '',
				villageId: '',
				address: '',
				houseNo: '',
				//装修
				decoration:'',
				//房东
				ownerName:'',
				//房东电话
				owerPhone:'',
				//Todo 这里报错导致下拉框渲染不出来
				payType:'',
				createName: '',
				publishId:'',
				state: 0,
				longitude: 0,
				latitude: 0,
				/* 学区名称 */
				learnAreaName:'',
				/* 学区id */
				learnAreaId:'',
				/* 发布性质名称 */
				pubQualityName:"",
				/* 发布性质id */
				pubQualityId:"",
				/* 房屋面积 */
				houseArea:"",
				/* 房源描述 */
				introduce:"",
				/* 房源亮点选择 */
				featureList:[],
				/* 房屋朝向 */
				directionVo:"",
				/* 楼梯 */
				floorVo:"",
				/* 建成年份 */
				buildYear:"",
				/* 户型 */
				houseLayout:"",
				// 性质
				houseType:"",
				/* 楼号 */
				buildNum:"",
				/* 单元 */
				buildUnit:"",
				/* 楼层 */
				buildFloorNum:"",
				/* 房源图片 */
				imageList:[]
			};
			this.model = defaultObj;
		},
		/* 获取房源亮点 */
		getHouseCheckBoxList(val){
		  this.checkboxList=[];
		  let dictCode=""
		  if(val==1){
			   dictCode="sellHouse_feature_code";
		   }else{
		       dictCode="rateHouse_feture_code";
		   }
		   this.$u.api.getDictDataApi(dictCode).then(res => {
		      let zdDatas=res.data;
		      zdDatas.map((param)=>{
				 let obj = {name: param.dictValue,checked: false,disabled: false};
				 this.checkboxList.push(obj);
		      });
		   });
		},
		/* 获取户型 */
		getHouseTypeList(){
			this.houseTypeList=[];
		    this.houseTypeList.push(this.getHuXingList("houseHall_type"));	
			this.houseTypeList.push(this.getHuXingList("house_ting_type"));
			this.houseTypeList.push(this.getHuXingList("house_wei_type"));
		},
		/* 获取装修类型 */
		getDecorationList(){
			this.decorationList=[];
			let dictType="decoration_type";
			this.$u.api.getDictDataApi(dictType).then(res => {
			   let zdDatas=res.data;
			   zdDatas.map((param)=>{
					 let obj={
					 label:param.dictLabel,
					 value:param.dictValue};
					 this.decorationList.push(obj);
				});
			});
		},
		/* 获取房屋详细地址 */
		gethouseAddressList(){
			 this.houseAddressList=[];
			 this.houseAddressList.push( this.getBuildNumType() );
			 this.houseAddressList.push( this.getRoomUnitType() );
			 this.houseAddressList.push( this.getFloorType() );
		},
		/* 获取楼号 */
		getBuildNumType(){
			let buildNumArray=[];
			let dictType="build_num_type";
			this.$u.api.getDictDataApi(dictType).then(res => {
			   let zdDatas=res.data;
			   zdDatas.map((param)=>{
					 let obj={
					 label:param.dictLabel,
					 value:param.dictValue};
					 buildNumArray.push(obj);
				});
			});
			return buildNumArray;
		},
		/* 获取单元 */
		getRoomUnitType(){
			let roomUnitArray=[];
			let dictType="room_unit_type";
			this.$u.api.getDictDataApi(dictType).then(res => {
			   let zdDatas=res.data;
			   zdDatas.map((param)=>{
					 let obj={
					 label:param.dictLabel,
					 value:param.dictValue};
					 roomUnitArray.push(obj);
				});
			});
			return roomUnitArray;
		},
		/* 获取楼层 */
		getFloorType(){
			let floorTypeArray=[];
			let dictType="floor_type_code";
			this.$u.api.getDictDataApi(dictType).then(res => {
			   let zdDatas=res.data;
			   zdDatas.map((param)=>{
					 let obj={
					 label:param.dictLabel,
					 value:param.dictValue};
					 floorTypeArray.push(obj);
				});
			});
			return floorTypeArray;
		},
		/***
		* 房源图片上传时触发
		**/
		changeImageAction(res){
		   let responseStr =res.data;
		   let resData =JSON.parse(responseStr);
		   if(resData.code==200) {
			  let fileDataObj ={imageName: resData.fileName,
			              	 imagePath:  resData.realName,
			                  imgUrl: resData.url, 
			             	 imageSize: 0};
			  this.fileList.push(fileDataObj);   
		   }else{
			   this.$mytip.toast('该图片上传有误,请重试!');
		   }
		},
		//房源图片删除时触发
		imageDeleteAction(e){
		   this.fileList.splice(e.index,1)
		},
		/***
		* 获取选中的房源图片
		**/
		getChouseImage(){
			 let imageList =this.fileList;
			 if(imageList.length==0){
				 this.$mytip.toast('至少选择一张房源图片上传!');
				 return;
			 }
			this.model.imageList = imageList
		},
		/* 选择详细地址 */
		selectAddressConfirm(e){
			this.model.detailAddress = ''
			e.map((val, index) => {
				if(index == 0){
					this.model.buildNum = val.label;
				}else if(index == 1){
					this.model.roomUnit =val.label;
				}else if(index == 2){
					this.model.floor = val.label;
				}
				this.model.detailAddress += val.label;
			});
		},
	    /* 选择户型 */
		selectHouseTypeConfirm(e){
			this.model.houseLayout="";
			e.map((val, index) => {
				if(index == 0){
					this.model.houseNum = val.label;
				}else if(index == 1){
					this.model.houseHall = val.label;
				}else if(index == 2){
					this.model.toiletNum = val.label;
				}
				let houseInfo = this.model.houseNum + this.model.houseHall + this.model.toiletNum;
				this.model.houseLayout = houseInfo;
			});
		},
		/* 
		 选择建成年份
		 */
		selectbuildYearConfirm(e){
			e.map((val, index) => {
				this.model.houseBuildYear = val.value;
			});
		},
		/* 
		 获取建成年份数据
		 默认加载1990到今年的数据
		 */
		getBuildYearList(){
			this.buildYearList=[];
			let dictType="build_year_type";
			this.$u.api.getDictDataApi(dictType).then(res => {
			   let zdDatas=res.data;
			   zdDatas.map((param)=>{
					 let obj={
					 label:param.dictLabel,
					 value:param.dictValue};
					 this.buildYearList.push(obj);
				});
			});
		},
		// 房屋朝向
		directionConfirm(e){
			e.map((val, index) => {
				this.model.direction = val.value;
			});
		},
		/* 选择楼梯数据 */
		selectFloorConfirm(e){
			e.map((val, index) => {
				this.model.stepType = val.value;
			});
		},
		/* 获取楼梯数据 */
		getFloorList(){
			this.floorList=[];
			let dictType="step_type";
			this.$u.api.getDictDataApi(dictType).then(res => {
			   let zdDatas=res.data;
			   zdDatas.map((param)=>{
					 let obj={
					 label:param.dictLabel,
					 value:param.dictValue};
					 this.floorList.push(obj);
				});
			});
			if(this.fileList.length>0){
		    	this.model.floorVo = this.floorList[0].value;	 	
			}
		},
		/* 获取户型信息 */
		getHuXingList(parm){
		    let huxingList=[];
			this.$u.api.getDictDataApi(parm).then(res => {
			   let zdDatas=res.data;
			   zdDatas.map((param)=>{
					 let obj={
					 label:param.dictLabel,
					 value:param.dictValue};
					 huxingList.push(obj);
				});
			});
			return huxingList;
		},
		/* 加载房屋朝向数据 */
		getDirectionList(){
			this.directionList=[];
			let dictType="direction_type";
			this.$u.api.getDictDataApi(dictType).then(res => {
			   let zdDatas=res.data;
			   zdDatas.map((param)=>{
					 let obj={
					 label:param.dictLabel,
					 value:param.dictValue};
					 this.directionList.push(obj);
				});
			});
		},
		/* 房源亮点选择 */
		checkboxGroupChange(e) {
			let featureList = e.map(val => {
				return {
					feature: val
				}
			})
			this.model.featureList = featureList
		},
		/* 获取发布性质数据 */
		getPubQualityList(){
			this.pubQualityList=[];
			let dictType="house_pub_type";
			this.$u.api.getDictDataApi(dictType).then(res => {
			   let zdDatas=res.data;
			   zdDatas.map((param)=>{
					 let obj={
					 label:param.dictLabel,
					 value:param.dictValue};
					 this.pubQualityList.push(obj);
				});
			});
		   if(this.pubQualityList.length>0){
			    this.model.houseType = this.pubQualityList[0].value;
			    this.model.houseTypeName = this.pubQualityList[0].label;
		   }	 
		},
		/* 获取学区数据 */
		getLearnAreaList(){
	    	this.learnAreaList=[];
	    	this.$u.api.getVillageListApi({
			   //city:uni.getStorageSync('lifeData').vuex_city,
			   businessType:"learnArea",
			   orderByColumn: 'name',
			   isAsc: 'desc'
			 }).then(result => {
				const data = result.rows
				for (let i = 0; i < data.length; i++) {
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = data[i]
					this.learnAreaList.push({
						label: item.name,
						value: item.id
					})
				}
			   return data
		   });	
		},
		changeAddressConfig(address,lon,lat){
			this.model.address = address
			this.model.longitude= lon
			this.model.latitude= lat
		},
		//系统内是否启用了微信支付
		 isEnabledWeChatPay(){
			 let that = this;
			this.$u.api.isEnabledWeChatPayConfigApi().then(result=>{
				  let isEnableStatus = result.msg;
				  that.weChatPayEnableStatus = result.msg;
			});
		 },
		 //自动生成订单号
		autoGenerateOrderNumber(){
			 this.$u.api.generatePublicOrderNumberApi().then(result=>{
				  let orderNumber = result.data;
				  this.publishOrderNumber = orderNumber;
			 });
		},
		 //移除发布订单信息
		removePubOrder(orderNumber){
			this.$u.api.removePubOrderApi(orderNumber).then(result=>{
				console.log(result);
			});
		},
		//发布时带支付
		publishWithWxPay(){
			 if( this.$u.test.isEmpty(this.publishOrderNumber)){
				 this.$mytip.errorToast("未获取到订单号信息,下单失败,请重试!");
				 return false;
			 }
			let noParam = this.publishOrderNumber;
			let that = this;
			 this.$u.api.createWeChatOrderApi({orderNumber:noParam,houseId:""})
			 .then(result=>{
				  let resultCode = result.code;
				  let responseData = result.data;
				  if(resultCode!=200){
					  return this.$mytip.toast('支付失败,下单有误,请稍后再试!')
					  return false;  
				  }
				 this.isShowLoading=true;
				  //打开微信支付窗口
				  uni.requestPayment({
				  	provider:'wxpay',
					nonceStr: responseData.nonceStr,
					package: responseData.packageValue,
					timeStamp: responseData.timeStamp,
					paySign: responseData.paySign,
					signType: responseData.signType,
					success:res=> {
						setTimeout(() =>{
							that.$u.api.confirmOrderIsPayApi(noParam)
							 .then(result=>{
								   this.isShowLoading=false;
								  let resultCode = result.data;
								  if(resultCode==1){
									    that.autoGenerateOrderNumber();
										that.submitHouseInfo();
								  }else{
									   that.$mytip.errorToast("支付失败,请重试!");
									   that.removePubOrder(noParam);
									   that.autoGenerateOrderNumber();
								  }
							});
						}, 1600);
					},
					fail:res=> {
						 this.isShowLoading=false;
						that.$mytip.failToast("您已取消支付!").then(res=>{
							//移除当前订单
							that.removePubOrder(noParam);
							//重新生成订单号
							that.autoGenerateOrderNumber();
						});
					}
				  });
			 });
		},
		/* 立即发布 */
		submit() {
		 	this.$refs.uForm.validate(valid => {
				if (valid) {
					//如果电话不为空则校验电话格式
					if(!this.$u.test.mobile(this.model.owerPhone)){
						return this.$mytip.toast('电话号码格式输入有误,请检查!')
					}
					//如果是出售则判断售价是否为空
					if(this.type==1){
						if(this.$u.test.isEmpty(this.model.sellPrice)){
							return this.$mytip.toast('请输入房屋售价!')
						 }
					}
					//如果为出租则判断租房价格是否为空
					if(this.type==2){
						if(this.$u.test.isEmpty(this.model.ratePrice)){
							return this.$mytip.toast('请输入房屋租金!')
						 }
					}
					//判断所发布房源在系统中是否已存在,存在则不可发布,不存在则发布
					this.$u.api.validHouseInfoIsRepeatApi(this.model)
					.then(resp=>{
						console.log(resp);
						 let data = resp.data;
						 if(data==1){
							 this.$mytip.toast('亲!,该位置房源已发布到平台,不要重复发布!');
							 return false;
						 }
						//如果系统未启用支付则直接发布房源信息
						if(this.weChatPayEnableStatus=="-1" || this.weChatPayEnableStatus==""){
						   this.submitHouseInfo();
							return;
						}else{
							this.publishWithWxPay();
							return;
						} 
					});
				} else {
				   this.$mytip.toast('请输入要发布的房源!')
				}
			}); 
		},
		// 提交房屋信息
		submitHouseInfo(){
			this.getChouseImage();
			let url = config.baseUrl+"/api/houseApi/saveHouse";
			this.$u.post(url,this.model).then(data => {
				 if(data.code==200){
					 uni.showModal({
						 title:'提示',
					 	 content:'发布成功,是否继续发布?',
						 confirmText:'继续发布',
						 cancelText:'返回首页',
						 success: res=> {
								if (res.confirm) {
									this.resetInput();
								} else if (res.cancel) {
									uni.$emit('findIndexHouseList',1);
									uni.switchTab({
										url:'/pages/index/index'
									});
								}
						 	}
					 });
				 }else{
					this.$mytip.failToast("当前位置房源入库有误,请稍后再试!");
				 }
			});	
		},
		// 选择小区
		selectConfirm(e) {
			e.map((val, index) => {
				this.model.villageId = val.value;
				this.model.villageName = val.label;
			})
		},
		/* 选择学区 */
		selectlearnAreaConfirm(e){
			e.map((val, index)=>{
				 this.model.learnVillageId = val.value;
				 this.model.learnAreaName =val.label;
				 this.findVillageList(val.value);
			});
		},
		/* 选择发布性质 */
		pubQualityAreaConfirm(e){
			e.map((val, index)=>{
				 this.model.houseTypeName =val.label;
				 this.model.houseType=val.value;
			});
		},
		decorationConfirm(e) {
			e.map((val, index) => {
				this.model.decoration = val.label;
			})
		},
		labelPositionChange(index) {
			this.labelPosition = index == 0 ? 'left' : 'top';
		},
		// 点击actionSheet回调
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.payType = this.actionSheetList[index].text;
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
		///载入小区数据
		findVillageList(id) {
			if(!id){
				return;
			}
			this.selectList=[];
			this.$u.api.getVillageListApi({
				   //city:uni.getStorageSync('lifeData').vuex_city,
				   businessType:"villageArea",
				   parentId:id,
				   orderByColumn: 'name',
				   isAsc: 'desc'
				 }).then(result => {
					const data = result.rows
					for (let i = 0; i < data.length; i++) {
						// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						let item = data[i]
						this.selectList.push({
							label: item.name,
							value: item.id
						})
					}
				   return data
			   });
		},
		findHouseById(houseId){
			let url = "api/houseApi/findHouseById";
			this.$u.get(url, {
				id: houseId
			}).then(result => {
				let room = result.data
				this.model = room
				let houseType = this.model.houseNum + this.model.houseHall + this.model.toiletNum
				if(houseType == 0){
					houseType = ''
				}
				//this.model.houseType = houseType
				// if(this.model.roomType == 1){
				// 	this.model.roomLabel = '主卧'
				// }else if(this.model.roomType == 2){
				// 	this.model.roomLabel = '次卧'
				// }
			});
		},
		chooseAddress() {
			this.$u.route({
				url: '/pages/chooseAddress/index'
			})
		},
	}
};
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
</style>
<style scoped lang="scss">
	
.wrap {
	padding: 30rpx;
    padding-bottom: 62px;
	height: 660px;
	overflow: auto;
}

/* 上传控件样式 */
.slot-btn {
	width: 160rpx;
	height: 160rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgb(244, 245, 246);
	border-radius: 10rpx;
}

.slot-btn__hover {
	background-color: rgb(235, 236, 238);
}
  
.bottom-btn {
	position: fixed;
	bottom: 8rpx;
	width: 100%;
	padding: 30rpx;
	border-top: 1rpx solid #eee;
	background-color: #FFFFFF;
	z-index: 9999;
}

</style>
