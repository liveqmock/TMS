<template>
  <div class="handAccount-manager tab-wrapper tab-wrapper-100">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import Total from './total'
import Detail from './detail'

export default {
  components: {
    Total,
    Detail
  },
  props: {
  },
  data() {
    return {
      component: 'Total'
    }
  }
}
</script>

