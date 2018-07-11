<template>
  <el-form :inline="true" :size="btnsize" label-position="right"  :model="searchForm"  class="staff_searchinfo clearfix">
      <el-form-item label="开单网点:">
        <select-tree v-model="searchForm.orgid" />
      </el-form-item>
      <el-form-item label="员工姓名:">
        <el-input
            v-model="searchForm.userName"
            maxlength="15"
            @change="onSubmit"
            clearable>
        </el-input>
      </el-form-item>
    <el-form-item label="交账状态：">
      <select-type v-model="searchForm.status" type="fee_status" >
        <el-option slot="head" label="全部" value=""></el-option>
      </select-type>
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
      searchForm: {
        orgid: '',
        status: '',
        userName: ''
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
    // this.searchForm.status = 'NOSETTLEMENT'
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      const searchObj = Object.assign({}, this.searchForm)
      searchObj.status = searchObj.status === '' ? null : searchObj.status
      this.$emit('change', searchObj)
    },
    clearForm() {
      this.searchForm.status = ''
      this.searchForm.username = ''
      this.searchForm.orgid = this.otherinfo.orgid
    }
  }
}
</script>

