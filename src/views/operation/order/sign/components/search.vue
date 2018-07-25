<template>
    <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm"  class="staff_searchinfo clearfix">
      <el-form-item label="开单时间:">
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime"
            type="datetimerange"
            value-format="yyyy-MM-dd hh:mm:ss"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
        <el-form-item label="开单网点">
            <SelectTree v-model="searchForm.shipFromOrgid" />
        </el-form-item>
        
        <el-form-item label="签收状态"  prop="signStatus">
          <selectType v-model="searchForm.signStatus"  type="sign_status">
            <el-option slot="head" label="全部" value="" ></el-option>
          </selectType>
        </el-form-item>
        <el-form-item label="凭证状态"  prop="signCertificate">
          <selectType v-model="searchForm.signCertificate" type="sign_certificate" >
            <!-- <el-option slot="head" label="全部" value=""></el-option> -->
          </selectType>
        </el-form-item>
        <el-form-item label="运单号" prop="shipSn">
            <el-input v-model="searchForm.shipSn" maxlength="20" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="出发城市">
            <SelectCity @change="getFromCity" v-model="searchForm.shipFromCityName"/>
        </el-form-item>
        <el-form-item label="到达城市">
            <!-- <el-input v-model="searchForm.shipToCityCode" maxlength="20" auto-complete="off"></el-input> -->
            <SelectCity @change="getToCity" v-model="searchForm.shipToCityName"/>
        </el-form-item>
        <el-form-item class="staff_searchinfo--btn">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="info" @click="clearForm" plain>清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
// import { REGEX } from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import SelectCity from '@/components/selectCity/index'
import { parseTime } from '@/utils/index'
export default {
  components: {
    SelectTree,
    SelectCity,
    SelectType
  },
  props: {
    btnsize: {
      type: String,
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
  },
  data() {
    // const _this = this
    // const validateshipSn = function(rule, value, callback) {
    //   if (value === '' || value === null || !value || value === undefined) {
    //     callback(new Error('请输入运单号'))
    //   } else if (REGEX.ONLY_NUMBER_AND_LETTER.test(value)) {
    //     callback()
    //   } else {
    //     callback(new Error('只能输字母和数字'))
    //   }
    // }

    return {
      searchCreatTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      thestatus: '',
      searchForm: {
        shipFromOrgid: '',
        // number:'',
        shipSn: '',
        shipFromCityCode: '',
        shipFromCityName: '',
        shipToCityCode: '',
        shipToCityName: '',
        signCertificate: 230,
        signStatus: 226,
        startTime: '',
        endTime: ''
      },
      rules: {
        // shipSn: [

        //   { required: true, trigger: 'blur', validator: validateshipSn }
        // ]
      }
    }
  },
  watch: {
    // orgid(newVal){
    //   this.searchForm.orgid = newVal
    // }
  },
  mounted() {
    this.searchForm.shipFromOrgid = this.otherinfo.orgid
  },
  methods: {
    // getOrgid (id){
    //   this.searchForm.orgid = id
    // },
    getFromCity(city) {
      this.searchForm.shipFromCityCode = city.id.toString()
      this.searchForm.shipFromCityName = city.longAddr
    },
    getToCity(city) {
      this.searchForm.shipToCityCode = city.id.toString()
      this.searchForm.shipToCityName = city.longAddr
    },
    onSubmit() {
      // this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0]) : ''
      // this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1]) : ''
      this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      this.$emit('change', this.searchForm)
    },
    clearForm() {
      this.searchForm.shipFromOrgid = ''
      this.searchForm.signStatus = ''
      this.searchForm.signCertificate = ''
      this.searchForm.shipSn = ''
      this.searchForm.shipFromCityName = ''
      this.searchForm.shipToCityName = ''
      this.searchCreatTime = []
    }
  }
}
</script>
<style lang="scss">
.el-range-editor--mini.el-input__inner{
  height: 28px;
  width: 200px;
}
</style>
