<template>
    <div>
        主页
    </div>
</template>

<script>


export default {
    data(){
        return {}
    },
    methods: {
        /**
         * 登录
         */
        logIn(){
            console.log('object');
            this.$axios.post('/Service/Authorize.svrx/Login', this.$qs.stringify({
                'loginId':'admin',
                'password': '123456',
                'userDefTag': '',
            })).then((res)=>{
                console.log(res);
            })
        }
    },
    created () {
        this.logIn();
    },
}
</script>

<style lang="scss" scoped>

</style>