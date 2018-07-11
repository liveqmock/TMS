<template>
  <div class="sidebar-menu-search">
    <el-autocomplete
      class="inline-input"
      v-model="menukeyword"
      :fetch-suggestions="querySearch"
      placeholder="搜索菜单"
      :trigger-on-focus="false"
      @select="handleSelect"
      suffix-icon="el-icon-search"
      popper-class="sidebar-menu-pop"
    >
    </el-autocomplete>
  </div>
</template>
<script>
/**
 * 将多层级的路由展开
 */
function expandArray (arr) {
  var array = []
  arr.map( el => {
    if(el.children){
      array = array.concat(expandArray(el.children))
    } else {
      array.push(el)
    }
  })
  return array
}


export default {
  props: {
    searchItem: {
      type: Array,
      default: []
    },
    selectedKey: null
  },
  data () {
    return {
      menukeyword:'',
      menus: []
    }
  },
  methods: {
    querySearch (queryString, cb) {
      var menus = expandArray(this.searchItem).map( el => {
        el.value = el.name
        return el
      })
      console.log('query:', queryString, menus)
      var results = queryString ? menus.filter(el => {
        return el.name.indexOf(queryString) !== -1
      }) : menus
      cb(results)
    },
    handleSelect (item) {
      // 跳转到对应的页面
      this.$router.push(item.path)
    }
  }
}
</script>
<style lang="scss">
$height: 24px;

.sidebar-menu-search{
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 30px;

  padding-left: 3px;
  .el-input{
    width: 120px;
    font-size: 12px;

    input {
      height: $height;
      line-height: $height;
      border-radius: 4px;
      border: solid 1px rgba(255, 255, 255, 0.6);
      background: transparent;
      color: #fff;
    }
    .el-input__icon{
      line-height: $height;
    }
  }
}
.sidebar-menu-pop{
  left: 3px !important;

  .el-autocomplete-suggestion li, .el-autocomplete-suggestion__wrap{
    padding: 0;
  }
}
</style>
