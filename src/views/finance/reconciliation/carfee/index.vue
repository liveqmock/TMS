<template>
  <div class="payment-manager tab-wrapper">
    <div class="eltab clearfix">
        <span @click="component = 'shortDepart'" class="tab-label" :class="{'active-tab': component.indexOf('shortDepart')!==-1}">短驳对账</span>
        <span @click="component = 'artery'" class="tab-label" :class="{'active-tab': component.indexOf('artery')!==-1}">干线对账</span>
        <span @click="component = 'deliver'" class="tab-label" :class="{'active-tab': component.indexOf('deliver')!==-1}">送货对账</span>
    </div>
    <keep-alive>
        <component v-bind:is="component"></component>
    </keep-alive>
  </div>

</template>

<script>
import artery from './artery'// 寄出
import shortDepart from './shortDepart'// 回收
import deliver from './deliver'// 发放
// import Flow from './flow'
export default {
  components: {
    artery,
    shortDepart,
    deliver
  },
  created() {
    this.component = this.$route.query.tabname || 'shortDepart'
  },
  data() {
    return {
      component: 'shortDepart'
    }
  },
  methods: {
  }

}
</script>
