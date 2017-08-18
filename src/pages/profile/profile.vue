<template>
  <div class="view resume">
    <!-- 简历首页 -->
    <div id="mobile-neitui-resume" v-show="showPage==='resume'">
      <x-header class="header" :left-options="{backText: ''}">我的简历</x-header>
  
      <!-- 基本信息展示 -->
      <div class="resume-item first-resume-item">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">基本信息</h2>
          <span class="color-red">*</span>
          <a href="javascript:" class="editor-btn iconfont icon-bianji" id="basic-editor" v-on:click="editorBasic"></a>
        </div>
        <div class="pleaseEdit" v-if="!resumeData.basic.name">
          <h2 class="color-red">请编辑</h2>
        </div>
        <div class="resume-item-content" v-if="resumeData.basic.name">
          <h3>{{resumeData.basic.name}}</h3>
          <div>{{resumeData.basic.gender}} {{resumeData.basic.birthday}}</div>
          <div>家庭所在地：{{resumeData.basic.city}}</div>
          <div>当前所在地：{{resumeData.basic.currentCity}}</div>
          <div>电话号码：{{resumeData.basic.mobile}}</div>
          <div>邮箱：{{resumeData.basic.email}}</div>
        </div>
      </div>
      <!-- 教育展示 -->
      <div class="resume-item" id="resumeEdu">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">教育信息</h2>
          <span class="color-red">*</span>
        </div>
        <div class="pleaseEdit" v-if="!resumeData.education">
          <h2 class="color-red">请编辑</h2>
        </div>
        <div class="resume-item-content edu-item vux-1px-b" v-for="(item, index) in resumeData.education" @click="editorEdu(item, index)" v-if="resumeData.education">
          <div class="arrow-right">
            <div>
              {{item.school}}
              <span>|</span>
              {{item.major}}
              <span>|</span>
              {{formatDegree(item.degree)}}
              <span>|</span>
              {{formatRank(item.rank)}}
            </div>
            <div>
              {{item.start_date}}至{{item.end_date}}
            </div>
          </div>
        </div>
        <div class="resume-add-btn">
          <a href="javascript:;" @click="editorEdu">
            <span>+</span>添加教育信息</a>
        </div>
      </div>
      <!-- 实习经历展示 -->
      <div class="resume-item" id="resumeWork">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">实习经历</h2>
          <span class="color-red">*</span>
          <a href="javascript:;" class="editor-btn iconfont icon-bianji" v-on:click="editorWork"></a>
        </div>
        <div class="pleaseEdit" v-if="!resumeData.work">
          <h2 class="color-red">请编辑</h2>
        </div>
        <div class="resume-item-content" v-if="resumeData.work">
          <pre class="resume_pre">{{resumeData.work}}</pre>
        </div>
      </div>
      <!-- 项目经验展示 -->
      <div class="resume-item" id="resumePractices">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">项目经验</h2>
          <span class="color-red">*</span>
          <a href="javascript:;" class="editor-btn iconfont icon-bianji" v-on:click="editorPractice"></a>
        </div>
        <div class="pleaseEdit" v-if="!resumeData.practices">
          <h2 class="color-red">请编辑</h2>
        </div>
        <div class="resume-item-content" v-if="resumeData.practices">
          <pre class="resume_pre">{{resumeData.practices}}</pre>
        </div>
      </div>
  
      <!-- 社团经历展示 -->
      <div class="resume-item" id="resumeClub">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">社团经历</h2>
          <a href="javascript:;" class="editor-btn iconfont icon-bianji" id="club-editor" v-on:click="editorClub"></a>
        </div>
        <div class="resume-item-content">
          <pre v-if="resumeData.club" class="resume_pre">{{resumeData.club}}</pre>
        </div>
      </div>
      <!-- 获奖荣誉展示 -->
      <div class="resume-item" id="resumeReward">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">获奖荣誉</h2>
          <a href="javascript:;" class="editor-btn iconfont icon-bianji" id="reward-editor" v-on:click="editorReward"></a>
        </div>
        <div class="resume-item-content">
          <pre v-if="resumeData.reward" class="resume_pre">{{resumeData.reward}}</pre>
        </div>
      </div>
      <!-- 实验室展示 -->
      <div class="resume-item" id="resumeLab">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">实验室</h2>
          <a href="javascript:;" class="editor-btn iconfont icon-bianji" id="reward-editor" v-on:click="editorLab"></a>
        </div>
        <div class="resume-item-content">
          <pre v-if="resumeData.laboratory" class="resume_pre">{{resumeData.laboratory}}</pre>
        </div>
      </div>
  
      <!-- 语言等级展示 -->
      <div class="resume-item" id="resumeLanguage">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">语言等级</h2>
          <span class="color-red">*</span>
        </div>
        <div class="pleaseEdit" v-if="!resumeData.language">
          <h2 class="color-red">请编辑</h2>
        </div>
        <div class="resume-item-content edu-item vux-1px-b" v-for="(item,index) in resumeData.language" @click="editorLanguage(item, index)" v-if="resumeData.language">
          <div class="arrow-right">
            <h4>{{item.type}}</h4>
            <div>
              <span>{{item.level}}</span>{{item.score}}
            </div>
          </div>
        </div>
        <div class="resume-add-btn">
          <a href="javascript:;" @click="editorLanguage">
            <span>+</span>添加语言等级</a>
        </div>
      </div>
  
      <!-- 证书展示 -->
      <div class="resume-item" id="resumeCertificate">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">其他证书</h2>
        </div>
        <div class="pleaseEdit" v-if="!resumeData.certificate">
          <h2 class="color-red">请编辑</h2>
        </div>
        <div class="resume-item-content edu-item vux-1px-b" v-for="(item,index) in resumeData.certificate" @click="editorCertificate(item, index)" v-if="resumeData.certificate">
          <div class="arrow-right">
            <div>{{item}}</div>
          </div>
        </div>
        <div class="resume-add-btn">
          <a href="javascript:;" @click="editorCertificate">
            <span>+</span>添加更多证书</a>
        </div>
      </div>
      <!-- 技能展示 -->
      <div class="resume-item" id="resumeSkill">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">技能</h2>
        </div>
        <div class="pleaseEdit" v-if="!resumeData.skill">
          <h2 class="color-red">请编辑</h2>
        </div>
        <div class="resume-item-content edu-item vux-1px-b" v-for="(item,index) in resumeData.skill" @click="editorSkill(item, index)" v-if="resumeData.skill">
          <div class="arrow-right">
            {{item.type}} {{item.level}}
          </div>
        </div>
        <div class="resume-add-btn">
          <a href="javascript:;" @click="editorSkill">
            <span>+</span>添加更多技能</a>
        </div>
      </div>
      <!-- 其他信息展示 -->
      <div class="resume-item" id="resumeOther">
        <div class="resume-item-title vux-1px-b">
          <h2 class="inline-block">其他信息</h2>
          <a href="javascript:;" class="editor-btn iconfont icon-bianji" id="other-editor" v-on:click="editorOther"></a>
        </div>
        <div class="resume-item-content">
          <div v-if="resumeData.other.source">
            <div>信息来源：{{resumeData.other.source}}</div>
            <div>户口所在地：{{resumeData.other.city}}</div>
            <div>身份证号：{{resumeData.other.number}}</div>
            <div>爱好专长：{{resumeData.other.hobby}}</div>
            <div>自我评价：{{resumeData.other.evaluation}}</div>
          </div>
        </div>
      </div>
      <button class="completeBtn saveBtn">保存</button>
    </div>
    <!-- 基本信息编辑 -->
    <div class="resume-basic" v-show="showPage==='basic'">
      <x-header class="header" :left-options="{showBack: false, backText: '',preventGoBack: true}" @on-click-back="leave">填写基本信息</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <group class="delBorder">
            <x-input class="necessary" title="真实姓名" name="username" placeholder="请输入真实姓名" is-type="china-name" required v-model="resumeData.basic.name"></x-input>
            <x-input class="necessary" title="手机号码" :max="11" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="resumeData.basic.mobile" required></x-input>
            <x-input class="necessary" title="邮箱" name="email" placeholder="请输入常用邮箱" is-type="email" required v-model="resumeData.basic.email"></x-input>
            <div class="resume-basic-gender weui-cell">
              <div class="resume-basic-content">
                <span class="gender_title inline-block">性别</span>
                <div class="gender">
                  <check-icon :value.sync="male" type="plain" :class="{fixText: male}">男</check-icon>
                  <check-icon :value.sync="female" type="plain" :class="{fixText: female}">女</check-icon>
                </div>
              </div>
            </div>
            <datetime :class="{fixText: hasBirthday}" v-model="birthday" default-selected-value="" title="出生日期" :min-year="1980" confirm-text="完成" cancel-text="取消" placeholder="请输入出生日期" @on-change="birthdayChange"></datetime>
            <popup-picker class="pop" title="家庭所在地" :data="list3" :columns="2" v-model="tempCity" value-text-align="left" show-name placeholder="请选择家庭所在地"></popup-picker>
            <popup-picker class="necessary pop" title="当前所在地" :data="list3" :columns="2" v-model="tempCurrentCity" value-text-align="left" show-name placeholder="请选择目前所在城市"></popup-picker>
          </group>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveBasic">保存</button>
        </div>
      </div>
    </div>
  
    <!-- 教育信息编辑 -->
    <div class="resume-edu" v-if="showPage==='education'">
      <x-header class="header" :left-options="{showBack: false, backText: '',preventGoBack: true}" :right-options="{showMore: eduItemIndex >= 0}" @on-click-back="leave" @on-click-more="deleteEdu">填写教育信息</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <group class="delBorder">
            <x-input class="necessary" title="学校名称" placeholder="请输入学校名称" required v-model="school"></x-input>
            <x-input class="necessary" title="所学专业" placeholder="请输入所学专业" required v-model="major"></x-input>
            <popup-picker class="necessary pop degree" title="学历" :data="eduDegreeData" value-text-align="left" v-model="value1" placeholder="选择学历"></popup-picker>
            <datetime class="necessary" :class="{fixText: hasStart}" v-model="start_date" format="YYYY-MM" title="入学时间" :min-year="2000" confirm-text="完成" cancel-text="取消" placeholder="请选择入学时间" @on-change="startChange"></datetime>
            <datetime class="necessary" :class="{fixText: hasEnd}" v-model="end_date" format="YYYY-MM" title="毕业时间" :min-year="2000" confirm-text="完成" cancel-text="取消" placeholder="请选择毕业时间" @on-change="endChange"></datetime>
            <popup-picker class="pop" title="专业排名" :data="majorOrderData" value-text-align="left" v-model="value2" placeholder="选择专业排名"></popup-picker>
          </group>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveEdu">保存</button>
        </div>
      </div>
    </div>
  
    <!-- 实习经历编辑 -->
    <div id="resumeWork" class="resume-work" v-if="showPage==='work'">
      <x-header class="header" :left-options="{backText: '',preventGoBack: true}" @on-click-back="leave">填写实习经历</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <group class="delBorder">
            <x-textarea id="workText" :max="2000" placeholder="例：2016年3月，进入阿里巴巴集团担任三个月的产品实习生职位，主要负责淘宝网用户端的用户消费行为分析和商品营销专题策划工作；若没有实习经历可填“无”；" v-model="resumeData.work"></x-textarea>
          </group>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveWork">保存</button>
        </div>
      </div>
    </div>
    <!-- 项目经验编辑 -->
    <div id="resumeProject" class="resume-project" v-if="showPage==='practices'">
      <x-header class="header" :left-options="{backText: '',preventGoBack: true}" @on-click-back="leave">填写项目经验</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <group class="delBorder">
            <x-textarea :max="2000" placeholder="例：2016年6月，加入我校大学生在线教育平台项目，同时担任半年的产品设计一职，主要负责用户需求调研以及网站的原型设计工作，最后该项目按时上线并一直运行至今；若没有项目经验可填“无”；" v-model="resumeData.practices"></x-textarea>
          </group>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="savePractice">保存</button>
        </div>
      </div>
    </div>
  
    <!-- 社团经历编辑 -->
    <div id="resumeClub" class="resume-club" v-if="showPage==='club'">
      <x-header class="header" :left-options="{backText: '',preventGoBack: true}" @on-click-back="leave">填写社团经历</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <group class="delBorder">
            <x-textarea :max="2000" placeholder="例：2015年，担任经济与管理学院学生会宣传部部长，主要负责社团活动的对外宣传以及海报设计的制作。若没有社团经历可填“无”；" v-model="resumeData.club"></x-textarea>
          </group>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveClub">保存</button>
        </div>
      </div>
  
    </div>
    <!-- 获奖荣誉编辑 -->
    <div id="resumeReward" class="resume-reward" v-if="showPage==='reward'">
      <x-header class="header" :left-options="{backText: '',preventGoBack: true}" @on-click-back="leaveReward">填写获奖荣誉</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <group class="delBorder">
            <x-textarea :max="2000" placeholder="例：2015年10月荣获校级一等奖学金；2016年11月荣获全国挑战杯大赛省级一等奖；若没有获奖荣誉可填“无”；" v-model="resumeData.reward"></x-textarea>
          </group>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveReward">保存</button>
        </div>
      </div>
    </div>
    <!-- 实验室详细编辑 -->
    <div id="resumeReward" class="resume-reward" v-if="showPage==='laboratory'">
      <x-header class="header" :left-options="{backText: '',preventGoBack: true}" @on-click-back="leaveLab">填写实验室</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <group class="delBorder">
            <x-textarea :max="2000" placeholder="例：2016年9月，进去清华大学“智能信息技术实验室”，期间主要负责参与了人工智能和机器学习相关学术研究。" v-model="resumeData.laboratory"></x-textarea>
          </group>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveLab">保存</button>
        </div>
      </div>
    </div>
    <!-- 语言等级编辑 -->
    <div class="resume-skill" v-if="showPage==='language'">
      <x-header class="header" :left-options="{showBack: false, backText: '',preventGoBack: true}" :right-options="{showMore: lanIndex >= 0}" @on-click-back="leaveLanguage" @on-click-more="deleteLanguage">填写语言等级证书</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <div>
            <h4 class="skill-title">
              <span>语言证书</span>
            </h4>
            <group class="delBorder">
              <popup-picker title="语言等级" :data="list" v-model="value3" :columns="2" placeholder="选择语言等级" value-text-align="left"></popup-picker>
            </group>
          </div>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveLanguage">保存</button>
        </div>
      </div>
    </div>
  
    <!-- 证书编辑 -->
    <div class="resume-skill" v-if="showPage==='certificate'">
      <x-header class="header" :left-options="{showBack: false, backText: '',preventGoBack: true}" :right-options="{showMore: certificateIndex >= 0}" @on-click-back="leaveCertificate" @on-click-more="deleteCertificate">填写语言等级证书</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <div>
            <h4 class="skill-title">
              <span>其他证书</span>
            </h4>
            <group class="delBorder">
              <x-input title="其他证书" placeholder="请填写其他证书" v-model="certificate"></x-input>
            </group>
          </div>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveCertificate">保存</button>
        </div>
      </div>
    </div>
    <!-- 技能编辑 -->
    <div class="resume-skill" v-if="showPage==='skill'">
      <x-header class="header" :left-options="{showBack: false, backText: '',preventGoBack: true}" :right-options="{showMore: skillIndex >= 0}" @on-click-back="leaveSkill" @on-click-more="deleteSkill">填写技能</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <div>
            <h4 class="skill-title">
              <span>技能</span>
            </h4>
            <group class="delBorder">
              <x-input title="技能名称" placeholder="例：office、Java、CAD" v-model="skillType" class="skill-content"></x-input>
  
              <popup-picker title="熟练度" :data="skillData" v-model="value4" placeholder="选择技能熟练度" value-text-align="left"></popup-picker>
            </group>
          </div>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveSkill">保存</button>
        </div>
      </div>
    </div>
    <!-- 其他信息页 -->
    <div class="resume-other" v-show="showPage==='other'">
      <x-header class="header" :left-options="{backText: '',preventGoBack: true}" @on-click-back="leaveOther">编辑其他信息</x-header>
      <div class="resume-detail-content">
        <div class="resume-detail-view">
          <group class="delBorder">
            <popup-picker class="necessary" title="信息来源" :data="sourceData" v-model="value5" placeholder="请选择信息来源" value-text-align="left"></popup-picker>
            <popup-picker title="户口所在地" :data="list3" :columns="2" v-model="tempCity2" show-name placeholder="请选择家庭所在地" value-text-align="left"></popup-picker>
            <x-input title="身份证号" name="username" placeholder="请输入身份证号" v-model="resumeData.other.number"></x-input>
            <x-textarea :max="1000" placeholder="请填写个人专长爱好，不超过1000个字" v-model="resumeData.other.hobby"></x-textarea>
            <x-textarea :max="1000" placeholder="请填写自我评价，不超过1000个字" v-model="resumeData.other.evaluation"></x-textarea>
          </group>
        </div>
        <div class="saveBtn-box">
          <button class="saveBtn" @click="saveOther">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XInput, XTextarea, PopupPicker, Datetime, CheckIcon } from 'vux'
import { addressData } from '@/assets/city.js'
import { languageData } from '@/assets/lanData.js'
export default {
  components: {
    XHeader, Group, XInput, XTextarea, PopupPicker, Datetime, CheckIcon
  },
  data() {
    return {
      showPage: 'resume',
      hasBirthday: false,
      mobile: '',
      tempCity: [],
      tempCurrentCity: [],
      list3: addressData,
      tempCity2: [],
      birthday: '',
      male: false,
      female: false,
      resumeData: {
        id: '',
        basic: { name: '', mobile: '', email: '', gender: '', birthday: '', city: '', currentCity: '' },
        education: [],
        work: '',
        practices: '',
        club: '',
        reward: '',
        laboratory: '',
        skill: [],
        certificate: [],
        language: [],
        other: { number: '', hobby: '', evaluation: '', source: '', city: '' }
      },
      // 教育信息页
      addEdu: false,
      value1: [],
      value2: [],
      eduDegreeData: [['大专', '本科', '硕士', '博士']],
      majorOrderData: [['前5%', '前10%', '前20%', '前50%']],
      rank: '',
      school: '',
      major: '',
      start_date: '',
      end_date: '',
      eduItemIndex: '',
      hasStart: false,
      hasEnd: false,
      show2: false,
      // 语言等级页
      lanIndex: -1,
      list: languageData,
      addLan: false,
      value3: [],
      // 证书页
      addCertificate: false,
      certificate: '',
      certificateIndex: '',
      // 技能页
      addSkill: false,
      skillType: '',
      skillLevel: '',
      skillIndex: '',
      value4: [],
      skillData: [['一般', '良好', '熟练', '精通']],
      // 其他信息页
      value5: [],
      sourceData: [['老师/辅导员推荐', '社团/学生会推荐', '论坛帖', '微信群、QQ群里的聊天信息', '电子邮箱推荐', '短信推荐', '院系公众号推送消息', '其他']]
    }
  },
  watch: {
    male(val, oldVal) {
      if (val) {
        this.female = false
      }
    },
    female(val) {
      if (val) {
        this.male = false
      }
    }
  },
  methods: {
    formatDegree(degreeIndex) {
      var deg
      var degree = degreeIndex
      if (degree === 2) {
        deg = '大专'
      } else if (degree === 3) {
        deg = '本科'
      } else if (degree === 4) {
        deg = '硕士'
      } else if (degree === 6) {
        deg = '博士'
      } else if (degree === 7) {
        deg = '其他'
      } else {
        deg = ''
      }
      return deg
    },
    formatRank(rankIndex) {
      var rank
      var ranks = rankIndex
      if (ranks === 0) {
        rank = '前5%'
      } else if (ranks === 1) {
        rank = '前10%'
      } else if (ranks === 2) {
        rank = '前20%'
      } else if (ranks === 3) {
        rank = '前50%'
      } else if (ranks === 4) {
        rank = '其他'
      } else {
        rank = ''
      }
      return rank
    },
    editorBasic() {
      this.showPage = 'basic'
      if (this.resumeData.basic.city) {
        this.tempCity = this.resumeData.basic.city.split('-')
      }
      if (this.resumeData.basic.currentCity) {
        this.tempCurrentCity = this.resumeData.basic.currentCity.split('-')
      }
    },
    birthdayChange(val) {
      val ? this.hasBirthday = true : this.hasBirthday = false
    },
    saveBasic() {
      if (this.tempCity.length > 0) {
        this.resumeData.basic.city = this.tempCity.join('-')
      }
      if (this.tempCurrentCity.length > 0) {
        this.resumeData.basic.currentCity = this.tempCurrentCity.join('-')
      }
      if (this.male) {
        this.resumeData.basic.gender = '男'
      }
      if (this.female) {
        this.resumeData.basic.gender = '女'
      }
      if (this.resumeData.basic.name && this.resumeData.basic.mobile && this.resumeData.basic.email && this.resumeData.basic.currentCity) {
        var phonePattern = /^1[34578]\d{9}$/
        if (!phonePattern.test(this.resumeData.basic.mobile)) {
          this.$vux.toast.text('手机号格式错误')
          return
        }
        var emailPattern = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
        if (!emailPattern.test(this.resumeData.basic.email)) {
          this.$vux.toast.text('邮箱格式错误')
          return
        }
        this.resumeData.basic.birthday = this.birthday
        this.showPage = 'resume'
      } else {
        this.$vux.toast.text('请填写必填项')
      }
    },
    leave() {
      this.showPage = 'resume'
    },
    // 教育信息页
    editorEdu(item, index) {
      this.showPage = 'education'
      if (!item.school) {
        this.addEdu = true
        this.hasStart = false
        this.hasEnd = false
      } else {
        this.addEdu = false
        this.hasStart = true
        this.hasEnd = true
      }
      this.eduItemIndex = index
      var deg
      var degree = item.degree
      switch (degree) {
        case 2:
          deg = ['大专']
          break
        case 3:
          deg = ['本科']
          break
        case 4:
          deg = ['硕士']
          break
        case 6:
          deg = ['博士']
          break
        case 7:
          deg = ['其他']
          break
        default:
          deg = []
      }
      var rank
      var ranks = item.rank
      switch (ranks) {
        case 0:
          rank = ['前5%']
          break
        case 1:
          rank = ['前10%']
          break
        case 2:
          rank = ['前20%']
          break
        case 3:
          rank = ['前50%']
          break
        case 4:
          rank = ['其他']
          break
        default:
          rank = []
      }
      this.value1 = deg
      this.value2 = rank
      this.major = item.major
      this.school = item.school
      this.start_date = item.start_date
      this.end_date = item.end_date
    },
    startChange(val) {
      val ? this.hasStart = true : this.hasStart = false
    },
    endChange(val) {
      val ? this.hasEnd = true : this.hasEnd = false
    },
    saveEdu() {
      if (this.school && this.value1 && this.major && this.start_date && this.end_date) {
        this.showPage = 'resume'
        var deg
        var degree = this.value1.join('')
        switch (degree) {
          case '大专':
            deg = 2
            break
          case '本科':
            deg = 3
            break
          case '硕士':
            deg = 4
            break
          case '博士':
            deg = 6
            break
          case '其他':
            deg = 7
            break
          default:
            deg = 7
        }
        var rank
        var ranks = this.value2.join('')
        switch (ranks) {
          case '前5%':
            rank = 0
            break
          case '前10%':
            rank = 1
            break
          case '前20%':
            rank = 2
            break
          case '前50%':
            rank = 3
            break
          case '其他':
            rank = 4
            break
          default:
            rank = 4
        }
        if (this.addEdu) {
          const tempObj = {}
          tempObj.school = this.school
          tempObj.major = this.major
          tempObj.start_date = this.start_date
          tempObj.end_date = this.end_date
          tempObj.rank = rank
          tempObj.degree = deg
          if (this.resumeData.education == null) {
            this.resumeData.education = []
          }
          this.resumeData.education.push(tempObj)
        } else {
          this.resumeData.education[this.eduItemIndex].school = this.school
          this.resumeData.education[this.eduItemIndex].major = this.major
          this.resumeData.education[this.eduItemIndex].start_date = this.start_date
          this.resumeData.education[this.eduItemIndex].end_date = this.end_date
          this.resumeData.education[this.eduItemIndex].rank = rank
          this.resumeData.education[this.eduItemIndex].degree = deg
        }
        this.value1 = []
        this.value2 = []
      } else {
        this.$vux.toast.text('请填写必填项')
      }
    },
    deleteEdu() {
      if (!this.addEdu) {
        this.resumeData.education.splice(this.eduItemIndex, 1)
      }
      this.showPage = 'resume'
    },
    // 实习经历页
    editorWork() {
      this.showPage = 'work'
      this.anchor = this.$el.querySelector('#resumeWork').offsetTop
    },
    saveWork() {
      if (this.resumeData.work) {
        this.showPage = 'resume'
        goAnchor(this.anchor)
      } else {
        this.$vux.toast.text('请填写实习经历')
      }
    },
    leaveWork() {
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },

    // 项目经验页
    editorPractice() {
      this.showPage = 'practices'
      this.anchor = this.$el.querySelector('#resumePractices').offsetTop
    },
    savePractice() {
      if (this.resumeData.practices) {
        this.showPage = 'resume'
        goAnchor(this.anchor)
      } else {
        // 给出提示
        this.$vux.toast.text('请填写项目经验')
      }
    },
    leavePractices() {
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },

    // 社团经历页
    editorClub() {
      this.showPage = 'club'
      this.anchor = this.$el.querySelector('#resumeClub').offsetTop
    },
    saveClub() {
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },
    leaveClub() {
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },

    // 获奖荣誉页
    editorReward() {
      this.showPage = 'reward'
      this.anchor = this.$el.querySelector('#resumeReward').offsetTop
    },
    saveReward() {
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },
    leaveReward() {
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },

    // 实验室
    editorLab() {
      this.showPage = 'laboratory'
      this.anchor = this.$el.querySelector('#resumeLab').offsetTop
    },
    saveLab() {
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },
    leaveLab() {
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },

    // 语言等级页
    editorLanguage(item, index) {
      this.showPage = 'language'
      this.anchor = this.$el.querySelector('#resumeLanguage').offsetTop
      if (item.level) {
        this.addLan = false
        if (item.type === '英语') {
          this.value3.push(item.type)
          this.value3.push(item.level + ':' + item.score)
        } else {
          this.value3.push(item.type)
          this.value3.push(item.level)
        }
      } else {
        this.addLan = true
        this.value3 = []
      }
      this.lanIndex = index
    },
    saveLanguage() {
      if (this.value3.length > 0) {
        const type = this.value3[0]
        const level = this.value3[1].split(':')[0]
        const score = this.value3[1].split(':')[1]
        if (this.addLan) {
          const tempObj = {}
          tempObj.type = type
          tempObj.level = level
          tempObj.score = score
          if (this.resumeData.language == null) {
            this.resumeData.language = []
          }
          this.resumeData.language.push(tempObj)
        } else {
          this.resumeData.language[this.lanIndex].type = type
          this.resumeData.language[this.lanIndex].level = level
          this.resumeData.language[this.lanIndex].score = score
        }
        this.value3 = []
        this.showPage = 'resume'
        goAnchor(this.anchor)
      } else {
        // 给出提示
        this.$vux.toast.text('请选择语言等级')
      }
    },
    deleteLanguage() {
      if (!this.addLan) {
        this.value3 = []
        this.resumeData.language.splice(this.lanIndex, 1)
      }
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },
    leaveLanguage() {
      this.value3 = []
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },

    // 证书页
    editorCertificate(item, index) {
      this.showPage = 'certificate'
      this.certificateIndex = index
      this.anchor = this.$el.querySelector('#resumeCertificate').offsetTop
      if (typeof item === 'string') {
        this.addCertificate = false
        this.certificate = item
      } else {
        this.addCertificate = true
        this.certificate = ''
      }
    },
    saveCertificate() {
      if (this.certificate) {
        if (this.addCertificate) {
          if (this.resumeData.certificate == null) {
            this.resumeData.certificate = []
          }
          this.resumeData.certificate.push(this.certificate)
        } else {
          this.resumeData.certificate[this.certificateIndex] = this.certificate
        }
      }
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },
    deleteCertificate() {
      if (!this.addCertificate) {
        this.resumeData.certificate.splice(this.certificateIndex, 1)
        if (this.resumeData.certificate.length === 0) {
          this.resumeData.certificate = null
        }
      }
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },
    leaveCertificate() {
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },
    // 技能页
    editorSkill(item, index) {
      this.showPage = 'skill'
      this.skillIndex = index
      this.anchor = this.$el.querySelector('#resumeSkill').offsetTop
      if (item.level) {
        this.addSkill = false
        this.skillType = item.type
        this.value4[0] = item.level
      } else {
        this.addSkill = true
        this.skillType = ''
        this.value4 = []
      }
    },
    saveSkill() {
      if (this.skillType && this.value4.length > 0) {
        if (this.addSkill) {
          const tempObj = {}
          tempObj.type = this.skillType
          tempObj.level = this.value4[0]
          if (this.resumeData.skill == null) {
            this.resumeData.skill = []
          }
          this.resumeData.skill.push(tempObj)
        } else {
          this.resumeData.skill[this.skillIndex].type = this.skillType
          this.resumeData.skill[this.skillIndex].level = this.value4[0]
        }
      }
      this.value4 = []
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },
    deleteSkill() {
      if (!this.addSkill) {
        this.resumeData.skill.splice(this.skillIndex, 1)
        if (this.resumeData.skill.length === 0) {
          this.resumeData.skill = null
        }
      }
      this.value4 = []
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },
    leaveSkill() {
      this.value4 = []
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },

    // 其他信息页
    editorOther() {
      this.anchor = this.$el.querySelector('#resumeOther').offsetTop
      this.showPage = 'other'
      this.resumeData.other.source ? this.value5[0] = this.resumeData.other.source : this.value5 = []
      this.resumeData.other.city ? this.tempCity2 = this.resumeData.other.city.split('-') : this.tempCity2 = []
    },
    saveOther() {
      if (this.value5.length) {
        this.resumeData.other.source = this.value5[0]
      }
      if (this.tempCity2.length) {
        this.resumeData.other.city = this.tempCity2.join('-')
      }
      if (!this.resumeData.other.source) {
        // 给出提示
        this.$vux.toast.text('请选择信息来源')
        return
      }
      this.showPage = 'resume'
      goAnchor(this.anchor)
    },
    leaveOther() {
      if (this.value5.length) {
        this.resumeData.other.source = this.value5[0]
      }
      if (this.tempCity2.length) {
        this.resumeData.other.city = this.tempCity2[0]
      }
      this.showPage = 'resume'
      goAnchor(this.anchor)
    }
  }
}
function goAnchor(distance) {
  setTimeout(() => {
    document.body.scrollTop = distance
    document.documentElement.scrollTop = distance
    window.pageYOffset = distance
    window.pageYOffset = distance
  }, 15)
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
#mobile-neitui-resume .vux-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
}

.first-resume-item.resume-item {
  margin-top: 56px;
}

.completeBtn {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0!important;
}

.resume-detail-view {
  background-color: #fff;
}

.saveBtn-box {
  padding: 0 20px;
}

.textarea-counter {
  padding: 0 20px;
}

.resume-add-btn {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
}

.mint-cell-value {
  padding-left: 4px;
  font-size: 14px;
  color: #555 !important;
}

.saveBtn {
  width: 100%;
  height: 50px;
  margin-top: 30px;
  background-color: #049cff;
  font-size: 16px;
  border: none;
  color: #fff;
}

.delBtn {
  width: 100%;
  margin-top: 12px;
}

.resume-add-btn a {
  text-decoration: none;
  color: #464646;
}

.resume-add-btn span {
  font-size: 16px;
  color: #26a2ff;
}

.resume-item {
  margin: 10px 0;
  background-color: #fff;
  padding: 0 15px 4px;
}

.editor-btn {
  padding: 16px 0px 10px 10px;
  font-size: 15px;
  line-height: 15px;
  float: right;
  text-decoration: none;
  color: #049cff;
}

.color-red {
  color: red;
  font-size: 14px;
  font-weight: normal;
}

.pleaseEdit .color-red {
  padding: 8px 0;
}

#mobile-neitui-resume {
  margin-bottom: 51px;
  background-color: #f5f5f5;
}

.resume-item-title h2 {
  line-height: 17px;
  padding: 16px 0 10px;
  font-size: 17px;
  color: #464646;
}

.resume-item-content {
  position: relative;
  padding: 8px 0;
  line-height: 24px;
  font-size: 14px;
}

.resume-item-content h3 {
  color: #464646;
}

.resume-item-content h4 {
  margin: 6px 0;
  width: 67px;
  height: 24px;
  line-height: 24px;
  background-color: #ff9900;
  text-align: center;
  font-size: 13px;
  color: #fff;
}

.resume-item-content span {
  padding: 0 4px;
}

.resume-item-content p {
  line-height: 20px;
}

.edu-item {
  position: relative;
}

.textarea {
  width: 100%;
  height: 200px;
  padding: 0;
  border: none;
  outline: none;
  color: #555;
  font-size: 14px;
}

.arrow-right:after {
  position: absolute;
  top: 50%;
  right: 0;
  width: 5px;
  height: 5px;
  border: 2px solid #c8c8cd;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  transform: translateY(-50%) rotate(45deg);
}

.inline-block {
  display: inline-block;
}

.beforeNecessary .mint-cell-title:before {
  position: absolute;
  top: 14px;
  left: -8px;
  content: '*';
  color: #f23023;
}

.noBorderBottom .mint-cell-wrapper {
  border-bottom: none;
}

// 基本信息页
.gender_title {
  width: 105px;
}

.gender {
  display: inline-block;
  margin-left: -10px;
}

.gender>span {
  color: #b5b5b5;
}

.resume_pre {
  white-space: pre-wrap;
}

// 教育信息页
// 技能信息页 
.skill-title {
  padding-top: 16px;
  padding: 16px 15px 10px;
  line-height: 15px;
  font-size: 15px;
  color: #464646;
}

.skill-title span {
  padding-left: 5px;
  border-left: 4px solid #049cff;
}

.resume-basic .weui-cells {
  font-size: 16px;
}
</style>

