import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

const login = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Login.vue')
const home = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/home.vue')
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Welcome.vue')

const Users = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '../components/user/Users.vue')
const Rights = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '../components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '../components/goods/Cate.vue')

const Cate = () => import(/* webpackChunkName:"Cate_Params" */ '../components/power/Roles.vue')
const Params = () => import(/* webpackChunkName:"Cate_Params" */ '../components/goods/Params.vue')

const GoodsList = () => import(/* webpackChunkName:"GoodsList_ Add" */ '../components/goods/List.vue')
const Add = () => import(/* webpackChunkName:"GoodsList_ Add" */ '../components/goods/Add.vue')

const Order = () => import(/* webpackChunkName:"Order_ Report" */ '../components/order/Order.vue')
const Report = () => import(/* webpackChunkName:"Order_ Report" */ '../components/report/Report.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',
      component: home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
