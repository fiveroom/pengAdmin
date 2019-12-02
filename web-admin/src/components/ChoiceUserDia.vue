<template>
	<el-dialog
		:visible.sync="showDilalog"
		width="800px"
		destroy-on-close
		custom-class="choice-my-dialog"
		title="选择用户"
		:close-on-click-modal="false"
	>
		<header class="search-dialog">
			<el-input
				class="search-dialog-inpu"
				size="mini"
				placeholder="登录账号或名称"
				v-model="searchKey"
                @close="$emit('closeDig')"
			>
				<i slot="suffix" class="el-input__icon el-icon-search"></i>
			</el-input>
		</header>
		<div class="choice-view">
			<dpart-users
				@pitchOn="choiceUsers"
				class="choice-table"
				:nodeId="1"
				:choice="true"
				:Token="$store.state.adminData.Token"
                :searchKey="searchKey"
			/>
		</div>
		<footer class="deal-footer">
			<button @click="confimChoice" class="deal-footer-btn deal-footer-btn--yes">
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
	import DpartUsers from "../components/DpartUsers";
	export default {
		props: ["nodeId", "choiceType"],
		data() {
			return {
				showDilalog: true,
				searchKey: ""
			};
        },
		methods: {
			choiceUsers(users) {
				console.log(users);
				this.choiceUsersIonfo = users.slice(0);
			},
			confimChoice() {
				this.outDilalog()
				this.$emit("getChoiceU", this.choiceUsersIonfo, this.choiceType);
            },
            outDilalog(){
                this.showDilalog = false;
				this.$emit("closeDig");
            }
		},
		components: {
			"dpart-users": DpartUsers
		},
		created() {}
	};
</script>

<style lang="scss">
	.choice-my-dialog {
		& > div {
			padding: 12px;
		}
		& > div:first-child {
			span {
				font-size: 12.5px;
				line-height: 21px;
			}
			border-bottom: 1px solid #dee2e6;
			display: flex;
			justify-content: space-between;
			button {
				position: inherit;
			}
		}
		& > div:last-child {
			padding: 0;
			padding-bottom: 12px;
		}
	}
	.choice-view {
		position: relative;
		height: 400px;
	}
    .search-dialog{
		background-color: #f8f8f8;
		padding: 6px 12px;
		border-bottom: 1px solid #dee2e6;
    }
	.search-dialog-inpu {
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