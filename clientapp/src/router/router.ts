import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '../pages/LoginPage/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage/RegisterPage.vue';
import HomePage from '../pages/HomePage/HomePage.vue';

const routes = [
  {
    name: 'Login',
    path: '/sign-in',
    component: LoginPage,
  },
  {
    name: 'Register',
    path: '/sign-up',
    component: RegisterPage,
  },
  {
    name: 'Home',
    path: '/',
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

export default router;
