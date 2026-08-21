import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/Home.vue'), meta: { title: 'YY91 高清影视' } },
  { path: '/category/:id/:page?', name: 'category', component: () => import('../views/Category.vue'), props: true, meta: { title: '影片分类' } },
  { path: '/play/:id', name: 'play', component: () => import('../views/Play.vue'), props: true, meta: { title: '在线播放' } },
  { path: '/search', name: 'search', component: () => import('../views/Search.vue'), meta: { title: '搜索结果' } },
  { path: '/novel/:type?', name: 'novel', component: () => import('../views/Novel.vue'), props: true, meta: { title: '小说分类' } },
  { path: '/read/:id', name: 'read', component: () => import('../views/Read.vue'), props: true, meta: { title: '小说阅读' } },
  { path: '/:pathMatch(.*)*', name: '404', component: () => import('../views/NotFound.vue'), meta: { title: '页面不存在' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const title = to.meta?.title || 'YY91'
  document.title = `${title} - 高清资源站`

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = window.location.href
})

export default router
