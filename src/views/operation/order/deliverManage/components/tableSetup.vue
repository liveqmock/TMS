<template>
  <el-dialog title="表格设置" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="setupTablePop">
    <el-transfer
      style="text-align: left; display: inline-block"
      v-model="value2"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :titles="['隐藏列', '显示列']"
      :button-texts="['<', '>']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="data2">
      <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
      <div class="transfer-footer" slot="left-footer">双击，可快速左右切换。</div>
      <div class="transfer-footer" slot="right-footer">拖拽，可调整上下顺序。<br>列表最多只能显示50个字段。</div>
    </el-transfer>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeMe">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  components: {
    draggable
  },
  computed: {
    isShow: {
      get () {
        return this.popVisible
      },
      set () {

      }
    }
  },
  data () {
    const generateData2 = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      }
    return {
      data2: generateData2(),
      value2: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    }
  },
  methods: {
    closeMe (done) {
      this.$emit('close')
      if(typeof done === 'function'){
        done()
      }
    },
    handleChange () {

    }
  }
}
</script>
<style lang="scss">
.setupTablePop{
  .el-dialog{
    max-width: 546px;
    min-width: 300px;
  }
  .transfer-footer{
    line-height: 20px;
    color: #666;
    font-size: 12px;
  }
}
</style>
