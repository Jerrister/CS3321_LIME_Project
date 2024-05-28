import React from 'react';
import ReactECharts from 'echarts-for-react';



class InteractiveBarChart extends React.Component {
    render() {
        const { data } = this.props; // 从属性中获取传入的数据

        // 初始颜色
        const normalColor = '#88cb0f';
        // 鼠标悬停时的颜色
        const hoverColor = '#c6ec45';

        // 配置图表
        const option = {
            xAxis: {
                type: 'category',
                data: data.map(item => item.year),
                axisLabel: {
                    rotate: 45 // 旋转 x 轴标签，使其不重叠
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'Value'
                },
                {
                    type: 'value',
                    name: 'Read Count'
                }
            ],
            series: [
                {
                    name: 'Value',
                    type: 'bar',
                    data: data.map(item => ({
                        value: item.value,
                        itemStyle: {
                            color: normalColor
                        },
                        emphasis: {
                            itemStyle: {
                                color: hoverColor
                            }
                        }
                    }))
                },
                {
                    name: 'Read Count',
                    type: 'line',
                    yAxisIndex: 1, // 使用第二个 y 轴
                    data: data.map(item => item.readCount)
                }
            ],
            tooltip: {
                trigger: 'axis'
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'empty'
                },
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    filterMode: 'empty'
                }
            ],
            toolbox: {
                feature: {
                    saveAsImage: {} // 添加保存为图片的功能
                }
            }
        };

        return (
            <ReactECharts option={option} style={{height: '500px'}} />
        );
    }
}

export default InteractiveBarChart;
