import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import detail from '@/components/page/detail'
import notFound from '@/components/page/notFound'
import category from '@/components/page/category'
import mylist from '@/components/page/mylist'
import myCollect from '@/components/page/myCollect'
import cardCate from '@/components/common/cardCate'
import store from '@/store/index'
Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        // keepAlive:true,
        title:'私人追剧管家'
      }
    },
    {
      path:'/detail/:id',
      name:'detail',
      component: detail,
      meta:{
        title:'详情'
      }
    },
    {
      path:'/category',
      name:'category',
      component:category,
      meta:{
        // keepAlive:true,
        title:'分类'
      },
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '/category/:mainClass/:menu/:curPage', name:'cardCate',component: cardCate },
      ]
    },
    {
      path:'/mylist',
      name:'mylist',
      component:mylist,
      meta:{
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title:'我的订阅清单'
      }
    },
    {
      path:'/myCollect',
      name:'myCollect',
      component:myCollect,
      meta:{
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        title:'我的收藏清单'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // next()
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    let token = store.state.login.currentUser.getUserToken()
    // console.log(token); //拿到了
    if (token) {
        next();
    }
    else {
      store.dispatch('handle')
      next({
          path: '/',
          // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
      next();
  }
})


export default router;
