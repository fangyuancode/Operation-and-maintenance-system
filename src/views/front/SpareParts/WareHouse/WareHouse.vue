<template>
    <div class="con-body">
        <houseHeader />
        <houseTable :CurrentPageData="CurrentPageData" />
        <Cus-Pagination :total="totalCount"></Cus-Pagination>
    </div>
</template>
<script>
import { getSparePartInfo } from "@/api/front/wareHouse"

import CusPagination from "@/components/Cus-Pagination/Cus-Pagination.vue"
import houseHeader from "./houseHeader.vue"
import houseTable from './houseTable.vue'
export default {
    components: { CusPagination, houseHeader, houseTable },
    data() {
        return {
            totalCount: 0,
            CurrentPageData: []
        }
    },
    methods: {
        initPage() {
            // 2. 获取部门数据
            this.departMentList = this.$store.state.common.departMentList;
            // 3. 入库表格数据请求
            getSparePartInfo().then(res => {
                this.totalCount = res.TotalCount;
                this.CurrentPageData = res.CurrentPageData;
                // 4.在table表格中添加对应的部门数据
                this.CurrentPageData.map(iten => {
                    this.departMentList.map(item => {//GroupIdTag
                        if (iten.GroupIdTag === item.GroupId) {
                            iten.GroupIdName = item.GroupName;
                        }
                    })

                })
            })
        }
    },
    created() {
        // 1.搜索框的数据请求
        this.$store.dispatch('common/getLocation');
        this.initPage()
    }
}
</script>
<style lang="scss" scoped></style>