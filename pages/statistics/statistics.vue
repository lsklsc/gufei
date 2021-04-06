<template>
	<view class="content">
		<view class="search" @click="showPicker">
			<view class="title"></view>
			<view class="search-box center">{{ result }}</view>
			<view class="icon center"><text class="iconfont">&#xe62d;</text></view>
		</view>
		<text class="header-title">日常收运</text>
		<view class="statistics">
			<view class="box">
				<view class="circle border-base"></view>
				<view class="count-box">
					<text class="title">共收运修正重量</text>
					<view class="count color-base">
						<text class="num">{{ results[0].data_list[0] }}</text>
						<text class="unit">kg</text>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="circle border-brown"></view>
				<view class="count-box">
					<text class="title">共收运桶数</text>
					<view class="count color-brown">
						<text class="num">{{ results[0].data_list[1] }}</text>
						<text class="unit">桶</text>
					</view>
				</view>
			</view>
		</view>
		<text class="header-title">预约收运</text>
		<view class="statistics">
			<view class="box">
				<view class="circle border-base"></view>
				<view class="count-box">
					<text class="title">共收运修正重量</text>
					<view class="count color-base">
						<text class="num">{{ results[1].data_list[0] }}</text>
						<text class="unit">kg</text>
					</view>
				</view>
			</view>
			<view class="box">
				<view class="circle border-brown"></view>
				<view class="count-box">
					<text class="title">共收运桶数</text>
					<view class="count color-brown">
						<text class="num">{{ results[1].data_list[1] }}</text>
						<text class="unit">桶</text>
					</view>
				</view>
			</view>
		</view>
		<w-picker  :visible.sync="visible" mode="range" startYear="2020" :endYear="endYear" :defaultVal="rangeDval" :current="false" @confirm="onConfirm" ref="range" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
import wPicker from '@/components/w-picker/w-picker.vue';
import utils from '../../common/utils.js';
export default {
	components: {
		wPicker
	},
	data() {
		return {
			form: {
				date_start: utils.momentFormate(new Date()),
				date_end: utils.momentFormate(new Date())
			},
			result: '',
			rangeDval: [utils.momentFormate(new Date()), utils.momentFormate(new Date())],
			endYear: new Date().getFullYear(),
			results: [],
			visible:false
		};
	},
	onLoad() {
		this.getResult();
		this.form.date_start = utils.momentFormate(new Date());
		this.form.date_end = utils.momentFormate(new Date());
		this.result = `${this.form.date_start}至${this.form.date_end}`;
	},
	methods: {
		getResult() {
			this.$showLoading('查询中...');
			this.$api.statistics(this.form).then(res => {
				this.results = res.data.data;
			});
		},
		showPicker() {
			this.$refs.range.show();
		},
		hidePicker() {
			this.$refs.range.hide();
		},
		onConfirm(e) {
			console.log(e);
			this.form.date_start = e.value[0];
			this.form.date_end = e.value[1];
			this.result=e.result;
			this.getResult();
		}
	}
};
</script>

<style lang="scss">
.statistics {
	display: flex;
	justify-content: space-between;
}
.content {
	padding: 30rpx;
}
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.search {
	width: 80%;
	height: 80rpx;
	margin: 20rpx auto;
	line-height: 80rpx;
	background: #fff;
	border-radius: 40rpx;
	// box-shadow: 0 0 6px rgba(81, 80, 79, 0.15);
	border: 1rpx solid #f6f6f6;
	display: flex;
	font-size: 30rpx;
	padding: 0 20rpx;
	transition: all 0.1s;
	&:active {
		background: #efefef;
	}
	.title {
		flex: 2;
		color: #555;
	}
	.search-box {
		flex: 10;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
	}
	.icon {
		flex: 2;
		.iconfont {
			transform: rotate(90deg);
		}
	}
}
.header-title {
	padding: 60rpx 0 48rpx 0;
	color: #1a1a1a;
	font-size: 32rpx;
	font-weight: 600;
}

.box {
	display: flex;

	.circle {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}

	.count-box {
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.title {
			color: #666;
			font-size: 28rpx;
			line-height: 1;
		}

		.count {
			line-height: 1;

			.num {
				font-size: 40rpx;
			}

			.unit {
				font-size: 20rpx;
			}
		}
	}
}

.color-base {
	color: $base-color;
}

.color-brown {
	color: #c18e61;
}

.border-base {
	border: 24rpx solid $base-color;
}

.border-brown {
	border: 24rpx solid #c18e61;
}
</style>
