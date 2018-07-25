<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm"  class="staff_searchinfo clearfix">
      <el-form-item label="开单时间:">
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime"
            :default-value="defaultTime"
            type="daterange"
            align="right"
            :size="btnsize"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            :picker-options="pickerOptions2"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="开单网点:">
        <select-tree v-model="searchForm.orgid" />
      </el-form-item>
      <el-form-item label="运单号" class="searchinfo--order">
        <el-input
            v-model="searchForm.shipSn"
            maxlength="15"
            @change="onSubmit"
            clearable>
        </el-input>
      </el-form-item>
    <el-form-item label="出发城市" class="searchinfo--order">
        <el-input
            v-model="searchForm.shipFormCityName"
            maxlength="15"
            @change="onSubmit"
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
import { pickerOptions2, parseTime } from '@/utils/'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'

export default {
  name: 'order-manage-search',
  components: {
    SelectTree,
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
  data() {
    return {
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      searchForm: {
        orgid: '',
        shipSn: '',
        shipFormCityName: ''
      },
      rules: {
        mobile: [{
          // validator: validateFormMobile, trigger: 'blur'
         // validator: validateFormNumber, trigger: 'change'
        }]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgid = newVal
    }
  },
  mounted() {
    this.searchForm.orgid = this.orgid
    this.searchCreatTime = this.defaultTime
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      const searchObj = {}
      searchObj.shipFromOrgid = this.searchForm.orgid
      searchObj.shipFormCityName = this.searchForm.shipFormCityName
      searchObj.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
      searchObj.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
      searchObj.shipSn = this.searchForm.shipSn

      this.$emit('change', searchObj)
    },
    clearForm() {
      this.searchCreatTime = []
      this.searchForm.orgid = this.orgid
      this.searchForm.shipFormCityName = ''
      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
      this.searchForm.shipSn = ''
    }
  }
}
</script>
