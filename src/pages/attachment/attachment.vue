<template>
  <div class="view">
    <x-header class="header" :left-options="{backText: ''}">附件简历</x-header>
    <div class="attach_wrapper">
      <i class="iconfont icon-file"></i>
      <p class="attach_name">求职简历.doc</p>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'

export default {
  components: { XHeader }
}
</script>
<style scoped>
.attach_wrapper{
  position: absolute;
  top: 46px;
  bottom: 100px;
  left: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon-file{
  display: block;
  font-size: 100px;
}
.attach_name{
  font-size: 19px;
}
</style>

