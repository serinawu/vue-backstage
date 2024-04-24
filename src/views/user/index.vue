<template>
    <div class="manage">
        <el-dialog
        title="提示"
        v-model="dialogVisible"
        width="40%"
        >
        <template v-if="operateType === 'add'">
            <!-- 新增用户的表单 -->
            <el-form :model="form" :rules="rules" ref="addForm" :inline="true">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性別" prop="sex">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="form.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template v-else-if="operateType === 'edit'">
            <!-- 编辑用户的表单 -->
            <el-form :model="operateForm" ref="editForm" :inline="true">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="operateForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性別" prop="sex">
                    <el-input v-model="operateForm.sex"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="operateForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="電話" prop="phone">
                    <el-input v-model="operateForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="operateForm.address"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <span v-else>这是一段信息</span>
        <template #footer>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false, confirm()">確 定</el-button>
        </template>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="dialogVisible = true, confirm">新增</el-button>
            <common-form
            :formLabel="formLabel"
            :form="searchForm"
                :inline="true"
                ref="form"
            >
                <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </common-form>
        </div>
        <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getList()"
        @edit="editUser"
        @del="delUser"
        ></common-table>
    </div>
</template>
<script>
import CommonForm from '@/components/CommonForm.vue';
import CommonTable from '@/components/CommonTable.vue';
import { getMockUser } from '@/api/data.js';
import { formatDate, formatPhone } from '@/utils/formatHelpers';
export default {
    name: 'UserView',
    components: {
        CommonForm,
        CommonTable
    },
    data() {
        return {
            dialogVisible: false,
            operateType: '',
            form: {
                name: '',
                sex: '',
                birth: '',
                phone: '',
                address: '',
            },
            operateForm: {
                name: '',
                sex: '',
                birth: '',
                phone: '',
                address: '',
            },
            rules: {
                name: [{required: true, message: "請輸入姓名"}],
                sex: [{required: true, message: "請選擇性別"}],
                birth: [{required: true, message: "請選擇出生日期"}],
                phone: [{required: true, message: "請輸入聯絡電話"}],
                address: [{required: true, message: "請輸入地址"}],
            },
            formLabel: [
                {
                    model: 'keyword',
                    label: '',
                    type: 'input'
                }
            ],
            searchForm: {
                keyword: ''
            },
            tableData: [],
            tableLabel: [
                {
                    prop: "createdAt",
                    label: "帳號創建日期",
                    width: 180
                },
                {
                    prop: "name",
                    label: "姓名"
                },
                {
                    prop: "sex",
                    label: "性別"
                },
                {
                    prop: "birth",
                    label: "出生日期",
                    width: 200
                },
                {
                    prop: "phone",
                    label: "電話"
                },
                {
                    prop: "address",
                    label: "地址",
                    width: 300
                }
            ],
            config: {
                page: 1,
                total: 10
            }
        };
    },
    methods: {
        handleClose() {
            //彈窗關閉的時候清空表單
            this.$refs.addForm && this.$refs.addForm.resetFields();
            this.$refs.editForm && this.$refs.editForm.resetFields();
            this.dialogVisible = false;
        },
        cancel() {
            this.handleClose();
            this.$message('取消操作');
        },
        addUser() {
            this.operateType = 'add';
            this.form = {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: '',
            };
            this.dialogVisible = true;
        },
        editUser(row){
            this.operateType = 'edit';
            this.operateForm = Object.assign({}, row);
            this.dialogVisible = true;
        },
        delUser (row){
            this.$confirm("此操作將永久刪除該資料，是否繼續？", "提示", {
                confirmButtonText: "確認",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                const id = row.id;
                return this.$http.post("user/del", { id: id });
            }).then(() => {
                this.getList();
                this.$message.success('用戶已刪除');
            }).catch(err => {
                console.log("刪除操作取消", err);
                
            }) },
        getList(name = ''){
            console.log('Search keyword:', name);
            this.config.loading = true;
            name ? (this.config.page = 1) : '';
            getMockUser({
                page: this.config.page,
                name
            }).then(response => {
               const res = response.data;
               if(res && Array.isArray(res)) {
                this.tableData = res.map(item => {
                    item.sex = item.sex === "female" ? "女" : "男";
                    item.createdAt = formatDate(item.createdAt);
                    item.birth = formatDate(item.birth);
                    item.phone = formatPhone(item.phone);
                 return item;
                });
                this.config.total = res.length;
               } else {
                throw new Error(`Expected res to be an array but received: ${typeof res}`);
               }
               this.config.loading = false;
            }).catch(error => {
                console.error('Error fetching data:', error);
                this.config.loading = false;
            });
        },
        confirm() { //提交表單判斷是哪種操作
            let formToValidate = this.operateType === 'edit' ? this.$refs.editForm : this.$refs.addForm;
            if (formToValidate) {
                formToValidate.validate((valid) => {
                    if (valid) {
                        const url = this.operateType === 'edit' ? '/user/edit' : '/user/add';
                        const data = this.operateType === 'edit' ? this.operateForm : this.form;
                        this.$http.post(url, data)
                        .then(() => {
                            this.dialogVisible = false;
                            this.getList();
                            this.$message.success('操作成功');
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            this.$message.error('操作失敗');
                        });
                    }
                });
            }
        },
    },
    created() {
        this.getList();
    }
}

</script>

<style lang="less" scoped>
    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>