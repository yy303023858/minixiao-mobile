<template>
  <div class="view sign_up">
    <x-header class="header" :left-options="{backText: ''}">注册</x-header>
    <group>
      <x-input title="" v-model="username" placeholder="请输入手机号"></x-input>
      <x-input title="" v-model="password" placeholder="请输入密码" type="password"></x-input>
      <x-input title="" v-model="verifyCode" placeholder="请输入验证码">
        <span slot="right" class="primary_text" @click="verify" v-if="!countDown">获取验证码</span>
        <span slot="right" v-if="countDown">重发验证码{{countDown}}s</span>
      </x-input>
    </group>
    <p class="register_tip">
      <check-icon :value.sync="agree">我已阅读并同意</check-icon>
      <span class="forget_pwd primary_text" @click="showDialog">《迷你校用户协议》</span>
      <span class="primary_text login_btn" @click="login">登录</span>
    </p>
    <div class="signUp_btn_box">
      <a href="javascript:;" class="signUp_btn" @click="signUp">注册</a>
    </div>
  
    <div v-transfer-dom>
      <x-dialog v-model="showScrollBox" hide-on-blur>
        <p class="dialog_title">迷你校用户协议</p>
        <div class="dialog_box">
          <p>
            <div class="pop_con">
              欢迎光临“迷你校”，在使用“迷你校”之前请您仔细阅读本用户协议。如果您对用户协议的任何条款表示异议，您可以选择不使用“迷你校”。登录并使用“迷你校”，则意味着您自愿遵守本协议，并在使用过程中服从“迷你校”的统一管理。
              <br> 一、 协议目的：
              <br>
              <span>本协议作为“迷你校”与用户签订的服务协议，用以约束用户使用本网站及迷你校为用户提供约定服务的行为，双方均应遵守本协议条款并履行相关义务。
                <br>
              </span>
              二、用户的权利义务：
              <br>
              <span>1、在完成“迷你校”注册程序后您将成为“迷你校”合法用户，享受“迷你校”提供的服务，同时用户需保证具有相应的民事行为能力，并在完全同意本协议的情形下完成注册。
                <br>
              </span>
              <span>2、用户承诺在“迷你校”发布的简历或信息均符合国家有关法律法规规定，并保证其真实性、完整性、准确性，不侵害任何第三方的权利。
                <br>
              </span>
              <span>3、用户承诺使用“迷你校”仅用于用户自身招聘、求职目的或参与迷你校组织的活动，不得从事任何其他活动，不得发布除招聘信息或自身简历外的其他资料。
                <br>
              </span>
              <span>4、用户对在“迷你校”上得到、浏览的任何信息（包括但不限于本网站发布的招聘、求职信息、简历资料等）仅可做自身招聘或求职使用，不得用于其它商业或非商业目的。
                <br>
              </span>
              <span>5、用户在本网站注册成功后需对帐号及密码的使用及安全承担全部责任。用户不得将帐号转借他人使用，用户应对以其帐号进行的所有活动承担责任。
                <br>
              </span>
              <span>6、用户应对使用“迷你校”的一切行为承担责任，如因用户行为给其他第三方或“迷你校”造成任何损失的，用户应承担赔偿责任。
                <br>
              </span>
              <span>7、用户在“迷你校”实施了违法行为，导致第三方投诉（包括但不限于第三方以发函等形式指控“迷你校”侵权，提起诉讼、仲裁，或使“迷你校”面临相关主管机关的审查或质询），“迷你校”有权先暂停用户的使用。用户应在收到通知后，以自己名义出面与第三方协商、应诉或接受相关主管机关审查或质询，承担所有费用，并赔偿因此给“迷你校”造成的全部损失。
                <br>
              </span>
              三、“迷你校”的权利义务：
              <br>
              <span>1、“迷你校”应为用户提供优质的服务，并接受用户的监督及合理建议。
                <br>
              </span>
              <span>2、用户在“迷你校”发布的信息如有违反法律规定，本协议约定或“迷你校”认为属于不适合发布的信息的，迷你校有权进行修改、删除。
                <br>
              </span>
              <span>3、用户同意因网络原因、“迷你校”进行网络调整、正常的系统维护升级等造成的本网站无法正常访问，“迷你校”不承担任何责任。
                <br>
              </span>
              <span>4、“迷你校”网站（包括但不限于网站上的所有工具、应用、功能等）作为“迷你校”为用户提供信息的平台，用户同意并保证使用以上内容均出于自愿并已得到有效授权，不得侵犯任何第三方的权益。“迷你校”对用户的使用行为不承担任何责任。
                <br>
              </span>
              <span>5、“迷你校”可能会提供与其他互联网网站或资源进行链接。对于前述网站或资源是否可以利用，“迷你校”不予担保。因使用或依赖上述网站或资源所造成的损失或损害，“迷你校”也不负担任何责任。
                <br>
              </span>
              四、信息的公开与真实性：
              <br>
              <span>1、用户同意招聘企业或个人有权对用户向本网站递交的简历及相关信息进行查询并使用。对于因此而引起的任何法律纠纷，“迷你校”不承担任何法律责任。
                <br> </span>
              <span>2、用户了解并同意其在本网站发布的任何信息，包括但不限于个人简历、个人资料、求职信息、联系方式等，均有可能被本网站的访问者浏览或被其他第三方抄录用于商业或非商业性目的。对于因任何第三方使用有关信息所引发的纠纷，“迷你校”将不予承担任何责任。
                <br>
              </span>
              <span>3、用户需保证自己提供的个人信息真实性，对于用户在本平台上因不真实的个人信息而获取的不当得利，“迷你校”有权予以公开；由此产生的纠纷，“迷你校”将不予承担任何责任。
                <br>
              </span>
              五、知识产权：
              <br>
              <span>本网站所有内容、设计、图标、图表、文字及其组合、产品、技术、程序等知识产权均归“迷你校”所有。
                <br>
              </span>
              六、违约责任：
              <br> 如用户有以下行为视为违约，“迷你校”有权随时采取停止服务，删除信息，取消会员资格，解除本协议，要求用户赔偿一切损失等行动。同时“迷你校”已收取的服务费（如有）将不予退还。
              <br>
              <span>1、用户的行为违反法律规定的。
                <br>
              </span>
              <span>2、用户的行为违反本协议承诺、约定的。
                <br>
              </span>
              <span>3、用户的行为侵犯任何第三方权益的。
                <br>
              </span>
              <span>4、用户的行为不利于“迷你校”的。
                <br>
              </span>
              七、协议的变更：
              <br>
              <span>“迷你校”保留随时修正、更新本服务条款的权利。一旦发生相关修订或更新，“迷你校”会将修订和更新的内容及时在本页面发布，用户如认为变更无法接受，应该停止使用本网站相关服务。如果继续使用“迷你校”相关服务的，则视为用户接受变更条款并愿意受其约束。
                <br>
              </span>
              八、不可抗力：
              <br>
              <span>如因不可抗力导致本协议无法履行的，双方互不承担责任。
                <br>
              </span>
              九、法律适用：
              <br>
              <span>本协议的订立、生效、解释、执行、管辖、争议的解决均适用中华人民共和国法律。
                <br>
              </span>
              十、其他：
              <br>
              <span>1、本协议自用户登录使用“迷你校”起生效，长期有效。
                <br>
              </span>
              <span>2、“迷你校”保留在法律允许范围内对本协议的最终解释权。
                <br>
              </span>
            </div>
          </p>
        </div>
        <div @click="showScrollBox=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { XHeader, XInput, Group, XDialog, CheckIcon, TransferDomDirective as TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      username: '',
      password: '',
      verifyCode: '',
      countDown: 0,
      showScrollBox: false,
      agree: false
    }
  },
  components: { XHeader, XInput, Group, XDialog, CheckIcon },
  methods: {
    // 获取验证码
    verify() {
      let phoneReg = /^1[34578]\d{9}$/
      // let mailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
      if (!this.username) {
        this.$vux.toast.text('手机号为空')
        return
      }
      if (!phoneReg.test(this.username)) {
        this.$vux.toast.text('手机号格式不正确')
        return
      }
      this.$http.get(`/user/register/sendCode?account=${this.username}`)
        .then((res) => {
          if (res.data.success && res.data.message === 104) {
            this.$vux.toast.text('账号已经存在')
            return
          }
          if (res.data.success) {
            this.$vux.toast.text('验证码已发送')
            this.countDown = 60
            let timer = setInterval(() => {
              if (this.countDown === 0) {
                clearInterval(timer)
              } else {
                this.countDown--
              }
            }, 1000)
          }
        }).catch(() => {
          this.$vux.toast.text('网络出现错误')
        })
    },
    // 弹出用户协议
    showDialog() {
      this.showScrollBox = true
    },
    login() {
      this.$router.back()
    },
    signUp() {
      if (!this.username) {
        this.$vux.toast.text('请填写手机号')
        return
      }
      if (!this.password) {
        this.$vux.toast.text('请填写密码')
        return
      }
      if (!this.verifyCode) {
        this.$vux.toast.text('请获取验证码并填写')
        return
      }
      if (!this.agree) {
        this.$vux.toast.text('您未同意迷你校用户协议')
        return
      }
      this.$http.post(`/user/register?userName=${this.username}&pwd=${this.password}&code=${this.verifyCode}`)
        .then((res) => {
          if (res.data.success) {
            this.$vux.toast.show({
              text: '注册成功',
              type: 'success'
            })
            this.$router.back()
          }
        }).catch(() => {
          this.$vux.toast.text('网络出现错误')
        })
    }
  }
}
</script>
<style scoped lang="less">
.primary_text {
  color: #049cff;
}

.signUp_btn_box {
  padding: 50px 15px 0;
}

.signUp_btn {
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #049cff;
}

.register_tip {
  padding: 20px 15px;
  color: #555;
  font-size: 14px;
}

.login_btn {
  float: right;
}

.dialog_title {
  font-size: 16px;
  line-height: 30px;
}

.dialog_box {
  height: 400px;
  padding: 15px 6px;
  font-size: 14px;
  line-height: 24px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  text-align: left
}
</style>
