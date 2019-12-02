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
					<input class="uipnu" type="text" />
				</div>
				<div class="user-form">
					<p>用户名称</p>
					<input class="uipnu" type="text" />
				</div>
				<div class="user-form">
					<p>密码</p>
					<input class="uipnu" type="text" />
				</div>
				<div class="user-form">
					<p>性别</p>
					<select class="uipnu" name id>
						<option value="0">保密</option>
						<option value="1">男</option>
						<option value="2">女</option>
					</select>
				</div>
				<div class="user-form">
					<p>生日</p>
					<input class="uipnu" type="date" />
				</div>
				<div class="user-form">
					<p>地址</p>
					<input class="uipnu" type="text" />
				</div>
				<div class="user-form">
					<p>账号状态</p>
					<select class="uipnu" name id>
						<option value="0">启用</option>
						<option value="1">禁用</option>
					</select>
				</div>
				<div class="user-form">
					<p>备注</p>
					<el-input class="uipnu uipnu--textarea" type="textarea" :rows="4"></el-input>
				</div>
			</el-tab-pane>
			<el-tab-pane label="绑定联系方式" name="second">
				<div class="user-form">
					<p>个人主页地址</p>
					<input class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>电子邮箱</p>
					<input class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>微博</p>
					<input class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>电话1</p>
					<input class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>电话2</p>
					<input class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>手机1</p>
					<input class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>手机2</p>
					<input class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>QQ</p>
					<input class="uipnu" id="name" type="text" />
				</div>
				<div class="user-form">
					<p>微信</p>
					<input class="uipnu" id="name" type="text" />
				</div>
			</el-tab-pane>
			<el-tab-pane label="所属分组" name="third">
				<scroll-bar class="choice-tree">
					<el-tree
						show-checkbox
						default-expand-all
						:data="groupData"
						:default-expanded-keys="[1]"
						node-key="NodeId"
						:props="defaultProps"
						:current-node-key="1"
						highlight-current
						ref="treeGroup"
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
	export default {
		data() {
			let defaultProps = {
				label: "Name",
				children: "Childs"
			};
			return {
				showDilalog: true,
				activeName: "first",
				defaultProps,
				groupData: [
					{
						NodeId: 1,
						ParentId: 0,
						Name: "所有分组",
						ExtAttrib: "sa",
						OrderId: 1,
						AdminIds: "aa1",
						Childs: [
							{
								NodeId: 4,
								ParentId: 1,
								Name: "Powers1",
								ExtAttrib:
									'{"DptLeader":{"Name":null,"UniqID":null},"DptManager":{"Name":null,"UniqID":null},"Remark":null}',
								OrderId: 0,
								AdminIds: "C02",
								Childs: [
									{
										NodeId: 10042,
										ParentId: 4,
										Name: "222",
										ExtAttrib:
											'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":""}',
										OrderId: 0,
										AdminIds: "C03",
										Childs: [],
										MaxId: 0
									}
								],
								MaxId: 0
							},
							{
								NodeId: 10000,
								ParentId: 1,
								Name: "单元测试_部门1",
								ExtAttrib: null,
								OrderId: 0,
								AdminIds: "admin",
								Childs: [
									{
										NodeId: 10001,
										ParentId: 10000,
										Name: "单元测试_部门1_1",
										ExtAttrib: null,
										OrderId: 0,
										AdminIds: "aa1",
										Childs: [],
										MaxId: 0
									}
								],
								MaxId: 0
							},
							{
								NodeId: 10003,
								ParentId: 1,
								Name: "内部人员",
								ExtAttrib:
									'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":"111"}',
								OrderId: 0,
								AdminIds: "920cf54f-853c-4f3a-a4a7-2764ceef4a58",
								Childs: [
									{
										NodeId: 10011,
										ParentId: 10003,
										Name: "部门A",
										ExtAttrib:
											'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":"d"}',
										OrderId: 0,
										AdminIds: "A01,A03",
										Childs: [],
										MaxId: 0
									},
									{
										NodeId: 10012,
										ParentId: 10003,
										Name: "部门B",
										ExtAttrib:
											'{"DptManager":{"Name":"B01","UniqID":"B01"},"DptLeader":{"Name":"B02","UniqID":"B02"},"Remark":"b"}',
										OrderId: 0,
										AdminIds: "A03",
										Childs: [],
										MaxId: 0
									},
									{
										NodeId: 10013,
										ParentId: 10003,
										Name: "部门C",
										ExtAttrib:
											'{"DptManager":{"Name":"C02","UniqID":"C02"},"DptLeader":{"Name":"C02","UniqID":"C02"},"Remark":"C"}',
										OrderId: 0,
										AdminIds: null,
										Childs: [],
										MaxId: 0
									},
									{
										NodeId: 10014,
										ParentId: 10003,
										Name: "部门cs01",
										ExtAttrib:
											'{"DptManager":{"Name":"部门经理01","UniqID":"cs101807"},"DptLeader":{"Name":"分管领导01","UniqID":"cs101808"},"Remark":"222"}',
										OrderId: 0,
										AdminIds: null,
										Childs: [],
										MaxId: 0
									},
									{
										NodeId: 10015,
										ParentId: 10003,
										Name: "部门cs02",
										ExtAttrib:
											'{"DptManager":{"Name":"部门经理02","UniqID":"cs101804"},"DptLeader":{"Name":"分管领导02","UniqID":"cs101806"},"Remark":""}',
										OrderId: 0,
										AdminIds: null,
										Childs: [],
										MaxId: 0
									},
									{
										NodeId: 10018,
										ParentId: 10003,
										Name: "测试部门B",
										ExtAttrib:
											'{"DptManager":{"Name":"B部门_部门经理B","UniqID":"bbmjla"},"DptLeader":{"Name":"部门B_分管领导A","UniqID":"bfglda"},"Remark":""}',
										OrderId: 0,
										AdminIds: null,
										Childs: [],
										MaxId: 0
									},
									{
										NodeId: 10019,
										ParentId: 10003,
										Name: "测试一人部门",
										ExtAttrib:
											'{"DptManager":{"Name":"管理工程师A","UniqID":"b6e730ca-dcf5-4e20-862d-6f975a905529"},"DptLeader":{"Name":"C","UniqID":"6d79382e-bffd-407a-b656-11cf35462778"},"Remark":""}',
										OrderId: 0,
										AdminIds: null,
										Childs: [],
										MaxId: 0
									},
									{
										NodeId: 10049,
										ParentId: 10003,
										Name: "自行车vcvx",
										ExtAttrib:
											'{"DptLeader":{"Name":null,"UniqID":null},"DptManager":{"Name":null,"UniqID":null},"Remark":null}',
										OrderId: 0,
										AdminIds: null,
										Childs: [],
										MaxId: 0
									}
								],
								MaxId: 0
							},
							{
								NodeId: 10004,
								ParentId: 1,
								Name: "编制企业",
								ExtAttrib: null,
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							},
							{
								NodeId: 10005,
								ParentId: 1,
								Name: "其他企业",
								ExtAttrib: null,
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							},
							{
								NodeId: 10006,
								ParentId: 1,
								Name: "cs10171",
								ExtAttrib:
									'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":""}',
								OrderId: 0,
								AdminIds: null,
								Childs: [
									{
										NodeId: 10050,
										ParentId: 10006,
										Name: "kjkj",
										ExtAttrib:
											'{"DptLeader":{"Name":null,"UniqID":null},"DptManager":{"Name":null,"UniqID":null},"Remark":null}',
										OrderId: 0,
										AdminIds: null,
										Childs: [],
										MaxId: 0
									}
								],
								MaxId: 0
							},
							{
								NodeId: 10007,
								ParentId: 1,
								Name: "cs10172",
								ExtAttrib:
									'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":""}',
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							},
							{
								NodeId: 10008,
								ParentId: 1,
								Name: "cs10173",
								ExtAttrib:
									'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":""}',
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							},
							{
								NodeId: 10009,
								ParentId: 1,
								Name: "编制部门B",
								ExtAttrib:
									'{"DptManager":{"Name":"部门B_部门经理A","UniqID":"bzb_bmjla"},"DptLeader":{"Name":"部门B_分管领导A","UniqID":"bzb_fglda"},"Remark":""}',
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							},
							{
								NodeId: 10010,
								ParentId: 1,
								Name: "编制部门C",
								ExtAttrib:
									'{"DptManager":{"Name":"部门C_部门经理A","UniqID":"bzc_bmjla"},"DptLeader":{"Name":"部门C_分管领导A","UniqID":"bzc_fglda"},"Remark":""}',
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							},
							{
								NodeId: 10020,
								ParentId: 1,
								Name: "新疆油田",
								ExtAttrib:
									'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":""}',
								OrderId: 0,
								AdminIds: "C02,C01",
								Childs: [
									{
										NodeId: 10021,
										ParentId: 10020,
										Name: "领导组",
										ExtAttrib:
											'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":""}',
										OrderId: 0,
										AdminIds: null,
										Childs: [],
										MaxId: 0
									},
									{
										NodeId: 10022,
										ParentId: 10020,
										Name: "普通用户",
										ExtAttrib:
											'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":""}',
										OrderId: 0,
										AdminIds: null,
										Childs: [],
										MaxId: 0
									}
								],
								MaxId: 0
							},
							{
								NodeId: 10030,
								ParentId: 1,
								Name: "顶顶顶顶",
								ExtAttrib:
									'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":""}',
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							},
							{
								NodeId: 10031,
								ParentId: 1,
								Name: "测试企业",
								ExtAttrib:
									'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":"remarks"}',
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							},
							{
								NodeId: 10043,
								ParentId: 1,
								Name: "cs10174",
								ExtAttrib:
									'{"DptManager":{"Name":""},"DptLeader":{"Name":""},"Remark":""}',
								OrderId: 0,
								AdminIds: "cc01b65b-68df-4450-90b0-186630dc0c87",
								Childs: [
									{
										NodeId: 10044,
										ParentId: 10043,
										Name: "cs1017401",
										ExtAttrib:
											'{"DptManager":{"Name":"C02","UniqID":"C02"},"DptLeader":{"Name":"C03","UniqID":"C03"},"Remark":""}',
										OrderId: 0,
										AdminIds: null,
										Childs: [
											{
												NodeId: 10045,
												ParentId: 10044,
												Name: "cs101740101",
												ExtAttrib:
													'{"DptLeader":{"Name":"","UniqID":null},"DptManager":{"Name":"","UniqID":null},"Remark":"123321321"}',
												OrderId: 0,
												AdminIds: null,
												Childs: [],
												MaxId: 0
											},
											{
												NodeId: 10046,
												ParentId: 10044,
												Name: "cs101740102",
												ExtAttrib:
													'{"DptLeader":{"Name":null,"UniqID":null},"DptManager":{"Name":null,"UniqID":null},"Remark":"321"}',
												OrderId: 0,
												AdminIds: null,
												Childs: [],
												MaxId: 0
											}
										],
										MaxId: 0
									}
								],
								MaxId: 0
							},
							{
								NodeId: 10047,
								ParentId: 1,
								Name: "123",
								ExtAttrib:
									'{"DptLeader":{"Name":null,"UniqID":null},"DptManager":{"Name":null,"UniqID":null},"Remark":null}',
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							},
							{
								NodeId: 10048,
								ParentId: 1,
								Name: "sfsf",
								ExtAttrib:
									'{"DptLeader":{"Name":null,"UniqID":null},"DptManager":{"Name":null,"UniqID":null},"Remark":null}',
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							},
							{
								NodeId: 10051,
								ParentId: 1,
								Name: "00",
								ExtAttrib:
									'{"DptLeader":{"Name":null,"UniqID":null},"DptManager":{"Name":null,"UniqID":null},"Remark":null}',
								OrderId: 0,
								AdminIds: null,
								Childs: [],
								MaxId: 0
							}
						],
						MaxId: 0
					}
				]
			};
		},
		methods: {
			outDilalog() {
				this.showDilalog = false;
				this.$emit("closeDig");
			},
			confirmAdd() {}
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