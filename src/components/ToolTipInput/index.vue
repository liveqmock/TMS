<template>
  <el-tooltip effect="dark" placement="top" :enterable="false" :manual="true" :value="show" tabindex="-1">
    <div slot="content">{{ tip }}</div>
    <el-input v-numberOnly v-model.trim="form.shipNo.companyNumberAutoIncrementByTwoYMValue" auto-complete="off" @focus="show = true" placeholder="如：0001" @blur="show = false"></el-input>
  </el-tooltip>
</template>
<script>
export default {
  props: {
    tip: {
      type: String,
      default: '提示内容'
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
