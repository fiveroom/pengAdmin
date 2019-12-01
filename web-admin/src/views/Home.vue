<template>
	<div class="home">
		<section class="left-side">
			<header class="left-side-header">
				<el-button class="btn btn--safe" size="mini" icon="el-icon-plus">添加子部门</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-edit">编辑分组信息</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-user-solid">设备管理员</el-button>
				<el-button class="btn btn--danger btn--right-margin" size="mini" icon="el-icon-close">删除</el-button>
			</header>
			<tree-data :groupData="groupData" />
		</section>
		<section class="right-side">
			<header class="right-side-header">
				<el-input class="search-user" size="mini" placeholder="登录账号或名称" v-model="searchKey">
					<i slot="suffix" class="el-input__icon el-icon-search"></i>
				</el-input>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-plus">添加用户</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-edit">编辑用户</el-button>
				<el-button class="btn btn--danger btn--rmargin" size="mini" icon="el-icon-close">删除用户</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-plus">组增加用户</el-button>
				<el-button class="btn btn--danger" size="mini" icon="el-icon-close">组删除用户</el-button>
			</header>
			<router-view :key="$route.fullPath" :Token="Token"/>
			<!-- <test /> -->
		</section>
	</div>
</template>

<script>
	export default {
		data() {
			let Token='';
			return {
				searchKey: "",
				groupData: [],
				Token
			};
		},
		methods: {
			/**
			 * 登录
			 */
			logIn() {
				return this.$axios
					.post(
						"/Service/Authorize.svrx/Login",
						this.$qs.stringify({
							loginId: "admin",
							password: "123456",
							userDefTag: ""
						})
					)
					.then(res => {
						if (res.data.ErrorCode === 0) {
							this.$store.commit(
								"addInfo",
								Object.assign({}, res.data.Data)
							);
							this.Token = res.data.Data.Token;
							sessionStorage.setItem("Token", res.data.Data.Token);
							return true;
						}
						return false;
					})
					.catch(err => {
						console.log(err);
						return false;
					})
			},
			/**
			 * 获取分组信息
			 */
			getAllGroupInfo() {
				this.$axios
					.post(
						"/Service/RoleRightMge.svrx/GetDepartment",
						this.$qs.stringify({
							Token: this.$store.state.adminData.Token,
							id: 1,
							option: 19
						})
					)
					.then(res => {
						if (res.data.ErrorCode === 0) {
							this.groupData = this.dealGroupInfo([
								Object.assign({}, res.data.Data)
							]);
						}
					})
					.catch(err => console.log(err));
			},
			/**
			 * 处理分组信息
			 */
			dealGroupInfo(groupData) {
				return groupData.map(item => {
					item.MaxId = item.Childs.MaxID;
					item.Childs = this.dealGroupInfo(item.Childs._Items);
					return item;
				});
			},
			async getBaseData() {
				if (await this.logIn()) {
					this.getAllGroupInfo();
				}
			}
		},
		created() {
			this.getBaseData();
		},
		components: {
			"tree-data": () => import("../components/TreeGroup"),
			test: () => import("../components/DpartUsers")
		}
	};
</script>

<style lang="scss">
	@mixin headerFlex {
		display: flex;
		padding: 6px 12px;
		background-color: #f8f8f8;
		border-bottom: 1px solid #e0e0e0;
	}
	.home {
		height: 100vh;
		display: flex;
		flex-wrap: nowrap;
	}
	.left-side {
		border-right: 1px solid #e0e0e0;
		&-header {
			@include headerFlex;
		}
	}
	.right-side {
		flex-grow: 1;
		&-header {
			@include headerFlex;
		}
	}
	.btn {
		flex-shrink: 0;
		color: #fff;
		padding: 3px 6px;
		line-height: 1.5;
		& + & {
			margin-left: 6px;
		}
		margin-left: 6px;
		&--right-margin {
			margin-right: 6px;
		}
		&--safe {
			background-color: #007bff;
			&:hover {
				background-color: #0069d9;
			}
		}
		&--danger {
			background-color: #dc3545;
			&:hover {
				background-color: #c82333;
			}
		}
		&--rmargin {
			margin-right: 6px;
		}
		&:hover {
			color: #fff;
		}
		i.el-icon-close + span {
			margin-left: 3px;
		}
		i.el-icon-close {
			width: 9px;
			height: 12px;
		}
	}
	.search-user {
		margin-right: 6px;
		width: 160px;
		color: #000;
		.el-input__inner {
			height: 26px;
			line-height: 1;
			padding-left: 6px;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			&::-webkit-input-placeholder {
				color: #000;
			}
		}
		.el-input__icon {
			color: #000;
		}
	}
</style>