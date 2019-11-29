<template>
	<div class="home">
		<section class="left-side">
			<header class="left-side-header">
				<el-button class="btn btn--safe" size="mini" icon="el-icon-plus">添加子部门</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-edit">编辑分组信息</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-user-solid">设备管理员</el-button>
				<el-button class="btn btn--danger btn--right-margin" size="mini" icon="el-icon-close">删除</el-button>
			</header>
			<!-- <tree-data :groupData="groupData" /> -->
				<el-tree
				class="left-side-body"
			:data="groupData"
			:default-expanded-keys="[1]"
			node-key="NodeId"
			:props="defaultProps"
			@node-click="handleNodeClick"
			:current-node-key="currentNodeId"
            highlight-current
            ref="treeGroup"
		></el-tree>
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

			<!-- <router-view :key="$route.fullPath" :id="$route.query.id" :Token="Token" /> -->
			<test class="right-side-body" :nodeId="currentNodeId" :Token="$store.state.adminData.Token"/>
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
			return {
				searchKey: "",
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
				],
				Token,
				defaultProps,
				currentNodeId
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
					.then(() => {
						this.getAllGroupInfo();
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
							// console.log(this.groupData);
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
				// console.log("data获得当前选中NodeID",data.NodeId, "元素获得当前选中NodeID",this.$refs.treeGroup.currentNodeKey);
                // this.showDpartUsers(data.NodeId)
			},
			currentNode(nodeData) {
				console.log(nodeData, "选中的项");
            },
            /**
             * 跳转
             */
            showDpartUsers(id){
                id = id || this.$refs.treeGroup.currentNodeKey;
                console.log(id, '点击');                
                this.$router.push({ path: 'DpartUsers', query: {id}})
            },
            /**
             * 获取节点后跳转
             */
            getDefaultNode(){
                this.$nextTick(()=>{
                    this.showDpartUsers()
                })
			},
			delayTime(){
				setTimeout(() => {
					console.log('延时');
					this.$store.commit("addInfo", {'Token': '123'})
					console.log('延时介绍');

				}, 3000);
			}
		},
		created() {
			// this.logIn();
			// this.getBaseData();
			this.delayTime()
		},
		components: {
			"tree-data": () => import("../components/TreeGroup"),
			// "tree-data": () => import("../components/TreeGroup"),
			test: () => import("../components/DpartUsers2")
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
	&-body{
		@extend .right-side-body;
		overflow: auto;
	}
}
.right-side {
	flex-grow: 1;
	position: relative;
	&-header {
		@extend .left-side-header;
	}
	&-body{
		position: absolute;
		top: 39px;
		bottom: 0;
		width: 100%
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