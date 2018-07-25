<template>
  <!-- 资金流水汇总 -->
  <div class="tab-wrapper tab-wrapper-100">
    <keep-alive v-bind:is="component"></keep-alive>
  </div>
</template>
<script>
import settleLog from './settleLog'
import settleLogDetail from './settleLogDetail'
export default {
  components: {
    settleLog,
    settleLogDetail
  },
  data() {
    return {
      component: 'settleLog'
    }
  },
  mounted() {
    this.setComponent()
  },
  methods: {
    setComponent() {
      if (this.$route.path.indexOf('settleLogDetail') !== -1) {
        this.component = 'settleLogDetail'
      } else {
        this.component = 'settleLog'
      }
    }
  }
}

</script>
