<template>
  <div class="createOrder-page">
    <Main />
  </div>
</template>
<script>
import Main from './main'

export default {
  components: {
    Main
  },
  data () {
    return {
      userinfo: {}  
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
.createOrder-page{
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 24px;
  z-index: 1;
  
}
</style>
