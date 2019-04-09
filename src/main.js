import Vue from 'vue'
import Metro from 'metro4'
import App from './App.vue'
import router from './router'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted: function () {
    Metro.init();
  }
})