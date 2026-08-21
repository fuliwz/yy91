import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'YY91 - 首页' }
  },
  {
    path: '/category/:id/:page?',
    name: 'category',
    component: () => import('../views/Category.vue'),
    props: true,
    meta: { title: '分类列表' }
  },
  {
    path: '/play/:id',
    name: 'play',
    component: () => import('../views/Play.vue'),
    props: true,
    meta: { title: '在线播放' }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue'),
    meta: { title: '搜索' }
  },
  {
    path: '/novel/:type?',
    name: 'novel',
    component: () => import('../views/Novel.vue'),
    props: true,
    meta: { title: '小说' }
  },
  {
    path: '/read/:id',
    name: 'read',
    component: () => import('../views/Read.vue'),
    props: true,
    meta: { title: '阅读' }
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(){
    return { top: 0 }
  }
})
