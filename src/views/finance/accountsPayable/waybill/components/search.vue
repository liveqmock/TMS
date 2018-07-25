<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <el-form-item label="开单时间">
      <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="开单网点" prop="shipFromOrgid">
      <SelectTree v-model="searchForm.shipFromOrgid" clearable>
      </SelectTree>
    </el-form-item>
    <el-form-item label="结算状态" prop="status">
      <el-select size="small" v-model="searchForm.status" placeholder="结算状态">
       <el-option v-for="(value, key) in $const.COUNT_STATUS" :value="key" :key="key" :label="value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="运单号" prop="shipSn">
      <querySelect v-model="searchForm.shipSn" search="shipSn" type="order" valuekey="shipSn" clearable></querySelect>
    </el-form-item>
    <el-form-item label="发货方" prop="customerName">
      <querySelect v-model="searchForm.customerNames" valuekey="customerName" search="customerName" type="sender" label="customerName" :remote="true" />
    </el-form-item>
    <el-form-item label="收货人" prop="customerName">
      <querySelect search="customerMobile" v-model="searchForm.customerName" type="receiver" label="customerName" valuekey="customerName" clearable>
        <template slot-scope="{item}">
          {{ item.customerName }} : {{ item.customerMobile }}
        </template>
      </querySelect>
    </el-form-item>
    <el-form-item label="出发城市">
      <querySelect v-model="searchForm.shipFromCityName" search="name" valuekey="longAddr" type="city" label="longAddr" :remote="true" />
    </el-form-item>
    <el-form-item label="到达城市">
      <querySelect v-model="searchForm.shipToCityName" search="name" valuekey="longAddr" type="city" label="longAddr" :remote="true" />
    </el-form-item>
    
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm('searchForm')" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { REGEX } from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
export default {
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
    }
  },
  data() {
    const orgidIdentifier = (rule, value, callback) => {
      const reg = REGEX.ONLY_NUMBER
      if (value === '' || value === null || !value || value === undefined) {
        callback()
      } else if (!(reg.test(value))) {
        callback(new Error('请输入最多15位数字'))
      } else {
        callback()
      }
    }
    return {
      searchForm: {
        shipFromOrgid: '',
        // feeType: 8, // 8-应付回扣 10-实际提货费 13-其他费用支出
        // endTime: '',
        // id: 0,
        // incomePayType: 'PAYABLE',
        // incomePayTypeValue: '',
        // orgAllId: '',
        // senderCompanyName: '',
        // senderName: '',
        // shipFromCityCode: '',
        // shipLoadId: 0,
        // shipLoadIdType: 0,
        // shipSn: '',
        // shipToCityCode: '',
        // startTime: '',
        status: ''
        // totalFee: 0,
        // totalStatus: '',
        // totalStatusValue: ''
      },
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      defaultTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickerOptions: {
        shortcuts: pickerOptions2
      }
    }
  },
  mounted() {
    this.searchForm.shipFromOrgid = this.orgid
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      this.$emit('change', searchObj)
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
        this.searchForm.shipFromOrgid = this.orgid
      })
    }
  }
}

</script>
