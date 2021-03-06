import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/signup'
    },
    {
      path:'/signup',
      component:()=> import('./views/signup')
    },
    {
      path:'/people',
      component:()=> import('./views/people')
    },
    {
      path:'/vuex',
      component:()=> import('./views/vuex')
    }
  ]
})
