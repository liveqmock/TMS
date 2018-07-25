import fetch from '@/utils/fetch'

/**
 * ================================》应收《================
 */

export function getExportExcel(params) {
  return Promise.reslove('')
}

/**
 * 插入运单相关的应收应付表信息
 {
  "tmsOrderCargoList": [
    {
      "agencyFund": 0,
      "amountFee": 0,
      "brokerageFee": 0,
      "cargoAmount": 0,
      "cargoName": "string",
      "cargoPack": "string",
      "cargoRemark": "string",
      "cargoVolume": 0,
      "cargoWeight": 0,
      "commissionFee": 0,
      "createTime": "2018-07-15T12:36:02.059Z",
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
  "tmsOrderShip": {
    "createTime": "2018-07-15T12:36:02.059Z",
    "id": 0,
    "shipArrivepayFee": 0,
    "shipBatchId": 0,
    "shipBusinessType": 0,
    "shipCustomerNumber": "string",
    "shipDelete": 0,
    "shipDeliveryMethod": 0,
    "shipEffective": 0,
    "shipFromCityCode": "string",
    "shipFromCityName": "string",
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
    "childShipId": 0,
    "codService": 0,
    "createTime": "2018-07-15T12:36:02.059Z",
    "deliveryExpense": 0,
    "id": 0,
    "oddNumbers": "string",
    "orgid": 0,
    "paymentId": 0,
    "remark": "string",
    "repertoryId": 0,
    "shipId": 0,
    "totalCost": 0,
    "transferAmount": 0,
    "transferBatchNo": "string",
    "transferCharge": 0,
    "transferOtherFee": 0,
    "transferStatusId": 0,
    "transferTime": "2018-07-15T12:36:02.059Z",
    "transferVolume": 0,
    "transferWeight": 0,
    "updateTime": "2018-07-15T12:36:02.059Z"
  },
  "type": 0
}
 */
export function postNewFeeReceivable(data) {
  return fetch.post('/api-finance/finance/feeReceivable/v1/', data)
}

/**
 * 根据ID查询tms应收应付表信息
 * @param {*} id 应付id
 */
export function getFeeReceivable(id) {
  return fetch.get('/api-finance/finance/feeReceivable/v1/' + id)
}

/**
 * 根据ID修改tms应收应付表信息
 * @param {*} data 修改信息
{
  "endTime": "2018-07-15T12:38:18.232Z",
  "feeType": 0,
  "id": 0,
  "incomePayType": "PAYABLE",
  "incomePayTypeValue": "string",
  "orgAllId": "string",
  "senderCompanyName": "string",
  "senderName": "string",
  "shipFromCityCode": "string",
  "shipFromOrgid": 0,
  "shipLoadId": 0,
  "shipLoadIdType": 0,
  "shipSn": "string",
  "shipToCityCode": "string",
  "startTime": "2018-07-15T12:38:18.233Z",
  "status": "string",
  "totalFee": 0,
  "totalStatus": "NOSETTLEMENT",
  "totalStatusValue": "string"
}
 */
export function putChangeFeeReceivable(id, data) {
  return fetch.put('/api-finance/finance/feeReceivable/v1/' + id, data)
}
/**
 * 根据ID删除tms应收应付表信息
 * @param {*} id 应付id
 */
export function deleteFeeReceivable(id) {
  return fetch.delete('/api-finance/finance/feeReceivable/v1/' + id)
}
/**
 * 应收结算
 * @param {*} orgid 组织id
 * @param {*} data 创建数据
{
  "capitalFlow": {
    "amount": 0,
    "createBy": 0,
    "detailDtoList": [
      {
        "amount": 0,
        "arrCardPay": "string",
        "arrSendPay": "string",
        "arrivalPay": "string",
        "backCardPa": "string",
        "backPay": "string",
        "backSendPa": "string",
        "endLoadPay": "string",
        "endOtherPay": "string",
        "exceptionPay": "string",
        "flowId": 0,
        "id": 0,
        "kickBackPay": "string",
        "mainBatchNo": "string",
        "monthPay": "string",
        "onCardPay": "string",
        "onPay": "string",
        "onSendPay": "string",
        "othePay": "string",
        "pickPuPay": "string",
        "remark": "string",
        "sendBatchNo": "string",
        "sendPay": "string",
        "shipOrderId": 0,
        "shipOrderType": 0,
        "shipSn": "string",
        "shortBatchNo": "string",
        "shortPay": "string",
        "startLoadPay": "string",
        "startOtherPay": "string",
        "transferPay": "string",
        "unusualPay": "string"
      }
    ],
    "id": 0,
    "orgId": 0,
    "paymentsType": 0,
    "remark": "string",
    "settlementBy": "string",
    "settlementId": 0,
    "settlementSn": "string",
    "settlementTime": "2018-07-15T12:41:33.091Z",
    "szDtoList": [
      {
        "agent": "string",
        "alipayAccount": "string",
        "bankAccount": "string",
        "bankAccountName": "string",
        "bankName": "string",
        "chequeNumber": "string",
        "financialWay": "string",
        "flowId": 0,
        "id": 0,
        "receivableNumber": "string",
        "rnum": 0,
        "wechatAccount": "string"
      }
    ]
  },
  "financialWayLogs": [
    {
      "agent": "string",
      "alipayAccount": "string",
      "bankAccount": "string",
      "bankAccountName": "string",
      "bankName": "string",
      "chequeNumber": "string",
      "financialWay": "string",
      "flowId": 0,
      "id": 0,
      "receivableNumber": "string",
      "rnum": 0,
      "wechatAccount": "string"
    }
  ],
  "receivableFees": [
    {
      "inputArrivepayFee": 0,
      "inputChangeFee": 0,
      "inputMonthpayFee": 0,
      "inputNowPayFee": 0,
      "inputReceiptpayFee": 0,
      "shipId": 0
    }
  ]
}
 */
export function postCreateFee(orgid, data) {
  return fetch.put('/api-finance/finance/feeReceivable/v1/create/' + orgid, data)
}
/**
 * 判断到站装卸费和到站其他费是否有结算(typeId是28为到站装卸费，29是到站其他费，返回为true时才可修改)
 * @param {*} loadId 配载id
 * @param {*} typeId 类型id
 */
export function getFeeStatus(loadId, typeId = '') {
  return fetch.get('/api-finance/finance/feeReceivable/v1/getFeeStatus/' + loadId, {
    params: {
      typeId
    }
  })
}
/**
 * 根据运单id查询应付应付表的结算状态，为true才可修改运单费用
 * @param {*} shipId 运单id
 */
export function getFeeStatusByShipId(shipId) {
  return fetch.get('/api-finance/finance/feeReceivable/v1/getStatusByShipId/' + shipId)
}
/**
 * 根据费用类型查询应收费用列表,不传费用类型查询全部
 * @param {*} data 搜索参数
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "endTime": "string",
    "feeType": 0,
    "orgAllId": "string",
    "senderCompanyName": "string",
    "senderName": "string",
    "shipFromCityCode": "string",
    "shipFromOrgid": 0,
    "shipSn": "string",
    "shipToCityCode": "string",
    "startTime": "string",
    "status": "NOSETTLEMENT"
  }
}
 */
export function getReceivableList(data) {
  return fetch.post('/api-finance/finance/feeReceivable/v1/list', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 到车入库后修改到站装卸费和到站其他费
 * @param {*} data 费用信息
{
  "arriveHandlingFee": 0,
  "arriveOtherFee": 0,
  "arrivepayCarriage": 0,
  "arrivepayOilCard": 0,
  "backpayCarriage": 0,
  "backpayOilCard": 0,
  "carloadInsuranceFee": 0,
  "deliveryFee": 0,
  "id": 0,
  "leaveHandlingFee": 0,
  "leaveOtherFee": 0,
  "loadId": 0,
  "nowpayCarriage": 0,
  "nowpayOilCard": 0,
  "shortFee": 0
}
 */
export function postSaveLoadFee(data) {
  return fetch.post('/api-finance/finance/feeReceivable/v1/saveLoadFee', data)
}

/**
 * ================================》应收明细《================
 */

 /**
  * 插入tms应收应付明细(收支费用明细)表信息
{
  "arrivePayFee": 0,
  "ascriptionOrgid": 0,
  "changeFee": 0,
  "createTime": "2018-07-15T12:19:54.477Z",
  "fee": 0,
  "feeTypeId": 0,
  "financeFeeId": 0,
  "id": 0,
  "incomePayType": "PAYABLE",
  "monthPayFee": 0,
  "nowPayFee": 0,
  "receiptPayFee": 0,
  "remark": "string",
  "shipLoadId": 0,
  "signOrgid": 0,
  "status": "NOSETTLEMENT",
  "statusValue": "string",
  "unpaidFee": 0
}
  */
export function postNewFeeDetail(data) {
  return fetch.post('/api-finance/finance/tmsfinancefeedetailreceivable/v1/', data)
}
/**
 * 根据ID查询tms应收应付明细(收支费用明细)表信息
 * @param {*} id 明细信息id
 */
export function getFeeDetail(id) {
  return fetch.get('/api-finance/finance/tmsfinancefeedetailreceivable/v1/').then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

  /**
   * 根据ID修改tms应收应付明细(收支费用明细)表信息
   * id 明细信息id
   * @param {*} data 同新建
   */
export function putChangeFeeDetail(id, data) {
  return fetch.put('/api-finance/finance/tmsfinancefeedetailreceivable/v1/' +
id, data)
}

/**
 * 根据ID删除tms应收应付明细(收支费用明细)表信息
 * @param {*} id 明细信息id
 */
export function deleteFeeDetail(id) {
  return fetch.delete('/api-finance/finance/tmsfinancefeedetailreceivable/v1/' +
  id)
}

/**
 * 根据shipID和网点id,签收修改到付费用结算网点
 * @param {*} data 修改信息
{
  "arrivePayFee": 0,
  "ascriptionOrgid": 0,
  "changeFee": 0,
  "createTime": "2018-07-15T12:27:18.589Z",
  "fee": 0,
  "feeTypeId": 0,
  "financeFeeId": 0,
  "id": 0,
  "incomePayType": "PAYABLE",
  "monthPayFee": 0,
  "nowPayFee": 0,
  "receiptPayFee": 0,
  "remark": "string",
  "shipLoadId": 0,
  "signOrgid": 0,
  "status": "NOSETTLEMENT",
  "statusValue": "string",
  "unpaidFee": 0
}
 */
export function putChangeFromSign(data) {
  return fetch.put('/api-finance/finance/tmsfinancefeedetailreceivable/v1/updateFromSign', data)
}
