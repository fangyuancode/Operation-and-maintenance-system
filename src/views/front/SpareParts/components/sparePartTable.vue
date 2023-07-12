<template>
    <div class="table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="MaterialName" label="备件名" min-width="100" align="center">
            </el-table-column>
            <el-table-column prop="Specification" label="规格" min-width="100" align="center">
            </el-table-column>
            <el-table-column prop="Version" label="型号" align="center">
            </el-table-column>
            <el-table-column prop="Code" label="条码" align="center">
            </el-table-column>
            <el-table-column prop="ManufacturerName" label="制造商" align="center">
            </el-table-column>
            <el-table-column prop="GroupIdName" label="所属部门" align="center" width="120px">
            </el-table-column>
            <el-table-column prop="LibraryPlaceName" label="位置" align="center" width="200px">
            </el-table-column>
            <el-table-column prop="Quantity" label="数量" align="center">
            </el-table-column>
            <el-table-column prop="look" label="入库查看" align="center">
                <template slot-scop="scope">
                    <el-button size="mini" @click="viewClick">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="look" label="出库查看" align="center">
                <template slot-scop="scope">
                    <el-button size="mini" @click="outViewClick">查看</el-button>
                </template>
            </el-table-column>

            <el-table-column prop="number" fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详细</el-button>
                </template>

            </el-table-column>
        </el-table>
        <!-- 弹出框表格 -->
        <dialogInTable :gridData="tableData" ref="child1" />
        <dialogOutTable :gridData="outTbale" ref="child2" />
    </div>
</template>
<script>

import dialogInTable from './dialogInTable.vue';
import dialogOutTable from './dialogOutTable.vue';
export default {
    components: { dialogInTable, dialogOutTable },
    props: {
        tableData: {
            type: Array,
            default: []

        }
    },
    data() {
        return {
            outTbale: [],
        }
    },
    created() {
        this.$store.dispatch('common/getOutDoundtTable');
        this.outTbale = this.$store.state.common.outBoundtTable;
        console.log("表格", this.tableData);
    },
    methods: {
        handleEdit(item) {
            console.log(item);
        },
        viewClick() {
            this.$refs.child1.Popup()
        },
        outViewClick() {
            console.log("出库");
            this.$refs.child2.outPopup()
        }
    },
    mounted() {
        // 接收spareheader.vue,中发射的事件
        this.$bus.$on('searchTable', (data) => {
            this.tableData = data;
        })
    }
}
</script>
<style scoped></style>