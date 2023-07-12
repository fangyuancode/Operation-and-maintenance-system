<template>
    <div>
        <div class="fun">
            <el-button size="mini" type="primary" @click="outAddClick">新增出库</el-button>
            <el-button size="mini" type="primary">出库单导出</el-button>
            <el-button size="mini" type="primary" @click="refreshClick">刷新</el-button>

        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="MaterialName" label="备件名" min-width="100" align="center">
            </el-table-column>
            <el-table-column prop="Specification" label="规格" min-width="100" align="center">
            </el-table-column>
            <el-table-column prop="Version" label="型号" align="center" width="60px">
            </el-table-column>

            <el-table-column prop="ManufacturerName" label="制造商" align="center">
            </el-table-column>

            <el-table-column prop="Code" label="条码" align="center">
            </el-table-column>

            <el-table-column prop="GroupName" label="所属部门" align="center" width="100px">
            </el-table-column>
            <el-table-column prop="LibraryPlaceName" label="位置" align="center" width="160px">
            </el-table-column>
            <el-table-column prop="Quantity" label="数量" align="center">
                <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.Quantity" :disabled="!scope.row.Iseditor"></el-input>

                </template>
            </el-table-column>
            <el-table-column prop="OutDateTime" label="出库时间" align="center" width="160px">

            </el-table-column>
            <el-table-column prop="OutPerson" label="出库人" align="center">

            </el-table-column>

            <el-table-column prop="UsePerson" label="领取人" align="center">
            </el-table-column>
            <el-table-column prop="Remarks" label="备注" align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"
                        v-if="!scope.row.Iseditor">
                    </el-button>
                    <el-button type="success" size="mini" icon="el-icon-check" circle v-if="scope.row.Iseditor"
                        @click="confirmSelect(scope.row)"> </el-button>

                    <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？" @confirm="handleDelete(scope.row)">
                        <el-button style="margin-left: 5px" slot="reference" size="mini" type="danger" icon="el-icon-delete"
                            circle> </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { deleteOutlistItem, changeOuttable } from '@/api/front/outBound'
import { getoutBoundTable } from "@/api/front/outBound"

export default {
    data() {
        return {

            value: '',
            totalCount: 10,
            tableData: [],
            departmentOptions: []
        }
    },
    methods: {
        // 1. 编辑后确认
        confirmSelect(row) {
            changeOuttable({
                OutLibraryId: row.OutLibraryId,
                Quantity: row.Quantity,
            }).then(res => {
                console.log("res", res);
            })
            if (row.Iseditor) {
                this.$set(row, 'Iseditor', false);

            } else {
                this.$set(row, 'Iseditor', true)
                this.oldRow = JSON.stringify(row)
            }
        },
        // 2. 删除
        handleDelete(row) {
            console.log(row);
            deleteOutlistItem(
                {
                    id: row.OutLibraryId,//入库id
                }
            ).then(res => {
                if (res) {
                    getoutBoundTable().then(res => {
                        this.tableData = res.CurrentPageData;
                        this.tableData.map((item) => {
                            this.departmentOptions.map(iten => {
                                if (item.GroupIdTag == iten.GroupId) {
                                    item.GroupName = iten.GroupName
                                }
                            })
                        })
                    })
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }
            })
        },
        // 3. 编辑
        handleEdit(row) {
            console.log(row);
            if (row.Iseditor) {
                this.$set(row, 'Iseditor', false)
            } else {
                this.$set(row, 'Iseditor', true)
                this.oldRow = JSON.stringify(row)
            }
        },
        refreshClick() {
            this.$router.go(0)
        },
        outAddClick() {
            this.$router.push('/outItem')
        }
    },
    created() {
        // 1. 公共部门数据
        this.departmentOptions = this.$store.state.common.departMentList;
        // console.log("object", this.departmentOptions);
        // 2.出库表的数据
        getoutBoundTable().then(res => {
            this.tableData = res.CurrentPageData
            console.log("c出库表", this.tableData);
            this.tableData.map((item) => {
                this.departmentOptions.map(iten => {
                    if (item.GroupIdTag == iten.GroupId) {
                        item.GroupName = iten.GroupName
                    }
                })
            })
        })

    }
}
</script>
<style lang="scss" scoped>
.fun {
    display: flex;
    justify-content: space-around;
    width: 320px;
    margin-bottom: 20px;
    margin-left: 20px;
}
</style>