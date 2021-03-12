<template>
  <div id="app">
    <cmdb-instance-selector :modal="false" @returnData="returnData" :api="api" :data="data" />
  </div>
</template>

<script>
let strCriteria = ''
let num = 0
var sort = 0
function getInstanceListByCriteria(data) {
  return new Promise((resolve, reject) => {
    let res = [
      {
        createUser: '',
        createUserId: '',
        cstCreate: '2020-08-21T15:29:45',
        cstDeleted: null,
        cstModified: '2020-08-21T15:29:45',
        deleteUser: null,
        deleteUserId: null,
        modelId: '3Bu4De1TJ9sWgiyjm0uQNC',
        name: `测试${++num}`,
        id: `测试id${num}`,
        status: 'New_Dirty',
        updateUser: '',
        updateUserId: '',
        version: 0,
      },
      {
        createUser: '',
        createUserId: '',
        cstCreate: '2020-08-21T13:36:29',
        cstDeleted: null,
        cstModified: '2020-08-21T13:36:29',
        deleteUser: null,
        deleteUserId: null,
        modelId: '3Bu4De1TJ9sWgiyjm0uQNC',
        name: `测试${++num}`,
        id: `测试id${num}`,
        status: 'New_Dirty',
        updateUser: '',
        updateUserId: '',
        version: 0,
      },
      {
        createUser: '',
        createUserId: '',
        cstCreate: '2020-11-23T15:15:07',
        cstDeleted: null,
        cstModified: '2020-11-23T15:45:33',
        deleteUser: null,
        deleteUserId: null,
        modelId: '3Bu4De1TJ9sWgiyjm0uQNC',
        name: `测试${++num}`,
        id: `测试id${num}`,
        status: 'New_Dirty',
        updateUser: 'lihui',
        updateUserId: '3YBp7fqmpcSqdsM-f5V1Yz',
        version: 1,
      },
      {
        createUser: '',
        createUserId: '',
        cstCreate: '2020-09-28T14:07:24',
        cstDeleted: null,
        cstModified: '2020-09-28T14:07:24',
        deleteUser: null,
        deleteUserId: null,
        modelId: '3Bu4De1TJ9sWgiyjm0uQNC',
        name: `测试${++num}`,
        id: `测试id${num}`,
        status: 'New_Dirty',
        updateUser: '',
        updateUserId: '',
        version: 0,
      },
    ];
    resolve(res);
    reject(2);
  });
}
function getMapUrlListByModelName() {
  return new Promise((resolve, reject) => {
    let res = [
      {
        createUser: null,
        cstCreate: null,
        id: '0-4NJvlWF1CXBxWxmUOsYB',
        name: '测试',
        urlDescName: 'nfs模型.主机',
        urlKey: '1AulGRocl6xpX2NFmEtOBE.0_FndsLjF99p5tw0nQnSko',
        urlName: 'nfs.host',
      },
      {
        createUser: null,
        cstCreate: null,
        id: '1BtzdqOJB3lV-te6jvt0BE',
        name: '业务系统主机',
        urlDescName: '业务系统.子系统.套.层.组.应用.主机',
        urlKey:
          '3Bu4De1TJ9sWgiyjm0uQNC.3qfJOzJOxf4pU8N22NtdYX.1QEFfldTtbPHklaW0F17eg.3W5LrKh8Bbu99mlsAEK4Pc.2rtHikXPl8M910Ljyz_Uf0.14rc0q0-hdpbK_cWEAEmrZ.0_FndsLjF99p5tw0nQnSko',
        urlName: '1.2.3.4.5',
      },
    ];
    resolve(res);
    reject(2);
  });
}
function getPkModelAttributeName() {
  return new Promise((resolve, reject) => {
    let res = [['nfsname'], ['hostname']];
    resolve(res);
    reject(2);
  });
}
function getInstanceListByMapUrl(data) {
  let res = [ 
    {
      id: '24D86xKWx7_pNdP5Vi_HDY',
      instances: {
        app: null,
        group: null,
        host: { hostname: `dev${++num}`, data_ip: `404_${++num}`, mgt_ip:`500_${++num}` },
        layer: null,
        set: null,
        sub_system: null,
        system: null,
      },
      mainModelId: '0_FndsLjF99p5tw0nQnSko',
      mapUrl: null,
    },
    {
      id: '3Z_OcGaR5bO9tEKoEq4or9',
      instances: {
        app: null,
        group: null,
        host: { hostname: `dev${++num}`, data_ip: `404_${++num}`, mgt_ip:`500_${++num}` },
        layer: null,
        set: null,
        sub_system: null,
        system: null,
      },
      mainModelId: '0_FndsLjF99p5tw0nQnSko',
      mapUrl: null,
    },
    {
      id: '2-bgKM5iV1OpWEpt2qrYfY',
      instances: {
        app: null,
        group: null,
        host: { hostname: `dev${++num}`, data_ip: `404_${++num}`, mgt_ip:`500_${++num}` },
        layer: null,
        set: null,
        sub_system: null,
        system: null,
      },
      mainModelId: '0_FndsLjF99p5tw0nQnSko',
      mapUrl: null,
    },
    {
      id: '3tIA2BkhF2HHju4K_lnjgG',
      instances: {
        app: null,
        group: null,
        host: { hostname: `dev${++num}`, data_ip: `404_${++num}`, mgt_ip:`500_${++num}` },
        layer: null,
        set: null,
        sub_system: null,
        system: null,
      },
      mainModelId: '0_FndsLjF99p5tw0nQnSko',
      mapUrl: null,
    },
    {
      id: '2QgkM5qtZdwq6mRydPKbYn',
      instances: {
        app: null,
        group: null,
        host: { hostname: `dev${++num}`, data_ip: `404_${++num}`, mgt_ip:`500_${++num}` },
        layer: null,
        set: null,
        sub_system: null,
        system: null,
      },
      mainModelId: '0_FndsLjF99p5tw0nQnSko',
      mapUrl: null,
    },
  ];
  return new Promise((resolve, reject) => {
    if(data.where[0].value.length > sort){
      for(let i =0; i < sort+ 2; i++){
        res.push( {
          id: '24D86xKWx7_pNdP5Vi_HDY',
          instances: {
            app: null,
            group: null,
            host: { hostname: `dev${++num}`, data_ip: `404_${++num}`, mgt_ip:`500_${++num}` },
            layer: null,
            set: null,
            sub_system: null,
            system: null,
          },
          mainModelId: '0_FndsLjF99p5tw0nQnSko',
          mapUrl: null,
        },)
      }
    }
    sort = data.where[0].value.length
    resolve(res);
    reject(2);
  });
}
export default {
  name: 'App',
  data() {
    return {
      data: {
        'configItemModelAttributes': [
          {
            'attributeDesc': '主机名称',
            'attributeName': 'hostname',
            // "attributeValue": ['devopszj000003', 'devopszj000001', 'devopszj000004', 'devopszj000002'],
          },
          {
            'attributeDesc': '管理IP地址',
            'attributeName': 'mgt_ip',
            // "attributeValue": ['172.20.150.02', '172.20.150.193', '172.20.150.90', '172.20.150.01'],
          },
          {
            'attributeDesc': '业务IP地址',
            'attributeName': 'data_ip',
            // "attributeValue": ['172.16.50.132', '172.20.150.193', '172.20.150.90', '172.16.50.131'],
          },
        ],
        'configItemModelDesc': '主机',
        'configItemModelName': 'host',
        'mapUrl': '1.2.3.4.5',
        'resourceKey': {
          'mainModel': 'host',
          'mapUrlNameKeys': ['system.sub_system.set.layer.group.app.host'],
          'returnedAttributes': ['host.hostname'],
          'treeify': false,
          'where': [
            {
              'key': 'system.id',
              'operator': 'in',
              'value': ['0UqH3Zpth1VGHYr4-4jFPi'],
            },
          ],
        },
      },
      api: {
        getInstanceListByCriteria,
        getMapUrlListByModelName,
        getPkModelAttributeName,
        getInstanceListByMapUrl,
      },
    };
  },
  methods: {
    returnData(res) {
      console.log(res);
    },
  },
};
</script>
