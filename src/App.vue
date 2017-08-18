<template>
  <div id="app">
    <keep-alive :include="/Index|Jobs|Channel/" :exclude="/Search|Collection/">
      <router-view v-wechat-title="$route.meta.title" img-set="/static/favicon.ico"></router-view>
    </keep-alive>
    <tabbar v-if="showTabBar" v-model="selIndex">
      <tabbar-item link="/">
        <span slot="label" class="tab-icon-group">
          <i class="iconfont icon-home1"></i>
          <span class="tab-icon">首页</span>
        </span>
      </tabbar-item>
      <tabbar-item link="/jobs">
        <span slot="label" class="tab-icon-group">
          <i class="iconfont icon-tie"></i>
          <span class="tab-icon">职位</span>
        </span>
      </tabbar-item>
      <tabbar-item link="/channel">
        <span slot="label" class="tab-icon-group">
          <i class="iconfont icon-gift"></i>
          <span class="tab-icon">发现</span>
        </span>
      </tabbar-item>
      <tabbar-item link="/user">
        <span slot="label" class="tab-icon-group">
          <i class="iconfont icon-user"></i>
          <span class="tab-icon">我的</span>
        </span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: { Tabbar, TabbarItem },
  data() {
    return {
      showTabBar: true,
      selIndex: 0
    }
  },
  created() {
    this.$root.eventHub.$on('hideToolBar', () => {
      this.showTabBar = false
    })
    this.$root.eventHub.$on('showToolBar', () => {
      this.showTabBar = true
    })
    this.$root.eventHub.$on('changeTabBar', (data) => {
      this.selIndex = data
    })
  }
}
</script>

<style>
html,
body,
ul,
li,
h1,
h2,
h3,
h4,
h5,
p,
input {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

.weui-tabbar__label {
  margin-top: 0;
}

#app .weui-cells {
  margin-top: 0;
  padding: 0;
}

#app .weui-cell:before {
  left: 0;
}

#app .weui-bar__item_on .weui-tabbar__label {
  color: #049cff;
}

#app .vux-header {
  background-color: rgba(4, 156, 255, 1);
}

#app .vux-cell-box>div {
  padding-right: 0;
}

#app .vux-header .vux-header-left .left-arrow:before {
  border-color: #fff;
}

#app .vux-header-title {
  font-size: 16px;
}

#app .animated {
  box-shadow: none;
}

#app .vux-tab-ink-bar {
  background-color: #049cff;
}

#app .weui-grid {
  padding: 14px 8px;
}

#app .vux-header .vux-header-title,
.vux-header h1 {
  margin: 0;
}

.vux-tabbar-simple .weui-tabbar__label {
  line-height: 1;
}

.tab-icon-group {
  display: flex;
  flex-direction: column;
}

.tab-icon-group .iconfont {
  line-height: 34px;
}

.tab-icon {
  display: block;
  line-height: 14px;
}

.intention .vux-cell-box.pop .weui-cell {
  padding: 10px 0;
}

.feedback .weui-textarea {
  height: 200px;
}

.view .weui-cells_radio .weui-check:checked+.weui-icon-checked:before {
  color: #049cff;
}

.jobs .weui-cells {
  font-size: 14px;
}

.jobs .weui-cells__title {
  margin: 0;
  padding: 10px 15px;
  background-color: #fafafa;
}



/* vux 我的简历 重置 */

#app ::-webkit-input-placeholder {
  color: #b5b5b5;
}

.vux-x-input .weui-cell__hd,
.vux-datetime>div {
  width: 105px;
  font-size: 16px;
}

.sign_up .vux-x-input .weui-cell__hd,
.login .vux-x-input .weui-cell__hd {
  width: 0;
}

.sign_up .weui-icon-circle,
.sign_up .weui-icon-success {
  margin: 0;
  margin-top: -2px;
  vertical-align: middle;
  font-size: 18px;
}

#app .vux-datetime-value {
  text-align: left;
}

#app .fixText .vux-datetime-value {
  color: #333;
}

.resume .vux-x-input {
  font-size: 16px;
}

.information .vux-cell-box,
.resume .vux-cell-box {
  padding: 0 15px;
}
.information .pop .weui-cell,
.resume .pop .weui-cell {
  padding: 10px 0;
}

.resume .vux-datetime {
  color: #333;
}

.resume .weui-label {
  font-size: 16px;
}

.resume .vux-cell-box:before {
  left: 0;
}

.resume .vux-x-textarea textarea {
  min-height: 250px;
}

.resume .weui-textarea {
  white-space: pre-wrap;
}

.resume .vux-popup-picker-placeholder,
.resume .weui-cell__ft,
.intention .vux-popup-picker-placeholder {
  color: #b5b5b5;
}

.resume .resume-skill .weui-cell,
.resume .resume-other .weui-cell {
  padding-left: 0;
}

.resume .resume-other .vux-x-textarea {
  padding: 10px 15px;
}

.resume .resume-other .weui-textarea {
  min-height: 70px;
}

.resume .resume-detail-view .vux-x-input {
  padding: 10px 15px;
}

.dp-header .dp-item.dp-right,
.vux-popup-picker-header-menu-right {
  color: #049cff !important;
}

#app .resume .vux-header-more {
  color: #fff;
}

#app .vux-check-icon>span {
  color: #b5b5b5;
}

#app .gender .fixText>span {
  color: #333;
}

#app .vux-check-icon>.weui-icon-success:before,
#app .vux-check-icon>.weui-icon-success-circle:before {
  color: #049cff;
}

#app .resume-basic .weui-icon-success-circle {
  color: #049cff;
}

.resume .necessary .weui-cell__hd:after,
.resume .vux-datetime.necessary p:after {
  position: absolute;
  top: 12px;
  left: 86px;
  z-index: 30;
  content: '*';
  color: #f23023;
}

.resume .necessary.degree .weui-cell__hd:after {
  left: 71px;
}

.resume .resume-other .necessary .weui-cell__hd:after {
  left: 71px;
}
</style>
