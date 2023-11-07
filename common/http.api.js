// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
import config from "./config.js" // 全局配置文件
///加载小区/学区数据接口
const getVillageListUrl="/api/houseApi/findVillageList";
//获取字典数据接口
const getDictDataUrl="/api/common/getDictData/";
//获取上传路径
const uploadFileUrl=config.baseUrl+"/api/common/upload";
//获取首页挂接广告数据
const advertisementListUrl="/api/houseApi/getAdvertisementList";
/* 获取服务条目信息 */
const getServiceItemUrl="/api/cmsApi/getServiceItemByAjax";
//流量统计接口
const upFlowUrl="/api/flow/upFlow?type=MINI&uvCode=";
//上传头像接口
const uploadHeaderFileUrl="/api/common/uploadAvatar";
//更新头像信息
const updateProfileUrl="/api/profile/updateProfile";
//检验token是否过期 
const checkTokenIsExpireUrl="/api/profile/isExpiration"; 
//删除房源api
const removePubHouseUrl="/api/houseApi/removeHouse";
//收藏房源信息功能
const saveHouseHeartUrl="/api/houseApi/saveHeart"; 
//根据房源信息去重
const validHouseInfoIsRepeatUrl="/api/houseApi/validHouseInfoIsRepeat";
//微信支付相关功能接口
//自动生成发布房源时订单号
const generatePublicOrderNumberUrl="/api/housePay/generateOrderNumber";
//判断系统是否启用了微信支付
const isEnabledWeChatPayConfigUrl="/api/housePay/isEnabledWeChatPayConfig";
//微信统一下单接口
const createWeChatOrderUrl="/api/housePay/createOrder";
//根据支付订单号查询当前支付单号是否已支付接口
const confirmOrderIsPayUrl="/api/housePay/confirmOrderIsPay?payNo=";
//根据订单号移除当前订单信息
const removePubOrderUrl="/api/housePay/removePubOrder?orderNumber=";
const install = (Vue, vm) => {	
	let getVillageListApi=(params = {}) => vm.$u.get(getVillageListUrl,params)
    let getDictDataApi = (dictCode) => vm.$u.get(getDictDataUrl+dictCode);
	let getAdvertisementApi=()=> vm.$u.get(advertisementListUrl);
	let getServiceItemApi = (params = {}) => vm.$u.get(getServiceItemUrl,params);
	let upFlowApi = (uvCode) => vm.$u.post(upFlowUrl+uvCode);
    let updateProfileApi= (params = {})=>vm.$u.post(updateProfileUrl,params);
	let uploadHeaderFileApi= ()=>vm.$u.post(uploadHeaderFileUrl);
	let checkTokenIsExpireApi= (params = {}) => vm.$u.get(checkTokenIsExpireUrl,params);
	let removePubHouseApi = (params = {}) => vm.$u.get(removePubHouseUrl,params);
	let saveHouseHeartApi = (params = {}) => vm.$u.post(saveHouseHeartUrl,params);
	let validHouseInfoIsRepeatApi = (params = {}) => vm.$u.post(validHouseInfoIsRepeatUrl,params);
	//微信支付功能相关接口
	let generatePublicOrderNumberApi=()=>vm.$u.get(generatePublicOrderNumberUrl);
    let isEnabledWeChatPayConfigApi=()=>vm.$u.get(isEnabledWeChatPayConfigUrl);
	let createWeChatOrderApi =(params = {}) => vm.$u.post(createWeChatOrderUrl,params);
	let confirmOrderIsPayApi=(payNo) => vm.$u.get(confirmOrderIsPayUrl+payNo);
	//移除订单信息
	let removePubOrderApi=(orderNumber) => vm.$u.get(removePubOrderUrl+orderNumber);
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	Vue.prototype.$u.api={getVillageListApi,
						 getDictDataApi,
						 getAdvertisementApi,
						 uploadFileUrl,
						 getServiceItemApi,
						 upFlowApi,
						 uploadHeaderFileUrl,
						 updateProfileApi,
						 uploadHeaderFileApi,
						 checkTokenIsExpireApi,
						 removePubHouseApi,
						 saveHouseHeartApi,
						 generatePublicOrderNumberApi,
						 isEnabledWeChatPayConfigApi,
						 createWeChatOrderApi,
						 confirmOrderIsPayApi,
						 removePubOrderApi,
						 validHouseInfoIsRepeatApi};
}

export default {
	install
}