import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '@/views/Home';
import Register from '@/views/Register';
import Login from '@/views/Login';
import userProfile from '@/views/UserProfile';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/userProfile/:slug',
    name: 'userProfile',
    component: userProfile,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
