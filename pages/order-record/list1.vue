<template>
	<view class="content">
		<view class="list">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<view class="header item border">
					<text class="time">预约时间：{{item.order_time | momentFormateHMS}}</text>
				</view>
				<view class="body item border">
					<text class="weight">垃圾类型：{{item.rubbish_type_name || '无'}}</text>
					<text class="quality uni-ellipsis">桶数：{{item.can_count || 0}}</text>
				</view>
				<view class="body item">
					<text class="weight">状态：{{item.order_status_name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from 'common/utils.js'
	export default {
		data() {
			return {};
		},
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		filters:{
			momentFormate(time){
				return utils.momentFormate(time);
			},
			momentFormateHMS(time){
				return utils.momentFormateHMS(time);
			}
		},
		methods: {
		}
	};
</script>

<style lang="scss">
	.content {
		padding: 20rpx;

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
