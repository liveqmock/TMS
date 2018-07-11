import fetch from '../../utils/fetch'

/**
 * order/load/v1/list
 *根据配载类型组织机构查询到货列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export function postArtList(params) {
  return fetch.post('/api-order/order/load/v1/list/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 查询配载主信息及费用记录列表 shang
 * http://localhost:7010/api-order/order/load/v1/selectLoadMainInfoList
 * @param orgid
 * @returns {AxiosPromise<any>}
 */
export function postSelectLoadMainInfoList(params) {
  return fetch.post('/api-order/order/load/v1/selectLoadMainInfoList/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * /order/load/v1/addRepertory/{typeId}
 /到车入库
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function postAddRepertory(typeId, params) {
  return fetch.post('/api-order/order/load/v1/addRepertory/' + typeId, params).then(res => {
    return res.data || {}
  })
}

/**
 * order/load/v1/confirmToCar/{id}
 // /confirmToCar/{id}
 * 配载单到车确认(typeId等于49为短驳到车确认，等于54为干线到车确认)
 * Name	Description
 id *
 integer
 (path)
 id

 typeId *
 integer
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function postConfirmToCar(id, typeId) {
  return fetch.post('/api-order/order/load/v1/confirmToCar/ ' + id + '?&typeId=' + typeId).then(res => {
    return res.data || {}
  })
}

/**
 * /order/load/v1/cancelLoad/{id}/{loadType}
 * // 根据配载单ID配载类型取消到车
 * @param id
 * @param loadTypeId
 * @returns {AxiosPromise<any>}
 */
export function postCancelLoad(id, loadTypeId) {
  return fetch.post('/api-order/order/load/v1/cancelLoad/' + id + '/' + loadTypeId)
}

/** order/load/v1/cancelPut/{id}/{loadType}
 * 根据配载单ID配载类型取消入库
 * @param id
 * @param loadTypeId
 * @returns {AxiosPromise<any>}
 */
export function postCancelPut(id, loadTypeId) {
  return fetch.post('/api-order/order/load/v1/cancelPut/' + id + '/' + loadTypeId)
}

/**
 * order/load/v1/getBatchNo
 * 获得配载批次号
 * @returns {AxiosPromise<any>}
 */
export function getBatchNoId(orgid, loadTypeId) {
  return fetch.get('/api-order/order/load/v1/getBatchNo/?orgId=' + orgid + '&loadTypeId=' + loadTypeId)
}
/**
 * 取消送货
 */
export function putDeliveyLoad(data) {
  return fetch.put('/api-order/order/load/v1/cancelLoadTruck/?loadTypeId=' + data.loadTypeId + '&loadIds=' + data.loadIds)
}
