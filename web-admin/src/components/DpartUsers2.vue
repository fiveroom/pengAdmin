<template>
	<div>
		<section class="tusers tusers-header">
			<ul class="tusers-ul">
				<li class="tusers-li tusers-li--mini"></li>
				<li class="tusers-li tusers-li--mini"></li>
				<li class="tusers-li tusers-li--big">登录账号</li>
				<li class="tusers-li tusers-li--auto">
					<div>用户名称</div>
					<div>所属分组</div>
				</li>
				<li class="tusers-li tusers-li--medium">状态</li>
			</ul>
		</section>
		<section class="tusers tusers-body">
			<ul class="tusers-ul" v-for="(item, index) in tableData" :key="item.UniqID">
				<li class="tusers-li tusers-li--mini" v-text="index"></li>
				<li class="tusers-li tusers-li--mini tusers-li--check">
					<div class="check-box" @click="checkedItem(item)">
						<div
							class="check-box__icon"
							:class="checdUsers.includes(item.UniqID) ? 'show-icon style-show':'close-icno'"
						>
							<i class="el-icon-check"></i>
						</div>
					</div>
				</li>
				<li class="tusers-li tusers-li--big" v-text="item.NickName"></li>
				<li class="tusers-li tusers-li--auto">
					<div v-text="item.Name"></div>
					<div v-text="item.GroupIds"></div>
				</li>
				<li class="tusers-li tusers-li--medium" v-text="item.UStatus"></li>
			</ul>
			<div class="scrollbar-bar">
				<div ref="thumb" class="scrollbar-thumb"></div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		props: ["nodeId", "Token"],
		data() {
			return {
				tableData: [
					{
						UniqID: "1d7aa2a3-d4e2-4bf2-b10d-a69a43c34c1a",
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
						GroupIds: [10001],
						Area: "",
						TypeCode: "",
						ClassCode: "",
						Tags: "",
						ExtParm: "",
						State: "",
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: "",
						LastModifyTime: "2019-11-29T16:09:41.023",
						Password: ""
					},
					{
						UniqID: "3f0c08ee-3a9e-41ac-83a2-f023dbdddcea",
						IDCard: "",
						NickName: "1999",
						Name: "1999",
						Detail: "",
						Sex: 1,
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
						Memo: "1999",
						Organization: "",
						Position: "",
						Address: "1999",
						Zip: "",
						County: "",
						Province: "",
						City: "",
						GroupIds: [1],
						Area: "",
						TypeCode: "",
						ClassCode: "",
						Tags: "",
						ExtParm: "",
						State: "",
						RegDate: "0001-01-01T00:00:00",
						UStatus: 8,
						LastModify: "",
						LastModifyTime: "2019-11-29T16:34:37.957",
						Password: ""
					},
					{
						UniqID: "29124a28-a535-4d7e-98a2-0b4c9fdff0a4",
						IDCard: "",
						NickName: "aa",
						Name: "aa",
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
						GroupIds: [1],
						Area: "",
						TypeCode: "",
						ClassCode: "",
						Tags: "",
						ExtParm: "",
						State: "",
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: "",
						LastModifyTime: "2019-11-29T16:30:28.56",
						Password: ""
					},
					{
						UniqID: "aa1",
						IDCard: null,
						NickName: "aa12",
						Name: "aa12",
						Detail: null,
						Sex: 0,
						Birthday: "",
						Tel1: "",
						Tel2: "",
						Mob1: "",
						Mob2: "",
						EMail: "a@b.com",
						QQ: "",
						WeiChat: "",
						WeiBo: "",
						WebUrl: "",
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [5],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm:
							'{"RightsData":"<PsDataPacket><FDataList ItemType=\\"PengeSoft.Account.RightInfo, PengeSoft.AccountEx\\"><RightInfo Code=\\"Sys_Acc_0101\\" /><RightInfo Code=\\"Sys_Acc_0102\\" /><RightInfo Code=\\"Sys_EntMge_0101\\" /><RightInfo Code=\\"Sys_PrjMge_0101\\" /><RightInfo Code=\\"Sys_Renju_0401\\" /><RightInfo Code=\\"Sys_Renju_0501\\" /><RightInfo Code=\\"Sys_Renju_0301\\" /></FDataList></PsDataPacket>"}',
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2019-03-26T11:31:59.94",
						Password: ""
					},
					{
						UniqID: "b1a913ce-b85c-4e3c-bf23-58be21f76a44",
						IDCard: null,
						NickName: "ABC123",
						Name: "ABC",
						Detail: null,
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
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10019],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm:
							'{"RightsData":"<PsDataPacket><FDataList /></PsDataPacket>"}',
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2019-04-17T15:11:11.313",
						Password: ""
					},
					{
						UniqID: "abmjla",
						IDCard: null,
						NickName: "abmjla",
						Name: "2222",
						Detail: null,
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
						HeadUrl: null,
						Memo: "1111",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10008],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm:
							'{"RightsData":"<PsDataPacket><FDataList ItemType=\\"PengeSoft.Account.RightInfo, PengeSoft.AccountEx\\"><RightInfo Code=\\"Sys_Acc_0101\\" /><RightInfo Code=\\"Sys_Acc_0102\\" /><RightInfo Code=\\"Sys_Renju_0301\\" /></FDataList></PsDataPacket>"}',
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-12-19T17:49:09.353",
						Password: ""
					},
					{
						UniqID: "Admin",
						IDCard: null,
						NickName: "Admin",
						Name: "管理员1",
						Detail: null,
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
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10004],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm:
							'{"RightsData":"<PsDataPacket><FDataList ItemType=\\"PengeSoft.Account.RightInfo, PengeSoft.AccountEx\\"><RightInfo Code=\\"Sys_Acc_0101\\" /><RightInfo Code=\\"Sys_Renju_0301\\" /></FDataList></PsDataPacket>"}',
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-12-20T09:48:18.757",
						Password: ""
					},
					{
						UniqID: "Administrator",
						IDCard: null,
						NickName: "Administrator",
						Name: "超级管理员",
						Detail: "内置管理帐户",
						Sex: 1,
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
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [2, 4, 10005],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm:
							'{"RightsData":"<PsDataPacket><FDataList ItemType=\\"PengeSoft.Account.RightInfo, PengeSoft.AccountEx\\"><RightInfo Code=\\"Sys_Acc_0101\\" /><RightInfo Code=\\"Sys_Acc_0102\\" /><RightInfo Code=\\"Sys_EntMge_0101\\" /><RightInfo Code=\\"Sys_PrjMge_0101\\" /></FDataList></PsDataPacket>"}',
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-12-20T16:11:55.897",
						Password: ""
					},
					{
						UniqID: "afglda",
						IDCard: null,
						NickName: "afglda",
						Name: "A_分管领导A",
						Detail: null,
						Sex: 0,
						Birthday: "",
						Tel1: "",
						Tel2: "",
						Mob1: "15208243353",
						Mob2: "",
						EMail: "",
						QQ: "",
						WeiChat: "",
						WeiBo: "",
						WebUrl: "",
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10008],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm:
							'{"RightsData":"<PsDataPacket><FDataList ItemType=\\"PengeSoft.Account.RightInfo, PengeSoft.AccountEx\\"><RightInfo Code=\\"Sys_Acc_0101\\" /><RightInfo Code=\\"Sys_Acc_0102\\" /><RightInfo Code=\\"Sys_EntMge_0101\\" /><RightInfo Code=\\"Sys_Renju_0101\\" /><RightInfo Code=\\"Sys_Renju_0201\\" /><RightInfo Code=\\"Sys_Renju_0301\\" /></FDataList></PsDataPacket>"}',
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-12-26T16:22:18.567",
						Password: ""
					},
					{
						UniqID: "ec712ef7-0113-4d25-abb8-dca6df96c86e",
						IDCard: null,
						NickName: "asdf",
						Name: "asdf",
						Detail: null,
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
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10008],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm:
							'{"RightsData":"<PsDataPacket><FDataList ItemType=\\"PengeSoft.Account.RightInfo, PengeSoft.AccountEx\\"><RightInfo Code=\\"Sys_Acc_0101\\" /><RightInfo Code=\\"Sys_Acc_0102\\" /><RightInfo Code=\\"Sys_EntMge_0101\\" /><RightInfo Code=\\"Sys_Renju_0101\\" /><RightInfo Code=\\"Sys_Renju_0201\\" /><RightInfo Code=\\"Sys_Renju_0301\\" /></FDataList></PsDataPacket>"}',
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-12-20T14:59:26.493",
						Password: ""
					},
					{
						UniqID: "6d9ebe30-6b28-4d4a-afc5-b065f339de7c",
						IDCard: null,
						NickName: "B",
						Name: "B",
						Detail: null,
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
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10012],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm:
							'{"RightsData":"<PsDataPacket><FDataList ItemType=\\"PengeSoft.Account.RightInfo, PengeSoft.AccountEx\\"><RightInfo Code=\\"Sys_Acc_0101\\" /><RightInfo Code=\\"Sys_Acc_0102\\" /><RightInfo Code=\\"Sys_Renju_0301\\" /></FDataList></PsDataPacket>"}',
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-12-19T18:21:13.49",
						Password: ""
					},
					{
						UniqID: "bbzra",
						IDCard: null,
						NickName: "bbzra",
						Name: "B_编制人A",
						Detail: null,
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
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm: "",
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-10-18T14:17:58.263",
						Password: ""
					},
					{
						UniqID: "bfglda",
						IDCard: null,
						NickName: "bfglda",
						Name: "B_分管领导A",
						Detail: null,
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
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10009],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm: "",
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-10-18T14:16:23.467",
						Password: ""
					},
					{
						UniqID: "bmjlb",
						IDCard: null,
						NickName: "bmjlb",
						Name: "部门经理B",
						Detail: null,
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
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm: "",
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-10-18T10:34:53.667",
						Password: ""
					},
					{
						UniqID: "b63bfbdf-dda8-47dd-888d-cfbf9382308f",
						IDCard: null,
						NickName: "bmjle",
						Name: "部门经理e",
						Detail: null,
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
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm: "",
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-12-13T11:17:10.113",
						Password: ""
					},
					{
						UniqID: "bzqy1",
						IDCard: null,
						NickName: "bzqy1",
						Name: "编制企业2",
						Detail: null,
						Sex: 0,
						Birthday: null,
						Tel1: null,
						Tel2: null,
						Mob1: null,
						Mob2: null,
						EMail: "",
						QQ: null,
						WeiChat: null,
						WeiBo: null,
						WebUrl: null,
						HeadUrl: null,
						Memo: null,
						Organization: null,
						Position: null,
						Address: null,
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10004],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm: null,
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-10-16T20:29:55.18",
						Password: ""
					},
					{
						UniqID: "bzqy2",
						IDCard: null,
						NickName: "bzqy2",
						Name: "代理机构2",
						Detail: null,
						Sex: 0,
						Birthday: null,
						Tel1: null,
						Tel2: null,
						Mob1: null,
						Mob2: null,
						EMail: "",
						QQ: null,
						WeiChat: null,
						WeiBo: null,
						WebUrl: null,
						HeadUrl: null,
						Memo: null,
						Organization: null,
						Position: null,
						Address: null,
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10004],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm: null,
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-10-16T19:44:20.247",
						Password: ""
					},
					{
						UniqID: "0c7a8f82-8699-492e-b136-5ca0b844756a",
						IDCard: null,
						NickName: "bzra",
						Name: "编制人员A",
						Detail: null,
						Sex: 0,
						Birthday: null,
						Tel1: null,
						Tel2: null,
						Mob1: null,
						Mob2: null,
						EMail: "",
						QQ: null,
						WeiChat: null,
						WeiBo: null,
						WebUrl: null,
						HeadUrl: null,
						Memo: null,
						Organization: null,
						Position: null,
						Address: null,
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10003],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm: null,
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-10-13T10:10:00.773",
						Password: ""
					},
					{
						UniqID: "0932b141-cfc1-4dca-8e0b-65ff2b316ee2",
						IDCard: null,
						NickName: "bzrb",
						Name: "编制人员B",
						Detail: null,
						Sex: 0,
						Birthday: null,
						Tel1: null,
						Tel2: null,
						Mob1: null,
						Mob2: null,
						EMail: "",
						QQ: null,
						WeiChat: null,
						WeiBo: null,
						WebUrl: null,
						HeadUrl: null,
						Memo: null,
						Organization: null,
						Position: null,
						Address: null,
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10003],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm: null,
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-10-13T10:10:00.797",
						Password: ""
					},
					{
						UniqID: "64488731-0f40-4686-878c-ad6ec08852ca",
						IDCard: null,
						NickName: "bzree",
						Name: "编制人ee",
						Detail: null,
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
						HeadUrl: null,
						Memo: "",
						Organization: null,
						Position: null,
						Address: "",
						Zip: null,
						County: null,
						Province: null,
						City: null,
						GroupIds: [10026],
						Area: null,
						TypeCode: null,
						ClassCode: null,
						Tags: null,
						ExtParm: "",
						State: null,
						RegDate: "0001-01-01T00:00:00",
						UStatus: 0,
						LastModify: null,
						LastModifyTime: "2018-12-13T11:17:47.273",
						Password: ""
					}
				],
				checdUsers: []
			};
		},
		watch: {
			Token(value) {
				if (value) {
					console.log("第一次发送请求");
				}
			},
			nodeId(value) {
				if (value) {
					console.log("nodeId变化发送请求");
					this.checdUsers=[];
				}
			}
		},
		methods: {
			checkedItem(item) {
				if (this.checdUsers.includes(item.UniqID)) {
					this.checdUsers.splice(this.checdUsers.indexOf(item.UniqID), 1);
				} else {
					this.checdUsers.push(item.UniqID);
				}
			}
		},
		created() {
			// if(this.nodeId && this.$store.state.adminData.Token){
			// 	console.log("开始发送请求获取数据");
			// }
		}
	};
</script>

<style lang="scss" scoped>
.tusers {
	&-header {
		background-color: #f1f2f5;
		font-weight: bold;
	}
	&-body {
		position: absolute;
		top: 34px;
		bottom: 0;
		width: 100%;
		overflow: auto;
		ul:nth-child(2n + 1) {
			background-color: #f2f2f2;
		}
		ul:hover {
			background-color: #ececec;
		}
	}
}
.tusers-ul {
	font-size: 0;
	display: flex;
	justify-content: space-between;
}
.tusers-li {
	flex-shrink: 0;
	font-size: 12px;
	border: 1px solid #dee2e6;
	height: 26px;
	line-height: 26px;
	padding: 3px 6px;
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
}
.tusers-li--auto {
	border: 0;
	padding: 0;
	text-align: left;
	flex-grow: 1;
	display: flex;
	justify-content: space-evenly;
	div {
		height: 26px;
		line-height: 26px;
		padding: 3px 6px;
		border: 1px solid #dee2e6;
		width: 50%;
	}
}
.check-box {
	width: 22px;
	height: 22px;
	line-height: 22px;
	border: 1px solid #000;
	margin: auto;
	&__icon {
		transform: scale(0);
		background-color: #409eff;
		i {
			width: 100%;
			height: 100%;
			color: #fff;
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
</style>