<template>
  <div class="view">
    <x-header class="header" :left-options="{backText: ''}">隐私设置</x-header>
    <group title="屏蔽企业">
      <radio :options="radio" @on-change="change"></radio>
    </group>
  </div>
</template>
<script>
import { XHeader, Radio, Group } from 'vux'

export default {
  components: { XHeader, Radio, Group },
  data() {
    return {
      radio: ['所有公司都能看到我', '只有投递才能看到我的简历']
    }
  },
  methods: {
    change(value) {
      console.log('change:', value)
    }
  }
}
</script>
<style scoped>

</style>

