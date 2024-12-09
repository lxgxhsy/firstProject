<template>
  <div class="manage">
    <div class="manage-header">
      <!-- 新增按钮 -->
      <el-button type="primary" @click="handlecreate()">+ 新增</el-button>

      <!-- 对话框:点击新增或编辑才会弹出表单 -->
      <!-- :before-close="closeDialog" 点击关闭的x之前要做的事情 -->
      <el-dialog :title="modalType == 0 ? '新建' : '编辑'" :visible.sync="dialogVisible" width="50%"
        :before-close="closeDialog">
        <!-- 表单Form -->
        <!-- ref=form:为了通过this.$refs调用组件的方法 -->
        <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="80px">
          <!-- 每一项表单域:el-form-item -->

          <el-form-item label="名称" prop="name">
            <el-input placeholder="请输入课程名称" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="学分" prop="characteristic">
            <el-input placeholder="请输入学分数量" v-model="form.characteristic"></el-input>
          </el-form-item>
          <el-form-item label="教师名" prop="number">
            <el-input v-model="form.number" placeholder="请输入教师名">
            </el-input>
          </el-form-item>

          <el-form-item label="课程时间" prop="intro">
            <el-input placeholder="请输入课程时间" v-model="form.intro"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 搜索框 -->
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>


    <div class="common-table">
      <!-- 社团数据Table -->
      <el-table :data="tableData" stripe tooltip-effect="dark" style="width: 100%" height="94%"
        :default-sort="{ prop: 'IIIDDD', order: 'ascending' }">
        <el-table-column prop="IIIDDD" label="ID" sortable width="80px">
        </el-table-column>
        <el-table-column prop="name" label="课程名称">
        </el-table-column>
        <el-table-column prop="characteristic" label="学分">
        </el-table-column>
        <el-table-column prop="number" label="教师">
        </el-table-column>
        <el-table-column prop="intro" label="教学时间" show-overflow-tooltip>
        </el-table-column>
        <!-- 自定义列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
      form: {
        name: '',
        characteristic: '',
        number:'',
        intro: ''
      },
      // 表单验证规则
      rules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        characteristic: [{ required: true, message: '请输入学分数', trigger: 'blur' }],
        number: [{ required: true, message: '请输入教师姓名', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入课程时间', trigger: 'blur' }],
      },
      // 表单是否打开
      dialogVisible: false,
      // 列表数据
      tableData: [],
      allData: [],
      // 打开表单:新建0,编辑1
      modalType: 0,
      // 分页的对象
      limit: 10,
      currentPage: 1,
      page: 1,
      total: null,
      // 搜索框表单
      searchForm: {
        name: ''
      }
    }
  },
  methods: {
    // 获取列表数据
    getList() {
      this.allData = []
      $.ajax({
        url: 'http://127.0.0.1:3010/Mange/course/getList/',
        type: 'GET',
        dataType: "json",
        success: (res) => {
          // console.log(res[42]);
          for (let i = res.length - 1; i >= 0; i--) {
            var newarray = [{
              IIIDDD: res[i].id,
              name: res[i].name,
              characteristic: res[i].characteristicid,
              number: res[i].number,
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
    // 表单提交
    submit() {
      this.$refs.form.validate((valid) => {
        // 符合校验
        if (valid) {
          // 提交数据
          if (this.modalType === 0) {
            // console.log(this.form);
            // 新增
            $.ajax({
              url: 'http://127.0.0.1:3010/Mange/course/addCourse/',
              type: 'POST',
              data: {
                name: this.form.name,
                characteristic: this.form.characteristic,
                number: this.form.number,
                intro: this.form.intro
              },
              Headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: (res) => {
                console.log('添加成功');
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.getList()
                // 清空,关闭
                this.closeDialog()
              }, error() {
                console.log('失败');
              }
            })
          } else {
            console.log(this.form);
            // 编辑
            $.ajax({
              url: 'http://127.0.0.1:3010/Mange/course/updateCourse/',
              type: 'POST',
              data: {
                id: this.form.IIIDDD,
                name: this.form.name,
                characteristic: this.form.characteristic,
                number: this.form.number,
                intro: this.form.intro
              },
              Headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: (res) => {
                console.log('修改成功');
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.getList()
                // 清空,关闭
                this.closeDialog()
              }, error() {
                console.log('失败');
              }
            })
          }
        }
      })
    },
    // 关闭对话框
    closeDialog() {
      // 先重置
      this.$refs.form.resetFields()
      // 后关闭
      this.dialogVisible = false
    },
    // 编辑按钮
    handleEdit(index) {
      this.modalType = 1
      this.openForm()
      // 深拷贝
      this.$nextTick(() => {
        this.form = JSON.parse(JSON.stringify(index))
      })

    },
    // 删除按钮
    handleDelete(index) {
      this.$confirm('此操作将永久删除该社团, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除操作:根据后端接口,参数是对象,id是唯一标识符
        console.log(index);
        $.ajax({
          url: 'http://127.0.0.1:3010/Mange/course/removeById/' + index.IIIDDD + '/',
          type: 'POST',
          success: (res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.currentPage = this.page
            this.getList()
          }
        })
      }).catch(() => {
        // 点击取消:不删除了
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 新建按钮
    handlecreate() {
      this.modalType = 0
      this.openForm()
    },
    // 打开表单
    openForm() {
      this.dialogVisible = true
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
    // 搜索
    search() {
      console.log(this.searchForm.name);
      if (this.searchForm.name === '') {
        this.getList();
      } else {
        this.allData = []
        $.ajax({
          url: 'http://127.0.0.1:3010/Mange/course/searchCourseByname/',
          type: 'POST',
          data: {
            name: this.searchForm.name
          },
          Headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: (res) => {
            console.log(res);
            if (res[0].error_message === 'Failed!!!') {
              this.$message({
                type: 'info',
                message: '没有该条信息'
              })
              this.getList()
            } else {
              for (let i = res.length - 1; i >= 0; i--) {
                var newarray = [{
                  IIIDDD: res[i].id,
                  name: res[i].name,
                  characteristic: res[i].characteristicid,
                  number: res[i].number,
                  intro: res[i].intro
                }];
                this.allData = newarray.concat(this.allData);
              }
              this.total = this.allData.length
              this.getPageList();
            }

          },
          error() {
            console.log('失败');
            this.getList()
          }
        })
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