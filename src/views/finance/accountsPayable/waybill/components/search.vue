<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <el-form-item label="开单时间">
      <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd hh:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="到达网点" prop="arriveOrgid">
      <SelectTree v-model="searchForm.arriveOrgid" clearable>
      </SelectTree>
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
import { objectMerge2 } from '@/utils/index'
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
      let reg = REGEX.ONLY_NUMBER
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
        // feeType: 8, // 8-应付回扣 10-实际提货费 13-其他费用支出
        // endTime: '',
        // id: 0,
        incomePayType: 'PAYABLE',
        // incomePayTypeValue: '',
        // orgAllId: '',
        // senderCompanyName: '',
        // senderName: '',
        // shipFromCityCode: '',
        // shipFromOrgid: 0,
        // shipLoadId: 0,
        // shipLoadIdType: 0,
        // shipSn: '',
        // shipToCityCode: '',
        // startTime: '',
        // status: '',
        // totalFee: 0,
        // totalStatus: '',
        // totalStatusValue: ''
      },
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [],
      defaultTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近两个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  methods: {
    onSubmit() {
      let searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'startTime', this.searchTime[0])
        this.$set(searchObj, 'endTime', this.searchTime[1])
      }
      this.$emit('change', searchObj)
      this.searchForm = Object.assign({}, this.$options.data().searchForm)
      this.clearForm('searchForm')
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
      })
    }
  }
}

</script>
