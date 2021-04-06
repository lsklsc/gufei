<template>
	<view class="content">
		<view class="list">
			<view class="list-item border">
				<view class="item-title"><text class="name">单位名称</text></view>
				<view class="item-content">
					<text>{{ result.org_name || '无' }}</text>
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">垃圾桶数(120L)</text></view>
				<view class="item-content">
					<text>{{ result.can_size120 || '0' }}桶</text>
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">垃圾桶数(240L)</text></view>
				<view class="item-content">
					<text>{{ result.can_size240 || '0' }}桶</text>
				</view>
			</view>
			<view class="list-item">
				<view class="item-title"><text class="name">现场照片</text></view>
			</view>
			<view class="empty" v-if="!imgs.length">暂无照片</view>
			<view class="list-item border imgs"><image :src="img" mode="aspectFill" v-for="(img, index) in imgs" :key="index" @tap="previewImage(index)"></image></view>
			<view class="list-item border">
				<view class="item-title"><text class="name">质量判定</text></view>
				<view class="item-content">
					<text>{{ result.quality || '无' }}</text>
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">描述</text></view>
				<view class="item-content">
					<text>{{ result.detail || '无' }}</text>
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">修正重量</text></view>
				<view class="item-content">
					<text>{{ result.weight2 || 0 }}kg</text>
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">上传人</text></view>
				<view class="item-content">
					<text>{{ result.creator  || '无' }}</text>
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">上传时间</text></view>
				<view class="item-content">
					<text>{{ result.create_time | momentFormateHMS }}</text>
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">上传地点</text></view>
				<view class="item-content">
					<text>{{ result.address || '无' }}</text>
				</view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">当前状态</text></view>
				<view class="item-content">
					<text :style="{ color: getColor()[result.complain_status].color }">{{ result.complain_status | getState }}</text>
				</view>
			</view>
			<!-- 处理中：2，处理失败：3，处理成功：4   处理中、成功或失败的时候显示 -->
			<block v-if="stateShow([2, 3, 4], result.complain_status)">
				<view class="list-item border">
					<view class="item-title"><text class="name">申诉时间</text></view>
					<view class="item-content">
						<text>{{ result.complain_time | momentFormateHMS }}</text>
					</view>
				</view>
				<view class="list-item border">
					<view class="item-title"><text class="name">申诉内容</text></view>
					<view class="item-content">
						<text>{{ result.content || '无' }}</text>
					</view>
				</view>
			</block>
			<!-- 处理失败：3，处理成功：4  只有成功或失败的时候显示 -->
			<block v-if="stateShow([3, 4], result.complain_status)">
				<view class="list-item border">
					<view class="item-title"><text class="name">处理时间</text></view>
					<view class="item-content">
						<text>{{ result.complain_deal_time | momentFormateHMS }}</text>
					</view>
				</view>
				<view class="list-item border">
					<view class="item-title"><text class="name">处理内容</text></view>
					<view class="item-content">
						<text>{{ result.fed_back || '无' }}</text>
					</view>
				</view>
			</block>
			<view class="btn-box" v-if="result.complain_status === 0">
				<button type="primary" @click="open()">申诉</button>
				<button type="primary" @click="satisfy()">满意</button>
			</view>
		</view>
		<!-- 遮罩 -->
		<uni-transition :mode-class="['fade']" :styles="maskClass" :show="show" @click="onTap" />
		<!-- 过渡 -->
		<uni-transition :duration="500" :mode-class="modeClass" :styles="transfromClass" :show="transShow" @change="change">
			<view class="box">
				<textarea v-model="content" placeholder="请输入申诉内容" />
				<view class="box-btn">
					<button type="primary" @click="onTap">取消</button>
					<button type="primary" @click="complain">提交</button>
				</view>
			</view>
		</uni-transition>
	</view>
</template>

<script>
import utils from '../../common/utils.js';
import { state } from '../../common/page-utils.js';
export default {
	data() {
		return {
			imgs: [],
			result: {},
			id: '',
			content: '',
			show: false,
			transShow: false,
			modeClass: ['fade'],
			maskClass: {
				position: 'fixed',
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
				'background-color': 'rgba(1,1,1,.4)'
			},
			transfromClass: {
				position: 'fixed',
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
				/* #ifndef APP-NVUE */
				display: 'flex',
				/* #endif */
				'justify-content': 'center',
				'align-items': 'center'
			}
		};
	},
	filters: {
		momentFormateHMS(time) {
			return utils.momentFormateHMS(time);
		},
		loadimg(img) {
			return this.baseurl + '/' + img;
		},
		getState(status = 0) {
			return state()[status].name;
		}
	},
	computed: {
		baseurl() {
			return this.$api.baseurl;
		}
	},
	async onLoad(options) {
		// this.result = JSON.parse(decodeURIComponent(options.data));
		this.id = options.id;
		this.detail();
	},
	methods: {
		//当前状态码下是否显示
		stateShow(arr, ele) {
			return arr.indexOf(ele) > -1;
		},
		// 满意
		satisfy() {
			let form = {
				terminal_id: this.id,
				complain_status: 1
			};
			this.satisfyComplain(form);
		},
		// 申诉
		complain() {
			if (!this.content.trim()) {
				this.$showToast('请填写申诉内容');
				return;
			}
			let form = {
				terminal_id: this.id,
				complain_status: 2,
				content: this.content
			};
			this.satisfyComplain(form);
		},
		// 申诉、满意提交
		satisfyComplain(form) {
			this.$showLoading('提交中');
			this.$api.satisfyComplain(form).then(res => {
				console.log(res);
				this.onTap();
				this.detail();
			});
		},
		// 获取详情
		async detail() {
			try {
				this.$showLoading('获取中');
				let detail = await this.getDetail(this.id);
				this.result = detail.data.data;
				this.getImgs();
				uni.hideLoading();
			} catch (e) {
				uni.hideLoading();
			}
		},
		// 获取详情接口
		getDetail(id) {
			return this.$api.dailyRecord({}, id);
		},
		// 预览图片
		previewImage(index) {
			uni.previewImage({
				current: index,
				urls: this.imgs
			});
		},
		// 获取图片
		getImgs() {
			let img = this.result.pic_list;
			if (img) {
				let imgs = img.split('&');
				for (var i = 0; i < imgs.length; i++) {
					imgs[i] = this.baseurl + '/' + imgs[i];
				}
				this.imgs = imgs;
			}
		},
		// 颜色
		getColor() {
			return state();
		},
		open() {
			this.transShow = !this.transShow;
			this.show = !this.show;
		},
		onTap() {
			this.transShow = this.show = false;
		},
		change() {
			console.log('触发动画');
		}
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

			input {
				flex: 1;
				text-align: right;
				color: #333;
				font-size: 32rpx;
				line-height: 1;
				height: 80rpx;
			}
		}
	}
	.empty {
		color: #ccc;
		font-size: 28rpx;
	}
	.imgs {
		display: flex;
		flex-wrap: wrap;

		image {
			width: 208rpx;
			height: 208rpx;
			margin-bottom: 10rpx;
			background-color: #f9f9f9;
			border-radius: 10rpx;
		}
	}
}
.btn-box {
	display: flex;
	justify-content: space-evenly;
	padding: 20rpx;
	button {
		width: 30%;
		border: 50rpx;
	}
}

.box {
	width: 500rpx;
	background-color: #fff;
	// padding: 20rpx;
	textarea {
		box-sizing: border-box;
		width: 100%;
		min-height: 300rpx;
		background-color: #f3f3f3;
		padding: 20rpx;
	}
	.box-btn {
		display: flex;
		padding: 30rpx 0;
		button {
			width: 40%;
		}
	}
}
</style>
