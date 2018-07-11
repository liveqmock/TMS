# 项目说明

> 本项目搭建于 `vue-element-admin` 基础上，目前项目对应的gitlab分别存在三个分支

 - master 主仓库，用来保存发布代码，对应线上分支
 - test 测试仓库，用来本地测试，对应内部测试地址
 - release 用来保存版本，每迭代一个较大更新则保存一次

 各项目成员clone代码后需要自行创建本地的开发分支，本地联调功能确认无误后合并到test分支再推送

## 地址
 - 线上地址 *****
 - 测试地址 *****

## 开发

``` bash

# Clone project
git clone http://192.168.1.157:8889/nanedo/anfa-tms.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 项目目录结构
```bash

├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 其他

### 项目模版相关文档内容

- [在线访问](http://panjiachen.github.io/vue-element-admin)

- [使用文档](https://panjiachen.github.io/vue-element-admin-site/#/zh-cn/)

- [Gitter讨论组](https://gitter.im/vue-element-admin/discuss)

- [Wiki](https://github.com/PanJiaChen/vue-element-admin/wiki)