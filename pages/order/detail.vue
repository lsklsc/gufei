<template>
	<view class="content">
		<view class="list">
			<view class="list-item border">
				<view class="item-title"><text class="name">责任主体</text></view>
				<view class="item-content"><text>{{result.org_name || '无'}}</text></view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">垃圾桶数(120L)</text></view>
				<view class="item-content"><text>{{result.can_size120 || '0'}}桶</text></view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">垃圾桶数(240L)</text></view>
				<view class="item-content"><text>{{result.can_size240 || '0'}}桶</text></view>
			</view>
			<view class="list-item">
				<view class="item-title"><text class="name">现场照片</text></view>
			</view>
			<view class="list-item border imgs">
				<image :src="img" mode="aspectFill" v-for="(img, index) in imgs" :key="index" @tap="previewImage(index)"></image>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">质量判定</text></view>
				<view class="item-content"><text>{{result.quality || '无'}}</text></view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">描述</text></view>
				<view class="item-content"><text>{{result.detail || '无'}}</text></view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">修正重量</text></view>
				<view class="item-content"><text>{{result.weight2 || 0}}kg</text></view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">上传人</text></view>
				<view class="item-content"><text>{{result.creator  || '无'}}</text></view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">上传时间</text></view>
				<view class="item-content"><text>{{result.create_time | momentFormateHMS}}</text></view>
			</view>
			<view class="list-item border">
				<view class="item-title"><text class="name">上传地点</text></view>
				<view class="item-content"><text>{{result.address || '无'}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '../../common/utils.js'
	export default {
		data() {
			return {
				imgs: [],
				result: {}
			};
		},
		filters: {
			momentFormateHMS(time) {
				return utils.momentFormateHMS(time);
			},
			loadimg(img) {
				return this.baseurl + '/' + img
			}
		},
		computed: {
			baseurl() {
				return this.$api.baseurl;
			}
		},
		onLoad(options) {
			this.result = JSON.parse(decodeURIComponent(options.data));
			let imgs = this.result.pic_list.split('&');
			for (var i = 0; i < imgs.length; i++) {
				imgs[i] = this.baseurl + "/" + imgs[i];
			}
			this.imgs=imgs;
		},
		methods: {
			previewImage(index) {
				uni.previewImage({
					current: index,
					urls: this.imgs
				});
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
</style>
