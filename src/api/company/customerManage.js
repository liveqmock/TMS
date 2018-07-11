import fetch from '../../utils/fetch'
import { getToken } from '../../utils/auth'
import { exportWithIframe } from '../../utils/index'

/**
 * 获取收/发货人列表
 * customerType = 1 发货人
 * customerType = 2 收货人
 * @param {object} params 参数列表
========必传参数
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "customerType": 0,
    "orgid": 0
  }
}
===== 其它vo可传参数
vo": {
    "bankCardNumber": "string",
    "bankName": "string",
    "companyName": "string",
    "companyType": 0,
    "createTime": "2018-05-21T08:54:26.838Z",
    "customerId": 0,
    "customerMobile": "string",
    "customerName": "string",
    "customerNum": "string",
    "customerUnit": "string",
    "detailedAddress": "string",
    "fixPhone": "string",
    "idCardPositive": "string",
    "idCardVerso": "string",
    "idcard": "string",
    "idcardPositive": "string",
    "idcardVerso": "string",
    "legalPersonname": "string",
    "licensePicture": "string",
    "openBank": "string",
    "orgName": "string",
    "updateTime": "2018-05-21T08:54:26.838Z",
    "vipNum": "string"
  }
 */
export function getAllCustomer(params) {
  return fetch.post('/api-system/system/customer/v1/customerList', params).then(res => {
    return res.data
  })
}

/**
 * 获取客户信息
 * @param {number} id 客户id
 */
export function getCustomerInfo(id) {
  return fetch.get('/api-system/system/customer/v1/' + id).then(res => {
    return res.data || {}
  })
}

/**
 * 删除客户信息
 * @param {number} id 客户id
 */
export function deleteCustomerInfo(id) {
  return fetch.delete('/api-system/system/customer/v1/' + id)
}
/**
 * 批量删除客户信息
 * @param {string} ids 多个客户id用逗号拼接
 */
export function deleteSomeCustomerInfo(ids) {
  return fetch.post('/api-system/system/customer/v1/bathDelete/?ids=' + ids)
}
/**
 * 根据选中的ids导出对应的excel文件
 * @param {string} ids 多个客户id用逗号拼接
 */
export function getExportExcel(ids) {
  return new Promise((resolve, rejects) => {
    exportWithIframe('/api/api-system/system/customer/v1/export?access_token=' + getToken() + '&ids=' + ids)
    resolve(true)
  })
  // todo => 后端需要返回下载头才能自动下载
  return fetch.get('/api-system/system/customer/v1/export', {
    params: {
      ids
    }
  })
}
/**
 * 添加客户
 * @param {object} info 客户信息
{
  "bankCardNumber": "string",
  "bankName": "string",
  "companyName": "string",
  "companyType": 0,
  "customerId": 0,
  "customerMobile": "string",
  "customerName": "string",
  "customerNum": "string",
  "customerType": 0,
  "customerUnit": "string",
  "detailedAddress": "string",
  "fixPhone": "string",
  "idCardPositive": "string",
  "idCardVerso": "string",
  "idcard": "string",
  "legalPersonname": "string",
  "licensePicture": "string",
  "openBank": "string",
  "orgid": 0,
  "vipNum": "string"
}
 */
export function postCustomer(info) {
  return fetch.post('/api-system/system/customer/v1/save', info)
}
/**
 * 修改客户
 * @param {object} info 客户信息
{
  "bankCardNumber": "string",
  "bankName": "string",
  "companyName": "string",
  "companyType": 0,
  "createTime": "2018-05-22T01:43:50.359Z",
  "customerId": 0,
  "customerMobile": "string",
  "customerName": "string",
  "customerNum": "string",
  "customerType": 0,
  "customerUnit": "string",
  "detailedAddress": "string",
  "fixPhone": "string",
  "idCardPositive": "string",
  "idCardVerso": "string",
  "idcard": "string",
  "legalPersonname": "string",
  "licensePicture": "string",
  "openBank": "string",
  "orgid": 0,
  "updateTime": "2018-05-22T01:43:50.359Z",
  "vipNum": "string"
}
 */
export function putCustomer(info) {
  return fetch.put('/api-system/system/customer/v1/update', info)
}
