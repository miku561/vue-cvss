<template>
  <div id="app">
    <CVSS :initCVSS="cvssData" :isEnv="true" :disabled="false" @getCVSSData="getgetCvssData" />
  </div>
</template>

<script>
import CVSS from './components/cvss.vue'

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
    getgetCvssData (cvssObject, score, level) {
      console.log(cvssObject, score, level)
    }
  }
}
</script>
