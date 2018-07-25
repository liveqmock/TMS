<template>
  <div class="customer-manager tab-wrapper tab-wrapper-100">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import batchShort from './batchShort' // 短驳费
import batchDeliver from './batchDeliver' // 送货费
import batchInsurance from './batchInsurance' // 整车保险费
import batchStationLoad from './batchStationLoad' // 发站装卸费
import batchStationOther from './batchStationOther' // 发站其他费
import batchArrivalLoad from './batchArrivalLoad' // 到站装卸费
import batchArrivalOther from './batchArrivalOther' // 到站其他费
import batchTruckAll from './batchTruckAll' // 到车汇总
import batchArrivalAll from './batchArrivalAll' // 发车汇总
import waybillKickback from './waybillKickback' // 回扣
import waybillTicket from './waybillTicket' // 单票提货费
import waybillOther from './waybillOther' // 其他费用支出
import waybillTransfer from './waybillTransfer' // 中转费
import waybillAbnormal from './waybillAbnormal' // 异常理赔
import waybillUnusual from './waybillUnusual' // 异动费用
export default {
  components: {
    batchShort,
    batchDeliver,
    batchInsurance,
    batchStationLoad,
    batchStationOther,
    batchArrivalLoad,
    batchArrivalOther,
    batchArrivalAll,
    batchTruckAll,
    waybillKickback,
    waybillTicket,
    waybillOther,
    waybillTransfer,
    waybillAbnormal,
    waybillUnusual
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // pageName: ''
    }
  },
  computed: {
    parentPage() {
      return this.$route.query.currentPage
    },
    component() {
      let parentPage = this.$route.query.currentPage
      switch (parentPage) {
        case 'batchShort':
          return 'batchShort'
        case 'batchDeliver':
          return 'batchDeliver'
        case 'batchInsurance':
          return 'batchInsurance'
        case 'batchStationLoad':
          return 'batchStationLoad'
        case 'batchStationOther':
          return 'batchStationOther'
        case 'batchArrivalLoad':
          return 'batchArrivalLoad'
        case 'batchArrivalOther':
          return 'batchArrivalOther'
        case 'batchArrivalAll':
          return 'batchArrivalAll'
        case 'batchTruckAll':
          return 'batchTruckAll'
        case 'waybillKickback':
          return 'waybillKickback'
        case 'waybillTicket':
          return 'waybillTicket'
        case 'waybillOther':
          return 'waybillOther'
        case 'waybillTransfer':
          return 'waybillTransfer'
        case 'waybillAbnormal':
          return 'waybillAbnormal'
        case 'waybillUnusual':
          return 'waybillUnusual'
      }
    },
    pageName() {
      let parentPage = this.$route.query.currentPage
      let name = ''
      switch (parentPage) {
        case 'batchShort':
          name = '短驳费结算'
          break
        case 'batchDeliver':
          name = '送货费结算'
          break
        case 'batchInsurance':
          name = '整车保险费结算'
          break
        case 'batchStationLoad':
          name = '发站装卸费'
          break
        case 'batchStationOther':
          name = '发站其他费'
          break
        case 'batchArrivalLoad':
          name = '到站装卸费'
          break
        case 'batchArrivalOther':
          name = '到站其他费'
          break
        case 'batchArrivalAll':
          name = '发车汇总'
          break
        case 'batchTruckAll':
          name = '到车汇总'
          break
        case 'waybillKickback':
          name = '回扣'
          break
        case 'waybillTicket':
          name = '单票提货费'
          break
        case 'waybillOther':
          name = '其他费用支出'
          break
        case 'waybillTransfer':
          name = '中转费'
          return
        case 'waybillAbnormal':
          name = '异常理赔'
          return
        case 'waybillUnusual':
          name = '异动费用'
          return
      }
      return name
    }
  },
  created() {
    // this.getParentPage()
  },
  methods: {
    getParentPage() {
      this.$route.matched.forEach(e => {
        let str = '/finance/accountsLoad'
        if (e.path.indexOf(str) !== -1) {
          e.meta.title = this.pageName
          e.name = this.pageName
          console.log(e.path)
        }
      })
    }
  }
}

</script>
