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
                                <el-table-column property="EnterPerson" label="所属部门" width="130px"></el-table-column>
                                <el-table-column property="LibraryPlaceName" label="位置" width="160px"></el-table-column>

                            </el-table>


                            <el-input slot="reference" @input="searchHandle" v-model="dynamicValidateForm.name"></el-input>
                        </el-popover>
                    </el-form-item>

                    <el-form-item prop="Quantity" label="当前库存数：">
                        <span>{{ dynamicValidateForm.Quantity == '' ? 0 : dynamicValidateForm.Quantity }}</span>
                    </el-form-item>
                    <el-form-item prop="incount" label="本次入库数：" :rules="modelRules">
                        <el-input v-model="dynamicValidateForm.incount"></el-input>
                    </el-form-item>
                </div>

                <div style="display: flex;">

                    <el-form-item prop="location" label="位置：" :rules="unitRules">
                        <el-select v-model="dynamicValidateForm.location" filterable placeholder="请选择">
                            <el-option v-for="item in locationOptions" :key="item.value" :label="item.LibraryPlaceName"
                                :value="item.LibraryPlaceName">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label=" " label-width="10px">
                        <span> &nbsp;</span>
                    </el-form-item>

                    <el-form-item prop="code" label="条码" :rules="manufactureRules" label-width="120px">
                        <el-input style="width: 363px;" v-model="dynamicValidateForm.code"></el-input>
                    </el-form-item>
                </div>
                <div style="display: flex;">
                    <el-form-item prop="notes" label="备注">
                        <el-input style="width: 635px;justify-content: space-between;"
                            v-model="dynamicValidateForm.notes"></el-input>
                    </el-form-item>

                    <el-button type="primary" class="add" @click="addClick" :disabled="isAdd">新增</el-button>
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
                <el-table-column property="EnterPerson" label="所属部门" width="130px"></el-table-column>

                <el-table-column property="Quantity" label="数量"></el-table-column>
                <el-table-column property="LibraryPlaceName" label="位置" width="160px"></el-table-column>
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
import { addSparePart, getSparePartInfo } from "@/api/front/wareHouse"

export default {
    data() {
        return {
            // 新增表单验证
            nameRules: [{ required: true, message: '请输入备件名', trigger: ['blur'] }],

            modelRules: [{ required: true, message: '请输入入库数', trigger: 'blur' }],
            unitRules: [{ required: true, message: '请输入位置', trigger: 'blur' }],
            manufactureRules: [{ required: true, message: '请输入条码', trigger: 'blur' }],
            //   制造商
            dynamicValidateForm: {
                name: "",
                Quantity: '',//库存
                department: "",
                incount: '',//入库数量
                location: "",
                code: "",//条码
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
            // console.log(this.$refs.dynamicValidateForm.validate);
            let saveArr = [];
            this.addList.map(item => {
                saveArr.push({
                    "MaterialIdTag": item.MaterialIdTag, //材料ID标记 
                    "GroupIdTag": item.ManufacturerIdTag, //部门id标记
                    "LibraryPlaceIdTag": item.LibraryPlaceIdTag, //存放位置ID标记
                    "Code": item.Code, //条码
                    "Quantity": item.Quantity, //数量
                    "Remarks": item.Remarks,//备注
                })
            })
            console.log(saveArr);
            if (saveArr.length > 0) {
                addSparePart(saveArr).then(res => {
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
            }
            this.$refs.dynamicValidateForm.validate((validate) => {
                if (validate) {

                }
            })

        },
        // 新增
        addClick() {
            this.$refs.dynamicValidateForm.validate((validate) => {
                if (validate) {
                    this.listROw.LibraryPlaceName = this.dynamicValidateForm.location;
                    this.listROw.Quantity = this.dynamicValidateForm.incount;
                    this.listROw.Remarks = this.dynamicValidateForm.notes;
                    this.listROw.Code = this.dynamicValidateForm.code;
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
        this.selectData = this.$store.state.common.wareHouseTable;
        this.departmentOptions = this.$store.state.common.departMentList;
        this.locationOptions = this.$store.state.common.locationList;

        this.selectData.map((item) => {
            this.departmentOptions.map(iten => {
                if (item.GroupIdTag == iten.GroupId) {
                    item.GroupName = iten.GroupName
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
    watch: {
    }

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