<template>
  <header class="header" :style="{background: headerColor}">
    <a href="#" class="header_box" @click.prevent="search">
      <i class="iconfont icon-search"></i>
      <span class="header_title">{{text}}</span>
    </a>
  </header>
</template>
<script>
export default {
  props: {
    headerStyle: {
      default: 'rgba(4, 156, 255, 1)'
    },
    tipText: {
      default: '搜索职位或公司',
      type: String
    }
  },
  computed: {
    headerColor() {
      return this.headerStyle
    },
    text() {
      return this.tipText
    }
  },
  methods: {
    search() {
      this.$router.push('/search')
    }
  }
}
</script>
<style scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 46px;
  text-align: center;
  transition: 0.5s;
}

.header_box {
  display: inline-block;
  width: 90%;
  height: 32px;
  margin-top: 7px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.5);
}

.header_box .iconfont,
.header_box .header_title {
  line-height: 32px;
  font-size: 14px;
  color: #fff;
}
</style>

