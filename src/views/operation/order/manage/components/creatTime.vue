<template>
  <div>
    <!--<div class="block">-->
      <!--<span class="demonstration">起始日期时刻为 12:00:00</span>-->
      <!--<el-date-picker-->
        <!--v-model="value6"-->
        <!--type="datetimerange"-->
        <!--start-placeholder="开始日期"-->
        <!--end-placeholder="结束日期"-->
        <!--:default-time="['12:00:00']">-->
      <!--</el-date-picker>-->
    <!--</div>-->
    <div class="block">
      <el-date-picker
        v-model="value7"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
    export default {
        name: "creat-time",
        data() {
          return {
            value7: [+new Date() - 60 * 24 * 60 * 60 * 1000, new Date()]
          };
        }
    }
</script>

<style scoped>

</style>
