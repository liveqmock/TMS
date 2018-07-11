import fetch from '../../utils/fetch'
/**
 * 短驳发车
 */
export function postAllshortDepartList(params) {
  return fetch.post('/api-order/order/load/v1/selectLoadMainInfoList/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 短驳批量发车
 */
export function putTruckDepart(data) {
  return fetch.put('/api-order/order/load/v1/loadDepart/?loadTypeId=' + data.loadTypeId + '&loadIds=' + data.loadIds)
}
/**
 * 短驳取消发车
 */
export function putTruckChanel(data) {
  return fetch.put('/api-order/order/load/v1/cancelLoadDepart/?loadTypeId=' + data.loadTypeId + '&loadIds=' + data.loadIds)
}
/**
 * 短驳取消装车
 */
export function putTruckLoad(data) {
  return fetch.put('/api-order/order/load/v1/cancelLoadTruck/?loadTypeId=' + data.loadTypeId + '&loadIds=' + data.loadIds)
}
/**
 * 根据配载类型组织机构查询到货列表 38-短驳
 */
export function postLoadList(data) {
  return fetch.post('/api-order/order/load/v1/list/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 根据配载单ID配载类型取消到车
 */
export function postCancelLoad(data) {
  return fetch.post('/api-order/order/load/v1/cancelLoad/' + data.id + '/' + data.loadType)
}
/**
 * 取消入库
 */
export function postCancelPut(data) {
  return fetch.post('/api-order/order/load/v1/cancelPut/' + data.id + '/' + data.loadType)
}
/**
 * 到车入库
 */
export function postAddRepertory(typeId, data) {
  return fetch.post('/api-order/order/load/v1/addRepertory/' + typeId, data)
}
/**
 * 到车确认
 */
export function postConfirmToCar(data) {
  return fetch.post('/api-order/order/load/v1/confirmToCar/' + data.id + '/?typeId=' + data.typeId)
}
