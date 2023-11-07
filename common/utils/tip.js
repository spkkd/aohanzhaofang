// 不含icon提示框
const toast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "none",
			duration: 3000,
			success: () => {
				setTimeout(() => {
					resolve
				}, 3000)
			}
		})
	})
};
// 成功提示框
const successToast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "success",
			duration: 5000,
			success: () => {
				setTimeout(() => {
					resolve()
				}, 3000)
			}
		})
	})
};
//失败提示框
const failToast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "fail",
			duration: 5000,
			success: () => {
				setTimeout(() => {
					resolve()
				}, 3000)
			}
		})
	})
};
//系统异常提示框
const errorToast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "error",
			duration: 3000,
			success: () => {
				setTimeout(() => {
					resolve()
				}, 3000)
			}
		})
	})
};
// loading
const showLoading = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			success: () => {
				resolve()
			}
		})
	})
};
// tipLoading ==>提示loading
const tipLoading = str => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: str,
			success: () => {
				resolve()
			}
		})
	})
};
// 隐藏loading
const hideLoading = () => {
	return new Promise((resolve, reject) => {
		uni.hideLoading({
			success: () => {
				resolve()
			}
		})
	})
};
export default {
	toast: toast,
	successToast: successToast,
	failToast:failToast,
	errorToast:errorToast,
	showLoading: showLoading,
	tipLoading: tipLoading,
	hideLoading: hideLoading,
}