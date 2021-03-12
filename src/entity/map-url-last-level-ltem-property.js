export default class MapUrlLastlevelItemProperty {
  constructor(item) {
    /**
     * cmdb实例模糊查询标示id
     */
    this.queryValue = '';
    /**
     * cmdb实例模糊查询条件名称
     */
    this.name = item.attributeDesc;
    /**
     * cmdb实例模糊查询值
     */
    this.identification = item.attributeName;
  }
}
