<template>
  <div class="log-content orderinfo-content">
    <el-table
      ref="multipleTable"
      :data="usersArr"
      stripe
      border
      height="100%"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="updateContent"
        label="修改内容"
        >
      </el-table-column>
      <el-table-column
        prop="oldValue"
        label="旧值">
      </el-table-column>
      <el-table-column
        prop="newValue"
        label="新值">
      </el-table-column>
      <el-table-column
        label="修改时间">
        <template slot-scope="scope">{{ scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="修改人">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import orderManage from '@/api/operation/orderManage'

export default {
  props: {
    orderid: [String, Number]
  },
  data () {
    return {
      loading: false,
      usersArr: []
    }
  },
  watch: {
    orderid (newVal) {
      if(newVal !== '') {
        this.fetchData()
      } else {
        this.usersArr = []
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData(){
      return orderManage.getShipLog(this.orderid).then(res => {
        this.usersArr = res.list
      })
    }
  }
}
</script>