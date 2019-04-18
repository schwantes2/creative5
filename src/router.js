import Vue from "vue";
import Router from "vue-router";
import Main from './views/Main.vue'
import Register from './views/Register.vue'
import MyPage from './views/MyPage.vue'
import Login from './views/Login.vue'
import PhotoPage from './views/PhotoPage.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
   path: '/mypage',
   name: 'mypage',
   component: MyPage,
 },
 {
   path: '/register',
   name: 'register',
   component: Register
 },
 {
   path: '/login',
   name: 'login',
   component: Login
 },
 {
   path: '/photos/:id',
   name: 'photo',
   component: PhotoPage
 }
]
});
