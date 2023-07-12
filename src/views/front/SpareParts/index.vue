<template>
    <!-- 查询 -->
    <div class="search">
        <spareHeader />
        <sparePartTable :tableData="tableData" />
        <Cus-Pagination :total="totalCount"></Cus-Pagination>
    </div>
</template>
<script>
import { getSparePartInfo } from "@/api/front/wareHouse"

import spareHeader from './components/spareHeader.vue'
import sparePartTable from "./components/sparePartTable.vue";
import CusPagination from "@/components/Cus-Pagination/Cus-Pagination.vue"
export default {
    components: { CusPagination, sparePartTable, spareHeader },
    data() {
        return {
            value: '',
            totalCount: 0,
            tableData: [],
            locationOptions: [],
        }
    },
    created() {
        this.departmentOptions = this.$store.state.common.departMentList;

        //  1. 查询备件列表数据
        getSparePartInfo({
            GroupIdTag: '',
            MaterialIdTag: "",
            LibraryPlaceIdTag: "",
        }).then(res => {
            // console.log("部门", this.departmentOptions);
            // console.log("查询备件列表数据", res.CurrentPageData);
            this.totalCount = res.TotalCount;
            this.tableData = res.CurrentPageData;

            this.tableData.map((item) => {
                this.departmentOptions.map(iten => {
                    if (item.GroupIdTag == iten.GroupId) {
                        item.GroupIdName = iten.GroupName
                    }
                })
            })
        })

    }

}
</script>
<style lang="scss" scoped></style>