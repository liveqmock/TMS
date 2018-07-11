import fetch from '@/utils/fetch'
import { getToken } from '@/utils/auth'
import { exportWithIframe } from '@/utils/index'

/**
 * 根据条件获取承运商列表
 * @param {object} params 参数列表
========必传参数
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "orgid": 0
  }
}
===== 其它vo可传参数
"vo": {
    "carrierAddr": "string",
    "carrierId": 0,
    "carrierMobile": "string",
    "carrierName": "string",
    "carrierRemarks": "string",
    "carrierSn": "string",
    "contractEndtime": "2018-05-22T01:48:51.730Z",
    "contractStarttime": "2018-05-22T01:48:51.730Z",
    "CarrierServicePhone": "string",
    "liableName": "string",
    "liablePhone": "string",
    "orgName": "string"
  }
 */
export function getAllCarrier(params) {
  return fetch.post('/api-system/system/carrier/v1/list', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 获取承运商信息
 * @param {number} id 承运商id
 */
export function getCarrierInfo(id) {
  return fetch.get('/api-system/system/carrier/v1/' + id).then(res => {
    return res.data || {}
  })
}

/**
 * 删除承运商信息
 * @param {number} id 承运商id
 */
export function deleteCarrierInfo(id) {
  return fetch.delete('/api-system/system/carrier/v1/delete/' + id)
}
/**
 * 根据ids批量删除承运商
 * @param {array} ids 多个承运商id用逗号分隔
 */
export function deleteSomeCarrierInfo(ids) {
  return fetch.post('/api-system/system/carrier/v1/bathDelete/?ids=' + ids)
}
/**
 * 根据选中的ids导出对应的excel文件
 * @param {array} ids 多个承运商id用数组
 */
export function getExportExcel(ids) {
  return new Promise((resolve, rejects) => {
    exportWithIframe('/api/api-system/system/carrier/v1/exportCarrier?access_token=' + getToken() + '&ids=' + ids)
    resolve(true)
  })
  return fetch.post('/api-system/system/carrier/v1/exportCarrier', ids)
}
/**
 * 添加承运商
 * @param {object} info 承运商信息
{
  "carrierAddr": "string",
  "carrierMobile": "string",
  "carrierName": "string",
  "carrierRemarks": "string",
  "carrierSn": "string",
  "contractEndtime": "2018-05-22T01:53:28.670Z",
  "contractStarttime": "2018-05-22T01:53:28.670Z",
  "customerServicePhone": "string",
  "liableName": "string",
  "liablePhone": "string",
  "orgid": 0
}
 */
export function postCarrier(info) {
  return fetch.post('/api-system/system/carrier/v1/add', info)
}
/**
 * 修改承运商
 * @param {object} info 承运商信息
{
  "carrierAddr": "string",
  "carrierId": 0,
  "carrierMobile": "string",
  "carrierName": "string",
  "carrierRemarks": "string",
  "carrierSn": "string",
  "contractEndtime": "2018-05-22T01:57:44.318Z",
  "contractStarttime": "2018-05-22T01:57:44.318Z",
  "customerServicePhone": "string",
  "liableName": "string",
  "liablePhone": "string",
  "orgid": 0
}
 */
export function putCarrier(info) {
  return fetch.put('/api-system/system/carrier/v1/update', info)
}
