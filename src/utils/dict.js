import * as $const from '@/utils/constant'

const TMS_DICT_OBJECT = {
  'fee_status': [],
  'ship_status': [],
  'ship_shipIdentifying': {
    '转': '<i class="ship-zhuan"></i>',
    '拆': '<i class="ship-chai"></i>',
    '改': '<i class="ship-gai"></i>',
    '控': '<i class="ship-kong"></i>',
    '异': '<i class="ship-yi"></i>'
  }
}

/**
 * 赋值
 */
for (const i in $const) {
  TMS_DICT_OBJECT[(i + '').toLocaleLowerCase()] = Object.entries($const[i]).map(el => {
    let obj = {}
    obj = {
      id: el[0],
      dictName: el[1]
    }
    return obj
  })
}
console.log('TMS_DICT_OBJECT:', TMS_DICT_OBJECT)

export default TMS_DICT_OBJECT

export function parseDict(type, name) {
  if (name === '') {
    return ''
  }
  const find = TMS_DICT_OBJECT[type] ? TMS_DICT_OBJECT[type].filter(el => {
    return el.id === name
  }) : []
  return find[0] ? find[0].dictName : name
}

export function parseShipStatus(status = '') {
  status = !status ? '' : status
  const arr = status.trim().split(',')
  let res = ''
  arr.map(el => {
    res += TMS_DICT_OBJECT['ship_shipIdentifying'][el.trim()] || el.trim()
  })
  return res
}
