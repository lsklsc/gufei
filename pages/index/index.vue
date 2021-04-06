<template>
	<view class="content">
		<nav-bar backState="2000">
			<view slot="left" class="bar-left" @click="msg">
				<text class="iconfont">&#xe621;</text>
				<text class="badge" v-if="num > 0">{{ num }}</text>
			</view>
			<view class="">首页</view>
		</nav-bar>
		<banner :list="bannerList"></banner>
		<view class="menus">
			<navigator url="" @click="open('../recordHome/recordHome')">
				<view class="menu menu-2"></view>
			</navigator>
			<navigator url="" class="opticy"> <!-- @click="open('../order/order')" 解开把事件加上去-->
				<view class="menu menu-1"></view>
			</navigator>
			<navigator url="" @click="open('../feedback-add/feedback-add')">
				<view class="menu menu-4"></view>
			</navigator>
			<navigator url="" @click="open('../reduce-garbage/reduce-garbage')">
				<view class="menu menu-3"></view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar';
	import banner from '@/components/banner.vue';
	export default {
		components: {
			navBar,
			banner
		},
		data: () => ({
			num: 0,
			form: {}
		}),
		computed: {
			bannerList() {
				return ['../static/img/banner.png'];
			},
			hasLogin() {
				return this.$store.state.hasLogin;
			},
			userInfo() {
				return this.$store.state.userInfo;
			},
		},
		watch: {
			hasLogin() {
				this.notifications();
			}
		},
		onLoad() {
			this.$store.dispatch('getUserInfo');
		},
		methods: {
			msg() {
				this.num = 0;
				if (this.hasLogin) {
					uni.navigateTo({
						url: '../message/message'
					});
				} else {
					this.openLogin();
				}

			},
			open(url) {
				if (this.hasLogin) {
					uni.navigateTo({
						url
					});
				} else {
					this.openLogin();
				}
			},
			// 登录
			openLogin() {
				uni.showModal({
					title: '您还未登录',
					content: '是否现在登录？',
					showCancel: true,
					cancelText: '暂不登录',
					confirmText: '登录',
					success: res => {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login',
							});
						}
					}
				});
			},
			notifications() {
				this.$api.notifications({
					warn_count: true
				}).then(res => {
					this.num = res.data.data.warn_count;
				})
			}
		}
	};
</script>

<style lang="scss">
	.content {
		align-items: auto;
	}

	.bar-left {
		padding-left: 30rpx;
		line-height: 1;
		position: relative;

		.iconfont {
			font-size: 50rpx;
		}

		.badge {
			display: inline-block;
			background-color: red;
			border: 10rpx;
			color: #fff;
			padding: 5rpx 8rpx;
			font-size: 16rpx;
			border-radius: 80rpx;
			position: absolute;
			left: 70%;
		}
	}

	.menus {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.menu {
			width: 326rpx;
			height: 238rpx;
			background-size: 100%;
			margin-bottom: 30rpx;
		}

		.menu-1 {
			background-image: url(../../static/img/order-add.png);
		}

		.menu-2 {
			background-image: url(../../static/img/order-hitory.png);
		}
		.menu-3 {
			background-image: url(../../static/img/day.png);
		}
		.menu-4 {
			background-image: url(../../static/img/advice.png);
		}
		.opticy{
			opacity: 0.5;
		}
	}
</style>
