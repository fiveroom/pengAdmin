<template>
	<div class="home">
		<section class="left-side">
			<header class="left-side-header">
				<el-button class="btn btn--safe" size="mini" icon="el-icon-plus">添加部门</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-edit">变价部门信息</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-user-solid">设备管理员</el-button>
				<el-button class="btn btn--danger" size="mini" icon="el-icon-close">删除</el-button>
			</header>
			<router-link to="/tdata">点我</router-link>
		</section>
		<section class="right-side">
			<header class="right-side-header">
				<el-input class="search-user" size="mini" placeholder="登录账号或名称" v-model="searchKey">
					<i slot="suffix" class="el-input__icon el-icon-search"></i>
				</el-input>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-plus">添加用户</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-edit">编辑用户</el-button>
				<el-button class="btn btn--danger" size="mini" icon="el-icon-close">删除用户</el-button>
				<el-button class="btn btn--safe" size="mini" icon="el-icon-plus">组增加用户</el-button>
				<el-button class="btn btn--danger" size="mini" icon="el-icon-close">组删除用户</el-button>
			</header>
			<router-view />
		</section>
	</div>
</template>

<script>
	export default {
		data() {

			return {
				searchKey: ""
			};
		},
		methods: {
			/**
			 * 登录
			 */
			logIn() {
				console.log("object");
				this.$axios
					.post(
						"/Service/Authorize.svrx/Login",
						this.$qs.stringify({
							loginId: "admin",
							password: "123456",
							userDefTag: ""
						})
					)
					.then(res => {
						console.log(res);
					});
			}
		},
		created() {
			// this.logIn();
		}
	};
</script>

<style lang="scss" scoped>
	@mixin headerFlex {
		display: flex;
		padding: 10px 20px;
		background-color: #f8f8f8;
		border-bottom: 1px solid #e0e0e0;
	}
	.home {
		height: 100vh;
		display: flex;
		flex-wrap: nowrap;
	}
	.left-side {
		width: 500px;
		border-right: 1px solid #e0e0e0;
		&-header {
			@include headerFlex;
		}
	}
	.right-side{
		flex-grow: 1;
		&-header{
			@include headerFlex;
		}
	}
	.btn {
		color: #fff;
		&--safe {
			background-color: #007bff;
			&:focus{

			}
		}
		&--danger {
			background-color: #e57983;
		}
	}
	.search-user{
		margin-right: 10px;
		width: 160px;
	}
</style>