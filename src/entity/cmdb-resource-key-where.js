/**
 * 地图路径项已选值id
 */
export default class CmdbResourceKeyWhere {
  constructor(item) {
    /**
     * 地图路径项名称
     */
    this.key = item.key || '';
    /**
     * 判断符、默认值 in
     */
    this.operator = item.operator || '';
    /**
     * 地图路径已选项id
     */
    this.value = item.value ? [...item.value] : [];
  }
}
