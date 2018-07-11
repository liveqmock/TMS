<template>
  <div class="component">
    <h2>上传图片</h2>
    <h4>默认样式</h4>
    <UploadImage v-model="url1" />
    <h4>定义标题</h4>
    <UploadImage  title="法人身份证正面" v-model="url2"  />
    <h4>定义提示</h4>
    <UploadImage  v-model="url3" tip="（有年检章，jpg/png。小于5M）" />
    <h4>定义标题跟提示 + 默认值</h4>
    <UploadImage @success="getUrl" title="法人身份证正面" v-model="url" tip="（有年检章，jpg/png。小于5M）" />
    <p>上传后的链接地址：{{ url }}</p>
    <img :src="url" />

    <h4>展示预览列表</h4>
    <UploadImage @success="getUrl" showFileList :limit="2" listtype="picture" v-model="url4" tip="" />
    <p>上传后的链接地址：{{ JSON.stringify(url4) }}</p>

    <blockquote>
      引用地址：
      components/Upload/singleImage.vue
    </blockquote>
    <h3>prop</h3>
    <ul>
      <li class="info-require">v-model<div class="type">String</div>用来绑定控件的值</li>
      <li>title<div class="type">String</div>标题</li>
      <li>tip<div class="type">String</div>提示信息</li>
      <li>showFileList<div class="type">Boolean</div>是否显示预览图</li>
      <li>limit<div class="type">Number</div>限制上传n张图片</li>
      <li>listtype<div class="type">String</div>展示形式，可取'text', 'picture', 'picture-card' </li>
    </ul>
    <p>注意事项：当showFileList为true时，v-model绑定的值为数组类型或者是以英文逗号分隔的图片链接</p>
    <h3>event</h3>
    <ul>
      <li><div class="function">success</div>返回当前控件的值，如 <pre>
      'xxxx' // 上传后的链接  
      </pre></li>
    </ul>
  </div>
</template>
<script>
import UploadImage from '@/components/Upload/singleImage'

export default {
  components: {
    UploadImage
  },
  data() {
    return {
      url: 'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/JepzficX6twzc2F76MtED8kMC53pxQmH.png',
      url1: '',
      url2: '',
      url3: '',
      url4: ['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100']
    }
  },
  methods: {
    getUrl(url) {
      console.log('upload Url:', url)
    }
  }
}
</script>
