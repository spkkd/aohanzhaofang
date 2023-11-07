//服务后台访问地址
let baseUrl ='https://localhost:8080'
//静态文件资源访问路径
let staticUrl = baseUrl +"/profile";
//空房源图片时图片访问路径
let emptyHouseImageFaceUrl=staticUrl+"/file/emptyHouse.png";
//系统名称
let appName="敖汉找房平台"
// 版本号 用于更新
let version = 1;
// vuex_version版本号 用于显示
let vuex_version = '1.0.' + version;
// 是否需要热更新（后台自动更新）
let flag_hot = false;

export default {
	baseUrl: baseUrl,
	staticUrl:staticUrl,
	version: version,
	vuex_version: vuex_version,
	appSystemName:appName,
	defaultHouseImageUrl:emptyHouseImageFaceUrl
}

