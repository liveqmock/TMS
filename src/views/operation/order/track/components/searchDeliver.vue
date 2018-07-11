<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
        <el-form-item label="送货时间">
          <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="批次状态" prop="batchTypeId">
          <!-- <selectBatchType v-model="searchForm.batchTypeId" type="delivery_batch_type" clearable></selectBatchType> -->

          <selectBatchType v-model="searchForm.batchTypeId" type="delivery_batch_type" clearable></selectBatchType>
        </el-form-item>
        <el-form-item label="发车批次">
          <el-input v-model="searchForm.batchNo" maxlength="15" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <querySelect search="truckIdNumber" :remote="true" v-model="searchForm.truckIdNumber" type="trunk" clearable></querySelect>
        </el-form-item>
        <el-form-item label="司机名称">
          <querySelect search="driverName"  valuekey="dirverName" type="driver" v-model="searchForm.dirverName"  label="driverName" :remote="true" clearable />
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
import selectBatchType from '@/components/selectType/index'
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
      searchForm: {
        loadTypeId: 40,
        orgId: 0
        // batchNo: '',
        // batchTypeId: '',
        // deliveryBatchType: '',
        // dirverName: '',
        // endTime: '',
        // mainBatchType: '',
        // shortBatchType: '',
        // startTime: '',
        // truckIdNumber: ''
      },
      searchData: {
        loadTypeId: 40,
        orgId: 0
      },
      cityName: {},
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
    // onSubmit() {
    //   let searchObj = {}
    //   searchObj = Object.assign({}, this.searchForm)
    //   if (this.searchTime) {
    //     this.$set(searchObj, 'startTime', this.searchTime[0])
    //     this.$set(searchObj, 'endTime', this.searchTime[1])
    //   }
    //   this.$emit('change', searchObj)
    // },
    onSubmit() {
      if (this.searchForm.truckIdNumber) {
        this.searchForm.truckIdNumber = this.searchForm.truckIdNumber.truckIdNumber
      }
       if (this.searchForm.dirverName) {
        this.searchForm.dirverName = this.searchForm.dirverName.driverName
      }
      if (this.searchForm.batchTypeId === 56) {
        this.searchForm.batchTypeId = undefined
      }
      if (this.searchTime) {
        this.searchForm.startTime = this.searchTime[0]
        this.searchForm.endTime = this.searchTime[1]
      }
      this.$emit('change', this.searchForm)
      this.searchForm = Object.assign({}, this.searchData)
    },
    clearForm(formName) {
      this.$refs[formName].resetFields()
      this.searchTime = []
      this.searchForm = Object.assign({}, this.searchData)
    }
  }
}

</script>