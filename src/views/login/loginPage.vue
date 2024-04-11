<template>
    <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
    >
        <h3 class="login-title">系統登入</h3>
        <el-form-item
        label="用戶名稱"
        label-width="80px"
        prop="userName"
        class="username"
        >
            <el-input
            type="input"
            v-model="form.username"
            autocomplete="off"
            placeholder="請輸入帳號"
            ></el-input>
        </el-form-item>
        <el-form-item
        label="密碼"
        label-width="80px"
        prop="password"
        >
        <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="請輸入密碼"
        ></el-input>
    </el-form-item>
    <el-button type="primary" @click="login" class="login_submit">登入</el-button>
    </el-form>
</template>
<script>
import Mock from 'mockjs';
import Cookie from 'js-cookie';
import permission from '@/api/mockServeData/permission';

export default {
    name: 'loginPage',
    data () {
        return {
            form: {
                
            },
            rules: {
                username: [
                    {
                        required: true, 
                        message: '請輸入用戶名稱',
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        message: '用戶名稱長度不得小於三位',
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '請輸入密碼',
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    methods: {
        login() {
            this.$refs.form.validate((valid)=> {
                if (valid) {
                    permission.getMenu({ body: JSON.stringify(this.form)})
                    .then(response => {
                        const token = Mock.Random.guid();
                        Cookie.set('token', token);
                        this.$store.commit('setToken', token);
                        this.$store.commit('setMenu', response.data.menu);
                        this.$router.push('/home');
                    }).catch(error => {
                        this.$message.error(error.message || '登入失敗');
                    });
                    
                } else {
                    console.log('此帳號不存在');
                    this.$message.error('登入失敗');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
.login-container {
    width: 350px;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    padding: 35px 35px 15px;
    background: #ffffff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cacaca;
}
.login-title {
    margin: 0 auto 20px;
    text-align: center;
    color: #505458;
}
.el-form-item {

    div {
        margin-left: 0 !important;

            button {
            margin: 0 auto;
        }
    }
}
</style>