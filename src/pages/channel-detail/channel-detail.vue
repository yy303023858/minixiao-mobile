<template>
  <div class="view">
    <x-header class="header" :left-options="{backText: ''}"></x-header>
    <div class="main_view">
      <div class="main_box">
        <div class="img_wrapper">
          <img class="img" src="http://www.minixiao.com/st/images/activity/201608/fb27248b4ec94ebbb907ec10142c94e6.jpg">
        </div>
        <h3 class="channel_title">搜狗 Geek Day</h3>
        <p class="channel_des">CEO与你面对面，技术大牛排排坐，师兄师姐当面聊，当场面试效率高，美食车票全都包，互动体验嗨到爆！</p>
        <ul class="info">
          <li class="info_item">
            <i class="iconfont icon-time"></i>
            <span>2016-09-27 13:00 ~ 18:00</span>
          </li>
          <li class="info_item">
            <i class="iconfont icon-address"></i>
            <span>北京，具体地点审核通过后另行通知</span>
          </li>
          <li class="info_item">
            <i class="iconfont icon-user"></i>
            <span>名额不限</span>
          </li>
          <li class="info_item">
            <i class="iconfont icon-building"></i>
            <span>搜狗</span>
          </li>
        </ul>
      </div>
  
      <div class="channel_content">
        <h4 class="content_title vux-1px-b">活动详情</h4>
        <pre class="content">
          <div class="card-content" id="activityContentId">
            <p>每一段人生，都有梦想的奠基</p>
            <p>每一个生命，都有专属的超极英雄</p>
            <p>每一天都在期待你的出现，期待一个智慧，热情，能力超群的你</p>
            <p>期待，你就是我要找的超极英雄<br>
            “搜寻下一个超极英雄”&nbsp;搜狗2017校园招聘悄然来袭！&nbsp;<br>
            你就是我心中的超极英雄~&nbsp;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p>我们打破常规，以最快的脚步来到你身旁，只为给你展示最好的明天！</p>
            <p><strong>搜狗</strong><strong>Geek Day</strong><strong>！</strong></p>
            <p><strong>史无前例的校招福利！</strong></p>
            <p>我们已倾尽所有，只为迎来最优秀的你！</p>
            <p>&nbsp;</p>
            <p><strong>搜狗</strong><strong>Geek Day</strong><strong>这里有：</strong></p>
            <p><strong>CEO</strong><strong>与你面对面：</strong>CEO站台！了解搜狗？没有更好的机会了！</p>
            <p><strong>技术大牛排排坐：</strong>技术大牛站台！搜狗CTO、首席架构师、产品技术负责人全部出席！</p>
            <p><strong>师兄师姐当面聊：</strong>求职路上，找个靠谱的师兄或师姐好好聊！</p>
            <p><strong>当场面试效率高：</strong>现场直接面试，最快途径拿offer！就为最“极客”的你！</p>
            <p><strong>美食车票全都包：</strong>精美茶点，路费报销，最贴心的福利！</p>
            <p><strong>互动体验嗨到爆：</strong>公司参观，学长交流，更快了解搜狗！</p>
            <p>&nbsp;</p>
            <p><strong>搜狗</strong><strong>Geek Day流程：</strong></p>
            <p>13:00—13:40：签到＆参观</p>
            <p>13:40—15:10：高管分享</p>
            <p>15:10—15:55：交流＆茶歇</p>
            <p>15:55—16:00：面试讲解</p>
            <p>16:00—18:00：面试</p>
            <p>&nbsp;</p>
            <p><strong>如果你是：</strong></p>
            <p>超级学霸&nbsp; 项目能手&nbsp; 实习标兵&nbsp; 研究达人&nbsp; 竞赛精英</p>
            <p>快来报名参加搜狗Geek Day活动！</p>
            <p>&nbsp;</p>
            <p><strong>活动安排：</strong></p>
            <p><strong>时间：</strong>9月27日</p>
            <p><strong>地点：</strong>具体地点审核通过后另行通知</p>
            <p>&nbsp;</p>
          </div>
        </pre>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  components: { XHeader }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.view {
  background-color: #eee;
}

.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
}

.main_box {
  padding: 56px 10px 4px;
  margin-bottom: 10px;
  background-color: #fff;
}

.channel_content {
  background-color: #fff;
}

.img_wrapper {
  min-height: 200px;
}

.img {
  display: block;
  width: 100%;
  height: auto;
}

.channel_title {
  margin-top: 10px;
  line-height: 20px;
  font-size: 18px;
  font-weight: normal;
  color: #333;
}

.channel_des {
  padding: 16px 0;
  line-height: 24px;
  font-size: 16px;
  color: #3d4145;
}

.info {
  margin-bottom: 10px;
}

.info_item {
  display: block;
  line-height: 36px;
  font-size: 14px;
  color: #999;
}

.info_item .iconfont {
  display: inline-block;
  width: 20px;
  color: #049cff;
}

.content_title {
  padding: 0 10px;
  line-height: 46px;
  font-size: 16px;
  font-weight: normal;
  color: #333;
}

.content {
  padding: 0 10px;
  white-space: pre-wrap;
}
</style>