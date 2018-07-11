<template>
  <div class="fee-content">
    <el-table
      ref="multipleTable"
      :data="usersArr"
      stripe
      border
      height="100%"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="费用项"
        width="150">
      </el-table-column>
      <el-table-column
        prop="pickupBatchNumber"
        width="110"
        label="核销状态">
      </el-table-column>
      <el-table-column
        prop="pickupStatusName"
        width="150"
        label="核销日期">
      </el-table-column>
      <el-table-column
        prop="cancelStatus"
        width="150"
        label="核销人">
      </el-table-column>
      <el-table-column
        prop="customerName"
        width="120"
        label="凭证号">
      </el-table-column>
      <el-table-column
        prop="customerMobile"
        width="130"
        label="金额">
      </el-table-column>
      <el-table-column
        label="收据单号"
        width="170"
        prop="detailedAddress"
        >
      </el-table-column>
      <el-table-column
        prop="pickupName"
        label="备注"
        >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      usersArr: []
    }
  }
}
</script>
