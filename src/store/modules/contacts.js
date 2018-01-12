import Vue from 'vue'; 
import router from '../../router';

const USER_INIT = 'USER_INIT';  // mail ilst初始化
const USER_ADD = 'USER_ADD';  // 添加联系人
const USER_REMOVE = 'USER_REMOVE'; 
const USER_CHANGE = 'USER_CHANGE';
const OWN_CHANGE = 'OWN_CHANGE';

var contactId = 0;

export default {
    state: {
        items: [],
        own: {}
    },
    mutations: {
        [USER_INIT](state, info) {
            state.items = info.items;
            state.own = info.own; 
        },
        [USER_ADD](state, user) {
            user.id = contactId++;
            user.imgSrc = '/static/img/userImg.png';
            state.items.push(user); 
            localStorage.items = JSON.stringify(JSON.parse(localStorage.items).push(user));
        },
        [USER_REMOVE](state, userId) {
            state.items = state.items.filter(function(item) {
                return item.id !== userId; 
            }); 
        },
        [USER_CHANGE](state, user) {
            for(var key in state.items) 
                if(state.items[key].id == user.id) {
                    state.items[key].name = user.name;
                    state.items[key].tel = user.tel; 
                } 
        },
        [OWN_CHANGE](state, user) {
            var oldName = state.own.name;
            state.own = user;
            sessionStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem(sessionStorage.userId, JSON.stringify(user));
        }
    },
    actions: {
        userInit({commit}) { 
            // 页面加载时获取数据
            if(sessionStorage.login && sessionStorage.login == 1) {
                var items = [
                    {name: '妈妈', tel: 1234555656, status: "亲人"},
                    {name: 'nic', tel: 1234555656, status: "朋友"},
                    {name: '爸爸', tel: 1234555656, status: "亲人"},
                    {name: 'wind', tel: 1234555656, status: "朋友"},
                    {name: 'lily', tel: 1234555656, status: "同学"},
                    {name: '爷爷', tel: 1234555656, status: "亲人"},
                    {name: 'tom', tel: 1234555656, status: "同学"},
                    {name: 'tom', tel: 1234555656, status: "同学"},
                    {name: 'tom', tel: 1234555656, status: "同学"},
                    {name: 'tom', tel: 1234555656, status: "同学"},
                    {name: '外婆', tel: 1234555656, status: "亲人"},
                    {name: 'tom', tel: 1234555656, status: "同学"},
                    {name: 'tom', tel: 1234555656, status: "同学"},
                    {name: 'tom', tel: 1234555656, status: "同学"},
                    {name: '外婆', tel: 1234555656, status: "亲人"},
                ];
                items = items.filter((item)=>{
                    item.id = contactId++;
                    item.imgSrc = '/static/img/userImg.png';
                    return item;
                });
                localStorage.items = JSON.stringify(items);
                var own = JSON.parse(sessionStorage.user);

                commit(USER_INIT, {
                    items: JSON.parse(localStorage.items),
                    own: own
                });
            } else {
                alert('请先登录！'); 
                router.replace('/home/login');
            }
        },
        userAdd({commit}, user) {
            commit(USER_ADD, user);
        },
        userRemove({commit}, userId) {
            commit(USER_REMOVE, userId);
        },
        userChange({commit}, user) {
            commit(USER_CHANGE, user);
        },
        ownChange({commit}, user) {
            commit(OWN_CHANGE, user);
        }
    }
}