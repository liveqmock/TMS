<template>
  <div class="order-manager tab-wrapper">
    <div class="eltab clearfix">
      <span @click="component = 'transfered'" class="tab-label" :class="{'active-tab': component.indexOf('transfered')!==-1}">已中转运单</span>
      <span @click="component = 'batch'" class="tab-label" :class="{'active-tab': component.indexOf('batch')!==-1}">中转批次</span>
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import transfered from './transfered'
import batch from './batch'

export default {
  components: {
    transfered,
    batch
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'transfered'
    }
  }
}
</script>

