<template>
    <div class="manage">
        <el-dialog
        title="提示"
        v-model:visible="dialogVisible"
        width="30%">
        <span>这是一段信息</span>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" plain @click="dialogTableVisible = true">新增</el-button>
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
import { getUser } from '../../api/data.js';
export default {
    name: 'UserView',
    components: {
        CommonForm,
        CommonTable
    },
    data() {
        return {
            dialogVisible: false,
            operateType: 'add',
            operateFormLabel: [
                {
                    model: 'name',
                    label: '姓名',
                    type: 'input'
                },
                {
                    model: 'age',
                    label: '年齡',
                    type: 'input'
                }, 
                {
                    model: 'sex',
                    label: '性別',
                    type: 'select',
                    opts: [
                        {
                            label: '男',
                            value: 1
                        },
                        {
                            label: '女',
                            value: 2
                        }
                    ]
                },
                {
                    model: 'birth',
                    label: '出生日期',
                    type: 'date'
                },
                {
                    model: 'add',
                    label: '地址',
                    type: 'input'
                }
            ],
            operateForm: {
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
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
                    prop: "id",
                    label: "id",
                    width: 300
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
                    prop: "age",
                    label: "年齡"
                },
                {
                    prop: "addr",
                    label: "地址",
                    width: 400
                }
            ],
            config: {
                page: 1,
                total: 30
            }
        };
    },
    methods: {
        handleClose(done) {
            done();
        },
        confirm() {
            if (this.operateType === 'edit'){
                this.$http.post('/user/edit', this.operateForm).then(res => {
                    console.log(res);
                    this.dialogVisible = false;
                    this.getList();
                })
            } else {
                this.$http.post('/user/add', this.operateForm).then(res => {
                    console.log(res);
                    this.dialogVisible = false;
                    this.getList();
                })
            }
        },
        addUser() {
            this.dialogVisible= true;
            this.operateType='add'
            this.operateForm = {
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
            }
        },
        editUser(row){
            this.operateForm = 'edit';
            this.dialogVisible = true; //dialogVisible
            this.operateForm = row;
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
                this.$message('取消刪除');
            })
        },
        getList(name = ''){
            console.log('Search keyword:', name);
            this.config.loading = true;
            name ? (this.config.page = 1) : '';
            getUser({
                page: this.config.page,
                name
            }).then(({data: res}) => {
                console.log(res, 'res');
                this.tableData = res.list.map(item => {
                    item.sex = item.sex === 0 ? "女": "男"
                    return item 
                })
                this.config.total = res.count;
                this.config.loading = false;
            });
        }
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