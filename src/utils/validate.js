/**
 * Created by jiachenpan on 16/11/18.
 */

// 公司id
export function isvalCompanyId(str) {
  // const reg = /^\d{4}$/
  // return reg.test(str)

  const valid_map = ['123', '456']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isvalidUsername(str) {
  const usernameRegex = /^([0-9a-zA-Z]|[\u0391-\uFFE5]){2,}$/
  return usernameRegex.test(str.trim())
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
 * 联通号码段:130、131、132、136、185、186、145
 * 电信号码段:133、153、180、189
 * @param {string} mobile
 */
export function validateMobile(mobile) {
  const re = /^(13[0-9]|14[57]|15[01-37-9]|18[0235-9])\d{8}$/
  return re.test(mobile)
}

// 正则匹配
export const REGEX = {
  // 用户名
  USERNAME: /^([0-9a-zA-Z]|[\u0391-\uFFE5]){2,}$/,
  // 中文
  ONLY_CHINESE: /^[\u4E00-\u9FA5]+$/,
  // 中英文
  CHINESE_AND_ENGLISH: /^[\u4E00-\u9FA5a-zA-Z]+$/,
  // 手机
  MOBILE: /^[1][3-8]\d{9}$/,
  // MOBILE: /^(13[0-9]|14[57]|15[01-37-9]|18[0235-9])\d{8}$/,
  // 身份证
  ID_CARD: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 英语和数字
  ENGLISH_AND_NUMBER: /^[a-zA-Z0-9]+$/,
  // 特殊字符
  SPECIAL_CHARACTER: /([^0-9a-zA-Z\u4E00-\u9FA5])+/,
  // 数字且最多只能有两位小数
  FLOAT2ING: /^\d+(\.\d{0,2})?$/,
  // 邮件地址
  EMAIL: /^[\w!#$%&\'*+\/=?^_`{|}~-]+(?:\.[\w!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,
  // 非数字
  NO_NUMBER: /[\D|\.]/,
  // 纯数字
  ONLY_NUMBER: /^[0-9]+$/,
  // 纯字母
  ONLY_LETTER: /^[a-zA-Z]+$/,
  // 纯符号 !$^&*()+{}|:?-=[]./ 此种情况下这19个是特殊字符
  ONLY_PUNCTUATION: /^[~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,
  // 字母和数字
  ONLY_NUMBER_AND_LETTER: /^[0-9a-zA-Z]+$/,
  //  6-32位密码
  PWD_NUMBER_AND_LETTER: /^[0-9a-zA-Z_#]{6,32}$/,
  // 字母和符号
  ONLY_LETTER_AND_PUNCTUATION: /^[a-zA-Z~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,
  // 数字和符号
  ONLY_NUMBER_AND_PUNCTUATION: /^[0-9~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,
  // 同时包含字母数字和符号
  LETTER_AND_NUMBER_AND_PUNCTUATION: /^[a-zA-Z0-9~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,
//       LETTER_AND_NUMBER_AND_PUNCTUATION : /(^[a-zA-Z]+$)&(^[0-9]+$)(^[~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$)/,
  // 纯数字从1开始
  ONLY_NUMBER_GT: /^[1-9]\d*$/,
  // 不可以为空格
  KONGE: /^[^ ]{6,16}$/,
  // 只含有英文字母、数字和下划线
  ONLY_ENGLISH_NUMBER: /^[A-Za-z0-9_]+$/,
  // 国内电话(区号-号码)
  TELEPHONE: /(^\d{3}-\d{8}$)|(^\d{4}-\d{7,8}$)/,
  // 邮编
  ZIPCODE: /^[1-9]\d{5}(?!\d)$/,
  // 保留两位小数点
  NUM_POINT: /^(([1-9][0-9])|(([0].\d{0,2}|[1-9][0-9].\d{0,2})))$/,
  // 支持百分比
  NUM_PERCENTAGE: /^([1-9]{1}[0-9]{0,1}|0|100)(.\d{1,2}){0,1}%$/,
  /**
   * 获取字符长度
   */
  strlen: function(str) {
    var s = 0
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i).match(/[\u0391-\uFFE5]/)) {
        s += 2
      } else {
        s++
      }
    }
    return s
  }
}
