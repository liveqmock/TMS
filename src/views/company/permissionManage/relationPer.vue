<template>
  <div class="relation-per" v-loading="loading">
  <pop-right :title='popTitle' :isShow="popRelatVisible" @close="closeMe" class='addRelationPop'>
    <template class='addRelationPop-content' slot="content">
          <el-form  ref="formName"  class="demo-ruleForm" :inline="true" label-position="right" size="mini">
            <table>
              <thead>
              <tr>
                <th>角色</th>
                <th>员工</th>
                <th>手机号码</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <el-input
                      v-model="inputInfo.roleName"
                      clearable
                      disabled>
                    </el-input>
                  </td>
                    <el-autocomplete
                      popper-class="my-autocomplete"
                     v-model="selectInfo.name"
                      :fetch-suggestions="querySearch"
                      placeholder="请选择员工~"
                      @select="handleSelect">
                      <i
                        class="el-icon-edit el-input__icon"
                        @click="handleIconClick">
                      </i>
                      <template slot-scope="{ item }">
                        <div class="name">{{ item.name }}</div>
                      </template>
                    </el-autocomplete>
                  <td>
                    <el-input
                      placeholder=""
                      v-model="selectInfo.mobilephone"
                      disabled >
                    </el-input>
                  </td>
                </tr>
              </tbody>

            </table>
          </el-form>
    </template>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('formName')">保存</el-button>
            <el-button @click="closeMe">取 消</el-button>
          </div>
  </pop-right>
  </div>
</template>

<script>
  import { putEmployeerAuth} from '@/api/company/employeeManage'
  import popRight from '@/components/PopRight/index'

  export default {
    components: {
      popRight
    },
    props: {
      popRelatVisible: {
        type:Boolean,
        default:false
      },
      dotInfo: Object,
      thePerAllUserInfo: [Object,Array],
    },
    computed: {
      isShow: {
        get(){
          return this.popRelatVisible
        },
        set(){

        }
      }
    },
    watch: {
      dotInfo (newVal) {
        this.inputInfo = this.dotInfo
      },
      thePerAllUserInfo (newVal) {
        this.resInfo = this.thePerAllUserInfo
      }
    },
    data() {
      return {
        //输入框
        inputInfo: {
          roleName:''
        },
        //下拉
        restaurants: [],
        resInfo:[
          {
            name:''
          }
        ],
        selectInfo:{
          name:'',
          mobilephone:'',
          rolesId:[],
          id:''
        },
        //
        loading: false,
        popTitle: '关联员工',
        loading: false,
        dialogVisible: 'false'
      }
    },
    mounted(){
      this.resInfo = this.thePerAllUserInfo
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.resInfo;
        var results = queryString ? restaurants.filter(item => {
          return item.name ? item.name.indexOf(queryString) !== -1 : false
        }) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return restaurant.name.indexOf(queryString) !== -1
        };
      },
      handleSelect(item) {
        this.selectInfo = item
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      //
      closeMe(done){
        this.$emit('close')
        // this.$refs['ruleForm'].resetFields()
        if(typeof done === 'function'){
          done()
        }
      },
      submitForm(formName){
        // this.$refs[formName].validate((valid) => {
        //   if(valid){
            this.loading = true
            let data = []
              data.push({
                "id": this.selectInfo.id,
                "rolesId": this.selectInfo.rolesId
              })
            putEmployeerAuth(data).then(res=>{
              this.$alert('保存成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.loading = false
                  this.closeMe()
                  this.$emit('success')
                }
              })

            })
        //   }else{
        //     return false
        //   }
        // })
      }
    }
  };
</script>
<style type="text/css" lang="scss">
  @import "./relationPer.css";

</style>

