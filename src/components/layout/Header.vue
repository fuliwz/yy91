<template>
  <header class="site-header">
    <div class="container nav-wrap">
      <router-link class="logo" to="/">YY91</router-link>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/video">视频</router-link>
        <router-link to="/novel">小说</router-link>
        <router-link to="/image">图片</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header{position:sticky;top:0;z-index:20;background:rgba(15,15,20,.88);backdrop-filter:blur(12px)}
.nav-wrap{height:64px;display:flex;align-items:center;justify-content:space-between}
.logo{font-size:26px;font-weight:800;color:#fff;text-decoration:none}
nav{display:flex;gap:24px}nav a{color:#bbb;text-decoration:none}nav a.router-link-active{color:#fff}
</style>
