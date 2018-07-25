<template>
  <el-form :inline="true" :size="btnsize" label-position="right"  :model="searchForm"  class="staff_searchinfo feeReceivableSearch clearfix">
    <div class="staff_searchinfo--input">
      <el-form-item label="开单时间:">
      <div class="block">
        <el-date-picker
          v-model="searchCreatTime"
          :default-value="defaultTime"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="开单网点:">
      <select-tree v-model="searchForm.shipFromOrgid" />
    </el-form-item>
    <el-form-item label="发货人:">
      <el-input
          v-model="searchForm.senderName"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="发货方:">
      <el-input
          v-model="searchForm.senderCompanyName"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="出发城市:">
      <el-input
          v-model="searchForm.shipFromCityCode"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="到达城市:">
      <el-input
          v-model="searchForm.shipToCityCode"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="运单号:">
      <el-input
          v-model="searchForm.shipSn"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="结算状态：">
      <select-type v-model="searchForm.status" type="count_status" >
      </select-type>
    </el-form-item>
    
    </div>
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { parseTime } from '@/utils/'

export default {
  name: 'handaccount-manage-search',
  components: {
    SelectTree,
    SelectType
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: Number
    }
  },
  data() {
    return {
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      searchForm: {
        shipFromOrgid: '',
        endTime: '',
        startTime: '',
        senderName: '',
        senderCompanyName: '',
        shipFromCityCode: '',
        shipToCityCode: '',
        shipSn: '',
        orgAllId: '',
        status: ''
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.shipFromOrgid = newVal
    }
  },
  mounted() {
    this.searchCreatTime = this.defaultTime
    this.searchForm.orgAllId = this.otherinfo.orgid
    // this.searchForm.status = 'NOSETTLEMENT'
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchCreatTime && this.searchCreatTime[0]) {
        searchObj.startTime = this.searchCreatTime[0] + ' 00:00:00'
        searchObj.endTime = this.searchCreatTime[1] + ' 23:59:59'
      }

      this.$emit('change', searchObj)
    },
    clearForm() {
      this.searchForm.senderName = ''
      this.searchForm.senderCompanyName = ''
      this.searchForm.shipFromCityCode = ''
      this.searchForm.shipToCityCode = ''
      this.searchForm.shipSn = ''

      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
      this.searchCreatTime = this.defaultTime
      this.searchForm.shipFromOrgid = ''
    }
  }
}
</script>
<style lang="scss">
.tab-wrapper .tab-content .feeReceivableSearch{
  display: flex;
  .staff_searchinfo--btn{
    width: 126px;
    
  }
  .staff_searchinfo--input{
    flex: 1;
    .el-form-item{
      margin-bottom: 10px;
    }
  }
}
</style>

