function activeShuoZhengCheck() {

  if ($B.type == "edge") {
    alert("尚未支持Edge, 请点击右上角的...(更多), 用Internet Explore打开.");
  } else if ($B.type == "ie") {
    //location.href=url + '?110';
  } else if ($B.npapi || $B.ppapi) {
    //location.href=url + '?110';
  } else {
    //插件未安装
    if ($B.type == "chrome") {
      if ($B.chrome_install_apitype == "npapi")
        window.open("install_chrome.htm");
      else {
        var ofrm = document.getElementById('frm');
        ofrm.height = 700;
        ofrm.contentWindow.location.href = 'http://www.supcan.cn/download/clientinstall.htm?110';
        olbl.innerHTML = '下载 Chrome 浏览器插件安装包';
      }
    } else { //Firefox
      if ($B.is64)
        alert("抱歉, 不支持 64位Firefox");
      else
        window.open("binary/supcan.xpi");
    }
  }

}

function autoResize() {
  var dv = document.getElementById('main');
  var height = (document.documentElement.clientHeight - 10) + 'px';
  dv.style.height = height;
}
window.onload = function() {
  autoResize();
  activeShuoZhengCheck();
}
window.onresize = function() {
  autoResize();
}

function OnEvent() {}

function getUrlParams() { // 获取url里面的参数

  var str = decodeURI(location.href)
  // var str = location.href
  var num = str.indexOf('?')
  str = str.substr(num + 1)
  var arr = str.split('&')
  var query = new Object()

  for (var i = 0; i < arr.length - 1; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      query[name] = value;
    }
  }

  var strQuery = '?'
  for (let item in query) {
    if (item !== 'func') {
      strQuery += item + '=' + query[item] + '&'
    }
  }
  strQuery = strQuery.substr(0,strQuery.length - 1)
  console.log(strQuery)
  return strQuery
}
