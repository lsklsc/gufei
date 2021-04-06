<template>
	<view class="container">
		<view class="list">
			<view class="item">
				<image src="../../static/img/3.png" mode="" @click="openPage('../daily/order-list')"></image>
				日常记录
			</view>
			<view class="item">
				<image src="../../static/img/2.png" mode="" @click="openPage('../order-record/order-list')"></image>
				预约记录
			</view>
			<view class="item">
				<image src="../../static/img/4.png" mode="" @click="openPage('../refuse-record/order-list')"></image>
				拒收记录
			</view>
			<view class="item">
				<image src="../../static/img/1.png" mode="" @click="openPage('../daily-complain-record/order-list')"></image>
				日常申诉记录
			</view>
			<view class="item">
				<image src="../../static/img/1.png" mode="" @click="openPage('../order-complain-record/order-list')"></image>
				预约申诉记录
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			openPage(url){
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style lang="scss">
.container{
	width: 100%;
}
.list{
	display: flex;
	// justify-content: space-evenly;
	width: 100%;
	padding: 30rpx 0;
	flex-wrap: wrap;
	.item{
		margin-bottom: 20rpx;
		width: 33%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 25rpx;
		image{
			width: 140rpx;
			height: 140rpx;
		}
	}
}
</style>
