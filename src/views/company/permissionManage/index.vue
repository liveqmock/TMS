
<template>
  <div class="permManage" v-loading="loading">
    <div class="permManage-top">
      <el-form :inline="true" :model="searchDate" class="demo-form-inline">
        <el-form-item label="角色名称：">
          <el-input v-model="searchDate.roleName" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="permManage-content">
      <div class="side_right_bottom clearfix">
        <div class="btns_box clearfix">
          <!--表格功能-->
          <div class="btns_box_lrl clearfix">
            <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('addRole')">新增角色</el-button>

            <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('roleNot')" plain>修改</el-button>
            <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('deletePeople')" plain>删除</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('reference')" plain>参照</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('relationPer')" plain>关联员工</el-button>
            <!--表格功能-->
          </div>
        </div>
        <!--表格功能-->
        <!--表格内容-->
        <div class="info_news">
          <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
            height="100%"
            tooltip-effect="dark"
            @row-click="clickDetails"
            @selection-change="seleClick"
            style="width: 100%;">
            <el-table-column
              fixed
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              fixed
              prop="id"
              label="序号" width="50">
            </el-table-column>
            <el-table-column
              fixed
              prop="roleName"
              label="角色名称">
            </el-table-column>
            <el-table-column
              prop="createrName"
              label="创建者">
            </el-table-column>
            <el-table-column
              label="创建时间">
              <template slot-scope="scope">{{ new Date(scope.row.createTime).toLocaleDateString() }}</template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
        <!--表格内容-->

      </div>
    </div>
    <AddRole :dotInfo="getTreeArr" :isModify="isModify" :reference="isReference" :popVisible="addDoRoleVisible" @close="closeAddRole" :createrId ="otherinfo.id" :theUser="theUser" @success="getSeachInfo"></AddRole>
    <RelationPer :popRelatVisible="addRelatVisible" :dotInfo="thePer" :thePerAllUserInfo="thePerAllUser" @close="closeAddDot" @success="getSeachInfo"></RelationPer>
  </div>
</template>
<script>
  import { getAuthInfo , getauthTreeInfo , deleteRoleInfo ,getSelectDictInfo } from '@/api/company/permissionManage'
  import {getAllUser} from '../../../api/company/employeeManage'
  import { mapGetters } from 'vuex'
  import AddRole from './addRole'
  import RelationPer from './relationPer'
  import DepMaintain from './depMaintain'
  export default {
    components: {
      AddRole,
      RelationPer,
      DepMaintain
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ])
    },
    created() {
    },
    data() {
      return {
        searchDate: {
          roleName: '',
          id:''
        },
        //加载状态
        btnsize: 'mini',
        loading:true,
        addRelatVisible:false,
        addDoRoleVisible:false,
        addDoTotVisible:false,
        addPeopleVisible:false,
        isModify: false,
        isReference:false,
        formLabelWidth: '120px',
        //表格内容
        selected:[],
        usersArr: [],
        getTreeArr:[],
        // 保存要修改的角色
        theUser: {},
        thePer: {},
        theMentInfo:{},
        thePerAllUser:{},
        //左边树形初始化数据
        getOrgId: '',//根据组织id获取列表
        // 缓存节点数据
        orgInfoCache: {}
      }
    },
    mounted() {
      Promise.all([getSelectDictInfo(this.otherinfo.orgid), this.fetchAllUser(this.otherinfo.orgid)]).then( resArr => {
        this.loading = false
        this.theMentInfo = resArr[0]
        this.thePerAllUser = resArr[1].list
      })

      this.getSeachInfo()
      this.getTreeInfo()
    },
    methods: {
      fetchAllUser (orgid, username, mobilephone) {
        return getAllUser(orgid, username||'', mobilephone||'')
      },
      getSeachInfo(orgid, roleName, pageNum, pagesize){
        if(roleName){
          this.searchDate.roleName = roleName
          getAuthInfo(this.otherinfo.orgid,this.searchDate.roleName).then(res=>{
            this.loading = false
            this.usersArr = res.list
          })
        }else{
          this.loading = false
          getAuthInfo(this.otherinfo.orgid).then(res =>{
            this.usersArr = res.list
          })
        }
      },
      getTreeInfo(){
        if (this.isModify || this.isReference) {
          getauthTreeInfo(this.theUser.id).then( res=> {
            this.loading = false
            this.getTreeArr = res
          })
        }else {
          getauthTreeInfo(0).then(res=>{
            this.loading = false
            this.getTreeArr = res
          })
        }
      },
      seleClick(selected) {
        this.selected = selected
      },
      doAction(type){
        //  判断是否有选中项
        if(!this.selected.length && type !== 'addRole' && type !== 'depMain' && type !== 'deletePeople') {
          this.$message({
            message: '请选择要操作的员工~',
            type: 'warning'
          })
          return false
        }

        switch (type){
          //新增角色
          case 'addRole':
            this.addDoRoleVisible = true
            this.addRelatVisible = false
            this.isModify = false
            this.isReference = false
            this.theUser = {}
            break;
          //修改角色
          case 'roleNot':
            if(this.selected.length > 1){
              this.$message({
                message:'每次只能修改单条数据~',
                type:'warning'
              })
              return false
            }
            this.addDoRoleVisible = true
            this.addRelatVisible = false
            this.isReference = false
            this.isModify = true
            this.theUser = this.selected[0]
            this.getTreeInfo()
            break;
          //  参照isReference
          case 'reference':
            if(this.selected.length > 1){
              this.$message({
                message:'每次只能参照单条数据~',
                type:'warning'
              })
              return false
            }else{
              this.addDoRoleVisible = true
              this.addRelatVisible = false
              this.isModify = false
              this.isReference = true
              this.theUser = this.selected[0]
              this.getTreeInfo()
            }
            break;
          //关联员工
          case 'relationPer':
            if(this.selected.length > 1) {
              this.$message({
                message: '每次只能参照单条数据~',
                type: 'warning'
              })
              return false
            }else{
              this.addRelatVisible = true
              this.addDoRoleVisible = false
              this.isModify = false
              this.isReference = false
              this.thePer = this.selected[0]
            }
            break;
          //    删除员工
          case 'deletePeople':
            this.addDoRoleVisible = false
            this.addRelatVisible = false
            let deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].roleName
            //=>todo 删除多个
            let ids = ''
            this.selected.map(item => {
              ids += item.id + ','
            })
            ids = ids.slice(0, ids.length - 1)
            let id = this.selected[0].id
            this.$confirm('确定要删除 ' + deleteItem + ' 员工吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteRoleInfo(id).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getSeachInfo()
              }).catch(err=>{
                this.$message({
                  type: 'info',
                  message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
                })
              })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
            break;
        }
        // 清除选中状态，避免影响下个操作
        this.$refs.multipleTable.clearSelection()
      },
      //表头筛选
      filterTag(value, row) {
        return row.tag === value
      },
      clickDetails(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      closeAddRole(){
        this.addDoRoleVisible = false
      },
      closeAddDot(){
        this.addRelatVisible = false
      },
      onSubmit() {
        this.getSeachInfo(this.otherinfo.orgid,this.searchDate.roleName)
      }
    }
  }
</script>
<style  type="text/css" lang="scss">
  @import "./index.css";
</style>

