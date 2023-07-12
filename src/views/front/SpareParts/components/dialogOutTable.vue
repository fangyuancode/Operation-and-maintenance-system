<template>
    <div>

        <el-dialog title="出库查看" :visible.sync="dialogTableVisible" width="800px">
<!-- {
"OutLibraryId": 1, //出库ID
"GroupIdTag": 1, //部门ID标记
"GroupName": null, //工厂部门名称
"MaterialIdTag": 3, //材料名称
"MaterialName": "DI卡件", //材料名称
"LibraryPlaceIdTag": 142, //位置ID标记
"LibraryPlaceName": "舟山1#库/001/01/01", //位置信息
"Quantity": 2, //数量
"Code": "125", //条码
"Remarks": "备注", //备注
"OutPerson": "测试", //出库人
"UsePerson": null, //领用人
"OutDateTime": null, //出库时间
"Specification": "33303", //规格
"Version": "K1", //型号
"ManufacturerIdTag": 1, //制造商ID标记
"ManufacturerName": "浙江中控" //制造商
} -->

            <el-table :data="gridData">
                <el-table-column prop="MaterialName" label="备件名"></el-table-column>
                <el-table-column prop="Specification" label="规格"></el-table-column>
                <el-table-column prop="Version" label="型号"></el-table-column>
                <el-table-column prop="Code" label="条码"></el-table-column>
                <el-table-column prop="Quantity" label="数量"></el-table-column>
                <el-table-column prop="OutDateTime" label="出库时间" width="160px"></el-table-column>
                <el-table-column prop="OutPerson" label="出库人"></el-table-column>
                <el-table-column prop="Remarks" label="备注"></el-table-column>
            </el-table>

        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        gridData: {
            type: Array,
            default: () => [],
        }
    },
    data() {
        return {
            dialogTableVisible: false,
            sparepartlist: [],
        }
    },

    methods: {
        outPopup() {
            this.dialogTableVisible = true;
        }
    },
    created(){
    }
}
</script>
<style scoped></style>