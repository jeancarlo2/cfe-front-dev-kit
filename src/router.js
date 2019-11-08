import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/registrar',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/lancamentos',
      name: 'lancamentos',
      component: () => import('./views/Lancamentos.vue')
    },
    {
      path: '/contas',
      name: 'contas',
      component: () => import('./views/Contas.vue')
    },
    {
      path: '/metas',
      name: 'metas',
      component: () => import('./views/Metas.vue')
    },
    {
      path: '/listas',
      name: 'listas',
      component: () => import('./views/Listas.vue')
    },
    {
      path: '/lista/:id',
      name: 'lista',
      component: () => import('./views/Lista.vue')
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: () => import('./views/Relatorios.vue')
    },
    {
      path: '/conta',
      name: 'conta',
      component: () => import('./views/Conta.vue')
    },
  ]
})
