<template>
  <el-form ref="searchForm" :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
    <el-row>
      <el-col :span="20">
        <el-form-item label="中转时间">
          <el-date-picker v-model="searchTime" :default-value="defaultTime" type="daterange" align="right" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="承运商" prop="carrierName">
         <querySelect v-model="searchForm.carrierName" search="carrierName" type="carrier" label="carrierName" :name="city" @change="getcity" :remote="true" clearable ></querySelect>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item class="staff_searchinfo--btn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm('searchForm')" plain>清空</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { REGEX } from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'
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
      carrierName: {},
      searchForm: {
        orgId: 0,
        carrierName: '',
        startTime: '',
        endTime: ''
      },
      city: '',
      searchData: {
        orgId: 0,
        carrierName: '',
        startTime: '',
        endTime: ''
      },
      cityName: {},
      rules: {
        shipSn: [{ validator: orgidIdentifier, tigger: 'blur' }]
      },
      searchTime: [],
      defaultTime: [new Date() - 60 * 24 * 60 * 60 * 1000, new Date()],
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
    getcity () {},
    onSubmit() {
      if (this.searchForm.carrierName) {
        this.searchForm.carrierName = this.searchForm.carrierName.carrierName
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