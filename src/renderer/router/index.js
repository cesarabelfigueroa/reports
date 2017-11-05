import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Cliente',
      name: 'cliente',
      component: require('@/components/Cliente').default
    },
    {
      path: '/Formulario',
      name: 'formulario',
      component: require('@/components/Formulario').default
    },
    {
      path: '/Reporteria',
      name: 'reporteria',
      component: require('@/components/Reporteria').default
    },
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
