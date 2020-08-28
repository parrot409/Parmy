import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(VueRouter)

export default new VueRouter({
  routes
})
