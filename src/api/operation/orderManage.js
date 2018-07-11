import fetch, { checkStatus } from '@/utils/fetch'

export default {
  /**
   * 根据参数获取所有运单
   * @param {object} param 参数对象
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "agencyFund": 0, 代收货款
    "amountFee": 0, 件数单价
    "brokerageFee": 0, 回扣
    "cargoAmount": 0, 货物件数
    "cargoName": "string", 货物名称
    "cargoPack": "string", 货物包装
    "cargoVolume": 0, 货物体积 0.000
    "cargoWeight": 0, 货物重量 0.00
    "commissionFee": 0, 代收手续费
    "createTime": "2018-06-04T06:11:47.429Z", 录入时间
    "customsFee": 0, 报关费
    "deliveryFee": 0, 送货费
    "description": "string", 品种规格
    "endTime": "string",
    "forkliftFee": 0, 叉车费
    "fromOrgName": "string", 来源组织名称
    "goupstairsFee": 0, 上楼费
    "handlingFee": 0, 装卸费
    "housingFee": 0, 入仓费
    "id": 0,
    "insuranceFee": 0, 保险费
    "name": "string",
    "new_value": "string",
    "old_value": "string",
    "orgAllId": [
      "string"
    ],
    "otherfeeIn": 0, 其他费收入
    "otherfeeOut": 0, 其他费支出
    "packageFee": 0, 包装费
    "pickupFee": 0, 提货费
    "productPrice": 0, 声明价值
    "realityhandlingFee": 0, 实际装卸费
    "receiverCompanyName": "string",
    "receiverCustomerMobile": "string",
    "receiverCustomerName": "string",
    "receiverCustomerUnit": "string",
    "senderCompanyName": "string",
    "senderCustomerMobile": "string",
    "senderCustomerName": "string",
    "senderCustomerUnit": "string",
    "shipArrivepayFee": 0, 到付
    "shipBusinessType": 0, 业务类型
    "shipBusinessTypeName": "string", 业务类型名称
    "shipCustomerNumber": "string", 客户单号
    "shipDelete": 0, 1、正常 2、已删除  3、已作废'
    "shipDeliveryMethod": 0, 送货方式
    "shipDeliveryMethodName": "string", 送货方式名称
    "shipDriverName": "string", 提货司机
    "shipEffective": 0, 时效：1,普通，2,加急
    "shipEffectiveName": "string", 时效名称
    "shipFee": 0, 运费
    "shipFromCityCode": "string", 出发城市code
    "shipFromOrgid": 0, 开单网点
    "shipGoodsSn": "string", 货号
    "shipIdentifying": "string",
    "shipIsAbnormal": 0, 是否有异常 - 0:否 1：是
    "shipIsControll": 0, 运单是否控货- 0:否 1：是
    "shipIsSeparate": 0, 是否有拆单 - 0:否 1：是
    "shipIsTransfer": 0, 是否有中转 - 0:否 1：是
    "shipIsUpdate": 0, 运单是否改单- 0:否 1：是
    "shipMonthpayFee": 0, 月结
    "shipNowpayFee": 0, 现付
    "shipOther": "string", 其他事项
    "shipPayWay": 0, 付款方式
    "shipPayWayName": "string", 付款方式名称
    "shipPrintLib": 0, 打印标签
    "shipReceiptNum": 0, 回单份数
    "shipReceiptRequire": 0, 回单要求
    "shipReceiptRequireName": "string", 回单要求名称
    "shipReceiptSn": "string",回单号
    "shipReceiptpayFee": 0, 回单付
    "shipReceiverId": 0, 收货方
    "shipRemarks": "string", 备注
    "shipSenderId": 0, 发货方
    "shipShippingType": 0, 运输方式
    "shipShippingTypeName": "string", 运输方式名称
    "shipSn": "string", 运单号
    "shipStatus": 0, 运单状态
    "shipStatusName": "string", 运单状态名称
    "shipToCityCode": "string", 到达城市code
    "shipToOrgid": 0, 目的网点
    "shipTotalFee": 0, 运费合计
    "shipTruckIdNumber": "string", 提货车号
    "shipUserid": 0, 制单员
    "stampTax": 0, 印花税
    "startTime": "string",
    "taxRate": 0, 税率
    "taxes": 0, 税金
    "toOrgName": "string",
    "updateContent": "string",
    "update_time": "string",
    "userName": "string",
    "volumeFee": "string", 体积单价
    "weightFee": "string" 重量单价
  }
}
   */
  getAllShip(param) {
    return fetch.post('/api-order/order/v1/findAllShip', param).then(checkStatus).then(res => {
      return res.data ? res.data : { total: 0, list: [] }
    })
  },
  /**
   * 根据运单号或货号查询 全匹配
   * @param {*} param 查询参数
   */
  getFindByShipSnOrGoodSn(tmsOrderShipQuery) {
    return fetch.post('/api-order/order/v1/findByShipSnOrGoodSn', tmsOrderShipQuery).then(checkStatus)
  },
  /**
   * 创建运单
   * @param {*} data 运单数据
   * 同修改
   */
  postNewOrder(data) {
    return fetch.post('/api-order/order/v1/', data).then(checkStatus)
  },
  /**
   * 修改开单对象
   * @param {*} data 运单数据
  {
  "customerList": [
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
  ],
  "tmsOrderCargoList": [
    {
      "agencyFund": 0,
      "brokerageFee": 0,
      "cargoAmount": 0,
      "cargoName": "string",
      "cargoPack": "string",
      "cargoRemark": "string",
      "cargoVolume": 0,
      "cargoWeight": 0,
      "commissionFee": 0,
      "createTime": "2018-06-04T07:08:52.754Z",
      "customsFee": 0,
      "deliveryFee": 0,
      "description": "string",
      "forkliftFee": 0,
      "goupstairsFee": 0,
      "handlingFee": 0,
      "housingFee": 0,
      "id": 0,
      "insuranceFee": 0,
      "orderId": 0,
      "orgid": 0,
      "otherfeeIn": 0,
      "otherfeeOut": 0,
      "packageFee": 0,
      "pickupFee": 0,
      "productPrice": 0,
      "realityhandlingFee": 0,
      "shipFee": 0,
      "shipId": 0,
      "stampTax": 0,
      "taxRate": 0,
      "taxes": 0,
      "volumeFee": 0,
      "weightFee": 0
    }
  ],
  "tmsOrderPre": {
    "createTime": "2018-06-04T07:08:52.755Z",
    "id": 0,
    "orderAgencyFund": 0,
    "orderEffective": 0,
    "orderFromCityCode": "string",
    "orderFromOrgid": 0,
    "orderPayWay": 0,
    "orderPickupMethod": 0,
    "orderProcedureFee": 0,
    "orderReceiverId": 0,
    "orderRemarks": "string",
    "orderSenderId": 0,
    "orderSn": "string",
    "orderStatus": 0,
    "orderToCityCode": "string",
    "orderToOrgid": 0,
    "orderTotalFee": 0,
    "orderType": 0,
    "refuseReason": "string",
    "shipId": 0
  },
  "tmsOrderShip": {
    "createTime": "2018-06-04T07:08:52.755Z",
    "id": 0,
    "shipArrivepayFee": 0,
    "shipBusinessType": 0,
    "shipCustomerNumber": "string",
    "shipDelete": 0,
    "shipDeliveryMethod": 0,
    "shipDriverName": "string",
    "shipEffective": 0,
    "shipFormCityName": "string",
    "shipFromCityCode": "string",
    "shipFromOrgid": 0,
    "shipGoodsSn": "string",
    "shipIsAbnormal": 0,
    "shipIsControll": 0,
    "shipIsSeparate": 0,
    "shipIsTransfer": 0,
    "shipIsUpdate": 0,
    "shipMonthpayFee": 0,
    "shipNowpayFee": 0,
    "shipOther": "string",
    "shipPayWay": 0,
    "shipPrintLib": 0,
    "shipReceiptNum": 0,
    "shipReceiptRequire": 0,
    "shipReceiptSn": "string",
    "shipReceiptpayFee": 0,
    "shipReceiverId": 0,
    "shipRemarks": "string",
    "shipSenderId": 0,
    "shipShippingType": 0,
    "shipSn": "string",
    "shipStatus": 0,
    "shipToCityCode": "string",
    "shipToCityName": "string",
    "shipToOrgid": 0,
    "shipTotalFee": 0,
    "shipTruckIdNumber": "string",
    "shipUserid": 0
  },
  "tmsOrderTransfer": {
    "arrivalMobile": "string",
    "carrierId": 0,
    "carrierMobile": "string",
    "codService": 0,
    "createTime": "2018-06-04T07:08:52.755Z",
    "deliveryExpense": 0,
    "id": 0,
    "oddNumbers": "string",
    "paymentId": 0,
    "remark": "string",
    "shipId": 0,
    "totalCost": 0,
    "transferCharge": 0,
    "transferTime": "2018-06-04T07:08:52.755Z",
    "updateTime": "2018-06-04T07:08:52.755Z"
  }
}
   */
  putChangeOrder(data) {
    return fetch.put('/api-order/order/v1/', data).then(checkStatus)
  },
  /**
   * 查询开单对象
   * @param {*} id 运单id
   */
  getOrderInfoById(id) {
    return fetch.get('/api-order/order/v1/' + id).then(checkStatus)
  },
  /**
   * 删除运单
   * @param {*} id 运单id
   */
  deleteOrderInfoById(id) {
    return fetch.delete('/api-order/order/v1/' + id + '?type=2').then(checkStatus)
  },
  /**
   * 作废运单
   * @param {*} id 运单id
   */
  deleteCancleOrderById(id) {
    return fetch.delete('/api-order/order/v1/' + id + '?type=3').then(checkStatus)
  },
  /**
   * 根据系统设置获取货号
{
  "tmsOrderShip":{
    "shipSn":"20189635142"
  },
  "tmsOrderCargoList":[
    {
      "cargoAmount": 2
    },
    {
      "cargoAmount": 4
    }
  ]
}
   */
  postGenerateGoodsSn(param) {
    return fetch.post('/api-order/order/v1/generateGoodsSn', param).then(checkStatus)
  },
  /**
   * 自动获取运单号
   * @param {*} orgid 组织id
   */
  getShipSn(orgid) {
    return fetch.get('/api-order/order/v1/getShipSn', {
      params: {
        orgid
      }
    }).then(checkStatus)
  },
  /**
   * 判断运单号是否唯一
   * @param {string} shipSn 运单号
   */
  getJudgeShipSn(shipSn, orgId) {
    return fetch.get('/api-order/order/v1/judgeShipSn/' + shipSn, {
      params: {
        orgId
      }
    }).then(checkStatus)
  },
  // 导出数据
  getExportExcel() {
    // 1
  },
  /**
   * 查询个人设置
   * @param {number} userId 用户ID
   */
  getPersonalSetup(userId, type) {
    return fetch.get('/api-order/order/tmsshipsetting/v1/' + userId).then(checkStatus).then(res => {
      return res.data ? (type ? (res.data[type] || {}) : res.data) : {}
    })
  },
  /**
   * 修改个人设置
   * @param {*} data 设置数据
{
  "shipDefault": {
      "openOrderAndTransferInfo": "0",
      "aloneWindow": "0"
  },
  "printKey": {
      "printLibkey": "Ctrl+O",
      "savePrintKey": "Ctrl+D",
      "saveShipKey": "Ctrl+S",
      "cleanKey": "Ctrl+E",
      "printShipKey": "Ctrl+P"
  },
  "shipSetKey": {
      "receiptType": "",
      "receiptNum": "2",
      "handoverMode": "68",
      "paymentMode": "76",
      "transportMode": "87",
      "businessType": ""
  },
  "userId": 1
}
   */
  putPersonalSetup(data) {
    return fetch.put('/api-order/order/tmsshipsetting/v1/', data).then(checkStatus)
  },
  /**
   * 重置个人设置
   * @param {*} userId 用户ID
   */
  resetPersonalSetup(userId) {
    return fetch.put('/api-order/order/tmsshipsetting/v1/' + userId).then(checkStatus)
  },
  /**
   * 获取批次信息
   * @param {*} orgid 组织id
   */
  getBatchList(orgid) {
    return fetch.get('/api-order/order/v1/bath/' + orgid).then(checkStatus)
  },
  /**
   * type为1是货品名 2是包装
   * @param {*} type 获取的类型
   */
  getRecently(Type) {
    return fetch.get('/api-order/order/v1/findRecently', {
      params: {
        Type
      }
    }).then(checkStatus)
  },
  /**
   * 获取创建订单的时间
   */
  getCreateOrderDate() {
    return fetch.get('/api-order/order/v1/orderCreateDate').then(res => {
      return res.data || ''
    }).then(checkStatus)
  },
  /**
   * 获取备注列表
   */
  getRemarkList() {
    return fetch.get('/api-order/order/recently/v1/').then(checkStatus).then(res => {
      return res.data || { list: [], total: 0 }
    })
  },
  /**
   * 新增备注
   * @param {*} id 备注id
   * @param {*} data 备注内容
{
  "type": 3,
  "userId": 2,
  "value": "shlfhring"
}
   */
  postRemark(data) {
    return fetch.post('/api-order/order/recently/v1/', data).then(checkStatus)
  },
  /**
   * 修改备注
   * @param {*} id 备注id
   * @param {*} data 备注内容
{
  "value": "shlfhring"
}
   */
  putRemark(id, data) {
    return fetch.put('/api-order/order/recently/v1/' + id, data).then(checkStatus)
  },
  /**
   * 删除备注
   * @param {*} id 备注id
   */
  deleteRemark(id) {
    return fetch.delete('/api-order/order/recently/v1/' + id).then(checkStatus)
  },
  /**
   * 获取货品设置
   * @param {*} orgId 组织id
   */
  getCargoSetting(orgId) {
    return fetch.get('/api-order/order/tmsorderfield/v1/', {
      params: {
        orgId,
        Type: 'orderCargoSetting'
      }
    }).then(checkStatus).then(res => {
      return res.data || []
    })
  },
  /**
   * 修改货品设置
   * @param {*} data 货品设置数据
   */
  putCargoSetting(data) {
    return fetch.put('/api-order/order/tmsorderfield/v1/', data).then(checkStatus)
  },
  /**
   * 查看运单的修改日志
   * @param {*} shipId 运单id
   * {
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "id": 0,
    "newValue": "string",
    "oldValue": "string",
    "shipId": 0,
    "updateContent": "string",
    "updateTime": "2018-06-29T01:30:52.420Z",
    "userId": 0,
    "userName": "string"
  }
}
   */
  getShipLog(shipId) {
    return fetch.post('/api-order/order/change/v1/', {
      currentPage: 1,
      pageSize: 100,
      vo: {
        shipId
      }
    }).then(res => {
      return res.data || { list: [], total: 0 }
    })
  },
  /**
   * 查询运单的异常记录
   * @param {*} shipId 运单id
   */
  getShipAbnormal(shipId) {
    return fetch.get('/api-order/order/abnormal/v1/findAbnormaByShipId/' + shipId).then(res => {
      return res.data || []
    })
  },
  /**
   * 查询运单的跟踪信息
   * @param {*} shipId 运单id
   */
  getShipTrackinfo(shipId) {
    return fetch.post('/api-order/order/shipTrack/v1/findAll/' + shipId).then(res => {
      return res.data || []
    })
  },
  /**
   * 新增跟踪信息
   * @param {*} data 跟踪详情
   * {
  "createTime": "2018-06-29T10:22:40.054Z",
  "id": 0,
  "orgid": 0,
  "shipId": 0,
  "trackDetailed": "string",
  "trackInfo": "string",
  "trackNode": "string",
  "trackType": 0
}
   */
  postTrackinfo(data) {
    return fetch.post('/api-order/order/shipTrack/v1/add', data)
  },
  /**
   * 修改跟踪信息
   * @param {*} data 同新增，多了 id 参数
   */
  putTrackinfo(data) {
    return fetch.put('/api-order/order/shipTrack/v1/edit', data)
  },
  /**
   * 删除指定的跟踪信息
   * @param {*} trackId 跟踪信息id
   */
  deleteTrackinfo(trackId) {
    return fetch.delete('/api-order/order/shipTrack/v1/deleteById/' + trackId)
  },
  /**
   * 根据批次号码获得批次的详细信息
   * @param {*} batchNum 批次号码
   */
  getBatchInfo(batchNum) {
    return fetch.get('/api-order/order/pickup/v1/findByBatch/', {
      params: {
        batchNum
      }
    })
  }
}
