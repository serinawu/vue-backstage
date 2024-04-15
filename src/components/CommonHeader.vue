<template>
    <header>
        <div class="l-content">
            <button @click="handleMenu">
                <el-icon size="mini">
                    <Menu />
                </el-icon>
            </button>
            <!-- <h3 style="color: #fff">首頁</h3> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item 
                v-for="item in tags" 
                :key="item.path"
                :to="{ path: item.path }">
                {{ item.label }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="user el-dropdown-link">
                    <img :src="userImg">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="a">個人中心</el-dropdown-item>
                        <el-dropdown-item command="b" @click="logOut">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </header>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'CommonHeader',
        data() {
            return {
                userImg: require('../assets/images/user.png')
            }
        },
        methods: {
            handleMenu() {
                this.$store.commit('collapseMenu');
            },
            handleCommand() {
                
            },
            logOut() {
                this.$store.commit('clearToken');
                this.$store.commit('clearMenu');
                this.$router.push('/login');
                this.$message.success('成功登出！');
            }
        },
        computed: {
            ...mapState({
                tags: state => state.tab.tabsList
            })
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

    :deep(button) {
        margin-right: 20px;
        cursor: pointer;
    }

    :deep(.el-breadcrumb__inner) {
        color: #fff;
        cursor: pointer;

        &:hover,
        &:active {
            color: #409eff;
        }
        
        &.is-link {
            cursor: pointer;
        }
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