<template>

      <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="add-role-pop-content" v-loading="loading">
        <template class="addEmployeerPop-content" slot="content">
          <div class="add-role" >
            <el-form >
              <div class="add-role-top">
                <el-form :inline="true" :rules="rules" :model="formInline" class="demo-form-inline" ref="formName">
                  <el-form-item label="角色名称：" prop="roleName">
                    <el-input v-model="formInline.roleName"  clearable></el-input>
                  </el-form-item>
                  <el-form-item label="备注：" prop="remark">
                    <el-input
                      type="textarea"
                      v-model="formInline.remark"
                      placeholder=""
                      >
                      <!--:autosize="{ minRows: 2}"-->
                    </el-input>
                  </el-form-item>

                </el-form>
              </div>
              <div class="add-role-tree">
                <el-tree
                  :data="treeData"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span v-if="data.type=='0'">
                      <img src="../../../assets/icom/link.png" alt="">
                      {{ node.label }}</span>
                     <span v-else>
                      <img src="../../../assets/icom/btn.png" alt="">
                      {{ node.label }}</span>
                  </span>
                </el-tree>
              </div>
            </el-form>
          </div>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="getCheckedNodes('formName')">保存</el-button>
          <el-button @click="closeMe">取 消</el-button>
        </div>
      </pop-right>
    <!---->
</template>

<script>
  /**
   * 将多层级树结构展开未扁平数组
   */
  function expandGroups (data) {
    let res = []
    data.map(el => {
      if(el.isSelected){
        res.push(el.id)
      } else if(el.children){
        res = res.concat(expandGroups(el.children))
      }
    })
    return res
  }

  import popRight from '@/components/PopRight/index'
  import { postRoleInfo,putRoleInfo} from '@/api/company/permissionManage'
  import {objectMerge2} from '@/utils/index'
  export default {
    components: {
      popRight
    },
    props: {
      popVisible: {
        type: Boolean,
        default:false
      },
      isModify: {
        type: Boolean,
        default:false
      },
      reference: {
        type: Boolean,
        default:false
      },
      dotInfo: Array,
      theUser: Object,
      createrId: [Number,String]
    },
    watch: {
      dotInfo (newVal) {
        this.treeData = this.dotInfo
        this.$refs.tree.setCheckedKeys(expandGroups(this.treeData))
      },
      theUser (newVal) {
        if(this.isModify) {
          this.popTitle = '修改角色'
          this.formInline = objectMerge2(this.theUser)
          this.$refs.tree.setCheckedKeys(this.formInline.menusId)
        }
        if(this.reference){

          this.formInline.menusId = this.theUser.id
          this.$refs.tree.setCheckedKeys(this.formInline.menusId)
        }
        else{
          this.popTitle = '新增角色'
          this.formInline = {
            roleName: '',
            remark: '',
            menusId: '',
            createrId : this.createrId
          }
        }
      },
      reference(){
        if(this.reference){
          this.formInline = {
            roleName: '',
            remark: '',
            menusId: this.theUser.id,
            createrId : this.createrId
          }
          this.popTitle = '新增角色'
        }
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
    data() {
      var roleName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入角色名称'))
        } else {
          callback()
        }
      }
      var remarks = (rule, value, callback) => {
        callback()
      }
      return {
        rules:{
          roleName: [
            { required: true, message: '请输入角色名称', validator: roleName,trigger: 'blur' },
            { max: 12, message: '最多可输入12个字符', trigger: 'blur' }
          ],
          remarks: [
            { validator: remarks,trigger: 'blur' },
            { max: 250, message: '最多可输入250个字符', trigger: 'blur' }
          ]
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        formInline: {
          roleName: '',
          remark: '',
          menusId: [],
          createrId : this.createrId
        },
        popTitle: '新增角色',
        loading: false
      }
    },
    mounted() {
      this.treeData = this.dotInfo
    },
    methods: {
      closeMe(done){
        this.$emit('close')
        this.$refs['formName'].resetFields()
        if(typeof done === 'function'){
          done()
        }
      },
      getCheckedNodes(formName) {
        this.$refs[formName].validate((valid) =>{
          if(valid){
            this.loading = true
            let getNodeId = this.$refs.tree.getCheckedNodes()
            let promiseObj
            this.formInline.menusId = getNodeId.map(el => {
              return el.id
            })
            let data = Object.assign({},this.formInline)
            if(this.isModify){
              promiseObj = putRoleInfo(data)
            }else if(this.reference){
              promiseObj = postRoleInfo(data)
            }else{
              promiseObj = postRoleInfo(data)
            }
            promiseObj.then(res => {
              this.loading = false
              this.$alert('操作成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.closeMe()
                  this.$emit('success')
                }
              });
            }).catch(err => {
              this.loading = false
            })
          }else{
            return false
          }
        })
      }
    }
  };

</script>

<style type="text/css" lang="scss">
  @import "./addRole.css";

</style>
