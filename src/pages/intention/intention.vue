<template>
  <div class="view intention">
    <x-header class="header" :left-options="{backText: ''}">求职意向</x-header>
    <div>
      <group>
        <x-input title="期望职位" v-model="jobName" placeholder="请输入期望职位"></x-input>
        <popup-picker class="pop" title="期望城市" :data="list3" :columns="2" v-model="tempCity" value-text-align="left" show-name placeholder="请选择期望城市"></popup-picker>
        <popup-picker class="pop" title="期望月薪" :data="salaryList" value-text-align="left" v-model="salary" placeholder="请选择期望月薪"></popup-picker>
      </group>
    </div>
    <div class="login_btn_box">
      <a href="javascript:;" class="login_btn">保存</a>
    </div>
  </div>
</template>
<script>
import { XHeader, XInput, Group, PopupPicker } from 'vux'
import { addressData } from '@/assets/city.js'
export default {
  data() {
    return {
      jobName: '',
      salary: [],
      list3: addressData,
      tempCity: [],
      salaryList: [['2k以下', '2k-5k', '5k-10k', '10k-15k', '10k-15k', '15k-25k', '25k-50k', '50k以上']]
    }
  },
  components: { XHeader, XInput, Group, PopupPicker },
  methods: {}
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';

.primary_text {
  color: #049cff;
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

.intention .vux-cell-box.pop {
  padding: 0 15px;
}
</style>

