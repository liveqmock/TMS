<template>
  <div class="dep-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='pickpopDepMain' v-loading="loading" >
      <template class='pickRelationPop-content' slot="content">
        <!--isDepMain-->
        <div class="depmain-div">
          <el-form :inline="true" :model="getMentInfo" :label-width="formLabelWidth" ref="ruleForm" :rules="rules">
            <div class="_pick_center">是否生成托运单？</div>
            <div class="_pick_input_Main" >

              <el-form-item label="生成票数" prop="dictNum">
                <el-input v-model.number="getMentInfo.dictNum" placeholder="请输入内容"  ></el-input>
              </el-form-item>

            </div>
          </el-form>
        </div>
      </template>
      <div slot="footer" class="dialog-footer-frame" >
        <el-button type="primary" @click="submitForm('ruleForm')">生成</el-button>
        <el-button @click="pickFinish('ruleForm')">提货完成</el-button>
      </div>

    </PopFrame>
  </div>

</template>

<script>
    import { REGEX } from '@/utils/validate'
    import PopFrame from '@/components/PopFrame/index'
    import { putUpdatePickkupStatus } from '@/api/operation/pickup'
    export default {
      components: {
        PopFrame
      },
      props: {
        popVisible: {
          type: Boolean,
          default: false
        },
        dotInfo: [Object,Array],
        isDepMain:{
          type:Boolean,
          default:false
        },
        createrId: [Object,Number,String]
      },
      data() {
        const validatePickupNum = function(rule, value, callback) {
          if(value > 10){
            callback(new Error('最多可生成10票'))
          }
          else if(value < 1) {
            callback(new Error('最少可生成1票'))
          } else {
            callback()
          }
        }
        return {
          rules:{
            dictNum:[
              {pattern: REGEX.ONLY_NUMBER, trigger:'blur', message: '只能输入1-10的整数'},
              {validator: validatePickupNum, trigger:'blur'}
            ]
          },
          formLabelWidth:'90',
          input:'',
          checked1: true,
          popTitle: '提示',
          loading:false,
          getMentInfo:
            {
              dictNum:1,
              pickupId:''
            }
          ,
          //首行
          orderId: '',
        }
      },
      computed: {
        isShow: {
          get(){
            return this.popVisible
          },
          set(){

          }
        }
      },
      watch: {
        isDepMain(){
          if(this.isDepMain){

          }else{
          }
        },
        dotInfo (newVal) {
          this.getMentInfo.pickupId = this.dotInfo.id
        },
        popVisible (newVal) {
          // console.log('popVisible:', newVal)
        },
        createrId(newVal){

        }
      },
      mounted() {
      },
      methods: {
        validNum(item){
          console.log(item)
        },
        reset() {
          this.getMentInfo.dictNum = 1

        },
        closeMe (done) {
          this.$emit('update:popVisible', false);
          if(typeof done === 'function'){
            done()
          }
        },
        submitForm(ruleForm) {

          this.$refs[ruleForm].validate((valid) => {
            if (valid) {

              this.loading = true
              let promiseObj = putUpdatePickkupStatus(this.getMentInfo.pickupId)
              promiseObj.then(res => {
                this.loading = false
                this.$emit('success')
                this.eventBus.$emit('showCreateOrder', {
                  batchid: this.dotInfo.pickupBatchNumber,
                  ordernum: this.getMentInfo.dictNum,
                  batchobj: this.dotInfo
                })
                this.closeMe()
                this.reset()
              }).catch(err => {
                this.loading = false
              })
            } else {
              return false;
            }
          });
        },
        pickFinish(ruleForm) {

          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
              this.loading = true
              let promiseObj = putUpdatePickkupStatus(this.getMentInfo.pickupId)
              promiseObj.then(res => {
                this.loading = false
                this.$alert('操作成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.closeMe()
                    this.$emit('success')
                    this.reset()
                  }
                });
              }).catch(err => {
                this.loading = false
              })
            } else {
              return false;
            }
          });
        }
      }
    }
</script>

<style lang="scss">
  .dep-maintain .pickpopDepMain{
    top: 29%;
    bottom: auto;
    min-width: 486px;
    max-width:  486px;
    min-height: 230px;
    max-height: 230px;
  }
  .dep-maintain .pickRelationPop-content{
    padding: 20px 20px 0;
    box-sizing: border-box;

  }
._pick_center{
  padding-left: 100px;
  margin-top: 38px;
  font-size: 14px;
}
  ._pick_input_Main{
    text-align: center;
    font-size: 14px;
    padding-top: 10px;
    .el-form-item{
      margin-bottom: 0;
      .el-form-item__label{
        line-height: 24px;
      }
      .el-form-item__content{
        .el-input{
          .el-input__inner{
            height: 24px;
            line-height: 24px;
          }
        }
      }
    }
  }
</style>
