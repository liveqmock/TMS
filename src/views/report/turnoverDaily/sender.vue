<template>
  <div class="tab-content chartSender">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
      </div>
      <div class="info_tab">
        <iframe :src="chartIframe" id="senderIframe" ref="senderIframe" frameborder='0' scrolling=none name="showHere" class="chartIframe"
        style="background-color:transparent; position: absolute; z-index: -3000; width: 100%; height: calc(100% - 100px); top: 120px;left:0;"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import SearchForm from './components/search'
import { getToken } from '@/utils/auth'
export default {
  components: {
    SelectTree,
    querySelect,
    SearchForm
  },
  data() {
    return {
      chartIframe: '',
      query: {
        currentPage: 1,
        pageSize: 100
        // senderCustomerName: '',
        // shipFromOrgid: '',
        // createTimeStart: '',
        // createTimeEnd: ''
      },
      btnsize: 'mini'
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  methods: {
    doAction(type) {},
    getSearchParam(obj) {
      this.query = Object.assign(this.query, obj)
      let access_token = getToken()
      this.$set(this.query, 'access_token', access_token)
      let str = '?'
      for (let item in this.query){
        str += item +'=' + String(this.query[item]).trim()+ '&'
      }

      let path = window.location.protocol + '//' + window.location.host + '/static/supcan/turnoverDaily.html'+ str + '&'+Math.random()
        this.chartIframe = encodeURI(path)
      // this.chartIframe = encodeURI(path)

    },
    setTable() {}
  }
}

</script>
<style lang="scss">
.tab-content.chartSender {
  width: 100%;
  height: calc(100%);
  .chartIframe {
    position:relative;
    z-index:1;
    width: 100%;
    height: 100%;
    box-shadow: 1px 1px 10px #ddd;
  }
}

</style>
