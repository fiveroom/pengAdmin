<template>
	<div ref="scrllBar">
		<div ref="scrollContent" @mousewheel="runStatus.runScroll=true" class="scroll-content">
			<slot></slot>
		</div>
		<div
			ref="scrollSlot"
			@mouseup="loosenScrSlot"
			@mouseleave="addScrollConEvent"
			@mouseenter="removeScrollConEvent"
			@mousedown="downScrollSlot"
			class="scroll-slot"
		>
			<div
				ref="scrollBlock"
				@mousemove.prevent="mouseMoveScrollBlock"
				@mouseup="alterMouseDownStu"
				@mousedown="getMouseLocat"
				class="scroll-slot__block"
			></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let runStatus = {
				timer: null, // 定时器序号
				runScroll: false, // 滚轮移动状态
				moveDone: true, // 滑块定时器完成状态
				clickScrPieStatus: false // 点击滑块状态
			};
			let scrollData = {
				downDisY: null, // 点击滑块鼠标位置
				disScrollBlock: null // 点击滑槽滑块移动距离
			};
			let observe = null;
			let eleSize = {
				scrContentH: null, // 内容窗口高度
				scrSlotH: null, // 插槽高度
				scrContentScrH: null // 内容窗口内内容高度的度量
			};
			return {
				runStatus,
				scrollData,
				observe,
				eleSize
			};
		},
		methods: {
			/**
			 * 滑块随内容区移动
			 */
			changeScrBlockTop() {
                this.getEleSize();
				this.$refs.scrollSlot.style.width = "15px";
				if (this.runStatus.runScroll || this.moveDone) {
					clearInterval(this.runStatus.timer);
					let ratioOut =
						this.$refs.scrollContent.scrollTop /
						this.eleSize.scrContentScrH; // 滚出内容比例
					this.$refs.scrollBlock.style.top =
						this.eleSize.scrSlotH * ratioOut.toFixed(2) + "px";
				}
			},
			/**
			 * 滑块移动动画
			 */
			moveScrBlockAnim(moveDis) {
				let oldTop = this.$refs.scrollBlock.offsetTop;
				this.runStatus.moveDone = false;
				this.runStatus.runScroll = false;
				clearInterval(this.runStatus.timer);
				this.runStatus.timer = setInterval(() => {
					let newTop = this.$refs.scrollBlock.offsetTop;
					this.$refs.scrollBlock.style.top =
						newTop + parseInt((moveDis - newTop) * 0.2) + "px";
					let ratiomin =
						this.$refs.scrollBlock.offsetTop / this.eleSize.scrSlotH;
					this.$refs.scrollContent.scrollTop = Math.ceil(
						this.eleSize.scrContentH * ratiomin
					);
					if (
						(moveDis < oldTop &&
							this.$refs.scrollBlock.offsetTop - moveDis <= 10) ||
						(moveDis > oldTop &&
							moveDis - this.$refs.scrollBlock.offsetTop <= 10)
					) {
						this.$refs.scrollBlock.style.top = moveDis + "px";
						let ratiomin =
							this.$refs.scrollBlock.offsetTop /
							this.eleSize.scrSlotH;
						this.$refs.scrollContent.scrollTop = Math.ceil(
							this.eleSize.scrContentH * ratiomin
						);
						this.runStatus.moveDone = true;
						clearInterval(this.runStatus.timer);
					}
				}, 20);
			},
			/**
			 * 获取元素相对页面偏移量
			 */
			getEleDisPage(ele) {
				let disX = 0,
					disY = 0;
				while (ele != document.body) {
					disY += ele.offsetTop + ele.clientTop;
					disX += ele.offsetLeft + ele.clientLeft;
					ele = ele.offsetParent;
				}
				return [disX, disY];
			},
			/**
			 * 滑槽被点击
			 */
			downScrollSlot(e) {
				let maxTop = this.eleSize.scrSlotH - this.eleSize.scrBlockH;
				this.scrollData.disScrollBlock = Math.ceil(
					e.offsetY - 0.5 * this.eleSize.scrBlockH
				);
				if (this.scrollData.disScrollBlock < 0) {
					this.scrollData.disScrollBlock = 0;
				} else if (this.scrollData.disScrollBlock > maxTop) {
					this.scrollData.disScrollBlock = maxTop;
				}
			},
			/**
			 * 松开滑槽点击
			 */
			loosenScrSlot() {
				this.moveScrBlockAnim(this.scrollData.disScrollBlock);
			},
			/**
			 * 添加内容取scroll事件
			 */
			removeScrollConEvent() {
				this.$refs.scrollSlot.style.width = "15px";

				this.$refs.scrollContent.removeEventListener(
					"scroll",
					this.changeScrBlockTop
				);

				this.runStatus.clickScrPieStatus = false;
			},
			/**
			 * 移除内容取scroll事件
			 */
			addScrollConEvent() {
				this.$refs.scrollSlot.style.width = "5px";

				this.$refs.scrollContent.addEventListener(
					"scroll",
					this.changeScrBlockTop
				);
			},
			/**
			 * 滑块点击，获取鼠标位置
			 */
			getMouseLocat(e) {
				// console.log('点击滑块');
				let [elePageX, elePageY] = this.getEleDisPage(
					this.$refs.scrollBlock
				);
				this.scrollData.downDisY = e.clientY - elePageY;
				// console.log(this.scrollData.downDisY, "鼠标点击位置");
				this.runStatus.clickScrPieStatus = true;
				e.stopPropagation();
			},
			/**
			 * 滑块松开取消move
			 */
			alterMouseDownStu(e) {
				// console.log('松开滑块');
				this.runStatus.clickScrPieStatus = false;
				e.stopPropagation();
			},
			/**
			 * 滑块随鼠标移动
			 */
			mouseMoveScrollBlock(e) {
				if (this.runStatus.clickScrPieStatus) {
					let maxTop = this.eleSize.scrSlotH - this.eleSize.scrBlockH;
					// console.log("最大top", maxTop);
					let [elePageX, elePageY] = this.getEleDisPage(
						this.$refs.scrollBlock
					);
					let needMove =
						this.$refs.scrollBlock.offsetTop +
						e.clientY -
						elePageY -
						this.scrollData.downDisY;
					// console.log("移动距离", needMove);
					if (needMove < 0) {
						needMove = 0;
					} else if (needMove > maxTop) {
						needMove = maxTop;
					}
					this.$refs.scrollBlock.style.top = needMove + "px";
					this.$refs.scrollContent.scrollTop = parseInt(
						(this.eleSize.scrContentH *
							this.$refs.scrollBlock.offsetTop) /
							this.eleSize.scrBlockH
					);
				}
			},
			/**
			 * 获取尺寸
			 */
			getEleSize() {
				this.eleSize.scrContentH = parseInt(
					getComputedStyle(this.$refs.scrollContent).getPropertyValue(
						"height"
					)
				);
				this.eleSize.scrSlotH = parseInt(
					getComputedStyle(this.$refs.scrollSlot).getPropertyValue(
						"height"
					)
				);
				this.eleSize.scrContentScrH = this.$refs.scrollContent.scrollHeight;
				if (this.eleSize.scrContentH < this.eleSize.scrContentScrH) {
					this.$refs.scrollSlot.style.width = "5px";
					let scrBlockH = (
						(this.eleSize.scrSlotH * this.eleSize.scrContentH) /
						this.eleSize.scrContentScrH
					).toFixed(2);
                    this.eleSize.scrBlockH = scrBlockH;
                    console.log('5px');
					this.$refs.scrollBlock.style.height = scrBlockH + "px";
				} else {
                    this.$refs.scrollSlot.style.width = "0";
                }
			}
		},
		mounted() {
			this.observer = new MutationObserver(mutations => {
                console.log('object');
				this.getEleSize();
			});
			this.getEleSize();
			this.observer.observe(this.$refs.scrollContent, {
				attributes: true,
				subtree: true,
				attributeFilter: ["style"],
				attributeOldValue: true
			});
			this.$refs.scrollContent.addEventListener(
				"scroll",
				this.changeScrBlockTop
			);
		},
		beforeDestroyed() {
			if (this.observer) {
				this.observer.disconnect();
				this.observer.takeRecords();
				this.observer = null;
			}
		}
	};
</script>

<style lang="scss" scoped>
.scroll-content {
	position: relative;
	height: 100%;
	overflow: auto;
	&::-webkit-scrollbar {
		width: 0px;
	}
}
.scroll-slot {
	transition: width 0.2s;
	width: 5px;
	height: 100%;
	border-top: 0;
	border-bottom: 0;
	position: absolute;
	top: 0;
	right: 0;
	background-color: rgba($color: #f5f5f5, $alpha: 0.7);
	overflow: hidden;
	&__block {
		position: absolute;
		transition: height 0.3s;
		top: 0;
		width: 100%;
		border-radius: 10px;
		background-color: rgba($color: #aaa, $alpha: 0.4);
        &:hover{
            background-color: #a8a8a8
        }
	}
}
</style>