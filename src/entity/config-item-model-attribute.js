/**
 * cmdb实例显示名称、属性名称、已选值
 */
export default class ConfigItemModelAttribute {
  constructor(item) {
    /**
     * cmdb实例显示名称
     */
    this.attributeName = item.attributeName || '';
    /**
     * cmdb实例属性名称
     */
    this.attributeDesc = item.attributeDesc || '';
    /**
     * cmdb实例已选值
     */
    this.attributeValue = item.attributeValue ? [...item.attributeValue] : [];
  }
}
