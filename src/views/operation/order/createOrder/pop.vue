<template>
  <div class="pop-win">
    <div class="login-info">登录网点：【{{ userinfo.orgName }}】</div>
    <div class="pop-createOrder">
      <Main />
    </div>
  </div>
</template>
<script>
import { getUserInfo } from "../../../../utils/auth";
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
    this.userinfo = getUserInfo()
  }
}
</script>
