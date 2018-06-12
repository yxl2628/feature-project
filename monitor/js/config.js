//经纬度
var geoCoordMap = {
  '北京': [50, 38],
  '亚马逊云': [-15, 38],
  '卫星': [-25, 16],
  '上云站': [17, -29],
  '上云站机房': [25, -32],
  '尼日利亚_MTN': [5.09765625,7.3624668655],
  '尼日利亚_Glo': [10.1293945313, 10.4013775545],
  '肯尼亚_Safaricom': [38.1005859375, 0.2197260239],
  '坦桑_Tigo': [34.5410156250, -4.7406753848],
  '坦桑_Airtel': [36.9580078125, -10.1851874093],
  '坦桑_Hallotel': [31.1572265625, -7.4060477171],
  '加纳_MTN': [-1.1425781250, 7.9286748014],
  '赞比亚_MTN': [28.3447265625, -15.4960324142],
  '南非_Vodacom': [25.9726562500, -28.8061735089],
  '南非_MTN': [31.0253906250, -28.1495032115],
  '乌干达_MTN': [31.4648437500, 3.1185762168],
  '乌干达_Airtel': [33.8818359375, 3.3379539614],
  '乌干达_Africell': [32.8271484375, -0.2197260239],
  '科特迪瓦_MTN': [-5.5810546875, 7.2316987084],
  '塞内加尔_Orange': [-14.7216796875, 14.5623177019],
  '莫桑比克_Vodacom': [33.8378906250, -24.3270765400],
  '刚果布_Airtel': [15.7324218750, -0.3515602940],
  '卢旺达': [29.6630859375, -1.7136116599],
  '马达': [48.3837890625, -16.5098328269],
  '刚果金_Africell': [20.6103515625, 2.7235830833],
  '刚果金_Vodacom': [26.9384765625, 2.5918889841],
  '刚果金_Orange': [23.7304687500, -3.2940822283],
  '喀麦隆': [12.7001953125, 5.3972734077],
  '几内亚_MTN': [-10.7666015625, 10.5310200085],
  '中非': [20.8740234375, 6.7082539687],
  '布隆迪_LEO': [29.9188860000, -3.3730560000]
}
// cache节点
var cache_list = [
  {name: '尼日利亚_MTN', groupid: '', url: ''},
  {name: '尼日利亚_Glo', groupid: '61', url: 'http://10.0.224.100:3000/d/0MiACYVmz/cachezhan-dian-ni-ri-glo?refresh=1m&orgId=1'},
  {name: '肯尼亚_Safaricom', groupid: '', url: ''},
  {name: '坦桑_Tigo', groupid: '70', url: 'http://10.0.224.100:3000/d/qLpLYTIiz/cachezhan-dian-tan-sang-tigo?refresh=1m&orgId=1'},
  {name: '坦桑_Airtel', groupid: '', url: ''},
  {name: '坦桑_Hallotel', groupid: '66', url: 'http://10.0.224.100:3000/d/jPMBLoSmk/cachezhan-dian-tan-sang-hallotel?refresh=1m&orgId=1'},
  {name: '加纳_MTN', groupid: '68', url: 'http://10.0.224.100:3000/d/vE3jbTImk/cachezhan-dian-jia-na-mtn?refresh=1m&orgId=1'},
  {name: '赞比亚_MTN', groupid: '72', url: '	http://10.0.224.100:3000/d/jmSvfoSiz/cachezhan-dian-zan-bi-ya-mtn?refresh=1m&orgId=1'},
  {name: '南非_Vodacom', groupid: '', url: ''},
  {name: '南非_MTN', groupid: '', url: ''},
  {name: '乌干达_MTN', groupid: '75', url: 'http://10.0.224.100:3000/d/MueULoSiz/cachezhan-dian-wu-gan-da-mtn?refresh=1m&orgId=1'},
  {name: '乌干达_Airtel', groupid: '', url: ''},
  {name: '乌干达_Africell', groupid: '60', url: 'http://10.0.224.100:3000/d/v-w1LoSik/cachezhan-dian-wu-gan-da-africell?refresh=1m&orgId=1'},
  {name: '科特迪瓦_MTN', groupid: '90', url: 'http://10.0.224.100:3000/d/3Sf4p1Iik/cachezhan-dian-ke-te-mtn?refresh=1m&orgId=1'},
  {name: '塞内加尔_Orange', groupid: '', url: ''},
  {name: '莫桑比克_Vodacom', groupid: '', url: ''},
  {name: '刚果布_Airtel', groupid: '67', url: 'http://10.0.224.100:3000/d/Dn_sLoIik/cachezhan-dian-gang-guo-bu-airtel?refresh=1m&orgId=1'},
  {name: '卢旺达', groupid: '', url: ''},
  {name: '马达', groupid: '', url: ''},
  {name: '刚果金_Africell', groupid: '', url: ''},
  {name: '刚果金_Vodacom', groupid: '', url: ''},
  {name: '刚果金_Orange', groupid: '', url: ''},
  {name: '喀麦隆', groupid: '', url: ''},
  {name: '几内亚_MTN', groupid: '86', url: 'http://10.0.224.100:3000/d/SlAoLoSmz/cachezhan-dian-ji-nei-ya-mtn?refresh=1m&orgId=1'},
  {name: '布隆迪_LEO', groupid: '88', url: 'http://10.0.224.100:3000/d/oXbEYTSiz/cachezhan-dian-bu-long-di-leo?refresh=1m&orgId=1'}
]
// 各个cache节点对应的grafana子页面地址
var cache_url = {
}
//网络链接
var pack_loss_probability = [
  {fromName: '北京', hostid: '10084', toName: '亚马逊云'},
  {fromName: '上云站机房', hostid: '10545', toName: '亚马逊云'}
]
// 南非OS组id、南非ott上云组id、gslb的主机id、app相关数据所在主机id
var groupid_ott = 55, group_os = 54, gslb_manage_hostid = 10600, app_hostid = 10554
// 需要监控的主机组
var error_group_list = ['0701_AWS_研究院', '南非上云_OTT', '南非os组', '国内_总部机房', '国内_研究院_Aws_Openvpn_server']
// 获取统一的状态色
var getColor = function(type) {
  if (type == 'none') {
    return '#999999'
  } else if (type == 'good') {
    return '#30af81'
  } else if (type == 'well') {
    return '#d1d41a'
  } else {
    return '#ff1d04'
  }
}
// 格式化数字输出
var format_number = function(n) {
  var b = parseInt(n).toString()
  var len = b.length
  if (len <= 3) {
    return b
  }
  var r = len % 3
  return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",")
}

// 格式化
var convertLinesData = function(data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var fromCoord = geoCoordMap[dataItem.fromName]
    var toCoord = geoCoordMap[dataItem.toName]
    if (dataItem.toName === '亚马逊云') {
      toCoord = [toCoord[0] + 0.1, toCoord[1] - 2]
    }
    if (dataItem.fromName === '上云站机房') {
      fromCoord = [fromCoord[0] - 1.5, fromCoord[1] + 1.5]
    }
    if (fromCoord && toCoord) {
      var type = 'none', opacity = 0.1
      if (dataItem.value >= 0) {
        type = 'good'
        opacity = 0.3
      } else if (dataItem.value >=10) {
        type = 'well'
        opacity = 0.5
      } else if (dataItem.value >=50) {
        type = 'bad'
        opacity = 0.8
      }
      var push_data = {
        fromName: dataItem.fromName,
        toName: dataItem.toName,
        coords: [fromCoord, toCoord],
        lineStyle: {
          normal: {
            color: getColor(type),
            width: 1,
            opacity: opacity,
            curveness: 0.2
          }
        }
      }
      if (type === 'none') {
        push_data.effect = {
          symbolSize: 0
        }
      }
      res.push(push_data)
    }
  }
  return res
}
var convertPonitData = function(data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var coord = geoCoordMap[dataItem.name]
    if (coord) {
      var type_cache = 'none'
      if (dataItem.value[0] == 0) {
        type_cache = 'good'
      } else if (dataItem.value[0] > 0) {
        type_cache = 'well'
      } else if (dataItem.value[0] > 5) {
        type_cache = 'bad'
      }
      var type_load = 'none'
      if (dataItem.value[1] >= 0) {
        type_load = 'good'
      } else if (dataItem.value[1] >= 80) {
        type_load = 'well'
      } else if (dataItem.value[1] >= 90) {
        type_load = 'bad'
      }
      var push_data = {
        name: dataItem.name,
        value: coord.concat(dataItem.value),
        groupid: dataItem.groupid,
        url: dataItem.url,
        itemStyle: {
          normal: {
            color: getColor(type_cache)
          }
        },
        label: {
          show: true,
          position: 'bottom',
          padding: [5, 0, 0, 0],
          formatter: function(params) {
            return params.value[3] + '%'
          },
          color: getColor(type_load)
        },
        emphasis: {
          label: {
            show: true,
            color: '#ffffff',
            fontSize: 22,
            position: ['100%', '100%'],
            backgroundColor: 'rgba(43, 43, 43, 0.8)',
            padding: 30,
            formatter: '{b}'
          }
        }
      }
      if (type_cache == 'none') {
        push_data.rippleEffect = {
          period: 0,
          scale: 0
        }
      }
      if (type_load == 'none' || dataItem.value[1] == 0) {
        push_data.label.show = false
      }
      res.push(push_data)
    }
  }
  return res
}
function getName (name, type) {
  name = name.replace('record/','').replace('__', '_').replace(/(_SD||_BD||_HD||_CD||_DB)_\d+_\d+_\d+x\d+_\d+.+/ig, '').replace('__', '_')
  switch (type) {
    case 'jieshou':
      name = name.match(/'(\w|\s)*'/ig)[0].replace('\'', '').replace('\'', '').replace(/\s/ig, '_')
      .replace(/(_SD||_BD||_HD||_CD||_DB)+/ig, '')
      break
    case 'zhuanma':
      name = name.replace('check ', '')
      break
    case 'qiepian':
      name = name
      break
    case 'aws':
      name = name
      break
    default:
      name = name
  }
  switch (name) {
    case 'NGW':
      name = 'NGW_E'
      break
    case 'fenghuan':
      name = 'FENG_HUAN'
      break
    case 'CHINESE':
      name = 'ST_CHINESE_HOMELAND'
      break
    case 'BORDER':
      name = 'BORDER_TV'
      break
    default:
      name = name
  }
  name = name.replace('-', '_').toUpperCase()
  return name
}
// 图片路径
var awsPath = 'image://./img/aws_ott-good.png'
var awsBadPath = 'image://./img/aws_ott-bad.png'
var awsErrorPath = 'image://./img/aws_ott-error.png'
var chinaPath = 'image://./img/startimes_noc-good.png'
var chinaBadPath = 'image://./img/startimes_noc-bad.png'
var chinaErrorPath = 'image://./img/startimes_noc-error.png'
var satellitePath = './img/wx-good.gif'
var satelliteBadPath = './img/wx-bad.gif'
var satelliteErrorPath = './img/wx-error.gif'
var radarPath = './img/radar-good.gif'
var radarBadPath = './img/radar-bad.gif'
var radarErrorPath = './img/radar-error.gif'
var serverPath = 'image://./img/server-good.png'
var serverBadPath = 'image://./img/server-bad.png'
var serverErrorPath = 'image://./img/server-error.png'
