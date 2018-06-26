import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home';
import Searching from '../components/Searching';

const router = new VueRouter({
  pageRouting: true,
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        title: 'Home',
      },
    },
      {
      path: '/searching',
      component: Searching
    },
    {path: '*', redirect: '/home'},
  ],
});

router.replace('/home');

module.exports = router;
