export const bodyMenus = [{
		title: '基本信息',
		img: '../../static/img/base.png',
		url: '../userInfo/userInfo'
	},
	{
		title: '我的二维码',
		img: '../../static/img/qrcode.png',
		url: '../qrcode/qrcode'
	},
	{
		title: '统计',
		img: '../../static/img/statistics.png',
		url: '../statistics/statistics'
	}
]
export const footerMenus = [
// {
// 	title: '每日减少碳排放',
// 	icon: '<span class="iconfont">&#xe603;</span>',
// 	url: '../reduce-garbage/reduce-garbage'
// }, {
// 	title: '意见反馈',
// 	icon: '<span class="iconfont">&#xe625;</span>',
// 	url: '../feedback-add/feedback-add'
// },
{
	title: '退出登录',
	icon: '<span class="iconfont">&#xe650;</span>',
	method:function(){
		console.log(this);
		this.$store.dispatch('logoutAction');
	}
}]
