<template>
    <div class="login"> 
        <form>
            <label for="name"> 
                <input type="text" class="input" id="name" @focus.stop="focus=1" @blur="focus=0" v-model="name" placeholder="姓名">
                <em v-show="focus==1||nameIn==false">*姓名不能为空且只能由字母、数字、下划线组成</em>
            </label>
            <label for="tel">
                <input type="text" class="input" id="tel" @focus="focus=2" @blur="focus=0" v-model="tel" placeholder="手机号">
                <em v-show="focus==2||telIn==false">*手机号全为数字</em>
                <em v-show="req===false&&focus!=2">*该手机号已被注册</em>
            </label>
            <label for="psw" class="last">
                <input type="password" class="input" id="psw" @focus="focus=3" @blur="focus=0" v-model="psw" placeholder="密码（不少于6位）">
                <em v-show="focus==3||pswIn==false">*密码不能小于8位</em>
            </label> 
            <button class="loginSub" @click="addToSql">
                <span v-show="reg">注册速讯</span>
                <span v-if="req" v-show="result">注册成功</span>
                <span v-else v-show="result">重新注册</span>
                <i class="fa fa-spinner fa-spin" v-show="icon"></i>
                <i class="fa fa-check" v-if="req" v-show="result"></i>
                <i class="fa fa-times" v-else v-show="result"></i>
            </button>
        </form>
    </div>
</template> 

<script>  
    import qs from 'qs'; 

    export default {
        data() {
            return {
                name: '',
                tel: '',
                psw: '',
                icon: false, //控制滚动
                result: false, // 得到相应之后
                req: '',  // 控制注册成功与否字样
                reg: true, // 控制注册字样
                focus: 0,
                nameIn: true,
                telIn: true,
                pswIn: true
            };
        },
        methods: {
            addToSql() {   
                var b = 0;
                if(this.name!==''&& !/\W/g.test(this.name))
                    this.nameIn = true;
                else {
                    b = 1;
                    this.nameIn = false;
                }

                if(this.tel.length)
                    this.telIn = true;
                else {
                    b = 1;
                    this.telIn = false;
                }

                if(this.psw.length<8) {
                    b = 1;
                    this.pswIn = false;
                } else 
                    this.pswIn = true;
 

                if(b == 0) {
                    this.icon = true; 
                    this.result = false;
                    this.reg = true;
                    this.req = '';

                    setTimeout(() => {
                        // 如果没写后端
                        this.result = true;
                        this.req = true;
                        this.icon = false;
                        this.reg = false;

                        window.localStorage.username=this.name;
                        window.localStorage.usertel=this.tel;
                        window.localStorage.userpsw=this.psw;
  
                        // 如果写了后端用axios交互
                        // this.$http.post('http://127.0.0.1:3000/', qs.stringify({
                        //     name: this.name,
                        //     tel: this.tel,
                        //     psw: this.psw
                        // })).then((res)=> { 
                        //     this.result = true;
                        //     this.req = true;
                        //     this.icon = false;
                        //     this.reg = false;

                        //     this.name = '';
                        //     this.tel = '';
                        //     this.psw = '';
                        // }).catch((error)=> { 
                        //     this.result = true;
                        //     this.req = false; 
                        //     this.icon = false;
                        //     this.reg = false; 
                        // });
                    }, 1000);
                } 
            }
        }
    }
</script>


<style scoped>
@import '../assets/css/login.css'
</style> 