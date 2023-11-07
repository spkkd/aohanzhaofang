<script>
	export default {
		onLaunch: function () {
			 this.chckUpdate();
		},
		onShow: function() {
			 this.chckUpdate();
		},
		methods:{
			chckUpdate(){
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function (res) {
				  // 请求完新版本信息的回调
				  console.log("===="+JSON.stringify(res));
				  if(res.hasUpdate == true){
					console.log("正在更新");
					updateManager.onUpdateReady(function (res) {
					  uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
						  console.log(res,'新版本下载完')
						  if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						  }
						}
					  });
					});
					updateManager.onUpdateFailed(function (res) {
					  // 新的版本下载失败
					  uni.showModal({
						title:'更新失败',
						content: '很抱歉未能更新成功。您可以尝试重新进入，或者在微信界面下拉，在最近使用中找到此小程序，长按将其拖拽到底部删除按钮中，然后重新搜索小程序进入。给您带来的不便，深表歉意！',
						showCancel:false,
					  });
					});
				  }else{
					 console.log("未检测到更新");
				  }
				});
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
