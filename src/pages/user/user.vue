<template>
  <div class="view">
    <div class="user_bg">
      <div class="img_wrapper">
        <img class="img" :src="userInfo.avatar">
      </div>
      <span class="user_name" @click="login" v-if="!userInfo.realName">登录/注册</span>
      <span class="user_name" v-if="userInfo.realName">{{userInfo.realName}}</span>
    </div>
  
    <div class="user_info">
      <div class="user_info_item vux-1px-r" @click="goApplylog(0)">
        <p class="item_count">{{noDelivery}}</p>
        <span class="item_title">待投递</span>
      </div>
      <div class="user_info_item vux-1px-r" @click="goApplylog(1)">
        <p class="item_count">{{processcing}}</p>
        <span class="item_title">处理中</span>
      </div>
      <div class="user_info_item vux-1px-r" @click="goApplylog(2)">
        <p class="item_count">{{offer}}</p>
        <span class="item_title">offer</span>
      </div>
      <div class="user_info_item" @click="goApplylog(3)">
        <p class="item_count">{{refuse}}</p>
        <span class="item_title">不合适</span>
      </div>
    </div>
  
    <group>
      <!-- <cell title="我的申请" is-link link="/applylog"></cell> -->
      <cell title="个人资料" is-link link="/information"></cell>
      <cell title="我的简历" is-link link="/profile"></cell>
      <cell title="求职意向" is-link link="/intention"></cell>
      <cell title="我的收藏" is-link link="/collection"></cell>
      <!-- <cell title="附件简历" is-link link="/attachment"></cell> -->
      <cell title="设置" is-link link="/config"></cell>
    </group>
  </div>
</template>
<script>
import { Cell, CellBox, Group, Blur } from 'vux'
export default {
  data() {
    return {
      userInfo: { avatar: 'http://img2.gao7.com/files/appleimage/7AC/7AC60546-B6F3-486C-AE3B-7BFD5B32D6C0.jpg' },
      noDelivery: 0,
      processcing: 0,
      offer: 0,
      refuse: 0,
      id: ''
    }
  },
  components: { Cell, CellBox, Group, Blur },
  created() {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    if (user) {
      // 已经登录
      this.userInfo = user
      this.getStateCount()
    }
    this.$root.eventHub.$on('loginSuccess', (data) => {
      console.log('登录成功：', data)
      this.userInfo = data
      this.getStateCount()
    })
  },
  methods: {
    // 获取投递记录
    getStateCount() {
      this.$http.get(`/user/${this.userInfo.id}/applicationCount`)
        .then((res) => {
          console.log(res)
          if (res.data) {
            this.noDelivery = res.data.noDelivery
            this.processcing = res.data.waitScreen + res.data.screening
            this.offer = res.data.offer
            this.refuse = res.data.refuse
          }
        })
    },
    // 跳转到我的申请记录
    goApplylog(index) {
      this.$router.push('/applylog?state=' + index)
    },
    login() {
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.view {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  background-color: #eee;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.user_bg {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 150px;
  background: linear-gradient(#049cff 0%, #049cff 60%, #027ecf 100%)
}

.user_name {
  display: inline-block;
  padding: 6px 8px;
  font-size: 16px;
  color: #fff;
}

.user_info {
  display: flex;
  position: relative;
  padding: 6px 10px;
  margin-bottom: 16px;
  justify-content: space-between;
  background-color: #fff;
}

.user_info_item {
  margin: 6px 0;
  width: 25%;
}

.img_wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50px;
  border: 4px solid #fff;
  overflow: hidden;
}

.img {
  display: block;
  width: 100%;
  height: 100%;
}

.item_count {
  line-height: 30px;
  text-align: center;
  font-size: 30px;
}

.item_title {
  display: block;
  text-align: center;
  font-size: 16px;
}
</style>
