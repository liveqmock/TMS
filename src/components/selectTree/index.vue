<template>
  <el-select ref="myautocomplete" :disabled="disabled" v-model="aid" class="select-tree" @change="change">
        <el-option
        v-for="item in openGroups"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        <div :class="'indent indent'+item.index">{{ item.name }}</div>
        </el-option>
    </el-select>
</template>
<script>
// 引入事件对象
import { eventBus } from '@/eventBus'
  import { getAllOrgInfo  } from '@/api/company/employeeManage'
  import { mapGetters } from 'vuex'
/**
 * 将多层级树结构展开未扁平数组，并对每个元素添加层级值index
 */
function expandGroups (data, i) {
  let res = []
  data.map(el => {
    el.index = i
    res.push(el)
    if(el.children){
      res = res.concat(expandGroups(el.children, i+1))
    }
  })
  return res
}

export default {
  props: {
    value: {
      type: [Number, String]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (newVal) {
      this.aid = newVal
      this.init()
    }
  },
  mounted () {
    this.aid = this.value
    this.init()
    eventBus.$on('closepopbox', () => {
      console.log('closepopbox selectTree:')
      this.$refs.myautocomplete.handleClose()
    })
  },
  computed: {
    ...mapGetters([
          'otherinfo'
      ]),
    openGroups () {
      // 用来标记是第几层
      let index = 1
      let res
      res = expandGroups(this.groups, index)
      return res
    }
  },
  data () {
    return {
      groups: [],
      aid: ''
    }
  },
  methods: {
    init () {
      if(!this.inited){
        this.inited = true
        getAllOrgInfo(this.otherinfo.companyId).then(data => {
          this.groups = data
        }).catch(err => {
          this.inited = false
        })
      }
    },
    change (val) {
      this.$emit('change', val)
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
  .indent{
    border-left: 1px dashed #aaa;
    padding-left: 5px;
    border-bottom: 1px dashed #aaa;
    line-height: 33px;
    height: 33px;
  }
  .indent1{

  }
  .indent2{
    margin-left: 1em;
  }
  .indent3{
    margin-left: 2em;
  }
  .indent4{
    margin-left: 3em;
  }
  .indent5{
    margin-left: 4em;
  }

</style>
