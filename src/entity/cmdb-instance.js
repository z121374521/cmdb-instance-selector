import ConfigItemModelAttribute from './config-item-model-attribute';
import MapUrlItem from './map-url-item';
import MapUrlLastlevelItemProperty from './map-url-last-level-ltem-property';
import CmdbSelectedValue from './cmdb-selected-value';
export default class CmdbInstance {
  constructor(selectParam) {
    /**
     * 状态、回显时传入的数据
     */
    this.cmdbSelectedValue;
    /**
     * 末级属性列表
     */
    this.lastLevelPropertyList = [];
    /**
     * 模糊查询后的
     */
    this.lastLevelPropertyCopyList = [];
    /**
     * mapurl地图路径列表项
     */
    this.mapUrlItemList = [];
    /**
     * 待选列表
     */
    this.toBeSelectedList = [];
    /**
     * 已选列表
     */
    this.selectedList = [];
    /**
     * 控制不能快速点击下拉框选项
     */
    this.optDisabled = false;
    /**
     * 主机选中索引
     */
    this.instanceValue = [];
    /**
     * 模糊筛选条件列表
     */
    this.screenArr = [];
    /**
     * 模糊筛选选择的列表
     */
    this.selectedAttrubites = [];
    /**
     * 地图路径项第一项可选值
     */
    this.selectableMapUrlList = [];
    /**
     * 地图路径项第一项已选值
     */
    this.selectedMapUrl = {};
    /**
     * 左侧勾选的数组
     */
    this.leftDefaultCheckedArr = [];
    /**
     * 右侧勾选的数组
     */
    this.rightDefaultCheckedArr = [];
    this.cmdbSelectedValue = new CmdbSelectedValue(selectParam);
    this.init();
  }
  /**
   * 初始化已选和待选列表数据
   */
  init() {
    // 待选和已选列表，列表要有第一列标题，0是已选、1是待选 所以两个
    let instanceObj = {};
    this.cmdbSelectedValue.configItemModelAttributes.forEach(i => {
      instanceObj[i.attributeName] = i.attributeDesc;
    });
    this.lastLevelPropertyList.push({ data: instanceObj, key: 0, disabled: true }, { data: instanceObj, key: 1, disabled: true });
    this.lastLevelPropertyCopyList.push({ data: instanceObj, key: 0, disabled: true }, { data: instanceObj, key: 1, disabled: true });
    // 已选0 小标题列表
    this.instanceValue = [0];
    if (this.cmdbSelectedValue.configItemModelAttributes[0].attributeValue.length > 0) {
    }
  }
  /**
   * 清空函数
   */
  emptyDefaultCheckedArr() {
    this.leftDefaultCheckedArr = [];
    this.rightDefaultCheckedArr = [];
  }
  /**
   * 地图路径项列表
   * @param {*} res
   * @param {*} idx
   * @param {*} mapPathOptionArr
   */
  pushMapUrlItemList(res, idx, mapPathOptionArr) {
    let name = res.label.split('.')[idx];
    let identification = res.name.split('.')[idx];
    this.mapUrlItemList.push(new MapUrlItem(name, identification, mapPathOptionArr));
  }
  /**
   * cmdb实例属性
   */
  pushConfigItemModelAttribute() {
    this.emptyDefaultCheckedArr();
    this.selectedList = [];
    // 已选列表操作
    let data;
    for (let i = 0; i < this.cmdbSelectedValue.configItemModelAttributes.length; i++) {
      data = {
        attributeDesc: '',
        attributeName: '',
        attributeValue: [],
      };
      this.instanceValue.forEach(element => {
        data.attributeDesc = this.cmdbSelectedValue.configItemModelAttributes[i].attributeDesc;
        data.attributeName = this.cmdbSelectedValue.configItemModelAttributes[i].attributeName;
        data.attributeValue.push(this.lastLevelPropertyCopyList[element].data[data.attributeName]);
      });

      this.selectedList.push(new ConfigItemModelAttribute(data));
    }
  }
  /**
   * 地图路径项选择了值
   * @param {*} item
   */
  changeMapUrlItem(item) {
    const res = item.selectedValueList;
    const idx = this.mapUrlItemList.indexOf(item);
    this.optDisabled = true;
    // 如果取消掉其中一个地图路径掉值，那么后面掉所有地图路径都将销毁
    if (res.length === 0) {
      this.mapUrlItemList.splice(idx + 1);
      return false;
    }
    // 如果是退到第一个 的时候
    if (res.length === 0 && idx === 0 && this.mapUrlItemList.length === 0) {
      this.instanceValue = [0];
      return false;
    }

    // 当修改的是 已经创建好的地图路径时，要清空MapPathArr、MapPathOptionArr当前选择之后的所有地图路径
    // 然后重新渲染下一个地图路径
    if (idx !== this.mapUrlItemList.length - 1 && idx < this.mapUrlItemList.length) {
      this.mapUrlItemList.splice(idx + 1);
    }
    // 正常创建
    return true;
  }
  /**
   * 模糊筛选列表赋值
   */
  pushMapUrlLastlevelItemProperty() {
    this.screenArr = [];
    this.selectedAttrubites.forEach(val => {
      this.screenArr.push(new MapUrlLastlevelItemProperty(val));
    });
  }
  /**
   * 模糊筛选条件
   * @param {*} instance
   */
  filterMethod(instance) {
    this.emptyDefaultCheckedArr();
    // 如果所有的查询值都为空 将所有主机数据显示
    let instancekey = true;
    for (let z = 0; z < this.screenArr.length; z++) {
      if (this.screenArr[z].queryValue) {
        instancekey = false;
        break;
      }
    }
    if (instancekey && instance !== 'instance') {
      this.lastLevelPropertyList = this.lastLevelPropertyCopyList;
      return;
    }
    let arr = [];
    this.lastLevelPropertyCopyList.forEach((item, idx) => {
      let itemKey = true;
      if (idx === 1 || idx === 0) {
        arr.push(item);
      } else {
        for (let i = 0; i < this.screenArr.length; i++) {
          if (!this.screenArr[i].queryValue) continue;
          let itemName = item.data[this.screenArr[i].identification];
          if (itemName.indexOf(this.screenArr[i].queryValue) === -1) {
            itemKey = false;
            break;
          }
        }
        if (itemKey) {
          arr.push(item);
        }
      }
    });
    this.lastLevelPropertyList = arr;
  }
  /**
   * 点击确定
   * @param {*} returnData
   */
  determine(returnData) {
    let { selectedList, selectedMapUrl, selectableMapUrlList, mapUrlItemList } = this;
    let params, mapUrl;
    let configItemModelAttributes = [];
    let returnedAttributes = [];
    let mapUrlNameKeys = [];
    let where = [];
    selectedList.forEach((val, idx) => {
      configItemModelAttributes.push({
        attributeDesc: val.attributeDesc,
        attributeName: val.attributeName,
        attributeValue: val.attributeValue,
      });
      let delIdx = configItemModelAttributes[idx].attributeValue.indexOf(configItemModelAttributes[idx].attributeDesc);
      if (delIdx !== -1) {
        configItemModelAttributes[idx].attributeValue.splice(delIdx, 1);
      }
      returnedAttributes.push(`${this.cmdbSelectedValue.configItemModelName}.${val.attributeName}`);
    });

    mapUrlNameKeys = [selectedMapUrl.name];
    mapUrlItemList.forEach(i => {
      let value = [];
      i.selectedValueList.forEach(j => {
        value.push(j.value);
      });
      where.push({
        key: `${i.identification}.id`,
        operator: 'in',
        value,
      });
    });
    mapUrl = selectedMapUrl.name;
    if (where[where.length - 1].value.length === 0) {
      where.pop();
    }
    params = {
      configItemModelAttributes,
      configItemModelDesc: this.cmdbSelectedValue.configItemModelDesc,
      configItemModelName: this.cmdbSelectedValue.configItemModelName,
      paramsName: this.cmdbSelectedValue.paramsName,
      mapUrl,
      resourceKey: {
        mainModel: this.cmdbSelectedValue.configItemModelName,
        mapUrlNameKeys,
        returnedAttributes,
        treeify: false,
        where: where,
      },
    };
    returnData(params);
  }
  initialize() {
    this.lastLevelPropertyList.splice(2);
    this.lastLevelPropertyCopyList.splice(2);
  }
  clearMapUrlItemList() {
    this.mapUrlItemList = [];
  }
}
