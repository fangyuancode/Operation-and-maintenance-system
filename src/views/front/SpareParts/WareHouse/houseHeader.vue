<template>
    <!-- SectionIdTag==>GroupIdTag
SectionName==>GroupName -->
    <div class="con-header">
        <div class="part">
            <span>所属部门</span>
            <el-select v-model="value" filterable placeholder="请选择">
                <el-option v-for="item in departmentOptions" :key="item.SectionId" :label="item.GroupName"
                    :value="item.GroupId">
                </el-option>
            </el-select>
        </div>
        <div class="location">
            <span>位置</span>

            <el-select v-model="value1" filterable placeholder="请选择">
                <el-option v-for="item in locationOptions" :key="item.value" :label="item.LibraryPlaceName"
                    :value="item.LibraryPlaceId">
                </el-option>
            </el-select>
        </div>
        <div class="spartName">
            <span>备件名</span>
            <el-input v-model="sparepartName"></el-input>

        </div>

        <el-button style="margin-left: 20px;">查询</el-button>

    </div>
</template>
<script>
export default {
    props: {

    },
    data() {
        return {
            departmentOptions: [],//部门
            locationOptions: [],
            nameOptions: [],
            value: '',
            value1: '',
            sparepartName: '',
        }
    },

    created() {
        // 1. 获取位置信息
        this.$store.dispatch('common/getLocation');
        this.locationOptions = this.$store.state.common.addressList;
        // 2. 获取部门信息
        this.departmentOptions = this.$store.state.common.userdepartMent;
        this.value = this.$store.state.common.userdepartMent[0].GroupName;
    },

}
</script>
<style lang="scss" scoped>
.con-header {
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