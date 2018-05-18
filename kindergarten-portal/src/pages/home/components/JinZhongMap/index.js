import { Component } from 'react'
import echarts from 'echarts'
import styles from './index.css'
import router from 'umi/router'

class JinZhongMap extends Component {
  componentDidMount() {
    const jinzhongGeoJson = require('./jinzhong.json')
    echarts.registerMap('jinzhong', jinzhongGeoJson)
    const youeryuanData = require('./data.json')
    const myChart = echarts.init(document.getElementById('map'))
    myChart.setOption({
      title: false,
      tooltip: false,
      legend: {
        top: 30,
        left: 30,
        show: true,
        orient: 'vertical'
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
        roam: true,
        zoom: 1.2,
        itemStyle: {
          normal: {
            areaColor: '#3d91d0 ',
            borderColor: '#6ab9eb',
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
      router.push('/video')
    })
  }
  convertData = (data, status) => {
    const filterData = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].stauts === status) {
        data[i].value = data[i].latlon.concat(data[i].stauts)
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
            padding: 30,
            lineHeight: 20,
            rich: {
              name: {
                color: '#5a656f',
                fontSize: 16
              },
              tel: {
                color: '#5a656f',
                fontSize: 12
              },
              address: {
                color: '#5a656f',
                fontSize: 12
              }
            }
          }
        }
        filterData.push(data[i])
      }
    }
    const name = status === 0 ? '未开通幼儿园' : '已开通幼儿园'
    const color = status === 0 ? '#e0593e' : '#60d222'
    const series = {
      name: name,
      type: 'effectScatter',
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      symbolSize: 6,
      rippleEffect: {
        period: 4,
        scale: 4,
        brushType: 'fill'
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
