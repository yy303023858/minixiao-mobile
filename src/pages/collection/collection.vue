<template>
  <div class="view">
    <x-header class="header" :left-options="{backText: ''}">我的收藏</x-header>
    <div class="list">
      <div class="job_wrapper vux-1px-b" v-for="(item, index) in list" key="index">
        <div class="job_box">
          <div class="logo vux-1px" @click="goDetail(item.jobPostingDetailDTO.id)">
            <img class="logo_img" :src="item.jobPostingDetailDTO.logo">
          </div>
          <div class="info" @click="goDetail(item.jobPostingDetailDTO.id)">
            <h5 class="info_job">{{item.jobPostingDetailDTO.title}}</h5>
            <span class="info_name">{{item.jobPostingDetailDTO.fullName}}</span>
            <div class="sub_info">
              <i class="iconfont icon-location"></i>
              <span>{{item.jobPostingDetailDTO.jobArea}}</span>
              <i class="iconfont icon-university"></i>
              <span>{{item.jobPostingDetailDTO.careerLevel}}</span>
            </div>
            <span class="send_time">网申：{{formatDate(item.jobPostingDetailDTO.applyPeriod.applyBeginDate)}} - {{formatDate(item.jobPostingDetailDTO.applyPeriod.applyEndDate)}}</span>
          </div>
          <span class="uncollection" @click="cancelCollection(item.jobPostingDetailDTO.id)">取消收藏</span>
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
import { XHeader } from 'vux'

export default {
  name: 'Collection',
  components: { XHeader },
  data() {
    return {
      user: {},
      list: []
    }
  },
  created() {
    // 判断是否登录获取收藏列表
    if (localStorage.getItem('userInfo')) {
      this.user = JSON.parse(localStorage.getItem('userInfo'))
      this.$http.get(`/user/${this.user.id}/favorite/jobposting`).then((res) => {
        if (res.data) {
          this.list = res.data.data
        }
      })
    } else {
      this.$vux.toast.text('您还未登录')
      setTimeout(() => {
        this.$router.push('/login')
      }, 1200)
    }
  },
  methods: {
    formatDate(val) {
      let arr = val.split('')
      arr.splice(4, 0, '.')
      arr.splice(7, 0, '.')
      let str = arr.join('')
      return str
    },
    goDetail(id) {
      this.$router.push(`/jobs/${id}`)
    },
    cancelCollection(jobId) {
      this.$http.delete(`/user/${this.user.id}/favorite/jobposting/${jobId}`).then((res) => {
        if (res.data) {
          this.isCollect = !res.data.success
          // 重新获取收藏列表
          this.$http.get(`/user/${this.user.id}/favorite/jobposting`).then((res) => {
            if (res.data) {
              this.list = res.data.data
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.list {
  position: absolute;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
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
  display: flex;
  flex: 0 0 80px;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}

.logo_img {
  display: block;
  width: 100%;
  height: auto;
}

.info {
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: auto;
  font-size: 14px;
  overflow: hidden;
  color: #999;
}

.info_job {
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  color: #464646;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info_name {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}

.sub_info {
  vertical-align: middle;
  margin-left: -3px;
}

.send_time {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}

.uncollection {
  flex-shrink: 0;
  color: #f23023;
}
</style>

