import Mock from 'mockjs'
const baseURL = 'http://11.207.3.173:3000/mock/36/sysmgr/';
Mock.mock(baseURL + 'dept/loadDeptTree', function (options) {
  console.log(options);
  let _req = JSON.parse(options.body);
  if (_req.dlevel == "0") {
    return {
      "status": '0',
      "statusText": "成功",
      "data": {
        dept: [
          {
            "deptcode": "DEPT10000002",
            "deptname": "北方运营中心",
            "dlevel": "1",
            "uformat": "01000000"
          }, {
            "deptcode": "DEPT10000000",
            "deptname": "本部",
            "dlevel": "1",
            "uformat": "02000000"
          }, {
            "deptcode": "DEPT10000001",
            "deptname": "南方运营中心",
            "dlevel": "1",
            "uformat": "03000000"
          }
        ]
      }
    }
  }
  else if (_req.dlevel == "1") {
    if (_req.deptcode == "DEPT10000002") {
      //北方运营中心
      return {
        "status": '0',
        "statusText": "成功",
        "data": {
          dept: [
            {
              "deptcode": "DEPT10000011",
              "deptname": "北京销售部门",
              "dlevel": "2",
              "uformat": "01000000"
            },
            {
              "deptcode": "DEPT10000022",
              "deptname": "大连销售部门",
              "dlevel": "2",
              "uformat": "01000000"
            }
          ]
        }
      }

    }
    else if (_req.deptcode == "DEPT10000000") {
      //本部
      return {
        "status": '0',
        "statusText": "成功",
        "data": {
          dept: [
            {
              "title": '主管部门',
              "id": "DEPT100033",
              "deptcode": "DEPT10000033",
              "deptname": "主管部门",
              "dlevel": "2",
              "uformat": "02000000"
            },
            {
              "title": '质检部门',
              "id": "DEPT10000044",
              "deptcode": "DEPT10000044",
              "deptname": "质检部门",
              "dlevel": "2",
              "uformat": "02000000"
            }
          ]
        }
      }
    }
    else if (_req.deptcode == "DEPT10000001") {
      //南方运营中心
      return {
        "status": '0',
        "statusText": "成功",
        "data": {
          dept: [
            {
              "title": '广东销售部门',
              "id": "DEPT100055",
              "deptcode": "DEPT10000055",
              "deptname": "广东销售部门",
              "dlevel": "2",
              "uformat": "03000000"
            },
            {
              "title": '广西销售部门',
              "id": "DEPT10000066",
              "deptcode": "DEPT10000066",
              "deptname": "广西销售部门",
              "dlevel": "2",
              "uformat": "03000000"
            }
          ]
        }
      }
    }
  }
  else if (_req.dlevel == "2") {
    if (_req.deptcode == "DEPT10000011") {
      return {
        "status": '0',
        "statusText": "成功",
        "data": {
          dept: [
            {
              "deptcode": "DEPT10000111",
              "deptname": "北京销售一组",
              "dlevel": "3"
            },
            {
              "deptcode": "DEPT10000222",
              "deptname": "北京销售二组",
              "dlevel": "3"
            }
          ]
        }
      }
    }
    else {
      return {
        "status": "0",
        "statusText": "成功",
        "data": { dept: [] }
      }
    }
  }

  return {
    "status": -1,
    "statusText": "加载树出错",
    "data": ""
  }

})

Mock.mock(baseURL + 'company/loadCompanyTree', function (options) {
  console.log(options);
  let _req = JSON.parse(options.body);
  if (_req.comcode == "10000000") {
    return {
      "status": '0',
      "statusText": "成功",
      "data": {
        company: [
          {
            "comcode": "11000000",
            "comcname": "北京分公司"
          }, {
            "comcode": "12000000",
            "comcname": "天津分公司"
          }, {
            "comcode": "13000000",
            "comcname": "河北省公司"
          }
        ]
      }
    }
  } else if (_req.comcode == "11000000" || _req.comcode == "12000000" || _req.comcode == "13000000") {
    return {
      "status": '0',
      "statusText": "成功",
      "data": {
        company: [
          {
            "parentcom": '',
            "comcode": "11100000",
            "comcname": "朝阳分公司"
          }, {
            "parentcom": '',
            "comcode": "12200000",
            "comcname": "顺义分公司"
          }, {
            "parentcom": '',
            "comcode": "13300000",
            "comcname": "东城区公司"
          }
        ]
      }
    }
  } else if (_req.comcode == "11100000" || _req.comcode == "12200000" || _req.comcode == "13300000") {
    return {
      "status": '0',
      "statusText": "成功",
      "data": {
        company: [
          {
            "parentcom": '',
            "comcode": "11110000",
            "comcname": "双井分公司"
          }, {
            "parentcom": '',
            "comcode": "12220000",
            "comcname": "十里河分公司"
          }, {
            "parentcom": '',
            "comcode": "13330000",
            "comcname": "劲松分公司"
          }
        ]
      }
    }
  }
  return {
    "status": -1,
    "statusText": "加载树出错",
    "data": ""
  }

})
Mock.mock(baseURL + 'user/userLogin', {
  "status": '0',
  "statusText": '成功',
  "data": {
    user: {
      "usercode": "U00042283",
      "nusercode": "nusercode",
      "userid": /\d{8}/g,
      "username": '@cname',
      "deptcode": "DEPT10000002",
      "deptmode": null,
      "recflag": "E",
      "operateTimeForHis": "1900-01-20 17:47:26",
      "deptname": "北方运营中心",
      "senduserphn": null,
      "agentid": /\d{5}/g,
      "failedtimes": "0",
      "subdeptcode": null,
      "insert_time_for_his": "1900-01-20 15:52:45",
      "idno": /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      "userType": "E",
      "chkIdno": "Y",
      "ikeeperphn": null,
      "logindt": "1900-01-20 10:56:13",
      "loginip": null,
      "posttype": "M",
      "admintype": "M0002",
      "mhptflag": null,
      "mhptusr": null,
      "mhptdt": null,
      "groupbuyid": null,
      "mobile": "17587465364",
      "serverip": null,
      "pbinduserid": null,
      "operatorcode": null,
      "tasklockflag": null,
      "tasklockdt": null,
      "taskunlockdt": null,
      "taskunlockuser": null,
      "number4a": null,
      "sex": null,
      "mgcount": "1",
      "deptname_l1": null,
      "deptname_l2": null,
      "deptname_l3": null,
      "saletype": " "
    },
    purview: [
      "renewal_team_management"
    ]
  }
})

//根据条件查询用户列表
Mock.mock(baseURL + 'user/queryUser', {
  "status": '0',
  "statusText": '成功',
  "data": {
    "user|10": [
      {
        "usercode": "U00042283",
        "userid": /\d{8}/g,
        "username": '@cname',
        "deptcode": "DEPT10000002",
        "deptmode": null,
        "recflag": "E",
        "operateTimeForHis": "1900-01-20 17:47:26",
        "deptname": "北方运营中心",
        "senduserphn": null,
        "agentid": /\d{5}/g,
        "failedtimes": "0",
        "subdeptcode": null,
        "insert_time_for_his": "1900-01-20 15:52:45",
        "idno": /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        "userType": "E",
        "chkIdno": "Y",
        "ikeeperphn": null,
        "logindt": "1900-01-20 10:56:13",
        "loginip": null,
        "posttype|1": ['A', 'L', 'M'],
        "admintype": "M0002",
        "mhptflag": null,
        "mhptusr": null,
        "mhptdt": null,
        "groupbuyid": null,
        "mobile": "17587465364",
        "serverip": null,
        "pbinduserid": null,
        "operatorcode": null,
        "tasklockflag": null,
        "tasklockdt": null,
        "taskunlockdt": null,
        "taskunlockuser": null,
        "number4a": null,
        "sex": null,
        "mgcount": "1",
        "deptname_l1": null,
        "deptname_l2": null,
        "deptname_l3": null,
        "saletype|1": ['A', 'B', 'C']
      }
    ],
    total: 18160,
    pagenum: 1,
    pagesize: 5,
  }
})
//newDept页面中修改部门信息
Mock.mock(baseURL + 'dept/updateDept', {
  "status": '0',
  "data": {
    "dept": {
      "deptcode": "DEPT00007233",
      "deptname": "保存成功",
      "saletype": "A",
      "comcode": "12345678"
    }
  }
})
Mock.mock(baseURL + 'dept/deleteDept', {
  "status": '0',
})
//查询用户相关的列表信息
Mock.mock(baseURL + 'user/searchInfo', {
  "status": '0',
  "data": {
    "list|5-10": [
      {
        "workingNumber|+1": 50001,
        "name": '@cname',
        "extensionNumner|+1": 1314,
        "section": '@province',
        "marketType|1": ['续保', '前置'],
        "id": /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        "phoneNumber": /^1[3456789]\d{9}$/,
        "dutyType|1": ['主管', '客服专员', '其他'],
        "date": "@date('yyyy-MM-dd')"
      }
    ]
  }
})
//编辑页面中的具有角色的列表信息
Mock.mock(baseURL + 'user/getUserRoleVisible', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "userrole_visible": [
      {
        "userrolecode": "RV1000000032",
        "userid": "3333",
        "roleid": "ROLE20085",
        "rolename": "DXJJ",
        "roletype": "TSR"
      },
      {
        "userrolecode": "RV1000000034",
        "userid": "3333",
        "roleid": "ROLE16284",
        "rolename": "rrrr",
        "roletype": "TSR"
      }
    ]
  }
})
//保存可见角色
Mock.mock(baseURL + 'user/updateUserRoleVisible', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "userrole_visible": [
      {
        "userrolecode": "RV1000000032",
        "userid": "3333",
        "roleid": "ROLE20085",
        "rolename": "保存可见角色1",
        "roletype": "TSR"
      },
      {
        "userrolecode": "RV1000000034",
        "userid": "3333",
        "roleid": "ROLE16284",
        "rolename": "保存可见角色2",
        "roletype": "TSR"
      }
    ]
  }
})

//编辑页面中追加角色的角色信息
Mock.mock(baseURL + 'purview/queryRole', function (options) {
  console.log(options);
  let _req = JSON.parse(options.body);
  if (_req.rolename == '11') {
    return {
      "status": '500',
      "statusText": "未查询到匹配信息",
    }
  }
  else {
    return {
      "status": '0',
      "data": {
        "role": [
          {
            "roleid": '11111',
            "rolename": '主管权限',
            "roletype": 'TSR'
          },
          {
            "roleid": '22222',
            "rolename": '组长权限',
            "roletype": 'BAK'
          }
        ]
      }
    }
  }
})
//增加管理工作组的数据
Mock.mock(baseURL + 'user/managementWorkingGrop', {
  "status": '0',
  "data": {
    "list|5-10": [
      {
        "serialNumber|+1": /[A-Z]{4}\d{8}/g,
        "title|1": ['北方运营中心', '北京运营中心', '北京电销中心', '大主管组', '华东运营中心', '客户页面测试']
      }
    ]
  }
})
//增加可见角色模块数据
Mock.mock(baseURL + 'user/visibleRole', {
  "status": '0',
  "data": {
    "list|5-10": [
      {
        "number": /\d{8}/g
      }
    ]
  }
})
//出单机构权限设置tree数据
Mock.mock(baseURL + 'user/issueSettingTree', {
  "status": '0',
  "data": {
    "list": [
      {
        "title": '总公司',
        "id": 11,
        "children|20": [
          {
            "title": "@province",
            "id|+1": 1
          }
        ]
      }
    ]
  }
})
//出单权限机构设置中二级机构数据
Mock.mock(baseURL + 'user/SecondaryInstitutions', {
  "status": '0',
  "data": {
    "list|5-7": [
      {
        "provinceCompany": '',
        "institutionNumber|+1": 15020000,
        "institutionName": "@city"
      }
    ]
  }
})
//出单权限机构设置中三级机构数据
Mock.mock(baseURL + 'user/tertiaryInstitutions', {
  "status": '0',
  "data": {
    "list|5-7": [
      {
        "tertiaryCompany": "郑州市",
        "institutionNumber|+1": 1401500,
        "institutionName": "@county"
      }
    ]
  }
})
//设置角色添加查询
Mock.mock(baseURL + 'user/roleAddQuery', {
  "status": '0',
  "data": {
    "list|5-7": [
      {
        "roleNumber": /[A-Z]{4}\d{5}/,
        "roleName": "@first()",
        "roleType|1": ['电话中心', '落地部门']
      }
    ]
  }
})
//设置用户列表添加数据
Mock.mock(baseURL + 'user/userlistdQuery', {
  "status": '0',
  "data": {
    "list|10": [
      {
        "seatsNumber": /[A-Z]{4}\d{5}/,
        "seatsName": "@cname()",
        "department|1": ['主管组', '质检组', '测试组', '回访测试', '预约投保部'],
        "date": '@now()'
      }
    ]
  }
})
//新建部门模块数据权限弹框数据
Mock.mock(baseURL + 'user/dataPermissionData', {
  "status": '0',
  "data": {
    "list|1": [
      {
        "title": '总公司',
        "id": 1111,
        "children|10-15": [
          {
            "seatsNumber|+1": 11000000,
            "title": "@province",
            "id|+1": 11111
          }
        ]
      }
    ]
  }
})
//返回静态数据
Mock.mock(baseURL + 'misc/loadDataDict', {
  "status": 0,
  "statusText": "Success",
  "data": [
    {
      "dictcode": "0786",
      "dictname": "root",
      "dictvalue": "accflag",
      "dicttext": "驾意险投保标识",
      "isdefault": "",
      "optionvalue": "",
      "state": "0",
      "options": [
        {
          "dictcode": "0787",
          "dictname": "accflag",
          "dictvalue": "A",
          "dicttext": "驾意险",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0788",
          "dictname": "accflag",
          "dictvalue": "B",
          "dicttext": "骨折险",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "accflag",
          "dictvalue": "X",
          "dicttext": "未投保",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        }
      ]
    },
    {
      "dictcode": "0786",
      "dictname": "root",
      "dictvalue": "saletype_all",
      "dicttext": "电销业务类型",
      "isdefault": "",
      "optionvalue": "",
      "state": "0",
      "options": [
        {
          "dictcode": "0787",
          "dictname": "saletype",
          "dictvalue": "A",
          "dicttext": "呼入",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0788",
          "dictname": "saletype",
          "dictvalue": "B",
          "dicttext": "呼出",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "saletype",
          "dictvalue": "C",
          "dicttext": "续保",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "saletype",
          "dictvalue": "M",
          "dicttext": "前置",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "saletype",
          "dictvalue": "R",
          "dicttext": "网销自然业务",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0788",
          "dictname": "saletype",
          "dictvalue": "S",
          "dicttext": "网销团购业务",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "saletype",
          "dictvalue": "T",
          "dicttext": "移动端自然业务",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "saletype",
          "dictvalue": "U",
          "dicttext": "移动端团购业务",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        }
      ]
    },
    {
      "dictcode": "0786",
      "dictname": "root",
      "dictvalue": "saletype",
      "dicttext": "电销业务类型",
      "isdefault": "",
      "optionvalue": "",
      "state": "0",
      "options": [
        {
          "dictcode": "0787",
          "dictname": "saletype",
          "dictvalue": "A",
          "dicttext": "呼入",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0788",
          "dictname": "saletype",
          "dictvalue": "B",
          "dicttext": "呼出",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "saletype",
          "dictvalue": "C",
          "dicttext": "续保",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "saletype",
          "dictvalue": "M",
          "dicttext": "前置",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        }
      ]
    },
    {
      "dictcode": "0786",
      "dictname": "root",
      "dictvalue": "e_saletype",
      "dicttext": "网销业务类型",
      "isdefault": "",
      "optionvalue": "",
      "state": "0",
      "options": [
        {
          "dictcode": "0787",
          "dictname": "saletype",
          "dictvalue": "R",
          "dicttext": "网销自然业务",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0788",
          "dictname": "saletype",
          "dictvalue": "S",
          "dicttext": "网销团购业务",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "saletype",
          "dictvalue": "T",
          "dicttext": "移动端自然业务",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "saletype",
          "dictvalue": "U",
          "dicttext": "移动端团购业务",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        }
      ]
    },
    {
      "dictcode": "0786",
      "dictname": "root",
      "dictvalue": "recflagall",
      "dicttext": "坐席类型",
      "isdefault": "",
      "optionvalue": "",
      "state": "0",
      "options": [
        {
          "dictcode": "0787",
          "dictname": "recflagall",
          "dictvalue": "E",
          "dicttext": "电销坐席",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0788",
          "dictname": "recflagall",
          "dictvalue": "B",
          "dicttext": "落地坐席",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "recflagall",
          "dictvalue": "X",
          "dicttext": "失效人员",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        }
      ]
    },
    {
      "dictcode": "0786",
      "dictname": "root",
      "dictvalue": "posttype",
      "dicttext": "职务类别",
      "isdefault": "",
      "optionvalue": "",
      "state": "0",
      "options": [
        {
          "dictcode": "0787",
          "dictname": "posttype",
          "dictvalue": "A",
          "dicttext": "客户专员",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0788",
          "dictname": "posttype",
          "dictvalue": "L",
          "dicttext": "组长",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "posttype",
          "dictvalue": "M",
          "dicttext": "主管",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0788",
          "dictname": "posttype",
          "dictvalue": "S",
          "dicttext": "运营支持",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0789",
          "dictname": "posttype",
          "dictvalue": "O",
          "dicttext": "其他",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        }
      ]
    },
    {
      "dictcode": "0786",
      "dictname": "root",
      "dictvalue": "RoleType",
      "dicttext": "角色类型",
      "isdefault": "",
      "optionvalue": "",
      "state": "0",
      "options": [
        {
          "dictcode": "0787",
          "dictname": "RoleType",
          "dictvalue": "TSR",
          "dicttext": "电话中心",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "RoleType",
          "dictvalue": "BAK",
          "dicttext": "落地部门",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        }
      ]
    },
    {
      "dictcode": "1508",
      "dictname": "root",
      "dictvalue": "uploaddatatype",
      "dicttext": "上报数据类型",
      "isdefault": "",
      "optionvalue": "",
      "state": "0",
      "options": [
        {
          "dictcode": "1509",
          "dictname": "uploaddatatype",
          "dictvalue": "1",
          "dicttext": "传统续保数据",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "1509",
          "dictname": "uploaddatatype",
          "dictvalue": "6",
          "dicttext": "传统脱保数据",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "uploaddatatype",
          "dictvalue": "4",
          "dicttext": "公司潜在数据",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "uploaddatatype",
          "dictvalue": "7",
          "dicttext": "车行数据",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "uploaddatatype",
          "dictvalue": "8",
          "dicttext": "引导续保队列",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "uploaddatatype",
          "dictvalue": "9",
          "dicttext": "网销呼出队列",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "uploaddatatype",
          "dictvalue": "10",
          "dicttext": "非车险数据",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "uploaddatatype",
          "dictvalue": "13",
          "dicttext": "传统专属续保数据",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "uploaddatatype",
          "dictvalue": "14",
          "dicttext": "车电联呼数据",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "uploaddatatype",
          "dictvalue": "24",
          "dicttext": "保单关怀数据",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "uploaddatatype",
          "dictvalue": "27",
          "dicttext": "传统认领未续保数据",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0787",
          "dictname": "uploaddatatype",
          "dictvalue": "31",
          "dicttext": "辽宁关怀数据",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
      ]
    },
    {
      "dictcode": "0786",
      "dictname": "root",
      "dictvalue": "saledept",
      "dicttext": "业务类型",
      "isdefault": "",
      "optionvalue": "",
      "state": "0",
      "options": [
        {
          "dictcode": "0787",
          "dictname": "saledept",
          "dictvalue": "T",
          "dicttext": "电销",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        },
        {
          "dictcode": "0788",
          "dictname": "saledept",
          "dictvalue": "N",
          "dicttext": "网销",
          "isdefault": "",
          "optionvalue": "",
          "state": "0",
          "options": null
        }
      ]
    }, {
      "dictcode": "0786",
      "dictname": "root",
      "dictvalue": "insurcontrolflag",
      "dicttext": "电销管控标识",
      "isdefault": "",
      "optionvalue": "",
      "state": "0",
      "options": [{
        "dictcode": "1101",
        "dictname": "insurcontrolflag",
        "dictvalue": "",
        "dicttext": "继承上级机构设置",
        "isdefault": "",
        "optionvalue": "",
        "state": "0",
        "options": null
      }, {
        "dictcode": "1101",
        "dictname": "insurcontrolflag",
        "dictvalue": "0",
        "dicttext": "不进行管控",
        "isdefault": "",
        "optionvalue": "",
        "state": "0",
        "options": null
      }, {
        "dictcode": "1101",
        "dictname": "insurcontrolflag",
        "dictvalue": "1",
        "dicttext": "只管控通话次数",
        "isdefault": "",
        "optionvalue": "",
        "state": "0",
        "options": null
      }, {
        "dictcode": "1101",
        "dictname": "insurcontrolflag",
        "dictvalue": "2",
        "dicttext": "只管控通话时长",
        "isdefault": "",
        "optionvalue": "",
        "state": "0",
        "options": null
      }, {
        "dictcode": "1101",
        "dictname": "insurcontrolflag",
        "dictvalue": "2",
        "dicttext": "只管控通话时长",
        "isdefault": "",
        "optionvalue": "",
        "state": "0",
        "options": null
      }, {
        "dictcode": "1101",
        "dictname": "insurcontrolflag",
        "dictvalue": "3",
        "dicttext": "管控通话时长和次数",
        "isdefault": "",
        "optionvalue": "",
        "state": "0",
        "options": null
      }]
    }
  ]
})
//------------------角色模块的相关数据-------------------------
//角色查询的模拟数据
Mock.mock(baseURL + 'role/getRoleList', {
  "status": '0',
  "data": {
    "list|8-10": [
      {
        "roleNumber": /[A-Z]{4}\d{5}/g,
        "roleName": /\d{8}/g,
        "roleType|1": ['电话中心', '落地部门']
      }
    ]
  }
})
//获取权限列表 jurisdiction
Mock.mock(baseURL + 'purview/getPurviewList',
  {
    "status": 0,
    "statusText": "Success",
    "data": {
      "purview": [
        {
          "title": "groupname",
          "purviews": [
            {
              "purviewid": "recallquotemessage",
              "title": "400-7短信调整",
              "state": "0",
              "groupname": "groupname"
            }
          ]
        },
        {
          "title": "电销报表功能权限",
          "purviews": [
            {
              "purviewid": "jyqk.yktsyqk",
              "title": "一卡通使用情况统计",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "jyqk.dzsyqktj",
              "title": "单证使用情况统计",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "jyjk",
              "title": "总体经营情况",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "jyjk.cbzbbb",
              "title": "承保指标报表",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "jyqk",
              "title": "经营情况分析",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "jyqk.cbzttjb",
              "title": "承保状态统计表",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "jyqk.yytbfx",
              "title": "预约投保分析",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.jl.zong",
              "title": "总经理",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.zxts.zz",
              "title": "咨询投诉组(组长)",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.zxts",
              "title": "咨询投诉组",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.dhtb.zhg",
              "title": "电话投保组(主管)",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.dhtb.zz",
              "title": "电话投保组(组长)",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.dhtb",
              "title": "电话投保组",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj",
              "title": "电销统计",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "fwjk.dysx",
              "title": "打印保单时效监控",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "fwjk.pssx",
              "title": "配送时效监控",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "fwjk.zxxljk",
              "title": "咨询效率监控",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "fwjk.yytbxljk",
              "title": "预约投保效率监控",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "fwjk.hbxljk",
              "title": "核保效率监控",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "fwjk.csxljk",
              "title": "初审效率监控",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "fwjk",
              "title": "服务监控模块",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "jyqk.khtjqk",
              "title": "客户情况统计",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.jl.huc",
              "title": "呼出部经理",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.jl.hur",
              "title": "呼入部经理",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.jl",
              "title": "经理",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.hf.zhg",
              "title": "回访组(主管)",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.hf.zz",
              "title": "回访组(组长)",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.hf",
              "title": "回访组",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.xb.zhg",
              "title": "续保组(主管)",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.xb.zz",
              "title": "续保组(组长)",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.xb",
              "title": "续保组",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.fxb.zhg",
              "title": "非续保组(主管)",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.fxb.zz",
              "title": "非续保组(组长)",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.fxb",
              "title": "非续保组",
              "state": "0",
              "groupname": "电销报表功能权限"
            },
            {
              "purviewid": "dxtj.zxts.zhg",
              "title": "咨询投诉组(主管)",
              "state": "0",
              "groupname": "电销报表功能权限"
            }
          ]
        },
        {
          "title": "电销业务类",
          "purviews": [
            {
              "purviewid": "telefollowtask",
              "title": "预约任务统计",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "telesum",
              "title": "新电销业绩统计",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "rptorderaccount",
              "title": "坐席台帐查询",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "all_report",
              "title": "查询所有业绩",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "myreport",
              "title": "网销业绩查询",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "6",
              "title": "处理电话业务",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "set_mhptflag",
              "title": "设置优先个人预约",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "teleachieve",
              "title": "电销业绩查询",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "telecall",
              "title": "电销呼叫统计",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "telegroupcall",
              "title": "电销组呼叫统计",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "telegroupachieve",
              "title": "电销组业绩查询",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "case_task",
              "title": "事件任务",
              "state": "0",
              "groupname": "电销业务类"
            },
            {
              "purviewid": "telesale_task",
              "title": "电销任务",
              "state": "0",
              "groupname": "电销业务类"
            }
          ]
        },
        {
          "title": "订单/保单",
          "purviews": [
            {
              "purviewid": "insurkeeper_new",
              "title": "车险管家订单创建",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "OrderAreaCheck",
              "title": "订单地区效验",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurstatuslookup",
              "title": "查询投保单状态",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "ordercarrygiftprint",
              "title": "上海个性打印",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "orderreset",
              "title": "订单重置权限",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "feedbackorder",
              "title": "配送反馈",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "assigndeliverorder",
              "title": "配送分配",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "deliverprintorder",
              "title": "配送打印",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "lookupinsur",
              "title": "保单查询",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "dlamendattachment",
              "title": "批单附件下载",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "amendapplyentry",
              "title": "保单批改入口权限",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "cancel_circ_paymentno",
              "title": "上海车险电子支付撤销平台校验码",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "SelectOrderChange",
              "title": "订单修改",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurrevalfail",
              "title": "查询转保单失败",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "bak_amend_EAD",
              "title": "EAD补录",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "lookup_fbtask",
              "title": "查询配送反馈任务",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "upd_insursenddate",
              "title": "修改保单配送时间",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "force_qf",
              "title": "落地强制清分",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurkeeper_apply",
              "title": "车险管家服务应用",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurkeeper_rechk",
              "title": "车险管家服务复审",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurkeeper_chk",
              "title": "车险管家服务审核",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurkeeper_proc",
              "title": "车险管家订单处理",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurkeeperadmin",
              "title": "车险管家服务管理",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "delete_aiano",
              "title": "注销批单申请单",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "amendinsur_branch",
              "title": "落地批改权限",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "backlog_search",
              "title": "网销落地待办查询",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurchgcom",
              "title": "修改归属机构超级用户",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurrepeate",
              "title": "重复出单超级用户",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurcancelapply",
              "title": "核保作废申请",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "hbzf",
              "title": "核保作废",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "CenterFindOrder",
              "title": "分公司查询",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "sdbsnotcar",
              "title": "非车险手动标示",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "amenddeal",
              "title": "批改任务处理",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "amendcheck",
              "title": "批单复核",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "amendapply",
              "title": "批改申请处理",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "otherinsur",
              "title": "异地出单",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "insurcontrol",
              "title": "管控超级用户",
              "state": "0",
              "groupname": "订单/保单"
            },
            {
              "purviewid": "lookuporder",
              "title": "订单查询",
              "state": "0",
              "groupname": "订单/保单"
            }
          ]
        },
        {
          "title": "队列管理类",
          "purviews": [
            {
              "purviewid": "ds_manager_queue_all",
              "title": "管理所有数据分层队列",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_datasharing_batch",
              "title": "批量设定数据返回",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_lastyear_assign_group",
              "title": "管理上年成单数据分配到组",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_lastyear_assign_agent",
              "title": "管理上年成单分配数据",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_threshold_config",
              "title": "拆分队列阈值配置",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_auto_assign_user",
              "title": "队列自动下发配置",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_datapool",
              "title": "队列数据池管理",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "acrmcntinfo",
              "title": "ACRM数据统计",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "taskunlockconfig",
              "title": "强制拨打配置",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "taskunlockconfigadmin",
              "title": "强制拨打配置管理员",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "configrec",
              "title": "预约时间锁",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "outcall_queue_manager",
              "title": "智能外呼管理",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_clearworkqueue",
              "title": "清除任务",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_editqueue_sedar",
              "title": "管理启编辑删分统队列",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_editqueue_ctrltask",
              "title": "管理分配队列",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_groupdata_assign",
              "title": "管理分配任务到组",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_groupdata_recover",
              "title": "管理从组回收任务",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_agentdata_assign",
              "title": "管理分配任务到坐席",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_agentdata_recover",
              "title": "管理从坐席回收任务",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_queueassign_mask",
              "title": "屏蔽队列分配历史",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_agentdata",
              "title": "管理组成员任务",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_mgalldata",
              "title": "管理所有队列",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_custinfo",
              "title": "客户队列信息查询",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_batchmanager",
              "title": "队列集中管理",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_taskaggign",
              "title": "队列数据管理",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "task_show_count",
              "title": "显示任务量",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_repeatqueuename",
              "title": "重复队列名称提醒",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_fassign_deptcode",
              "title": "精细化分配到组",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_fassign_userid",
              "title": "精细化分配到坐席",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_frecycle_userid",
              "title": "精细化回收坐席数据",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "reex_data_manager",
              "title": "批次整合模板",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "batch_detail_export",
              "title": "批次整合导出",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_data_distribution",
              "title": "数据自动分配",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "mask_list_import",
              "title": "屏蔽清单导入",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_return_data",
              "title": "营销数据退回",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "wq_batch_setting",
              "title": "批量管理",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "datasharing_config",
              "title": "数据返回规则设定",
              "state": "0",
              "groupname": "队列管理类"
            },
            {
              "purviewid": "datasharing_list",
              "title": "数据返回情况查询",
              "state": "0",
              "groupname": "队列管理类"
            }
          ]
        },
        {
          "title": "家电延保合同",
          "purviews": [
            {
              "purviewid": "eacupdate",
              "title": "延保合同反馈",
              "state": "0",
              "groupname": "家电延保合同"
            },
            {
              "purviewid": "eacprint",
              "title": "延保合同打印",
              "state": "0",
              "groupname": "家电延保合同"
            },
            {
              "purviewid": "eacsearch",
              "title": "延保合同查询",
              "state": "0",
              "groupname": "家电延保合同"
            },
            {
              "purviewid": "eacadmin",
              "title": "延保相关系统配置",
              "state": "0",
              "groupname": "家电延保合同"
            },
            {
              "purviewid": "eaccancelorder",
              "title": "注销延保合同",
              "state": "0",
              "groupname": "家电延保合同"
            },
            {
              "purviewid": "eacviewallorder",
              "title": "查看所有延保合同",
              "state": "0",
              "groupname": "家电延保合同"
            },
            {
              "purviewid": "eacneworder",
              "title": "创建修改延保合同",
              "state": "0",
              "groupname": "家电延保合同"
            },
            {
              "purviewid": "eacdeliverall",
              "title": "处理全国延保合同",
              "state": "0",
              "groupname": "家电延保合同"
            },
            {
              "purviewid": "eacexport",
              "title": "延保合同导出",
              "state": "0",
              "groupname": "家电延保合同"
            }
          ]
        },
        {
          "title": "监控",
          "purviews": [
            {
              "purviewid": "ds_agentdata",
              "title": "数据分层队列-组长",
              "state": "0",
              "groupname": "监控"
            },
            {
              "purviewid": "ds_manager_assign",
              "title": "数据分层队列-区域经理",
              "state": "0",
              "groupname": "监控"
            },
            {
              "purviewid": "ds_groupdata_assign",
              "title": "数据分层队列-主管",
              "state": "0",
              "groupname": "监控"
            }
          ]
        },
        {
          "title": "监控/赠品",
          "purviews": [
            {
              "purviewid": "stockout",
              "title": "出库登记",
              "state": "0",
              "groupname": "监控/赠品"
            },
            {
              "purviewid": "stockchange",
              "title": "更换赠品",
              "state": "0",
              "groupname": "监控/赠品"
            },
            {
              "purviewid": "lackofawoke",
              "title": "库存不足提醒",
              "state": "0",
              "groupname": "监控/赠品"
            },
            {
              "purviewid": "stockcontrol",
              "title": "库存查询",
              "state": "0",
              "groupname": "监控/赠品"
            },
            {
              "purviewid": "stockin",
              "title": "入库登记",
              "state": "0",
              "groupname": "监控/赠品"
            },
            {
              "purviewid": "stockprodmanager",
              "title": "赠品类别维护",
              "state": "0",
              "groupname": "监控/赠品"
            }
          ]
        },
        {
          "title": "监控/质检",
          "purviews": [
            {
              "purviewid": "qmhistsearch",
              "title": "质检评分历史查询",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "recordlist",
              "title": "录音库查询",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qmfeedback",
              "title": "质检反馈",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qmsearchall",
              "title": "查询所有质检任务",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qmdelete",
              "title": "质检任务删除",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qsmonitorsearch",
              "title": "监听质检查询",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qsmonitor",
              "title": "监听质检",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qmset",
              "title": "模板定制",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "fusebusiness",
              "title": "融合业务",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qmadminscore",
              "title": "质检员评分",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "monitor_agent",
              "title": "座席组监控",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qmadmin",
              "title": "质检管理",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qmassign",
              "title": "质检分配",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qmsearch",
              "title": "质检查询",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "recordsearch",
              "title": "录音查询",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "enterprise_download",
              "title": "批量下载(录音)",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "enterprise_select",
              "title": "企业微信查询",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "ewechatqmassign",
              "title": "企业微信分配",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "ewechatrecordadmin",
              "title": "企业微信对话管理员",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "ewechatrecord",
              "title": "企业微信对话",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "ewechatqmadmin",
              "title": "企业微信质检管理员",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "ewechatqm",
              "title": "企业微信质检",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "selfcheck_read_admin",
              "title": "录音自审听取主管",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "selfcheck_read",
              "title": "录音自审听取",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "selfcheck_assign",
              "title": "录音自审分配",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "selfcheck_extract",
              "title": "录音自审抽取",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "iqsearchall",
              "title": "查询所有智能质检评分",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "iqscore",
              "title": "智能质检评分",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "iqadminscore",
              "title": "智能质检审核",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "iqrecordassign",
              "title": "智能质检抽取",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "iqrecordmanager",
              "title": "智能质检管理",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "notbelongrecord",
              "title": "无客户归属录音",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "recordsearch_sixmonth",
              "title": "录音查询限制(六个月)",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "recordsearch_onemonth",
              "title": "录音查询限制(一个月)",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "qmscore",
              "title": "质检评分",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "screentapedownload",
              "title": "屏蔽录音下载",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "currteletimecnt",
              "title": "当天通话统计",
              "state": "0",
              "groupname": "监控/质检"
            },
            {
              "purviewid": "nrecordlisten",
              "title": "录音听取",
              "state": "0",
              "groupname": "监控/质检"
            }
          ]
        },
        {
          "title": "客户查询类型",
          "purviews": [
            {
              "purviewid": "40",
              "title": "落地转电销客户",
              "state": "0",
              "groupname": "客户查询类型"
            },
            {
              "purviewid": "10",
              "title": "电销客户\t\t \t ",
              "state": "0",
              "groupname": "客户查询类型"
            },
            {
              "purviewid": "20",
              "title": "车主宝典",
              "state": "0",
              "groupname": "客户查询类型"
            },
            {
              "purviewid": "22",
              "title": "网销车险客户",
              "state": "0",
              "groupname": "客户查询类型"
            },
            {
              "purviewid": "34",
              "title": "导入数据\t ",
              "state": "0",
              "groupname": "客户查询类型"
            },
            {
              "purviewid": "18",
              "title": "原始客户数据",
              "state": "0",
              "groupname": "客户查询类型"
            },
            {
              "purviewid": "19",
              "title": "网销非车险客户",
              "state": "0",
              "groupname": "客户查询类型"
            }
          ]
        },
        {
          "title": "客户信息",
          "purviews": [
            {
              "purviewid": "black_cust",
              "title": "黑名单维护",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "new_cust",
              "title": "新建客户信息",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "edit_cust",
              "title": "修改客户信息",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "copy_cust",
              "title": "复制客户信息",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "lookup_cust",
              "title": "客户查询",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "grey_cust",
              "title": "灰名单维护",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "recall_search",
              "title": "客户回呼",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "creatcust",
              "title": "落地转业务数据创建",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "lookupcust_dept",
              "title": "落地转业务查询",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "lookupcust_agent",
              "title": "中心转业务查询",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "lookupcust_alldept",
              "title": "推荐业务省份查询",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "deptcust_check",
              "title": "推荐业务审核",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "stepinfomanager",
              "title": "落地两段式营销管理者",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "stepinfohandler",
              "title": "落地两段式营销处理者",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "stepinfodept",
              "title": "两段式营销组长查询",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "netsalecontrol",
              "title": "网销真实度页面",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "rptcustcarlog",
              "title": "财产信息变更轨迹查询",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "rptqueueinsurinfo",
              "title": "队列成单明细查询",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "messagehistview",
              "title": "查看短信发送历史",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "newcustomerframe",
              "title": "新客户页面",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "addcar",
              "title": "添加车辆信息",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "deletecar",
              "title": "删除车辆信息",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "updatecar",
              "title": "更新车辆信息",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "addcontact",
              "title": "增加联系方式",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "resourceflag",
              "title": "不能修改推荐送修码",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "taskdatatransfer",
              "title": "队列数据转交",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "showtaskhist",
              "title": "显示队列数据变更历史",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "contactrecord",
              "title": "联系历史中听取录音",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "insurrecallhistview",
              "title": "回访历史",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "wq_ncinsuredidentino",
              "title": "非车高价客户信息导入",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "checkmobilearea",
              "title": "检测号码区域归属",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "updxbcomcode",
              "title": "修改传统专属续保出单归属机构",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "cuscar_disabled",
              "title": "客户车辆失效",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "cuscar_enable",
              "title": "客户车辆生效",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "cuscar_repeatcontrol",
              "title": "客户新增车辆信息限制",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "mhandlercode",
              "title": "修改经办人",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "iintroducer",
              "title": "录入介绍人",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "docustdatamerge",
              "title": "数据整合",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "custdatamergehist",
              "title": "数据整合历史 ",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "disablecustdate",
              "title": "查询无效数据 ",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "customercallback",
              "title": "客户回呼管理",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "distribution_tasktrank",
              "title": "分配转接任务",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "weixincallbackmanager",
              "title": "回访专用管理",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "tkoplateno",
              "title": "投保车牌号可为空",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "custdata_mergeall",
              "title": "整合全部数据",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "channel_bind",
              "title": "报价信息配置",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "channel_businessnature",
              "title": "渠道绑定",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "dialidno",
              "title": "失联外呼",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "task_unlock_user",
              "title": "解锁到期任务",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "task_unlock_info",
              "title": "到期任务明细",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "newinsur",
              "title": "新架构投保",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "customer_nc_info",
              "title": "助贷险信息",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "customer_portrait",
              "title": "客户画像",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "enterprisercustmanager",
              "title": "企业微信客户管理",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "importcustomermaintain",
              "title": "重点客户维护",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "whitelist",
              "title": "白名单",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "wxenterpriserlabel",
              "title": "企业微信客户标签管理",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "nctaskassign",
              "title": "非车(人)任务分配",
              "state": "0",
              "groupname": "客户信息"
            },
            {
              "purviewid": "stepinfousr",
              "title": "两段式营销坐席查询",
              "state": "0",
              "groupname": "客户信息"
            }
          ]
        },
        {
          "title": "礼品管理",
          "purviews": [
            {
              "purviewid": "giftplanmanager",
              "title": "礼品活动管理",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "giftitemmanager",
              "title": "礼品类别管理",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "deptgiftdistmanager",
              "title": "销售组礼品分配管理",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "giftplanshare",
              "title": "创建共享活动",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "giftrdmanager",
              "title": "礼品回收作废",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "giftdistmanager",
              "title": "礼品分配管理",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "giftdisasterprevention",
              "title": "防灾减损服务",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "giftplanconditioncopy",
              "title": "礼品活动条件复制",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "scoremanager",
              "title": "积分管控",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "giftplanothercheck",
              "title": "礼品活动特殊审核",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "giftplanlookup",
              "title": "礼品/活动查询",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "giftbatchmanager",
              "title": "礼品权限批量管理",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "giftactivitychange",
              "title": "礼品活动名称编辑",
              "state": "0",
              "groupname": "礼品管理"
            },
            {
              "purviewid": "bfgiftmanager",
              "title": "北分礼品设置管理",
              "state": "0",
              "groupname": "礼品管理"
            }
          ]
        },
        {
          "title": "排班",
          "purviews": [
            {
              "purviewid": "planagent",
              "title": "小组排班",
              "state": "0",
              "groupname": "排班"
            },
            {
              "purviewid": "maintaintool",
              "title": "维护工具",
              "state": "0",
              "groupname": "排班"
            },
            {
              "purviewid": "plangroup",
              "title": "班次设定",
              "state": "0",
              "groupname": "排班"
            },
            {
              "purviewid": "planall",
              "title": "整体排班",
              "state": "0",
              "groupname": "排班"
            }
          ]
        },
        {
          "title": "数据导入",
          "purviews": [
            {
              "purviewid": "audit_outcall_batch",
              "title": "智能外呼批次审核",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "df_importdata",
              "title": "数据导入",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "uploaddata_branch",
              "title": "分公司上传数据",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "uploaddata_manager",
              "title": "查询下级机构上传批次",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "uploaddata_export",
              "title": "分公司上报数据导出",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "import_custremark",
              "title": "客户信息回写",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "update_renewal_data",
              "title": "更新续保数据",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "customer_nc_upload",
              "title": "助贷险上报",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "uploaddata_custcode",
              "title": "客户编号导入",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "customer_phone_upload",
              "title": "批量更新联系方式",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "mobileexpressbinding",
              "title": "手机快报信息导入",
              "state": "0",
              "groupname": "数据导入"
            },
            {
              "purviewid": "delbranch",
              "title": "批次删除审核",
              "state": "0",
              "groupname": "数据导入"
            }
          ]
        },
        {
          "title": "系统管理类",
          "purviews": [
            {
              "purviewid": "wf_new",
              "title": "创建工单",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "ic_all",
              "title": "管理所有的核保作废",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "ts_admin",
              "title": "管理员权限",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "ts_leader",
              "title": "组长权限",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wflow",
              "title": "工作流管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wf_200",
              "title": "查看记事本工单",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wf_100",
              "title": "查看投诉工单",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wf_mclose",
              "title": "工单手工结案",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wf_update",
              "title": "工单修正",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wf_all",
              "title": "管理所有工单",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wf_view",
              "title": "查看工单",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wf_handle",
              "title": "处理工单",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wf_urge",
              "title": "督办工单",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wf_auth",
              "title": "审核工单",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "ts_own",
              "title": "管理所属电销部门",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "ts_ownall",
              "title": "管理配置可管理的电销部门",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "ts_all",
              "title": "管理所有电销部门",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "bak_own",
              "title": "管理所属落地部门",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "bak_ownall",
              "title": "管理下属落地部门",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "bak_all",
              "title": "管理所有落地部门",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "admin",
              "title": "班长席",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "papermanager",
              "title": "问卷管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "workqueuemanager",
              "title": "队列管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "campaignmanagerall",
              "title": "管理全部活动",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "campaignmanager",
              "title": "活动设置",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "admin_notice",
              "title": "公告维护",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "admin_talkscript",
              "title": "话术维护",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "admin_role",
              "title": "角色管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "admin_user",
              "title": "用户管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "ewechatcomparemanager",
              "title": "企业微信同步管理员",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "ewechatdeptmanager",
              "title": "企业微信部门管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "enddate",
              "title": "预约任务查询",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "ewechatmanager",
              "title": "企业微信管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "userexport",
              "title": "坐席信息导出",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "configure_visible_role",
              "title": "配置可见角色",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "landing_management",
              "title": "分公司落地管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "renewal_team_management",
              "title": "续保团队管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "vminfoimport",
              "title": "微店信息导入",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "prjcampaign_check",
              "title": "项目活动审批功能",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "prjcampaign_setting",
              "title": "项目活动配置功能",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "prjcampaign_select",
              "title": "项目活动查询",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "project_setting",
              "title": "项目配置功能",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "batchfailurenumber",
              "title": "批量失效工号",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "ts_AddPermissions",
              "title": "批量增加权限",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "smallshop",
              "title": "微店链接",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "cross_sales",
              "title": "交叉销售",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "bonuspoolmanager",
              "title": "红包充值管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "bonuscampaignmanager",
              "title": "红包活动设置",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "subcenterusermanager",
              "title": "客服专员管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "sendquotemessage",
              "title": "是否发送95518号码",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "quotesmslink",
              "title": "报价短信链接",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "upd_insurmessage",
              "title": "修改短信报价模板",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "srvcall_filter",
              "title": "服务订单回访筛选",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "formsmobileencryption",
              "title": "电话号码查看",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "admin_mobile_area",
              "title": "标识号码区域",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "sambasavepaper",
              "title": "保存问卷",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "wf_allhist",
              "title": "工单问卷相关历史",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "msgconfigauditor",
              "title": "短信配置审核人",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "msgconfigmanager",
              "title": "短信配置管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "smsmanager",
              "title": "短信平台管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "admin_static",
              "title": "静态数据维护",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "auto_tasktrans_rule",
              "title": "自动分配规则设定",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "lookup_tasktrans",
              "title": "查询转接任务",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "adminiplimit",
              "title": "管理IP地址限制",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "noiplimit",
              "title": "登录不受IP地址限制",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "webmsgattch",
              "title": "即时消息发送附件",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "webmsgmanager",
              "title": "即时消息管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "channel_manager",
              "title": "客户渠道管理",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "blackaudit",
              "title": "禁拨名单审核",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "blackadd",
              "title": "禁拨名单添加",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "blackmanager",
              "title": "禁拨名单维护",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "customersearchall",
              "title": "查询所有客户",
              "state": "0",
              "groupname": "系统管理类"
            },
            {
              "purviewid": "impdatamanager",
              "title": "外导数据管理",
              "state": "0",
              "groupname": "系统管理类"
            }
          ]
        },
        {
          "title": "业绩划转",
          "purviews": [
            {
              "purviewid": "perchg_stage1",
              "title": "划转审核",
              "state": "0",
              "groupname": "业绩划转"
            },
            {
              "purviewid": "perchg_config",
              "title": "业绩划转维护",
              "state": "0",
              "groupname": "业绩划转"
            },
            {
              "purviewid": "perchg_stage2",
              "title": "划转审批",
              "state": "0",
              "groupname": "业绩划转"
            },
            {
              "purviewid": "perchg_create",
              "title": "业绩划转申请",
              "state": "0",
              "groupname": "业绩划转"
            },
            {
              "purviewid": "perchg_stage3",
              "title": "划转执行",
              "state": "0",
              "groupname": "业绩划转"
            }
          ]
        },
        {
          "title": "杂项",
          "purviews": [
            {
              "purviewid": "mailadmin",
              "title": "邮件管理",
              "state": "0",
              "groupname": "杂项"
            },
            {
              "purviewid": "message",
              "title": "即时消息",
              "state": "0",
              "groupname": "杂项"
            },
            {
              "purviewid": "sendmessagetoall",
              "title": "短信群发",
              "state": "0",
              "groupname": "杂项"
            }
          ]
        },
        {
          "title": "支付模块",
          "purviews": [
            {
              "purviewid": "pay_refund",
              "title": "申请电子支付退款",
              "state": "0",
              "groupname": "支付模块"
            },
            {
              "purviewid": "pay_refund_check",
              "title": "审核电子支付退款",
              "state": "0",
              "groupname": "支付模块"
            },
            {
              "purviewid": "pay_refund_view",
              "title": "查看电子支付退款",
              "state": "0",
              "groupname": "支付模块"
            },
            {
              "purviewid": "pay_count",
              "title": "支付统计查询",
              "state": "0",
              "groupname": "支付模块"
            },
            {
              "purviewid": "pay_search",
              "title": "支付明细查询",
              "state": "0",
              "groupname": "支付模块"
            },
            {
              "purviewid": "pay_admin",
              "title": "支付管理",
              "state": "0",
              "groupname": "支付模块"
            }
          ]
        },
        {
          "title": "知识库",
          "purviews": [
            {
              "purviewid": "kbview_qm",
              "title": "知识库可见-质检权限",
              "state": "0",
              "groupname": "知识库"
            },
            {
              "purviewid": "kbcatalogall",
              "title": "维护知识库目录",
              "state": "0",
              "groupname": "知识库"
            },
            {
              "purviewid": "kbupdateall",
              "title": "维护知识点权限",
              "state": "0",
              "groupname": "知识库"
            },
            {
              "purviewid": "kbfinder",
              "title": "知识库查询",
              "state": "0",
              "groupname": "知识库"
            },
            {
              "purviewid": "kbmanager",
              "title": "知识库管理",
              "state": "0",
              "groupname": "知识库"
            },
            {
              "purviewid": "kbview_ts",
              "title": "知识库可见-投诉权限",
              "state": "0",
              "groupname": "知识库"
            }
          ]
        },
        {
          "title": "自动外呼管理",
          "purviews": [
            {
              "purviewid": "sambamonitormanager",
              "title": "外呼监控",
              "state": "0",
              "groupname": "自动外呼管理"
            },
            {
              "purviewid": "dodialnotemanageradmin",
              "title": "主管记事",
              "state": "0",
              "groupname": "自动外呼管理"
            },
            {
              "purviewid": "sambaoutagent",
              "title": "自动外呼",
              "state": "0",
              "groupname": "自动外呼管理"
            },
            {
              "purviewid": "sambareportmanager",
              "title": "外呼报表",
              "state": "0",
              "groupname": "自动外呼管理"
            },
            {
              "purviewid": "dodialnotemanager",
              "title": "坐席记事",
              "state": "0",
              "groupname": "自动外呼管理"
            },
            {
              "purviewid": "sambacampaignmanager",
              "title": "外呼管理",
              "state": "0",
              "groupname": "自动外呼管理"
            }
          ]
        }
      ]
    }
  })
Mock.mock(baseURL + 'purview/getRolePurview', {
  "status": '0',
  "data": {
    role: {
      roleid: '12345',
      rolename: '全权限',
      roletype: 'TSR',
      flag: '0'
    },
    rolepurview: [
      { roleid: '12345', purviewid: 'admin_user', purviewname: '用户管理' },
      { roleid: '12345', purviewid: 'admin_role', purviewname: '角色管理' },
      { roleid: '12345', purviewid: 'admin_talkscript', purviewname: '话术维护' }
    ]
  }
})
Mock.mock(baseURL + 'purview/updateRole', {
  "status": '0',
  "data": {
    role: {
      roleid: '12345',
      rolename: '全权限',
      roletype: 'TSR',
      flag: '0'
    },
    rolepurview: [
      { roleid: '12345', purviewid: 'admin_user', purviewname: '用户管理' },
      { roleid: '12345', purviewid: 'admin_role', purviewname: '角色管理' },
      { roleid: '12345', purviewid: 'admin_talkscript', purviewname: '话术维护' }
    ]
  }
})
Mock.mock(baseURL + 'purview/deleteRole', {
  "status": '0',
  "data": {
  }
})

//新建坐席
Mock.mock(baseURL + 'user/createUser', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "user": {
      "username": "新建测试",
      "deptcode": "DEPT00007233",
      "userid": "newuserid",
      "deptmode": "",
      "usercode": "U00058830",
      "recflag": "E",
      "updatedt": "2018-02-23 13:54:16",
      "deptname": "WE",
      "senduserphn": "",
      "agentid": "78884",
      "failedtimes": "3",
      "subdeptcode": "",
      "crdt": "2016-05-05 13:27:28",
      "idno": "130322199504033303",
      "usertype": "E",
      "chk_idno": "Y",
      "ikeeperphn": "",
      "logindt": "2019-01-10 11:01:26",
      "loginip": "",
      "mobile": "12356737773",
      "posttype": "A",
      "admintype": "",
      "mhptflag": "",
      "mhptusr": "",
      "mhptdt": "",
      "groupbuyid": "abcdef",
      "operatorcode": "",
      "pbinduserid": "123456",
      "tasklockflag": "",
      "tasklockdt": "",
      "taskunlockdt": "",
      "taskunlockuser": "",
      "number4a": "",
      "sex": "",
      "serverip": ""
    }
  }
})
//修改坐席数据
Mock.mock(baseURL + 'user/updateUser', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "user": {
      "username": "11",
      "deptcode": "DEPT00007233",
      "userid": "00058830",
      "deptmode": "",
      "usercode": "U00058830",
      "recflag": "E",
      "updatedt": "2018-02-23 13:54:16",
      "deptname": "WE",
      "senduserphn": "",
      "agentid": "78884",
      "failedtimes": "3",
      "subdeptcode": "",
      "crdt": "2016-05-05 13:27:28",
      "idno": "130322199504033303",
      "usertype": "E",
      "chk_idno": "Y",
      "ikeeperphn": "",
      "logindt": "2019-01-10 11:01:26",
      "loginip": "",
      "mobile": "12356737773",
      "posttype": "A",
      "admintype": "",
      "mhptflag": "",
      "mhptusr": "",
      "mhptdt": "",
      "groupbuyid": "abcdef",
      "operatorcode": "",
      "pbinduserid": "123456",
      "tasklockflag": "",
      "tasklockdt": "",
      "taskunlockdt": "",
      "taskunlockuser": "",
      "number4a": "",
      "sex": "",
      "serverip": ""
    }
  }
})

//获取坐席详细信息
Mock.mock(baseURL + 'user/getUser', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "user": {
      "username": "11",
      "deptcode": "DEPT00007233",
      "userid": "00058830",
      "deptmode": "",
      "usercode": "U00058830",
      "recflag": "E",
      "updatedt": "2018-02-23 13:54:16",
      "deptname": "WE",
      "senduserphn": "",
      "agentid": "78884",
      "failedtimes": "3",
      "subdeptcode": "",
      "crdt": "2016-05-05 13:27:28",
      "idno": "130322199504033303",
      "usertype": "E",
      "chk_idno": "Y",
      "ikeeperphn": "",
      "logindt": "2019-01-10 11:01:26",
      "loginip": "",
      "mobile": "13366669999",
      "posttype": "A",
      "admintype": "22",
      "mhptflag": "",
      "mhptusr": "",
      "mhptdt": "",
      "groupbuyid": "abcdef",
      "operatorcode": "",
      "pbinduserid": "123456",
      "tasklockflag": "",
      "tasklockdt": "",
      "taskunlockdt": "",
      "taskunlockuser": "",
      "number4a": "",
      "sex": "",
      "serverip": ""
    }
  }
})

//获取坐席详细信息
Mock.mock(baseURL + 'dept/getDept', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "dept": {
      "deptcode": "DEPT00007233",
      "deptname": "WE",
      "saledept": "T",
      "saletype": "A",
      "comcode": "12345678",
      "salesubtype": "C0001",
      "factor": 1
    }
  }
})

//获取静态数据
Mock.mock(baseURL + 'misc/queryStaticInfo', function (options) {
  console.log(options);
  let _req = JSON.parse(options.body);
  if (_req.recflag == 'A') {
    return {
      "status": '0',
      data: {
        staticinfo: [{
          kdesc: '主管业务类型',
          kval: '1111',
          kid: 'saletype'
        }, {
          kdesc: '区域类型',
          kval: '2222',
          kid: 'null'
        }]
      }
    }
  }
  else if (_req.kid == 'admintype' && _req.parentval == 'A') {
    return {
      "status": '0',
      data: {
        staticinfo: [{
          kdesc: '客专1',
          kval: '11',
          kid: 'admintype'
        }, {
          kdesc: '客专2',
          kval: '22',
          kid: 'admintype'
        }]
      }
    }
  }
  else if (_req.kid == 'admintype' && _req.parentval != 'A') {
    return {
      "status": '0',
      data: {
        staticinfo: [{
          kdesc: '选项1',
          kval: '33',
          kid: 'admintype'
        }, {
          kdesc: '选项2',
          kval: '44',
          kid: 'admintype'
        }]
      }
    }
  }
  else if (_req.kid == '1111') {
    return {
      "status": '0',
      data: {
        staticinfo: [{
          "kid": "salesubtype",
          "kval": "B0001",
          "kdesc": "呼出业务岗",
          "parentval": "B",
          "recflag": "E",
          "isselected": "N",
          "bysort": 0,
          "cruser": "00002077"
        },
        {
          "kid": "salesubtype",
          "kval": "B0021",
          "kdesc": "车电联呼业务岗",
          "parentval": "B",
          "recflag": "E",
          "isselected": "N",
          "bysort": 0,
          "cruser": "00002077"
        }]
      }
    }
  }
  else if (_req.kid == '2222') {
    return {
      "status": '0',
      data: {
        staticinfo: [{
          kdesc: '选项1',
          kval: '33',
          kid: 'admintype'
        }, {
          kdesc: '选项2',
          kval: '44',
          kid: 'admintype'
        }]
      }
    }
  }
  else {
    let ret = {
      "status": 0,
      "statusText": "Success",
      "data": {
        "staticinfo": [
          {
            "kid": "salesubtype",
            "kval": "A0023",
            "kdesc": "哇哇哇哇",
            "parentval": "A",
            "recflag": "E",
            "isselected": "",
            "bysort": 0,
            "cruser": "DXJJ"
          },
          {
            "kid": "salesubtype",
            "kval": "B0001",
            "kdesc": "呼出业务岗",
            "parentval": "B",
            "recflag": "E",
            "isselected": "N",
            "bysort": 0,
            "cruser": "00002077"
          },
          {
            "kid": "salesubtype",
            "kval": "B0021",
            "kdesc": "车电联呼业务岗",
            "parentval": "B",
            "recflag": "E",
            "isselected": "N",
            "bysort": 0,
            "cruser": "00002077"
          },
          {
            "kid": "salesubtype",
            "kval": "C0001",
            "kdesc": "续保业务岗",
            "parentval": "C",
            "recflag": "E",
            "isselected": "N",
            "bysort": 0,
            "cruser": "00002077"
          },
          {
            "kid": "salesubtype",
            "kval": "D0001",
            "kdesc": "引导呼入业务岗",
            "parentval": "D",
            "recflag": "E",
            "isselected": "N",
            "bysort": 0,
            "cruser": "00002077"
          },
          {
            "kid": "salesubtype",
            "kval": "D0002",
            "kdesc": "引导续保业务岗",
            "parentval": "D",
            "recflag": "E",
            "isselected": "N",
            "bysort": 0,
            "cruser": "00002077"
          },
          {
            "kid": "salesubtype",
            "kval": "D0003",
            "kdesc": "引导系统上传业务岗",
            "parentval": "D",
            "recflag": "E",
            "isselected": "N",
            "bysort": 0,
            "cruser": "00002077"
          },
          {
            "kid": "salesubtype",
            "kval": "D0004",
            "kdesc": "引导融合业务岗",
            "parentval": "D",
            "recflag": "E",
            "isselected": "N",
            "bysort": 0,
            "cruser": "00002077"
          },
          {
            "kid": "salesubtype",
            "kval": "H0001",
            "kdesc": "预约投保业务岗",
            "parentval": "H",
            "recflag": "E",
            "isselected": "N",
            "bysort": 0,
            "cruser": "00002077"
          },
          {
            "kid": "salesubtype",
            "kval": "J0001",
            "kdesc": "批改业务岗",
            "parentval": "J",
            "recflag": "E",
            "isselected": "N",
            "bysort": 0,
            "cruser": "00002077"
          },
          {
            "kid": "salesubtype",
            "kval": "L0001",
            "kdesc": "保险",
            "parentval": "L",
            "recflag": "E",
            "isselected": "",
            "bysort": 0,
            "cruser": "DXJJ"
          },
          {
            "kid": "salesubtype",
            "kval": "P0001",
            "kdesc": "前置呼入",
            "parentval": "P",
            "recflag": "E",
            "isselected": "",
            "bysort": 0,
            "cruser": "DXJJ"
          },
          {
            "kid": "salesubtype",
            "kval": "P0002",
            "kdesc": "前置呼出",
            "parentval": "P",
            "recflag": "E",
            "isselected": "",
            "bysort": 1,
            "cruser": "DXJJ"
          },
          {
            "kid": "salesubtype",
            "kval": "P0003",
            "kdesc": "前置续保",
            "parentval": "P",
            "recflag": "E",
            "isselected": "",
            "bysort": 2,
            "cruser": "DXJJ"
          }
        ]
      }
    }
    return ret
  }
}
)

//保存静态数据
Mock.mock(baseURL + 'misc/createStaticInfo', function (options) {
  console.log(options);
  let _req = JSON.parse(options.body);

  let ret = {
    "status": 0,
    "statusText": "Success",
    "data": {
      "staticinfo": [
        {
          "kid": "salesubtype",
          "kval": "A0023",
          "kdesc": "保存成功1",
          "parentval": "A",
          "recflag": "E",
          "isselected": "",
          "bysort": 0,
          "cruser": "DXJJ"
        },
        {
          "kid": "salesubtype",
          "kval": "B0001",
          "kdesc": "保存成功2",
          "parentval": "B",
          "recflag": "E",
          "isselected": "N",
          "bysort": 0,
          "cruser": "00002077"
        },

      ]
    }
  }
  return ret

}
)

Mock.mock(baseURL + 'user/updateUserByAdmin/enableUser', {
  "status": 0,
  "statusText": "Success",
  "data": {
  }
})

Mock.mock(baseURL + 'user/updateUserByAdmin/disableUser', {
  "status": 0,
  "statusText": "Success",
  "data": {
  }
})
//---------------------报价机构-------------------
Mock.mock(baseURL + 'company/getCompanyBusinessnature', {
  "status": '0',
  "data|1-10":
    [{
      "id|+1": 100,
      "name": "新年快乐2052",
      "channelbindcodename": "车商渠道2052",
      "comcode": '51302200',
      "comcname": '达州市宣汉支公司',
      "handler1code_uni": '85101478',
      "handler1name": '李国',
      "handlercode_uni": '85101478',
      "handlername": "李国",
      "operatecode_uni": '85101478',
      "operatename": "李国",
      "businessnaturename|1": ['兼代理业务'],
      "agentname|1": ['达州市宣汉支公司'],
      "makecom|1": ['12345678'],
      "riskcode": '123456',
      "validstatus|1": [0, 1],
      "flag|1": [0, 1],
      "cruser": "50000001"
    }]

})
//保存报价配置
Mock.mock(baseURL + 'company/updateCompanyBusinessnature', {
  "status": '0',
  "data":
    [{
      "id|+1": 100,
      "name": "保存成功",
      "channelbindcodename": "车商渠道2052",
      "comcode": '51302200',
      "comcname": '达州市宣汉支公司',
      "handler1code_uni": '85101478',
      "handler1name": '李国',
      "handlercode_uni": '85101478',
      "handlername": "李国",
      "operatecode_uni": '85101478',
      "operatename": "李国",
      "businessnaturename|1": ['兼代理业务'],
      "agentname|1": ['达州市宣汉支公司'],
      "makecom|1": ['12345678'],
      "riskcode": '123456',
      "validstatus": '0',
      "flag": '0',
      "cruser": "50000001",
      "modifydata": '0'
    }]

})

//机构中落地部门获取总公司分公司属性控件数据
Mock.mock(baseURL + 'branch/getcompanyList', {
  "status": '0',
  "data": {
    "list": [
      {
        title: '总公司',
        id: '11',
        code: /\d{8}/,
        children: [{
          title: '北京市分公司',
          id: '111',
          code: /\d{8}/,
          children: [{
            title: '东城支公司',
            id: 1111,
            code: /\d{8}/
          }, {
            title: '西城支公司',
            id: 1112,
            code: /\d{8}/,
          }, {
            title: '崇文支公司',
            id: 1113,
            code: /\d{8}/,
          }, {
            title: '宣武支公司',
            id: 1114,
            code: /\d{8}/,
          }, {
            title: '朝阳支公司',
            id: 1115,
            code: /\d{8}/,
          }, {
            title: '顺义支公司',
            id: 1116,
            code: /\d{8}/,
          }]
        }, {
          title: '天津市分公司',
          id: '112',
          code: /\d{8}/,
          children: [{
            title: '滨海中心公司',
            id: 1121,
            code: /\d{8}/,
          }, {
            title: '河西中心公司',
            id: 1122,
            code: /\d{8}/,
          }, {
            title: '南开中心公司',
            id: 1123,
            code: /\d{8}/,
          }, {
            title: '开发区中心公司',
            id: 1124,
            code: /\d{8}/,
          }, {
            title: '塘沽区中心公司',
            id: 1125,
            code: /\d{8}/,
          },]
        }, {
          title: '河北省分公司',
          id: '113',
          code: /\d{8}/,
          children: [{
            title: '石家庄市分公司',
            id: 1131,
            code: /\d{8}/,
          }, {
            title: '唐山市分公司',
            id: 1132,
            code: /\d{8}/,
          }, {
            title: '邯郸市分公司',
            id: 1133,
            code: /\d{8}/,
          }, {
            title: '邢台市分公司',
            id: 1134,
            code: /\d{8}/,
          }, {
            title: '保定市分公司',
            id: 1135,
            code: /\d{8}/,
          },]
        }, {
          title: '山西省分公司',
          id: '114',
          code: /\d{8}/,
          children: [{
            title: '太原市分公司',
            id: 1141,
            code: /\d{8}/,
          }, {
            title: '大同市分公司',
            id: 1142,
            code: /\d{8}/,
          }, {
            title: '阳泉市分公司',
            id: 1143,
            code: /\d{8}/,
          }, {
            title: '长治市分公司',
            id: 1144,
            code: /\d{8}/,
          },]
        }, {
          title: '内蒙古分公司',
          id: '115',
          code: /\d{8}/,
          children: [{
            title: '呼和浩特市分公司',
            id: 1151,
            code: /\d{8}/,
          }, {
            title: '包头市分公司',
            id: 1153,
            code: /\d{8}/,
          }, {
            title: '乌海市分公司',
            id: 1154,
            code: /\d{8}/,
          }, {
            title: '赤峰市分公司',
            id: 1155,
            code: /\d{8}/,
          }, {
            title: '满洲里分公司',
            id: 1156,
            code: /\d{8}/,
          }]
        }, {
          title: '辽宁分公司',
          id: '116',
          code: /\d{8}/,
          children: [{
            title: '沈阳市分公司',
            id: '1161',
            code: /\d{8}/,
          }, {
            title: '鞍山市分公司',
            id: '1162',
            code: /\d{8}/,
          }, {
            title: '抚顺分公司',
            id: '1163',
            code: /\d{8}/,
          }, {
            title: '本溪市分公司',
            id: '1164',
            code: /\d{8}/,
          }, {
            title: '丹东市分公司',
            id: '1165',
            code: /\d{8}/,
          }]
        }]
      }
    ]
  }
})
Mock.mock(baseURL + 'company/getCompanyTSProp', {
  "status": '0',
  "data": {
    company: {
      comcode: /\d{8}/,
      comcname: 'hhhh',
    },
    "deptext":
    {
      deptcode: '',
      "flag|1": ['N', 'Y'],
      "payfirst|1": ['Y', 'N'],
      phone: /^1[3456789]\d{9}$/,
      msgphone: /^1[3456789]\d{9}$/,
      checkflag: /^1[3456789]\d{9}$/,
      orderremindmsg: '',
      sendflag: '',
      visitordermsg: '',
      insurcontrolflag: '',
      "checknumber|1-10": 2,
      "checkdays|1-10": '3',
      checktalklength: '',
      check95518: '',
      chg95518: '',
      amendinsurphone: '',
      accountname: '',
      accountbank: '',
      crosssaleflag: '',
      stepflag: '',
      Addr: '',
      offeredtime_flag: '',
      offeredtime_val: '',
      servicephn: /^1[3456789]\d{9}$/,
      timingdeliver: '',
      cbranchcode: '',
      msg_preposition: '',
      msg_Advance: '',
      msg_guide: '',
      ikimpstartdt: '',
      ikimpenddt: '',
      fcalltime: '',
      quotetime: '',
      followedt: '',
      pirntcopies: '',
      showInvoiceType: '',
      teamnumberscreen: '',
      branchBack: '',
      einsur: '',
      wbphoneconfig: '',
      outcall: '',
      automerge: 'Y',
      enddatatime: 90,
      policytime: 30,
      policyPrint: '',
      jf_url: '',
      commercialType: '',
      compulsoryPrintType: '',
      compulsoryType: '',
      accidentType: '',
      insurancecardType: '',
      extendType: '',
      luggageType: '',
      easyDriveType: '',
      dataqualitysplit: '',
      splitrange: '',
      dul_buildqueue: '',
      blacklisttype: ''
    },
    "deptextdulinfo": [{
      uploaddatatype: 1,
      imp_emnrep: null,
      imp_insurrep: null,
      imp_syearrep: null,
      imp_masklistimport: null,
      imp_phoneis: null
    }],
    "deptextblackinfo": [{
      uploaddatatype: '1'
    }
    ]
  }
})
Mock.mock(baseURL + 'company/updateCompanyTSProp', {
  "status": '0',
  "data": {
    "company":
    {
      comcode: /\d{8}/,
      comcname: '保存测试'
    },
    deptext: {
      "flag|1": ['']
    }
  }
})

//编辑落地部门请求的接口
Mock.mock(baseURL + 'branch/getbranchList', function (options) {
  console.log(options.body);
  return {
    "status": '0',
    "data": {
      list: [
        {
          'roleName': 1000458,
        },
        {
          'roleName': 2145647,
        },
        {
          'roleName': 4456421,
        },
      ]
    },
  }
})
//----------------------批量信息---------------
//人员批量转组
Mock.mock(baseURL + 'user/transferUserGroup', function (options) {
  console.log(JSON.parse(options.body))
  return {
    "status": '0',
    data: {
      user: [{
        deptname: '北京呼出一组',
        userid: '00001089',
        datacnt_1: "1",
        datacnt_2: "2",
        datacnt_3: "3",
        result: '失败',
        logs: '未找到工号'
      }, {
        deptname: '上海呼出二组',
        userid: '12345678',
        datacnt_1: "11",
        datacnt_2: "22",
        datacnt_3: "33",
        result: '失败',
        logs: '未找到工号'
      }]
    }

  }
})

//人员批量导入
Mock.mock(baseURL + 'user/batchCreateUser', function (options) {
  console.log(JSON.parse(options.body))
  return {
    "status": '0',
    data: {
      user: [{
        deptname: '北京呼出一组',
        username: '老王',
        idno: '',
        agentid: 414558,
        posttype: '质检组',
        pbinduserid: 123456,
        userid: '111',
        result: 'ok',
        logs: ''
      }, {
        deptname: '上海呼出二组',
        username: '张三',
        idno: '',
        agentid: 414558,
        posttype: '销售组',
        pbinduserid: 123456,
        userid: '222',
        result: 'sss',
        logs: '123'
      }]
    }
  }
})
//批量失效工号
Mock.mock(baseURL + 'user/updateUserByAdmin/batchDisableUser', function (options) {
  console.log(JSON.parse(options.body))
  return {
    "status": '0',
    "data": {
      implogs: [{
        userid: '123456',
        deptname: '质检组',
        agentid: 'Y',
        result: 'ok',
        logs: '111'
      }, {
        userid: '2222',
        deptname: 'dddd',
        agentid: 'N',
        result: 'fff',
        logs: '222'
      }]
    }

  }
})
//----------------------------------------------微店模块相关数据------------------------------------------------
//查询微店信息的模拟数据
Mock.mock(baseURL + 'misc/queryMicroShop', {
  "status": 0,
  "statusText": "Success",
  "data": [
    {
      "id": "00000423",
      "userid": "62210000",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210000"
    },
    {
      "id": "00000423",
      "userid": "62210001",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210001"
    },
    {
      "id": "00000423",
      "userid": "62210002",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210002"
    },
    {
      "id": "00000423",
      "userid": "62210003",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210003"
    },
    {
      "id": "00000423",
      "userid": "62210004",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210004"
    },
    {
      "id": "00000423",
      "userid": "62210005",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210005"
    },
    {
      "id": "00000423",
      "userid": "62210006",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210006"
    },
    {
      "id": "00000423",
      "userid": "62210007",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210007"
    },
    {
      "id": "00000423",
      "userid": "62210008",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210008"
    },
    {
      "id": "00000423",
      "userid": "62210009",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210009"
    },
    {
      "id": "00000423",
      "userid": "62210010",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210010"
    },
    {
      "id": "00000423",
      "userid": "62210011",
      "longlink": "111111",
      "shortlink": "http://caixian.mypicc.com.cn/t/vemi6f",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210011"
    }
  ]

})

Mock.mock(baseURL + 'misc/deleteMicroShop', {
  "status": 0,
  "statusText": "Success",
})

Mock.mock(baseURL + 'misc/updateMicroShop', {
  "status": 0,
  "statusText": "Success",
  "data": [
    {
      "id": "00000423",
      "userid": "62210000",
      "longlink": "111111",
      "shortlink": "http://编辑保存成功",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210000"
    }]
})

Mock.mock(baseURL + 'misc/createMicroShop', {
  "status": 0,
  "statusText": "Success",
  "data": [
    {
      "id": "00000423",
      "userid": "62210000",
      "longlink": "111111",
      "shortlink": "http://新建保存成功",
      "crusr": "DXJJ",
      "insert_time_for_hist": "2020-01-10",
      "flag": "E",
      "mdusr": "",
      "mddt": "",
      "username": "62210000"
    }]
})

//批量导入微店信息的返回数据
Mock.mock(baseURL + 'misc/batchCreateMicroShop', {
  "status": 0,
  "statusText": "Success",
  "data":
    [
      {
        "userid|+1": "02021158",
        "longlink": "0000",
        "shortlink": "http://caixia",
        "logs": "成功",
        "result": "成功"
      }
    ]
})
//--------------------报价配置------------------
Mock.mock(baseURL + 'company/queryBNUser', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "data|5-10":
      [
        {
          "usercode|+1": "02021158",
          "username": "@cname()",
          "groupusercode": /\d{8}/,
          "comcode|1": ['郑州分公司车商业务一部经理室', '郑州分公司车商业务一部其他部门', '郑州分公司车商业务一部业务部', '郑州分公司车商业务一部综合部'],
        }
      ]
  }

})
Mock.mock(baseURL + 'company/queryBNComcode', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "data|5-10":
      [
        {
          "comcode|+1": "02021158",
          "comcname|1": ['传统渠道', '个代渠道', '车商渠道', '银保渠道', '交叉销售渠道', '经代渠道'],
          "comename": /\d{8}/,
          "comshortname|1": ['郑州分公司车商业务一部经理室', '郑州分公司车商业务一部其他部门', '郑州分公司车商业务一部业务部', '郑州分公司车商业务一部综合部'],
        }
      ]
  }
})

Mock.mock(baseURL + 'dept/batchAddDeptComcode', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "implogs": [
      {
        "deptcode": null,
        "userid": null,
        "deptname": null,
        "agentid": null,
        "comcode": "51310150",
        "result": "成功",
        "logs": "成功"
      },
      {
        "deptcode": null,
        "userid": null,
        "deptname": null,
        "agentid": null,
        "comcode": "51310100",
        "result": "成功",
        "logs": "成功"
      }]
  }
})


//-------------多渠道报价配置---------------------

//多渠道报价配置个人已绑定渠道代码加载
Mock.mock(baseURL + 'selectAgent', {
  "status": 0,
  "statusText": "Success",
  data: {
    "agentinfo|10-20": [{
      agentcode: /[A-z]{4}\d{7}/,
      "agentname|1": ['传统直销渠道', '车商渠道', '经代渠道', '个代渠道'],
      agenttype: [1, 2, 3, 5, 8]
    }]
  }
})
//多渠道报价配置查询
Mock.mock(baseURL + 'getPriceInfo', {
  "status": 0,
  "statusText": "Success",
  data: {
    DataRecord: [
      {
        agentcode: "22003J200009",
        agentname: "中国人民人寿保险股份有限公司吉林省分公司",
        businessflag: "",
        businessnature: "3",
        businessnaturename: "兼业代理业务",
        certificatenobi: "",
        certificatenoci: "",
        citycomcname: "中国人民财产保险股份有限公司长春市分公司",
        comcname: "中国人民财产保险股份有限公司长春市宽城支公司",
        comcode: "22010300",
        comid: "22010000",
        countycomcname: "中国人民财产保险股份有限公司长春市宽城支公司",
        credentialno: "",
        flag: "0",
        handler1agentcode: "",
        handler1agentname: "",
        handler1businessnature: "",
        handler1code: "22451334",
        handler1code_uni: "1222010024",
        handler1licenceno: "",
        handler1name: "高冬梅",
        handler1sellername: "",
        handler1sellertype: "",
        handleragentcode: "",
        handleragentname: "",
        handlerbusinessnature: "",
        handlercode: "07004893",
        handlercode_uni: "1222011075",
        handlerlicenceno: "",
        handlername: "崔舒展",
        handlersellername: "",
        handlersellertype: "",
        id: "THFM202022000000000503",
        inserttimeforhis: "datetime",
        makecname: "中国人民财产保险股份有限公司长春市宽城支公司",
        makecom: "22010300",
        name: "新年快乐2",
        netaccount: "",
        channelbindcodename: "3H1",
        operatecode: "07002642",
        operatecode_uni: "1222019357",
        operatename: "王飞",
        operatetimeforhis: "datetime",
        phonenumber: "",
        provincecomcname: "中国人民财产保险股份有限公司吉林省分公司",
        provincecomcode: "22000000",
        riskcode: "DAA",
        samcode: "",
        serialno: "decimal",
        updatercode: "22000000",
        updatercode_uni: "",
        usercode: "15197574",
        usercode_uni: "",
        validstatus: "1",
        validstatus_dx: "A"
      },
      {
        channelbindcode: "0",
        channelbindcodename: "传统直销渠道",
        commissionflag: "2",
        newbusinessnature: "0",
        usercode: "15197574",
        _$table: "saleschannel"
      },
      {
        channelbindcode: "3H1",
        channelbindcodename: "车商渠道",
        commissionflag: "2",
        newbusinessnature: "3H1",
        usercode: "15197574",
        _$table: "saleschannel"
      }
    ]
  }
})
//多渠道报价配置报价配置新增/修改/删除
Mock.mock(baseURL + 'sendPriceData', {
  "status": 0,
  "statusText": "Success",
  "data": [{
    agentcode: "22003J200009",
    agentname: "中国人民人寿保险股份有限公司吉林省分公司",
    businessflag: "",
    businessnature: "3",
    businessnaturename: "兼业代理业务",
    certificatenobi: "",
    certificatenoci: "",
    citycomcname: "中国人民财产保险股份有限公司长春市分公司",
    comcname: "中国人民财产保险股份有限公司长春市宽城支公司",
    comcode: "22010300",
    comid: "22010000",
    countycomcname: "中国人民财产保险股份有限公司长春市宽城支公司",
    credentialno: "",
    flag: "0",
    handler1agentcode: "",
    handler1agentname: "",
    handler1businessnature: "",
    handler1code: "22451334",
    handler1code_uni: "1222010024",
    handler1licenceno: "",
    handler1name: "高冬梅",
    handler1sellername: "",
    handler1sellertype: "",
    handleragentcode: "",
    handleragentname: "",
    handlerbusinessnature: "",
    handlercode: "07004893",
    handlercode_uni: "1222011075",
    handlerlicenceno: "",
    handlername: "崔舒展",
    handlersellername: "",
    handlersellertype: "",
    id: "THFM202022000000000503",
    inserttimeforhis: "datetime",
    makecname: "中国人民财产保险股份有限公司长春市宽城支公司",
    makecom: "22010300",
    name: "新年快乐2",
    netaccount: "",
    channelbindcodename: "3H1",
    operatecode: "07002642",
    operatecode_uni: "1222019357",
    operatename: "王飞",
    operatetimeforhis: "datetime",
    phonenumber: "",
    provincecomcname: "中国人民财产保险股份有限公司吉林省分公司",
    provincecomcode: "22000000",
    riskcode: "DAA",
    samcode: "",
    serialno: "decimal",
    updatercode: "22000000",
    updatercode_uni: "",
    usercode: "15197574",
    usercode_uni: "",
    validstatus: "1",
    validstatus_dx: "A"
  }]
})

//多渠道绑定可配置绑定渠道加载
Mock.mock(baseURL + 'getSalesChannel', {
  "status": 0,
  "statusText": "Success",
  "data": {
    ts_saleschannel: [
      {
        code: 0,
        name: '传统直销业务',
        channelbindcode: '0',
        channelbindcodename: '传统直销渠道'
      },
      {
        code: 1,
        name: '个人代理业务',
        channelbindcode: '1',
        channelbindcodename: '个代渠道'
      },
      {
        code: 3,
        name: '兼业代理业务',
        channelbindcode: '3H1',
        channelbindcodename: '车商渠道'
      },
      {
        code: 3,
        name: '兼业代理业务',
        channelbindcode: '3J1',
        channelbindcodename: '银保渠道'
      },
      {
        code: 3,
        name: '兼业代理业务',
        channelbindcode: '3J2',
        channelbindcodename: '交叉销售渠道'
      },
      {
        code: 3,
        name: '兼业代理业务',
        channelbindcode: '4',
        channelbindcodename: '经代渠道'
      },
      {
        code: 4,
        name: '经纪业务',
        channelbindcode: '4',
        channelbindcodename: '经代渠道'
      },
      {
        code: 2,
        name: '专业代理业务',
        channelbindcode: '4',
        channelbindcodename: '经代渠道'
      },
    ]
  }
})

//多渠道渠道绑定查询
Mock.mock(baseURL + 'getBusinessNatureList', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "binduser": [{
      "id": "000001926",
      "userid": "05000001",
      "usercode": "15197574",
      "comcode": "22000000",
      "comid": "22000000",
      "token": "42DF8702F73B0F5F1F3DA4AFC7799F5E",
      "state": "0",
      "binddt": "2020-01-02 19:54:26",
      "source": "yxgl",
      "chkflag": "2",
      "lastbindtype": "1",
      "mduser": "",
      "mddt": "",
      "remark": "",
      "tsuserid": "05000001",
      "username": "苏莹莹",
      "deptcode": "DEPT00001073",
      "deptname": "主管组123",
      "uuid": "62499614-4f1a-422c-8978-1835395a6551",
      "usercode1": "15197574",
      "newbusinessnature": "3H1",
      "updatercode": "",
      "inserttimeforhis": "2020/1/7 17:32:48",
      "operatetimeforhis": "2020/1/7 17:32:48",
      "usercode_uni": "",
      "updatercode_uni": "",
      "commissionflag": "2",
      "dataflag": "01"
    }]
  }

})

//---------------------------------------------------------------------禁拨名单列表------------------------------------------------------------------//
const csrdataBaseURL = 'http://11.207.3.173:3000/mock/36/csrdata/';
Mock.mock(csrdataBaseURL + 'sysmgr/blacklist/getBlackList', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "blacklist|10": [{
      "phone": "123123123",
      "contacthistcode": "",
      "customercode": "",
      "idno": "",
      "recordfile": "",
      "areacode": "",
      "plateno": "",
      "btype": "D",
      "validdt": "",
      "audittype": "N",
      "crdt ": "",
      "cruser": "",
      "auditdt": "",
      "audituser": "",
      "validmonth": "",
      "recflag|1": ['E', 'X'],
      "reason": "",
      "auditreason": "",
      "startdt": "",
      "branchcode": "",
      "ptype": "1",
      "mddt": "",
      "mduser": "",
      "type": "",
      "remark": "ER WER WERWE"
    }],
    total: 100,
    pagenum: 1,
    pagesize: 5
  }
})

Mock.mock(csrdataBaseURL + '/sysmgr/blacklist/updateBlackList', {
  "status": 0,
  "statusText": "Success",
  "data": null
})

Mock.mock(csrdataBaseURL + '/sysmgr/blacklist/deleteBlackList', {
  "status": 0,
  "statusText": "Success",
  "data": null
})

Mock.mock(csrdataBaseURL + '/sysmgr/blacklist/saveBlackList', {
  "status": 0,
  "statusText": "Success",
  "data": null
})

Mock.mock(csrdataBaseURL + '/sysmgr/blacklist/batchImportBlackList', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "implogs": [{
      "phone": "132145",
      "startdt": "2020-02-22",
      "validdt": "2020-02-29",
      "branchcode": "北京",
      "type": "1",
      "remark": "是撒",
      "result": "成功",
      "logs": "成功。"
    },
    {
      "phone": "738927",
      "startdt": "2020-02-22",
      "validdt": "2020-02-20",
      "branchcode": "hijack",
      "type": "0",
      "remark": "的v",
      "result": "成功",
      "logs": "成功。"
    }]
  }
})

Mock.mock(csrdataBaseURL + '/sysmgr/blacklist/getBlackListHist', {
  "status": 0,
  "statusText": "Success",
  "data": {
    "blacklisthist|10": [{
      "phone": /^1[3456789]\d{9}$/,
      "contacthistcode": "",
      "customercode": "",
      "idno": "",
      "recordfile": "",
      "areacode": "",
      "plateno": "",
      "btype": "",
      "validdt": "2853-08-26 23:59:59",
      "audittype|1": ['N', 'Y', 'A'],
      "crdt ": "2020-04-26 14:40:52",
      "cruser": "DXJJ",
      "auditdt": "",
      "audituser": "",
      "validmonth": "10000",
      "recflag|1": ['B', 'S', 'H', 'Z', 'D'],
      "reason": "",
      "optdt": "2020-04-26 16:47:48",
      "auditreason": "",
      "startdt": "2020-04-26 00:00:00",
      "branchcode": "10000000",
      "ptype": "1",
      "mddt": "",
      "mduser": "DXJJ",
      "type|1": ['1', '0'],
      "remark": "",
      "mddeptcode": /DEPT\d{9}/
    }],
    total: 500,
    pagenum: 1,
    pagesize: 10

  }
})