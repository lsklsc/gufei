<template>
	<view class="page-warp">
		<view class="top-warp">
			<view v-for="(tab, i) in tabs" :key="i" :class="{ active: curIndex === i }" :style="{ width: 100 / tabs.length + '%' }" @click="changeTab(i)">{{ tab }}</view>
		</view>

		<swiper class="swiper" :current="curIndex" @change="swiperChange">
			<!-- -->
			<swiper-item><order-list-item :i="0" :index="curIndex"></order-list-item></swiper-item>

			<!--  -->
			<swiper-item><order-list-item :i="1" :index="curIndex"></order-list-item></swiper-item>
			<swiper-item><order-list-item :i="2" :index="curIndex"></order-list-item></swiper-item>
		</swiper>
	</view>
</template>

<script>
import OrderListItem from './order-list-item.vue';

export default {
	components: {
		OrderListItem
	},
	data() {
		return {
			tabs: ['申诉中', '申诉失败', '申诉成功'],
			curIndex: 0 // 当前tab的下标
		};
	},
	methods: {
		// 轮播菜单
		swiperChange(e) {
			this.changeTab(e.detail.current);
		},
		// 切换菜单
		changeTab(i) {
			this.curIndex = i;
		}
	}
};
</script>

<style lang="scss">
/* 需固定高度 */
page,
.page-warp,
.swiper {
	height: 100%;
	width: 100%;
	background-color: #f8f9fa;
}

.top-warp {
	z-index: 9990;
	position: fixed;
	top: --window-top; /* css变量 */
	left: 0;
	width: 100%;
	height: 80upx;
	background-color: $base-color;
	text-align: center;
	border-bottom: 1upx solid #ddd;
	color: #fff;
}
.top-warp view {
	display: inline-block;
	// width: 50%;
	line-height: 80upx;
	font-size: 28upx;
}
.top-warp .active {
	box-sizing: border-box;
	border-bottom: 2rpx solid #ffc855;
	color: #ffc855;
}
</style>
