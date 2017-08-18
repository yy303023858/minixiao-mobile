<template>
  <div class="view feedback">
    <x-header class="header" :left-options="{backText: ''}">意见反馈</x-header>
    <group class="delBorder">
      <x-textarea :max="2000" placeholder="" v-model="feedback"></x-textarea>
      <x-input title="" v-model="mobile" placeholder="请留下您的手机号" :max="11" name="mobile"></x-input>
    </group>
    <div class="login_btn_box">
      <a href="javascript:;" class="login_btn">提交反馈</a>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XTextarea, XInput } from 'vux'

export default {
  components: { XHeader, Group, XTextarea, XInput },
  data() {
    return {
      feedback: '',
      mobile: ''
    }
  }
}
</script>
<style scoped>
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

