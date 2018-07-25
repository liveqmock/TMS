<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="100px" class="staff_searchinfo clearfix">
    <el-form-item label="短驳时间">
      <el-date-picker v-model="searchTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="短驳网点" prop="orgid">
      <SelectTree v-model="searchForm.orgid" clearable>
      </SelectTree>
    </el-form-item>
    <el-form-item label="所属结算网点" prop="ascriptionOrgid">
      <SelectTree v-model="searchForm.ascriptionOrgid" clearable>
      </SelectTree>
    </el-form-item>
    <el-form-item label="短驳批次" prop="batchNo">
      <el-input placeholder="请输入短驳批次" v-model="searchForm.batchNo"></el-input>
    </el-form-item>
    <el-form-item label="车牌号" prop="truckIdNumber">
      <querySelect v-model="searchForm.truckIdNumber" valuekey="truckIdNumber" search="truckIdNumber" type="trunk" />
    </el-form-item>
    <el-form-item label="司机">
      <querySelect v-model="searchForm.dirverName" valuekey="driverName" search="driverName" type="driver" label="driverName" :remote="true" />
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
        // sign: 2,
        orgid: '',
        ascriptionOrgid: '',
        status: 'NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT'
        // loadStartTime: '',
        // loadEndTime: '',
        // departureStartTime: '',
        // departureEndTime: '',
        // batchNo: '',
        // truckIdNumber: '',
        // dirverName: ''
      },
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      pickerOptions: {
        shortcuts: pickerOptions2
      }
    }
  },
  mounted() {
    this.searchForm.orgid = this.otherinfo.orgid
    this.searchForm.ascriptionOrgid = this.otherinfo.orgid
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      let searchObj = Object.assign({}, this.searchForm)
      if (this.searchTime) {
        this.$set(searchObj, 'departureStartTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
        this.$set(searchObj, 'departureEndTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
      }
      this.$emit('change', searchObj)
    },
    clearForm(formName) {
      this.$nextTick(() => {
        Object.assign(this.$data, this.$options.data())
        this.$refs[formName].resetFields()
        this.searchForm.orgid = this.otherinfo.orgid
        this.searchForm.ascriptionOrgid = this.otherinfo.orgid
      })
    }
  }
}

</script>
