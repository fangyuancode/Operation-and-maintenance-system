<template>
    <div>
        <el-dialog title="入库查看" :visible.sync="dialogTableVisible" width="800px">

            <el-table :data="gridData">
                <el-table-column property="MaterialName" label="备件名"></el-table-column>
                <el-table-column property="Specification" label="规格"></el-table-column>
                <el-table-column property="Version" label="型号"></el-table-column>
                <el-table-column property="Code" label="条码"></el-table-column>
                <el-table-column property="Quantity" label="数量"></el-table-column>
                <el-table-column property="EnterDateTime" label="入库时间" width="160px"></el-table-column>
                <el-table-column property="EnterPerson" label="入库人"></el-table-column>
                <el-table-column property="Remarks" label="备注"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
// import 
export default {
    props: {
        gridData: {
            type: Array,
            default: [],
        }
    },
    data() {
        return {
            dialogTableVisible: false,
        }
    },
    methods: {
        Popup() {
            this.dialogTableVisible = true;
        }
    }
}
</script>
<style scoped></style>