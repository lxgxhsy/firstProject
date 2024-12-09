<template>
    <el-row>
        <el-col :span="8">
            <!-- user卡片 -->
            <el-card>
                <div class="user">
                    <img src="../assets/images/user.png" alt="">
                    <div class="userInfo">
                        <p div class="name">Admin</p>
                        <p div class="access">超级管理员</p>
                    </div>
                </div>
                <div class="loginInfo">
                    <p>上次登录时间：<span>{{ onTime }}</span></p>
                    <p>上次登陆地点：<span>宿迁</span></p>
                </div>
            </el-card>
            <!-- table卡片 -->
            <el-card style="margin-top: 20px;">
                <el-table :data="TableData" style="width: 100%">
                    <!-- 这里的val,key对应的是对象里的 -->
                    <el-table-column v-for="(value, key) in TableLabel" :prop="key" :label="value" :key="key">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="num">
                <el-card v-for="item in CountData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
                    <div class="details">
                        <p class="price">{{ priceFormate(item.value) }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <!-- echarts图表 -->
            <div style="margin-left:20px">
                <!-- 折线图 -->
                <el-card style="height:280px">
                    <div ref="echarts1" style="height:280px"></div>
                </el-card>
                <div class="graph">
                    <!-- 柱状图 -->
                    <el-card style="height:280px">
                        <div ref="echarts2" style="height:280px"></div>
                    </el-card>
                    <!-- 饼状图 -->
                    <el-card style="height:320px">
                        <div ref="echarts3" style="height:320px"></div>
                    </el-card>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import TableLabel from '../data/TableLabel'
import CountData from '../data/CountData'
import { getData } from '../api/index'
import * as echarts from 'echarts'

// echarts的配置数据
import order from '../data/echartsData/order'
import user from '../data/echartsData/user'
import video from '../data/echartsData/video'

export default {
    data() {

        return {
            onTime: '',
            TableData: [],
            TableLabel,
            CountData
        }
    },
    methods: {
        priceFormate(price) {
            return price
        }
    },
    mounted() {
        getData().then((data) => {
            var Time = new Date()
            var year = Time.getFullYear() //获取完整的年份(4位)
            var month = Time.getMonth() + 1 //获取当前月份(0-11,0代表1月)
            var strDate = Time.getDate() // 获取当前日(1-31)
            if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
            if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0
            this.onTime = `${year}-${month}-${strDate}`

            console.log(this.onTime);
            // console.log(data);
            this.TableData = data.data.getStatisticalData.data.tableData

            // echarts图表

            // 折线图

            // 基于准备好的dom，初始化echarts实例
            const echarts1 = echarts.init(this.$refs.echarts1)
            var echarts1Option = order
            // ES6解构语法
            var { orderData, userData, videoData } = data.data.getStatisticalData.data

            // 获取x轴:要求是一个对象
            const xAxis = Object.keys(orderData.data[0])
            const xAxisData = {
                data: xAxis
            }

            // 配置
            echarts1Option.legend = xAxisData
            echarts1Option.xAxis = xAxisData
            echarts1Option.yAxis = {}
            echarts1Option.series = []

            // 配置series
            xAxis.forEach(key => {
                echarts1Option.series.push({
                    name: key,
                    type: 'line',
                    // key对应的orderData的所有值
                    data: orderData.data.map(item => item[key])
                })
            })

            // 使用刚指定的配置项和数据显示图表。
            echarts1.setOption(echarts1Option);

            // 柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            var echarts2Option = user

            // 配置
            echarts2Option.xAxis.data = userData.map(item => item.date)
            echarts2Option.series = [
                {
                    name: '新增用户',
                    data: userData.map(item => item.new),
                    // 类型:bar是柱状图 
                    type: 'bar'
                }
                ,
                {
                    name: '活跃用户',
                    data: userData.map(item => item.active),
                    type: 'bar'
                }
            ]

            echarts2.setOption(echarts2Option);

            // 饼状图
            const echarts3 = echarts.init(this.$refs.echarts3)
            var echarts3Option = video
            echarts3Option.series = {
                data: videoData,
                type: 'pie'
            }
            echarts3.setOption(echarts3Option);
        })
    }
}
</script>

<style lang="less" scoped>
.user {
    // 垂直居中
    display: flex;
    align-items: center;

    // 外边距:分割线距离loginInfo的距离
    margin-bottom: 20px;
    // 内边距:分割线距离User的距离
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
    }

    .userInfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.loginInfo {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}

.num {
    display: flex;
    // 要换行
    flex-wrap: wrap;
    // 从头到尾均匀排列
    justify-content: space-between;
    margin-left: 20px;

    .el-card {
        width: 32%;
        margin-bottom: 20px;

        .icon {
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-size: 30px;
            color: #fff;
        }

        .details {
            // 竖着排且居中
            display: flex;
            flex-direction: column;
            justify-content: center;

            margin-left: 15px;

            .price {
                font-size: 30px;
                margin-bottom: 10px;
                line-height: 30px;
                height: 30px;
            }

            .desc {
                font-size: 14px;
                color: #999;
                text-align: center;
            }
        }
    }
}

.graph {
    display: flex;
    // 两个靠边
    justify-content: space-between;
    margin-top: 20px;

    .el-card {
        width: 49%;
    }
}
</style>