<template>
  <el-form :inline="true" :size="btnsize" label-position="right"  :model="searchForm"  class="staff_searchinfo clearfix">
    <el-form-item label="开单网点:">
      <select-tree v-model="searchForm.orgid" />
    </el-form-item>
    <el-form-item label="交账状态：">
      <select-type v-model="searchForm.status" type="fee_status" >
        <el-option slot="head" label="全部" value=""></el-option>
      </select-type>
    </el-form-item>
    <el-form-item label="开单时间:">
      <div class="block">
        <el-date-picker
          v-model="searchCreatTime"
          :default-value="defaultTime"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { parseTime } from '@/utils/'

export default {
  name: 'handaccount-manage-search',
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
    }
  },
  data() {
    return {
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      searchForm: {
        orgid: '',
        status: '',
        endTime: '',
        startTime: ''
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
    // this.searchForm.status = 'NOSETTLEMENT'
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      searchObj.status = searchObj.status === '' ? null : searchObj.status
      if (this.searchCreatTime && this.searchCreatTime[0]) {
        searchObj.startTime = this.searchCreatTime[0] + ' 00:00:00'
        searchObj.endTime = this.searchCreatTime[1] + ' 23:59:59'
      }

      this.$emit('change', searchObj)
    },
    clearForm() {
      this.searchForm.status = ''
      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
      this.searchCreatTime = this.defaultTime
      this.searchForm.orgid = this.otherinfo.orgid
    }
  }
}
</script>

