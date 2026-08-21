import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../views/Play.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Novel from '../views/Novel.vue'
import NovelRead from '../views/NovelRead.vue'
import Image from '../views/Image.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/video/:id?', name: 'video', component: Category, props: true },
  { path: '/play/:id', name: 'play', component: Play, props: true },
  { path: '/search', name: 'search', component: Search },
  { path: '/novel', name: 'novel', component: Novel },
  { path: '/novel/read/:id', name: 'novel-read', component: NovelRead, props: true },
  { path: '/image/:id?', name: 'image', component: Image, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(){
    return { top:0, left:0 }
  }
})

export default router
