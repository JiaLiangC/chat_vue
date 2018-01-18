import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Chat from '@/views/chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
    	path: '/chat',
    	name: 'chat',
    	component: Chat
    }
  ]
})
