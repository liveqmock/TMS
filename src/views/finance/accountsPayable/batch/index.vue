<template>
  <div class="handAccount-manager tab-wrapper">
    <div class="eltab clearfix">
      <span @click="component = 'Short'" class="tab-label" :class="{'active-tab': component.indexOf('Short')!==-1}">短驳费</span>

      <span @click="component = 'Deliver'" class="tab-label" :class="{'active-tab': component.indexOf('Deliver')!==-1}">送货费</span>

      <span @click="component = 'TruckAll'" class="tab-label" :class="{'active-tab': component.indexOf('TruckAll')!==-1}">发车汇总</span>

      <span @click="component = 'ArrivalAll'" class="tab-label" :class="{'active-tab': component.indexOf('ArrivalAll')!==-1}">到车汇总</span>

      <span @click="component = 'Insurance'" class="tab-label" :class="{'active-tab': component.indexOf('Insurance')!==-1}">整车保险费</span>

      <span @click="component = 'StationLoad'" class="tab-label" :class="{'active-tab': component.indexOf('StationLoad')!==-1}">发站装卸费</span>
      <span @click="component = 'StationOther'" class="tab-label" :class="{'active-tab': component.indexOf('StationOther')!==-1}">发站其他费</span>
      <span @click="component = 'ArriveLoad'" class="tab-label" :class="{'active-tab': component.indexOf('ArriveLoad')!==-1}">到站装卸费</span>
      <span @click="component = 'ArriveOther'" class="tab-label" :class="{'active-tab': component.indexOf('ArriveOther')!==-1}">到站其他费</span>
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import Short from './short'
// import Artery from './artery'
import Deliver from './deliver'
import Insurance from './insurance'
import StationLoad from './stationLoad'
import StationOther from './stationOther'
import ArriveLoad from './arriveLoad'
import ArriveOther from './arriveOther'
import TruckAll from './truckAll'
import ArrivalAll from './arrivalAll'

export default {
  components: {
    Short,
    // Artery,
    Deliver,
    Insurance,
    StationLoad,
    StationOther,
    ArriveLoad,
    ArriveOther,
    TruckAll,
    ArrivalAll
  },
  props: {
  },
  mounted() {
    this.initPage()
  },
  data() {
    return {
      component: 'Short'
    }
  },
  methods: {
    initPage() {
      if (this.$route.query.name) {
        // console.log(this.$route.query.name)
        const name = this.$route.query.name  // 接收子父组件路由传过来的值
        switch (name) {
          case 'Short':
            this.component = 'Short'
            break
          case 'Deliver':
            this.component = 'Deliver'
            break
          case 'TruckAll':
            this.component = 'TruckAll'
            break
          case 'ArrivalAll':
            this.component = 'ArrivalAll'
            break
          case 'Insurance':
            this.component = 'Insurance'
            break
          case 'StationLoad':
            this.component = 'StationLoad'
            break
          case 'StationOther':
            this.component = 'StationOther'
            break
          case 'ArriveLoad':
            this.component = 'ArriveLoad'
            break
          case 'ArriveOther':
            this.component = 'ArriveOther'
            break
        }
      }
    }
  }
}
</script>

