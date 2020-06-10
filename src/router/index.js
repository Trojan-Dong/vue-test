import Vue from 'vue'
import Router from 'vue-router' //引入路由
import HelloWorld from '@/components/HelloWorld' //开始页
import Test from '@/components/Test' //测试页
import Index from '@/components/Index' //首页
import Chapter from '@/components/Chapter' //章节目录
import Content from '@/components/Content' ///内容页
import BookShelf from '@/components/BookShelf' //书架
import Login from '@/components/Login' //登录
import My from '@/components/info/My' //用户信息


Vue.use(Router)

const originalPush = Router.prototype.push //设置可以路由到当前页
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/test',
    name: 'test',
    component: Test
  }, {
    path: '/index',
    name: 'index',
    component: Index
  }, {
    path: '/chapter',
    name: 'chapter',
    component: Chapter
  }, {
    path: '/content',
    name: 'content',
    component: Content
  }, {
    path: '/bookShelf',
    name: 'bookShelf',
    component: BookShelf
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/my',
    name: 'my',
    component: My
  }]
})
