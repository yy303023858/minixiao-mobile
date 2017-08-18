<template>
  <div class="view login">
    <x-header class="header" :left-options="{backText: ''}">登录</x-header>
    <tab :animate="false" v-model="tabIndex" class="tab_bar vux-1px-t" :line-width="1">
      <tab-item selected active-class="activeColor">验证码登录</tab-item>
      <tab-item active-class="activeColor">密码登录</tab-item>
    </tab>
    <div v-show="tabIndex === 0">
      <group>
        <x-input title="" v-model="username" placeholder="请输入手机号或邮箱"></x-input>
        <x-input title="" v-model="verifyCode" placeholder="请输入验证码">
          <span slot="right" class="primary_text" @click="verify">获取验证码</span>
        </x-input>
      </group>
      <p class="register_tip">还没有账号？快来
        <span class="primary_text" @click="signUp">注册</span>
      </p>
    </div>
    <div v-show="tabIndex === 1">
      <group>
        <x-input title="" v-model="username" placeholder="请输入手机号或邮箱"></x-input>
        <x-input title="" v-model="password" placeholder="请输入密码" type="password"></x-input>
      </group>
      <p class="register_tip">
        <span class="forget_pwd primary_text">忘记密码?</span>
        还没有账号？快来
        <span class="primary_text" @click="signUp">注册</span>
      </p>
    </div>
    <div class="login_btn_box">
      <a href="javascript:;" class="login_btn" @click="login">登录</a>
    </div>
  </div>
</template>
<script>
import { XHeader, Tab, TabItem, XInput, Group } from 'vux'
export default {
  data() {
    return {
      tabIndex: 0,
      username: '',
      password: '',
      verifyCode: ''
    }
  },
  components: { XHeader, Tab, TabItem, XInput, Group },
  methods: {
    verify() {
      this.$http.get(`/user/login/sendCode?account=${this.username}`).then((res) => {
        console.log('验证码是', res)
      })
    },
    login() {
      if (!this.username) {
        this.$vux.toast.text('请填写手机号或邮箱为空')
        return
      }
      // 是密码登录
      if (this.tabIndex) {
        if (!this.password) {
          this.$vux.toast.text('请填写密码')
          return
        }
        this.$http.post(`/user/login?userName=${this.username}&pwd=${this.password}`).then((res) => {
          if (res.data.success) {
            this.$vux.toast.text('登录成功')
            localStorage.setItem('userInfo', JSON.stringify(res.data.message))
            this.$root.eventHub.$emit('loginSuccess', res.data.message)
            this.$root.eventHub.$emit('changeTabBar', 3)
            this.$router.back()
          } else {
            this.$vux.toast.text(res.data.failReason)
          }
        })
        // 验证码登录
      } else {
        if (!this.verifyCode) {
          this.$vux.toast.text('请填验证码')
          return
        }
        this.$http.post(`/user/login?userName=${this.username}&code=${this.verifyCode}`).then((res) => {
          if (res.data.success) {
            this.$vux.toast.text('登录成功')
            localStorage.setItem('userInfo', JSON.stringify(res.data.message))
            this.$root.eventHub.$emit('loginSuccess', res.data.message)
            this.$root.eventHub.$emit('changeTabBar', 3)
            this.$router.back()
          } else {
            this.$vux.toast.text(res.data.failReason)
          }
        })
      }
    },
    signUp() {
      this.$router.push('/signup')
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.activeColor {
  color: #049cff !important;
  border-color: #049cff !important;
}

.primary_text {
  color: #049cff;
}

.register_tip {
  padding: 20px 15px;
  text-align: right;
  color: #555;
  font-size: 14px;
}

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

.forget_pwd {
  float: left;
}
</style>

