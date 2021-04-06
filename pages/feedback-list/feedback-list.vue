<template>
	<view class="content">
		<view class="list">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<view class="header border">
					<text class="title">提交时间</text>
					<text class="time">{{item.create_time | momentFormateHMS}}</text>
				</view>
				<view class="header border">
					<text class="title">案件发生时间</text>
					<text class="time">{{item.happen_time | momentFormateHMS}}</text>
				</view>
				<view class="header border">
					<text class="title">意见反馈对象</text>
					<text class="time">{{item.aim_car || '无'}}</text>
				</view>
				<view class="header border">
					<text class="title">反馈类型</text>
					<text class="time">{{item.opinion_type_name}}</text>
				</view>
				<view class="body border">
					<view class="title">
						意见反馈
					</view>
					<view class="desc">
						{{item.opinion_detail}}
					</view>
				</view>
				<view class="header border">
					<text class="title">处理状态</text>
					<text class="time">{{item.opinion_status_name}}</text>
				</view>
				<view class="body border">
					<view class="title">
						处理结果
					</view>
					<view class="desc">
						{{item.feedback || '无'}}
					</view>
				</view>
				<!-- <view class="body">
					<view class="title">
						{{item.opinion_status_name}}
					</view>
				</view> -->
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>


<script>
	import utils from '../../common/utils.js'
	export default {
		data() {
			return {
				loadingType: 'loading', //加载更多状态 more nomore loading
				form: {
					page: 1,
					page_size: 10
				},
				total: 0,
				list: [],
				noData: false
			};
		},
		filters:{
			momentFormateHMS(time){
				return utils.momentFormateHMS(time);
			}
		},
		onLoad() {
			this.loadData();
		},
		methods:{
			getlist(){
				this.$api.opinionList().then(res=>{
					this.list=res.data.data.results;
				})
			},
			// 加载逻辑
			async loadData(type = 'add') {
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more';
					this.form.page = 1;
				}
				// 获取数据
				let data = await this.addData();
			
				if (type === 'refresh') {
					this.list = [];
				}
				// 合并数组
				this.list = this.list.concat(data);
				// 暂无数据
				if (!this.list.length && this.form.page === 1) {
					this.noData = true;
				} else {
					this.noData = false;
				}
				// 页码+1
				this.form.page++;
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				this.loadingType = this.list.length >= this.total ? 'nomore' : 'more';
				// 停止刷新
				if (type === 'refresh') {
					uni.stopPullDownRefresh();
				}
			},
			// 获取数据
			addData() {
				return this.$api.opinionList(this.form).then(res=>{
					if (res.data.code === 0) {
						this.total = res.data.data.count;
						return res.data.data.results;
					}
				})
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom() {
			this.loadData();
		}
	}
</script>

<style lang="scss">
	view{
		box-sizing: border-box;
		word-break:break-all;
	}
.content{
	padding: 30rpx;
	background-color: #F8F9FA;
	.list{
		.list-item{
			padding: 20rpx;
			margin-bottom: 28rpx;
			background-color: #fff;
			.header{
				padding: 15rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.time{
					font-size: 24rpx;
					color: #888;
				}
			}
			.body{
				padding: 20rpx 0;
				.desc{
					font-size: 28rpx;
					color: #666;
				}
			}
			.title{
				font-size: 28rpx;
				font-weight: 600;
			}
		}
	}
}

</style>
