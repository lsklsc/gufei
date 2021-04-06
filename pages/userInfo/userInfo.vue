<template>
	<view class="content">
		<!-- <uni-list class="">
			<uni-list-item title="主体名称" class="" :showArrow="false" :badgeText="userInfo.org_name || '是否'" badgeType="default-inverted" :showBadge="true"></uni-list-item>
			<uni-list-item title="店名" class="" :showArrow="false" :badgeText="userInfo.org_name" badgeType="default-inverted" :showBadge="true"></uni-list-item>
			<uni-list-item title="区/县" class="" :showArrow="false" :badgeText="userInfo.area_name" badgeType="default-inverted" :showBadge="true"></uni-list-item>
			<uni-list-item title="街道" class="" :showArrow="false" :badgeText="userInfo.street_name" badgeType="default-inverted" :showBadge="true"></uni-list-item>
			<uni-list-item title="详细地址" class="" :showArrow="false" :badgeText="userInfo.address || '无'" badgeType="default-inverted" :showBadge="true"></uni-list-item>
			<uni-list-item title="联系人" class="" :showArrow="false" :badgeText="userInfo.manager || '无'" badgeType="default-inverted" :showBadge="true"></uni-list-item>
			<uni-list-item title="联系电话" class="" :showArrow="false" :badgeText="userInfo.phone || '无'" badgeType="default-inverted" :showBadge="true"></uni-list-item>
		</uni-list> -->
		<view class="list">
			<view class="item border">
				<view class="left">单位名称</view>
				<view class="right">{{ userInfo.org_name || '无' }}</view>
			</view>
			<view class="item border">
				<view class="left">店名</view>
				<view class="right">{{ userInfo.name || '无' }}</view>
			</view>
			<view class="item border">
				<view class="left">合同编号</view>
				<view class="right">{{ userInfo.con_num || '无' }}</view>
			</view>
			<view class="item border">
				<view class="left">区/县</view>
				<view class="right">{{ userInfo.area_name || '无' }}</view>
			</view>
			<view class="item border">
				<view class="left">街乡镇</view>
				<view class="right">{{ userInfo.street_name || '无' }}</view>
			</view>
			<view class="item border">
				<view class="left">社区/村庄</view>
				<view class="right">{{ userInfo.comm_name || '无' }}</view>
			</view>
			<view class="item border">
				<view class="left">详细地址</view>
				<view class="right">{{userInfo.address || '无'}}</view>
			</view>
			<view class="item border">
				<view class="left">联系人</view>
				<view class="right">{{ userInfo.manager || '无' }}</view>
			</view>
			<view class="item border">
				<view class="left">联系电话</view>
				<view class="right">{{ userInfo.phone || '无' }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
export default {
	components: {
		uniList,
		uniListItem
	},
	data() {
		return {};
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo;
		}
	},
	methods: {}
};
</script>

<style lang="scss">
view {
	box-sizing: border-box;
}
.content {
	width: 100%;
	.list {
		width: 100%;
		padding: 20rpx;
		.item {
			padding: 20rpx 0;
			display: flex;
			.left {
				flex: 3;
			}
			.right {
				flex: 7;
				text-align: right;
			}
		}
	}
}
</style>
