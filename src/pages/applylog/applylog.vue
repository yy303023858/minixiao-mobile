<template>
  <div class="view">
    <x-header class="header" :left-options="{backText: ''}">申请记录</x-header>
    <tab :animate="false" v-model="tabIndex" class="tab_bar vux-1px-t" :line-width="1">
      <tab-item @on-item-click="onItemClick" active-class="activeColor">全部</tab-item>
      <tab-item @on-item-click="onItemClick" active-class="activeColor">待投递</tab-item>
      <tab-item @on-item-click="onItemClick" active-class="activeColor">处理中</tab-item>
      <tab-item @on-item-click="onItemClick" active-class="activeColor">offer</tab-item>
      <tab-item @on-item-click="onItemClick" active-class="activeColor">不合适</tab-item>
    </tab>
  
    <div class="list_wrapper">
      <div class="job_wrapper vux-1px-b" v-for="(item, index) in applyList" key="index" @click.native="goDetail(index)">
        <div class="job_box">
          <div class="logo vux-1px">
            <img class="logo_img" :src="item.recLogo">
          </div>
          <div class="info">
            <h5 class="info_job">{{item.jobName}}</h5>
            <span class="info_name">{{item.recName}}</span>
            <span class="salary">{{item.jobSarlary}}</span>
          </div>
          <span class="state">{{item.stage}}</span>
        </div>
      </div>
      <load-more :tip="loadTip" :show-loading="showLoading"></load-more>
    </div>
  </div>
</template>
<script>
import { XHeader, Tab, TabItem, LoadMore } from 'vux'

export default {
  name: 'Applylog',
  components: { XHeader, Tab, TabItem, LoadMore },
  data() {
    return {
      id: '',
      tabIndex: 0,
      loadTip: '正在加载',
      canLoad: true,
      showLoading: true,
      applyList: []
    }
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.id = userInfo.id

    // 点击四个投递状态进来时候查看点击的阶段
    console.log(this.$route.query.state)
    if (this.$route.query.state === undefined) {
      this.tabIndex = 0
    } else {
      this.tabIndex = Number(this.$route.query.state) + 1
    }
    this.switchChange()
  },
  methods: {
    switchChange() {
      switch (this.tabIndex) {
        case 0:
          this.getData(' ')
          break
        case 1:
          this.getData('stage=stay_delivery')
          break
        case 2:
          this.getData('stage=wait_screen')
          break
        case 3:
          this.getData('status=offer')
          break
        case 4:
          this.getData('status=not_pass')
          break
      }
    },
    getData(searchType) {
      this.$vux.loading.show({ text: '正在加载' })
      this.$http.get(`/user/${this.id}/applicationList?${searchType}`).then((res) => {
        if (res.data.data.length) {
          res.data.data.forEach((item) => {
            let arr = item.jobSarlary.split('-')
            arr[0] = arr[0] / 1000 + 'k'
            arr[1] = arr[1] / 1000 + 'k'
            item.jobSarlary = arr.join('-')
          })
          if (res.data.data.length < 10) {
            // this.canLoad = false
            this.loadTip = '暂无更多已申请职位'
            this.showLoading = false
          }
          this.showLoading = false
        } else {
          // this.canLoad = false
          this.loadTip = '暂无数据'
          this.showLoading = false
        }
        this.$vux.loading.hide()
        this.applyList = res.data.data
      })
    },
    onItemClick() {
      this.switchChange()
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

.list_wrapper {
  position: absolute;
  left: 0;
  top: 90px;
  bottom: 0;
  right: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.job_wrapper {
  padding: 10px 10px;
}

.job_box {
  display: flex;
  width: 100%;
  padding: 0;
  justify-content: space-between;
  align-items: center;
}

.logo {
  flex: 0 0 70px;
  width: 70px;
  height: 70px;
  margin-right: 10px;
  box-sizing: border-box;
}

.logo_img {
  display: block;
  width: 100%;
  height: auto;
}

.info {
  display: flex;
  height: 66px;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 1;
  flex-grow: 1;
  font-size: 14px;
  overflow: hidden;
  color: #999;
}

.info_job {
  font-size: 16px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #464646;
}

.info_name {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}

.salary {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #f23023;
}

.state {
  padding-left: 10px;
  flex-shrink: 0;
  color: #049cff;
}
</style>

