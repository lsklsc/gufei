<template>
	<!-- swiper中的transfrom会使fixed失效,此时需设置fixed为false,而top会自动使用padding-top -->
	<mescroll-uni :fixed="false" top="80" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
		<!-- 数据列表 -->
		<block><list :list="pdList"></list></block>
	</mescroll-uni>
</template>

<script>
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import List from './list.vue';
export default {
	components: {
		MescrollUni,
		List
	},
	data() {
		return {
			mescroll: null, //mescroll实例对象
			downOption: {
				auto: false // 不自动加载
			},
			upOption: {
				auto: false, // 不自动加载
				// page: {
				// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
				// 	size: 10 // 每页数据的数量
				// },
				noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				empty: {
					tip: '~ 空空如也 ~' // 提示
					// btnText: '去看看'
				}
			},
			pdList: [], //列表数据
			isInit: false, // 列表是否已经初始化
			scrollY: 0
		};
	},
	props: {
		i: Number, // 每个tab页的专属下标
		index: {
			// 当前tab的下标
			type: Number,
			default() {
				return 0;
			}
		}
	},
	watch: {
		// 监听下标的变化
		index(val) {
			if (this.i === val && !this.isInit) {
				this.isInit = true; // 标记为true
				this.mescroll.triggerDownScroll();
			}
		}
	},
	mounted() {
		// 第一个tab,自动加载数据
		if (this.i === 0) {
			this.isInit = true; // 标记为true
			this.mescroll.triggerDownScroll();
		}
	},
	methods: {
		// mescroll组件初始化的回调,可获取到mescroll对象
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		/*下拉刷新的回调 */
		downCallback(mescroll) {
			// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
			// loadSwiper();
			// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			mescroll.resetUpScroll();
		},
		/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
		upCallback(mescroll) {
			//联网加载数据
			this.getListDataFromNet(
				mescroll.num,
				mescroll.size,
				curPageData => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					console.log('i=' + this.i + ', mescroll.num=' + mescroll.num + ', mescroll.size=' + mescroll.size + ', curPageData.length=' + curPageData.length);
					mescroll.endSuccess(curPageData.length);
					//设置列表数据
					if (mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
					this.pdList = this.pdList.concat(curPageData); //追加新数据
				},
				() => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				}
			);
		},
		//点击空布局按钮的回调
		emptyClick() {
			uni.showToast({
				title: '点击了按钮,具体逻辑自行实现'
			});
		},

		/*联网加载列表数据
			在您的实际项目中,请参考官方写法: http://www.mescroll.com/uni.html#tagUpCallback
			请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
			实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			* */
		getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
			let listData = [];
			let form = {
				page: pageNum,
				page_size: pageSize
			};

			let api = [
				{
					url: 'dailyRecord',
					data: {
						complain_status: 0,
						collect_type: 0
					}
				},
				{
					url: 'dailyRecord',
					data: {
						complain_status: 1,
						collect_type: 0
					}
				}
			];
			let params = Object.assign({}, form, api[this.index].data);
			this.$api[api[this.index]['url']](params)
				.then(res => {
					if (res.data.code == 0) {
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.data.results;
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = Math.ceil(res.data.data.count / 10);
						// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
						let totalSize = res.data.data.count;

						//设置列表数据
						if (pageNum == 1) this.listData = []; //如果是第一页需手动置空列表
						listData = this.listData.concat(curPageData); //追加新数据

						// 成功隐藏下拉加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						successCallback && successCallback(listData);
					}
				})
				.catch(err => {
					errorCallback && errorCallback();
				});
		}
	}
};
</script>
<style lang="scss"></style>
