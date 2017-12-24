<template>
    <div>
        <h2>个人信息</h2> 
        <div class="form"> 

            <label for="name">
                <span>姓名：</span>
                <input :class="className.name" 
                        type="text" 
                        id="name" 
                        v-model="name" 
                        :disabled='edit'/>
                <em v-show="nameIn">*姓名不能为空且只能由字母、数字、下划线组成</em>
            </label>
            <label for="tel">
                <span>电话号码：</span>
                <input :class="className.tel" type="text" id="tel" v-model="tel" :disabled='edit'/>
                <em v-show="telIn">*不能为空且全部为数字</em>
            </label> 
            <label for="psw">
                <span>密码：</span>
                <input :class="className.psw" type="text" id="psw" v-model="psw" :disabled='edit'/>
                <em v-show="pswIn">*密码不少于6位且只能由字母、数字、下划线组成</em>
            </label> 
            <label v-if="edit">
                <span></span>
                <button class="nomal large" @click="edit=false">编辑信息</button>
            </label>
            <label class="editing" v-else>
                <span></span>
                <button :class="{'save': !save, 'return': save}" @click="change" :disabled="save">保存</button>
                <button class="return" @click="notChange">返回</button>
            </label> 
        </div>    
    </div>
</template>

<script>
    export default {
        props: ["own"],
        data() {
            return {
                name: this.own.name,
                tel: this.own.tel,
                psw: this.own.psw,   
                edit: true,
                nameIn: false,
                telIn: false,
                pswIn: false
            }
        }, 
        methods: {
            change() { 
                if(this.name&&this.tel&&this.psw) {
                    this.edit = true;  
                    this.$emit('changeOwn', {
                        name: this.name,
                        tel: this.tel,
                        psw: this.psw
                    });
                } 
            },
            notChange() {
                this.edit = true; 
                this.name = this.own.name;
                this.tel = this.own.tel;
                this.psw = this.own.psw;   

                this.nameIn = false;
                this.telIn = false;
                this.pswIn = false;
            } 
        },
        computed: { 
            // 是否禁用保存按钮
            save: function() {
                this.nameIn = /\W/g.test(this.name)||this.name.length<1; 
                this.telIn = /\D/g.test(this.tel)||this.tel.length<1; 
                this.pswIn = (this.psw.length < 6)||(/\W/g.test(this.psw));

                var result = !(!this.nameIn&&!this.telIn&&!this.pswIn);
                return result;
            },
            className: function() {
                return {
                    name: {
                        read: this.edit,
                        error: this.nameIn
                    },
                    tel: {
                        read: this.edit,
                        error: this.telIn
                    },
                    psw: {
                        read: this.edit,
                        error: this.pswIn
                    }
                };
            }
        }
    }
</script>

<style>
@import '../assets/css/own.css';
</style>
