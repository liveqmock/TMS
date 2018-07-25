<template>
  <el-form ref="searchForm" inline label-position="right" :model="searchForm" label-width="60px" class="tableHeadItemForm">
    <el-form-item>
      <el-select v-model="senderSearch" placeholder="批次类型" :size="btnsize" clearable @focus="clearSender">
        <el-option label="短驳" value="short"></el-option>
        <el-option label="干线" value="load"></el-option>
        <el-option label="送货" value="deliver"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="senderSearch==='short'">
      <el-autocomplete 
      v-model="searchForm.shortBatchNo" 
      :size="btnsize" 
      popper-class="hidePopper" 
      :fetch-suggestions="(queryString, cb) => querySearch( 'shortBatchNo',queryString, cb)" placeholder="短驳批次号搜索"
      @select="handleSelect">
       <template slot-scope="{ item }">
          <div class="name">{{ item.shortBatchNo }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item v-if="senderSearch==='load'">
      <el-autocomplete 
      v-model="searchForm.mainBatchNo" 
      :size="btnsize" 
      popper-class="hidePopper" 
      :fetch-suggestions="(queryString, cb) => querySearch( 'mainBatchNo',queryString, cb)" placeholder="干线批次号搜索" 
      @select="handleSelect">
      <template slot-scope="{ item }">
          <div class="name">{{ item.mainBatchNo }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item v-if="senderSearch==='deliver'">
      <el-autocomplete 
      v-model="searchForm.sendBatchNo" 
      :size="btnsize" 
      popper-class="hidePopper" 
      :fetch-suggestions="(queryString, cb) => querySearch( 'sendBatchNo',queryString, cb)" placeholder="送货批次号搜索" 
      @select="handleSelect">
      <template slot-scope="{ item }">
          <div class="name">{{ item.sendBatchNo }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="车牌号">
      <el-autocomplete 
      clearable
      v-model="searchForm.truckIdNumber" 
      :size="btnsize" 
      :fetch-suggestions="(queryString, cb) => querySearch( 'truckIdNumber',queryString, cb)" 
      placeholder="车牌号搜索" 
      @select="handleSelect">
        <template slot-scope="{ item }">
          <div class="name">{{ item.truckIdNumber }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
  </el-form>
</template>
<script>
import querySelect from '@/components/querySelect/index'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
    querySelect
  },
  data() {
    return {
      senderSearch: '',
      searchForm: {
        shortBatchNo: '',
        mainBatchNo: '',
        sendBatchNo: '',
        truckIdNumber: ''
      },
      btnsize: 'mini',
      selectVal: ''
    }
  },
  props: {
    info: {
      type: Array,
      default: []
    }
  },
  methods: {
    querySearch(type, queryString, cb) {
      let leftTable = this.info
      this.searchForm[type] = queryString // 绑定数据视图
      this.selectVal = type // 当前选择输入的对象
      for (let item in this.searchForm) {
        if (this.searchForm[item] === undefined || this.searchForm[item] === '') {
          this.$emit('change', objectMerge2([], this.info)) // 如果输入框为空恢复右边数据列表
        }
      }
      let results = queryString ? leftTable.filter(this.createFilter(queryString, type)) : leftTable
      cb(results)
      let array = []
      results.forEach(e => {
        array.push(e)
      })
      this.$emit('change', array)
    },
    createFilter(queryString, type) {
      return (res) => { // 过滤
        return (res[type].toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleSelect(obj) {
      this.searchForm[this.selectVal] = obj[this.selectVal]
      this.selectVal = ''
      let array = []
      array.push(obj)
      this.$emit('change', array)
    },
    clearSender(event) {
      this.searchForm = this.$options.data().searchForm
    }
  }
}

</script>
<style lang="scss">
.tableHeadItemForm {
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  .el-input {
    width: 120px;
    .el-input__inner {
      padding: 0 10px;
    }
  }
  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .hidePopper {
    display: none !important;
    background-color: rgba(0, 0, 0, 0);
  }
}

</style>
