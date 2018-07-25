<template>
  <PopFrame :title='popTitle' :isShow="popDepMainVisible" @close="closeMe" class='importCustomerMain'>
    <template class='importCustomerPop-content' slot="content">
      <div ref="ruleForm" class="depmain-div">
        <ul>
          <li>123</li>
          <li>123</li>
          <li>123</li>
        </ul>
      </div>


    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </PopFrame>
</template>

<script>
    import PopFrame from '@/components/PopFrame/index'
    export default {
      components: {
        PopFrame
      },
      props: {
        popDepMainVisible: {
          type: Boolean,
          default: false
        },
        issender: {
          type: Boolean,
          dafault: false
        }
      },
      date() {
        return {
          popTitle: '批量导入'
        }
      },
      computed: {
        isShow: {
          get() {
            return this.popDepMainVisible
          },
          set() {

          }
        }
      },
      methods: {
        closeMe(done) {
          this.$emit('close')
          this.$refs['ruleForm'].resetFields()
          if (typeof done === 'function') {
            done()
          }
        },
        submitForm(ruleForm) {
          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
              console.log(JSON.stringify(this.form))
          this.loading = true
              // postOrgSaveDate(this.form).then(res=>{
              //   console.log(res);
              //   this.$alert('保存成功', '提示', {
              //     confirmButtonText: '确定',
              //     callback: action => {
              //       this.loading = false
              //       this.closeMe()
              //       this.$emit('success')
              //     }
              //   })
              //
              // })
            }else {
              return false
            }
          })
        }
      }
    }
</script>

<style lang="scss">
  .importCustomerMain{
    left: auto;
    top: 50px;
    bottom: auto;
    min-width: 486px;
    max-width:  486px;

    .el-select .el-input__inner{
      padding-right: 15px;
    }
  }
  .importCustomerPop-content{
    padding: 20px 20px 0;
    box-sizing: border-box;
  }
  
  .depmain-div li{
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0 10px 10px;
    color: #333;
    font-size: 14px;
  }
</style>
