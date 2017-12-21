<template>
    <label :for="input.type">
        <span>{{input.type}}：</span>
        <input  type="text" 
                :class="className" 
                :id="input.type"  
                :disabled='input.edit'
                
                />
        <em v-show="show">*姓名只能由字母、数字、下划线组成</em>
    </label>
</template>

<script>
    export default {
        props: ["input"],  
        methods: {
            update(ev) {
                this.$emit('input', ev.target.value);
            }
        },
        computed: {
            className() {
                return {
                    read: this.input.edit,
                    error: this.show
                };
            },
            show() {
                switch(this.input.type) {
                case 'name': 
                    return /\W/g.test(this.input.type); 
                    break;
                case 'tel':
                    return /\D/g.test(this.input.type);
                    break;
                case 'psw':
                    return (this.input.type.length < 8)||(/\W/g.test(this.input.type));
                    break;
                }
            }
        }
    }
</script>

