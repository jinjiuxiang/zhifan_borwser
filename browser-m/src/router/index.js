import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component:resolve => require(['@/components/HelloWorld'],resolve)
    },
    {
      path: '/:coinType/:dataType/:key',
      name: 'detail',
      component:resolve => require(['@/components/detail'],resolve),
      beforeEnter (to, from, next) {
        //console.log(to.params);
        if (/(bch|ltc|btc|usdt|bchsv)/.test(to.params.coinType)) {
          if(/(address|block|txn)/.test(to.params.dataType)){
            next()
          }else{
            next({name:"nopage"})
          }

        }else {
          next({name:"nopage"})
        }
      }
    },
    {
      path: '/',
      name: 'home',
      component:resolve => require(['@/components/home'],resolve)
    },
    {
      path: '/search/:key',
      name: 'searchList',
      component:resolve => require(['@/components/searchList'],resolve)
    },
    {
      path: '/nosearch',
      name: 'noSearch',
      component:resolve => require(['@/components/noSearch'],resolve)
    },
    {
      path: '/noserver',
      name: 'noserver',
      component:resolve => require(['@/components/noServers'],resolve)
    },
    {
      path: '/nopage',
      name: 'nopage',
      component:resolve => require(['@/components/noPage'],resolve)
    },
    {path:'*',redirect:'/nopage'}
  ]
})
