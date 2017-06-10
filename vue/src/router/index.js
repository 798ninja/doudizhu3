import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import GameStart from '@/components/GameStart'
import Register from '@/components/user/Register'
import GameHill from '@/components/hill/GameHill'
import Room from '@/components/room/Room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GameStart',
      component: GameStart
    },
    {
    	path:'/register',
    	name:'register',
    	component:Register
    },
    {
      path:'/gamehill',
      name:'gamehill',
      component:GameHill
    },
    {
      path:'/room',
      name:'room',
      component:Room
    }
  ]
})
