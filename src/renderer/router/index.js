import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: require('@/components/Home').default
    },
    {
      path: '/Cliente',
      name: 'cliente',
      component: require('@/components/Cliente').default
    },
    {
      path: '/Formulario/:test',
      name: 'formulario',
      component: require('@/components/Formulario').default,
      props: true
    },
    {
      path: '/Reportes',
      name: 'reportes',
      component: require('@/components/Reportes').default
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
