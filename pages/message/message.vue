<template>
	<view class="content">
		<view class="list">
			<view class="item border" v-for="(item,index) in list" :key="index">
				<view class="msg">
					{{item.message}}
				</view>
				<!-- <text class="reason">拒绝原因：xxxxxx</text> -->
			</view>
			<view class="msg" v-if="list.length===0">
				暂无消息
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.notifications();
		},
		methods: {
			notifications() {
				this.$api.notifications().then(res => {
					this.list = res.data.data.results;
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {}

	.list {
		padding: 10rpx;

		.item {
			padding: 30rpx 20rpx;

			.msg {
				color: #333333;
				font-size: 32rpx;
			}

			.reason {
				color: #999;
				font-size: 28rpx;
			}
		}
	}
	.msg{
		padding: 100rpx;
		text-align: center;
	}
</style>
