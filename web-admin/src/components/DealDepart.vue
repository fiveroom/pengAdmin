<template>
	<div>
		<el-dialog
			:visible.sync="showDilalog"
			width="498px"
			destroy-on-close
			custom-class="my-dialog"
			title="编辑分组信息"
			@close="$emit('closeDig')"
			:close-on-click-modal="false"
		>
			<div class="depart">
				<div class="depart-item">
					<p>父级分组</p>
					<input v-model="departInfo.Name" class="depart-input depart-input__name" type="text" readonly />
				</div>
				<div class="depart-item">
					<p>分组名称</p>
					<input v-model="Name" class="depart-input depart-input__text" type="text" />
				</div>
				<div class="depart-item">
					<p>合约管理工程师</p>
					<div class="depart-item__choice-inp">
						<input
							v-model="DptManager.Name"
							class="depart-input depart-input--no-border"
							type="text"
							readonly
						/>
						<button
							ref="choiceBtn1"
							@click="choiceName='ChoiceUserDia'; choiceType='DptManager'"
							:class="['choice_btn', departInfo.NodeId !=1?'choice_btn-hover choice_btn-active ':'disabled-border']"
						>选择</button>
					</div>
				</div>
				<div class="depart-item">
					<p>分管领导</p>
					<div class="depart-item__choice-inp">
						<input
							v-model="DptLeader.Name"
							class="depart-input depart-input--no-border"
							type="text"
							readonly
						/>
						<button
							@click="choiceName='ChoiceUserDia'; choiceType='DptLeader'"
							ref="choiceBtn2"
							:class="['choice_btn', departInfo.NodeId !=1?'choice_btn-hover choice_btn-active ':'disabled-border']"
						>选择</button>
					</div>
				</div>
				<div class="depart-item">
					<p class="textarea-title">备注</p>
					<el-input v-model="Remark" class="depart-input__textarea" type="textarea" :rows="4"></el-input>
				</div>
			</div>
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
		<component
			:is="choiceName"
			@closeDig="choiceName=''"
			@getChoiceU="choiceUser"
			:choiceType="choiceType"
		></component>
	</div>
</template>

<script>
	import { MessageBox } from "element-ui";
	import ChoiceUserDia from "../components/ChoiceUserDia";
	export default {
		props: ["departInfo", "DealDepartType"],
		data() {
			let DptLeader = {
				Name: null,
				UniqID: null
			};
			let DptManager = {
				Name: null,
				UniqID: null
			};
			return {
				Remark: null,
				Name: "",
				showDilalog: true,
				choiceName: null,
				DptManager,
				DptLeader,
				choiceType: "",
				newData: null
			};
		},
		watch: {
			departInfo(newV, oldV) {
				console.log(newV, oldV);
			}
		},
		methods: {
			judegBtnDis() {
				if (this.departInfo.NodeId === 1) {
					this.$refs.choiceBtn1.disabled = "disabled";
					this.$refs.choiceBtn2.disabled = "disabled";
				}
			},
			closeDig() {
				this.$emit("closeDig");
			},
			outDilalog() {
				this.showDilalog = false;
				this.$emit("closeDig");
			},
			/**
			 * 确认添加
			 */
			confirmAdd() {
				if (!this.Name) {
					MessageBox.confirm("组名未添加，是否添加", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}).catch(() => {
						this.outDilalog();
					});
				} else if(this.DealDepartType == "edit") {
					this.confirmUpdata()
				} else {
					this.updateData();
				}
			},
			/**
			 * 确认更新
			 */
			confirmUpdata(){
				let extAttrib = {};
				extAttrib.DptManager = this.DptManager;
				extAttrib.DptLeader = this.DptLeader;
				extAttrib.Remark = this.Remark;
				this.newData.Name = this.Name;
				this.newData.ExtAttrib = JSON.stringify(extAttrib);
				this.newData.isShow = true;
				this.newData.Childs = {
					isShow:true,
					MaxID: this.newData.MaxID,
					_Items:this.newData.Childs
				}
				delete this.newData.MaxID;
				this.$axios.post('/Service/RoleRightMge.svrx/UpdateDepartment', this.$qs.stringify({
					token: this.$store.state.adminData.Token,
					id: this.newData.NodeId,
					data: JSON.stringify(this.newData)
				})).then(res=>{
					console.log(res, '修改');
					this.$emit("confirm");
						this.outDilalog();
				}).catch(err=>this.outDilalog())
			},
			/**
			 * 添加数据
			 */
			updateData() {
				let data = {
					isShow: true,
					AdminIds: "",
					Childs: { isShow: true, MaxID: 0, _Items: [] },
					ExtAttrib: JSON.stringify({
						DptLeader: this.DptLeader,
						DptManager: this.DptManager,
						Remark: this.Remark
					}),
					Name: this.Name,
					NodeId: 0,
					OrderId: 0,
					ParentId: this.departInfo.NodeId
				};
				this.$axios
					.post(
						"/Service/RoleRightMge.svrx/AddDepartment",
						this.$qs.stringify({
							token: this.$store.state.adminData.Token,
							parentId: this.departInfo.NodeId,
							data: JSON.stringify(data)
						})
					)
					.then(() => {
						this.$emit("confirm");
						this.outDilalog();
					})
					.catch(() => {
						this.outDilalog();
					});
			},
			choicePeop(e) {
				console.log("dianwo");
			},
			choiceUser(data, type) {
				console.log(data, type);
				this[type].Name = data[0].Name;
				this[type].UniqID = data[0].UniqID;
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.judegBtnDis();
			});
		},
		created() {
			if(this.DealDepartType == "edit"){
				console.log(this.departInfo);
				this.Name = this.departInfo.Name;
				this.newData = Object.assign({}, this.departInfo);
				let extAttrib = JSON.parse(this.departInfo.ExtAttrib);
				this.DptManager = extAttrib.DptManager;
				this.DptLeader = extAttrib.DptLeader;
				this.Remark = extAttrib.Remark
			}
		},
		components: {
			ChoiceUserDia
		}
	};
</script>

<style lang="scss">
	.my-dialog {
		& > div:first-child {
			padding: 12px;
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
		}
	}
	.depart {
		padding: 12px;
	}
	.depart-item {
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
		&__choice-inp {
			display: flex;
			flex-grow: 1;
		}
		&__textarea {
			font-size: 12px;
		}
	}
	.depart-input {
		height: 24px;
		flex-grow: 1;
		border: 1px solid #ced4da;
		text-indent: 5px;
		font-size: 12px;
		outline: none;
		transition: box-shadow 0.3s;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
		&__name {
			color: #495057;
			background-color: #e9ecef;
		}
		&__text:focus {
			color: #495057;
			background-color: #fff;
			border-color: #80bdff;
			box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
		}
		&__textarea>textarea{
			font-size: 12px;
			outline: none;
			border: 1px solid #ced4da;
			transition: box-shadow 0.3s;
			border-top-right-radius: 2px;
			border-bottom-right-radius: 2px;
			padding: 5px;
		}
		&__textarea>textarea:focus{
			@extend .depart-input__text;
		}
		&--no-border {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}
	.choice_btn {
		position: relative;
		outline: none;
		font-size: 12px;
		padding: 3px 6px;
		/* border-color: #007bff; */
		background-color: #fff;
		color: #007bff;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
		transition: color 0.5s;
		transition: background-color 0.5s;
		transition: box-shadow 0.1s;
		border: 1px solid;
		&-hover {
			cursor: pointer;
			border-color: #007bff;
		}
		&-hover:hover {
			background-color: #007bff;
			color: #fff;
		}
		&-active:active {
			box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
		}
	}
	.deal-footer {
		padding: 12px;
		border-top: 1px solid #dee2e6;
		display: flex;
		justify-content: flex-end;
		&-btn {
			border-radius: 3px;
			outline: none;
			font-size: 12px;
			padding: 4px 6px;
			cursor: pointer;
			background-color: #fff;
			transition: color 0.3s;
			transition: box-shadow 0.3s;
			transition: background-color 0.3s;
			/* border-color: #007bff; */
			span {
				margin-left: 5px;
			}
			&--yes {
				border: 1px solid #28a745;
				color: #28a745;
				&:hover {
					background-color: #28a745;
					color: #fff;
				}
				&:active {
					box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.5);
				}
			}
			&--no {
				margin-left: 5px;
				border: 1px solid #6c757d;
				color: #6c757d;
				&:hover {
					background-color: #6c757d;
					color: #fff;
				}
				&:active {
					box-shadow: 0 0 0 2px rgba(108, 117, 125, 0.5);
				}
			}
		}
	}
	.disabled-border {
		border-color: #aaa;
		color: #aaa;
	}
</style>
