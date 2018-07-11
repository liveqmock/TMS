<template>
  <div class="showdepart-manager tab-wrapper" :key="key">
    <div class="eltab clearfix">
      <!-- 短驳管理 -->
      <span @click="component = 'deliver'" class="tab-label" :class="{'active-tab': component.indexOf('deliver')!==-1}">短驳发车</span>
      <span @click="component = 'arrival'" class="tab-label" :class="{'active-tab': component.indexOf('arrival')!==-1}">短驳到货</span>
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import arrival from './arrival'
import deliver from './deliver'
export default {
  components: {
    deliver,
    arrival
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'deliver',
      key: 0
    }
  },
  activated() {
    this.setPage()
  },
  methods: {
    setPage() {
      if (this.$route.query.tableKey) {
        this.component = 'arrival'
      } else {
        this.component = 'deliver'
      }
    }
  }
}

</script>