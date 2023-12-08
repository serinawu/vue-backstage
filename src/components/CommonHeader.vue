<template>
    <header>
        <div class="l-content">
            <button @click="handleMenu">
                <el-icon size="mini">
                    <Menu />
                </el-icon>
            </button>
            <h3 style="color: #fff">首頁</h3>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand" trigger="click" size="mini">
                <span class="user el-dropdown-link">
                    <img :src="userImg">
                </span>
                <el-dropdown-menu>
                    <el-dropdown-item command="a">個人中心</el-dropdown-item>
                    <el-dropdown-item command="b">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<script>

    export default {
        name: 'CommonHeader',
        data() {
            return {
                userImg: require('../assets/images/user.png')
            }
        },
        methods: {
            handleCommand(command) {
                this.$message('click on item' + command);
            },
            handleMenu() {
                this.$store.commit('collapseMenu');
            }
        }
    }
</script>
<style lang="less" scoped>
header {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }
}
.r-content {

    .user {
        width: 40px;
        height: 40px;
        border-radius: 50px;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .el-dropdown-item {
        color: #000;
    }
}
</style>