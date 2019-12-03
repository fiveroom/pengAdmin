<template>
	<div class="home">
		<section class="left-side">
			<header class="left-side-header">
				<my-but
					@click.native="eidtDialog='DealDepart';DealDepartType=''"
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
				<my-but
					class="butt butt-left"
					@click.native="eidtDialog='ChoiceUserDia';choiceType='setAdmin'"
					title="设备管理员"
				>
					<i class="el-icon-user-solid"></i>
				</my-but>
				<my-but
					class="butt butt-left"
					hoverCls="danger-bgc-hover"
					:disabled="noAllowDelG"
					bagCls="danger-bgc"
					shadowCls="dange-shadow"
					bagColor="#dc3545"
					title="删除"
					@click.native="deleteData('deleteDepart')"
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
				<my-but
					class="butt butt-right"
					@click.native="eidtDialog='DealUser';DealUserType='addUser'"
					title="添加用户"
				>
					<i class="el-icon-plus"></i>
				</my-but>
				<my-but
					class="butt butt-right"
					@click.native="eidtDialog='DealUser';DealUserType='editUser'"
					:disabled="choiceUsersIonfo.length != 1"
					title="编辑用户"
				>
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
					@click.native="deleteData('deleteUser')"
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
					@click.native="deletGroupUser"
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
				@haveDepartUser="haveDepartUser"
			/>
		</section>
		<component
			:is="eidtDialog"
			@getChoiceU="getUsers"
			:DealDepartType="DealDepartType"
			:departInfo="currentNodeInfo"
			@confirm="syncData"
			@closeDig="eidtDialog='',choiceType = null"
			:choiceType="choiceType"
			:currentUserInfo="choiceUsersIonfo"
			:DealUserType="DealUserType"
			:count="2"
		></component>
	</div>
</template>

<script>
	import { MessageBox } from "element-ui";
	import { Message } from "element-ui";
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
				choiceType: null,
				DealUserType: null,
				noAllowDelG: true
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
				this.updateData = true;
				this.choiceUsersIonfo = [];
				this.eidtDialog = null;
				this.DealDepartType = null;
				this.updateData = false;
				this.choiceType = null;
				this.DealUserType = null;
				this.noAllowDelG = true;
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
								JSON.parse(JSON.stringify(res.data.Data))
							]);
							this.currentNodeInfo = Object.assign(
								{},
								this.groupData[0]
							);
							this.currentNodeId = 1;
							this.$store.commit("totalData", [
								this.groupData,
								res.data.Data
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
					item.Childs = this.dealGroupInfo(item.Childs._Items) || [];
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
				this.haveDepartUser();
			},
			delayTime(call) {
				setTimeout(() => {
					call;
				}, 3000);
			},
			choiceUsers(users) {
				console.log(users);
				this.choiceUsersIonfo = users.slice(0);
				console.log(this.choiceUsersIonfo);
			},
			/**
			 * 添加管理员
			 */
			addAdmin(users) {
				users = users.map(item => item.Name).join();
				console.log(users);
				this.$axios
					.post(
						"/Service/RoleRightMge.svrx/UpdateDepartmentAdmins",
						this.$qs.stringify({
							Token: this.$store.state.adminData.Token,
							id: this.currentNodeId,
							userIds: users,
							option: 0
						})
					)
					.then(res => {
						Message({
							showClose: true,
							message: "修改失败 NULL",
							type: "error"
						});
					});
			},
			/**
			 * 获取选中的用户
			 */
			getUsers(data, choiceType) {
				this.choiceType = null;
				this.eidtDialog = null;
				if (choiceType == "setAdmin") {
					this.addAdmin(value);
				} else if (choiceType == "addGUser") {
					this.judgeAddGuser(data);
				}
			},
			/**
			 * 组增加用户判断
			 */
			judgeAddGuser(users) {
				MessageBox({
					title: "是否从原组中移除",
					showCancelButton: true,
					confirmButtonText: "是",
					cancelButtonText: "否",
					beforeClose: (action, instance, done) => {
						instance.confirmButtonLoading = true;
						let option = action === "confirm" ? 2 : 0;
						this.addGuser(option, users).then(res => {
							console.log(res);
							instance.confirmButtonLoading = false;
							done();
						});
					}
				}).then(action => {
					this.syncData();
					Message.success({
						showClose: true,
						message: "删除成功",
						type: "success"
					});
				});
			},
			/**
			 * 组增加用户执行  没有管理员权限
			 */
			addGuser(option, users) {
				let data = JSON.stringify({
					isShow: true,
					MaxID: 0,
					TotalCount: 0,
					_Items: users
				});
				console.log(users);
				return this.$axios.post(
					"/Service/RoleRightMge.svrx/BatchAddDepartmentUser",
					this.$qs.stringify({
						token: this.$store.state.adminData.Token,
						id: this.currentNodeId,
						users: data,
						option
					})
				);
			},
			/**
			 * 组删除用户
			 */
			deletGroupUser() {
				let ids = this.choiceUsersIonfo.map(item => item.UniqID).join();
				this.$axios
					.post(
						"/Service/RoleRightMge.svrx/BatchRemoveDepartmentUser",
						this.$qs.stringify({
							token: this.$store.state.adminData.Token,
							id: this.currentNodeId,
							ids,
							option: 0
						})
					)
					.then(res => {
						console.log(res);
						this.syncData();
					});
			},
			async haveDepartUser(status) {
				let data = await this.$axios.post(
					"/Service/RoleRightMge.svrx/GetDepartmentUsers",
					this.$qs.stringify({
						token: this.$store.state.adminData.Token,
						keyword: "",
						id: this.currentNodeId,
						pageIndex: 1,
						pageSize: 20
					})
				);
				if (this.currentNodeInfo.hasOwnProperty("Childs")) {
					console.log(
						this.currentNodeId == 1 &&
							this.currentNodeInfo.Childs != 0 &&
							data.data.Data.TotalCount != 0
					);
					this.noAllowDelG =
						this.currentNodeId == 1 ||
						this.currentNodeInfo.Childs != 0 ||
						data.data.Data.TotalCount != 0;
				} else {
					this.noAllowDelG = false;
				}
			},
			/**
			 * 删除数据
			 */
			deleteData(type) {
				MessageBox({
					title: "确定要删除",
					showCancelButton: true,
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					beforeClose: (action, instance, done) => {
						if (action === "confirm") {
							instance.confirmButtonLoading = true;
							Promise.all(this[type]()).then(res => {
								done();
								instance.confirmButtonLoading = false;
							});
						} else {
							done();
						}
					}
				}).then(action => {
					this.syncData();
					Message.success({
						showClose: true,
						message: "删除成功",
						type: "success"
					});
				});
			},
			/**
			 * 删除用户
			 */
			deleteUser() {
				return this.choiceUsersIonfo.map(item => {
					return this.$axios.post(
						"/Service/RoleRightMge.svrx/DeleteUser",
						this.$qs.stringify({
							Token: this.$store.state.adminData.Token,
							userId: item.UniqID
						})
					);
				});
			},
			/**
			 * 删除部门
			 */
			deleteDepart() {
				return [
					this.$axios.post(
						"/Service/RoleRightMge.svrx/DeleteDepartment",
						this.$qs.stringify({
							Token: this.$store.state.adminData.Token,
							id: this.currentNodeId
						})
					)
				];
			}
		},
		created() {
			this.getBaseData();
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