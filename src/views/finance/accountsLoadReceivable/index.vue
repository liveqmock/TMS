<template>
  <div class="customer-manager tab-wrapper tab-wrapper-100">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import all from './all' // 全部
import arrive from './arrive' // 到达付
import abnormal from './abnormal' // 异动
import cash from './cash' // 现付
import receipt from './receipt' // 回单付
import month from './month' // 月结

export default {
  components: {
    all,
    arrive,
    abnormal,
    cash,
    receipt,
    month
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
      return this.$route.query.currentPage
    },
    pageName() {
      const parentPage = this.$route.query.currentPage
      let name = ''
      switch (parentPage) {
        case 'all':
          name = '全部结算'
          break
        case 'month':
          name = '月结结算'
          break
        case 'abnormal':
          name = '异动费用结算'
          break
        case 'receipt':
          name = '回单付将诶算'
          break
        case 'cash':
          name = '现付结算'
          break
        case 'arrive':
          name = '到付结算'
          break
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
        const str = '/finance/accountsLoadReceivable'
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
