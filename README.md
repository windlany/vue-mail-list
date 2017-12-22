# mail list 

## 前言
> 最近在学习vue，就写了一个简易的SPA通讯录项目，该项目用了
> - vue 
> - vue-router
> - axios  
> -  localStorage
> 
> 写这个项目之前我用vue写过很多小的页面部件，比如选项卡、路由跳转之类的，但毕竟这些涉及的知识是零散的，当系统的学习了之后我就想做一个整体性的项目，一方面巩固知识一方面打通经脉，所以就写了这个通讯录。
>
> 目前这个项目只是实现了大概结构，其实它的可扩展性很高，比如后期可以用node写一个后台与之交互，用vuex状态管理等等，后期我会一直维护，完善以及优化项目，也会根据需求增添个别功能，学vue的朋友也可以clone下来练练手。
>
>从零出发完成一个SPA。


## 动图展示
![](https://github.com/windlany/mail_list/blob/master/static/img/contacts.gif)

## 运行项目
``` bash
# clone项目到本地
git clone https://github.com/windlany/mail_list.git

# 安装项目依赖
npm install

# 将项目部署在localhost:8080，运行一下命令打开浏览器的localhost:8080查看
npm run dev 
```

## 后期完善的地方
> 由于该项目耗时较短只是写了大概的功能，很多细节需要完善与修正，我也会持续跟进完善的
> - vuex状态管理
> - 添加node后台与之交互
> - ...

## v.1
- 实现路由跳转
- localStorage缓存用户信息
- 项目组件化
- axios与后台交互

## v.2
- 添加vuex状态管理
- 将localStorage替换为sessionStorage，因为目前项目比较简单，没必要用localStorage，后期可能会用localStorage缓存所有用户信息，用sessionStorage缓存当前登录用户信息
- 删去了axios的交互，因为目前是没有后台的，日后与后台交互的版本会添加上去。

#### 随着学习的深入可以做更多的扩展，刚学vue的朋友可以clone下来练练手，大家相互学习
