<template>
	<div class="home">
		<section class="left-side">
			<header class="left-side-header">
				<my-but
					@click.native="eidtDialog='DealDepart'"
					class="butt butt-left butt--nomargin"
					title="添加子部门"
				>
					<i class="el-icon-plus"></i>
				</my-but>
				<my-but
					class="butt butt-left"
					@click.native="eidtDialog='DealDepart';DealDepartType='edit'"
					:disabled="currentNodeId==1"
					title="编辑分组信息"
				>
					<i class="el-icon-edit"></i>
				</my-but>
				<my-but class="butt butt-left" @click="eidtDialog='ChoiceUserDia';choiceType='setAdmin'" title="设备管理员">
					<i class="el-icon-user-solid"></i>
				</my-but>
				<my-but
					class="butt butt-left"
					hoverCls="danger-bgc-hover"
					:disabled="currentNodeId ==1 && currentNodeInfo.Childs && currentNodeInfo.Childs.length != 0"
					bagCls="danger-bgc"
					shadowCls="dange-shadow"
					bagColor="#dc3545"
					title="删除"
				>
					<i class="el-icon-close"></i>
				</my-but>
			</header>
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
				<my-but class="butt butt-right" @click.native="eidtDialog='DealUser'" title="添加用户">
					<i class="el-icon-plus"></i>
				</my-but>
				<my-but class="butt butt-right" :disabled="choiceUsersIonfo.length != 1" title="编辑用户">
					<i class="el-icon-edit"></i>
				</my-but>
				<my-but
					class="butt butt-right"
					hoverCls="danger-bgc-hover"
					:disabled="choiceUsersIonfo.length == 0"
					bagCls="danger-bgc"
					shadowCls="dange-shadow"
					bagColor="#dc3545"
					title="删除用户"
				>
					<i class="el-icon-close"></i>
				</my-but>
				<my-but
					@click.native="eidtDialog='ChoiceUserDia';choiceType='addGUser'"
					class="butt butt-right butt-right--big-margin"
					:disabled="currentNodeId==1"
					title="组增加用户"
				>
					<i class="el-icon-plus"></i>
				</my-but>
				<my-but
					class="butt butt-right"
					hoverCls="danger-bgc-hover"
					:disabled="currentNodeId==1 || choiceUsersIonfo.length == 0"
					bagCls="danger-bgc"
					shadowCls="dange-shadow"
					bagColor="#dc3545"
					title="组删除用户"
				>
					<i class="el-icon-minus"></i>
				</my-but>
			</header>
			<dpart-users
				@pitchOn="choiceUsers"
				class="right-side-body"
				:nodeId="currentNodeId"
				:Token="$store.state.adminData.Token"
				:searchKey="searchKey"
				:updateData="updateData"
				@updataDown="updateData=false"
			/>
		</section>
		<component
			:is="eidtDialog"
			@getChoiceU="addAdmin"
			:DealDepartType="DealDepartType"
			:departInfo="currentNodeInfo"
			@confirm="syncData"
			@closeDig="eidtDialog=''"
			:choiceType="choiceType"
		></component>
	</div>
</template>

<script>
	import ChoiceUserDia from "../components/ChoiceUserDia";
	import DealUser from "../components/DealUser";
	import DealDepart from "../components/DealDepart";
	import DpartUsers from "../components/DpartUsers";
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
				searchKey: null,
				groupData: [],
				Token,
				defaultProps,
				currentNodeId,
				currentNodeInfo,
				choiceUsersIonfo: [],
				eidtDialog: null,
				DealDepartType: null,
				updateData: false,
				choiceType: null
			};
		},
		watch: {
			searchKey(value) {}
		},
		methods: {
			test() {
				console.log("点我");
			},
			/**
			 * 同步信息
			 */
			syncData() {
				this.getAllGroupInfo();
				this.currentNodeId = 1;
				this.updateData = true;
			},
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
					});
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
							this.currentNodeInfo = Object.assign(
								{},
								this.groupData[0]
							);
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
			choiceUsers(users) {
				console.log(users);
				this.choiceUsersIonfo = users.slice(0);
			},
			/**
			 * 添加管理员
			 */
			addAdmin() {}
		},
		created() {
			// this.logIn();
			this.getBaseData();
			// this.delayTime();
		},
		components: {
			"dpart-users": DpartUsers,
			DealDepart,
			ChoiceUserDia,
			DealUser
		},
		computed: {
			hasDpartSon() {}
		}
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
		top: 40px;
		bottom: 0;
		width: 100%;
	}
}

.butt {
	flex-shrink: 0;
	&-left {
		margin-left: 4px;
		&--nomargin {
			margin-left: 0px;
		}
	}
	&-right {
		margin-left: 2px;
		&--big-margin {
			margin-left: 10px;
		}
	}
}

.danger-bgc {
	background-color: #dc3545;
	&-hover:hover {
		cursor: pointer;
		background-color: #c82333;
	}
}
.dange-shadow:active {
	border-color: #dc3545;
	box-shadow: 0px 0px 6px 1px #dc3545, 0px 0px 6px 1px #dc3545 inset;
}

.search-user {
	margin-right: 6px;
	width: 160px !important;
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