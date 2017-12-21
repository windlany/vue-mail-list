<template>
    <div>
        <h2>个人信息</h2> 
        <div class="form"> 
            <ownItem />
             
            <label v-if="edit">
                <span></span>
                <button class="nomal large" @click="edit=false">编辑信息</button>
            </label>
            <label class="editing" v-else>
                <span></span>
                <button class="save" @click="change" :disabled="save">保存</button>
                <button class="return" @click="notChange">返回</button>
            </label>
        </div>    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {type: 'name', edit: true, }
                ],
                name: '',
                tel: '',
                psw: '',  
                oldName: '123',
                oldTel: '1231212112',
                oldPsw: '123412341',
                edit: true,
                nameIn: false,
                telIn: false,
                pswIn: false
            }
        }, 
        methods: {
            change() { 
                this.edit = true; 
                this.oldName = this.name;
                this.oldTel = this.tel;
                this.oldPsw = this.psw;
 
                /* have ajax to save info*/
            },
            notChange() {
                this.edit = true; 
                this.name = this.oldName;
                this.tel = this.oldTel;
                this.psw = this.oldPsw;

                this.nameIn = false;
                this.telIn = false;
                this.pswIn = false;
            }
        },
        computed: { 
            // 是否禁用保存按钮
            save: function() {
                this.nameIn = /\W/g.test(this.name); 
                this.telIn = /\D/g.test(this.tel);
                this.pswIn = (this.psw.length < 8)||(/\W/g.test(this.psw));

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
