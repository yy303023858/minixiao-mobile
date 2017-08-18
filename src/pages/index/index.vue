<template>
  <div class="view" ref="view" @scroll="loadMore">
    <Mheader :headerStyle="headerColor" ref="header"></Mheader>
  
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
      <swiper-slide class="swiper-item" v-for="(item, index) in swiperList" key="index">
        <a :href="item.url">
          <img :src="item.img" class="swiper_img">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  
    <flexbox class="nav_wrapper">
      <flexbox-item class="nav_item">
        <div class="flex-demo" @click="goJobs">
          <i class="iconfont icon-zhiwei"></i>
          <h3 class="nav_name">职位</h3>
        </div>
      </flexbox-item>
      <flexbox-item class="nav_item">
        <div class="flex-demo">
          <i class="iconfont icon-gongsi"></i>
          <h3 class="nav_name">公司</h3>
        </div>
      </flexbox-item>
      <flexbox-item class="nav_item">
        <div class="flex-demo">
          <i class="iconfont icon-xuanjiang"></i>
          <h3 class="nav_name">宣讲会</h3>
        </div>
      </flexbox-item>
    </flexbox>
    <h3 class="hot">
      <i class="iconfont icon-fire"></i>热门精选
    </h3>
  
    <grid :rows="3" class="grid_view">
      <grid-item v-for="(item, index) in jobList" key="index" class="grid_item" @click.native="goDetail(item.jobId)">
        <div class="img_wrapper">
          <img :src="item.logo" class="img">
        </div>
        <h5 class="info_job">{{item.jobName}}</h5>
        <p class="salary">{{item.salary}}</p>
      </grid-item>
    </grid>
  
    <!--<load-more :tip="loadTip" :show-loading="showLoading"></load-more>-->
  </div>
</template>
<script>
import { XInput, Flexbox, FlexboxItem, Grid, GridItem } from 'vux'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Mheader from '@/components/m-header/m-header'
export default {
  name: 'Index',
  data() {
    return {
      swiperList: [
        'http://www.minixiao.com/static/images/banner/201705/wx_20170607104035.jpg',
        'http://admin.minixiao.com/st/images/banner/201703/245c54340c704d28a6219929dc6141aa.jpg',
        'http://admin.minixiao.com/st/images/banner/201704/20170425161544wx.jpg'
      ],
      headerColor: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(255, 255, 255, 0.1))',
      swiperOption: {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        loop: true,
        autoplay: 3000
      },
      jobList: [],
      viewHeight: null,
      swiperHeight: null,
      canLoad: true,
      showLoading: true,
      loadTip: '正在加载'
    }
  },
  created() {
    // 查询banner
    this.$http.get(`/ad/coverstory`)
      .then((res) => {
        if (res.data.message.length) {
          this.swiperList = res.data.message
        }
      })
    // 热招职位列表
    this.$http.get(`/jobposting/hotjob`)
      .then((res) => {
        if (res.data.message.length) {
          this.jobList = res.data.message
        }
      })
    // this.$http.get('https://www.easy-mock.com/mock/5951bf859adc231f356adea8/api/list', { headers: { 'aaaaa': 'foobarrrrrrrrrrrrrrrrr' } }).then((res) => {
    //   this.jobList = res.data
    // })
  },
  mounted() {
    this.$nextTick(() => {
      this.viewHeight = this.$refs.view.clientHeight
      this.headerHeight = this.$refs.header.$el.clientHeight
    })
  },
  components: { swiper, swiperSlide, XInput, Mheader, Flexbox, FlexboxItem, Grid, GridItem },
  methods: {
    loadMore() {
      // 下拉加载更多
      // if (this.$refs.view.scrollTop === this.$refs.view.scrollHeight - this.viewHeight && this.canLoad) {
      //   this.canLoad = false
      //   this.$http.get('https://www.easy-mock.com/mock/5951bf859adc231f356adea8/api/list').then((res) => {
      //     if (res.data) {
      //       res.data.forEach((item) => {
      //         this.$set(this.jobList, this.jobList.length, item)
      //         this.canLoad = true
      //       })
      //     } else {
      //       this.canLoad = false
      //       this.loadTip = '暂无数据'
      //       this.showLoading = false
      //     }
      //   }).catch(() => {
      //     this.loadTip = '加载失败'
      //     this.showLoading = false
      //   })
      // }
      // 改变header背景色
      if (this.$refs.view.scrollTop >= this.$refs.mySwiper.$el.clientHeight - this.headerHeight) {
        this.headerColor = 'rgba(4, 156, 255, 1)'
      } else {
        this.headerColor = 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(255, 255, 255, 0.1))'
      }
    },
    goJobs() {
      this.$router.push('/jobs')
      this.$root.eventHub.$emit('changeTabBar', 1)
    },
    goDetail(id) {
      this.$router.push('/jobs/' + id)
    },
    search() {
      this.$router.push('/search')
    }
  }
}
</script>
<style scoped>
.view {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 50px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #eee;
}
.swiper-box{
  min-height: 150px;
}
.swiper_img {
  display: block;
  width: 100%;
  height: auto;
}

.nav_wrapper {
  margin-bottom: 14px;
  padding: 16px 0 10px 0;
  background-color: #fff;
}

.nav_item {
  text-align: center;
}

.nav_name {
  font-weight: normal;
  font-size: 17px;
  color: #464646;
}

.icon-zhiwei {
  color: #e7434f;
}

.icon-gongsi {
  color: #1cc3ad;
}

.icon-xuanjiang {
  color: #8883f2;
}

.nav_item .iconfont {
  display: block;
  font-size: 30px;
  text-align: center;
}

.hot {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  font-size: 16px;
  font-weight: normal;
  background-color: #fff;
}

.hot .iconfont {
  color: #049cff;
  margin-right: 6px;
}

.grid_view {
  background-color: #fff;
}

.grid_item {
  color: #999;
}

.img {
  display: block;
  margin: 0 auto;
  width: 76%;
  height: auto;
}

.info_job {
  font-size: 15px;
  font-weight: normal;
  color: #464646;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}

.salary {
  line-height: 22px;
  color: #f23023;
  text-align: center;
  font-size: 14px;
}

.icon-location {
  display: inline-block;
  margin-left: -2px;
  font-size: 18px;
}
</style>
