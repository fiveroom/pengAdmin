<template>
	<div class="external">
		<div @click="judgeDis" :class="['mybut', judgeEffect(this.shadowCls, 'base-shadow')]">
			<div :class="['mybut-content',bagCls?bagCls:'base-bgc',judgeEffect(this.hoverCls, 'base-bgc-hover')]">
				<slot></slot>
				<span v-text="title"></span>
				<div :class="[disabled?'mybut-disabled':'']"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["title", "hoverCls", "bagCls", "shadowCls", "disabled"],
		data() {
			return {};
		},
        methods: {
            judgeDis(e){
                if(this.disabled){
                    e.stopPropagation()
                }
            },
            judgeEffect(need, base){
                 if(this.disabled){
                    return ''
                }
                if(need){
                    return need
                }
				return base;
            }
        }
	};
</script>

<style lang="scss" scoped>
.mybut {
	font-size: 12px;
	color: #fff;
	padding: 2px;
	width: fit-content;
	background-clip: content-box;
	&-content {
		transition: background-color .5s;
		position: relative;
		border-radius: 3px;
		height: 23px;
		line-height: 23px;
		padding: 0px 6px;
		span {
			margin-left: 2px;
		}
	}
	&:active{
		transition: box-shadow .5s;
	}
}
.mybut-disabled {
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	border-radius: 3px;
	background-color: rgba(255, 255, 255, 0.4);
}
.base-bgc {
	background-color: #007bff;
	&-hover:hover {
        cursor: pointer;
		background-color: #0069d9;
	}
}

.base-shadow:active {
	// border-color: #007bff;
	box-shadow: 0px 0px 6px 1px #007bff, 0px 0px 6px 1px #007bff inset;
}
</style>