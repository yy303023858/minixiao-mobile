<template>
  <div>
    <div class="job_wrapper vux-1px-b" v-for="(item, index) in listData" key="index" @click="goDetail(item.posId)">
      <div class="job_box">
        <div class="logo vux-1px">
          <img class="logo_img" :src="item.img">
        </div>
        <div class="info">
          <h5 class="info_job">{{item.pname}}</h5>
          <span class="info_name">{{item.name}}</span>
          <div class="sub_info">
            <i class="iconfont icon-location"></i>
            <span>{{item.city}}</span>
            <i class="iconfont icon-university"></i>
            <span>{{item.degree}}</span>
          </div>
          <span class="send_time">网申：{{item.expiryStartDate}}-{{item.expiryEndDate}}</span>
        </div>
        <span class="salary">{{item.salary}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {}
  },
  computed: {
    listData() {
      return this.data
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push('/jobs/' + id)
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
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

.salary {
  flex-shrink: 0;
  color: #f23023;
}
</style>

