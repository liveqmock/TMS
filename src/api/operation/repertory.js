import fecth from '../../utils/fetch'

/**
 * 分页查询库存列表
 */
export function postAllOrderRepertory (params) {
  return fecth.post('/api-order/order/repertory/v1/list', params).then(res => {
  	return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 查询库存颜色设置
 */
 export function getRepertoryColor(id) {
  return fecth.get('/api-system/system/setting/v1/repertory/', {
  	params: {
  		orgid: id
  	}
  })
}
/**
 * 根据ID修改库存颜色
 */
export function putRepertoryColor(data, orgid, id) {
  return fecth.put('/api-system/system/setting/v1/repertory/?id='+ id + '&orgid=' + orgid, data)
}
