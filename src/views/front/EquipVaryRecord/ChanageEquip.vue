<template>
  <div class="con-body">
    <div class="con-body-search"></div>
    <div class="con-body-pan">
      <ChanageEquipTable :dataTable="dataTable"> </ChanageEquipTable>
    </div>
  </div>
</template>

<script>
import ChanageEquipTable from './components/ChanageEquipTable.vue'
import { equipTypes, equipClassifys, factorys, sections, devices, areas } from '@/api/common.js'
import { chanageDataList } from '@/api/front/equipVaryRecord'

export default {
  name: 'EquipVaryList',
  data: () => {
    return {
      dataTable: [],
    }
  },
  components: {
    ChanageEquipTable,
  },
  methods: {
    init() {
      chanageDataList().then((res) => {
        this.dataTable = res.CurrentPageData
      })
    },
  },
  mounted() {},
}
</script>

<style lang='scss' scoped>
</style>