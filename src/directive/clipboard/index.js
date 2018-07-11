import Clipboard from './clipboard'
import Vue from 'vue'

const install = function() {
  Vue.directive('Clipboard', Clipboard)
}

Clipboard.install = install
export default Clipboard
