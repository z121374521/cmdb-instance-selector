/**
 * 地图路径项类
 */
export default class MapUrlItem {
  constructor(name, identification, selectableValueList = [], selectedValueList = [], selectAll = false) {
    /**
     * 标识
     */
    this.name = name;
    /**
     * 名称
     */
    this.identification = identification;
    /**
     * 已选值列表
     */
    this.selectedValueList = selectedValueList;
    /**
     * 可选值列表
     */
    this.selectableValueList = selectableValueList;
    /**
     * 全选
     */
    this.selectAll = selectAll;
  }
  /**
   * 改变全选复选框
   * @param {*} fn  调用地图路径项改变接口
   */
  changeSelectAllCheckbox(fn) {
    if (this.selectAll) {
      this.selectedValueList = this.selectableValueList;
    } else {
      this.selectedValueList = [];
    }
    fn(this);
  }
}
