import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Index from '@/components/Index'
import Chapter from '@/components/Chapter'

Vue.use(Router)

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
  }]
})
