/*后台的数据接口统一集成*/
import * as loginM from './module/adminMsgModify.js'
import * as groupM from './module/group.js'
import * as classesM from '@/api/module/classes.js'
import * as accessM from './module/access.js'
import * as roleM from './module/role.js'
import * as adminM from '@/api/module/administrators.js'
import * as userM from '@/api/module/user.js'
import * as serConM from '@/api/module/serverCon.js'
import * as equipTypeM from '@/api/module/equipType'
import * as equipClassifyM from '@/api/module/equipClassify'
import * as factoryM from '@/api/module/factory'
import * as sectionM from '@/api/module/section'
import * as deviceM from '@/api/module/device'
import * as areaM from '@/api/module/areaM'
import * as equipPropertyM from '@/api/module/equipProperty'
import * as equipmentM from '@/api/module/equipment'
import * as equipAnnexM from '@/api/module/equipAnnex'

import * as manufacturerM from '@/api/module/manufacturer.js'
import * as libraryPlaceM from '@/api/module/libraryPlace.js'
import * as materialTypeM from '@/api/module/materialType.js'
import * as materialM from '@/api/module/material.js'
import * as libraryM from '@/api/module/library.js'
import * as outLibraryM from '@/api/module/outLibrary.js'
import * as enterLibraryM from '@/api/module/enterLibrary.js'

export default {
	loginM,
	accessM,
	groupM,
	roleM,
	adminM,
	userM,
	classesM,
	serConM,
	equipTypeM,
	equipClassifyM,
	factoryM,
	sectionM,
	deviceM,
	areaM,
	equipPropertyM,
	equipmentM,
	equipAnnexM,
	manufacturerM,
	libraryPlaceM,
	materialTypeM,
	materialM,
	libraryM,
	outLibraryM,
	enterLibraryM
}