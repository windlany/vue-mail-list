<template>
    <div class="login"> 
        <form>
            <label for="name"> 
                <input type="text" class="input" id="name" v-model="tel" placeholder="手机号">
            </label>
            <label for="psw" class="last">
                <input type="password" class="input" id="psw" v-model="psw" placeholder="密码">
                <em v-show="req">*用户或密码错误</em>
            </label>
            <button class="loginSub" @click="login">
                登 录
                <i class="fa fa-spinner fa-spin" v-show="icon"></i>
            </button>
        </form>
    </div>
</template> 

<script>
    import qs from 'qs';

    export default {
        data() {
            return {
                tel: '',
                psw: '',
                icon: false,
                req: false
            };
        },
        methods: {
            login() { 
                this.icon = true;
                this.req = false; 
                setTimeout(() => {
                    this.$http.post('http://127.0.0.1:3000/', qs.stringify({
                        user_tel: this.tel,
                        user_psw: this.psw
                    })).then((res)=> { 
                        this.icon = false;
                        window.localStorage.token = res.data.token;
                        this.$router.replace('/contacts');

                        this.tel = '';
                        this.psw = '';
                    }).catch((error)=> { 
                        this.icon = false;
                        this.req = true;
                    });
                }, 1000);
            }
        }
    }
</script>

<style scoped>
@import '../assets/css/login.css'
</style>