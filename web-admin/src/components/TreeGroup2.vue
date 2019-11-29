<template>
	<div>
		<el-tree
			:data="groupData"
			:default-expanded-keys="[1]"
			node-key="NodeId"
			:props="defaultProps"
			@node-click="handleNodeClick"
			:current-node-key="currentNodeId"
            highlight-current
            ref="treeGroup"
		></el-tree>
	</div>
</template>

<script>
	export default {
		props: ["groupData"],
		data() {
			let defaultProps = {
				label: "Name",
				children: "Childs"
            };
            let currentNodeId = 1;
			return {
                defaultProps,
                currentNodeId
			};
        },
        watch: {
            groupData(groupData){
                if(groupData){
                  this.getDefaultNode()
                }
            }
        },
		methods: {
			handleNodeClick(data) {
                this.currentNodeId = data.NodeId;
                this.showDpartUsers(data.NodeId)
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
            }
        }
	};
</script>

<style lang="scss" scoped>
</style>