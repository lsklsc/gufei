<template>
	<view class="content">
		<view class="qr-box">
			<view class="qrcode">
				<!-- <view class="qrimg">
					<tki-qrcode ref="qrcode" :cid="cid" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground"
					 :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
					 :usingComponents="usingComponents" :showLoading="showLoading" :loadingText="loadingText" @result="qrR" />
				</view> -->
				<view class="qrimg">
					<image :src="qr_code" mode=""></image>
				</view>
				<!-- <view class="info info-mt">
					身份：水淀粉分
				</view>
				<view class="info">
					身份：水淀粉分
				</view> -->
			</view>
		</view>
		<view class="download-box">
			<view class="down" @tap="saveQrcode">
				<view class="iconfont"></view>
				保存二维码
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				cid: 'qrcode',
				val: '二维码', // 要生成的二维码值
				size: 350, // 二维码大小
				unit: 'upx', // 单位
				background: '#fff', // 背景色
				foreground: '#000', // 前景色
				pdground: '#000', // 角标色
				icon: '../../static/img/avatar.png', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				qr_code: ''
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			},
			baseurl() {
				return this.$api.baseurl;
			}
		},
		onLoad() {
			this.qr_code = this.baseurl + this.userInfo.qr_code;
			console.log(this.userInfo)
		},
		methods: {
			saveQrcode() {
				console.log(111)
				// this.$refs.qrcode._saveCode()
				uni.downloadFile({
					url: this.qr_code,
					success: (res) => {
						console.log(res);
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: '二维码保存成功',
										icon: 'success',
										duration: 2000
									});
								}
							});
						}
					}
				});
			},
			qrR(res) {
				console.log(res);
			}
		}
	}
</script>

<style lang="scss">
	view {
		box-sizing: border-box;
	}

	.content {
		width: 100%;

		.qr-box {
			width: 100%;
			display: flex;
			justify-content: center;
			padding: 50rpx 0;

			.qrcode {
				// border-radius: 30rpx;
				display: inline-block;
				// background-color: $base-color;
				display: flex;
				justify-content: center;
				flex-direction: column;
				// padding: 50rpx;
				padding-bottom: 100rpx;
				color: #fff;

				.qrimg {
					width: 540rpx;
					height: 672rpx;
					background-color: #fff;
					display: inline-block;
					margin: 0 auto;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.info-mt {
				margin-top: 20rpx;
			}
		}

		.download-box {
			.down {
				text-align: center;
				color: $base-color;

				.iconfont {
					margin: 0 auto;
					font-size: 60rpx;
					width: 104rpx;
					line-height: 104rpx;
					text-align: center;
					color: #fff;
					border-radius: 50%;
					background-color: $base-color;
				}
			}
		}
	}
</style>
