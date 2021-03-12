import CmdbResourceKey from './cmdb-resource-key';
import ConfigItemModelAttribute from './config-item-model-attribute';
export default class CmdbSelectedValue {
  constructor(item) {
    /**
     * cmdb实例显示名称、属性名称、已选值
     */
    this.configItemModelAttributes = [];
    item.configItemModelAttributes.forEach(item => {
      this.configItemModelAttributes.push(new ConfigItemModelAttribute(item));
    });
    /**
     * 参数名称
     */
    this.paramsName = item.paramsName || '';
    /**
     * 地图路径查询显示名称
     */
    this.configItemModelDesc = item.configItemModelDesc || '';
    /**
     * 地图路径查询主体名称
     */
    this.configItemModelName = item.configItemModelName || '';
    /**
     * 地图路径
     */
    this.mapUrl = item.mapUrl || '';
    /**
     * 地图路径项查询条件以及cmd实例属性
     */
    this.resourceKey = item.resourceKey ? new CmdbResourceKey(item.resourceKey) : [];
  }
}
