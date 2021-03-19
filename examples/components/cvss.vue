<template>
  <div class="cvss-wrap">
    <div class="score-container">
      <div
        class="scoreRating"
        :class="cvssRating.toLowerCase()"
        v-if="cvssRating !== null && cvssScore !== null"
      >
        <span class="manufacturerScore">{{ cvssScore }}</span>
        <span class="ManufacturerSeverity">{{ cvssRating }}</span>
      </div>
    </div>
    <div class="calculation-container">
      <div class="container-wrap">
        <div class="list-item" v-for="(item, index) in baseData" :key="index">
          <div class="item-title" :title="item.title">{{ item.content }}</div>
          <div v-for="(child, number) in item.options" :key="number" class="label-wrap">
            <input
              :value="child.value"
              type="radio"
              :name="item.name"
              v-model="cvssData[item.name]"
              class="item-radio"
             :disabled="disabled"
            />
            <label :class="disabled?'no-select':''" :for="item.value" class="item-label" :title="child.title" @click="changeCvss(item.name, child.value)">{{ child.content }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="calculation-container" v-if="isEnv">
      <div class="container-wrap">
        <div class="list-item" v-for="(item, index) in environmentData" :key="index">
          <div class="item-title" :title="item.title">{{ item.content }}</div>
          <div v-for="(child, number) in item.options" :key="number" class="label-wrap">
            <input
              :value="child.value"
              type="radio"
              :name="item.name"
              v-model="cvssData[item.name]"
              class="item-radio"
              :disabled="disabled"
            />
            <label :class="disabled?'no-select':''" :for="item.value" class="item-label" :title="child.title" @click="changeCvss(item.name, child.value)">{{ child.content }}</label>
          </div>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
import cvss from './cvss-source/cvss.js'
import { cvssData, baseData, environmentData } from './config.js'
export default {
  props: {
    initCVSS: {
      type: Object,
      default: () => {}
    },
    isEnv: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cvssData,
      baseData,
      environmentData,
      cvssScore: 0,
      cvssRating: 'None'
    }
  },
  mounted () {
    if (this.initCVSS) {
      Object.assign(this.cvssData, this.initCVSS)
      this.getCvssScore()
      this.getCvssRating()
    }
  },
  methods: {
    // 获取分数
    getCvssScore () {
      let cvssStr = 'CVSS:3.0'
      for (const key in this.cvssData) {
        cvssStr += '/' + key + ':' + this.cvssData[key]
      }
      this.cvssScore = cvss.getScore(cvssStr, { env: this.isEnv })
      this.getCvssRating()
      this.$emit('getCVSSData', this.cvssData, this.cvssScore, this.cvssRating)
    },
    // 获取等级
    getCvssRating () {
      if (this.cvssScore) {
        const rating = cvss.getRating(this.cvssScore)
        if (rating === 'None') {
          this.cvssRating = 'Low'
        } else {
          this.cvssRating = rating
        }
      }
    },
    changeCvss (name, value) {
      if (this.disabled) {
        return
      }
      this.cvssData[name] = value
      if (this.checkNull(this.cvssData)) {
        this.getCvssScore()
        this.getCvssRating()
      }
    },
    // 判断选择是否完全
    checkNull () {
      for (const key in this.cvssData) {
        if (!this.cvssData[key]) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style scoped>
.cvss-wrap{
  margin: 0 auto;
  width: 100%;
  border: 1px solid #d6dee2;
  border-radius: 4px;
}
.cvss-wrap .score-container{
  border-bottom: 1px solid #d6dee2;
  text-align: right;
}
.cvss-wrap .score-container .scoreRating{
  display: inline-block;
  margin: 24px;
  padding: 3px 12px;
  border-radius: 4px;
  width: 100px;
  height: 56px;
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
  background: #a0b2be;
}
.cvss-wrap .score-container .scoreRating.none,
.cvss-wrap .score-container .scoreRating.low,
.cvss-wrap .score-container .scoreRating.medium,
.cvss-wrap .score-container .scoreRating.high,
.cvss-wrap .score-container .scoreRating.critical {
  color: #ffffff;
}
.cvss-wrap .score-container .scoreRating.low,
.cvss-wrap .score-container .scoreRating.none{
  background: #53aa33;
  border: 2px solid #53aa33;
}
.cvss-wrap .score-container .scoreRating.medium{
  background: #ffcb0d;
  border: 2px solid #ffcb0d;
}
.cvss-wrap .score-container .scoreRating.high{
  background: #f9a009;
  border: 2px solid #f9a009;
}
.cvss-wrap .score-container .scoreRating.critical{
  background: #cc0500;
  border: 2px solid #cc0500;
}
.cvss-wrap .score-container .manufacturerScore{
  display: block;
  margin-top: 4px;
  color: #ffffff;
  font-size: 22px;
  line-height: 26px;
  font-weight: normal;
}
.cvss-wrap .score-container .ManufacturerSeverity{
  display: block;
  margin-bottom: 5px;
  color: #ffffff;
  font-size: 16px;
}
.cvss-wrap .calculation-container{
  padding: 24px;
  border-bottom: 1px solid #d6dee2;
}
.cvss-wrap .calculation-container .container-wrap{
  display: flex;
  text-align: left;
  flex-wrap: wrap;
  justify-content: space-between;
}
.cvss-wrap .calculation-container .container-wrap .list-item{
  flex: 1;
  margin-bottom: 8px;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
}
.cvss-wrap .calculation-container .item-title {
  padding: 5px 0px 7px;
  font-size: 15px;
  line-height: 24px;
  font-weight: bold;
}
.cvss-wrap .calculation-container .item-label{
  display: inline-block;
  padding: 2px 10px;
  height: 22px;
  line-height: 22px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 4px;
  color: #666666;
  border: 1px solid #dfe4ea;
  user-select: nscoreFatingone;
  -webkit-user-select: none;
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  user-select: none;
  font-weight: normal;
  font-family: '微软雅黑';
  text-align: left;
  transition: all .3s;
}
.cvss-wrap .calculation-container .item-label.no-select:hover{
  cursor: not-allowed;
  background: #fff;
  color:#666666;
  border-color: #dfe4ea;
}
.cvss-wrap .calculation-container .label-wrap{
  display: inline-block;
  margin:0 8px 10px 0;
}
.cvss-wrap .calculation-container .item-label:hover,
.cvss-wrap .calculation-container .item-radio:checked + .item-label{
  border: 1px solid #1c639f;
  color: #fff;
  font-weight: normal;
  transition: all .3s;
  background: #1c639f;
}
.cvss-wrap .calculation-container .item-radio{
  display: none;
}
</style>
