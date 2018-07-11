import drag from './drag'
import Vue from 'vue'

const install = function() {
  Vue.directive('el-drag-dialog', drag)
}

drag.install = install
export default drag
