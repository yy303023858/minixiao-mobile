<template>
  <div class="view">
    <x-header class="header" :left-options="{backText: ''}">修改密码</x-header>
    <div>
      <group>
        <x-input title="登录账号" v-model="username" placeholder="" disabled></x-input>
        <x-input title="新密码" v-model="pwd" placeholder="请输入新密码" type="password"></x-input>
      </group>
    </div>
    <div class="login_btn_box">
      <a href="javascript:;" class="login_btn" @click="changePwd">保存</a>
    </div>
  </div>
</template>
<script>
import { XHeader, XInput, Group } from 'vux'

export default {
  components: { XHeader, XInput, Group },
  data() {
    return {
      username: '',
      pwd: '',
      id: ''
    }
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log(userInfo)
    userInfo.mobile ? this.username = userInfo.mobile : this.username = userInfo.email
    this.id = userInfo.id
  },
  methods: {
    changePwd() {
      this.$http.put(`/user/${this.id}/password?newPass=${this.pwd}`)
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            localStorage.setItem('userInfo', '')
            this.$vux.toast.text('密码修改成功')
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.login_btn_box {
  padding: 50px 15px 0;
}

.login_btn {
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #049cff;
}
</style>
