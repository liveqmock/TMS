<template>
  <div class="accountsReceivable-manager tab-wrapper">
    <div class="eltab clearfix">
      <span @click="component = 'All'" class="tab-label" :class="{'active-tab': component.indexOf('All')!==-1}">全部</span>
      <span @click="component = 'Cash'" class="tab-label" :class="{'active-tab': component.indexOf('Cash')!==-1}">现付</span>
      <span @click="component = 'Arrive'" class="tab-label" :class="{'active-tab': component.indexOf('Arrive')!==-1}">到付</span>
      <span @click="component = 'Receipt'" class="tab-label" :class="{'active-tab': component.indexOf('Receipt')!==-1}">回单付</span>
      <span @click="component = 'Month'" class="tab-label" :class="{'active-tab': component.indexOf('Month')!==-1}">月结</span>
      <span @click="component = 'Abnormal'" class="tab-label" :class="{'active-tab': component.indexOf('Abnormal')!==-1}">异动费用</span>
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import All from './all'
import Cash from './cash'
import Arrive from './arrive'
import Receipt from './receipt'
import Month from './month'
import Abnormal from './abnormal'

export default {
  components: {
    All,
    Cash,
    Arrive,
    Receipt,
    Month,
    Abnormal
  },
  props: {
  },
  data() {
    return {
      component: 'All'
    }
  }
}
</script>

