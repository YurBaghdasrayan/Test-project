import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios";
let token =  localStorage.getItem('access_token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
Vue.use(VueRouter)

import routes from './routes'
const router = new VueRouter({
  mode: 'history',
  base: process.env.APP_URL,
  routes
})
export default router
