(function($) {
  $.jqgrafana = function(options) {
    // 默认参数
    options = $.extend({
      url: 'http://52.31.253.254:8000/api/',
      token: 'eyJrIjoiSkZ3dXc3SGtjYXlWVDMzdXZVZVowa29LMjFTRFZtM24iLCJuIjoiYm9zc19zdGF0dXMiLCJpZCI6MX0=',
      timeout: 3000
    }, options)
    var rpc_id = 0
    var auth_id = null
    // 设置参数
    this.setOptions = function(addoptions) {
      options = $.extend(options, addoptions);
    }
    this.getOptions = function(key) {
      return options[key]
    }
    // 请求方法
    this.queryData = function (url, method, params, success, error) {
      getGrafanaAjax(url, method, params, success, error)
    }
    // 封装ajax请求
    function getGrafanaAjax(url, method, params, success, error) {
      var ajaxOption = {
        headers: {
            Authorization: 'Bearer ' + options.token
        },
        contentType: 'application/json',
        dataType: 'json',
        type: method,
        timeout: options.timeout,
        url: options.url + url,
        success: function(response, status) {
          success && success(response, status)
        },
        error: function(response, status) {
          error && error(response, status)
        }
      }
      if (method === 'POST') {
        ajaxOption.data = JSON.stringify(params)
      }
      $.ajax(ajaxOption)
    }
  }
})(window.jQuery || window.Zepto)
