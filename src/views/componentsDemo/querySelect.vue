<template>
  <div class="component">
    <h2>获取各种列表</h2>
    
    <blockquote>
      引用地址：
      components/querySelect/index.vue
    </blockquote>

    <querySelect search="name" label="name"  :name="city" @change="getcity" />

    <pre class="code">&lt;querySelect search=&quot;name&quot; label=&quot;name&quot;  :name=&quot;city&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>搜索手机号码 + slot显示名字 {{val}}</h4>
    <querySelect v-model="val" valuekey="mobilephone" search="mobilephone" label="mobilephone" @change="getcity" >
      <template slot-scope="{ item }">
        {{ item.name }} : {{ item.mobilephone }}
      </template>
    </querySelect>
    <pre class="code">&lt;querySelect v-model=&quot;val&quot; valuekey=&quot;mobilephone&quot; search=&quot;mobilephone&quot; label=&quot;mobilephone&quot; @change=&quot;getcity&quot; &gt;
      &lt;template slot-scope=&quot;{ item }&quot;&gt;
        \{\{ item.name }} : \{\{ item.mobilephone }}
      &lt;/template&gt;
    &lt;/querySelect&gt;</pre>

    <h4>每次都请求服务器</h4>
    <querySelect search="name" label="name" :name="city" @change="getcity" :remote="true" />
    <pre class="code">&lt;querySelect search=&quot;name&quot; label=&quot;name&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; :remote=&quot;true&quot; /&gt;</pre>

    <h4>用select框展示</h4>
    <querySelect search="name" label="name" :name="city" @change="getcity" show="select" />
    <pre class="code">&lt;querySelect search=&quot;name&quot; label=&quot;name&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; show=&quot;select&quot; /&gt;</pre>

    <h4>用select框展示 + 每次都请求</h4>
    <querySelect search="name" label="name" :name="city" @change="getcity" :remote="true" show="select" />
    <pre class="code">&lt;querySelect search=&quot;name&quot; label=&quot;name&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; :remote=&quot;true&quot; show=&quot;select&quot; /&gt;</pre>

    <h4>用select框展示 + slot替换展示元素</h4>
    <p style="color:#f00;">需指定slot位置，如remote为false时，设置为 select； 如remote为true时，设置为 select-remote</p>
    <querySelect search="name" label="name" :name="city" @change="getcity" show="select" >
      <template slot="select" slot-scope="{item}">
        {{ item.name }} : {{ item.mobilephone }}
      </template>
    </querySelect>
    <pre class="code">&lt;querySelect search=&quot;name&quot; label=&quot;name&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; show=&quot;select&quot; &gt;
      &lt;template slot=&quot;select&quot; slot-scope=&quot;{item}&quot;&gt;
        \{\{ item.name }} : \{\{ item.mobilephone }}
      &lt;/template&gt;
    &lt;/querySelect&gt;</pre>

    <h4>用select框展示 + slot替换展示元素 + 每次都请求</h4>
    <querySelect search="name" label="name" :name="city" @change="getcity" :remote="true" show="select" >
      <template slot="select-remote" slot-scope="{item}">
        {{ item.name }} : {{ item.mobilephone }}
      </template>
    </querySelect>
    <pre class="code">&lt;querySelect search=&quot;name&quot; label=&quot;name&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; :remote=&quot;true&quot; show=&quot;select&quot; &gt;
      &lt;template slot=&quot;select-remote&quot; slot-scope=&quot;{item}&quot;&gt;
        \{\{ item.name }} : \{\{ item.mobilephone }}
      &lt;/template&gt;
    &lt;/querySelect&gt;</pre>

    <h4>获取城市</h4>
    <querySelect search="name" type="city" label="longAddr" :name="city" @change="getcity" :remote="true" />
    <pre class="code">&lt;querySelect search=&quot;name&quot; type=&quot;city&quot; label=&quot;longAddr&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; :remote=&quot;true&quot; /&gt;</pre>

    <h4>获取承运商</h4>
    <querySelect search="carrierName" type="carrier" label="carrierName" :name="city" @change="getcity" :remote="true" />
    <pre class="code">&lt;querySelect search=&quot;carrierName&quot; type=&quot;carrier&quot; label=&quot;carrierName&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; :remote=&quot;true&quot; /&gt;</pre>

    <h4>获取司机</h4>
    <querySelect search="driverName" type="driver" label="driverName" :name="city" @change="getcity" :remote="true" />
    <pre class="code">&lt;querySelect search=&quot;driverName&quot; type=&quot;driver&quot; label=&quot;driverName&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; :remote=&quot;true&quot; /&gt;</pre>

    <h4>获取发货人</h4>
    <querySelect search="customerName" type="sender" label="customerName" :name="city" @change="getcity" :remote="true" />
    <pre class="code">&lt;querySelect search=&quot;customerName&quot; type=&quot;sender&quot; label=&quot;customerName&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; :remote=&quot;true&quot; /&gt;</pre>

    <h4>获取收货人的手机号码: {{ receiver }}</h4>
    <querySelect search="customerMobile" v-model="receiver" type="receiver" label="customerName" :name="city" valuekey="customerId" @change="getcity" >
    <template slot-scope="{item}">
        {{ item.customerName }} : {{ item.customerMobile }}
      </template>
    </querySelect>
    <pre class="code">&lt;querySelect search=&quot;customerMobile&quot; v-model=&quot;receiver&quot; type=&quot;receiver&quot; label=&quot;customerName&quot; :name=&quot;city&quot; valuekey=&quot;customerId&quot; @change=&quot;getcity&quot; &gt;
    &lt;template slot-scope=&quot;{item}&quot;&gt;
        \{\{ item.customerName }} : \{\{ item.customerMobile }}
      &lt;/template&gt;
    &lt;/querySelect&gt;</pre>

    <h4>获取收货人的id + 自定义的搜索过滤函数</h4>
    <p>目前组件内默认的搜索过滤是当作字符串处理，使用indexOf模糊匹配。<br>如有特殊需求，如数值全等于判断、布尔值判断等，可以通过传搜索函数进行自定义的过滤处理。</p>
    <querySelect search="customerMobile" :searchFn="findId" v-model="receiver" type="receiver" label="customerName" :name="city" valuekey="customerId" @change="getcity" >
    <template slot-scope="{item}">
        {{ item.customerName }} : {{ item.customerMobile }}
      </template>
    </querySelect>
    <pre class="code">&lt;querySelect search=&quot;customerMobile&quot; :searchFn=&quot;findId&quot; v-model=&quot;receiver&quot; type=&quot;receiver&quot; label=&quot;customerName&quot; :name=&quot;city&quot; valuekey=&quot;customerId&quot; @change=&quot;getcity&quot; &gt;
    &lt;template slot-scope=&quot;{item}&quot;&gt;
        \{\{ item.customerName }} : \{\{ item.customerMobile }}
      &lt;/template&gt;
    &lt;/querySelect&gt;</pre>

    <h4>获取司机</h4>
    <querySelect search="driverName" type="driver" :name="city" @change="getcity" :remote="true" />
    <pre class="code">&lt;querySelect search=&quot;driverName&quot; type=&quot;driver&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; :remote=&quot;true&quot; /&gt;</pre>

    <h4>获取车辆</h4>
    <querySelect search="truckIdNumber" type="trunk" :name="city" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;truckIdNumber&quot; type=&quot;trunk&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取异常列表</h4>
    <querySelect search="abnormalNo" type="abnormal" :name="city" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;abnormalNo&quot; type=&quot;abnormal&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取控货列表</h4>
    <querySelect search="shipGoodsSn" type="controlgoods" :name="city" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;shipGoodsSn&quot; type=&quot;controlgoods&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取订单列表</h4>
    <querySelect search="orderSn" type="preorder" :name="city" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;orderSn&quot; type=&quot;preorder&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取运单列表</h4>
    <querySelect search="shipSn" type="order" :name="city" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;shipSn&quot; type=&quot;order&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取提货单列表</h4>
    <querySelect search="pickupBatchNumber" type="pickup" :name="city" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;pickupBatchNumber&quot; type=&quot;pickup&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取回单列表</h4>
    <querySelect search="acceptStatusName" type="receipt" :name="city" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;acceptStatusName&quot; type=&quot;receipt&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取回单 寄出 列表</h4>
    <querySelect search="sendStatusName" type="receipt" :name="city" @change="getcity" :param="{'pageType': 2}" />
    <pre class="code">&lt;querySelect search=&quot;sendStatusName&quot; type=&quot;receipt&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; :param=&quot;{&#x27;pageType&#x27;: 2}&quot; /&gt;</pre>

    <h4>获取库存列表</h4>
    <querySelect search="cargoName" type="repertory" :name="city" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;cargoName&quot; type=&quot;repertory&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取批次列表</h4>
    <querySelect search="batchNumber" valuekey="bathId" show="select" type="batch" :name="city" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;batchNumber&quot; valuekey=&quot;bathId&quot; show=&quot;select&quot; type=&quot;batch&quot; :name=&quot;city&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取货品名称</h4>
    <querySelect search="value" :remote="true" valuekey="value" type="cargoName" />
    <pre class="code">&lt;querySelect search=&quot;value&quot; valuekey=&quot;value&quot; type=&quot;cargoName&quot;  /&gt;</pre>

    <h4>获取货品包装</h4>
    <querySelect search="value" valuekey="value" type="cargoPack" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;value&quot; valuekey=&quot;value&quot; type=&quot;cargoPack&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取备注列表</h4>
    <querySelect search="value" valuekey="value" type="remark" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;value&quot; valuekey=&quot;value&quot; type=&quot;remark&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取收支方式</h4>
    <querySelect search="financialWay" valuekey="financialWay" type="payway" @change="getcity" />
    <pre class="code">&lt;querySelect search=&quot;financialWay&quot; valuekey=&quot;financialWay&quot; type=&quot;payway&quot; @change=&quot;getcity&quot; /&gt;</pre>

    <h4>获取最近出发城市</h4>
    <querySelect search="value" :remote="true" valuekey="value" type="fromcity" />
    <pre class="code">&lt;querySelect search=&quot;value&quot; valuekey=&quot;value&quot; type=&quot;fromcity&quot;  /&gt;</pre>

    <h4>获取最近到达城市</h4>
    <querySelect search="value" :remote="true" valuekey="value" type="tocity" />
    <pre class="code">&lt;querySelect search=&quot;value&quot; valuekey=&quot;value&quot; type=&quot;tocity&quot;  /&gt;</pre>


    <hr>
    <h2>带初始值的示例</h2>
    <querySelect search="value" v-model="city2" :remote="true" valuekey="value" type="tocity" />
    <pre class="code">&lt;querySelect search=&quot;value&quot; valuekey=&quot;value&quot; type=&quot;tocity&quot;  /&gt;</pre>
    <h4>valuekey跟显示字段不一致的回显</h4>
    <querySelect search="driverName" type="driver" v-model="driver" @change="getdriver" :remote="true" />
  <br>
    <querySelect search="driverName" type="driver" name="张晓吉" v-model="driver2" @change="getdriver" :remote="true" />
    <br>
    <querySelect search="longAddr" @change="selectFromCity" :name="fromCityName" type="city" :getinput="true"  v-model="city3" :remote="true" />


    <h3>prop</h3>
    <hr>
    <ul>
      <li class="info-require">type<div class="type">  String</div>搜索的表格，默认搜用户列表数据 user</li>
      <li>v-model<div class="type">  [String, Number, Object]</div>用来绑定值，获取由 valuekey 指定的字段值</li>
      <li>label<div class="type">  String</div>指定控件里要显示的字段值，如果不设置则取search指定的值</li>
      <li>search<div class="type">  String</div>搜索匹配的字段</li>
      <li>count<div class="type">  Number</div>请求多少条数据, 默认100</li>
      <li>valuekey<div class="type">  String</div>指定需要获得的value对应的字段，默认 id</li>
      <li>show<div class="type">  String</div>控件展示形式 可取 input  select， 默认input</li>
      <li>remote<div class="type">  Boolean</div>是否每次搜索都请求数据，默认 false</li>
      <li>name<div class="type">  String</div>用来初次显示在输入框的值</li>
      <li>orgid<div class="type">  [String, Number]</div>网点id，不传就获取当前用户的组织id</li>
      <li>param<div class="type">  Object</div>额外的请求参数，用来合并到vo中</li>
      <li>searchFn<div class="type">  Function</div>自定义的搜索函数，传入的参数为当前项，函数执行需返回true/false</li>
      <li>nochangeparam<div class="type">  Boolean</div>是否需要处理参数，默认false</li>
      <li>filterable<div class="type">  Boolean</div>select是否开启搜索，默认为true</li>
      <li>popClass<div class="type">  String</div>弹窗的自定义样式类名，方便控制下拉框里的样式</li>
    </ul>

    <h3>event</h3>
    <hr>
    <ul>
      <li><div class="function">change</div>返回当前选择的项 </li>
    </ul>

    <h3>type的取值</h3>
<hr>
    <ul>
      <li>user 用户列表</li>
      <li>city 城市名</li>
      <li>carrier 承运商</li>
      <li>sender 发货人</li>
      <li>receiver 收货人</li>
      <li>driver 司机</li>
      <li>trunk 车辆</li>
      <li>abnormal 异常</li>
      <li>controlgoods 控货</li>
      <li>preorder 订单</li>
      <li>order 运单</li>
      <li>pickup 提货</li>
      <li>receipt 回单</li>
      <li>repertory 库存</li>
      <li>batch 获取批次列表</li>
      <li>cargoName 获取货品名称</li>
      <li>cargoPack 获取货品包装</li>
      <li>fromcity 获取最近出发城市</li>
      <li>tocity 获取最近到达城市</li>
      <li>remark 获取备注列表</li>
      <li>payway 获取收支方式</li>
    </ul>
  </div>
</template>
<script>
import querySelect from '@/components/querySelect/index'
export default {
  components: {
    querySelect
  },
  data() {
    return {
      city: '',
      city2: '',
      val: '',
      receiver: '',
      driver: 4,
      driver2: '',
      city3: '',
      fromCityName: ''
    }
  },
  watch: {
    city3(ne) {
      console.log('city3 change:', ne)
    }
  },
  mounted() {
    setTimeout(() => {
      // this.city2 = '广州'
      this.driver = 5
    }, 5000)
  },
  methods: {
    selectFromCity(item, city) {
      console.log('selectFromCity:', item, city)
      console.log('this.city3:', this.city3)
    },
    getdriver(obj) {
      console.log('driver:', obj)
      console.log('driver2:', this.driver2)
    },
    getcity(obj) {
      // {
      //   pageNum: 1,
      //   pageSize: 100
      // }
      console.log('pagenation', obj)
      this.city = obj.longAddr
    },
    findId(el, query) {
      return el.customerId.toString() === query
    }
  }
}
</script>
<style>
h4{
  margin-top: 20px;
}
.code{
  border: 1px dashed #ccc;
  background: #eee;
  margin: 20px 0;
  padding: 10px;
  color:#666;
}
</style>
