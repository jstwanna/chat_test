import { createRouter, createWebHistory } from 'vue-router';

import { jwtLsName } from './../api/apiBase';

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
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

router.beforeEach(async (to, from, next) => {
  const jwt = localStorage.getItem(jwtLsName);

  if (!jwt && to.meta.requiredAuth) {
    next('/sign-in');
  } else if ((jwt && to.path === '/sign-in') || to.path === 'sign-up') {
    next('/');
  } else {
    next();
  }
});

export default router;
