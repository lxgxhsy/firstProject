// mock数据模拟
import Mock from 'mockjs'
// 导入数据
import videoData from '../../data/mockData/videoData'
import userData from '../../data/mockData/userData'
import tableData from '../../data/mockData/tableData'

// 图表数据
let List =[]
// 直接导出
export default {
    getStatisticalData: () => {
        //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    qiushui: Mock.Random.float(100, 8000, 0, 0),
                    chengfeng: Mock.Random.float(100, 8000, 0, 0),
                    qiu: Mock.Random.float(100, 8000, 0, 0),
                    defe: Mock.Random.float(100, 8000, 0, 0),
                    vffg: Mock.Random.float(100, 8000, 0, 0),
                    ferfe: Mock.Random.float(100, 8000, 0, 0)
                })
            )
        }
        // 返回给浏览器的数据
        return {
            code: 20000,
            data: {
                // 饼图
                videoData,
                // 柱状图
                userData,
                // 折线图
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                    data: List
                },
                tableData
            }
        }
    }
}
