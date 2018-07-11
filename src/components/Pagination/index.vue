<template>
  <div class="tms-pagenation">
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="sizes"
      :page-size="size"
      layout="total, prev, jumper, next, sizes"
      :disabled="total<size"
      :total="total">
    </el-pagination> -->
    
    <span class="page-num" @click="jumpTo(1)" :class="{disabled: pageNum <= 1}">
      <span class="first-page"></span>
    </span><span class="page-num" @click="jumpTo(pageNum-1)" :class="{disabled: pageNum <= 1}">
      <span class="prev-page"></span>
    </span>

    <span class="page-jumper">
      第
      <el-input
        class="el-pagination__editor is-in-pagination"
        :min="1"
        :max="pages"
        v-model.lazy.trim="inputval"
        type="number"
        ref="input"
        :disabled="pages <= 1"
        @keyup="handleKeyup"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"/> 页
    </span>
    /共 {{ pages }} 页
    <span class="page-num" @click="jumpTo(pageNum+1)" :class="{disabled: pageNum === pages}">
      <span class="next-page"></span>
    </span>
    <span class="page-num" @click="jumpTo(pages)" :class="{disabled: pageNum === pages}">
      <span class="last-page"></span>
    </span>
    <span class="tms-pagination__sizes">
      <el-select class="page-select" v-model="size" placeholder="请选择">
        <el-option
          v-for="(item,index) in sizes"
          :key="index"
          :label="item"
          :disabled="pages <= 1"
          :value="item">
        </el-option>
      </el-select>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    sizes: {
      type: Array,
      default: () => [100, 200, 300, 400]
    },
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.total/this.size)
    }
  },
  watch: {
    pageNum () {
      this.inputval = this.pageNum
    },
    size () {
      this.pageNum = 1
    }
  },
  data () {
    return {
      pageNum: 1,
      oldValue: 0,
      inputval: 1,
      oldNum: 1,
      size: 100
    }
  },
  methods: {
    handleFocus(event) {
      this.oldValue = event.target.value
    },
    changeEvent () {
      // 判断页码是否实际发生了变化
      if(this.oldNum !== this.pageNum){
        this.oldNum = this.pageNum
        this.$emit('change',{
          pageNum: this.pageNum,
          pageSize: this.size
        })
      }
      
    },
    handleCurrentChange (current) {
      this.pageNum = current
      this.changeEvent()
    },
    handleSizeChange (sizes) {
      this.size = sizes
      this.changeEvent()
    },
    handleChange (value) {
      const num = parseInt(value, 10);
      if (!isNaN(num)) {
        if (num < 1) {
          this.inputval = 1
          //this.$refs.input.$el.querySelector('input').value = 1
        } else if (num > this.pages) {
          this.inputval = this.pages
          // this.$refs.input.$el.querySelector('input').value = this.pages
        } else {
          this.inputval = num
        }
      } else {
        this.inputval = 1
        //this.$refs.input.$el.querySelector('input').value = 1
      }
      
    },
    handleBlur({ target }) {
     this.handleChange(target.value)
     this.jumpTo(this.inputval)
    },
    handleKeyup({ keyCode, target }) {
      console.log(keyCode, target)
      if (keyCode === 13 && this.oldValue && target.value !== this.oldValue) {
        this.handleChange(target.value);
        this.oldValue = ""
      }
    },
    jumpTo(num){
      if(num < 1  ){
        this.pageNum = 1
      } else if(num > this.pages){
        this.pageNum = this.pages
      } else {
        this.pageNum = num
      }
      this.changeEvent()
    }
  }
}
</script>
<style lang="scss" scoped>
$pageColor: #666;
$disableColor: #aaa;
$hoverColor: #003863;
$borderWidth: 6px;
.tms-pagenation{
  font-size: 12px;
  .disabled{
    &.page-num{
      cursor: default;
    }
    .first-page, .prev-page{
      border-right-color: $disableColor;
    }
    .next-page,.last-page{
      border-left-color: $disableColor;
    }
    .first-page::before, .last-page::before{
      background-color: $disableColor;
    }
  }
}
  .first-page, .next-page, .prev-page, .last-page{
    border:$borderWidth solid transparent;
    border-right-color: $pageColor;
    width: 0;
    height: 0;
    display: inline-block;
    position: relative;
    vertical-align: middle;

  }
  .first-page, .prev-page{
    &:hover{
      border-right-color: $hoverColor;
    }
  }
  .next-page,.last-page{
    border-color: transparent;
    border-left-color: $pageColor;
    &:hover{
      border-left-color: $hoverColor;
    }
  }
  .first-page::before, .last-page::before{
    content: "";
    position: absolute;
    width: 2px;
    height: $borderWidth * 2;
    left: -2px;
    top: -1 * $borderWidth;
    background: $pageColor;
  }
  .last-page::before{
    left: 0;
    right: -2px;
  }
  .page-jumper{
    input{
      width: 36px;
      height: 24px;
      background-color: #ffffff;
      border-radius: 4px;
      border: solid 1px #cccccc;
      text-align: center;
      font-size: 12px;
      color: #0980e0;
      font-weight: bold;
    }
  }
  .page-num{
    padding: 5px;
    cursor: pointer;
  }
  .tms-pagination__sizes{
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
</style>
<style lang="scss">
.tms-pagination__sizes .el-input .el-input__inner:hover {
    border-color: #409EFF;
}
.tms-pagenation .el-select .el-input{
  width: 70px;
  margin: 0 5px;
}
</style>
