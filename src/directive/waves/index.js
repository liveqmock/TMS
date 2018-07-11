import waves from './waves'
import Vue from 'vue'

const install = function() {
  Vue.directive('waves', waves)
}

waves.install = install
export default waves
