<template>
  <div class="customer-manager tab-wrapper tab-wrapper-100">
    <keep-alive>
    <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import BatchShort from './batchShort'
import BatchDeliver from './batchDeliver'

export default {
  components: {
    BatchShort,
    BatchDeliver
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    	// pageName: ''
    }
  },
  computed: {
    parentPage() {
      return this.$route.query.currentPage
    },
    component() {
      let parentPage = this.$route.query.currentPage
      switch (parentPage) {
        case 'batchShort':
          return 'BatchShort'
        case 'batchDeliver':
          return 'BatchDeliver'
      }
    },
    pageName() {
      let parentPage = this.$route.query.currentPage
      let name = ''
      switch (parentPage) {
        case 'batchShort':
          name = '短驳费结算'
          break
        case 'batchDeliver':
          name = '送货费结算'
          break
      }
      return name
    }
  },
  created() {
    // this.getParentPage()
  },
  methods: {
    getParentPage() {
      this.$route.matched.forEach(e => {
      	let str = '/finance/accountsLoad'
        if (e.path.indexOf(str) !== -1) {
          e.meta.title = this.pageName
          e.name = this.pageName
          console.log(e.path)
        }
      })
    }
  }
}

</script>
