<template>
  <pop-right v-loading="loading" title="员工授权" :isShow="popVisible" @close="closeMe" class="setUserAuthPop">
    <template class="setUserAuthPop-content" slot="content">
      <table>
        <thead>
          <tr>
            <th>员工</th>
            <th>权限角色</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user) in myusers" :key="user.username">
            <td>
              {{user.name}}
            </td>
            <td>
              <el-select size="mini" multiple v-model="form.users[user.id]" placeholder="请选择权限" @change="getId(user.id)">
                <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
              </el-select>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm()">保存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { putEmployeerAuth, getAuthInfo } from '../../../api/company/employeeManage'
import popRight from '@/components/PopRight/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    popRight
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    users: {
      type: Array,
      default: []
    }
  },
  computed: {
    ...mapGetters([
        'otherinfo'
    ]),
    myusers () {
      this.form.users = {}
      this.users.map(el => {
        // 需要实现双向绑定
        this.$set(this.form.users, el.id, el.rolesIdList)
      })
      return this.users
    }
  },
  data () {

    return {
      form: {
        rolesId: [], // 权限角色
        users: {}
      },
      loading: false,
      roles: [],
      inited: false
    }
  },
  watch: {
    popVisible (newVal){
      if(!this.inited){
        this.inited = true
        this.initInfo()
      }
    }
  },
  mounted () {
    if(!this.inited){
        this.inited = true
        this.initInfo()
      }
  },
  methods: {
    initInfo () {
      this.loading = true
      return getAuthInfo(this.otherinfo.companyId).then(res => {
        this.roles = res.list
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.inited = false
      })
    },
    submitForm() {
      this.loading = true
      let data = []
      for(let i in this.form.users){
        data.push({
          "id": i,
          "rolesId": this.form.users[i].join(',')
        })
      }
      putEmployeerAuth(data).then(res => {
        this.loading = false
        this.$alert('保存成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.closeMe()
            this.$emit('success')
          }
        });
      }).catch(err => {
        this.loading = false
      })
    },
    closeMe () {
      this.form.users = {}
      this.$emit('update:popVisible', false);
    },
    getId(a,b){
      console.log('change:: ', a, b)
    }
  }
}
</script>
<style lang="scss">
.setUserAuthPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 320px;
  max-width:  320px;

  table{
    width: 100%;
  }

  th,td{
    border: 1px solid #ccc;
    padding: 5px;
    text-align: center;
    font-size: 14px;
  }

  thead{
    th{
      background: #eee;
    }
  }

  .popRight-content{
    padding: 20px 20px 0;
  }

  .el-select .el-input__inner{
    padding-right: 15px;
  }
}
</style>

