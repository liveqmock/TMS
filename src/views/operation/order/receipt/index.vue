<template>
  <div class="receipt-manager tab-wrapper">
    <div class="eltab clearfix">
      <span @click="component = 'Recycle'" class="tab-label" :class="{'active-tab': component.indexOf('Recycle')!==-1}">回单回收</span>
      <span @click="component = 'Send'" class="tab-label" :class="{'active-tab': component.indexOf('Send')!==-1}">回单寄出</span>
      <span @click="component = 'Accept'" class="tab-label" :class="{'active-tab': component.indexOf('Accept')!==-1}">回单接收</span>
      <span @click="component = 'Grant'" class="tab-label" :class="{'active-tab': component.indexOf('Grant')!==-1}">回单发放</span>
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import Send from './send' // 寄出
import Recycle from './recycle' // 回收
import Grant from './grant' // 发放
import Accept from './accept' // 接收
// import Flow from './flow'
export default {
  components: {
    Send,
    Recycle,
    Grant,
    Accept
    // Flow

  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {

  },
  mounted() {
    this.setPage()
    // this.searchQuery.vo.orgid = this.otherinfo.orgid
    // this.fetchAllCustomer(this.otherinfo.orgid).then(res => {
    // this.loading = false
    // })
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'Recycle'
    }
  },
  methods: {
    setPage() {
      if (this.$route.query.tableKey) {
        let tableKey = this.$route.query.tableKey
        switch (tableKey) {
          case 'Recycle':
            this.component = 'Recycle'
            break
          case 'Send':
            this.component = 'Send'
            break
          case 'Accept':
            this.component = 'Accept'
            break
          case 'Grant':
            this.component = 'Grant'
            break
        }

      } else {
        this.component = 'Recycle'
      }
    }
  }

}

</script>
