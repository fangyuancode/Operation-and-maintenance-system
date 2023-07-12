import ajax from "@/common/util/ajax.js"

/*公共的数据集合*/
let path = '/api/CommonM/';

/*部门集合*/
export const groups = () => {
	return ajax({
		url: path + 'Groups',
		method: 'get',
	})
}

/* 班组集合 */
export const classes = () => {
	return ajax({
		url: path + 'Classes',
		method: 'get'
	});
}

/*角色集合*/
export const roles = () => {
	return ajax({
		url: path + 'Roles',
		method: 'get',
	})
}

/*查询用户side显示的权限*/
export const queryAccs = () => {
	return ajax({
		url: path + 'PToCAcc',
		method: 'post',
	})
}

/* 设备类型集合 */
export const equipTypes = () => {
	return ajax({
		url: path + 'EquipTypes',
		method: 'get',
	})
}

/* 设备分类集合 */
export const equipClassifys = (id) => {
	return ajax({
		url: path + 'EquipClassifys',
		method: 'get',
		params: { id: id ? id : '' }
	})
}

/* 工厂集合 */
export const factorys = () => {
	return ajax({
		url: path + 'Factorys',
		method: 'get'
	})
}

/* 工厂部门集合 */
export const sections = (id) => {
	return ajax({
		url: path + 'Sections',
		method: 'get',
		params: { id: id ? id : '' }
	})
}

/* 装置集合 */
export const devices = (id) => {
	return ajax({
		url: path + 'Devices',
		method: 'get',
		params: { id: id ? id : '' }
	})
}

/* 区域集合 */
export const areas = (id) => {
	return ajax({
		url: path + 'Areas',
		method: 'get',
		params: { id: id ? id : '' }
	})
}


/* 材料类型集合 */
export const materialTypes = () => {
	return ajax({
		url: path + 'MaterialTypes',
		method: 'get',
	})
}
/* 制造商集合 */
export const manufacturers = () => {
	return ajax({
		url: path + 'Manufacturers',
		method: 'get',
	})
}
