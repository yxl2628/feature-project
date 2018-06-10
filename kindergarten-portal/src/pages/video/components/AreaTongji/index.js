import { Component } from 'react'
import styles from './index.css'
import echarts from 'echarts'

class Tongji extends Component {
  componentDidMount() {
    const myChart = echarts.init(document.getElementById('tj'))
    const {name, list} = this.props
    const length = list.length
    myChart.setOption({
      title: {
        text: name + '幼儿园统计',
        textStyle: {
          fontSize: 16,
          color: '#5a656f',
          textAlign: 'center'
        },
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['幼儿园个数', '教师人数', '学生人数', '家长人数'],
        align: 'left',
        top: 37,
        left: '35%'
      },
      xAxis: [{
        type: 'category',
        data: ['2016年', '2017年', '2018年']
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      }],
      grid: {
        top: 100,
        bottom: 20
      },
      series: [{
        name: '幼儿园个数',
        type: 'bar',
        data: [length, length, length],
        itemStyle: {
          normal: {
              color: '#28c1c3'
          }
        }
      }, {
        name: '教师人数',
        type: 'bar',
        data: [12*length, 12*length, 18*length],
        itemStyle: {
          normal: {
              color: '#ad98da'
          }
        }
      }, {
        name: '学生人数',
        type: 'bar',
        data: [90*length, 120*length, 145*length],
        itemStyle: {
          normal: {
              color: '#50a9ed'
          }
        }
      }, {
        name: '家长人数',
        type: 'bar',
        data: [104*length, 143*length, 169*length],
        itemStyle: {
          normal: {
              color: '#ffb075'
          }
        }
      }]
    })
  }
  render () {
    return (
      <div className={styles.content}>
        <div className={styles.title}>园区统计如下表：</div>
        <div id="tj" className={styles.chart}></div>
      </div>
    )
  }

}

export default Tongji
