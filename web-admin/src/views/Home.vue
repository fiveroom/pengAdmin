<template>
	<div class="home">
		<section class="left-side">
			<header class="left-side-header">
				<el-button  class="btn btn--safe" size="mini" icon="el-icon-plus">添加子部门</el-button>
				<el-button class="btn btn--safe" size="mini" :disabled="currentNodeId==1" icon="el-icon-edit">编辑分组信息</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-user-solid">设备管理员</el-button>
				<el-button class="btn btn--danger btn--right-margin" size="mini" :disabled="currentNodeInfo.Childs && currentNodeInfo.Childs.length != 0" icon="el-icon-close">删除</el-button>
			</header>
			<!-- <tree-data :groupData="groupData" /> -->
			<scroll-bar class="left-side-body">
				<el-tree
					default-expand-all
					:data="groupData"
					:default-expanded-keys="[1]"
					node-key="NodeId"
					:props="defaultProps"
					@node-click="handleNodeClick"
					:current-node-key="currentNodeId"
					highlight-current
					ref="treeGroup"
				></el-tree>
			</scroll-bar>
		</section>
		<section class="right-side">
			<header class="right-side-header">
				<el-input class="search-user" size="mini" placeholder="登录账号或名称" v-model="searchKey">
					<i slot="suffix" class="el-input__icon el-icon-search"></i>
				</el-input>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-plus">添加用户</el-button>
				<el-button class="btn btn--safe" size="mini" :disabled="choiceUsersIonfo.length != 1" icon="el-icon-edit">编辑用户</el-button>
				<el-button class="btn btn--danger btn--rmargin" size="mini" :disabled="choiceUsersIonfo.length == 0" icon="el-icon-close">删除用户</el-button>
				<el-button class="btn btn--safe" size="mini" :disabled="currentNodeId==1" icon="el-icon-plus">组增加用户</el-button>
				<el-button class="btn btn--danger" size="mini"  :disabled="currentNodeId==1 || choiceUsersIonfo.length == 0" icon="el-icon-close">组删除用户</el-button>
			</header>
			<dpart-users @pitchOn="choiceUsers" class="right-side-body" :nodeId="currentNodeId" :Token="$store.state.adminData.Token" />
		</section>
	</div>
</template>

<script>
	export default {
		data() {
			let Token = "";
			let defaultProps = {
				label: "Name",
				children: "Childs"
			};
			let currentNodeId = 1;
			let currentNodeInfo = {};

			return {
				searchKey: "",
				groupData: [],
				Token,
				defaultProps,
				currentNodeId,
				currentNodeInfo,
				choiceUsersIonfo: []
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
							this.currentNodeInfo = Object.assign({}, this.groupData[0]);
							this.$store.commit(
								"totalData",
								Object.assign({}, this.groupData)
							);
							console.log(this.groupData);
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
			},
			handleNodeClick(data) {
				this.currentNodeId = data.NodeId;
				this.currentNodeInfo = data;
			},
			delayTime() {
				setTimeout(() => {
					console.log("延时");
					this.$store.commit("addInfo", { Token: "123" });
					console.log("延时介绍");
				}, 3000);
			},
			choiceUsers(users){
				console.log(users);
				this.choiceUsersIonfo = users.slice(0);
			}
		},
		created() {
			// this.logIn();
			this.getBaseData();
			// this.delayTime();
		},
		components: {
			'dpart-users': () => import("../components/DpartUsers")
		},
		computed: {
			hasDpartSon() {
				 
			}
		},
	};
</script>

<style lang="scss">
.home {
	height: 100vh;
	display: flex;
	flex-wrap: nowrap;
}
.left-side {
	position: relative;
	border-right: 1px solid #e0e0e0;
	&-header {
		display: flex;
		padding: 6px 12px;
		background-color: #f8f8f8;
		border-bottom: 1px solid #e0e0e0;
	}
	&-body {
		@extend .right-side-body;
	}
}
.right-side {
	flex-grow: 1;
	position: relative;
	&-header {
		@extend .left-side-header;
	}
	&-body {
		position: absolute;
		top: 39px;
		bottom: 0;
		width: 100%;
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
		&:active{
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