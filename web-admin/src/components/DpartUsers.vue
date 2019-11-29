<template>
	<div id="department-users">
		<el-table
			ref="multipleTable"
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange"
			:row-class-name="rowHighLight"
			:cell-style="textCenter"
			border
			:header-row-class-name="()=>'department-users__head'"
			:header-row-style="tableHeadRow"
			:header-cell-style="tableHeadCell"
		>
			<el-table-column type="index" width="40"></el-table-column>
			<el-table-column type="selection" width="40"></el-table-column>
			<el-table-column prop="NickName" label="登录账号" width="120"></el-table-column>
			<el-table-column prop="Name" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="GroupIds" label="所属分组" show-overflow-tooltip></el-table-column>
			<el-table-column prop="UStatus" width="100" label="状态" show-overflow-tooltip></el-table-column>
		</el-table>
		<div style="margin-top: 20px">
			<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
			<el-button @click="toggleSelection()">取消选择</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		// token=Y1Hapaa3y9TuoQ3D3D&keyword=&id=1&pageIndex=1&pageSize=20
		data() {
			let pageInfo = {
				pageIndex: 1,
				pageSize: 20
			};
			return {
				tableData: [],
				multipleSelection: []
			};
		},
		props:["Token", "id"],
		watch:{
			Token(value){
				if(value){
					this.getDepartmentUser();
				}
			}
		},
		methods: {
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			rowHighLight({ row, rowIndex }) {
				if (rowIndex % 2 === 0) {
					return "even-index body-cell";
				}
				return "odd-index body-cell";
			},
			textCenter({ row, column, rowIndex, columnIndex }) {
				if (columnIndex === 6) {
					return {
						"text-align": "center"
					};
				}
				return {};
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			/**
			 * 表头行Style
			 */
			tableHeadRow() {
				return {
					"height": "26px"
				};
			},
			/**
			 * 表头单元格style
			 */
			tableHeadCell({row, column, rowIndex, columnIndex}){
				let styleObj = {
					"border-left":"1px solid #dee2e6",
					"border-top-width": '0',
					"font-size": "12px",
					"font-weight": "bold",
					"border-bottom-width": "2px",
					"padding": "0",
					"line-height": "23px",
					"color": "#000",
					"box-sizing": "border-box",
					"background-color": "#f1f2f5",
					"vertical-align": "middle"
				}
				if(columnIndex === 0){
					return Object.assign(styleObj, {
						"border-left-width": '0'
					})
				}
				return styleObj
			},
			getDepartmentUser() {
				console.log(this.$store.state.adminData.Token, "Token");
				this.$axios
					.post(
						"/Service/RoleRightMge.svrx/GetDepartmentUsers",
						this.$qs.stringify({
							token: this.$store.state.adminData.Token,
							keyword: "",
							...this.$route.query,
							...this.pageInfo
						})
					)
					.then(res => {
						if (res.data.ErrorCode === 0) {
							this.tableData = Object.assign(
								[],
								res.data.Data._Items
							);
						}
					})
					.catch(err => console.log(err));
			}
		},
         beforeRouteUpdate (to, from, next) {
			 console.log('根性');
			this.getDepartmentUser()
			next()
         },
		created() {
		}
	};
</script>

<style lang="scss">
	tr.body-cell{
		border: 1px solid #dee2e6;
		&:hover{
			background-color: #ececec;
		}
	}
	tr.even-index {
		background-color: #f2f2f2;
		&:hover{
			background-color: transparent;
		}
	}
	tr.odd-index {
		background-color: #fff;
		&:hover{
			background-color:transparent;
		}
	}


</style>