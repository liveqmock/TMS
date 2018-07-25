<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <el-form-item label="短驳时间">
      <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions2" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="批次状态" prop="batchTypeId">
      <selectBatchType v-model="searchForm.batchTypeId" type="short_batch_type" clearable></selectBatchType>
    </el-form-item>
    <el-form-item label="发车批次" prop="batchNo">
      <el-input v-model="searchForm.batchNo" maxlength="15" auto-complete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="车牌号">
     <querySelect search="truckIdNumber" :remote="true" valuekey="truckIdNumber" v-model="searchForm.truckIdNumber" type="trunk" clearable></querySelect>
    </el-form-item>
    <el-form-item label="司机名称">
       <querySelect search="driverName" type="driver" v-model="searchForm.dirverName" valuekey="driverName"  label="driverName" :remote="true" clearable />
    </el-form-item>
    <el-form-item label="发车网点">
      <SelectTree v-model="searchForm.orgid" clearable></SelectTree>
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
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
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
    const setDefaultOrgid = _ => {
      return this.orgid
    }
    return {
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      searchForm: {
        orgid: setDefaultOrgid(),
        loadTypeId: 38,
        // apportionTypeId: '',
        // arriveOrgid: '',
        // batchNo: '',
        batchTypeId: 46
        // beginTime: '',
        // contractNo: '',
        // createTime: '',
        // dirverMobile: '',
        // dirverName: '',
        // endTime: '',
        // loadTime: '',
        // truckIdNumber: '',
        // truckLoad: '',
        // truckVolume: '',
        // arrivedbeginDate: '',
        // arrivedEndDate: ''
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
      if (this.searchForm.batchTypeId === 46) {
        this.searchForm.batchTypeId = undefined
      }
      if (this.searchTime) {
        this.$set(this.searchForm, 'beginTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(this.searchForm, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      this.$emit('change', this.searchForm)
      this.searchForm = this.$options.data().searchForm
      this.searchForm.orgid = this.orgid
    },
    clearForm(formName) {
      this.$refs[formName].resetFields()
      console.log(this.$options.data().searchForm)
      this.searchForm = this.$options.data().searchForm
      this.searchTime = this.$options.data().searchTime
      this.searchForm.orgid = this.orgid
    }
  }
}

</script>