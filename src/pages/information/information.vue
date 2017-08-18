<template>
  <div class="view information">
    <x-header class="header" :left-options="{backText: ''}">个人资料</x-header>
  
    <div class="resume-basic">
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <group class="delBorder">
            <x-input class="necessary" title="真实姓名" name="username" placeholder="请输入真实姓名" is-type="china-name" required v-model="resumeData.basic.name"></x-input>
            <x-input class="necessary" title="手机号码" :max="11" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="resumeData.basic.mobile" required></x-input>
            <x-input class="necessary" title="邮箱" name="email" placeholder="请输入常用邮箱" is-type="email" required v-model="resumeData.basic.email"></x-input>
            <div class="resume-basic-gender weui-cell">
              <div class="resume-basic-content">
                <span class="gender_title inline-block">性别</span>
                <div class="gender">
                  <check-icon :value.sync="male" type="plain" :class="{fixText: male}">男</check-icon>
                  <check-icon :value.sync="female" type="plain" :class="{fixText: female}">女</check-icon>
                </div>
              </div>
            </div>
            <datetime :class="{fixText: hasBirthday}" v-model="birthday" default-selected-value="" title="出生日期" :min-year="1980" confirm-text="完成" cancel-text="取消" placeholder="请输入出生日期" @on-change="birthdayChange"></datetime>
            <popup-picker class="pop" title="家庭所在地" :data="list3" :columns="2" v-model="tempCity" value-text-align="left" show-name placeholder="请选择家庭所在地"></popup-picker>
            <popup-picker class="necessary pop" title="当前所在地" :data="list3" :columns="2" v-model="tempCurrentCity" value-text-align="left" show-name placeholder="请选择目前所在城市"></popup-picker>
          </group>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveBasic">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XInput, XTextarea, PopupPicker, Datetime, CheckIcon } from 'vux'
import { addressData } from '@/assets/city.js'
// import { languageData } from '@/assets/lanData.js'
export default {
  components: { XHeader, Group, XInput, XTextarea, PopupPicker, Datetime, CheckIcon },
  data() {
    return {
      showPage: 'resume',
      hasBirthday: false,
      mobile: '',
      tempCity: [],
      tempCurrentCity: [],
      list3: addressData,
      tempCity2: [],
      birthday: '',
      male: false,
      female: false,
      resumeData: {
        id: '',
        basic: { name: '', mobile: '', email: '', gender: '', birthday: '', city: '', currentCity: '' },
        education: [],
        work: '',
        practices: '',
        club: '',
        reward: '',
        laboratory: '',
        skill: [],
        certificate: [],
        language: [],
        other: { number: '', hobby: '', evaluation: '', source: '', city: '' }
      }
    }
  },
  watch: {
    male(val, oldVal) {
      if (val) {
        this.female = false
      }
    },
    female(val) {
      if (val) {
        this.male = false
      }
    }
  },
  methods: {
    birthdayChange(val) {
      val ? this.hasBirthday = true : this.hasBirthday = false
    },
    saveBasic() {
      if (this.tempCity.length > 0) {
        this.resumeData.basic.city = this.tempCity.join('-')
      }
      if (this.tempCurrentCity.length > 0) {
        this.resumeData.basic.currentCity = this.tempCurrentCity.join('-')
      }
      if (this.male) {
        this.resumeData.basic.gender = '男'
      }
      if (this.female) {
        this.resumeData.basic.gender = '女'
      }
      if (this.resumeData.basic.name && this.resumeData.basic.mobile && this.resumeData.basic.email && this.resumeData.basic.currentCity) {
        var phonePattern = /^1[34578]\d{9}$/
        if (!phonePattern.test(this.resumeData.basic.mobile)) {
          this.$vux.toast.text('手机号格式错误')
          return
        }
        var emailPattern = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
        if (!emailPattern.test(this.resumeData.basic.email)) {
          this.$vux.toast.text('邮箱格式错误')
          return
        }
        this.resumeData.basic.birthday = this.birthday
        this.showPage = 'resume'
      } else {
        this.$vux.toast.text('请填写必填项')
      }
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
#mobile-neitui-resume .vux-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
}

.first-resume-item.resume-item {
  margin-top: 56px;
}

.completeBtn {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0!important;
}

.resume-detail-view {
  background-color: #fff;
}

.saveBtn-box {
  padding: 0 20px;
}

.textarea-counter {
  padding: 0 20px;
}

.resume-add-btn {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
}

.mint-cell-value {
  padding-left: 4px;
  font-size: 14px;
  color: #555 !important;
}

.saveBtn {
  width: 100%;
  height: 50px;
  margin-top: 30px;
  background-color: #049cff;
  font-size: 16px;
  border: none;
  color: #fff;
}

.delBtn {
  width: 100%;
  margin-top: 12px;
}

.resume-add-btn a {
  text-decoration: none;
  color: #464646;
}

.resume-add-btn span {
  font-size: 16px;
  color: #26a2ff;
}

.resume-item {
  margin: 10px 0;
  background-color: #fff;
  padding: 0 15px 4px;
}

.editor-btn {
  padding: 16px 0px 10px 10px;
  font-size: 15px;
  line-height: 15px;
  float: right;
  text-decoration: none;
  color: #049cff;
}

.color-red {
  color: red;
  font-size: 14px;
  font-weight: normal;
}

.pleaseEdit .color-red {
  padding: 8px 0;
}

#mobile-neitui-resume {
  margin-bottom: 51px;
  background-color: #f5f5f5;
}

.resume-item-title h2 {
  line-height: 17px;
  padding: 16px 0 10px;
  font-size: 17px;
  color: #464646;
}

.resume-item-content {
  position: relative;
  padding: 8px 0;
  line-height: 24px;
  font-size: 14px;
}

.resume-item-content h3 {
  color: #464646;
}

.resume-item-content h4 {
  margin: 6px 0;
  width: 67px;
  height: 24px;
  line-height: 24px;
  background-color: #ff9900;
  text-align: center;
  font-size: 13px;
  color: #fff;
}

.resume-item-content span {
  padding: 0 4px;
}

.resume-item-content p {
  line-height: 20px;
}

.edu-item {
  position: relative;
}

.textarea {
  width: 100%;
  height: 200px;
  padding: 0;
  border: none;
  outline: none;
  color: #555;
  font-size: 14px;
}

.arrow-right:after {
  position: absolute;
  top: 50%;
  right: 0;
  width: 5px;
  height: 5px;
  border: 2px solid #c8c8cd;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  transform: translateY(-50%) rotate(45deg);
}

.inline-block {
  display: inline-block;
}

.beforeNecessary .mint-cell-title:before {
  position: absolute;
  top: 14px;
  left: -8px;
  content: '*';
  color: #f23023;
}

.noBorderBottom .mint-cell-wrapper {
  border-bottom: none;
}

// 基本信息页
.gender_title {
  width: 105px;
}

.gender {
  display: inline-block;
  margin-left: -10px;
}

.gender>span {
  color: #b5b5b5;
}

.resume_pre {
  white-space: pre-wrap;
}

// 教育信息页
// 技能信息页 
.skill-title {
  padding-top: 16px;
  padding: 16px 15px 10px;
  line-height: 15px;
  font-size: 15px;
  color: #464646;
}

.skill-title span {
  padding-left: 5px;
  border-left: 4px solid #049cff;
}

.resume-basic .weui-cells {
  font-size: 16px;
}
</style>



