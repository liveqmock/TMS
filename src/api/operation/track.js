import fecth from '../../utils/fetch'
/**
 * 在途跟踪干线,短驳,送货列表
 */
export function postTrackList(data) {
  return fecth.post('/api-order/order/track/v1/list/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 在途跟踪中转列表
 */
export function postTransferList(data) {
  return fecth.post('/api-order/order/track/v1/transferList/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 根据ID查询批次跟踪信息
 */
export function getTrackDetail(id) {
  return fecth.get('/api-order/order/track/v1/' + id).then(res => {
    return res.data
  })
}
/**
 * 根据配载ID获取批次跟踪信息
 */
export function getLoadDetail(loadId) {
  return fecth.get('/api-order/order/track/v1/getLoadTrack/' + loadId).then(res => {
    return res.data
  })
}
/**
 * 根据ID删除批次跟踪信息
 */
export function deleteTrack(id) {
  return fecth.delete('/api-order/order/track/v1/' + id).then(res => {
    return res.data
  })
}
/**
 * 插入批次跟踪信息
 */
export function postAddTrack(data) {
  return fecth.post('/api-order/order/track/v1/insertTrack/', data).then(res => {
    return res.data
  })
}
/**
 * 根据ID修改批次跟踪信息
 */
export function putUpdateTrack(data) {
  return fecth.put('/api-order/order/track/v1/updateById/', data).then(res => {
    return res.data
  })
}
/**
 * 
 */
export function getSelectLoadList(loadId) {
  return fecth.get('/api-order/order/load/v1/selectLoadDetailList/?loadId=' + loadId).then(res => {
    return res.data
  })
}
/**
 * 根据配载ID获取批次跟踪信息
 */
export function getLoadTrack(loadId) {
  return fecth.get('/api-order/order/track/v1/getLoadTrack/' + loadId).then(res => {
    return res.data
  })
}
/**
 * 根据中转ID获取批次跟踪信息
 */
export function getTransferTrack(transferId) {
  return fecth.get('/api-order/order/track/v1/getTransferTrack/' + transferId).then(res => {
    return res.data
  })
}
