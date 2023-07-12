<template>
    <div class="search">
        <outHeader />
        <outTable />
        <Cus-Pagination :total="totalCount" />

    </div>
</template>
<script>
import CusPagination from "@/components/Cus-Pagination/Cus-Pagination.vue"
import outTable from "./outTable.vue";
import outHeader from "./outHeader.vue";
export default {
    components: { CusPagination, outTable, outHeader },
    data() {
        return {
            options: [
            ],
            totalCount: 10,
        }
    },
    created() {
        // 1. 获取出库表格数据
        this.$store.dispatch('common/getOutDoundtTable');
        // 2. 总条数
        this.totalCount = this.$store.state.common.outBoundtTable.length;

    }

}
</script>
<style lang="scss" scoped>
.header {
    height: 120px;
    margin-left: 20px;
    width: 1050px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: right;

        span {
            width: 80px;
            margin-right: 15px;
        }
    }
}
</style>