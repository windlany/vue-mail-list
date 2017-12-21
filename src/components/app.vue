<template>
    <div id="contain">  
        <h1>速  讯</h1>
        <h2>拉近我们心灵的距离，感知爱与牵绊</h2>
        <div class="btns">
            <router-link to="/home/register" class="btn">注册</router-link>
            <router-link to="/home/login">登录</router-link>
        </div>
        <router-view></router-view> 
    </div>
</template>  

<style scoped>
@import '../assets/css/app.css'
</style>