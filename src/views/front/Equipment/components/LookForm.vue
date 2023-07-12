<template>
  <el-form @submit.native.prevent class="lay-con-layer" ref="equipmentM" label-width="100px" :model="equipmentM">
    <div class="cus-from-inline">
      <el-form-item label="设备类型:" prop="EquipTypeIdTag">
        <el-select disabled v-model="equipmentM.EquipTypeIdTag" placeholder="请选择设备类型">
          <el-option v-for="item in equipTypeArray" :label="item.EquipTypeName" :value="item.EquipTypeId" :key="item.EquipTypeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备分类:" prop="EquipClassifyIdTag">
        <el-select disabled v-model="equipmentM.EquipClassifyIdTag" placeholder="请选择设备分类">
          <el-option v-for="item in equipClassifyArray" :label="item.EquipClassifyName" :value="item.EquipClassifyId" :key="item.EquipClassifyId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工 厂:" prop="FactoryIdTag">
        <el-select disabled v-model="equipmentM.FactoryIdTag" placeholder="请选择工厂">
          <el-option v-for="item in factoryArray" :label="item.FactoryName" :value="item.FactoryId" :key="item.FactoryId"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="cus-from-inline">
      <el-form-item label="工厂部门:" prop="SectionIdTag">
        <el-select disabled v-model="equipmentM.SectionIdTag" placeholder="请选择工厂部门">
          <template v-for="item in sectionArray">
            <el-option v-if="item.FactoryIdTag == equipmentM.FactoryIdTag" :label="item.SectionName" :value="item.SectionId" :key="item.SectionId"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="装 置:" prop="DeviceIdTag">
        <el-select disabled v-model="equipmentM.DeviceIdTag" placeholder="请选择装置">
          <template v-for="item in deviceArray">
            <el-option v-if="item.FKSectionId == equipmentM.SectionIdTag" :label="item.DeviceName" :value="item.DeviceId" :key="item.DeviceId"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="区 域:" prop="AreaIdTag">
        <el-select disabled v-model="equipmentM.AreaIdTag" placeholder="请选择区域">
          <template v-for="item in areaArray">
            <el-option v-if="item.DeviceIdTag == equipmentM.DeviceIdTag" :label="item.AreaName" :value="item.AreaId" :key="item.AreaId"></el-option>
          </template>
        </el-select>
      </el-form-item>
    </div>

    <div class="cus-from-inline">
      <el-form-item label="PI标记:" prop="PITag">
        <el-input disabled v-model="equipmentM.PITag"></el-input>
      </el-form-item>
      <el-form-item label="设备位号:" prop="EquipmentTag">
        <el-input disabled v-model="equipmentM.EquipmentTag"></el-input>
      </el-form-item>
      <el-form-item label="设备名称:" prop="EquipmentName">
        <el-input disabled v-model="equipmentM.EquipmentName"></el-input>
      </el-form-item>
    </div>
    <div class="cus-from-inline">
      <el-form-item label="EM设备号:" prop="EMEquipTag">
        <el-input disabled v-model="equipmentM.EMEquipTag"></el-input>
      </el-form-item>
      <el-form-item label="设备状态:" prop="EquipmentState">
        <el-radio-group disabled v-model="equipmentM.EquipmentState">
          <el-radio-button :label="true">开启</el-radio-button>
          <el-radio-button :label="false">关闭</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'LookForm',
  props: {
    equipTypeArray: [], // 设备类型
    equipClassifyArray: [], // 设备分类
    factoryArray: [], // 工厂
    sectionArray: [], // 工厂部门
    deviceArray: [], //装置
    areaArray: [], //区域
    equipmentM: {
      type: Object,
      default: {
        EquipTypeIdTag: '',
        EquipClassifyIdTag: '',
        FactoryIdTag: '',
        SectionIdTag: '',
        DeviceIdTag: '',
        AreaIdTag: '',
        PITag: '',
        EquipmentTag: '',
        EquipmentName: '',
        EquipmentState: '',
        EMEquipTag: '',
      },
    }, // 设备模型
  },
  data() {
    return {
      oldEquipmentM: [],
    }
  },
  methods: {},
  created() {
    this.oldEquipmentM = JSON.stringify(this.equipmentM)
  },
}
</script>

<style scoped="scoped">
.cus-from-inline {
  display: flex;
}

.cus-from-inline > .el-form-item:nth-child(2) {
  margin-left: 80px;
}
</style>