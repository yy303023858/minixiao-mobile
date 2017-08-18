import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index'
import Jobs from '@/pages/jobs/jobs'
import JobDetail from '@/pages/job-detail/job-detail'
import CompanyDetail from '@/pages/company-detail/company-detail'
import Channel from '@/pages/channel/channel'
import ChannelDetail from '@/pages/channel-detail/channel-detail'
import Search from '@/pages/search/search'
import Profile from '@/pages/profile/profile'
import User from '@/pages/user/user'
import Login from '@/pages/login/login'
import Applylog from '@/pages/applylog/applylog'
import Intention from '@/pages/intention/intention'
import Collection from '@/pages/collection/collection'
import Attachment from '@/pages/attachment/attachment'
import Config from '@/pages/config/config'
import Changepwd from '@/pages/changepwd/changepwd'
import Feedback from '@/pages/feedback/feedback'
import Privacy from '@/pages/privacy/privacy'
import SignUp from '@/pages/sign-up/sign-up'
import Information from '@/pages/information/information'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: {
        title: '首页'
      },
      component: Index
    },
    {
      path: '/search',
      name: 'Search',
      meta: {
        title: '搜索'
      },
      component: Search
    },
    {
      path: '/jobs',
      name: 'Jobs',
      meta: {
        title: '职位'
      },
      component: Jobs
    },
    {
      path: '/jobs/:jobId',
      name: 'JobDetail',
      meta: {
        title: '职位详情'
      },
      component: JobDetail
    },
    {
      path: '/company/:recId',
      name: 'CompanyDetail',
      meta: {
        title: '公司详情'
      },
      component: CompanyDetail
    },
    {
      path: '/channel',
      name: 'Channel',
      meta: {
        title: '发现'
      },
      component: Channel
    },
    {
      path: '/channel/:channelId',
      name: 'ChannelDetail',
      meta: {
        title: '发现详情'
      },
      component: ChannelDetail
    },
    {
      path: '/user',
      name: 'User',
      meta: {
        title: '我的'
      },
      component: User
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        title: '我的简历'
      },
      component: Profile
    },
    {
      path: '/applylog',
      name: 'Applylog',
      meta: {
        title: '申请记录'
      },
      component: Applylog
    },
    {
      path: '/collection',
      name: 'Collection',
      meta: {
        title: '我的收藏'
      },
      component: Collection
    },
    {
      path: '/intention',
      name: 'Intention',
      meta: {
        title: '求职意向'
      },
      component: Intention
    },
    {
      path: '/attachment',
      name: 'Attachment',
      meta: {
        title: '附件简历'
      },
      component: Attachment
    },
    {
      path: '/config',
      name: 'Config',
      meta: {
        title: '设置'
      },
      component: Config
    },
    {
      path: '/changepwd',
      name: 'Changepwd',
      meta: {
        title: '修改密码'
      },
      component: Changepwd
    },
    {
      path: '/feedback',
      name: 'Feedback',
      meta: {
        title: '意见反馈'
      },
      component: Feedback
    },
    {
      path: '/privacy',
      name: 'Privacy',
      meta: {
        title: '隐私设置'
      },
      component: Privacy
    },
    {
      path: '/signup',
      name: 'SignUp',
      meta: {
        title: '注册'
      },
      component: SignUp
    },
    {
      path: '/information',
      name: 'Information',
      meta: {
        title: '个人资料'
      },
      component: Information
    }
  ]
})
