<template>
  <!--v-loading="loading"-->
  <div class="company clearfix" >
    <div class="company-box">
      <div class="side_left">
        <el-tree
          :data="dataTree"
          node-key="id"
          :default-expanded-keys="[1]"
          :props="defaultProps"
          ref="tree"
          @node-click="getCheckedKeys"
        >
        </el-tree>
      </div>

      <div class="side_right">
        <el-collapse accordion change="doLayout">
          <el-collapse-item>
            <div class="side_right_top">
              <el-form :model="form" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
                <el-form-item label="网点名称" :label-width="formLabelWidth" >
                  <el-input v-model="form.orgName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="网点类型" :label-width="formLabelWidth">
                  <el-input :value='form.orgType ==="1" ? "营业网点" : "分拨中心"' disabled></el-input>
                </el-form-item>
                <el-form-item label="网点状态" :label-width="formLabelWidth" disabled="disabled">
                  <el-input :value='form.status ==="32" ? "有效" : "有效"' disabled></el-input>
                </el-form-item>
                <el-form-item label="客服人员" :label-width="formLabelWidth" >
                  <el-input v-model="form.serviceName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="客服电话" :label-width="formLabelWidth" >
                  <el-input v-model="form.servicePhone" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="上级网点" :label-width="formLabelWidth">
                  <el-input :value="form.parentName || form.orgName" disabled></el-input>
                </el-form-item>
                <el-form-item label="经营类型" :label-width="formLabelWidth">
                  <el-input :value='form.manageType ==="3" ? "自营" : "加盟"' disabled></el-input>
                </el-form-item>
                <el-form-item label="创建时间" :label-width="formLabelWidth" >
                  <!--<el-input :value="new Date(form.createTime).toLocaleString()" disabled></el-input>-->
                 <el-input :value=" form.createTime| parseTime('{y}/{m}/{d}')" disabled></el-input>
                </el-form-item>
                <el-form-item label="网点代码" :label-width="formLabelWidth" >
                  <el-input v-model="form.networkCode" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="代收款限额" :label-width="formLabelWidth">
                  <el-input v-model="form.collectionFee" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="负责人" :label-width="formLabelWidth" >
                  <el-input v-model="form.responsibleName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="负责人电话" :label-width="formLabelWidth" >
                  <el-input  v-model="form.responsibleTelephone"  auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="所在城市" :label-width="formLabelWidth">
                  <el-input v-model="form.city" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="锁机额度" :label-width="formLabelWidth">
                  <el-input v-model="form.lockMachineQuota" auto-complete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="预警额度" :label-width="formLabelWidth">
                  <el-input v-model="form.warningQuota" auto-complete="off" disabled></el-input>
                </el-form-item>


              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>


        <div class="side_right_bottom clearfix">
          <!--表格功能-->
          <div class="btns_box_lrl clearfix">
            <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('addPeople')">新增员工</el-button><el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('deletePeople')" plain>删除员工</el-button><el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modifyNot')" plain>修改网点</el-button><el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" @click="doAction('addNot')" plain>新增网点</el-button><el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('depMain')" plain>部门维护</el-button>
            <el-col class="org-name"> <p>{{form.orgName}}</p></el-col>
            <!--表格功能-->
          </div>
          <!--表格功能-->
          <!--表格内容-->
          <div class="info_news">

            <el-table
              ref="multipleTable"
              :data="usersArr"
              stripe
              border
              tooltip-effect="dark"
              height="100%"
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
                width="60"
                label="序号">
              </el-table-column>
              <el-table-column
                fixed
                prop="name"
                width="150"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="orgName"
                width="150"
                label="归属网点">
              </el-table-column>
              <el-table-column
                prop="departmentName"
                width="150"
                label="归属部门">
              </el-table-column>
              <el-table-column
                prop="position"
                width="150"
                label="职务">
              </el-table-column>
              <el-table-column
                prop="username"
                width="150"
                label="登录账号">
              </el-table-column>
              <el-table-column
                width="200"
                label="权限角色">
                <template slot-scope="scope">
                  <span v-if="scope.row.rolesId !== '0'">{{ scope.row.rolesName }}</span>
                  <span class="unauth" v-else>未授权</span>
                </template>
              </el-table-column>
              <el-table-column
                label="性别"
                width="80">
                <template slot-scope="scope">
                  {{ scope.row.sexFlag === "0" ? "男" : "女" }}
                </template>
              </el-table-column>
              <el-table-column
                prop="mobilephone"
                label="联系手机"
                >
              </el-table-column>
            </el-table>
          </div>
          <!--表格内容-->

        </div>
      </div>
      <AddDot :dotInfo="form" :orgid="getOrgId || otherinfo.orgid" :companyId="otherinfo.companyId" :isModify="isModify" @success="fetchOrg(getOrgId)" :popVisible="addDoTotVisible" @close="closeAddDot" />
       <AddPeople :popVisible.sync="addPeopleVisible" @close="closeAddPeople" :orgid="getOrgId || otherinfo.orgid" @success="fetchOrgId(getOrgId)" />
      <DepMaintain :popVisible.sync="addDepMaintainisible" :isDepMain="isDepMain" :dotInfo="usersArr" @close="closeDep" :createrId ="otherinfo.orgid"></DepMaintain>
    </div>
    <div class="info_news_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
  </div>
</template>
<script type="text/javascript">
    import AddPeople from '../employeeManage/add'
    import AddDot from './addDot'
    import DepMaintain from './depMaintain'
    import { getOrgId } from '../../../api/company/groupManage'
    import { getAllOrgInfo, getAllUser, deleteEmployeer } from '../../../api/company/employeeManage'

    import { mapGetters } from 'vuex'
    import Pager from '@/components/Pagination/index'
    import { getUserInfo } from '../../../utils/auth'

export default {
      components: {
        AddDot,
        AddPeople,
        Pager,
        DepMaintain
      },
      computed: {
        ...mapGetters([
          'otherinfo'
        ])
      },
      data() {
        return {
          btnsize: 'mini',
              // 加载状态
          loading: true,
          addDoTotVisible: false,
          addPeopleVisible: false,
          addDepMaintainisible: false,
          hiddenDep: false,
          isDepMain: false,
          usersArr: [],
          total: 0,
          orgName: '',
              //
          isModify: false,
              // 新建网点
          ruleForm: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          formLabelWidth: '120px',
                // 表格内容
          selected: [],
                // 左边树形初始化数据
          dataTree: [],
          defaultProps: {
            children: 'children',
            label: 'name'
          },
                // 左边树形初始化数据
          getOrgId: '', // 根据组织id获取列表
          form: {
            orgName: '',
            orgType: 1,
            status: 32,
            responsibleTelephone: '',
                  // creatTime:'',
            responsibleName: '',
            city: '',
            serviceName: '',
            parentName: '', // 上级网点
            servicePhone: '',
            detailedAddr: '',
            networkCode: '', // 网点代码
            collectionFee: '', // 代收款额度
            benchmark: '',
            warningQuota: '',
            lockMachineQuota: '',
            manageType: 3,
            remarks: '',
                  // 默认值
            accountStatus: '0',
            parentId: 0

          },
                  // 缓存节点数据
          orgInfoCache: {},
          userinfo: {}
        }
      },
      mounted() {
        this.fetchOrg()// 左边树形数据
          // 部门维护
        this.userinfo = getUserInfo()
        if (this.userinfo.companyId === this.userinfo.orgid) {
          this.hiddenDep = true
        }
        //  部门维护
      },
      methods: {
          // 左边树形数据
        fetchOrg() {
          getAllOrgInfo(this.otherinfo.orgid).then(data => {
            this.dataTree = data
            this.fetchOrgId(this.dataTree[0].id)// 根据组织id显示列表
          })
        },
          // 处理返回的节点数据
        handleOrgInfo(data) {
          this.form = data
        },
          // 根据组织id显示列表
        fetchOrgId(id) {
          this.getOrgId = parseInt(id, 10)
          this.fetchAllUsers(id)
          if (this.orgInfoCache[id]) {
            this.handleOrgInfo(this.orgInfoCache[id])
          } else {
            getOrgId(id).then(res => {
              this.orgInfoCache[id] = res.data
              this.handleOrgInfo(res.data)
            })
          }
        },
        fetchAllUsers(orgid, name = '', mobile = '', pageSize = 100, pageNum = 1) {
          getAllUser(orgid, name, mobile, pageSize, pageNum).then(res => {
            this.usersArr = res.list
            this.total = res.total
          })
        },
        seleClick(selected) {
          this.selected = selected
        },
        doAction(type) {
          //  判断是否有选中项
          if (!this.selected.length && type === 'deletePeople') {
            this.$message({
              message: '请选择要操作的员工~',
              type: 'warning'
            })
            return false
          }
          switch (type) {
                // 新增员工
            case 'addPeople':
              this.addPeopleVisible = true
              this.addDoTotVisible = false
              this.addDepMaintainisible = false
              this.isModify = false
              this.isDepMain = false
              break
          //  新增网点
            case 'addNot':
              this.isModify = false
              this.isDepMain = false
              this.addDoTotVisible = true
              this.addPeopleVisible = false
              this.addDepMaintainisible = false
              break
          // 修改网点
            case 'modifyNot':
              this.isModify = true
              this.isDepMain = false
              this.addDoTotVisible = true
              break
          //  部门维护
            case 'depMain':
              this.isModify = false
              this.isDepMain = true
              this.addDepMaintainisible = true
              this.addDoTotVisible = false
              this.addPeopleVisible = false
              break
        //    删除员工
            case 'deletePeople':
              this.addDepMaintainisible = false
              this.addDoTotVisible = false
              this.addPeopleVisible = false
              var deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].name
                // =>todo 删除多个
              var ids = ''
              this.selected.map(item => {
                ids += item.id + ','
              })
              ids = ids.slice(0, ids.length - 1)

              // var id = this.selected[0].id
              this.$confirm('确定要删除 ' + deleteItem + ' 员工吗？', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                deleteEmployeer(ids).then(res => {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  this.fetchOrgId(this.getOrgId)
                }).catch(err => {
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
              break

          }
        },
          // 表头筛选
        filterTag(value, row) {
          return row.tag === value
        },
        getCheckedKeys() {
          this.fetchOrgId(this.$refs.tree._data.currentNode.node.data.id)// 根据组织id显示列表
        },
          // 新增网点
        closeAddDot() {
          this.addDoTotVisible = false
        },
        closeAddPeople() {
          this.addPeopleVisible = false
        },
        closeDep() {
          this.addDepMaintainisible = false
        },
        handlePageChange(obj) {
          this.fetchAllUsers(this.getOrgId, '', '', obj.pageSize, obj.pageNum)
        },
        doLayout() {
          this.$refs.multipleTable.doLayout()
        },
        clickDetails(row, event, column) {
          this.$refs.multipleTable.toggleRowSelection(row)
        }
      }
    }
</script>

<style type="text/css" lang="scss">
  @import "../../../styles/mixin.scss";
  @import "./index.css";
</style>
