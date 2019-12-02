<template>
    <div class="hide-tier">
        <div class="split-into">

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@keyframes SplitInfo {
    from{
        margin-top: 0;
    }
    to{
        margin-top: 20%;
    }
}
.hide-tier{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #808080;
}
.split-into{
    animation: SplitInfo 1s ;
}
</style>