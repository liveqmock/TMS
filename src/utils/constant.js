/**
 * 常量
 */

// 运单状态 shipStatus
export const SHIP_STATUS = {
  1: '已入库',
  2: '短驳中',
  3: '已装车',
  4: '已发出',
  5: '已到车',
  6: '已到货',
  7: '已中转',
  8: '送货中',
  9: '已签收'
}

/**
 * 短驳 批次状态
 */
export const SHORT_STATE = {
  1: '短驳中',
  2: '已到车',
  3: '已到货',
  4: '已入库',
  5: '全部',
  6: '已装车'
}
/**
 * 库存类型 repertoryType
 */
export const REPERTORY_TYPE = {
  1: '发货库存',
  2: '到货库存'
}
/**
 * 结算类型
 */
export const COUNT_STATUS = {
  '': '全部',
  NOSETTLEMENT: '未结算',
  PARTSETTLEMENT: '部分结算',
  ALLSETTLEMENT: '已结算'
}
/**
 * 结算方向
 */
export const SETTLEMENT_ID = {
  '': '全部',
  0: '收入',
  1: '支出'
}
/**
 * 交账状态
 */
export const FEE_STATUS = {
  '': '全部',
  NOSETTLEMENT: '未交账',
  PARTSETTLEMENT: '部分交账',
  ALLSETTLEMENT: '已交账'
}
