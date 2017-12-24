import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/vuex' 

Vue.config.productionTip = false;
 
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    methods: {
        isLogin() {
          if(this.check === 1) {
            this.$router.replace('/contacts');
          } else {
            this.$router.replace('/home/register');
          }
        }
    },
    created() {
      this.isLogin();  // 根据登录状态路由
    },
    computed: {
        check: function() {
          return Number(sessionStorage.login);
        }
    }
})
