$(document).ready(function() {
  var zabbix_server = new $.jqzabbix()
  // 先登录获取zabbix的auth
  zabbix_server.userLogin()
  // 获取cache节点的groupid集合
  var cache_groupids = []
  cache_list.forEach(function(item) {
    if (item.groupid) {
      cache_groupids.push(item.groupid)
      item.value = [0, 0]
    } else {
      item.value = [-1, -1]
    }
    pack_loss_probability.push({
      fromName: item.name,
      toName: '亚马逊云',
      groupid: item.groupid
    })
  })
  task(cache_groupids)
  /**
   * 下面是定时任务，将上述获取过程，写入定时任务
   * 默认是60秒请求一次
   */
  setInterval(function() {
    task(cache_groupids)
  }, 60000)
  /**
   * 下面是各个获取数据的详细方法
   */
  // 总的任务
  function task(cache_groupids) {
    // 获取各个cache节点zabbix告警数
    getCacheZabbixError(cache_groupids)
    // 获取各个cache节点带宽负载
    cache_groupids.forEach(function(groupid) {
      getCacheNetworkPersent(groupid)
    })
    // 获取各个监控点到亚马逊云S3的丢包率
    pack_loss_probability.forEach(function(item) {
      item.value = -1
      if (item.hostid !== undefined) {
        getPackLoss('hostids', item.hostid, item.fromName)
      } else {
        if (item.groupid) {
          getPackLoss('groupids', item.groupid, item.fromName)
        }
      }
    })
    // 获取南非上行站频道接收数据
    getRadarData('jieshou', groupid_ott, 'channel status')
    // 获取南非上行站频道转码数据
    getRadarData('zhuanma', group_os, 'YJY_Recoder_LOG_CHANNL')
    // 获取南非上行站频道切片数据
    getRadarData('qiepian', group_os, '本地切片')
    // 获取南非上行站频道AWS上传数据
    getRadarData('awsshangchuan', group_os, 'aws_channel_status')
    // 获取aws数据
    getAWSData(gslb_manage_hostid)
    // 获取总用户数、总带宽及合作运营商
    setTimeout(function() {
      getAllUsers(cache_groupids)
    }, 2000)
    getAppData()
  }
  // 获取zabbix告警数
  function getCacheZabbixError(groupids) {
    zabbix_server.queryData('trigger.get', {
      'groupids': groupids,
      'only_true': 1, // 仅返回最近处于问题状态的触发器
      'monitored': 1, //属于受监控主机的已启用触发器
      'min_severity': 2,
      'active': 1, // 只返回属于受监控主机的启用的触发器
      'selectGroups': ['name'], // 同时查出所属的主机组信息
      'output': ['triggerid', 'groups', 'description', 'priority', 'value']
    }, function(res) {
      if (res.result) {
        var _countObj = {}
        res.result.forEach(function(item) {
          var _groupid = 'g-' + item.groups[0].groupid
          if (_countObj[_groupid] === undefined) {
            _countObj[_groupid] = 1
          } else {
            _countObj[_groupid] += 1
          }
        })
        cache_list.forEach(function(item) {
          var _key = 'g-' + item.groupid
          if (_countObj[_key] !== undefined) {
            item.value[0] = _countObj[_key]
          }
        })
        var _option = myChart.getOption()
        _option.series.forEach(function(item) {
          if (item.name === 'cache节点告警') {
            item.data = convertPonitData(cache_list)
          }
        })
        myChart.setOption(_option, true)
      }
    })
  }
  // 获取带宽
  function getCacheNetworkPersent(groupid) {
    zabbix_server.queryData('item.get', {
      'groupids': [groupid],
      'application': 'Network', // 只查询Network的应用集
      'selectGroups': ['name'], // 同时查出所属的主机组信息
      'selectHosts': ['name'], // 同时查出所属主机的信息
      'search': {
        'name': 'Outgoing',
      },
      'output': ['itemid', 'hosts', 'key_', 'name', 'lastvalue']
    }, function(res) {
      if (res.result) {
        var _countObj = {}
        res.result.forEach(function(item) {
          var _groupid = 'g-' + groupid
          if (item.hosts[0].name.indexOf('STR') >= 0) {
            if (item.key_.indexOf('enp3s0f1') >= 0 || item.key_.indexOf('p2p1') >= 0) {
              if (_countObj[_groupid] === undefined) {
                _countObj[_groupid] = {
                  realValue: parseInt(item.lastvalue),
                  totalValue: 10000000000
                }
              } else {
                _countObj[_groupid].realValue += parseInt(item.lastvalue)
                _countObj[_groupid].totalValue += 10000000000
              }
            }
          }
        })
        cache_list.forEach(function(item) {
          var _key = 'g-' + item.groupid
          if (_countObj[_key] !== undefined) {
            item.realValue = _countObj[_key].realValue
            item.totalValue = _countObj[_key].totalValue
            item.value[1] = (item.realValue / item.totalValue * 100).toFixed(0)
          }
        })
        var _option = myChart.getOption()
        _option.series.forEach(function(item) {
          if (item.name === 'cache节点告警') {
            item.data = convertPonitData(cache_list)
          }
        })
        myChart.setOption(_option, true)
      }
    })
  }
  // 丢包率
  function getPackLoss(type, id, name) {
    var zabbix_params = {
      'search': {
        'name': 'S3上传桶-LOSS'
      },
      'output': ['name', 'lastvalue']
    }
    zabbix_params[type] = id
    zabbix_server.queryData('item.get', zabbix_params, function(res) {
      if (res.result) {
        var value = 0
        res.result.forEach(function(item) {
          if (parseInt(item.lastvalue) > value) {
            value = parseInt(item.lastvalue)
          }
        })
        pack_loss_probability.forEach(function(item) {
          if (item.fromName === name) {
            item.value = value
          }
        })
        var _option = myChart.getOption()
        _option.series.forEach(function(item) {
          if (item.name === '网络状态') {
            item.data = convertLinesData(pack_loss_probability)
          }
        })
        myChart.setOption(_option, true)
      }
    })
  }
  // 获取总用户数
  function getAllUsers(cache_groupids) {
    var totalUser = 0
    // zabbix_server.queryData('item.get',{
    //   'groupids': cache_groupids,
    //   'search': {
    //     'name': 'cache'
    //   },
    //   'output': ['name', 'lastvalue']
    // }, function(res) {
    //   if (res.result) {
    //     totalUser = 0
    //     res.result.forEach(function(item) {
    //       if (item.name.indexOf('cache.demand.unique.count') >= 0 || item.name.indexOf('cache.live.unique.count') >= 0){
    //         totalUser += parseInt(item.lastvalue)
    //         $('#user').html(template('ledTpl', {value: totalUser.toString()}))
    //       }
    //     })
    //   }
    // })
    var totalNetwork = 0,
      type = 'G',
      user_net = 250
    cache_list.forEach(function(item) {
      if (item.realValue != undefined) {
        totalNetwork += item.realValue
      }
    })
    if (totalNetwork < 10000000) {
      totalNetwork = totalNetwork / 1000
      type = 'K'
      totalUser = Math.ceil(totalNetwork / user_net)
    } else if (totalNetwork < 1000000000) {
      totalNetwork = totalNetwork / 1000000
      type = 'M'
      totalUser = Math.ceil(totalNetwork / (user_net / 1000))
    } else {
      totalNetwork = totalNetwork / 1000000000
      totalUser = Math.ceil(totalNetwork * 1000 / (user_net / 1000))
    }
    $('#user').html(template('ledTpl', {
      value: totalUser.toString()
    }))
    $('#networdUnit').text(type)
    $('#network').html(template('ledTpl', {
      value: totalNetwork.toFixed(0)
    }))
    $('#partner').html(template('ledTpl', {
      value: cache_list.length.toString()
    }))
  }
  // 获取南非上行站频道监控
  function getRadarData(id, groupid, application) {
    zabbix_server.queryData('item.get', {
      'groupids': groupid,
      'application': application,
      'filter': {
        'status': '0'
      },
      'output': ['lastvalue', 'name']
    }, function(res) {
      var resData = {},
        total = 0,
        error = 0,
        totalUser = 0
      if (res.result) {
        res.result.forEach(function(item) {
          var name = getName(item.name, id)
          var value = parseInt(item.lastvalue)
          if (resData[name] === undefined) {
            resData[name] = false
          }
          total += 1
          switch (id) { //针对不同的id，错误计算方式不同，默认是 1位正常，0位异常
            case 'jieshou':
              if (value > 0) {
                resData[name] = true
                error += 1
              }
              break
            default:
              if (value === 0) {
                resData[name] = true
                error += 1
              }
          }
        })
        if (id === 'jieshou') {
          total = 0
          error = 0
          for (var x in resData) {
            total += 1
            if (resData[x]) {
              error += 1
            }
          }
        }

        $('#' + id).text((total - error) + '/' + total)
        var colortype = error < 1 ? 'good' : error < 10 ? 'well' : 'bad'
        var path = serverPath
        if ($('#radar').html().indexOf('data-type="well"') >= 0) {
          path = serverBadPath
        }
        if ($('#radar').html().indexOf('data-type="bad"') >= 0) {
          path = serverErrorPath
        }
        var _option = myChart.getOption()
        _option.series.forEach(function(item) {
          if (item.name === '地点') {
            item.data.forEach(function(value) {
              if (value.name === '上云站机房') {
                value.symbol = path
              }
            })
          }
        })
        myChart.setOption(_option, true)
        $('#' + id).css('color', getColor(colortype)).attr('data-type', colortype)
      }
    })
  }
  // 获取全局调度系统的指标
  function getAWSData(gslb_manage_hostid) {
    var standardValue = 65000
    zabbix_server.queryData('item.get', {
      'hostids': gslb_manage_hostid,
      'search': {
        'key_': 'gslb'
      },
      'output': ['name', 'key_', 'lastvalue']
    }, function(res) {
      if (res.result) {
        var success_persent = 0,
          response_time = [],
          qps = 0
        res.result.forEach(function(item) {
          if (item.name.indexOf('gslb.success.global.rate.monitor.view') >= 0) {
            success_persent = item.lastvalue * 100
          } else if (item.name.indexOf('gslb.response.duration.monitor.view') >= 0) {
            response_time.push(parseInt(item.lastvalue))
          } else if (item.name.indexOf('gslb.qps.monitor.view') >= 0) {
            qps += parseInt(item.lastvalue)
          }
        })
        response_time.sort(function(a, b) {
          return a - b
        })
        $('#chenggonglv').text(success_persent.toFixed(2) + '%')
        $('#xiangyingshijian').text(response_time[0] + 'ms')
        $('#qps').text(qps)
        $('#chenggonglv').css('color', getColor(success_persent > 99 ? 'good' : success_persent > 95 ? 'well' : 'bad'))
        $('#xiangyingshijian').css('color', getColor(response_time[0] < 40 ? 'good' : response_time[0] < 50 ? 'well' : 'bad'))
        $('#qps').css('color', getColor(qps < standardValue * 0.7 ? 'good' : qps < standardValue * 0.9 ? 'well' : 'bad'))
      }
    })

    zabbix_server.queryData('trigger.get', {
      'only_true': 1, // 仅返回最近处于问题状态的触发器
      'monitored': 1, //属于受监控主机的已启用触发器
      'active': 1, // 只返回属于受监控主机的启用的触发器
      'min_severity': 2,
      'selectHosts': ['name'], // 同时查出所属的主机信息
      'selectGroups': ['name'], // 同时查出所属的主机组信息
      // 'sortfield': 'triggerid',
      'sortorder': 'ASC',
      'filter': {
        'value': '1'
      },
      'output': ['description', 'hosts', 'groups', 'lastchange', 'priority']
    }, function(res) {
      if (res.result) {
        var result = res.result
        var group = {},
          groupList = [],
          aws_error = 0
        for (var i = 0, resLen = result.length; i < resLen; i++) {
          var groupName = result[i].groups[0].name
          if (groupName === '0701_AWS_研究院') {
            aws_error += 1
            if (result[i].priority > 3) {
              aws_error += 6
            }
            break
          }
        }
        var _option = myChart.getOption()
        _option.series.forEach(function(item) {
          if (item.name === '地点') {
            item.data.forEach(function(value) {
              if (value.name === '亚马逊云') {
                if (aws_error === 0) {
                  value.symbol = awsPath
                } else if (aws_error > 0 && aws_error <= 5) {
                  value.symbol = awsBadPath
                } else if (aws_error > 5) {
                  value.symbol = awsErrorPath
                }
              }
            })
          }
        })
        myChart.setOption(_option, true)
      }
    })
  }
  // 获取App数据
  function getAppData() {
    zabbix_server.queryData('item.get', {
      'hostids': app_hostid,
      'search': {
        'key_': 'playing'
      },
      'output': ['name', 'key_', 'lastvalue']
    }, function(res) {
      if (res.result != undefined) {
        res.result.forEach(function(item) {
          console.log(item.name, item.lastvalue)
          // 播放成功率
          if (item.name === 'playing_play_success_all') {
            $('#appplay').text((item.lastvalue * 10000 / 100).toFixed(2) + '%').css('color', getColor('good'))
          }
          // 首页打开成功率
          if (item.name === 'playing_home_page_success_all') {
            $('#apphome').text((item.lastvalue * 10000 / 100).toFixed(2) + '%').css('color', getColor('good'))
          }
          // 登录成功率
          if (item.name === 'playing_user_login_success_all') {
            $('#applogin').text((item.lastvalue * 10000 / 100).toFixed(2) + '%').css('color', getColor('good'))
          }
          // 注册转化成功率
          if (item.name === 'playing_user_register_success_all') {
            $('#appregister').text((item.lastvalue * 10000 / 100).toFixed(2) + '%').css('color', getColor('good'))
          }
          // 订到成功率
          if (item.name === 'playing_order_success_all') {
            $('#apporder').text((item.lastvalue * 10000 / 100).toFixed(2) + '%').css('color', getColor('good'))
          }
          // 支付成功率
          if (item.name === 'playing_payment_success_all') {
            $('#apppay').text((item.lastvalue * 10000 / 100).toFixed(2) + '%').css('color', getColor('good'))
          }
          // app在线用户数
          if (item.name === 'playing_play_count_all') {
            $('#apponline').html(template('ledTpl', {
              value: parseInt(item.lastvalue).toString()
            }))
          }
        })
      }
    })

  }
})
