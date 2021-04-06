<template>
	<view class="content">
		<view class="header">
			<text class="title">密码重置</text>
		</view>
		<view class="login">
			<view class="box account-box">
				<text class="title">请输入您要重置的账号</text>
				<input type="text" v-model="form.username" class="input" maxlength="10" placeholder="账号" />
			</view>
			<button type="primary" class="login-button" @tap="reset">重置密码</button>
		</view>
	</view>
</template>

<script>
	import WxValidate from '../../common/WxValidate.js';
	export default {
		data() {
			return {
				checked: false,
				form: {
					username: ''
				}
			};
		},
		onLoad() {
			this.initValidate();
		},
		methods: {
			choose() {
				this.checked = !this.checked;
			},
			reset() {
				if (!this.WxValidate.checkForm(this.form)) {
					const error = this.WxValidate.errorList[0];
					this.$showToast(error.msg);
					return false;
				}
				this.$showLoading('提交中');
				this.$api.login(this.form).then(res => {
					if (res.data.code === 0) {
						this.remember();
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('user_id', res.data.user_id);
						this.$store.dispatch('getUserInfo');
						uni.navigateBack({
							delta: 1
						});
					}
					this.form.code = '';
				});

			},
			// 提交表单验证
			initValidate() {
				// 验证字段的规则
				const rules = {
					username: {
						required: true,
					},
				};
				// 验证字段的提示信息，若不传则调用默认的信息
				const messages = {
					username: {
						required: '请输入账号',
					},
				};

				// 创建实例对象
				this.WxValidate = new WxValidate(rules, messages);
			},
		}
	};
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.content {
		height: 100%;
	}

	.header {
		height: 50%;
		background-color: $base-color;
		color: #fff;
		font-size: 52rpx;
		padding: 0 50rpx;
		display: flex;
		justify-content: space-between;

		.title-r {
			font-size: 100rpx;
			color: $base-color;
			text-shadow: 0rpx 0rpx 0rpx rgba($color: #fff, $alpha: 0.3);
			font-weight: 900;
		}
	}

	.login {
		width: 676rpx;
		height: 50%;
		background-color: #fff;
		position: absolute;
		left: 37rpx;
		top: 160rpx;
		box-shadow: 0rpx 20rpx 40rpx 0rpx rgba(21, 87, 79, 0.04);
		border-radius: 36rpx;
		padding: 80rpx 50rpx;
		box-sizing: border-box;

		.box {
			.title {
				font-size: 32rpx;
				font-weight: 700;
				color: #1a1a1a;
			}

			.input {
				height: 90rpx;
				border-radius: 8rpx;
				border: 2rpx solid rgba(0, 0, 0, 0.08);
				margin-top: 10rpx;
				padding-left: 30rpx;
			}

			.input-placeholder {
				color: #cfcfcf;
			}
		}

		.box.password-box {
			margin-top: 50rpx;
		}
	}

	.set {
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;

		.remember {
			font-size: 24rpx;

			.checkbox {
				width: 32rpx;
				height: 32rpx;
				display: inline-block;
			}

			.iconfont {
				color: #fff;
				background-color: $base-color;
				vertical-align: middle;
				text-align: center;
				line-height: 32rpx;
			}

			.unselect {
				border: 3rpx solid #cfcfcf;
				vertical-align: middle;
				box-sizing: border-box;
			}

			.text {
				color: #cfcfcf;
				margin-left: 10rpx;
				vertical-align: middle;
			}
		}

		.forget {
			font-size: 24rpx;
			color: $base-color;
		}
	}

	.login-button[type=primary] {
		background-color: $base-color;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 32rpx;
		border-radius: 45rpx;
		margin-top: 70rpx;
	}

	.login-button::before,
	.login-button::after {
		border: none;
	}
</style>
