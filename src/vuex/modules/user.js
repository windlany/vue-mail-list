import Vue from 'vue'; 

const REGISTER = 'REGISTER'; // 注册
const SIGN_IN = 'SIGN_IN'; // 登录
const SIGN_OUT = 'SIGN_OUT';  // 退出登录 
const CHANGE_INFO = 'CHANGE_INFO'; // 改变个人信息

export default {
    state: {
        own: {}
    },  // user为当前登录用户
    mutations: {  
        [REGISTER](state, user) {
            // 本地存储用户信息 
            localStorage.setItem('user', JSON.stringify(user));  
            sessionStorage.register = 1; 
            // 判断是否同手机号
        },
        [SIGN_IN](state, user) {  
            // 根据tel找本地相应user
            var localuser = JSON.parse(localStorage.getItem('user'));
 
            // 判断是否正确
            if(user.tel == localuser.tel && user.psw == localuser.psw) {
                sessionStorage.login = 1;  // sessionStorage存储是否为登录状态
                state.own = localuser;
            } else {
                sessionStorage.login = 0;
            }  
        },
        [SIGN_OUT](state) {
            sessionStorage.clear();
            state.own = {};
        },
        [CHANGE_INFO](state, user) {  // 改变用户个人信息
            localStorage.setItem('user', JSON.stringify(user)); 
            state.own = user 
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
 