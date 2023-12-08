<template>
  <el-menu
   default-active="1"
   class="el-menu-vertical-demo"
   :collapse="isCollapsed"
   background-color="#545c64"
   text-color="#fff"
   active-text-color="#ffd04b"
 >
 <h3>{{ isCollapsed ? '後臺' : '通用後臺管理系統'}}</h3>
   <el-menu-item v-for="item in filterMenu" :index="item.path" :key="item.path" @click="clickMenu(item)">
     <el-icon>
       <component :is="item.icon"></component>
     </el-icon>
     <template #title>{{ item.label }}</template>
   </el-menu-item>
   <el-sub-menu v-for="item in filterMenu_withChildren" :index="item.path" :key="item.path">
     <template #title>
       <el-icon>
         <component :is="item.icon"></component>
       </el-icon>
       <span>其他</span>
     </template>
     <el-menu-item-group>
       <el-menu-item v-for="childItem in item.children" :key="childItem.path" :index="childItem.path">
         <el-icon>
           <component :is="childItem.icon"></component>
         </el-icon>
         <template #title>{{ childItem.label }}</template>
       </el-menu-item>
     </el-menu-item-group>
   </el-sub-menu>
 </el-menu>
</template>
<script>
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
export default {
    data(){
        return {
            menu: [
                {
                    path: '/home',
                    name: 'home',
                    label: '首頁',
                    icon: 'HomeFilled',
                    url: 'Home/Home'
                },
                {
                    path: '/mail',
                    name: 'mail',
                    label: '商品管理',
                    icon: 'video-play',
                    url: 'MailManage/MailManage'
                },
                {
                    path: '/user',
                    name: 'user',
                    label: '用戶管理',
                    icon: 'user',
                    url: 'UserManage/UserManage'
                },
                {
                    label: '其他',
                    icon: 'location',
                    children: [
                        {
                            path: '/page1',
                            name: 'page1',
                            label: '頁面1',
                            icon: 'Setting',
                            url: 'Other/PageOne'
                        },
                        {
                            path: '/page2',
                            name: 'page2',
                            label: '頁面2',
                            icon: 'Setting',
                            url: 'Other/PageTwo'
                        }
                    ]
                }
              ]
            }
        },
    methods: {
        clickMenu(item) {
          this.$router.push({
            name: item.name,
          })
        },
        getIconComponent (iconName) {

          return ElementPlusIconsVue[iconName] || 'defaultIcon';
        }
    },
    computed: {
        filterMenu() {
            return this.menu.filter(item => !item.children);
        },
        filterMenu_withChildren() {
            return this.menu.filter(item => item.children);
        },
        isCollapsed() {
          return this.$store.state.tab.isCollapsed;
        }
    }
};
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.el-aside {
  border: none;
  padding: 0;

  ul {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    margin: 0 ;
  }
}
</style>