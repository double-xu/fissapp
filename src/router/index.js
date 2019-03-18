import Vue from 'vue'
import Router from 'vue-router'

import store from './store'
import _ from 'lodash';

Vue.use(Router)



const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/index'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/components/home'),
          meta: {
            title: "首页",
            auth: true
          }
        },
        {
          path: '/messages',
          name: 'messages',
          component: () => import('@/components/messages'),
          meta: {
            title: "消息",
            auth: true
          }
        },
        {
          path: '/contacts',
          name: 'contacts',
          component: () => import('@/components/contacts'),
          meta: {
            title: "通讯录",
            auth: true
          }
        },
        {
          path: '/me',
          name: 'me',
          component: () => import('@/components/me'),
          meta: {
            title: "我的",
            auth: true
          }
        },
        {
          path: 'home',
          redirect: '/'
        }
      ]
    },

    {
      path: '/headscl',
      name: 'headscl',
      component: () => import('@/components/headscl'),
      meta: {
        title: "修改头像"
      }
    },
    {
      path: '/tel',
      name: 'tel',
      component: () => import('@/components/tel'),
      meta: {
        title: "修改号码"
      }
    },
    {
      path: '/wechat',
      name: 'wechat',
      component: () => import('@/components/wechat'),
      meta: {
        title: "修改微信号"
      }
    },
    {
      path: '/mail',
      name: 'mail',
      component: () => import('@/components/mail'),
      meta: {
        title: "修改邮箱"
      }
    },
    {
      path: '/accountnum',
      name: 'accountnum',
      component: () => import('@/components/accountnum'),
      meta: {
        title: "收款账号"
      }
    },
    {
      path: '/depositbank',
      name: 'depositbank',
      component: () => import('@/components/depositbank'),
      meta: {
        title: "开户银行"
      }
    },
    {
      path: '/payee',
      name: 'payee',
      component: () => import('@/components/payee'),
      meta: {
        title: "收款人信息"
      }
    },
    {
      path: '/costexp',
      name: 'costexp',
      component: () => import('@/components/costexp'),
      meta: {
        title: "费用报销"
      }
    },
    {
      path: '/myexpense',
      name: 'myexpense',
      component: () => import('@/components/myexpense'),
      meta: {
        title: "费用报销列表"
      }
    },
    {
      path: '/travelexp',
      name: 'travelexp',
      component: () => import('@/components/travelexp'),
      meta: {
        title: "差旅报销"
      }
    },
    {
      path: '/mytravel',
      name: 'mytravel',
      component: () => import('@/components/mytravel'),
      meta: {
        title: "我的差旅"
      }
    },
    {
      path: '/travelreim',
      name: 'travelreim',
      component: () => import('@/components/travelreim'),
      meta: {
        title: "差旅报销单填报"
      }
    },
    {
      path: '/exprocedure',
      name: 'exprocedure',
      component: () => import('@/components/exprocedure'),
      meta: {
        title: "差旅报销进度"
      }
    },
    {
      path: '/expense',
      name: 'expense',
      component: () => import('@/components/expense'),
      meta: {
        title: "报销单填报"
      }
    },
    {
      path: '/expdetails',
      name: 'expdetails',
      component: () => import('@/components/expdetails'),
      meta: {
        title: "报销单详细"
      }
    },
    {
      path: '/costcategory',
      name: 'costcategory',
      component: () => import('@/components/costcategory'),
      meta: {
        title: "费用类别"
      }
    },
    {
      path: '/department',
      name: 'department',
      component: () => import('@/components/department'),
      meta: {
        title: "费用承担组织/部门"
      }
    },
    {
      path: '/tax',
      name: 'tax',
      component: () => import('@/components/tax'),
      meta: {
        title: "税率"
      }
    },
    {
      path: '/itinerary',
      name: 'itinerary',
      component: () => import('@/components/itinerary'),
      meta: {
        title: "差旅行程单"
      }
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('@/components/project'),
      meta: {
        title: "归属项目"
      }
    },
    {
      path: '/perdata',
      name: 'perdata',
      component: () => import('@/components/perdata'),
      meta: {
        title: "个人资料"
      }
    },
    {
      path: '/loanbill',
      name: 'loanbill',
      component: () => import('@/components/loanbill'),
      meta: {
        title: "借款单填报"
      }
    },
    {
      path: '/process',
      name: 'process',
      component: () => import('@/components/process'),
      meta: {
        title: "我的流程"
      }
    },
    {
      path: '/pending',
      name: 'pending',
      component: () => import('@/components/pending'),
      meta: {
        title: "待处理事项"
      }
    },
    {
      path: '/done',
      name: 'done',
      component: () => import('@/components/done'),
      meta: {
        title: "已完成事项"
      }
    },
    {
      path: '/approve',
      name: 'approve',
      component: () => import('@/components/approve'),
      meta: {
        title: "业务审核"
      }
    },
    {
      path: '/aprexp',
      name: 'aprexp',
      component: () => import('@/components/aprexp'),
      meta: {
        title: "单据审核"
      }
    },
    {
      path: '/inapproval',
      name: 'inapproval',
      component: () => import('@/components/inapproval'),
      meta: {
        title: "待审批"
      }
    },
    {
      path: '/approved',
      name: 'approved',
      component: () => import('@/components/approved'),
      meta: {
        title: "已完成审批"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login'),
      meta: {
        title: "登录"
      }
    },
    {
      path: '/missing',
      name: 'missing',
      component: () => import('@/components/missing'),
      meta: {
        title: "登录"
      }
    },

    {
      path: '*',
      redirect: '/missing'
    }
  ],
  // https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html
  scrollBehavior(to, from, savedPosition) {
    if (to.meta && to.meta.resetPosition) {
      return { x: 0, y: 0 };
    }
  }
})


router.beforeEach((to, _from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  // 路由发生变化时，修改页面title
  if (to.meta && to.meta.auth) {

    // console.log("当前store 内容: ", store.state.user, "不为空", !_.isEmpty(store.state.user));

    if (!_.isEmpty(store.state.user)) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
  // next();
})

export default router;
