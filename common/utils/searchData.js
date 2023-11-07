//0.0.4版本起 返回结果将有两部分组成:
/*
{
	index:[],	//旧版本的下标数组形式
	value:[]	//菜单中的valve,结构和下标结果数组一样,只是把下标替换成了value而已
}
*/
// 以下演示数据中,我故意把value设置成跟name一样,只是为了方便演示,使示例更加易懂,实际使用时候value应该是一个标识,给后台识别所用的.
// 数据较长，请仔细查看。
export default [{
    "name": '学区',
    "type": 'hierarchy',
    "submenu": [{
                "name": "不限",
                "value": "不限"
            }]
},{
    "name": '小区',
    "type": 'hierarchy',
    "submenu": [ {
                "name": "不限",
                "value": "不限"
            }]
	},
    {
        "name": '性质',
        "type": 'hierarchy',
        "submenu": [
            {
                "name": "不限",
                "value": "不限"
            }
        ]
    },
    {
        "name": '售价',
        "type": 'hierarchy',
        "submenu": [
            {
                "name": "不限",
                "value": "不限"
            }
        ]
    },{
        "name": '面积',
        "type": 'hierarchy',
        "submenu": [
            {
                "name": "不限",
                "value": "不限"
            }
        ]
    }, 
    {
        "name": '筛选',
        "type": 'radio',
        "submenu": [{
            "name": "居室",
            "submenu": [ {
                "name": "不限",
                "value": "不限"
            }]
           },{
             "name": "厅室",
             "submenu": [ {
                "name": "不限",
                "value": "不限"
            }]
           },{
             "name": "卫室",
             "submenu": [ {
                "name": "不限",
                "value": "不限"
            }]
           },{
                "name": "楼层",
                "submenu": [ {
                "name": "不限",
                "value": "不限"
            }]
            },
            {
                "name": "建成年份",
                "submenu": [ {
                "name": "不限",
                "value": "不限"
            }]
            }, 
            {
                "name": "楼梯类型",
                "submenu": [ {
                "name": "不限",
                "value": "不限"
            }]
            }
        ]
    }
]

