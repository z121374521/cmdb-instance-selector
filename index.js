import CmdbInstanceSelector from './src/main';

// 单独使用组件时，Vue.use(CmdbInstanceSelector)触发install方法执行。
CmdbInstanceSelector.install = function(Vue) {
  // 全局注册Example组件
  Vue.component(CmdbInstanceSelector.name, CmdbInstanceSelector);
};

export default CmdbInstanceSelector;
