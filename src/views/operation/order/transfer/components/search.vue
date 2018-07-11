<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm"  class="staff_searchinfo clearfix">
      <el-form-item label="中转时间:">
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime"
            type="daterange"
            align="right"
            :size="btnsize"
            value-format="yyyy-MM-dd hh:mm:ss"
            start-placeholder="开始日期"
            :picker-options="pickerOptions2"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="承运商:">
        <querySelect search="carrierName" type="carrier" valuekey="carrierId" show="select" v-model="searchForm.carrierId" :filterable="false" placeholder="请选择" />
      </el-form-item>
    <el-form-item v-if="!isbatch" label="出发城市:" class="searchinfo--order">
        <el-input
            v-model="searchForm.shipFromCityName"
            maxlength="15"
            @change="onSubmit"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item v-if="!isbatch" label="到达城市:" class="searchinfo--order">
        <el-input
            v-model="searchForm.shipToCityName"
            maxlength="15"
            @change="onSubmit"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item v-if="!isbatch" label="开单时间:">
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime2"
            type="daterange"
            align="right"
            :size="btnsize"
            value-format="yyyy-MM-dd hh:mm:ss"
            start-placeholder="开始日期"
            :picker-options="pickerOptions2"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item class="staff_searchinfo--btn">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
      
  </el-form>
</template>

<script>
import { REGEX }  from '@/utils/validate'
import { pickerOptions2, parseTime } from '@/utils/'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'

export default {
  name: 'order-manage-search',
  components: {
    SelectTree,
    querySelect
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: Number
    },
    isbatch: {
      type: Boolean,
      dafault: false
    }
  },
  data () {
    let _this = this

    return {
      searchCreatTime: [],
      searchCreatTime2: [],
      defaultTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      searchForm: {
        orgid: '',
        shipFromCityName: '',
        carrierId: '',
        shipToCityName: ''
      },
      rules: {
        mobile: [{
          //validator: validateFormMobile, trigger: 'blur'
         // validator: validateFormNumber, trigger: 'change'
        }]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgid(newVal){
      this.searchForm.orgid = newVal
    }
  },
  mounted () {
    this.searchForm.orgid = this.orgid
    this.searchCreatTime = this.defaultTime
    this.onSubmit()
  },
  methods: {
    onSubmit () {
      let searchObj = {}

      searchObj.orgId = this.searchForm.orgid
      if(!this.isbatch){
        searchObj.shipFromCityName = this.searchForm.shipFromCityName
        searchObj.shipToCityName = this.searchForm.shipToCityName
      }
      
      if(this.searchCreatTime) {
        searchObj.transferTimeStart = this.searchCreatTime[0]
        searchObj.transferTimeEnd = this.searchCreatTime[1]
      }
      if(this.searchCreatTime2 && !this.isbatch){
        searchObj.ydCreateTimeStart = this.searchCreatTime2[0] || ''
        searchObj.ydCreateTimeEnd = this.searchCreatTime2[1] || ''
      }
      searchObj.carrierId = this.searchForm.carrierId

      this.$emit('change', searchObj)
    },
    clearForm () {
      this.searchForm.orgid = this.orgid
      this.searchForm.shipFromCityName = ''
      this.searchForm.shipToCityName = ''
      this.searchForm.carrierId = ''
      this.searchCreatTime = []
      this.searchCreatTime2 = []
    }
  }
}
</script>