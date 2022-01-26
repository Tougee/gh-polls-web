// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css';

import Icon from 'vue-awesome';
import 'vue-awesome/icons/remove'
import 'vue-awesome/icons/ellipsis-v'
import i18n from './i18n'
Vue.component('icon', Icon);

import axios from 'axios';
import config from './config';
axios.defaults.baseURL = config.api;
axios.defaults.withCredentials = true;

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  i18n,
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      if (this.currentRoute.startsWith('/poll')) {
        return require('./Poll.vue')
      } else {
        return require('./Create.vue')
      }
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
