// [name:'名称',value:'值']
let isEmpty = (arr) => {
	for (let item of arr) {
		let value = item.value.toString();
		console.log(value);
		if (value.trim() === '' || value.trim() === null || value.trim() === undefined) {
			uni.showToast({
				title: `${item.name}`,
				icon: 'none'
			});
			return false;
		}
	}
	return true;
}
// 验证手机号
const checkPhone = (phone) => {
	if (!(/^1[0-9]{10}$/.test(phone))) {
		return false;
	}
	return true;
}


let formatLocation = (longitude, latitude) => {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}


// 截取键值对
let getQuery = (result) => {
	let arr = result.split('&');
	let obj = {}
	arr.map(n => {
		let nArr = n.split('=');
		obj[nArr[0]] = nArr[1];
	})
	return obj;
}
// 将-替换为/
let dateReplace = (date) => {
	return String(date).replace(/-/g, '/');
}
// 日期格式化
let format = (time, format) => {
	if (!time) {
		return
	}
	let t = new Date(dateReplace(time))
	let tf = function(i) {
		return (i < 10 ? '0' : '') + i
	}
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch (a) {
			case 'yyyy':
				return tf(t.getFullYear())
			case 'MM':
				return tf(t.getMonth() + 1)
			case 'mm':
				return tf(t.getMinutes())
			case 'dd':
				return tf(t.getDate())
			case 'HH':
				return tf(t.getHours())
			case 'ss':
				return tf(t.getSeconds())
		}
	})
}

let momentFormate = (time) => {
	return format(time, 'yyyy-MM-dd')
};
let momentFormateHMS = (time) => {
	return format(time, 'yyyy-MM-dd HH:mm:ss')
};
let momentFormateLocal = (time) => {
	return format(time, 'yyyy年MM月dd日 HH:mm:ss')
};


export default {
	isEmpty,
	formatLocation,
	checkPhone,
	getQuery,
	format,
	momentFormate,
	momentFormateHMS,
	momentFormateLocal,
	dateReplace
}
