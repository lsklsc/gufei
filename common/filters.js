// 交易状态码
let stateName = (state) => {
	let name = null;
	switch (state) {
		case -2:
			name = '已取消' //司机取消
			break;
		case -1:
			name = '已取消' //用户取消
			break;
		case 0:
			name = '待接单'
			break;
		case 1:
			name = '已接单'
			break;
		case 2:
			name = '请确认' //司机确认
			break;
		case 3:
			name = '已完成' //用户确认
			break;
		default:
			name = '有问题'
			break;
	}
	return name;
}
export {
	stateName
}
