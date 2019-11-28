<template>
	<div>
		<el-table
			ref="multipleTable"
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange"
			:row-class-name="rowHighLight"
            :cell-style="textCenter"
            border
            height=''
		>
			<el-table-column type="selection" width="55"></el-table-column>
			<!-- <el-table-column label="" width="120">
				<template slot-scope="scope">{{ scope.row.date }}</template>
			</el-table-column> -->
			<el-table-column prop="" label="" width="120"></el-table-column>
			<el-table-column prop="" label="" width="120"></el-table-column>
			<el-table-column prop="name" label="登录账号" width="120"></el-table-column>
			<el-table-column prop="address" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="address" label="所属分组" show-overflow-tooltip></el-table-column>
			<el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
		</el-table>
		<div style="margin-top: 20px">
			<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
			<el-button @click="toggleSelection()">取消选择</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [
					{
						date: "2016-05-03",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-02",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-04",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-01",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-08",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-06",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-07",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-02",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-04",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-01",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-08",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-06",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-07",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-02",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-04",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-01",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-08",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-06",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-07",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-02",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-04",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-01",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-08",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-06",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-07",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-02",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-04",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-01",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-08",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-06",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-07",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-02",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-04",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-01",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-08",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-06",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-07",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-02",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-04",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-01",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-08",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-06",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-07",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-02",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-04",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-01",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-08",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-06",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-07",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-02",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-04",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-01",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-08",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-06",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					},
					{
						date: "2016-05-07",
						name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        status: '年后'
					}
				],
				multipleSelection: []
			};
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
					return "even-index";
				}
				return "odd-index";
            },
            textCenter({row, column, rowIndex, columnIndex}){
                if(columnIndex === 6){
                    return {
                        'text-align': 'center'
                    }
                }
                return {}
            },
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		}
	};
</script>

<style lang="scss">
	tr.even-index {
		background-color: red;
	}
	tr.odd-index {
        
		background-color: skyblue;
	}
</style>