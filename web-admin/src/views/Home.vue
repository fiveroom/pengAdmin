<template>
	<div class="home">
		<section class="left-side">
			<header class="left-side-header">
				<button class="btn">
					<i class="el-icon-plus"></i>
					<span>添加部门</span>
				</button>
				<button class="btn">
                    el-icon-edit
                    <span>变价部门信息</span>
                </button>
				<button class="btn">设备管理员</button>
				<button class="btn">删除</button>
			</header>
		</section>
		<section class="right-side">
			<header class="right-side-header">
				<el-input placeholder="登录账号或名称" v-model="searchKey">
					<i slot="suffix" class="el-input__icon el-icon-search"></i>
				</el-input>
				<button class="btn">添加用户</button>
				<button class="btn">编辑用户</button>
				<button class="btn">删除用户</button>
				<button class="btn">组增加用户</button>
				<button class="btn">组删除用户</button>
			</header>
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
			this.logIn();
		}
	};
</script>

<style lang="scss" scoped>
	.home {
		display: flex;
		flex-wrap: nowrap;
	}
	.btn {
		padding: 3px 6px;
		border-radius: 3px;
		outline: none;
		border: 0;

	}
</style>