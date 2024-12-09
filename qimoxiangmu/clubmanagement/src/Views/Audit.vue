<template>
    <div class="manage">
        <div class="common-table">
            <!-- 社团数据Table -->
            <el-table :data="tableData" stripe tooltip-effect="dark" style="width: 100%" height="94%"
                :default-sort="{ prop: 'IIIDDD', order: 'ascending' }">
                <el-table-column prop="IIIDDD" label="ID" sortable width="80px">
                </el-table-column>
                <el-table-column prop="clubName" label="社团名称">
                </el-table-column>
                <el-table-column prop="characteristic" label="类型">
                    <template slot-scope="scope">
                        <span>{{ s[scope.row.characteristic] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="auditName" label="申请人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="intro" label="社团简介" show-overflow-tooltip>
                </el-table-column>
                <!-- 自定义列 -->
                <el-table-column label="操作" width="280px">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleAgree(scope.row)">同意</el-button>
                        <el-button type="danger" @click="handleRefuse(scope.row)">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pager">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                    :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="limit"
                    layout="sizes, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
    
<script>
// import { getClub, createClub, deleteClub, updateClub } from '../api/index'
import $ from 'jquery'
export default {
    data() {
        return {
            s: ['0', '理论研究类', '体育竞技类', '科技创新类', '艺术特长类'],

            // 列表数据
            tableData: [],
            allData: [],

            // 分页的对象
            limit: 10,
            currentPage: 1,
            page: 1,
            total: null,

        }
    },
    methods: {
        // 获取列表数据
        getList() {
            this.allData = []
            $.ajax({
                url: 'http://127.0.0.1:3008/Mange/clubApp/getList/',
                type: 'GET',
                dataType: "json",
                success: (res) => {
                    console.log(res);
                    for (let i = res.length - 1; i >= 0; i--) {
                        var newarray = [{
                            IIIDDD: res[i].id,
                            clubName: res[i].clubname,
                            characteristic: res[i].charid,
                            auditName: res[i].name,
                            intro: res[i].intro
                        }];
                        this.allData = newarray.concat(this.allData);

                    }
                    this.total = this.allData.length
                    // console.log(this.total);
                    this.getPageList();
                },
                error() {
                    console.log('失败');
                }
            })
        },

        handleAgree(index) {
            this.$confirm('此操作将同意该社团, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 同意操作:根据后端接口,参数是对象,id是唯一标识符
                console.log(index);
                $.ajax({
                    url: 'http://127.0.0.1:3008/Mange/clubApp/AgreeClubAppMange/',
                    type: 'POST',
                    data: {
                        id: index.IIIDDD
                    },
                    Headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    },
                    success: (res) => {
                        this.$message({
                            type: 'success',
                            message: '同意成功!'
                        })
                        this.currentPage = this.page
                        this.getList()
                    }
                })
            }).catch(() => {
                // 点击取消:不同意了
                this.$message({
                    type: 'info',
                    message: '已取消同意'
                });
            });
        },

        // 拒绝按钮
        handleRefuse(index) {
            this.$confirm('此操作将永久拒绝该社团, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 拒绝操作:根据后端接口,参数是对象,id是唯一标识符
                console.log(index);
                $.ajax({
                    url: 'http://127.0.0.1:3008/Mange/clubApp/removeClubAppMangeById/' + index.IIIDDD + '/',
                    type: 'POST',
                    success: (res) => {
                        this.$message({
                            type: 'success',
                            message: '拒绝成功!'
                        })
                        this.currentPage = this.page
                        this.getList()
                    }
                })
            }).catch(() => {
                // 点击取消:不拒绝了
                this.$message({
                    type: 'info',
                    message: '已取消拒绝'
                });
            });
        },

        // 改变页码
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val
            this.getPageList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val
            this.getPageList();
        },
        getPageList() {
            let data = JSON.parse(JSON.stringify(this.allData))
            if (this.page * this.limit > this.total) {
                this.tableData = data.splice(
                    (this.page - 1) * this.limit,
                    this.total - (this.page - 1) * this.limit
                );
            } else {
                this.tableData = data.splice(
                    (this.page - 1) * this.limit,
                    this.limit
                );
            }
        },
    },

    mounted() {
        this.getList()
    }
}
</script>
    
<style>
.el-tooltip__popper {
    max-width: 50%
}
</style>
<style lang="less" scoped>
.manage {
    height: 100%;

    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .common-table {
        height: 90%;
        position: relative;

        .pager {
            position: absolute;
            right: 20px;
            bottom: 0;
        }
    }
}
</style>