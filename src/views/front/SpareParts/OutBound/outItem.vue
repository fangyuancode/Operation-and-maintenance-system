<template>
    <div class="add">
        <div class="back">
            <el-page-header @back="goBack" content="详情页面">
            </el-page-header>
        </div>
        <div class="content">

            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="150px" class="demo-dynamic ">
                <div style="display: flex;">
                    <el-form-item prop="name" label="备件名：" :rules="nameRules">

                        <el-popover placement="right-end" width="850" trigger="click">
                            <el-table ref="multipleTable" :data="selectData" tooltip-effect="dark" @select="select"
                                @row-click="rowClick" style="width: 100%" @selection-change="handleSelectionChange">

                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column property="MaterialName" label="备件名"></el-table-column>
                                <el-table-column property="Specification" label="规格" width="80"></el-table-column>
                                <el-table-column property="Version" label="型号" width="55"></el-table-column>
                                <el-table-column property="ManufacturerName" label="制造商"></el-table-column>
                                <el-table-column property="Code" label="条码"></el-table-column>
                                <el-table-column property="Quantity" label="数量"></el-table-column>
                                <el-table-column property="GroupIdName" label="所属部门" width="130px"></el-table-column>
                                <el-table-column property="LibraryPlaceName" label="位置" width="160px"></el-table-column>

                            </el-table>


                            <el-input slot="reference" @input="searchHandle" v-model="dynamicValidateForm.name"></el-input>
                        </el-popover>
                    </el-form-item>

                    <el-form-item prop="Quantity" label="当前库存数：">
                        <span>{{ dynamicValidateForm.Quantity == '' ? 0 : dynamicValidateForm.Quantity }}</span>
                    </el-form-item>
                    <el-form-item prop="outcount" label="本次出库数：" :rules="modelRules">
                        <el-input v-model="dynamicValidateForm.outcount"></el-input>
                    </el-form-item>
                </div>

                <div style="display: flex; ">

                    <el-form-item prop="receivePeople" label="领用人" :rules="unitRules">
                        <el-input v-model="dynamicValidateForm.receivePeople"></el-input>
                    </el-form-item>

                    <el-form-item prop="notes" label="备注" label-width="120px">
                        <div style="display: flex;">
                            <el-input style="width: 363px;" v-model="dynamicValidateForm.notes"></el-input>
                            <el-button type="primary" class="add" @click="addClick" :disabled="isAdd">新增</el-button>
                        </div>

                    </el-form-item>
                </div>

            </el-form>

        </div>

        <div width="800px">
            <el-table border :data="addList">
                <el-table-column property="MaterialName" label="备件名"></el-table-column>
                <el-table-column property="Specification" label="规格"></el-table-column>
                <el-table-column property="Version" label="型号"></el-table-column>
                <el-table-column property="ManufacturerName" label="制造商"></el-table-column>
                <el-table-column property="Code" label="条码"></el-table-column>
                <el-table-column property="GroupIdName" label="所属部门" width="130px"></el-table-column>

                <el-table-column property="LibraryPlaceName" label="位置" width="160px"></el-table-column>
                <el-table-column property="Quantity" label="出库量"></el-table-column>
                <el-table-column property="UsePerson" label="领用人"></el-table-column>

                <el-table-column property="Remarks" label="备注"></el-table-column>

                <el-table-column property="name" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="deleteClick(scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="fun">
                <el-button type="primary" @click="saveClick(dynamicValidateForm)">保存</el-button>
            </div>
        </div>



    </div>
</template>
<script>
import { getSparePartInfo } from "@/api/front/wareHouse"
import { batchOutbound } from '@/api/front/outBound'
export default {
    data() {
        return {
            // 新增表单验证
            nameRules: [{ required: true, message: '请输入备件名', trigger: ['blur'] }],
            modelRules: [{ required: true, message: '请输入本次出库数', trigger: 'blur' }],
            unitRules: [{ required: true, message: '请输入领用人', trigger: 'blur' }],
            dynamicValidateForm: {
                name: "",
                Quantity: '',//库存
                outcount: '',//出库数量
                location: "",
                receivePeople: '',
                notes: "",
            },
            value: "",
            selectData: [],
            listROw: {},//点击时，那行的数据
            addList: [],//新增数据的数组
            departmentOptions: [],
            isAdd: true,
            locationOptions: [],//位置信息
        }
    },
    methods: {
        // 返回上一页
        goBack() {
            this.$router.back()
        },
        // 搜索请求数据
        searchHandle() {
            getSparePartInfo({
                MaterialName: this.dynamicValidateForm.name,
            }).then(res => {
                console.log("输入框输入请求的数据：", res.CurrentPageData);
                this.selectData = res.CurrentPageData
            })
        },
        // 保存数据
        saveClick() {
            /**
             *   {
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
    },*/
            // console.log(this.$refs.dynamicValidateForm.validate);
            let saveArr = [];
            console.log("list", this.addList);
            this.addList.map(item => {
                saveArr.push({
                    "GroupIdTag": item.GroupIdTag, //部门ID标记
                    "MaterialIdTag": item.MaterialIdTag, //材料id
                    "LibraryPlaceIdTag": item.LibraryPlaceIdTag, //位置ID标记
                    "Code": item.Code, //条码
                    "Quantity": item.Quantity, //数量
                    "Remarks": item.Remarks, //备注
                    "UsePerson": item.UsePerson, //领用人
                })
            })
            console.log(saveArr);
            if (saveArr.length > 0) {
                batchOutbound(saveArr).then(res => {
                    if (res) {
                        console.log("保存数据的res", res);
                        this.$message({
                            message: '备件添加成功',
                            type: 'success'
                        });
                        //    这里先不要删除
                        this.$refs.dynamicValidateForm.resetFields();
                        this.listROw = {};
                        this.isAdd = true;
                        this.$router.back();
                    }

                })
            } else {
                this.$message({
                    message: '请先新增数据',
                });
            }
         

        },
        // 新增
        addClick() {
            this.$refs.dynamicValidateForm.validate((validate) => {
                if (validate) {

                    this.listROw.Quantity = this.dynamicValidateForm.outcount;
                    this.listROw.Remarks = this.dynamicValidateForm.notes;
                    this.listROw.UsePerson=this.dynamicValidateForm.receivePeople
                    this.addList.push(this.listROw);
                    // console.log("xinzarr", this.addList);
                    this.listROw = {};
                    this.$refs.dynamicValidateForm.resetFields();
                }
            });

        },
        // 删除
        deleteClick(row) {
            console.log(row.Code);
            let index = this.addList.findIndex((item) => {
                return row.Code === item.Code
            })
            console.log("index", index);
            this.addList.splice(index, 1)

        },
        // 表格事件
        select(selection, row) {
            // 清除 所有勾选项
            this.$refs.multipleTable.clearSelection()
            // 当表格数据都没有被勾选的时候 就返回
            // 主要用于将当前勾选的表格状态清除
            if (selection.length == 0) return
            this.$refs.multipleTable.toggleRowSelection(row, true);
        },
        // 表格的选中 可以获得当前选中的数据
        selectionChange(val) {
            console.log("表格的选中", val);
            // 将选中的数据存储起来
            this.selectData = val
        },

        // 表格某一行的单击事件
        rowClick(row, column) {
            console.log("表格某一行的单击事件", row);

            this.listROw = row;
            this.dynamicValidateForm.name = row.MaterialName;
            this.dynamicValidateForm.Quantity = row.Quantity;

            const selectData = this.selectData
            this.$refs.multipleTable.clearSelection()
            if (selectData.length == 1) {
                selectData.forEach(item => {
                    // 判断 如果当前的一行被勾选, 再次点击的时候就会取消选中
                    if (item == row) {
                        this.$refs.multipleTable.toggleRowSelection(row, false);
                    }
                    // 不然就让当前的一行勾选
                    else {
                        this.$refs.multipleTable.toggleRowSelection(row, true);
                    }
                })
            }
            else {
                this.$refs.multipleTable.toggleRowSelection(row, true);
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

    },
    created() {
        // 获取表格的数据
        this.selectData = this.$store.state.common.outBoundtTable;
        // console.log("单选表格", this.selectData);
        this.departmentOptions = this.$store.state.common.departMentList;
        this.locationOptions = this.$store.state.common.locationList;
        // console.log("部门数据列表", this.departmentOptions);
        this.selectData.map((item) => {
            this.departmentOptions.map(iten => {
                if (item.GroupIdTag == iten.GroupId) {
                    item.GroupIdName = iten.GroupName
                }
            })
        })
        // console.log("table", this.selectData);
        // console.log("departmentOptions", this.departmentOptions);
    },
    updated() {
        this.$refs.dynamicValidateForm.validate((validate) => {
            if (validate) {
                this.isAdd = false;
            }
        });
    },
}
</script>
<style lang="scss" scoped>
.back {
    margin-top: 10px;
    margin-left: 20px;
}

.demo-dynamic {
    margin-top: 20px;
    width: 950px;
    display: flex;
    flex-wrap: wrap;
}

.add {
    margin-left: 30px;
    height: 40px;
}

.fun {
    margin-left: 200px;
    margin-top: 20px;

}
</style>