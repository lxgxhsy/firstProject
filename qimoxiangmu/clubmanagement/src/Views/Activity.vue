<template>
  <div class="manage">
    <div class="manage-header">
      <!-- 新增按钮 -->
      <el-button type="primary" @click="handlecreate">+ 新增</el-button>

      <!-- 对话框:点击新增或编辑才会弹出表单 -->
      <!-- :before-close="closeDialog" 点击关闭的x之前要做的事情 -->
      <el-dialog :title="modalType == 0 ? '新建' : '编辑'" :visible.sync="dialogVisible" width="50%"
        :before-close="closeDialog">
        <!-- 表单Form -->
        <!-- ref=form:为了通过this.$refs调用组件的方法 -->
        <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="80px">
          <!-- 每一项表单域:el-form-item -->
          <el-form-item label="学生编号" prop="title">
            <el-input placeholder="请输入学生编号" v-model="form.title"></el-input>
          </el-form-item>

          <el-form-item label="课程编号" prop="inClub">
            <el-input v-model="form.inClub" placeholder="请选择课程编号">
            </el-input>
          </el-form-item>

          <el-form-item label="成绩">
            <el-form-item prop="startTime">
              <el-input  placeholder="请填写成绩" v-model="form.startTime">
              </el-input>
            </el-form-item>
          </el-form-item>

     
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 搜索框 -->
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <!-- 活动数据Table -->
      <el-table :data="tableData" stripe tooltip-effect="dark" style="width: 100%" height="94%"
        :default-sort="{ prop: 'IIIDDD', order: 'ascending' }">
        <el-table-column prop="IIIDDD" label="ID" sortable width="80px">
        </el-table-column>
        <el-table-column prop="title" label="学生编号">
        </el-table-column>
        <el-table-column prop="inClub" label="课程编号">
        </el-table-column>
        <el-table-column prop="startTime" label="成绩">
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
// import { getUser, createUser, deleteUser, updateUser } from '../api/index'
import $ from 'jquery'
export default {
  data() {
    return {
      // 表单绑定的数据
      form: {
        title: '',
        inClub: '',
        startTime: '',
      },
      // 表单验证规则
      rules: {
        title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        inClub: [{ required: true, message: '请输入学生编号', trigger: 'blur' }],
        startTime: [{ required: true, message: '请输入课程编号', trigger: 'blur' }],
          },
      // 表单是否打开
      dialogVisible: false,
      // 列表数据
      tableData: [],
      clubData: [],
      // 打开表单:新建0,编辑1
      modalType: 0,
      // 分页的对象
      limit: 10,
      currentPage: 1,
      status:true,
      page: 1,
      total: null,
      // 搜索框表单
      searchForm: {
        title: ''
      }
    }
  },
  methods: {
    // 获取列表数据
    getList() {
      this.allData = []
      $.ajax({
        url: 'http://127.0.0.1:3010/Mange/enrollment/getList/',
        type: 'GET',
        dataType: "json",
        success: (res) => {
          console.log(res);
          for (let i = 10000; i >= 0; i--) {
            var newarray = [{
              IIIDDD: res[i].id,
              title: res[i].studentid,
              inClub: res[i].courseid,
              startTime: res[i].grade
            }];
            //使用concat()来把两个数组合拼起来
            this.allData = newarray.concat(this.allData);
          }
          this.total = res.length
          // console.log(this.total);
          this.getPageList();
        }, error() {
          console.log('失败');
        }
      })
    },
    // 表单提交
    submit() {
      // 要用箭头函数,若用function会报错,不知道为什么
      this.$refs.form.validate((valid) => {
        // 符合校验
        if (valid) {
          // 提交数据
          if (this.modalType === 0) {
            // console.log(this.form);
            // 新增
            // console.log(this.form);
            $.ajax({

              url: 'http://127.0.0.1:3010/Mange/enrollment/addEnrollment/',
              type: 'POST',
              data: {
              title: res[i].studentid,
              inClub: res[i].courseid,
              startTime: res[i].grade
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
            // 编辑
            console.log(this.form);
            $.ajax({
              url: 'http://127.0.0.1:3010/Mange/enrollment/updateEnrollment/',
              type: 'POST',
              data: {
                id: this.form.IIIDDD, 
                studentid:this.form.title,
                courseid:this.form.inClub,
                grade:this.form.startTime
                
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
      this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除操作:根据后端接口,参数是对象,id是唯一标识符
        $.ajax({
          url: 'http://127.0.0.1:3010/Mange/enrollment/removeById/' + index.IIIDDD + '/',
          type: 'POST',
          Headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
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
      console.log(this.searchForm.title);
      if (this.searchForm.title === '') {
        this.getList();
      } else {
        this.allData = []
        $.ajax({
          url: 'http://127.0.0.1:3010/Mange/enrollment/SearchOneByName/',
          type: 'POST',
          data: {
            name: this.searchForm.title
          },
          Headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: (res) => {
            console.log(res);
            if (res[0].error_message === '请输入搜索信息！！！') {
              this.$message({
                type: 'info',
                message: '没有该信息,请更换关键词'
              })
              this.getList()
            } else {
              for (let i = res.length - 1; i >= 0; i--) {
                var newarray = [{
                  IIIDDD: res[i].id,
                  title: res[i].studentid,
                  inClub: res[i].courseid,
                  startTime: res[i].grade
                }];
                this.allData = newarray.concat(this.allData);
              }
              this.total =  res.length
              this.getPageList();
            }

          },
          error() {
            console.log('失败');
            this.getList()
          }
        })
      }
    }
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