<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" class="staff_searchinfo clearfix">
      <el-form-item label="出车时间:">
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime"
            type="daterange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            unlink-panels
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="提货状态：">
        <SelectType v-model="searchForm.pickupStatus" type="pickup_status" />
      </el-form-item>
      <el-form-item label="提货批次:">
          <el-input
              v-numberOnly
              placeholder=""
              maxlength="15"
              v-model="searchForm.pickupBatchNumber"
              clearable>
          </el-input>
      </el-form-item>
    <el-form-item label="车牌号:">
      <el-input
        v-numberOnly
        placeholder=""
        maxlength="8"
        v-model="searchForm.truckIdNumber"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="司机姓名:">
      <el-input
        v-numberOnly
        placeholder=""
        maxlength="8"
        v-model="searchForm.driverName"
        clearable>
      </el-input>
    </el-form-item>
      <el-form-item class="staff_searchinfo--btn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { REGEX }  from '@/utils/validate'
import SelectType from '@/components/selectType/index'
import { parseTime } from '@/utils/'
export default {
  components: {
    SelectType
  },
  props: {
    btnsize: {
      type: [String,Object],
      default: 'mini'
    },
    orgid: {
      type: Number
    },
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
    title () {

    }
  },
  data () {
    let _this = this
    const validateFormMobile = function (rule, value, callback) {
      if(validateMobile(value)){
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormEmployeer = function (rule, value, callback) {
      callback()
    }

    const validateFormNumber = function (rule, value, callback) {
      _this.searchForm.mobile = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      searchForm: {
        pickupStatus: 235,
        pickupBatchNumber: '',
        truckIdNumber: '',
        driverName: ''
      },
      rules: {
        mobile: [{
          //validator: validateFormMobile, trigger: 'blur'
          validator: validateFormNumber, trigger: 'change'
        }]
      }
    }
  },
  watch: {
    orgid(newVal){
      this.searchForm.orgid = newVal
    }
  },
  mounted () {
    this.loading = true
    this.searchForm.orgid = this.orgid
    this.onSubmit()
  },
  methods: {
    getOrgid (id){
      // this.searchForm.orgid = id
    },
    onSubmit () {
      // this.searchForm.startTime = this.searchCreatTime[0] ? +this.searchCreatTime[0] : ''
      // this.searchForm.endTime = this.searchCreatTime[1] ? +this.searchCreatTime[1] : ''
      this.searchForm.startTime = this.searchCreatTime[0] ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.endTime = this.searchCreatTime[1] ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      this.$emit('change', this.searchForm)
    },
    clearForm() {
      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
      this.searchCreatTime = []
      this.searchForm.pickupBatchNumber = ''
      this.searchForm.truckIdNumber = ''
      this.searchForm.driverName = ''
      this.searchForm.pickupStatus = ''
    }
  }
}
</script>
