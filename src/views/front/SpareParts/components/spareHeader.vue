<template>
    <div class="con-header">
        <div class="part">
            <span>所属部门</span>
            <el-select v-model="part" filterable placeholder="请选择">
                <el-option v-for="item in departMentList" :key="item.GroupIdTag" :label="item.GroupName"
                    :value="item.GroupIdTag">
                </el-option>
            </el-select>
        </div>
        <div class="location">
            <span>位置</span>
            <el-select v-model="value1" filterable placeholder="请选择">
                <el-option v-for="item in addressList" :key="item.value" :label="item.LibraryPlaceName"
                    :value="item.LibraryPlaceId">
                </el-option>
            </el-select>
        </div>
        <div class="spartName">
            <span>备件名</span>
            <el-input v-model="value2"></el-input>
        </div>

        <el-button style="margin-left: 20px;" @click="serachClick">查询</el-button>

    </div>
</template>
<script>
import { getSparepartlist } from '@/api/front/library'
export default {
    data() {
        return {
            departmentOptions: [],//部门
            locationOptions: [],//位置
            part: '',//部门
            value1: '',
            value2: '',
            addressList: [],
            searchData: [],
            departMentList: [],
        }
    },
    methods: {
        handleEdit(item) {
            console.log(item);
        },
        // 搜索
        serachClick() {
            console.log(this.part, this.value1, this.value2);
            getSparepartlist({
                GroupIdTag: this.part,
                MaterialName: this.value1,
                LibraryPlaceIdTag: this.value2,
            }).then(res => {
                res.CurrentPageData;
                // 在sparePartTable.vue中接收传递的查询数据
                this.$bus.$emit('searchTable', res.CurrentPageData)
            });
        }
    },
    created() {
        // 1.获取用户的个人信息
        let logintag = JSON.parse(this.$cookies.get(this.$member.USERINFO)).GroupIdTag
        console.log("info", logintag);
        // 2. 获取部门数据
        this.departMentList = this.$store.state.common.departMentList;

        // console.log("部门数据", this.departMentList);
        this.departMentList.map(item => {
            if (item.GroupId === logintag) {
                this.departmentOptions.push(item)
                this.part = item.GroupName
            }
        })
        this.$store.commit('common/changeUserdepartMent', this.departmentOptions)

        // 3. 请求位置数据
        this.$store.dispatch('common/getLocation');
        this.locationOptions = this.$store.state.common.locationList;

        // 待处理

        let locationList = [];
        // 1. 位置数据处理
        this.locationOptions.map(item => {
            if (item.LibraryPlaceParId == '0') {
                locationList.push({
                    LibraryPlaceName: item.LibraryPlaceName + '/',
                    LibraryPlaceId: item.LibraryPlaceId,
                    GroupIdTag: item.GroupIdTag
                })
            }
        })
        // 待定~

        // 舟山1#库/001/01/02
        // 测试库/新建子节点1/新建子节点
        // 测试库/新建子节点
        // 额我确认

        let twoList = [];
        locationList.map(iten => {
            for (let i = 0; i < this.locationOptions.length; i++) {
                if (iten.LibraryPlaceId === this.locationOptions[i].LibraryPlaceParId) {
                    // console.log(this.locationOptions[i].LibraryPlaceParId, i);
                    twoList.push({
                        LibraryPlaceParId: this.locationOptions[i].LibraryPlaceParId,
                        LibraryPlaceName: this.locationOptions[i].LibraryPlaceName + '/',
                        LibraryPlaceId: this.locationOptions[i].LibraryPlaceId
                    })
                }
            }
        })
        // console.log("twoList", twoList);
        // console.log("locationList", locationList);
        let indexarr = []
        locationList.map(item => {
            twoList.map(iten => {
                if (item.LibraryPlaceId === iten.LibraryPlaceParId) {
                    indexarr.push(iten.LibraryPlaceParId)
                    // console.log(indexarr);
                }
            })
        })

        // locationList.map(iten => {
        //     this.addressList.push({
        //         LibraryPlaceName: iten.LibraryPlaceName.slice(0, -1),
        //         LibraryPlaceId: iten.LibraryPlaceId,
        //     });
        // })
        // this.$store.commit('common/changeAddressList', this.addressList)
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