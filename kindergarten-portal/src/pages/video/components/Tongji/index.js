import { Component } from 'react'
import styles from './index.css'
import echarts from 'echarts'

class Tongji extends Component {
  componentDidMount() {
    const myChart = echarts.init(document.getElementById('tj'))
    myChart.setOption({
      title: {
        text: '园区人数统计',
        textStyle: {
          fontSize: 20,
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
        data: ['班级个数', '教师人数', '学生人数', '家长人数'],
        align: 'left',
        top: 45,
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
        name: '班级个数',
        type: 'bar',
        data: [1, 1, 2],
        itemStyle: {
          normal: {
              color: '#28c1c3'
          }
        }
      }, {
        name: '教师人数',
        type: 'bar',
        data: [10, 8, 12],
        itemStyle: {
          normal: {
              color: '#ad98da'
          }
        }
      }, {
        name: '学生人数',
        type: 'bar',
        data: [20, 12, 31],
        itemStyle: {
          normal: {
              color: '#50a9ed'
          }
        }
      }, {
        name: '家长人数',
        type: 'bar',
        data: [29, 18, 39],
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
