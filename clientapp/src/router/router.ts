import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '../pages/LoginPage/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage/RegisterPage.vue';

export const isAuthenticated = ref(true);

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

export default router;
