<template>
    <div id="search">
        <div class="search">
            <input type="text" placeholder="请输入搜索联系人" v-model="search" /><span><i class="fa fa-search"></i></span>
        </div>
        <p class="all">共有 {{items.length}} 个联系人</p>
        <div class="select">
            <input type="radio" name="contacts" checked @click="selectStatu=1">所有联系人
            <input type="radio" name="contacts" @click="selectStatu=2">亲人 
            <input type="radio" name="contacts" @click="selectStatu=3">朋友
            <input type="radio" name="contacts" @click="selectStatu=4">同学
        </div>
        <div class="ul" v-if="newItems.length">
            <contactItem
                v-for="item in newItems" 
                :key="item.id"
                :item="item"
                @remove="removeTodo"
                @change="change"
            /> 
        </div>
        <p class="none" v-else>
            没有联系人
        </p>
        <div class="arrow">
            <a href="#search">
                <i class="fa fa-arrow-up"></i>
            </a>
        </div>
    </div>
</template>

<<script>
    import contactItem from './noteItem'

    export default { 
        props: ["items"],
        data() {
            return {
                search: '', 
                selectStatu: 1,
            }
        },
        methods: { 
            removeTodo(id) {
                this.$emit('remove', id); 
            },
            change(obj) {
                this.$emit('change', obj);
            }
        },
        computed: {
            newItems: function () { 
                if(this.items.length==0)
                    return '';
                    
                if(this.search) { 
                    return this.items.filter((item)=> {
                            return (item.name.indexOf(this.search) != -1);
                        });
                } else {
                     switch (this.selectStatu) {
                    case 1:
                        return this.items;
                        break;
                    case 2:
                        return this.items.filter(function (item) {
                            return item.status === '亲人';
                        });
                        break;
                    case 3:
                        return this.items.filter(function (item) {
                            return item.status === '朋友';
                        });
                        break;
                    default:
                        return this.items.filter(function (item) {
                            return item.status === '同学';
                        });
                        break;    
                    } 
                }
            }
        },
        components: {
            contactItem
        }
    }
</script>

<style scoped>
@import '../assets/css/notes.css';
</style>

