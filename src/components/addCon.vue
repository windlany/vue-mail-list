<template>
    <div>
        <h2>添加联系人</h2> 
        <div class="form">
            <label for="name">
                <span>姓名</span>
                <input type="text" 
                        id="name" 
                        v-model="name" 
                        :class="{'error': nameIn}" 
                        placeholder="请输入姓名" />
                <em v-show="nameIn">*姓名不能为空且只能由字母、数字、下划线组成</em>
             </label>
            <label for="tel">
                <span>电话号码</span>
                <input type="text" id="tel" v-model="tel" :class="{'error': telIn}" placeholder="请输入电话号码" />
                <em v-show="telIn">*不能为空且全部为数字组成</em>
            </label> 
            <label>
                <span>与我的关系</span>
                <select v-model="status">
                    <option selected>朋友</option>
                    <option>亲人</option>
                    <option>同学</option>
                </select>
            </label>
            <label>
                <span></span>
                <button :class="{'nomal': true, 'btn': save}" @click.stop="add" :disabled="save">添  加</button>
            </label>
        </div>    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                tel: '',
                status: '朋友', 
            }
        },
        methods: {
            add(ev) { 
                if(this.name&&this.tel) {
                    this.$emit('add', {
                        name: this.name,
                        tel: this.tel, 
                        status: this.status,
                    });
                    this.name = '';
                    this.tel='';  
                } else {
                    if(!this.name)
                        this.name = '请输入姓名';
                    if(!this.tel)
                        this.tel = '请输入电话号码';
                }    
            }
        },
        computed: {  
            nameIn() {              
                return /\W/g.test(this.name); 
            },
            telIn() { 
                return  /\D/g.test(this.tel);
            },
            save() {  // 符合规范返回false 
                var result = (this.nameIn||this.telIn); 
                return result;
            } 
        }
    }
</script>

<style scoped>
@import '../assets/css/addCon.css'
</style>
