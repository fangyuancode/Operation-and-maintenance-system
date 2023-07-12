
const frontRoutes = [{
    path: 'Main',
    title: '主页',
    icon: 'bi-house', // 菜单图标
    isActiv: false, //左侧的活动状态
    children: [{
        path: 'Main',
        title: '工作台',
        isNavActiv: false //top导航活动状态
    },]
},
{
    path: 'Equipment',
    title: '台账',
    icon: 'bi-box-seam', // 菜单图标
    isActiv: false, //左侧的活动状态
    children: [{
        path: 'Equipment',
        title: '查询',
        isNavActiv: false //top导航活动状态
    },
    {
        path: 'ChanageEquip',
        title: '台账变更',
        isNavActiv: false //top导航活动状态
    },
    {
        path: 'ChanageRecord',
        title: '台账变更记录',
        isNavActiv: false //top导航活动状态
    },
    ]},
// 备品备件
{
    path: 'SpareParts',
    title: '备品备件',
    icon: 'bi-wrench', // 菜单图标
    isActiv: false, //左侧的活动状态
    children: [
        {
            path: 'SpareParts',
            title: '查询',
            isNavActiv: false //top导航活动状态
        },
        {
            path: 'WareHouse',
            title: '入库',
            isNavActiv: false //top导航活动状态
        },
        {
            path: 'OutBound',
            title: '出库',
            isNavActiv: false //top导航活动状态
        },
    ]
},
]


export default frontRoutes