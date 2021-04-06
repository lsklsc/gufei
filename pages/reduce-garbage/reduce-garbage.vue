<template>
	<view class="content">
		<view class="box">
			<view class="top">
				<text class="name">今天投放垃圾</text>
				<text class="num">
					{{ reduce.weight || 0 }}
					<text class="unit">KG</text>
				</text>
			</view>
			<view class="bottom">
				<text class="name">减少二氧化碳排放量</text>
				<text class="num">
					{{ reduce.jian_tan || 0}}
					<text class="unit">KG</text>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			reduce: {}
		};
	},
	computed: {
		...mapState(['userInfo'])
	},
	created() {
		// this.co2();
	},
	methods: {
		co2() {
			uni.showLoading({
				title: '获取中',
				mask: true
			});
			this.api
				.emission({ user_id: this.userInfo.id })
				.then(res => {
					console.log(res);
					if (res.data.code == 0) {
						this.reduce = res.data.data.data;
					}
					uni.hideLoading();
				})
				.catch(err => {
					console.log(err);
					uni.hideLoading();
				});
		}
	}
};
</script>

<style lang="scss">
view {
	box-sizing: border-box;
}

.content {
	background: url(../../static/img/c-1.jpg) no-repeat;
	background-size: cover;
	background-position: bottom;
	display: flex;
	align-items: center;

	.box {
		width: 450rpx;
		height: 440rpx;
		background: rgba(255, 255, 255, 0.5);
		margin-top: 100rpx;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.top,
		.bottom {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #333;
			.name {
				font-weight: bold;
			}
			.num {
				color: #27c571;
			}
			.co {
				font-size: 30rpx;
			}
			.unit {
				color: #333;
			}
		}
	}
}
</style>
