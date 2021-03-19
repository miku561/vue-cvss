## Install
`npm install vue-cvss`

## Import
`import CVSS from 'vue-cvss'`

## Use
`<CVSS :initCVSS="cvssData" :isEnv="true" :disabled="false" @getgetCvss="getCvssData" />`

## Attributes & Methods 
|keyword|type|description|
|---|---| --- |
|initCVSS|attr| This is a json object that you can use to initialize your calculator. |
|isEnv|attr|This keyword controls whether environmental factors are added.|
|disabled|attr|Disallow users from manipulating CVSS.|
|getCvss| method|This is a method through which you can obtain CVSS calculations, including ( CVSS objects, scores, and grades). It's triggered after each calculation.|

## 属性和方法 
|关键词|类型|描述|
|---|---| --- |
|initCVSS|属性| 初始化CVSS插件的数据，它应该是一个对象。基本因素均为空，环境因素默认为X |
|isEnv|属性|是否使用环境因素|
|disabled|属性|是否允许用户操作CVSS计算|
|getCvss| 方法 |获取CVSS计算信息，返回三个参数（CVSS配置对象，分数，等级）|

## Example
```
<template>
  <div id="app">
    <CVSS :initCVSS="cvssData" :isEnv="true" :disabled="false" @getCVSSData="getCvssData" />
  </div>
</template>

<script>
import CVSS from 'vue-cvss'

export default {
  components: {
    CVSS
  },
  data () {
    return {
      cvssData: {
        AV: 'N',
        S: 'C',
        AC: 'H',
        C: 'H',
        PR: 'H',
        I: 'L',
        UI: 'R',
        A: 'N',
        CR: 'X',
        IR: 'X',
        AR: 'X',
        MAV: 'X',
        MAC: 'X',
        MPR: 'X',
        MUI: 'X',
        MS: 'X',
        MC: 'X',
        MI: 'X',
        MA: 'X'
      }
    }
  },
  methods: {
    getCvssData (cvssObject, score, level) {
      console.log(cvssObject, score, level)
    }
  }
}
</script>
```
## Notice 
> Currently only supports Chinese