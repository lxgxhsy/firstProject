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
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请输入性别">
              <el-option label="Female" :value="1"></el-option>
              <el-option label="Male" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" prop="birth">
            <el-input placeholder="请输入班级" v-model="form.birth"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件" prop="intro">
            <el-input placeholder="请输入电子邮件" v-model="form.intro"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="入学日期">
            <el-form-item prop="enrollment">
              <el-date-picker type="date" placeholder="请选择日期" v-model="form.enrollment">
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input placeholder="请输入地址" v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input placeholder="请输入专业" v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="number">
            <el-input placeholder="请输入电话号码" v-model="form.number"></el-input>
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
      <!-- 用户数据Table -->
      <el-table :data="tableData" stripe tooltip-effect="dark" style="width: 100%" height="94%"
        :default-sort="{ prop: 'IIIDDD', order: 'ascending' }">
        <el-table-column prop="IIIDDD" label="ID" sortable width="80px">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column prop="birth" label="班级">
        </el-table-column>
        <el-table-column prop="intro" label="电子邮件">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="enrollment" label="入学日期">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="major" label="专业">
        </el-table-column>
        <el-table-column prop="number" label="电话号码"  show-overflow-tooltip>
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
        name: '',
        sex: '',
        birth: '',
        intro: '',
        age:'',
        enrollment:'',
        address:'',
        major:'',
        number:''
      },
      // 表单验证规则
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        birth: [{ required: true, message: '请输出班级', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入电子邮件', trigger: 'blur' }],
        age: [{ required: true, message: '请输出年龄', trigger: 'blur' }],
        enrollment: [{ required: true, message: '请输入入学年龄', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
        number: [{ required: true, message: '请输入电话号码', trigger: 'blur' }]
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
      status:true,
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
        url: 'http://127.0.0.1:3010/Mange/Student/getList/',
        type: 'GET',
        dataType: "json",
        success: (res) => {
           console.log(res[1].enrollment);
          for (let i = 1000; i >= 0; i--) {
            var newarray = [{
              IIIDDD: res[i].studentid,
              name: res[i].name,
              sex: res[i].gender,
              birth: res[i].lesson,
              intro: res[i].email,
              age: res[i].age,
              enrollment:res[i].enrollment.slice(0, 10),
              major:res[i].major,
              number:res[i].number,
              address:res[i].address
            }];
            this.allData = newarray.concat(this.allData);
          }
           this.total =  res.length
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
      // 要用箭头函数,若用function会报错,不知道为什么
      this.$refs.form.validate((valid) => {
        // 符合校验
        if (valid) {
          // 提交数据
          if (this.modalType === 0) {
            // 新增 name: '',    
            console.log(this.form);
            $.ajax({
              url: 'http://127.0.0.1:3010/Mange/Student/addStudent/',
              type: 'POST',
              data: {
                name: this.form.name,
                sex: this.form.sex === 1 ? 'Female' : 'Male',
                birth:this.form.birth,
                intro: this.form.intro,
                age:this.form.age,
                enrollment:this.form.enrollment,
                address:this.form.address,
                major:this.form.major,
                number:this.form.number
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
            $.ajax({
              url: 'http://127.0.0.1:3010/Mange/Student/updateStudent/',
              type: 'POST',
              data: {
                id: this.form.IIIDDD,
                name: this.form.name,
                sex: this.form.sex === 1 ? 'Female' : 'Male',
                birth:this.form.birth,
                intro: this.form.intro,
                age:this.form.age,
                enrollment:this.form.enrollment,
                address:this.form.address,
                major:this.form.major,
                number:this.form.number
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
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除操作:根据后端接口,参数是对象,id是唯一标识符
        console.log(index);
        $.ajax({
          url: 'http://127.0.0.1:3010/Mange/Student/removeById/' + index.IIIDDD + '/',
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
      this.allData = []
      // let data = JSON.parse(JSON.stringify(this.allData))
      // if (this.page * this.limit > this.total) {
      //   this.tableData = data.splice(
      //     (this.page - 1) * this.limit,
      //     this.total - (this.page - 1) * this.limit
      //   );
      // } else {
      //   this.tableData = data.splice(
      //     (this.page - 1) * this.limit,
      //     this.limit
      //   );
      // }
      if(this.status === true){
      $.ajax({
        url: 'http://127.0.0.1:3010/Mange/Student/getList/' + this.page + '/' + this.limit + '/',
        type: 'GET',
        dataType: "json",
        success: (res) => {
           console.log(res[1].enrollment);
          for (let i = res.length - 1; i >= 0; i--) {
            var newarray = [{
              IIIDDD: res[i].studentid,
              name: res[i].name,
              sex: res[i].gender,
              birth: res[i].lesson,
              intro: res[i].email,
              age: res[i].age,
              enrollment:res[i].enrollment.slice(0, 10),
              major:res[i].major,
              number:res[i].number,
              address:res[i].address
            }];
            this.allData = newarray.concat(this.allData);
          }
           this.tableData = JSON.parse(JSON.stringify(this.allData))
        },
        error() {
          console.log('失败');
          this.tableData = JSON.parse(JSON.stringify(this.allData))
        }
      })
    }else{
      $.ajax({
          url: 'http://127.0.0.1:3010/Mange/Student/SearchOneByName/',
          type: 'POST',
          data: {
            name: this.searchForm.name,
            page:this.page,
            limit:this.limit,
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
                message: '没有该成员'
              })
              this.status = true
              this.getList();
            } else {
              for (let i = res.length - 1; i >= 0; i--) {
                var newarray = [{
                  IIIDDD: res[i].studentid,
                  name: res[i].name,
                  sex: res[i].gender,
                  birth: res[i].lesson,
                  intro: res[i].email,
                  age: res[i].age,
                  enrollment:res[i].enrollment.slice(0, 10),
                  major:res[i].major,
                  number:res[i].number,
                  address:res[i].address,
                  aa:res[i].size,
                }];
                this.allData = newarray.concat(this.allData);
                console.log(this.allData.length)
              }
              this.total = parseInt(newarray[0].aa)
              this.tableData = JSON.parse(JSON.stringify(this.allData))
            }

          },
          error() {
            console.log('失败');
            this.status = true
            this.getList()
          }
        })
    }
    },
   
    // 搜索
    search() {
      console.log(this.searchForm.name);
      if (this.searchForm.name === '') {
        this.status = true
        this.getList();
      } else {
        this.allData = []
        this.status = false
        $.ajax({
          url: 'http://127.0.0.1:3010/Mange/Student/SearchOneByName/',
          type: 'POST',
          data: {
            name: this.searchForm.name,
            page:this.page,
            limit:this.limit,
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
                message: '没有该成员'
              })
              this.status = true
              this.getList();
            } else {
              for (let i = res.length - 1; i >= 0; i--) {
                var newarray = [{
                  IIIDDD: res[i].studentid,
                  name: res[i].name,
                  sex: res[i].gender,
                  birth: res[i].lesson,
                  intro: res[i].email,
                  age: res[i].age,
                  enrollment:res[i].enrollment.slice(0, 10),
                  major:res[i].major,
                  number:res[i].number,
                  address:res[i].address,
                  aa:res[i].size,
                }];
                this.allData = newarray.concat(this.allData);
                console.log(this.allData.length)
              }
              this.total = parseInt(newarray[0].aa)
              this.getPageList();
            }
          },
          error() {
            console.log('失败');
            this.status = true
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