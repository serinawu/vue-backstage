"use strict";(self["webpackChunkvue_backstage"]=self["webpackChunkvue_backstage"]||[]).push([[360],{7360:function(e,a,l){l.r(a),l.d(a,{default:function(){return g}});var o=l(3396);const t=e=>((0,o.dD)("data-v-09f0522b"),e=e(),(0,o.Cn)(),e),r=t((()=>(0,o._)("h3",{class:"login-title"},"系統登入",-1)));function n(e,a,l,t,n,s){const m=(0,o.up)("el-input"),u=(0,o.up)("el-form-item"),i=(0,o.up)("el-button"),d=(0,o.up)("el-form");return(0,o.wg)(),(0,o.j4)(d,{model:n.form,"status-icon":"",rules:n.rules,ref:"form","label-width":"100px",class:"login-container"},{default:(0,o.w5)((()=>[r,(0,o.Wm)(u,{label:"用戶名稱","label-width":"80px",prop:"userName",class:"username"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{type:"input",modelValue:n.form.username,"onUpdate:modelValue":a[0]||(a[0]=e=>n.form.username=e),autocomplete:"off",placeholder:"請輸入帳號"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(u,{label:"密碼","label-width":"80px",prop:"password"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{type:"password",modelValue:n.form.password,"onUpdate:modelValue":a[1]||(a[1]=e=>n.form.password=e),autocomplete:"off",placeholder:"請輸入密碼"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(i,{type:"primary",onClick:s.login,class:"login_submit"},{default:(0,o.w5)((()=>[(0,o.Uk)("登入")])),_:1},8,["onClick"])])),_:1},8,["model","rules"])}l(560);var s=l(7634),m=l.n(s),u=l(680),i={getMenu:e=>new Promise(((a,l)=>{const{username:o,password:t}=JSON.parse(e.body);"admin"===o&&"admin"===t?a({data:{menu:[{path:"/home",name:"home",label:"首頁",icon:"HomeFilled",url:"home/index"},{path:"/mall",name:"mall",label:"商品管理",icon:"video-play",url:"mall/index"},{path:"/user",name:"user",label:"用戶管理",icon:"user",url:"user/index"},{path:"/other",label:"其他",icon:"location",children:[{path:"/page1",name:"page1",label:"頁面1",icon:"Setting",url:"other/pageOne"},{path:"/page2",name:"page2",label:"頁面2",icon:"Setting",url:"other/pageTwo"}]}],token:m().Random.guid(),message:"獲取成功"}}):"test"===o&&"Test123"===t?a({data:{menu:[{path:"home",name:"home",label:"首頁",icon:"HomeFilled",url:"home/index"},{path:"mall",name:"mall",label:"商品管理",icon:"video-play",url:"mall/index"}],token:m().Random.guid(),message:"獲取成功"}}):l({message:"用戶或密碼錯誤"})}))},d={name:"loginPage",data(){return{form:{},rules:{username:[{required:!0,message:"請輸入用戶名稱",trigger:"blur"},{min:3,message:"用戶名稱長度不得小於三位",trigger:"blur"}],password:[{required:!0,message:"請輸入密碼",trigger:"blur"}]}}},methods:{login(){this.$refs.form.validate((e=>{if(!e)return console.log("此帳號不存在"),this.$message.error("登入失敗"),!1;i.getMenu({body:JSON.stringify(this.form)}).then((e=>{const a=m().Random.guid();u.Z.set("token",a),this.$store.commit("setToken",a),this.$store.commit("setMenu",e.data.menu),this.$router.push("/home")})).catch((e=>{this.$message.error(e.message||"登入失敗")}))}))}}},p=l(89);const c=(0,p.Z)(d,[["render",n],["__scopeId","data-v-09f0522b"]]);var g=c}}]);
//# sourceMappingURL=360.6f6095ac.js.map