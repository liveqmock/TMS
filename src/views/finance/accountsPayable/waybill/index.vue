<template>
  <div class="handAccount-manager tab-wrapper">
    <div class="eltab clearfix">
      <span @click="component = 'Kickback'" class="tab-label" :class="{'active-tab': component.indexOf('Kickback')!==-1}">回扣</span>
      <span @click="component = 'Transfer'" class="tab-label" :class="{'active-tab': component.indexOf('Transfer')!==-1}">中转费</span>
      <span @click="component = 'Ticket'" class="tab-label" :class="{'active-tab': component.indexOf('Ticket')!==-1}">单票提货费</span>
      <span @click="component = 'Unusual'" class="tab-label" :class="{'active-tab': component.indexOf('Unusual')!==-1}">异动费用</span>
      <span @click="component = 'Abnormal'" class="tab-label" :class="{'active-tab': component.indexOf('Abnormal')!==-1}">异常理赔</span>
      <span @click="component = 'Other'" class="tab-label" :class="{'active-tab': component.indexOf('Other')!==-1}">其他费用支出</span>
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import Kickback from './kickback'
import Transfer from './transfer'
import Ticket from './ticket'
import Unusual from './unusual'
import Abnormal from './abnormal'
import Other from './other'

export default {
  components: {
    Kickback,
    Ticket,
    Unusual,
    Abnormal,
    Other,
    Transfer
  },
  props: {
  },
  data() {
    return {
      component: 'Kickback'
    }
  }
}
</script>

