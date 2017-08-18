<template>
  <div class="view" ref="view">
    <header class="header" ref="header">
      <span class="header_title">发现</span>
    </header>
    <div class="channel_view_wrapper" ref="channelView" @scroll="loadMore">
      <div class="channel_view">
        <div class="card" v-for="(item, index) in channelList" key="index" @click="goChannelDetail(index)">
          <div class="img_wrapper">
            <img class="img" :src="item.picUrl">
          </div>
          <div class="card_title">
            <span class="card_text">{{item.name}}</span>
            <i class="iconfont icon-right"></i>
          </div>
        </div>
      </div>
  
      <load-more :tip="loadTip" :show-loading="showLoading"></load-more>
    </div>
  
  </div>
</template>
<script>
import { LoadMore } from 'vux'
export default {
  name: 'Channel',
  data() {
    return {
      loadTip: '正在加载',
      showLoading: true,
      canLoad: true,
      viewHeight: '',
      headerHeight: '',
      channelList: []
    }
  },
  created() {
    this.$http.get('https://www.easy-mock.com/mock/5951bf859adc231f356adea8/api/channel').then((res) => {
      this.channelList = res.data
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.viewHeight = this.$refs.channelView.clientHeight
    })
  },
  methods: {
    loadMore() {
      // 下拉加载更多
      if (this.$refs.channelView.scrollTop === this.$refs.channelView.scrollHeight - this.viewHeight && this.canLoad) {
        this.canLoad = false
        this.$http.get('https://www.easy-mock.com/mock/5951bf859adc231f356adea8/api/channel').then((res) => {
          if (res.data) {
            res.data.forEach((item) => {
              this.$set(this.channelList, this.channelList.length, item)
              this.canLoad = true
            })
          } else {
            this.canLoad = false
            this.loadTip = '暂无数据'
            this.showLoading = false
          }
        }).catch(() => {
          this.loadTip = '加载失败'
          this.showLoading = false
        })
      }
    },
    goChannelDetail(index) {
      this.$router.push('/channel/' + this.channelList[index].id)
    }
  },
  components: {
    LoadMore
  }
}
</script>
<style scoped>
.header {
  position: relative;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 46px;
  text-align: center;
  background-color: rgba(4, 156, 255, 1);
}

.header_title {
  line-height: 46px;
  font-size: 16px;
  color: #fff;
}

.channel_view_wrapper{
  position: absolute;
  top: 46px;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.channel_view {
  padding: 10px 10px 0;
}

.card {
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #eee;
  box-shadow: 0 4px 6px #eee;
  overflow: hidden;
}
.img_wrapper{
  min-height: 150px;
}
.img {
  display: block;
  width: 100%;
  height: auto;
}

.card_title {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  padding: 0 12px;
  color: #000;
  background-color: #fff;
}

.card_text {
  font-weight: bold;
  font-size: 16px;
}
</style>
