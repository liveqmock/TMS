<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <el-form-item label="开单时间">
      <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="开单网点" prop="orgId">
      <SelectTree v-model="searchForm.orgId" clearable>
      </SelectTree>
    </el-form-item>
    <el-form-item label="发货人" prop="senderCustomerName">
      <querySelect search="customerMobile" v-model="searchForm.customerName" type="receiver" label="customerName" valuekey="customerName" clearable>
        <template slot-scope="{item}">
          {{ item.customerName }} : {{ item.customerMobile }}
        </template>
      </querySelect>
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
        orgId: ''
        // currentPage: 1,
        // pageSize: 100,
        // senderCustomerName: '',
        // createTimeStart: '',
        // createTimeEnd: ''
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
    this.searchForm.orgId = this.orgid
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        // this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} '))
        this.$set(searchObj, 'startTime', this.searchTime[0])
        this.$set(searchObj, 'endTime', this.searchTime[1])
        // this.$set(searchObj, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        // this.$set(searchObj, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
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
