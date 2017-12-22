import Vue from 'vue'; 

const REGISTER = 'REGISTER'; // 注册
const SIGN_IN = 'SIGN_IN'; // 登录
const SIGN_OUT = 'SIGN_OUT';  // 退出登录 
const CHANGE_INFO = 'CHANGE_INFO'; // 改变个人信息

export default {
    state: {},  // user为当前登录用户
    mutations: {  
        [REGISTER](state, user) {
            // 本地存储用户信息 
            sessionStorage.setItem('user', JSON.stringify(user));  
        },
        [SIGN_IN](state, user) {  
            var suser = ''; 
            if(sessionStorage.length!=0)
                suser = JSON.parse(sessionStorage.getItem('user'));
 
            // 判断是否正确
            if(user.tel == suser.tel && user.psw == suser.psw) {   
                sessionStorage.status = 1; 
                Object.assign(state, {nowUser: suser});  // 将用户信息整合到state中
            } else {
                sessionStorage.status = 0;
            } 
            console.log(state);
        },
        [SIGN_OUT](state) {
            sessionStorage.clear();
            // state键数组  删除state对象的key属性
            Object.keys(state).forEach(key => Vue.delete(state, key));
        },
        [CHANGE_INFO](state, newU) {  // 改变用户个人信息
            sessionStorage.setItem('user', JSON.stringify(newU)); 
            Object.keys(state).forEach(key => Vue.delete(state, key));
            Object.assign(state, {nowUser: newU});  // 将用户信息整合到state中
            console.log(state);
        }
    },
    actions: {
        register({commit}, user) { // 触发注册操作
            commit(REGISTER, user);
        },
        signIn({commit}, user) {
            commit(SIGN_IN, user);  // 触发登录操作
        },
        signOut({commit}) {
            commit(SIGN_OUT);  // 触发退出登录操作
        },
        changeInfo({commit}, user) {  // 修改个人信息
            commit(CHANGE_INFO, user);
        }
    }
}
 