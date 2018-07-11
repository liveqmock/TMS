import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
// cityData
import theCityData from '@/vendor/citydata.min.js'

// Mock.setup({
//   timeout: '350-600'
// })

Mock.mock(/\/getcity/, 'get', (option) => {
  const match = option.url.match(/query=([^&]*)&/)
  const query = decodeURIComponent(match ? match[1] : '').trim().replace(/\+{1,}/g,' ').split(' ')
  let array = []
  array = theCityData.filter(el => {
    return query.every(q => {
      if (el.name.indexOf(q) !== -1 || el.pinyin.toLowerCase().indexOf(q) !== -1) {
        return true
      } else {
        return false
      }
    })
  })

  return {
    status: 200,
    data: array.slice(0, 50)
  }
})

// 登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/tmssystemservice\/system\/user\/v1\//, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/table\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
