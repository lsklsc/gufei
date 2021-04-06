<template>
	<view class="list">
		
	</view>
</template>

<script>
export default {
	name: 'Radio',
	data() {
		return {
			radio: 0,
			propsStyle: {
				background: this.color
			}
		};
	},
	props: {
		items: {
			type: Array,
			default: function() {
				return [];
			}
		},
		color: {
			type: String,
			default: '#65aef7'
		}
	},
	methods: {
		radioOn(index) {
			this.items.forEach(key => {
				key.isChecked = false;
			});
			this.items[index].isChecked = true;
			this.$emit('radioOn', index);
		}
	}
};
</script>

<style scoped>
.radio-container {
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	font-size: 12px;
	cursor: pointer;
}
.single {
	position: relative;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	cursor: pointer;
}
input {
	width: 12px;
	height: 12px;
	appearance: none; /*清除默认样式*/
	-webkit-appearance: none;
	opacity: 0;
	outline: none;
	cursor: pointer;
	vertical-align: middle;
	margin-top: -2px;
	margin-bottom: 1px;
}
.outer {
	height: 12px;
	width: 12px;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #ccc;
	border-radius: 999px;
	position: absolute;
	top: 1px;
	z-index: 0;
}
.inner {
	background-color: green;
	width: 6px;
	height: 6px;
	border-radius: 999px;
}
</style>
