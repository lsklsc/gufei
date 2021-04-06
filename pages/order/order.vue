<template>
	<view class="content">
		<view class="list">
			<view class="list-item border">
				<view class="item-title">
					<text class="iconfont">&#xe647;</text>
					<text class="name">预约时间</text>
				</view>
				<view class="item-content">
					<hTimePicker sTime="8" cTime="18" interval="30" timeNum="1" dayNum="1" @changeTime="changeTime">
						<view slot="pCon" class="changeTime item-content">
							<input type="text" value="" v-model="form.order_time" disabled="true" placeholder="请选择预约时间" />
							<text class="iconfont">&#xe62d;</text>
						</view>
					</hTimePicker>
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title">
					<text class="iconfont">&#xe7f8;</text>
					<text class="name">垃圾类型</text>
				</view>
				<view class="item-content" @tap="selectType">
					<input type="text" value="" v-model="form.rubbish_type_name" disabled="true" placeholder="请选择垃圾类型" />
					<text class="iconfont">&#xe62d;</text>
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title">
					<text class="iconfont">&#xe641;</text>
					<text class="name">垃圾桶数量</text>
				</view>
				<view class="item-content">
					<input type="number" maxlength="2" value="" v-model="form.can_count" placeholder="请填写垃圾桶数量" />
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title">
					<text class="iconfont">&#xe61f;</text>
					<text class="name">联系人</text>
				</view>
				<view class="item-content">
					<input type="text" value="" v-model="form.contact" maxlength="4" placeholder="请填写联系人姓名" />
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title">
					<text class="iconfont">&#xe633;</text>
					<text class="name">联系电话</text>
				</view>
				<view class="item-content">
					<input type="number" maxlength="11" value="" v-model="form.contact_phone" placeholder="请填写联系人电话" />
				</view>
			</view>
			<button type="primary" class="login-button" @tap="subOrder">提交</button>
		</view>
	</view>
</template>

<script>
	import hTimePicker from "@/components/h-timePicker/h-timePicker.vue";
	import WxValidate from '../../common/WxValidate.js';
	const TYPES = ['废弃油脂'];
	export default {
		components: {
			hTimePicker
		},
		data() {
			return {
				form: {
					order_time: '',
					rubbish_type_name: '',
					can_count: '',
					contact: '',
					contact_phone: ''
				}
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		onLoad() {
			this.initValidate();
		},
		methods: {
			selectType() {
				uni.showActionSheet({
					itemList: TYPES,
					success: (res) => {
						this.form.rubbish_type_name = TYPES[res.tapIndex];
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			changeTime(res) {
				console.log(res);
				this.form.order_time = res;
			},
			// 提交表单
			subOrder() {
				if (!this.WxValidate.checkForm(this.form)) {
					const error = this.WxValidate.errorList[0];
					this.$showToast(error.msg);
					return false;
				}
				this.form.org = this.userInfo.id;
				this.$showLoading('提交中');
				this.$api.submitOrder(this.form).then(res => {
					if (res.data.code === 0) {
						this.$showModal('可前往“收运记录>预约记录”查看', () => {
							uni.navigateBack({
								delta: 1
							});
						}, '提交成功');
					} else {
						this.$showToast('提交失败');
					}
				});

			},
			// 提交表单验证
			initValidate() {
				// 验证字段的规则
				const rules = {
					order_time: {
						required: true,
					},
					rubbish_type_name: {
						required: true,
					},
					can_count: {
						required: true,
						min: 1
					},
					contact: {
						required: true,
						rangelength: [2, 4]
					},
					contact_phone: {
						required: true,
						tel: true
					},
				};
				// 验证字段的提示信息，若不传则调用默认的信息
				const messages = {
					order_time: {
						required: '请选择时间',
					},
					rubbish_type_name: {
						required: '请选择垃圾类型',
					},
					can_count: {
						required: '请输入桶数',
						min: '桶数不能少于1桶'
					},
					contact: {
						required: '请输入联系人姓名',
						rangelength: '请输入2到4个字之间的姓名'
					},
					contact_phone: {
						required: '请输入手机号',
						tel: '请输入正确的手机号'
					}
				};

				// 创建实例对象
				this.WxValidate = new WxValidate(rules, messages);
			},
		}
	};
</script>

<style lang="scss">
	.content {
		padding: 30rpx;
	}

	.list {
		width: 100%;

		.list-item {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0rpx;
			box-sizing: border-box;

			.item-title {
				width: 35%;

				.iconfont {
					margin-right: 10rpx;
					color: $base-color;
					font-size: 55rpx;
					vertical-align: middle;
				}

				.name {
					font-size: 32rpx;
					color: #333;
					vertical-align: middle;
				}

			}

			.item-content {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.time {
					border: 1px solid #007AFF;
					height: 100%;
					width: 100%;
				}

				input {
					flex: 1;
					text-align: right;
					color: #333;
					font-size: 32rpx;
					line-height: 1;
					height: 80rpx;
				}
			}

			.changeTime {
				width: 100%;
			}
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
		width: 80%;
	}

	.login-button::before,
	.login-button::after {
		border: none;
	}
</style>
