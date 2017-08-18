<template>
  <div class="view">
    <x-header class="header" :left-options="{backText: ''}">公司主页</x-header>
  
    <div class="main_view" @scroll="loadMore" ref="mainView">
      <div class="view_padding">
        <div class="company_info">
          <div class="img_wrapper vux-1px">
            <img class="img" :src="recInfo.logo">
          </div>
          <div class="info_content">
            <h3 class="title">{{recInfo.fullName}}</h3>
            <p class="category">{{recInfo.primaryIndustry}}</p>
            <p class="sub_info">
              <span>{{recInfo.nature}}</span>
              <i> | </i>
              <span>{{recInfo.size}}</span>
            </p>
          </div>
        </div>
  
        <p class="email" v-if="recInfo.website">
          <i class="iconfont icon-ie1"></i>
          <span>{{recInfo.website}}</span>
        </p>
        <p class="address" v-if="recInfo.detailAddress">
          <i class="iconfont icon-location"></i>
          <span>{{recInfo.detailAddress}}</span>
        </p>
        <ul class="tag">
          <li class="tag_item" v-for="item in recTags" key="index">
            <span class="tag_text">{{item}}</span>
          </li>
        </ul>
  
      </div>
  
      <tab :animate="false" v-model="tabIndex" class="tab_bar vux-1px-t" :line-width="1">
        <tab-item selected @on-item-click="onItemClick" active-class="activeColor" class="vux-1px-r">公司介绍</tab-item>
        <tab-item @on-item-click="onItemClick" active-class="activeColor">热招职位{{jobCount}}个</tab-item>
      </tab>
  
      <div class="view_padding" v-show="tabIndex === 0">
        <div class="company_box">
          <pre class="company_des">{{recInfo.description}}</pre>
        </div>
      </div>
  
      <div class="jobs_wrapper" v-show="tabIndex === 1">
        <div class="job_type vux-1px-b">
          <span class="job_type_title">职位类型：</span>
          <div class="job_type_wrapper">
            <div class="job_type_box">
              <span @click="selType(index, item.text)" :class="activeJob(index)" v-for="(item, index) in jobType" key="index">{{item.text}}</span>
            </div>
          </div>
        </div>
  
        <div class="job_content vux-1px-b">
          <ul class="job_list">
            <li class="job_item vux-1px-b" v-for="(item, index) in jobList" key="index" @click="goJobDetail(index)">
              <div class="job_item_box">
                <div class="job_title_wrapper">
                  <span class="job_title">{{item.jobName}}</span>
                  <span class="salary">{{item.salary}}</span>
                </div>
                <p class="send_time">网申：{{item.expiryStartDate}}-{{item.expiryEndDate}}</p>
                <div>
                  <i class="iconfont icon-location"></i>
                  <span class="job_address">{{item.city}}</span>
                  <span> | </span>
                  <i class="iconfont icon-university"></i>
                  <span class="job_degree">{{item.degree}}</span>
                </div>
              </div>
              <i class="iconfont icon-right"></i>
            </li>
          </ul>
        </div>
        <load-more :tip="loadTip" :show-loading="showLoading"></load-more>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader, Tab, TabItem, LoadMore } from 'vux'
export default {
  name: 'CompanyDetail',
  data() {
    return {
      jobName: '',
      tabIndex: 0,
      jobCount: 0,
      typeIndex: 0,
      page: 0,
      type: '',
      recInfo: {},
      recTags: [],
      jobList: [],
      loadTip: '正在加载',
      canLoad: true,
      showLoading: true,
      jobType: [{ text: '全部' }]
    }
  },
  components: { XHeader, Tab, TabItem, LoadMore },
  created() {
    // 获取公司详情
    this.$http.get(`/recruiter/${this.$route.params.recId}`)
      .then((res) => {
        if (res.data) {
          this.recInfo = res.data.message.corpInfo
          this.recTags = res.data.message.corpInfo.tags.split('，')
          this.jobType = this.jobType.concat(res.data.message.positionOption)
        }
      })
    // 获取该公司职位列表
    this.$http.get(`/recruiter/${this.$route.params.recId}/jobList`)
      .then((res) => {
        if (res.data) {
          this.jobList = res.data.data
          this.jobCount = res.data.totalCount
        }
      })
  },
  methods: {
    onItemClick() {
      // console.log(this.tabIndex)
    },
    activeJob(index) {
      return {
        seledType: this.typeIndex === index,
        job_type_item: true
      }
    },
    selType(index, val) {
      this.typeIndex = index
      this.page = 0
      this.canLoad = true
      this.showLoading = true
      if (val === '全部') {
        this.type = ''
      } else {
        this.type = val
      }
      // 获取该公司职位列表
      this.$http.get(`/recruiter/${this.$route.params.recId}/jobList?positionTopType=${this.type}`)
        .then((res) => {
          if (res.data) {
            this.jobList = res.data.data
          }
        })
    },
    loadMore() {
      if (this.$refs.mainView.scrollTop === this.$refs.mainView.scrollHeight - this.$refs.mainView.clientHeight && this.canLoad) {
        this.page++
        this.canLoad = false
        this.$http.get(`/recruiter/${this.$route.params.recId}/jobList?positionTopType=${this.type}&page=${this.page}`)
          .then((res) => {
            this.canLoad = true
            if (res.data.data.length) {
              res.data.data.forEach((item) => {
                this.$set(this.jobList, this.jobList.length, item)
              })
              this.canLoad = true
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
    goJobDetail(index) {
      this.$router.push('/jobs/' + this.jobList[index].jobId)
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.icon-location {
  margin-left: -2px;
}

.activeColor {
  color: #049cff !important;
  border-color: #049cff !important;
}

.main_view {
  position: absolute;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.view_padding {
  padding: 0 16px;
}

.company_info {
  display: flex;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.img_wrapper {
  flex: 0 0 88px;
  width: 88px;
  height: 88px;
  margin-right: 10px;
}

.img {
  display: block;
  width: 100%;
  height: 100%;
}

.info_content {
  flex-shrink: 1;
  overflow: hidden;
}

.title {
  padding-bottom: 14px;
  line-height: 26px;
  font-size: 16px;
  font-weight: normal;
  color: #3d4145;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.category {
  padding-bottom: 12px;
  line-height: 15px;
  font-size: 15px;
  color: #666;
}

.sub_info {
  font-size: 14px;
  color: #999;
}

.email,
.address {
  line-height: 20px;
  font-size: 14px;
  color: #8f8f8f;
}

.address {
  padding-bottom: 10px;
}

.tag {
  overflow: hidden;
}

.tag_item {
  float: left;
  width: 25%;
  margin-bottom: 10px;
  text-align: center;
}

.tag_text {
  display: inline-block;
  width: 90%;
  line-height: 26px;
  font-size: 14px;
  color: #fd8a0f;
  border: 1px solid #fd8a0f;
  border-radius: 4px;
}

.company_des {
  word-break: break-all;
  white-space: pre-line;
  line-height: 24px;
  font-size: 14px;
  color: #666;
}

.job_type {
  display: flex;
  padding: 0 6px;
  height: 50px;
  line-height: 40px;
  overflow: hidden;
}

.job_type_title {
  flex-shrink: 0;
  line-height: 50px;
}

.job_type_wrapper {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.job_type_box {
  display: flex;
}

.job_type_item {
  flex-shrink: 0;
  height: 30px;
  margin: 10px 4px;
  line-height: 30px;
  padding: 0 8px;
}

.seledType {
  border-radius: 15px;
  background-color: #049cff;
  color: #fff;
}

.job_content {
  padding: 0 12px;
}

.job_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 16px;
  color: #999;
}

.job_item_box {
  padding: 0 6px;
}

.job_title_wrapper {
  line-height: 30px;
}

.job_title {
  padding-right: 10px;
  color: #333;
}

.salary {
  color: #fd4545;
}

.send_time {
  line-height: 30px;
}
</style>