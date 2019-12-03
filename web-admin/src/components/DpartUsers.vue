<template>
	<div>
		<section class="tusers tusers-header">
			<ul class="tusers-ul tusers-ul--bold">
				<li class="tusers-li tusers-li--mini"></li>
				<li class="tusers-li tusers-li--mini tusers-li--nopadding"></li>
				<li class="tusers-li tusers-li--auto">
					<div>登陆帐号</div>
					<div>用户名称</div>
					<div>所属分组</div>
				</li>
				<li class="tusers-li tusers-li--medium">状态</li>
			</ul>
		</section>
		<scroll-bar class="tusers-scroll">
			<section class="tusers-body">
				<ul class="tusers-ul" v-for="(item, index) in tableData._Items" :key="item.UniqID">
					<li class="tusers-li tusers-li--mini" v-text="index+1"></li>
					<li class="tusers-li tusers-li--mini tusers-li--check tusers-li--nopadding">
						<div class="check-box" @click="checkedItem(item)">
							<div
								class="check-box__icon"
								:class="checdUsers.map(item=>item.UniqID).includes(item.UniqID) ? 'show-icon style-show':'close-icno'"
							>
								<i class="el-icon-check"></i>
							</div>
						</div>
					</li>
					<li class="tusers-li tusers-li--auto">
						<div v-text="item.NickName"></div>
						<div v-text="item.Name"></div>
						<div>{{getDepartmentName(item.GroupIds)}}</div>
					</li>
					<li class="tusers-li tusers-li--medium">{{item.UStatus | judegUStatus}}</li>
				</ul>
			</section>
		</scroll-bar>
		<!-- 分页 -->
		<section class="paging">
			<div class="paging-left">
				<div class="paging-item paging-item--no-padleft">
					<select name="10" v-model="pageSize" class="paging-left__select">
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="30">30</option>
						<option value="40">40</option>
						<option value="50">50</option>
					</select>
				</div>
				<div class="paging-item paging-left__but">
					<button
						:class="['mycaret', 'mycaret--big', {'mycaret--hover': pageIndex > 1}]"
						@click="changePageIndex('sub', 0)"
					>
						<i class="el-icon-caret-left"></i>
						<i class="el-icon-caret-left mycaret-icon--right"></i>
					</button>
					<button
						:class="['mycaret', 'mycaret--min', {'mycaret--hover': pageIndex > 1}]"
						@click="changePageIndex('sub', 1)"
					>
						<i class="el-icon-caret-left"></i>
					</button>
				</div>
				<div class="paging-item paging-left__paging-inp">
					<span>第</span>

					<input v-model="pageIndex" class="input-page" type="text" />
					<span>共{{Math.ceil(tableData.TotalCount/pageSize) || 0}}页</span>
				</div>
				<div class="paging-item paging-left__but">
					<button
						:class="['mycaret', 'mycaret--min', {'mycaret--hover': pageIndex < pageNum}]"
						@click="changePageIndex('sum', 1)"
					>
						<i class="el-icon-caret-right"></i>
					</button>
					<button
						:class="['mycaret', 'mycaret--big ', {'mycaret--hover': pageIndex < pageNum}]"
						@click="changePageIndex('sum', 0)"
					>
						<i class="el-icon-caret-right"></i>
						<i class="el-icon-caret-right mycaret-icon--right"></i>
					</button>
				</div>
				<div class="paging-item paging-item--no-padright">
					<button class="mycaret mycaret--hover" @click="getDepartmentUser()">
						<i class="el-icon-refresh-right mycaret-icon--bold"></i>
					</button>
				</div>
			</div>
			<div class="paging-right">显示1到{{pageSize}},共{{tableData.TotalCount || 0}}条记录</div>
		</section>
	</div>
</template>

<script>
	export default {
		props: ["nodeId", "Token", "choice", "searchKey", "updateData"],
		data() {
			let pageNum = null;
			return {
				tableData: {},
				checdUsers: [],
				pageIndex: 1,
				pageSize: 20,
				pageNum: null
			};
		},
		filters: {
			judegUStatus(value) {
				if (value === 0) {
					return "启用";
				} else {
					return "已禁用";
				}
			}
		},
		watch: {
			Token(value) {
				if (value) {
					console.log("第一次发送请求");
					this.getDepartmentUser();
				}
			},
			nodeId(value) {
				console.log("nodeId变化发送请求");
				this.getDepartmentUser();
				this.checdUsers = [];
				this.pageIndex = 1;
				this.pageSize = 20;
				this.pageNum = null;
			},
			searchKey(value) {
				this.checdUsers = [];
				this.pageIndex = 1;
				this.pageSize = 20;
				this.pageNum = null;
				this.getDepartmentUser();
			},
			pageSize(newV, oldV) {
				this.pageNum = Math.ceil(
					this.tableData.TotalCount / parseInt(this.pageSize)
				);
				this.getDepartmentUser();
			},
			pageIndex(newV, oldV) {
				console.log(!newV);
				if (newV) {
					if (/^\d*$/.test(newV)) {
						newV = parseInt(newV);
						this.pageIndex =
							newV > 0 && newV <= this.pageNum ? newV : oldV;
					} else {
						this.pageIndex = oldV;
					}
					this.getDepartmentUser();
				} else {
					this.pageIndex = newV;
				}
			},
			updateData(value) {
				this.getDepartmentUser();
				this.checdUsers = [];
				this.pageIndex = 1;
				this.pageSize = 20;
				this.pageNum = null;
				this.$emit("updataDown");
				console.log("更新");
			}
		},
		methods: {
			checkedItem(data) {
				console.log(this.choice);
				if (this.choice == 1) {
					this.checdUsers.pop();
					this.checdUsers.push(data);
				} else {
					let arrUniqId = this.checdUsers.map(item => item.UniqID);
					if (arrUniqId.includes(data.UniqID)) {
						this.checdUsers.splice(arrUniqId.indexOf(data.UniqID), 1);
					} else {
						this.checdUsers.push(Object.assign({}, data));
					}
				}
				this.$emit("pitchOn", this.checdUsers);
			},
			/**
			 * 获取部门用户
			 */
			getDepartmentUser() {
				this.$axios
					.post(
						"/Service/RoleRightMge.svrx/GetDepartmentUsers",
						this.$qs.stringify({
							token: this.$store.state.adminData.Token,
							keyword: this.searchKey,
							id: this.nodeId,
							pageIndex: this.pageIndex,
							pageSize: this.pageSize
						})
					)
					.then(res => {
						if (res.data.ErrorCode === 0) {
							this.tableData = Object.assign({}, res.data.Data);
							this.$emit("haveDepartUser", this.tableData != 0);

							this.pageNum = Math.ceil(
								this.tableData.TotalCount / parseInt(this.pageSize)
							);
						}
					})
					.catch(err => console.log(err));
			},
			/**
			 * 查找用户的部门名称
			 */
			getDepartmentName([...value]) {
				let departments = this.$store.state.departments;
				let getDepartName = (departments, departIds) => {
					let departNames = [];
					if (departIds.length && departments.length) {
						for (let item of departments) {
							if (departIds.length) {
								if (departIds.includes(item.NodeId)) {
									departIds.splice(
										departIds.indexOf(item.NodeId),
										1
									);
									departNames = departNames.concat(item.Name);
								}
							} else {
								break;
							}
						}
						if (departIds.length) {
							for (let item of departments) {
								departNames = departNames.concat(
									getDepartName(item.Childs, departIds)
								);
							}
						}
					}
					return departNames;
				};
				return getDepartName(departments, value).join();
			},
			/**
			 * 改变页数
			 */
			changePageIndex(type, num) {
				let pageIndex = null;
				if (this.pageIndex) {
					pageIndex = parseInt(this.pageIndex);
				} else {
					pageIndex = 1;
				}
				if (type == "sub") {
					pageIndex--;
					if (num === 0 || pageIndex === 0) {
						pageIndex = 1;
					}
				} else {
					pageIndex++;
					if (num === 0 || pageIndex > this.pageNum) {
						pageIndex = this.pageNum;
					}
				}
				this.pageIndex = pageIndex;
			},
			/**
			 * 查询
			 */
			queryData() {}
		},
		created() {
			console.log(this.nodeId, "哈哈哈哈");
			if (this.choice && this.nodeId) {
				this.checdUsers = [];
				this.pageIndex = 1;
				this.pageSize = 10;
				this.pageNum = null;
				this.getDepartmentUser();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tusers {
		&-scroll {
			position: absolute;
			top: 26px;
			bottom: 38px;
			width: 100%;
		}
		&-header {
			background-color: #f1f2f5;
			font-weight: bold;
		}
		&-body {
			ul:nth-child(2n + 1) {
				background-color: #f2f2f2;
			}
			ul:hover {
				background-color: #ececec;
			}
			ul:last-of-type {
				li {
					border-bottom: 2px solid #dee2e6;
				}
			}
			ul:first-of-type {
				li {
					border-top-width: 0;
				}
			}
		}
	}

	.tusers-ul {
		font-size: 0;
		display: flex;
		justify-content: space-between;
		&--bold {
			li {
				border-bottom: 2px solid #dee2e6;
			}
		}
	}

	.tusers-li {
		flex-shrink: 0;
		font-size: 12px;
		border-top: 1px solid #dee2e6;
		border-left: 1px solid #dee2e6;
		height: 26px;
		line-height: 26px;
		box-sizing: border-box;
		padding-left: 3px;
		&--mini {
			text-align: center;
			width: 40px;
		}
		&--big {
			width: 120px;
		}
		&--medium {
			text-align: center;
			width: 100px;
		}
		&--check {
			display: flex;
		}
		&--nopadding {
			padding: 0;
		}
	}
	.tusers-li--auto {
		border-left-width: 0;
		padding: 0;
		text-align: left;
		flex-grow: 1;
		display: flex;
		justify-content: space-evenly;
		div {
			// border: 1px solid #dee2e6;
			border-left: 1px solid #dee2e6;
			width: 33.3%;
			box-sizing: border-box;
			padding-left: 3px;
		}
	}
	.check-box {
		width: 14px;
		height: 14px;
		line-height: 14px;
		border: 1px solid #888;
		margin: auto;
		border-radius: 3px;
		&__icon {
			transform: scale(0);
			background-color: #409eff;
			i {
				width: 100%;
				height: 100%;
				color: #fff;
				font-weight: bolder;
			}
			transition: transform 0.2s;
		}
	}
	.show-icon {
		transform: scale(1);
	}
	.close-icno {
		transform: scale(0);
	}
	.paging {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 38px;
		font-size: 12px;
		background-color: #f8f8f8;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		padding: 6px 12px;
		align-items: center;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		&-item {
			flex-shrink: 0;
			padding: 0 12px;
			border-right: 1px solid #d1d2d5;
			&--no-padleft {
				padding-left: 0;
			}
			&--no-padright {
				border-right-width: 0;
			}
		}
	}
	.paging-left {
		display: flex;
		&__select {
			width: 40px;
			height: 24px;
		}
		&__but {
			display: flex;
		}
		&__paging-inp {
			vertical-align: middle;
		}
	}
	.mycaret {
		color: #66b0ff;
		width: 24px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		background-color: transparent;
		transition: color 0.5s;
		transition: background-color 0.5s;
		border-radius: 4px;
		outline: none;
		border: 0;
		&--hover {
			color: #007bff;
		}
		&--hover:hover {
			cursor: pointer;
			background-color: #007bff;
			color: #fff;
		}

		&--min {
			font-size: 14px;
		}
		&--big {
			font-size: 16px;
			position: relative;
			overflow: hidden;
			display: flex;
			align-items: center;
		}
		&-icon--right {
			transform: translateX(-8px);
		}
		&-icon--bold {
			font-weight: bolder;
		}
	}
	.input-page {
		width: 40px;
		height: 24px;
		box-sizing: border-box;
		margin: 0 5px;
	}
</style>