import fetch from '../../utils/fetch'
/**
 * order/load/v1/list
 *根据配载类型组织机构查询到货列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export function postSelectLoadMainInfoList(params) {
  return fetch.post('/api-order/order/load/v1/selectLoadMainInfoList', params).then(res => {
    return res.data || {}
  })
}
/**
 * order/load/v1/loadDepart
 * 配载发车(批量)
 * @param id
 * @param loadTypeId
 * @returns {AxiosPromise<any>}
 */
export function putLoadDepart(loadIds, loadTypeId) {
  return fetch.put('/api-order/order/load/v1/loadDepart?loadIds=' + loadIds + '&loadTypeId=' + loadTypeId)
}
/**
 * /order/load/v1/cancelLoadTruck
 取消装车(批量)
 * @param id
 * @param loadTypeId
 * @returns {AxiosPromise<any>}
 */
export function putCancelLoadTruck(loadIds, loadTypeId) {
  return fetch.put('/api-order/order/load/v1/cancelLoadTruck?loadIds=' + loadIds + '&loadTypeId=' + loadTypeId)
}
/**
 * /order/load/v1/cancelLoadTruck
 /order/load/v1/cancelLoadDepart
 取消配载发车(批量)
 * @param id
 * @param loadTypeId
 * @returns {AxiosPromise<any>}
 */
export function putCancelLoadDepart(loadIds, loadTypeId) {
  return fetch.put('/api-order/order/load/v1/cancelLoadDepart?loadIds=' + loadIds + '&loadTypeId=' + loadTypeId)
}
