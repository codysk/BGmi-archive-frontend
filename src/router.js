import Vue from 'vue'
import Router from 'vue-router'
import FileBrowser from './views/FileBrowser.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'fileBrowser',
      component: FileBrowser
    },
    {
      path: '/.player/*',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    }
  ]
})
