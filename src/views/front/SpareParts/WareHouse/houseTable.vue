<template>
    <div>
        <div class="fun">
            <el-button size="mini" type="primary" @click="addClick">新增</el-button>
            <el-button size="mini" type="primary">Excel入库</el-button>
            <el-button size="mini" type="primary">入库单导出</el-button>
            <el-button size="mini" type="primary" class="el-icon-refresh" @click="refreshClick">刷新</el-button>

        </div>
        <div class="con-body-pan">
            <ux-grid class="con-body-table" :border="false" show-overflow-tooltips element-loading-text="数据加载中..."
                element-loading-spinner="el-icon-loading" :data="CurrentPageData">
                <ux-table-column title="备件名" width="120px">
                    <template slot-scope="scope">
                        <div>{{ scope.row.MaterialName }}</div>
                    </template>
                </ux-table-column>

                <ux-table-column title="规格" width="120px">
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.Specification }}
                        </div>
                    </template>
                </ux-table-column>
                <ux-table-column title="型号" width="120px">
                    <template slot-scope="scope">
                        <div>{{ scope.row.Version }}</div>
                    </template>
                </ux-table-column>

                <ux-table-column title="制造商" width="120px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.ManufacturerName }}</span>
                    </template>
                </ux-table-column>
                <ux-table-column title="条码" width="120px">
                    <template slot-scope="scope">
                        <div>{{ scope.row.Code }}</div>

                    </template>
                </ux-table-column>

                <ux-table-column title="所属部门" width="100px">

                    <template slot-scope="scope">
                        <div>{{ scope.row.GroupIdName }}</div>
                    </template>
                </ux-table-column>
                <ux-table-column title="位置" width="200px" align="center">
                    <template slot-scope="scope">
                        <div>{{ scope.row.LibraryPlaceName }}</div>

                    </template>
                </ux-table-column>
                <ux-table-column title="数量" width="100px" align="center">
                    <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.Quantity" :disabled="!scope.row.Iseditor"></el-input>

                    </template>
                </ux-table-column>
                <ux-table-column title="入库时间" width="180px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.EnterDateTime }}</span>
                    </template>
                </ux-table-column>
                <ux-table-column title="入库人" width="120px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.EnterPerson }}</span>
                    </template>
                </ux-table-column>

                <ux-table-column width="200px" title="操作" fixed="right">

                    <template slot-scope="scope">
                        <!-- 编辑 -->
                        <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"
                            v-if="!scope.row.Iseditor">
                        </el-button>

                        <el-button type="success" size="mini" icon="el-icon-check" circle v-if="scope.row.Iseditor"
                            @click="confirmSelect(scope.row)"> </el-button>

                        <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？"
                            @confirm="handleDelete(scope.row)">
                            <el-button style="margin-left: 5px" slot="reference" size="mini" type="danger"
                                icon="el-icon-delete" circle> </el-button>
                        </el-popconfirm>
                    </template>
                </ux-table-column>
            </ux-grid>
        </div>

    </div>
</template>
<script>
import { deletelistItem, updateHouseInfo, getSparePartInfo } from "@/api/front/wareHouse"

export default {
    props: {
        CurrentPageData: {
            type: Array,
            default: []

        }
    },
    data() {
        return {
            departmentList: [],
            MaterialName: [],//备件名
            LibraryPlaceName: [],//位置
        }
    },
    methods: {
        // 编辑
        handleEdit(row) {
            // 修改入库信息
            console.log(row);
            if (row.Iseditor) {
                this.$set(row, 'Iseditor', false)
            } else {
                this.$set(row, 'Iseditor', true)
                this.oldRow = JSON.stringify(row)
            }
        },
        confirmSelect(row) {
            console.log(row);
            updateHouseInfo({
                "EnterLibraryId": row.EnterLibraryId,
                "GroupIdTag": row.GroupIdTag,
                "MaterialIdTag": row.MaterialIdTag, //材料ID标记
                "LibraryPlaceIdTag": row.LibraryPlaceIdTag, //存放位置ID标记
                "Quantity": row.Quantity //数量
            }).then(res => {
                if (res) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });

                    this.$parent.initPage()
                }
            })
            if (row.Iseditor) {
                this.$set(row, 'Iseditor', false)
            } else {
                this.$set(row, 'Iseditor', true)
                this.oldRow = JSON.stringify(row)
            }
        },

        handleDelete(row) {
            console.log(row);
            deletelistItem(
                {
                    id: row.EnterLibraryId,//入库id
                }
            ).then(res => {
                if (res) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.$parent.initPage()
                }

            })
        },
        addClick() {
            this.$router.push("/addItem")
        },
        // 刷新
        refreshClick() {
            this.$router.go(0)
        },
       
    },

}
</script>
<style scoped>
.fun {
    display: flex;
    justify-content: space-around;
    width: 320px;
    margin-bottom: 20px;
    margin-left: 20px;
}
</style>