<template>
  <div class="view">
    <x-header class="header" :left-options="{backText: ''}">设置</x-header>
    <group>
      <cell title="修改密码" is-link link="/changepwd"></cell>
      <cell title="隐私设置" is-link link="/privacy"></cell>
      <cell title="意见反馈" is-link link="/feedback"></cell>
    </group>
  
    <div class="logout_box">
      <a href="javascript:;" class="logout_btn" @click="logOut">退出</a>
    </div>
  </div>
</template>
<script>
import { XHeader, Cell, CellBox, Group } from 'vux'

export default {
  components: { XHeader, Cell, CellBox, Group },
  methods: {
    logOut() {
      localStorage.setItem('userInfo', '')
      this.$vux.toast.text('您已退出登录')
      this.$http.get('/user/logout')
        .then((res) => {
          console.log(res)
        })
    }
  }
}
</script>
<style scoped>
.logout_box {
  padding: 50px 15px 0;
}

.logout_btn {
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: red;
}
</style>

