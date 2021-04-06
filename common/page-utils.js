// 交易状态码
let state = () => {
	return {
		0: {
			name: '新记录',
			color: 'blue'
		},
		1: {
			name: '满意',
			color: 'blue'
		},
		2: {
			name: '申诉中',
			color: '#d2691e'
		},
		3: {
			name: '申诉失败',
			color: 'red'
		},
		4: {
			name: '申诉成功',
			color: 'green'
		}
	}
}
export {
	state
}
