<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <el-aside width="auto">
        <CommonAside />
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <common-tag></common-tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
import CommonTag from '@/components/CommonTag.vue';
export default{
    name: 'HomeView',
    components: {
        CommonAside,
        CommonHeader,
        CommonTag
    },
    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>

.common-layout {
  width: 100%;
  height: 100vh;
}
.el-header {
    background-color: #333;
}
.el-aside {
  height: inherit;
}
.el-main {
    padding-top: 0;
}
</style>