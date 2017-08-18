<template>
  <div class="view">
    <x-header class="header" :left-options="{backText: ''}">
      <input type="text" class="search_input" ref="inputBox" v-model="searchContent">
      <a slot="right" class="search_btn" @click="search">搜索</a>
    </x-header>
  
    <!-- 历史列表 -->
    <ul class="history_wrapper">
      <li v-for="(item, index) in historyList" key="1" class="history_item" @click="selHistoryItem(item)">
        <span class="history_text">{{item}}</span>
        <i class="iconfont icon-close" @click="deleteItem(index)"></i>
      </li>
    </ul>
    <span class="clear_btn" @click="clearAll" v-if="historyList.length">清空全部历史记录</span>
  </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  name: 'Search',
  components: { XHeader },
  data() {
    return {
      searchContent: '',
      historyList: []
    }
  },
  created() {
    // 获取搜索记录
    if (localStorage.getItem('searchHistory')) {
      this.historyList = JSON.parse(localStorage.getItem('searchHistory'))
    }
  },
  mounted() {
    // 让input获得焦点
    this.$refs.inputBox.focus()
  },
  methods: {
    search() {
      // 判断是否为空 如果有搜索内容
      if (this.searchContent) {
        if (localStorage.getItem('searchHistory')) {
          // 已经存在搜索记录
          let arr = JSON.parse(localStorage.getItem('searchHistory'))
          let index = arr.indexOf(this.searchContent)
          if (index !== -1) { arr.splice(index, 1) }
          arr.unshift(this.searchContent)
          localStorage.setItem('searchHistory', JSON.stringify(arr))
        } else {
          // 不存在搜索记录
          let arr = [this.searchContent]
          localStorage.setItem('searchHistory', JSON.stringify(arr))
        }
      }
      // 在还没创建jobs组件的情况下像vue根的全局变量写入一个搜索值
      this.$root.search = this.searchContent
      // 在还没创建jobs组件的情况下像vue根的全局变量写入一个搜索值
      this.$root.eventHub.$emit('changeTabBar', 1)
      this.$root.eventHub.$emit('search', this.searchContent)
      this.$router.replace('/jobs')
      this.searchContent = ''
    },
    selHistoryItem(val) {
      this.searchContent = val
      this.search()
    },
    deleteItem(index) {
      this.historyList.splice(index, 1)
      localStorage.setItem('searchHistory', JSON.stringify(this.historyList))
    },
    clearAll() {
      this.historyList = []
      localStorage.setItem('searchHistory', '')
    }
  }
}
</script>
<style scoped lang="less">
.view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #eee;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.search_input {
  margin: 0 auto;
  width: 74%;
  height: 32px;
  border-radius: 16px;
  font-size: 16px;
  outline: none;
  text-align: center;
  border: none;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.5);
}

.view .search_btn {
  margin-right: -6px;
  color: #fff;
  font-size: 16px;
}

.history_wrapper {
  padding-top: 46px;
}

.history_item {
  display: flex;
  margin-bottom: 6px;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  color: #464646;
}

.history_text {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

.clear_btn {
  display: block;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #049cff;
  background-color: #fff;
}

.icon-close {
  font-size: 12px;
}
</style>

