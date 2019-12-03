<template>
	<el-dialog
		:visible.sync="showDilalog"
		width="498px"
		destroy-on-close
		custom-class="my-dialog"
		title="编辑用户信息"
		@close="$emit('closeDig')"
		:close-on-click-modal="false"
	>
		<el-tabs class="tabs-content" v-model="activeName">
			<el-tab-pane label="基本信息" name="first">
				<div class="user-form user-form-top">
					<p>登录账号</p>
					<input v-model="userBaseData.NickName" class="uipnu" type="text" />
				</div>
				<div class="user-form">
					<p>用户名称</p>
					<input v-model="userBaseData.Name" class="uipnu" type="text" />
				</div>
				<div class="user-form">
					<p>密码</p>
					<input v-model="userBaseData.Password" class="uipnu" type="text" />
				</div>
				<div class="user-form">
					<p>性别</p>
					<select v-model="userBaseData.Sex" class="uipnu" name id>
						<option value="0">--保密--</option>
						<option value="1">男</option>
						<option value="2">女</option>
					</select>
				</div>
				<div class="user-form">
					<p>生日</p>
					<input v-model="userBaseData.Birthday" class="uipnu" type="date" />
				</div>
				<div class="user-form">
					<p>地址</p>
					<input v-model="userBaseData.Address" class="uipnu" type="text" />
				</div>
				<div class="user-form">
					<p>账号状态</p>
					<select v-model="userBaseData.UStatus" class="uipnu" name id>
						<option value="0">启用</option>
						<option value="1">禁用</option>
					</select>
				</div>
				<div class="user-form">
					<p>备注</p>
					<el-input
						v-model="userBaseData.Memo"
						class="uipnu uipnu--textarea"
						type="textarea"
						:autosize="{minRows: 4, maxRows:4}"
					></el-input>
				</div>
			</el-tab-pane>
			<el-tab-pane label="绑定联系方式" name="second">
				<div class="user-form">
					<p>个人主页地址</p>
					<input v-model="userBaseData.WebUrl" class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>电子邮箱</p>
					<input v-model="userBaseData.EMail" class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>微博</p>
					<input v-model="userBaseData.WeiBo" class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>电话1</p>
					<input v-model="userBaseData.Tel1" class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>电话2</p>
					<input v-model="userBaseData.Tel2" class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>手机1</p>
					<input v-model="userBaseData.Mob1" class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>手机2</p>
					<input v-model="userBaseData.Mob2" class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>QQ</p>
					<input v-model="userBaseData.QQ" class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>微信</p>
					<input v-model="userBaseData.WeiChat" class="uipnu" id="name" type="text" />
				</div>
			</el-tab-pane>
			<el-tab-pane label="所属分组" name="third">
				<scroll-bar class="choice-tree">
					<el-tree
						show-checkbox
						default-expand-all
						:data="groupData"
						:default-checked-keys="defaultCheckKey"
						node-key="NodeId"
						:props="defaultProps"
						@check="checkNode"
						ref="treeGroup"
						:check-strictly="true"
					></el-tree>
				</scroll-bar>
			</el-tab-pane>
		</el-tabs>
		<footer class="deal-footer">
			<button @click="confirmAdd" class="deal-footer-btn deal-footer-btn--yes">
				<i class="el-icon-circle-check"></i>
				<span>确认</span>
			</button>
			<button @click="outDilalog" class="deal-footer-btn deal-footer-btn--no">
				<i class="el-icon-circle-close"></i>
				<span>取消</span>
			</button>
		</footer>
	</el-dialog>
</template>

<script>
	import { MessageBox } from "element-ui";
	export default {
		props: ["departInfo", "currentUserInfo", "DealUserType"],
		data() {
			let defaultProps = {
				label: "Name",
				children: "Childs"
			};
			let userBaseData = {
				isShow: true,
				UniqID: "",
				IDCard: "",
				NickName: "",
				Name: "",
				Detail: "",
				Sex: 0,
				Birthday: "",
				Tel1: "",
				Tel2: "",
				Mob1: "",
				Mob2: "",
				EMail: "",
				QQ: "",
				WeiChat: "",
				WeiBo: "",
				WebUrl: "",
				HeadUrl: "",
				Memo: "",
				Organization: "",
				Position: "",
				Address: "",
				Zip: "",
				County: "",
				Province: "",
				City: "",
				GroupIds: [],
				Area: "",
				TypeCode: "",
				ClassCode: "",
				Tags: "",
				ExtParm: "",
				State: "",
				RegDate: null,
				LastModify: "",
				LastModifyTime: null,
				Password: "123456",
				UStatus: 0
			};
			let choiceDeparts = [];
			let defaultCheckKey = [];
			return {
				showDilalog: true,
				activeName: "first",
				defaultProps,
				userBaseData,
				choiceDeparts,
				defaultCheckKey,
				groupData: this.$store.state.departments
			};
		},
		methods: {
			outDilalog() {
				this.showDilalog = false;
				this.$emit("closeDig");
			},
			/**
			 * 确认按钮
			 */
			confirmAdd() {
				console.log(this.userBaseData, "分组信息");
				if (this.userBaseData.GroupIds.length === 0) {
					this.userBaseData.GroupIds.push(this.departInfo.NodeId);
				}
				this.$axios
					.post(
						"/Service/RoleRightMge.svrx/UpdateUser",
						this.$qs.stringify({
							token: this.$store.state.adminData.Token,
							userId: this.userBaseData.UniqID,
							user: JSON.stringify(this.userBaseData)
						})
					)
					.then(res => {
						console.log(res);
						if (res.data.ErrorCode === -36) {
							MessageBox.alert("用户名已存在", "提示", {
								confirmButtonText: "确定"
							});
						} else {
							this.outDilalog();
							this.$emit("confirm");
						}
					});
			},
			checkNode(data) {
				if (this.userBaseData.GroupIds.includes(data.NodeId)) {
					this.userBaseData.GroupIds.splice(
						this.userBaseData.GroupIds.indexOf(data.NodeId),
						1
					);
				} else {
					this.userBaseData.GroupIds.push(data.NodeId);
				}
			},
		},
		created() {
			if (this.DealUserType == "editUser") {
				this.userBaseData = Object.assign({}, this.currentUserInfo[0]);
				this.defaultCheckKey = this.userBaseData.GroupIds;
			}
		}
	};
</script>

<style lang="scss">
	.tabs-content {
		padding: 20px 12px;
		height: 420px;
	}
	.user-form {
		align-items: center;
		display: flex;
		font-size: 12px;
		margin-bottom: 12px;
		p {
			padding: 3px 6px;
			width: 84px;
			height: 20px;
			line-height: 20px;
			flex-shrink: 0;
		}
		&-top {
			margin-top: 2px;
		}
	}
	.uipnu {
		margin-right: 2px;
		flex-grow: 1;
		height: 24px;
		flex-grow: 1;
		border: 1px solid #ced4da;
		text-indent: 5px;
		font-size: 12px;
		outline: none;
		transition: box-shadow 0.3s;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
		&:focus {
			color: #495057;
			border-color: #80bdff;
			box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
		}
		&--textarea {
			height: auto;
			border: 0;
			textarea {
				font-size: 12px;
				outline: none;
				border: 1px solid #ced4da;
				transition: box-shadow 0.3s;
				border-top-right-radius: 2px;
				border-bottom-right-radius: 2px;
				padding: 5px;
				&:focus {
					color: #495057;
					border-color: #80bdff;
					box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
				}
			}
		}
	}
	.choice-tree {
		position: relative;
		height: 350px;
		width: 100%;
	}
</style>