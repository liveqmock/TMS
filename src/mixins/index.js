import Vue from 'vue'
import { mapGetters } from 'vuex'
import { eventBus } from '@/eventBus'

Vue.mixin({
  data() {
    return {
    }
  },

  computed: {
    // 用户信息
    ...mapGetters([
      'otherinfo'
    ]),
    // 全局的事件分发器
    eventBus() {
      return eventBus
    }
  }/* ,

  methods: {
    ...mapActions([
      '$getUserInfo',
      '$setMenuList'
    ])
  } */
})
