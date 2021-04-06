<template>
	<view class="container">
		<view class="header">
			<image src="../../static/img/avatar.png" mode="aspectFill" class="avatar"></image>
			<text class="username" v-if="hasLogin">{{userInfo.org_name}}</text>
			<navigator v-else url="../login/login"><button type="primary" class="login">点击登录</button></navigator>
		</view>
		<view class="body">
			<view class="menu" hover-class="menu-hover" v-for="(item, index) in bodyMenus" :key="index" @tap="url(item)">
				<image :src="item.img" mode="aspectFill"></image>
				<text class="name">{{ item.title }}</text>
			</view>
		</view>
		<view class="footer">
			<view class="list">
				<uni-list>
					<uni-list-item :title="item.title" :show-extra-icon="false" class="item" v-for="(item, index) in footerMenus" :key="index"
					 @click="url(item)">
						<template #icon>
							<rich-text :nodes="item.icon"></rich-text>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import {
		bodyMenus,
		footerMenus
	} from './menus.js';
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				bodyMenus,
				footerMenus
			};
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin;
			},
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		methods: {
			url(item) {
				if(this.hasLogin){
					if(item.url){
						uni.navigateTo({
							url: item.url
						});
					}else{
						uni.showModal({
							title: '',
							content: '您确定要退出登录吗？',
							showCancel: true,
							cancelText: '取消',
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									item.method.apply(this);
								}
							}
						});
					}
				}else{
					this.openLogin();
				}
			},
			// 登录
			openLogin(){
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
			}
		}
	};
</script>

<style lang="scss">
	.container {
		padding: 40rpx;
		background-color: #f8f9fa;
		width: 100%;
	}

	.header {
		display: flex;
		align-items: center;

		.avatar {
			width: 144rpx;
			height: 144rpx;
			margin-right: 38rpx;
		}

		.login[type='primary'] {
			height: 60rpx;
			margin: 0;
			line-height: 60rpx;
			background-color: $base-color;
			font-size: 30rpx;
			border-radius: 30rpx;
		}

		.login::before,
		.login::after {
			border: none;
		}

		.username {
			font-size: 40rpx;
		}
	}

	.body {
		margin-top: 55rpx;
		width: 100%;
		height: 180rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		border-radius: 18rpx;

		.menu {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
			font-size: 24rpx;

			image {
				width: 70rpx;
				height: 70rpx;
				margin-bottom: 10rpx;
			}
		}

		.menu.menu-hover {
			background-color: #f1f1f1;
			transition: 0.1s all;
		}
	}

	.footer {
		margin-top: 30rpx;

		.list {
			border-radius: 20rpx;
			overflow: hidden;

			.item {
				.iconfont {
					font-size: 30rpx;
					color: $base-color;
					vertical-align: middle;
				}
			}
		}
	}
</style>
