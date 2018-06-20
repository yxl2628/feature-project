(function($) {
    $.jqzabbix = function(options) {
        // 默认参数
        options = $.extend({
            //测试组环境
            url: 'http://10.0.224.100:8880/zabbix/api_jsonrpc.php',
            username: 'admin',
            password: 'zabbix',
            timeout: 5000,
            limit: 1000,
        }, options)
        var rpc_id = 0
        var auth_id = null
        // 设置参数
        this.setOptions = function(addoptions) {
            options = $.extend(options, addoptions);
        }
        // 登录
        this.userLogin = function(username, password) {
            if (username && password) {
                this.setOptions({username: username, password: password})
            }
            getZabbixAjax('user.login', {
                user: options.username,
                password: options.password
            }, function (response) {
                auth_id = response.result
            })
        }
        // 请求方法
        this.queryData = function (method, params, success, error) {
            if (params.output === undefined) params.output = 'extend'
            params.limit = options.limit
            getZabbixAjax(method, params, success, error)
        }
        // 封装ajax请求
        function getZabbixAjax(method, params, success, error) {
            $.ajax({
                contentType: 'application/json-rpc',
                dataType: 'json',
                type: 'POST',
                async: method !== 'user.login',
                cache: false,
                processData: false,
                timeout: options.timeout,
                url: options.url,
                data: JSON.stringify({
                    jsonrpc: '2.0',
                    id: ++rpc_id,
                    auth: auth_id,
                    method: method,
                    params: params
                }),
                success: function(response, status) {
                    success && success(response, status)
                },
                error: function(response, status) {
                    error && error(response, status)
                }
            })
        }
    }
})(window.jQuery || window.Zepto)
