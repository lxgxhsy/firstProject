<template>
    <el-form ref="form" class="login_container" :model="login" status-icon :rules="rules" label-width="70px">
        <!-- h3要放在里面:只能有一个根,且title也是表单的一部分 -->
        <h3 class="login_title">用户登录</h3>
        <!-- prop对应rules里的键 -->
        <el-form-item label="用户名" prop="username">
            <el-input v-model="login.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="login.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button @click="submit" type="primary" style="margin-left:30px;margin-top:10px">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Cookie from 'js-cookie'
import { getMenu } from '../api/index'
export default {
    data() {
        return {
            // 登陆数据
            login: {
                username: '',
                password: ''
            },
            // 校验规则
            rules: {
                username: [{ required: 'true', message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: 'true', message: '请输入用户名', trigger: 'blur' }]
            }
        }
    },
    methods: {
        submit() {
            // 表单的校验
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 传入表单数据
                    getMenu(this.login).then((data) => {
                        // console.log(data);
                        if(data.data.code===20000){
                            // 记录cookie
                            Cookie.set('token',data.data.data.token)
                            // 设置菜单
                            this.$store.commit('setMenu',data.data.data.menu)
                            // 动态添加路由
                            this.$store.commit('addMenu',this.$router)
                            // 跳转到首页
                            this.$router.push('/home')
                        }else{
                            // 验证失败的弹窗
                            this.$message.error(data.data.data.message);
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    width: 350px;
    border: 1px solid #eaeaea;

    // 居中
    margin: 180px auto;

    padding: 35px 35px 15px 35px;

    // 让padding在width里面
    box-sizing: border-box;

    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 0 25px #cac6c6;

    .login_title {
        color: #505458;
        // 左右居中
        text-align: center;
        margin-bottom: 40px;
    }

    .el-input {
        width: 198px;
    }
}
</style>