<template>
    <div class="common-table">
        <el-table :data="tableData" height="90%" stripe>
            <el-table-column
            v-for="item in tableLabel"
            :key="item.prop"
            :label="item.label"
            :width="item.width ? item.width : 125"
            show-overflow-tooltip
            >
            <template v-slot="scope">
                <span>{{ scope.row[item.prop] }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
            <template v-slot="scope">
                <el-button size="small" @click="handleEdit(scope.row)">編輯</el-button>
                <el-button size="small" type="danger" @click="handelDelete(scope.row)">刪除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-pagination
        class="pager"
        layout="prev, pager, next"
        :total="config.total"
        :current-page="config.page"
        @current-change="handelPageChange"
        :page-size="20"
        >
        </el-pagination>
    </div>
</template>

<script>

export default {
    name: 'CommonTable',
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object
    },
    data() {
       return{}
    },
    methods: {
        handleEdit(row) {
            this.$emit('edit', row)
        },
        handelDelete(row) {
            this.$emit('del', row)
        },
        handelPageChange(page) {
            this.$emit('newPage', page);
        }
    }
}
</script>
<style lang="less" scoped>
.common-table {
    height: calc(100% - 62px);
    background-color: #ffffff;
    position: relative;

    .pager {
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>