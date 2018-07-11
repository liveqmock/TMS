<template>
  <div class="dep-maintain">
    <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='addpopDepMain' v-loading="loading">
      <template class='addRelationPop-content' slot="content">
        <div ref="ruleForm" class="depmain-div">
          <!--<div class="depmain-top" v-if="hiddenTop">-->
            <!--<el-input-->
              <!--placeholder="请输入内容"-->
              <!--v-model="inputDate"-->
              <!--&gt;-->
            <!--</el-input>-->
            <!--<el-checkbox v-model="checked" text-color="#3e9ff1"></el-checkbox>-->
            <!--<el-checkbox v-model="checked1"></el-checkbox>-->
          <!--</div>-->

          <div class="depmain-content" v-if="showDate">
            <ul>
              <li v-for="item in getMentInfo">
                <span>{{item.dictName}}</span>
              </li>
            </ul>
          </div>
          <div class="depmain-add" v-if="hiddenAdd">
            <el-input
              placeholder="请输入内容"
              v-model="dictName"
            >
            </el-input>
            <el-checkbox v-model="checked1" @change="addDep"></el-checkbox>
            <el-checkbox v-model="checked2"></el-checkbox>
            <ul>
              <li v-for="item in getMentInfo">
                <span>{{item.dictName}}</span>
                <!--<i class="el-icon-close"></i>-->
              </li>
            </ul>
          </div>
          <div class="depmain-edit" v-if="hiddenEdit">
            <ul>
              <li v-for="item in getMentInfo">
                <el-input
                  placeholder="请输入内容"
                  v-model="item.dictName"
                  >
                </el-input>
                <el-checkbox v-model="checked1"></el-checkbox>
                <el-checkbox v-model="checked2"></el-checkbox>
                <!--<i class="el-icon-close"></i>-->
              </li>
            </ul>
          </div>
        </div>
      </template>
      <div slot="footer" class="dialog-footer" v-if="showBotton">
        <el-button type="primary" @click="submitForm('ruleForm')">{{addText}}</el-button>
        <el-button @click="editMe">{{editText}}</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="remBotton">
        <el-button @click="closeMe">{{remText}}</el-button>
      </div>
    </PopFrame>
  </div>
</template>

<script>
    import PopFrame from '@/components/PopFrame/index'
    import { getSelectDictInfo } from '../../../api/company/groupManage'
    // import {postDict} from '../../../api/company/permissionManage'
    import { mapGetters } from 'vuex'
    export default {
      computed: {
        ...mapGetters([
          'otherinfo'
        ])
      },
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
        createrId: [Number,String]
      },
      data() {
        return {
          checked1: true,
          popTitle: '部门',
          loading:false,
          getMentInfo:[],
          getMentInfo:[],
          //首行
          checked: true,
          checked2:true,
          hiddenAdd:false,
          hiddenEdit:false,
          showDate:false,
          dictName: '', //添加
       //首行
       //   底部按钮
          addText:'添加',
          editText:'编辑',
          remText:'取消',
          showBotton:false,
          remBotton:false
       //   底部按钮
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
            this.popTitle = '部门';
            this.showBotton = true
            this.remBotton = false
            this.hiddenAdd = false
            this.hiddenEdit = false
            this.showDate = true
            console.log('true');
          }else{
            console.log('false');
            // this.showBotton = false
            // this.remBotton = true
            // this.hiddenTop = true
          }
        },
        dotInfo (newVal) {
          this.getMentInfo = this.dotInfo
        },
        popVisible (newVal) {
          console.log('popVisible:', newVal)
        }
      },
      mounted() {
        Promise.all([getSelectDictInfo(this.createrId), this.fetchSelectDict(this.createrId)]).then( resArr => {
          this.loading = false
          this.getMentInfo = resArr[0]
          this.getMentInfo = resArr[1]
          console.log(resArr);
        })
        console.log(this.dictName);
        this.getAddDate(this.createrId,this.dictName)
      },
      methods: {
        // fetchSelectDict (orgid, username, mobilephone) {
        //   return getSelectDictInfo(orgid, username||'', mobilephone||'')
        // },

        getAddDate(orgid,dictName) {
          this.createrId = orgid
          this.dictName = dictName
          postDict(this.createrId , this.dictName).then(res => {
            this.loading = true
            console.log(res);
          })

        },
        closeMe(done){
          this.$emit('close')
          // this.$refs['ruleForm'].resetFields()
          if(typeof done === 'function'){
            done()
          }
        },
        editMe(){
          this.popTitle = '编辑'
          this.remBotton = true
          this.showBotton = false
          this.hiddenAdd = false
          this.hiddenEdit = true
          this.showDate = false
        },
        submitForm(ruleForm){
          // this.loading = true
          this.popTitle = '添加'
          this.remBotton = true
          this.hiddenAdd = true
          this.showBotton = false
          this.hiddenEdit = false
          this.showDate = false

          // this.$refs[ruleForm].validate((valid) => {
          //   if(valid){

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
            // }else{
            //   return false
            // }
          // })
        },
        addDep(){
          this.getAddDate()
        }

      }
    }
</script>

<style lang="scss">

</style>
