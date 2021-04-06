<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.update();
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		update() {
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log(res.hasUpdate);
			});

			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});

			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
			});
		}
	}
};
</script>

<style lang="scss">
@import './common/uni.css';
@import './uni.scss';
@font-face {
  font-family: 'iconfont';  /* project id 1611750 */
  src: url('//at.alicdn.com/t/font_1611750_kdehjh58lun.eot');
  src: url('//at.alicdn.com/t/font_1611750_kdehjh58lun.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1611750_kdehjh58lun.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1611750_kdehjh58lun.woff') format('woff'),
  url('//at.alicdn.com/t/font_1611750_kdehjh58lun.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1611750_kdehjh58lun.svg#iconfont') format('svg');
}
.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
/*每个页面公共css */
page {
	min-height: 100%;
	display: flex;
	font-family: PingFangSC-Medium;
}

/* #ifdef MP-BAIDU */
page {
	width: 100%;
	height: 100%;
	display: block;
}
swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
	width: 100%;
	min-height: 100%;
	display: flex;
}
.content {
	display: flex;
	flex: 1;
	flex-direction: column;
	/* background-color: #efeff4; */
	/* padding: 20upx; */
}

.input-group {
	background-color: #ffffff;
	margin-top: 40upx;
	position: relative;
}

.input-group::before {
	position: absolute;
	right: 0;
	top: 0;
	left: 0;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-group::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
}

.input-row .title {
	width: 20%;
	height: 50upx;
	min-height: 50upx;
	padding: 15upx 0;
	padding-left: 30upx;
	line-height: 50upx;
}

.input-row.border::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 15upx;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.btn-row {
	margin-top: 50upx;
	padding: 20upx;
}

button.primary {
	background-color: #0faeff;
}

.my-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.border {
	position: relative;
}
.border::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1rpx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: rgba(0, 0, 0, 0.1);
}
</style>
