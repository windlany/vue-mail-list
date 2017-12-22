<<template>
    <div id="mailList">
        <div class="head">
            <div class="logo">速讯</div>
            <div class="welcome">
                <span class="name">{{own.name}}</span>，你好
                <div class="img">
                    <img src="/static/img/contact.jpg"/>
                </div>
            </div>
        </div>
        <div class="lside">
            <ul>
                <li :class="{'act': clickId==1}" @click="clickId=1">
                    <router-link to="/contacts"><i class="fa fa-address-book-o"></i> 通讯录</router-link>
                </li>       
                <li :class="{'act': clickId==2}" @click="clickId=2">
                    <router-link to="/contacts/add"><i class="fa fa-reorder"></i> 添加信息</router-link>
                </li>  
                <li :class="{'act': clickId==3}" @click="clickId=3">
                    <router-link to="/contacts/own"><i class="fa fa-user-o"></i> 个人中心</router-link>
                </li>  
            </ul>
             <div class="out" @click="out">
                <i class="fa fa-cog"></i> 退出登录
            </div>
        </div>
        <div class="rside">
            <router-view
                :items="items"
                :own="own"
                @remove="removeItem"
                @add="addItem"
                @change="changeItem"
                @changeOwn="changeOwn"
            ></router-view>
        </div>
    </div> 
</template>

<script>  
    import { mapState, mapActions } from 'vuex';

    var contactId = 0;
    export default {
        data() {
            return {
                own: {
                    name: JSON.parse(sessionStorage.user).name,
                    tel: JSON.parse(sessionStorage.user).tel,
                    psw: JSON.parse(sessionStorage.user).psw,
                },
                clickId: 1,
                items: 
                [
                    {id: contactId++, imgSrc: '/static/img/userImg.png', name: '妈妈', tel: 1234555656, status: "亲人"},
                    {id: contactId++, imgSrc: '/static/img/logo.png', name: 'nic', tel: 1234555656, status: "朋友"},
                    {id: contactId++, imgSrc: '/static/img/userImg.png', name: '爸爸', tel: 1234555656, status: "亲人"},
                    {id: contactId++, imgSrc: '/static/img/logo.png', name: 'wind', tel: 1234555656, status: "朋友"},
                    {id: contactId++, imgSrc: '/static/img/userImg.png', name: 'lily', tel: 1234555656, status: "同学"},
                    {id: contactId++, imgSrc: '/static/img/userImg.png', name: '爷爷', tel: 1234555656, status: "亲人"},
                    {id: contactId++, imgSrc: '/static/img/userImg.png', name: 'tom', tel: 1234555656, status: "同学"},
                    {id: contactId++, imgSrc: '/static/img/logo.png', name: '外婆', tel: 1234555656, status: "亲人"},
                ]
            }
        }, 
        // computed: mapState({
        //     own2: state => state.nowUser
        // }),  
        methods: { 
            ...mapActions([
                'signOut',
                'changeInfo'
            ]),
            removeItem(id) {
                this.items = this.items.filter(function (item) {
                    return item.id !== id; 
                }); 
            },
            addItem(item) {
                item.id = contactId++;
                item.imgSrc = '/static/img/userImg.png';
                this.items.push(item); 
            },
            changeItem(obj) {
                for(var key in this.items) 
                    if(this.items[key].id == obj.id) {
                        this.items[key].name = obj.name;
                        this.items[key].tel = obj.tel; 
                    }  
            },
            changeOwn(obj) { 
                this.own.name = obj.name;
                this.own.tel = obj.tel; 
                this.own.psw = obj.psw; 
                
                // if not have next
                this.changeInfo({
                    name: obj.name,
                    tel: obj.tel,
                    psw: obj.psw
                });
            },
            out() {
                this.signOut();
                this.$router.replace('/home/login');
            }
        } 
    }
</script>

<style scoped>
@import '../assets/css/mailList.css';
</style>
