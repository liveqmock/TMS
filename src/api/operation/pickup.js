import fetch from '../../utils/fetch'

/** 提货单列表
 * getPostlist
 * @returns {Promise<AxiosResponse<any>>}
 */

export function fetchPostlist(params) {
  return fetch.post('/api-order/order/pickup/v1/list', params).then(res => {
    return res.data || {}
  })
}

/**
 * 自动获取提货批次
 * @returns {AxiosPromise<any>}
 */

export function fetchGetPickUp() {
  return fetch.get('/api-order/order/pickup/v1/getPickupBatch')
}

/**
 * /order/pickup/v1/
 新增提货单
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function postAddPickup(params) {
  return fetch.post('/api-order/order/pickup/v1/', params).then(res => {
    return res.data || {}
  })
}
/**
 * /order/pickup/v1/update
 修改提货单
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function putUpdatePickup(params) {
  return fetch.put('/api-order/order/pickup/v1/update/', params).then(res => {
    return res.data || {}
  })
}

/**
 * /order/pickup/v1/batchDelete
 根据ids批量删除
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */

export function deletebatchDelete(ids) {
  return fetch.delete('/api-order/order/pickup/v1/batchDelete/?ids=' + ids)
}

/**
 * /order/pickup/v1/relevancyShip
 提货单关联运单号加入列表
 */
export function putRelevancyShip(pickupId,shipId,pickupFee) {
  return fetch.put('/api-order/order/pickup/v1/relevancyShip/?pickupId=' + pickupId + '&shipId=' + shipId + '&pickupFee=' + pickupFee)
}
/**
 * /order/pickup/v1/removeShip
 提货单关联运单号从列表移除
 */
export function putRremoveShip(pickupId,shipId) {
  return fetch.put('/api-order/order/pickup/v1/removeShip/?pickupId=' + pickupId + '&shipId=' + shipId )
}
/**
 * /order/pickup/v1/findShipByid
 根据提货id查询运单
 */
export function getFindShipByid(id) {
  return fetch.get('/api-order/order/pickup/v1/findShipByid/' + id).then(res => {
    return res.data || {}
  })
}

/**
 * /order/pickup/v1/findShipByid
 提货完成 --修改状态
 */
export function putUpdatePickkupStatus(pickupId) {
  return fetch.put('/api-order/order/pickup/v1/updatePickkupStatus/' + pickupId).then(res => {
    return res.data || {}
  })
}
// http://localhost:7010/api-system/system/trunk/v1/list?access_token=
// {
//   "currentPage":1,
//   "pageSize":3,
//   "vo":{"orgid":1,"truckIdNumber":"1234"}
// }
// post

// /**
//  *
//  */
// private Integer id;
// /**
//  * 提货批次
//  */
// private String pickupBatchNumber;
// /**
//  * 提货状态
//  */
// private Integer pickupStatus;
// /**
//  * 运费核销状态
//  */
// private Integer cancelStatus;
// /**
//  * 发货人id
//  */
// private Integer senderId;
// /**
//  * 货品名
//  */
// private String pickupName;
// /**
//  * 件数
//  */
// private Integer pickupAmount;
// /**
//  * 重量
//  */
// private Double pickupWeight;
// /**
//  * 体积
//  */
// private Double pickupVolume;
// /**
//  * 实际载重量
//  */
// private Double realWeight;
// /**
//  * 差额重量
//  */
// private Double differWeight;
// /**
//  * 实际载体积
//  */
// private Double realVolume;
// /**
//  * 差额体积
//  */
// private Double differVolume;
// /**
//  * 运单id
//  */
// private String orderId;
// /**
//  * 关联提货费
//  */
// private Double pickupFee;
// /**
//  * 到达城市
//  */
// private String toCityCode;
// /**
//  * 付款方式
//  */
// private Integer payMethod;
// /**
//  * 备注
//  */
// private String remark;
// /**
//  * 运费
//  */
// private BigDecimal carriage;
// /**
//  * 代收费用
//  */
// private BigDecimal collectionFee;
// /**
//  * 车辆id
//  */
// private Integer truckId;
// /**
//  * 车费
//  */
// private BigDecimal truckFee;
// /**
//  * 出车时间
//  */
// @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
// private Date outTime;
// /**
//  * 要求到车时间
//  */
// @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
// private Date arriveTime;
//
// /**
//  * 开单网点
//  */
// private Integer pickupFromOrgid;
//
// /*发货人*/
// /**
//  * 发货人
//  */
// private String senderName;
// /**
//  * 发货人电话
//  */
// private String senderMobile;
//
// /**
//  * 发货人地址
//  */
// private String detailedAddress;
// /*车辆信息*/
// /**
//  * 车牌号码
//  */
// private String truckIdNumber;
// /**
//  * 车辆单位
//  */
// private String truckUnit;
// /**
//  * 车型
//  */
// private Integer truckType;
// /*司机信息*/
// /**
//  * 司机姓名
//  */
// private String driverName;
// /**
//  * 司机电话
//  */
// private String driverMobile;
// /**
//  * 本网点及子网点id
//  */
// private  String orgAllId;
//
//
// /**
//  * 运单单号s
//  */
// private String shipSns;
//
// /**
//  * 运单号
//  */
// private String shipSn;
//
// /**
//  * 货号
//  */
// private String shipGoodsSn;
