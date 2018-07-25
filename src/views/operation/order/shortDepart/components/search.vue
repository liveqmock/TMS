<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" class="staff_searchinfo clearfix">
    <el-form-item label="短驳时间">
      <!-- <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
      </el-date-picker> -->
      <el-date-picker
            v-model="searchTime"
            type="daterange"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            :picker-options="pickerOptions2"
            end-placeholder="结束日期">
          </el-date-picker>
    </el-form-item>
    </el-form-item>
    <el-form-item label="批次状态" prop="batchTypeId">
      <selectBatchType v-model="searchForm.batchTypeId" type="short_batch_type" clearable @keyup.enter.native="onSubmit"></selectBatchType>
    </el-form-item>
    <el-form-item label="发车批次" prop="batchNo">
      <el-input v-model="searchForm.batchNo" maxlength="15" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="车牌号">
      <querySelect search="truckIdNumber" :remote="true" valuekey="truckIdNumber" v-model="searchForm.truckIdNumber" type="trunk" clearable></querySelect>
    </el-form-item>
    <el-form-item label="司机名称">
      <querySelect search="driverName" type="driver" v-model="searchForm.dirverName" valuekey="driverName" label="driverName" :remote="true" clearable />
    </el-form-item>
    <el-form-item label="发车网点">
      <SelectTree v-model="searchForm.orgId" clearable></SelectTree>
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
import selectBatchType from '@/components/selectType/index'
import querySelect from '@/components/querySelect/index'
import { objectMerge2, pickerOptions2, parseTime } from '@/utils/index'
export default {
  components: {
    SelectTree,
    selectBatchType,
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
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      searchForm: {
        orgId: '',
        loadTypeId: 38,
        // "loadStartTime": '',
        // "loadEndTime": '',
        // "departureStartTime": '',
        // "departureEndTime": '',
        batchTypeId: 46,
        // "arriveOrgid": '',
        // "batchNo": '',
        // "truckIdNumber": '',
        // "dirverName": ''
      },
      rules: {
        orgid: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      defaultTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.searchTime) {
        this.searchForm.loadStartTime = parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00'
        this.searchForm.loadEndTime = parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59'
      }
      if (this.searchForm.batchTypeId === 46) {
        this.searchForm.batchTypeId = undefined
      }
      this.$emit('change', this.searchForm)
      this.searchForm = objectMerge2({}, this.$options.data().searchForm)
    },
    clearForm(formName) {
      this.$refs[formName].resetFields()
      this.searchForm = objectMerge2({}, this.$options.data().searchForm)
      this.searchTime = this.$options.data().searchTime
    }
  }
}

</script>