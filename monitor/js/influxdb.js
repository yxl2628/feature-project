(function($) {
  $.jqinfluxdb = function(options) {
    options = $.extend({
      url: 'http://54.76.206.29:8086/query',
      user: 'admin',
      password: 'admin4boss',
      timeout: 3000,
    }, options)
    // 设置参数
    this.setOptions = function(addoptions) {
      options = $.extend(options, addoptions);
    }
    // 请求方法
    this.queryData = function (sql, success, error) {
      geinfluxDBAjax(sql, success, error)
    }
    // 封装ajax请求
    function geinfluxDBAjax(sql, success, error) {
      var ajaxOption = {
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'POST',
        url: options.url + '?u=' + options.user + '&p=' + options.password + '&db=boss&pretty=true',
        timeout: options.timeout,
        data: {q: sql},
        success: function(response, status) {
          success && success(response, status)
        },
        error: function(response, status) {
          error && error(response, status)
        }
      }
      $.ajax(ajaxOption)
    }
  }
})(window.jQuery || window.Zepto)
