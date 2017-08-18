<template>
  <div class="view jobs">
    <Mheader ref="header" :tipText="searchContent"></Mheader>
    <flexbox :style="{marginTop: filterTop}" :gutter="0" class="filter_wrapper vux-1px-b">
      <flexbox-item>
        <div class="flex-demo vux-1px-r" @click="showOption(0)">
          <span>地区</span>
          <i class="iconfont icon-down"></i>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo vux-1px-r" @click="showOption(1)">
          <span>薪资</span>
          <i class="iconfont icon-down"></i>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo vux-1px-r" @click="showOption(2)">
          <span>学历</span>
          <i class="iconfont icon-down"></i>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo" @click="showOption(3)">
          <span>排序</span>
          <i class="iconfont icon-down"></i>
        </div>
      </flexbox-item>
    </flexbox>
  
    <transition name="salary-show">
      <div class="option" v-show="option[0]">
        <div class="option_box" ref="optionBox">
          <group v-for="(item, index) in addressRadio" key="index" :title="item.name" :id="item.name">
            <radio :options="item.list" @on-change="addressChange"></radio>
          </group>
        </div>
        <div class="letter_list">
          <ul>
            <li v-for="(item, index) in addressRadio" key="index" class="letter_item vux-1px-l" @click="selLetter(item.name)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </transition>
  
    <transition name="salary-show">
      <div class="option option_box" v-show="option[1]">
        <group>
          <radio :options="salaryRadio" @on-change="salaryChange" value="不限"></radio>
        </group>
      </div>
    </transition>
  
    <transition name="degree-show">
      <div class="option" v-show="option[2]">
        <group>
          <radio :options="degreeRadio" @on-change="degreeChange" value="不限"></radio>
        </group>
      </div>
    </transition>
  
    <transition name="order-show">
      <div class="option" v-show="option[3]">
        <group>
          <radio :options="orderRadio" @on-change="orderChange" value="不限"></radio>
        </group>
      </div>
    </transition>
  
    <transition name="fade">
      <div class="option_cover" v-show="option[0] || option[1] || option[2] || option[3]" @click="cancelOption"></div>
    </transition>
  
    <div class="jobs_list_view" ref="jobListView" @scroll="loadMore">
      <JobList :data="jobList"></JobList>
      <load-more :tip="loadTip" :show-loading="showLoading"></load-more>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, LoadMore, Radio, Group } from 'vux'
import Mheader from '@/components/m-header/m-header'
import JobList from '@/components/job-list/job-list'
import { cityByLetter } from '@/assets/cityByLetter.js'

export default {
  name: 'Jobs',
  data() {
    return {
      isSearch: false,
      searchContent: '搜索职位或公司',
      // 高度
      viewHeight: '',
      canLoad: true,
      filterTop: '46px',
      jobList: [],
      loadTip: '正在加载',
      showLoading: true,
      option: [false, false, false, false],
      addressRadio: cityByLetter,
      salaryRadio: [{ value: '不限', key: '' }, { value: '面议', key: 0 }, { value: '2k以下', key: 1 }, { value: '2k-3k', key: 2 }, { value: '3k-6k', key: 3 }, { value: '6k-10k', key: 4 }, { value: '10k-15k', key: 5 }, { value: '15k-25k', key: 6 }, { value: '25k-50k', key: 7 }, { value: '50k以上', key: 8 }],
      degreeRadio: [{ value: '不限', key: 0 }, { value: '大专及以上', key: 1 }, { value: '本科及以上', key: 2 }, { value: '硕士及以上', key: 3 }, { value: '博士及以上', key: 4 }],
      orderRadio: [{ value: '不限', key: '' }, { value: '网申结束时间降序排列', key: 'expiry_end_date+desc' }, { value: '网申结束时间升序排列', key: 'expiry_end_date+asc' }],
      // 职位列表条件参数
      cityName: '',
      education: '',
      salary: '',
      sort: '',
      search: '',
      pageSize: 10,
      pn: 1
    }
  },
  components: { Mheader, Flexbox, FlexboxItem, JobList, LoadMore, Radio, Group },
  created() {
    // 在vue根上生命全局变量为了第一次进入判断是否是点击搜索进来
    if (this.$root.search) {
      this.search = this.$root.search
      this.searchContent = this.$root.search
      this.getData()
    } else {
      this.getData()
    }
    // 接受search事件  搜索职位
    this.$root.eventHub.$on('search', (data) => {
      if (data) {
        this.searchContent = data
      } else {
        this.searchContent = '搜索职位或公司'
      }
      this.search = data
      this.pn = 1
      this.getData()
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.viewHeight = this.$refs.jobListView.clientHeight
    })
  },
  methods: {
    getData() {
      this.$http.get(`/jobposting?cityName=${this.cityName}&education=${this.education}&salary=${this.salary}&sort=${this.sort}&search=${this.search}&pn=${this.pn}&pageSize=${this.pageSize}`)
        .then((res) => {
          if (res.data.data.length) {
            this.jobList = res.data.data
            if (res.data.totalPage === 1) {
              this.loadTip = '暂无其他职位'
              this.showLoading = false
            }
          } else {
            this.jobList = []
            this.loadTip = '未找到符合职位'
            this.showLoading = false
          }
        })
    },
    resetData() {
      this.option = [false, false, false, false]
      this.$refs.jobListView.scrollTop = 0
      this.pn = 1
      this.canLoad = true
      this.showLoading = true
      this.jobList = []
      this.loadTip = '正在加载'
      this.getData()
    },
    loadMore() {
      // 上拉刷新
      if (this.$refs.jobListView.scrollTop < -10) {
        console.log('refresh')
      }
      // 下拉加载更多
      if (this.$refs.jobListView.scrollTop === this.$refs.jobListView.scrollHeight - this.viewHeight && this.canLoad) {
        this.canLoad = false
        this.pn++
        this.$http.get(`/jobposting?cityName=${this.cityName}&education=${this.education}&salary=${this.salary}&sort=${this.sort}&search=${this.search}&pn=${this.pn}&pageSize=${this.pageSize}`).then((res) => {
          if (res.data.data.length) {
            res.data.data.forEach((item) => {
              this.$set(this.jobList, this.jobList.length, item)
              this.canLoad = true
            })
          } else {
            this.canLoad = false
            this.loadTip = '暂无更多职位'
            this.showLoading = false
          }
        }).catch(() => {
          this.loadTip = '加载失败'
          this.showLoading = false
        })
      }
    },
    // 选择城市首字母
    selLetter(val) {
      this.$refs.optionBox.scrollTop = document.getElementById(val).offsetTop
    },
    showOption(val) {
      if (this.option[val]) {
        this.option = [false, false, false, false]
      } else {
        this.option = [false, false, false, false]
        this.option[val] = true
      }
    },
    cancelOption() {
      this.option = [false, false, false, false]
    },
    addressChange(val) {
      if (val === '不限') {
        this.cityName = ''
      } else {
        this.cityName = val
      }
      this.resetData()
    },
    salaryChange(val) {
      this.salary = val
      this.resetData()
    },
    degreeChange(val) {
      this.education = val
      this.resetData()
    },
    orderChange(val) {
      this.sort = val
      this.resetData()
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.filter_wrapper {
  position: relative;
  left: 0;
  top: 0;
  z-index: 9;
  height: 40px;
  background-color: #fff;
}

.flex-demo {
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.flex-demo .iconfont {
  font-size: 12px;
}

.jobs_list_view {
  position: absolute;
  top: 85px;
  bottom: 50px;
  z-index: 6;
  left: 0;
  right: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.option {
  position: absolute;
  top: 86px;
  left: 0;
  z-index: 8;
  width: 100%;
  transition: all .25s ease-in-out;
}

.letter_list {
  position: absolute;
  right: 0;
  top: 0;
  width: 44px;
  height: 300px;
  text-align: center;
  background-color: #fafafa;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.letter_item {
  padding: 10px 0;
}

.option_cover {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 7;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.3s;
}

.option_box {
  height: 300px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #fff;
}

.salary-show-enter,
.salary-show-leave-to {
  transform: translateY(-400px);
}

.degree-show-enter,
.degree-show-leave-to {
  transform: translateY(-200px);
}

.order-show-enter,
.order-show-leave-to {
  transform: translateY(-120px);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
