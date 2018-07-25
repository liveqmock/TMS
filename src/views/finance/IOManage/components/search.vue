<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="80px" class="staff_searchinfo clearfix">
      <el-form-item label="所属网点:">
          <SelectTree v-model="searchForm.orgId" />
      </el-form-item>
      <el-form-item label="收支方式:">
        <SelectType v-model="searchForm.financialWayTypeId" type="financial_way_type" placeholder="请选择" class="pickup-way" />
      </el-form-item>
    <el-form-item label="状态:">
      <el-select v-model="searchForm.status">
        <el-option label="启用" :value="0"></el-option>
        <el-option label="停用" :value="1"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item class="staff_searchinfo_tn art_marginTop" >
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
export default {
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
  computed: {
    title () {

    }
  },
  data () {
    return {
      searchForm: {
        orgId: '',
        financialWayTypeId:'',
        status: ''
      },
      rules: {

      }
    }
  },
  watch: {
    orgid(newVal){
      this.searchForm.orgid = newVal
    }
  },
  mounted () {
    this.searchForm.orgId = this.orgid
    // this.searchForm.batchTypeId = this.orgid
  },
  methods: {
    onSubmit () {
      this.$emit('change', this.searchForm)
    },
    clearForm () {
      this.searchForm.orgId = this.orgid
      this.searchForm.financialWayTypeId = ''
      this.searchForm.status = ''
    }
  }
}
</script>
<style type="text/css" lang="scss">
  .staff_searchinfo{
    .staff_searchinfo_tn.el-form-item:last-of-type{
      width: 10%;
      float: right;
    }
  }

</style>

