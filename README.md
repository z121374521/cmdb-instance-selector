# cmdb-instance-selector

cmdb 实例选择器

该组件有两个方法：confirm、 cancel。  
2 个必传值：data、api。  
3 个可选值：readonly、modal、multipleLimit。

```js
    <cmdb-instance-selector
      @confirm="confirm"
      @cancel='cancel'
      v-if="dialogVisible"
      :data="data"
      :api="api"
      :readonly="false"
      :multipleLimit="1"
      :modal="false"
    >
    </cmdb-instance-selector>
```

confirm：res 就是点击`确定`返回的数据,有`嵌入式`和`弹出式`两种情况。

```js
function confirm(res) {}
```

cancel：在该方法中控制组件的显示隐藏

```js
function cancel() {
  this.dialogVisible = false
},
```

api：传入组件的 api 接口函数共有四个，名称必须和下面的一致。

```js
{
  getInstanceListByCriteria: null,
  getMapUrlListByModelName: null,
  getPkModelAttributeName: null,
  getInstanceListByMapUrl: null,
}
```

multipleLimit：地图路径项列表多选时用户最多可以选择的项目数，  
默认为 0，为`0`则不限制  
为 1 时地图路径项最多只能选择一项，以此类推...。

readonly：默认`true`只读模式， `fasle`编辑模式

modal：默认`true`弹出式， `false`普通块级元素嵌入页面。  
弹出式和嵌入式的区别在于`返回值`

```
弹出式：点击确定通过`confirm`接收数据

嵌入式：因为嵌入式不会显示组件的`确定`按钮，所以要动态接收组件的返回数据，也是通过`confirm`来接收，当`cmdb`实例的已选列表或者地图路径项更新时，会动态返回当前所选的数据。
```

data：有两种情况，回显、新增。  
 1.回显时传入的数据格式，该数据后台返回

```js
/**
 * 地图路径实例数据
 */
configItemModelAttributes:[
  {
    /**
     * 地图路径属性显示名称
     */
    "attributeDesc": string
    /**
     * 地图路径属性id
     */
    "attributeName": string,
    /**
     * 地图路径属性对应的值
     */
    "attributeValue": Array,
  }

  ...
]
/**
 * 地图路径查询显示名称
 */
"configItemModelDesc": string,
/**
 * 地图路径查询主体名称
 */
"configItemModelName": string,
/**
 * 地图路径项字符串
 */
"mapUrl": string,
/**
 * 地图路径项查询条件对应的值以及cmd实例属性
 */
"resourceKey": {
        /**
         * 查询主体
         */
        "mainModel": string,
        /**
         * 地图路径项列表
         */
        "mapUrlNameKeys": Array,
        /**
         * cmdb实例属性值
         */
        "returnedAttributes": Array,
        /**
         * 是否以树形形式展示，默认false
         */
        "treeify": Boolean,
        /**
         * 地图路径项已选列表数据 Array
         */
        "where": [
          {
            /**
             * 地图路径项名称
             */
            "key": string,
            /**
             * 判断符、默认值 in
             */
            "operator": string,
            /**
             * 地图路径已选项id
             */
            "value": Array,
          },

          ...
        ],
      },
```

例如：

```json
      {
        "configItemModelAttributes": [
          {
            "attributeDesc": "主机名称",
            "attributeName": "hostname",
            "attributeValue": ["devopszj000003", "devopszj000001", "devopszj000004", "devopszj000002"],
          },
          {
            "attributeDesc": "管理IP地址",
            "attributeName": "mgt_ip",
            "attributeValue": ["172.20.150.02", "172.20.150.193", "172.20.150.90", "172.20.150.01"],
          },

          ...
        ],
        "configItemModelDesc": "主机",
        "configItemModelName": "host",
        "mapUrl": "1.2.3.4.5",
        "resourceKey": {
          "mainModel": "host",
          "mapUrlNameKeys": ['system.sub_system.set.layer.group.app.host'],
          "returnedAttributes": ['host.hostname'],
          "treeify": false,
          "where": [
            {
              "key": "system.id",
              "operator": "in",
              "value": ["0UqH3Zpth1VGHYr4-4jFPi"],
            },

            ...
          ],
        },
      }
```

2.新增时传入的数据格式

```json
  {
        "configItemModelAttributes": [
          {
            "attributeDesc": "xxx",
            "attributeName": "xxx",
          },
          {
            "attributeDesc": "xxx",
            "attributeName": "xxx",
          },
          ...
        ],
        "configItemModelDesc": "xx",
        "configItemModelName": "xx",
  }
```
