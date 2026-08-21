import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/Home.vue'), meta: { title: 'YY91 - 高清影视' } },
  { path: '/category/:id/:page?', name: 'category', component: () => import('../views/Category.vue'), props: true, meta: { title: '分类列表' } },
  { path: '/play/:id', name: 'play', component: () => import('../views/Play.vue'), props: true, meta: { title: '在线播放' } },
  { path: '/search', name: 'search', component: () => import('../views/Search.vue'), meta: { title: '搜索影片' } },
  { path: '/novel/:type?', name: 'novel', component: () => import('../views/Novel.vue'), props: true, meta: { title: '小说分类' } },
  { path: '/read/:id', name: 'read', component: () => import('../views/Read.vue'), props: true, meta: { title: '在线阅读' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'YY91'} - 高清资源站`
})

export default router
