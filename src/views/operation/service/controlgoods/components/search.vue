<template>
    <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
        <el-form-item label="开单时间:">
          <div class="block">
            <el-date-picker
              v-model="searchCreatTime"
              type="datetimerange"
              
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions1"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="开单网点">
            <SelectTree v-model="searchForm.shipFromOrgid" />
        </el-form-item>
        <el-form-item label="运单号" prop="shipSn">
            <el-input v-model="searchForm.shipSn" maxlength="20" auto-complete="off" clearable></el-input>
        </el-form-item>
       
        <el-form-item label="出发城市">
          <el-input v-model="searchForm.shipFromCityName" maxlength="20" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="到达城市">
            <el-input v-model="searchForm.shipToCityName" maxlength="20" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item class="staff_searchinfo--btn">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="info" @click="clearForm" plain>清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
// import { REGEX } from '@/utils/validate'
import { parseTime } from '@/utils/index'
import SelectTree from '@/components/selectTree/index'
import SelectCity from '@/components/selectCity/index'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
    SelectTree,
    SelectCity
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: [Array, Number]
    },
    shipSn: {
      type: Number
    },
    issender: {
      type: Boolean,
      dafault: false
    },
    // \
    allId: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {

  },
  data() {
    // const _this = this
    // const orgidIdentifier = (rule, value, callback) => {
    //   const reg = REGEX.ONLY_NUMBER
    //   if (value === '' || value === null || !value || value === undefined) {
    //     callback()
    //   } else if (!(reg.test(value))) {
    //     callback(new Error('请输入最多20位数字'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      pickerOptions1: '',

      searchForm: {
        shipFromOrgid: '',
        shipSn: '',
        // shipFromCityCode: '',
        shipFromCityName: '',
        // shipToCityCode: '',
        shipToCityName: ''
      },
      rules: {
        // shipSn: [{

        //   validator: orgidIdentifier, trigger: 'change'
        // }]
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.shipFromOrgid = newVal
    },
    allId(newVal) {

    }
  },
  mounted() {
    this.searchForm.shipFromOrgid = this.orgid
  },
  methods: {
    // getFromCity(city) {
    //   this.searchForm.shipFromCityCode = city.id.toString()
    //   this.searchForm.shipFromCityName = city.longAddr
    // },
    // getToCity(city) {
    //   this.searchForm.shipToCityCode = city.id.toString()
    //   this.searchForm.shipToCityName = city.longAddr
    // },
    // getOrgid (id){
    //   this.searchForm.orgid = id
    // },
    onSubmit() {
      // this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0]) : ''
      // this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1]) : ''
      this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''

      const data = objectMerge2({}, this.searchForm)
      if (this.allId) {
        data.shipFromOrgid = this.searchForm.shipFromOrgid
      } else {
        if (this.searchForm.shipFromOrgid) {
          data.shipFromOrgid = [this.searchForm.shipFromOrgid]
        } else {
          delete data.shipFromOrgid
        }
      }
      // this.searchForm.shipFromOrgid = [this.orgid]
      this.$emit('change', data)
    },
    clearForm() {
    //   this.searchForm.name = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.shipSn = ''
      this.searchForm.shipFromCityName = ''
      this.searchForm.shipToCityName = ''
      this.searchForm.shipFromOrgid = ''
      this.searchCreatTime = []
    }
  }
}
</script> 
<style lang="scss">
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
  width:200px;
}
</style>
