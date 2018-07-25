<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <el-form-item label="结算时间">
      <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="结算网点" prop="orgId">
      <SelectTree v-model="searchForm.orgId"></SelectTree>
    </el-form-item>
    <el-form-item label="结算类型" prop="settlementId">
      <selectType v-model="searchForm.settlementId" type="settlement_type" clearable>
        <el-option slot="head" label="全部" value=""></el-option>
      </selectType>
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
import SelectType from '@/components/selectType/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
export default {
  components: {
    SelectTree,
    querySelect,
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
        // agent: '',
        // alipayAccount: '',
        // amount: 0,
        // bankAccount: '',
        // bankAccountName: '',
        // bankName: '',
        // chequeNumber: '',
        // createBy: 0,
        // financialWay: '',
        // id: 0,
        orgId: '',
        // paymentsType: 0,
        // receivableNumber: '',
        // remark: '',
        // settlementBy: '',
        // settlementId: 0,
        // settlementSn: '',
        // settlementTime: '',
        // wechatAccount: ''
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
  watch: {
    orgid(newVal) {
      this.searchForm.orgId = newVal
    }
  },
  mounted() {
    this.searchForm.orgId = this.orgid
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      let searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      this.$emit('change', searchObj)
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.searchForm.orgId = this.orgid
        this.$refs[formName].resetFields()
      })
    }
  }
}

</script>
