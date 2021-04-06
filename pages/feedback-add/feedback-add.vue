<template>
	<view class="content">
		<view class="list">
			<view class="list-item border">
				<view class="item-title">
					<!-- <text class="iconfont">&#xe61f;</text> -->
					<text class="name">意见反馈对象</text>
				</view>
				<view class="item-content"><input type="text" maxlength="8" v-model="form.aim_car" placeholder="请输入车牌号(例:京A88888)" /></view>
			</view>
			<view class="list-item border" @click="showPicker">
				<view class="item-title">
					<!-- <text class="iconfont">&#xe647;</text> -->
					<text class="name">案件发生时间</text>
				</view>
				<view class="item-content">
					<hTimePicker sTime="8" cTime="18" interval="30" timeNum="1" dayNum="1" @changeTime="changeTime">
						<view slot="pCon" class="changeTime item-content">
							<!-- <input type="text" v-model="form.happen_time" disabled="true" placeholder="请选择案件发生时间" /> -->
							<view class="happenTime" :class="form.happen_time ? '' : 'happenTimeValue'">{{ form.happen_time || '请选择案件发生时间' }}</view>
							<text class="iconfont">&#xe62d;</text>
						</view>
					</hTimePicker>
				</view>
			</view>
			<view class="list-item">
				<view class="item-title">
					<!-- <text class="iconfont">&#xe647;</text> -->
					<text class="name">意见反馈类型</text>
				</view>
			</view>
			<view class="list-item">
				<view class="input-row-content">
					<view class="row">
						<view class="select" v-for="(item, index) in cType" :key="index" :class="{ selected: form.opinion_type === item.id }" @click="select(item.id)">
							{{ item.type_name }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="textarea-box">
			<view class="box">
				<textarea value="" v-model="form.opinion_detail" placeholder="请具体描述您的问题…" maxlength="100" class="textarea" />
				<view class="words">{{ wordsLength }} /100</view>
			</view>
			<!-- <view class="upload-box">
				<robby-image-upload
					v-model="imageData"
					@delete="deleteImage"
					@add="addImage"
					:limit="limitNumber"
					:server-url="serverUrl"
					:file-key-name="fileKeyName"
					:form-data="formData"
				></robby-image-upload>
				<view class="imgNum">已添加0/4张图片</view>
			</view> -->
			<view class="footer-box">
				<button type="primary" class="commit" @tap="submit">提交</button>
				<view class="history"><navigator url="../feedback-list/feedback-list" class="history-btn">反馈历史></navigator></view>
			</view>
		</view>
		<w-picker
			:visible.sync="visible"
			:disabled-after="disabledAfter"
			mode="date"
			startYear="2020"
			:endYear="endYear"
			fields="second"
			:current="true"
			@confirm="onConfirm"
			ref="range"
			themeColor="#f00"
		></w-picker>
	</view>
</template>

<script>
import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
import wPicker from '@/components/w-picker/w-picker.vue';
import WxValidate from '../../common/WxValidate.js';
import utils from '../../common/utils.js';
export default {
	components: { robbyImageUpload, wPicker },
	data() {
		return {
			form: {
				aim_car: '',
				happen_time: '',
				opinion_detail: '',
				opinion_type: ''
			},
			// 图片上传
			enableDel: false,
			enableAdd: false,
			enableDrag: false,
			limitNumber: 3,
			imageData: [],
			fileKeyName: 'file',
			serverUrl: '',
			serverUrlDeleteImage: '',
			formData: {
				filemkdir: 'workflow'
			},
			endYear: new Date().getFullYear(),
			rangeDval: [utils.momentFormate(new Date()), utils.momentFormate(new Date())],
			cType: [],
			visible: false,
			disabledAfter: false
		};
	},
	onLoad() {
		// 服务器上传图片地址
		this.serverUrl = this.$api.uploadurl;
		this.initValidate();
		this.complainType();
	},
	computed: {
		wordsLength() {
			return this.form.opinion_detail.length;
		},
		userInfo() {
			return this.$store.state.userInfo;
		}
	},
	methods: {
		// 删除图片
		deleteImage: function(e) {
			console.log(e);
		},
		// 新增图片
		addImage: function(e) {
			console.log(e);
		},
		submit() {
			if (!this.WxValidate.checkForm(this.form)) {
				const error = this.WxValidate.errorList[0];
				this.$showToast(error.msg);
				return false;
			}
			let org = this.userInfo.id;
			let form = Object.assign({}, { org }, this.form);
			this.$showLoading('提交中');
			this.$api.opinion(form).then(res => {
				if (res.data.code === 0) {
					this.$showModal('提交成功', () => {
						uni.navigateBack({
							delta: 1
						});
					});
				}
			});
		},
		// 提交表单验证
		initValidate() {
			// 验证字段的规则
			const rules = {
				aim_car: {
					required: true,
					carNum: true
				},
				happen_time: {
					required: true
				},
				opinion_type: {
					required: true
				},
				opinion_detail: {
					required: true
				}
			};
			// 验证字段的提示信息，若不传则调用默认的信息
			const messages = {
				aim_car: {
					required: '请输入车牌号',
					carNum: '请输入正确的车牌号'
				},
				happen_time: {
					required: '请选择案件发生时间'
				},
				opinion_type: {
					required: '请选择意见反馈类型'
				},
				opinion_detail: {
					required: '请输入具体描述'
				}
			};

			// 创建实例对象
			this.WxValidate = new WxValidate(rules, messages);
		},
		// 获取投诉类型
		complainType() {
			this.$api.complainType().then(res => {
				this.cType = res.data.data;
			});
		},
		// 单选
		select(index) {
			this.form.opinion_type = index;
		},
		showPicker() {
			this.$refs.range.show();
		},
		hidePicker() {
			this.$refs.range.hide();
		},
		onConfirm(e) {
			this.form.happen_time = e.result;
		}
	}
};
</script>

<style lang="scss">
.content {
	width: 100%;
}
.list {
	width: 100%;
	padding: 20rpx;
	box-sizing: border-box;
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
				border: 1px solid #007aff;
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
			.happenTime {
				font-size: 30rpx;
			}
			.happenTimeValue{
				color: rgb(133, 133, 133);
			}
		}
		.input-row-content {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.row {
				display: flex;
				flex-wrap: wrap;
			}
			.select {
				// width: 160rpx;
				padding: 0 10rpx;
				height: 46rpx;
				line-height: 46rpx;
				font-size: 24rpx;
				text-align: center;
				border: 1px solid #666;
				margin: 10rpx;
			}
			.selected {
				border: 1px solid rgb(36,155,118);
				color: rgb(36,155,118);
			}
		}
	}
}
.textarea-box {
	background-color: #faf9f9;
	padding: 10rpx 0 20rpx 0;
	height: 400rpx;
	padding-bottom: 20rpx;
	.box {
		box-sizing: border-box;
		background-color: #fff;
		padding: 50rpx 40rpx;
		height: 100%;
		.textarea {
			width: 100%;
			height: 100%;
			font-size: 32rpx;
			text-align: justify;
		}
		.words {
			text-align: right;
			color: #999;
		}
	}
}
.upload-box {
	padding: 10rpx 20rpx;
	color: #999;
	.imgNum {
		padding: 0 20rpx;
	}
}
.footer-box {
	text-align: center;
	.commit {
		width: 634rpx;
		height: 90rpx;
		margin-top: 50rpx;
		border-radius: 45rpx;
		background-color: $base-color;
	}
	.history {
		margin-top: 30rpx;
		color: #5a6b65;
	}
	.history-btn {
		width: 180rpx;
		margin-top: 0 auto;
		display: inline-block;
	}
}
</style>
