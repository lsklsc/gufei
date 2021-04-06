<template>
	<view class="content">
		<view class="list">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<view class="header item border">
					<text class="time">时间：{{item.create_time | momentFormate}}</text>
					<text class="type">垃圾类型：{{item.rubbish_type_name || '无'}}</text>
				</view>
				<view class="body item border">
					<text class="weight">重量：{{item.weight || 0}}kg</text>
					<text class="quality uni-ellipsis">质量判定：{{item.quality || '暂无'}}</text>
				</view>
				<view class="footer item right"><text class="detail" @tap="detail(item)">查看详情</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from 'common/utils.js'
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getList();
		},
		filters: {
			momentFormate(time) {
				return utils.momentFormate(time);
			},
			momentFormateHMS(time) {
				return utils.momentFormateHMS(time);
			}
		},
		methods: {
			detail(item) {
				let data = encodeURIComponent(JSON.stringify(item));
				uni.navigateTo({
					url: './detail?data=' + data
				});
			},
			getList() {
				this.$api.reserveList().then(res => {
					this.list = res.data.data.results;
				})
			}
		}
	};
</script>

<style lang="scss">
	.content {
		padding: 20rpx;
		background-color: #F8F9FA;
		.list {
			
			.list-item {
				background-color: #fff;
				padding: 10rpx 20rpx;
				margin-bottom: 20rpx;

				text {
					flex: 1;
					font-size: 28rpx;
					font-weight: 400;
				}
			}

			.item {
				height: 82rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.right {
				text-align: right;
				color: $base-color;
			}
		}
	}
</style>
