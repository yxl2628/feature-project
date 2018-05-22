import { Component } from 'react'
import echarts from 'echarts'
import styles from './index.css'
import router from 'umi/router'

class JinZhongMap extends Component {
  componentDidMount() {
    const jinzhongGeoJson = require('./jinzhong.json')
    echarts.registerMap('jinzhong', jinzhongGeoJson)
    const youeryuanData = require('../../../../assets/data.json')
    const myChart = echarts.init(document.getElementById('map'))
    myChart.setOption({
      title: false,
      tooltip: false,
      legend: {
        top: 30,
        left: 60,
        show: true,
        orient: 'vertical',
        textStyle: {
          fontSize: 11,
          color: '#303c5f'
        }
      },
      geo: {
        show: true,
        map: 'jinzhong',
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#ffffff'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        roam: false,
        zoom: 1.2,
        itemStyle: {
          normal: {
            areaColor: '#3d91d0 ',
            borderColor: '#7ecbf7'
          },
          emphasis: {
            areaColor: '#3d91d0',
          }
        }
      },
      series: [
        this.convertData(youeryuanData, 0),
        this.convertData(youeryuanData, 1)
      ]
    })
    myChart.on('mouseover', function (params) {
      const op = myChart.getOption()
      const series = op.series
      series.forEach(function(value) {
        const data = value.data
        data.forEach(function(_value) {
          if (_value.name === params.name) {
            _value.label.show = true
          } else {
            _value.label.show = false
          }
        })
      })
      myChart.setOption(op, true)
    })
    myChart.on('click', function (params) {
      if (params.componentType === 'series' && params.data.status === 1) {
        router.push('/video?id=' + params.data.id + '&type=jk')
      }
    })
  }
  convertData = (data, status) => {
    const filterData = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === status) {
        data[i].value = data[i].latlon.concat(data[i].status)
        data[i].label = {
          normal: {
            show: false,
            position: data[i].value[1] >= 37.681724 ? 'right' : 'top',
            distance: 10,
            formatter: function (params) {
              const html = '{name|' + params.data.name + '}\n' +
                            '{tel|' + params.data.tel + '}\n' +
                            '{address|' + params.data.address + '}'
              return html
            },
            backgroundColor: '#ffffff',
            borderRadius: 4,
            shadowColor: 'rgba(117, 171, 208, 0.3)',
            shadowBlur: 30,
            padding: 20,
            lineHeight: 20,
            rich: {
              name: {
                color: '#5a656f',
                fontSize: 14,
                lineHeight: 30
              },
              tel: {
                color: '#cccccc',
                fontSize: 12
              },
              address: {
                color: '#cccccc',
                fontSize: 12
              }
            }
          }
        }
        filterData.push(data[i])
      }
    }
    const type = status === 0 ? 'effectScatter' : 'effectScatter'
    const name = status === 0 ? '未开通幼儿园' : '已开通幼儿园'
    const color = status === 0 ? '#e0593e' : '#60d222'
    const series = {
      name: name,
      type: type,
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      symbolSize: 9,
      rippleEffect: {
        period: 4,
        scale: 5,
        brushType: 'stroke'
      },
      z: 1,
      data: filterData,
      itemStyle: {
        normal: {
          color: color
        }
      }
    }
    return series
  }
  render() {
    return (
      <div id = "map" className = { styles.map } > </div>
    )
  }
}

export default JinZhongMap
