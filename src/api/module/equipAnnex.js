import ajax from '@/common/util/ajax.js'

/*用户的数据接口*/
let path = '/api/EquipAnnexM/';



/*删除*/
export const remove = (params) => {
	return ajax({
		url: path,
		method: 'delete',
		params
	})
}

/*数据查询*/
export const queryMore = (params) => {
	return ajax({
		url: path,
		method: 'get',
		params
	})
}

/*附件的下载*/
export const equADownload = (params) => {
	return ajax({
		url: path + 'EquADownload/',
		method: 'get',
		params
	})
}