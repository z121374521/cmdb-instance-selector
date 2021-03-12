import CmdbResourceKeyWhere from './cmdb-resource-key-where';
/**
 * 地图路径项查询条件以及cmd实例属性
 */
export default class CmdbResourceKey {
  constructor(item) {
    /**
     * 查询主体
     */
    this.mainModel = item.mainModel || '';
    /**
     * 地图路径项列表
     */
    this.mapUrlNameKeys = item.mapUrlNameKeys ? [...item.mapUrlNameKeys] : [];
    /**
     * cmdb实例属性值
     */
    this.returnedAttributes = item.returnedAttributes ? [...item.returnedAttributes] : [];
    /**
     * 是否以树形形式展示，默认false
     */
    this.treeify = item.treeify || false;
    /**
     * 地图路径项已选值id
     */
    this.where = [];
    if (item.where) {
      item.where.forEach(item => {
        this.where.push(new CmdbResourceKeyWhere(item));
      });
    }
  }
}
