import Vue from 'vue'
import { MessageBox } from 'element-ui'
import Clipboard from './clipboard'
import DragDialog from './el-dragDialog'
import Waves from './waves'
import vueSticky from './sticky'

Clipboard.install()
DragDialog.install()
Waves.install()
vueSticky.install()

let hasPoint = false
let pointNum = 2
const VueDirectiveObject = {
  findInput: function(el) {
    return el.classList.contains('el-input') ? el.querySelector('input') : el
  },
  keepNumber: function() {
    // 如果第一位为小数点，则补0
    this.value = hasPoint ? this.value.replace(/[^0-9.]/g, '').replace(/\./, '*').replace(/\./g, '').replace(/\*/, '.').replace(/^\./, '0.').replace(new RegExp('^(\\d+)\\.(\\d{' + Math.abs(pointNum) + '}).*$'), '$1.$2') : this.value.replace(/\D/g, '')
  },
  onkeydown: function(event) {
    // console.log('event.keyCode:',event.keyCode,String.fromCharCode(event.keyCode),event.key,event.code, /[\d]/.test(String.fromCharCode(event.keyCode)))
    // 左右、删除、tab键
    if (!(event.keyCode === 46) && !(event.keyCode === 8) && !(event.keyCode === 37) && !(event.keyCode === 39) && !(event.keyCode === 9) && !(event.key === '.' && hasPoint)) {
      // 数字 小键盘数字
      if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
        event.stopPropagation()
        event.preventDefault()
      }
    }
  }
}
// 限制只能输入数字
Vue.directive('numberOnly', {
  bind: function(el, binding) {
    // 判断是否需要小数点
    const arg = binding.arg || ''
    hasPoint = arg.indexOf('point') !== -1
    // 判断需要小数点后几位，默认为 俩位
    pointNum = parseInt(arg.replace('point', ''), 10) || 2
    VueDirectiveObject.findInput(el).addEventListener('input', VueDirectiveObject.keepNumber)
    VueDirectiveObject.findInput(el).addEventListener('keydown', VueDirectiveObject.onkeydown)
  },
  unbind: function(el) {
    VueDirectiveObject.findInput(el).removeEventListener('input', VueDirectiveObject.keepNumber)
    VueDirectiveObject.findInput(el).removeEventListener('keydown', VueDirectiveObject.onkeydown)
  }
})
// 展示大图
Vue.directive('showPicture', {
  bind: function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault()
      e.stopPropagation()
      MessageBox.alert('<div class="showPictureBox"><img src="' + (this.getAttribute('imgurl') || el.src || el.href) + '" /></div>', {
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        closeOnClickModal: true,
        center: true,
        customClass: 'showPictureWrapper',
        // 必须指定callback 或者 promise回调，否则会报错
        callback: () => {

        }
      })
    })
  },
  unbind: function(el) {

  }
})
