<template>
  <div class="order-manager tab-wrapper">
    <div class="eltab clearfix">
      <span @click="component = 'All'" class="tab-label" :class="{'active-tab': component.indexOf('All')!==-1}">全部运单</span>
      <span @click="component = 'History'" class="tab-label" :class="{'active-tab': component.indexOf('History')!==-1}">改单记录</span>
      <span @click="component = 'Dashboard'" class="tab-label" :class="{'active-tab': component.indexOf('Dashboard')!==-1}">草稿箱</span>
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import All from './all'
import Dashboard from './dashboard'
import History from './history'

export default {
  components: {
    All,
    Dashboard,
    History
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'All'
    }
  }
}
</script>

