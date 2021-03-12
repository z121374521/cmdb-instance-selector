<template>
  <div>
    <el-dialog
      :close-on-press-escape="false"
      :title="titleName"
      :visible.sync="dialogVisible"
      width="1000px"
      :modal='modal'
      :modal-append-to-body='false'
      :disabled="readonly"
      :show-close="false"
      :close-on-click-modal="false"
      :class="modal?'':'embedded'"
    >
      <el-row v-if="modal" slot="title">
        <el-col
          class="blue"
          :span="11"
        > {{ titleName }}</el-col>
        <el-col
          :span="13"
          style="text-align: right;"
        >
          <el-button
            @click="cancel"
            type="primary"
            :disabled="cmdbInstance.optDisabled"
          >取消</el-button>
          <el-button
            @click="cmdbInstance.determine(confirm)"
            type="primary"
            :disabled="cmdbInstance.optDisabled"
          >确定</el-button>

        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="modal?12:10"
          style="display: inline-block;"
        >
          <!-- 地图路径项 -->
          <div style="display: inline-block;min-height:360px">
            <el-form
              label-width="100px"
              @submit.native.prevent
            >
              <el-form-item label="地图路径：">
                <el-select
                  style="width:250px"
                  @change="changeMapUrl"
                  v-model="cmdbInstance.selectedMapUrl"
                  placeholder="请选择"
                  :disabled="cmdbInstance.optDisabled|| readonly"
                >
                  <el-option
                    v-for="item in cmdbInstance.selectableMapUrlList"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-for="(item, idx) in cmdbInstance.mapUrlItemList"
                :key="idx"
                :label="item.name + '：'"
              >
                <el-select
                  style="width:250px"
                  v-model="item.selectedValueList"
                  @change="changeMapUrlItem(item)"
                  placeholder="请选择"
                  multiple
                  filterable
                  collapse-tags
                  :multiple-limit="multipleLimit"
                  :disabled="cmdbInstance.optDisabled || readonly"
                >
                  <el-option
                    v-for="i in item.selectableValueList"
                    :key="i.value"
                    :label="i.label"
                    :value="i"
                    :disabled="cmdbInstance.optDisabled || readonly"
                  >
                  </el-option>
                </el-select>
                <el-checkbox
                  v-if="idx !== 0"
                  @change="item.changeSelectAllCheckbox(changeMapUrlItem)"
                  v-model="item.selectAll"
                  style="padding-left:20px"
                  :disabled="readonly"
                >全选</el-checkbox>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <!-- 模糊筛选 -->
        <el-col
          :span="modal?12:10"
          style="display: inline-block;padding-left: 78px;"
        >
          <el-form
            ref="form"
            label-width="100px"
            @submit.native.prevent
          >
            <el-form-item label="搜索条件:">
              <el-select
                :disabled="readonly"
                style="width:100%"
                v-model="cmdbInstance.selectedAttrubites"
                multiple
                placeholder="请选择"
                value-key="attributeName"
                @change="cmdbInstance.pushMapUrlLastlevelItemProperty()"
              >
                <el-option
                  v-for="item in cmdbInstance.cmdbSelectedValue.configItemModelAttributes"
                  :key="item.attributeName"
                  :label="item.attributeDesc"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              v-for="item in cmdbInstance.screenArr"
              :key="item.identification"
              :label="item.name"
            >
              <el-input
                style="width:100%"
                v-model="item.queryValue"
                @input="cmdbInstance.filterMethod()"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 穿梭框 -->
      <el-row>

        <el-transfer
          v-model="cmdbInstance.instanceValue"
          :data="cmdbInstance.lastLevelPropertyList"
          @change="pushConfigItemModelAttribute"
          @left-check-change="leftDefaultChecked"
          @right-check-change="rightDefaultChecked"
          :titles="['待选列表', '已选列表']"
        >
          <div slot-scope="{ option }">
            <div
              class="span-option"
              v-for="(item, idx) in cmdbInstance.cmdbSelectedValue.configItemModelAttributes"
              :key="idx"
              style="width: 120px"
            >
              {{ option.data[item.attributeName] }}
            </div>
          </div>
          <div slot="left-footer">
            {{this.cmdbInstance.leftDefaultCheckedArr.length}}/{{this.cmdbInstance.lastLevelPropertyList.length -2-(this.cmdbInstance.instanceValue.length-1)>0?
              this.cmdbInstance.lastLevelPropertyList.length -2-(this.cmdbInstance.instanceValue.length-1):
              0
            }}
          </div>
          <div slot="right-footer">
            {{this.cmdbInstance.rightDefaultCheckedArr.length}}/{{this.cmdbInstance.instanceValue.length -1}}
          </div>
        </el-transfer>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import CmdbInstance from './entity/cmdb-instance';
import CmdbSelectedValue from './entity/cmdb-selected-value';
export default {
  name: 'CmdbInstanceSelector',
  props: {
    modal:{
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => {
        return {
        };
      },
    },
    multipleLimit:{
      type: Number,
      default: 0,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    api: {
      type: Object,
      default: () => {
        return {
          getInstanceListByCriteria: null,
          getMapUrlListByModelName: null,
          getPkModelAttributeName: null,
          getInstanceListByMapUrl: null,
        };
      },
    },
  },
  data() {
    return {
      dialogVisible: true,
      initialDataLoaded: false,
      titleName: '',
      cmdbInstance: new CmdbInstance(this.data),
    };
  },
  created() {
    this.titleName = `选择${this.cmdbInstance.cmdbSelectedValue.configItemModelDesc}`;
    this.getMapPath();
  },
  mounted() {

  },
  methods: {
    // 组件嵌入式 返回的数据
    pushConfigItemModelAttribute(){
      this.cmdbInstance.pushConfigItemModelAttribute()
      if(!this.modal){
        this.cmdbInstance.determine(this.confirm)
      }
      
    },
    // 左侧已选
    leftDefaultChecked(val) {
      this.cmdbInstance.leftDefaultCheckedArr = val;
    },
    // 右侧已选
    rightDefaultChecked(val) {
      this.cmdbInstance.rightDefaultCheckedArr = val;
    },
    // controlDisplay() {
    //   this.cmdbInstance.dialogVisible = true;
    // },
    // 回显
    noNews() {
      if (this.initialDataLoaded) return;

      this.titleName = `编辑${this.cmdbInstance.cmdbSelectedValue.configItemModelDesc}`;
      let { configItemModelAttributes, resourceKey } = this.cmdbInstance.cmdbSelectedValue;
      let { mapUrlItemList } = this.cmdbInstance;
      // 将业务系统的值匹配过滤出来 selectedValueList为0 的时候每次选择都会在执行noNew一次
      for (let i = 0; i < resourceKey.where.length; i++) {
        if (this.cmdbInstance.mapUrlItemList[i] && this.cmdbInstance.mapUrlItemList[i].selectedValueList.length === 0) {
          this.cmdbInstance.mapUrlItemList.forEach((element, idx) => {
            if (resourceKey.where[i].key.split('.')[0] === element.identification) {
              resourceKey.where[i].value.forEach(val => {
                element.selectableValueList.forEach(val2 => {
                  if (val === val2.value) {
                    this.cmdbInstance.mapUrlItemList[idx].selectedValueList.push(val2);
                  }
                });
              });
            }
          });
          let data = this.getInstanceListApi(mapUrlItemList[i]);
        }
      }
      // 如果滴入路径项只有第一项，那就不能-2
      if (resourceKey.where.length === this.cmdbInstance.mapUrlItemList.length) {
        if (this.cmdbInstance.mapUrlItemList.length === 1) {
          this.getInstancesApi(this.cmdbInstance.mapUrlItemList[this.cmdbInstance.mapUrlItemList.length - 1], 'showSelected');
        } else {
          this.getInstancesApi(this.cmdbInstance.mapUrlItemList[this.cmdbInstance.mapUrlItemList.length - 2], 'showSelected');
        }

        this.initialDataLoaded = true;
      }
    },
    // 确定
    confirm(params) {
      this.$emit('confirm', params);
      this.cancel()
    },
    // 取消
    cancel() {
      this.$emit('cancel');
    },
    // 地图路径选择了值
    changeMapUrlItem(item) {
      let returnRes = this.cmdbInstance.changeMapUrlItem(item);
      // 下一个地图路径选项的取值
      if (returnRes) {
        // 地图路径可选值列表
        this.getInstanceListApi(item);
        // 主机列表取值
        this.getInstancesApi(item);
      } else {
        // 主机列表取值
        this.getInstancesApi(item, 'back');
      }
    },

    // api开始
    // 获取第一层地图路径的值
    getMapPath() {
      this.cmdbInstance.optDisabled = true;
      this.api
        .getMapUrlListByModelName(this.cmdbInstance.cmdbSelectedValue.configItemModelName)
        .then(ConfigurationItemList => {
          if (ConfigurationItemList.length > 0) {
            ConfigurationItemList.forEach(val => {
              let arrLen = val.urlName.split('.').length;
              this.cmdbInstance.selectableMapUrlList.push({
                value: val['urlKey'],
                label: val['urlDescName'],
                name: val['urlName'],
                key: arrLen !== 1,
              });

              if (val.urlName === this.cmdbInstance.cmdbSelectedValue.mapUrl) {
                this.cmdbInstance.selectedMapUrl = {
                  value: val['urlKey'],
                  label: val['urlDescName'],
                  name: val['urlName'],
                  key: arrLen !== 1,
                }
              }
            });
            if (Object.keys(this.cmdbInstance.selectedMapUrl).length <= 0) {
              this.cmdbInstance.selectedMapUrl = this.cmdbInstance.selectableMapUrlList[0];
            }

          }

        });
    },
    // 地图路径选项
    changeMapUrl(mapUrl) {
      let modelNames = mapUrl.name.split('.');
      this.cmdbInstance.clearMapUrlItemList();
      this.api.getPkModelAttributeName(modelNames).then(res => {
        this.cmdbInstance.initialize();
      });
    },
    // 地图路径
    getInstanceListApi(item, back) {
      const res = item.selectedValueList;
      const idx = this.cmdbInstance.mapUrlItemList.indexOf(item);
      let parentInstanceList = [];
      res.forEach(i => {
        parentInstanceList.push(i.value);
      });
      let selectedMapUrlIdx
      for (let i = 0; i < this.cmdbInstance.selectableMapUrlList.length; i++) {
        if (this.cmdbInstance.selectableMapUrlList[i].label === this.cmdbInstance.selectedMapUrl.label) {
          selectedMapUrlIdx = i
          break
        }
      }
      let params = {
        parentModelKey: this.cmdbInstance.selectableMapUrlList[selectedMapUrlIdx].value.split('.')[idx],
        parentInstanceList,
        clientModelKey: this.cmdbInstance.selectableMapUrlList[selectedMapUrlIdx].value.split('.')[idx + 1],
      };
      this.getInstanceList(params, this.cmdbInstance.selectedMapUrl, idx + 1);
    },
    // 地图路径接口
    getInstanceList(params, newVal, idx) {
      if (idx === this.cmdbInstance.selectedMapUrl.value.split('.').length - 1) {
        this.cmdbInstance.optDisabled = false;
        return;
      }
      this.api.getInstanceListByCriteria(params).then(res => {
        let mapPathOptionArr = [];
        res.length > 0 &&
          res.forEach(val => {
            mapPathOptionArr.push({
              label: val.name,
              value: val.id,
            });
          });
        // 页面根据mapUrlItemList来创建地图路径项下拉框
        this.cmdbInstance.pushMapUrlItemList(newVal, idx, mapPathOptionArr);
        // 回显  等pushMapUrlItemList push进去
        if (this.cmdbInstance.cmdbSelectedValue.configItemModelAttributes[0].attributeValue.length !== 0) {
          this.noNews();
        }
        
        this.cmdbInstance.optDisabled = false;
      });
    },
    // 主机数据
    getInstancesApi(item, back) {
      let res;
      let idx;
      // 当前地图路径项为空了那就得用上一个地图路径项得值来筛选主机
      if (back === 'back') {

        idx = this.cmdbInstance.mapUrlItemList.indexOf(item) - 1;
        // 如果是第一个地图路径项为空啦，那就清空主机，销毁后面得地图路径项
        if (idx < 0) {
          this.cmdbInstance.optDisabled = false;
          this.cmdbInstance.lastLevelPropertyList.splice(2);
          this.cmdbInstance.lastLevelPropertyCopyList.splice(2);
          this.cmdbInstance.instanceValue = [0];
          return;
        }
        res = this.cmdbInstance.mapUrlItemList[idx].selectedValueList;
      } else {
        idx = this.cmdbInstance.mapUrlItemList.indexOf(item);
        res = item.selectedValueList;

      }
      // 选择地图路径后 末级列表的取值
      let returnedAttributes = [];
      let instanceWhereVal = [];
      let instanceObj = {};
      res.forEach(val => {
        instanceWhereVal.push(val.value);
      });

      this.cmdbInstance.cmdbSelectedValue.configItemModelAttributes.forEach(i => {
        instanceObj[i.attributeName] = i.attributeDesc;
      });
      for (let key in instanceObj) {
        returnedAttributes.push(`${this.cmdbInstance.cmdbSelectedValue.configItemModelName}.${key}`);
      }
      let params = {
        mainModel: this.cmdbInstance.cmdbSelectedValue.configItemModelName,
        mapUrlNameKeys: [this.cmdbInstance.selectedMapUrl.name],
        where: [
          {
            key: `${this.cmdbInstance.mapUrlItemList[idx].identification}.id`,
            operator: 'in',
            value: instanceWhereVal,
          },
        ],
        treeify: false,
        returnedAttributes,
        orderBy: [
          returnedAttributes[0],
        ],
      };
      this.getInstances(params, back);
    },
    // 主机数据接口
    getInstances(params, back) {
      this.cmdbInstance.initialize();
      this.api.getInstanceListByMapUrl(params).then(res => {
        // 当地图路径没有实例数据的时候
        if (res.length === 0) {
          this.$message.warning(`没有以${this.cmdbInstance.cmdbSelectedValue.configItemModelDesc}为末端的地图路径`);
          this.cmdbInstance.optDisabled = false;
          return;
        }
        // 已选和待选的 选择状态数组清空
        this.cmdbInstance.emptyDefaultCheckedArr()
        res.forEach((val, idx) => {
          this.cmdbInstance.lastLevelPropertyList.push({
            key: idx + 2,
            label:
              val.instances[this.cmdbInstance.cmdbSelectedValue.configItemModelName][this.cmdbInstance.cmdbSelectedValue.configItemModelAttributes[0].attributeName
              ],
            data: val.instances[this.cmdbInstance.cmdbSelectedValue.configItemModelName],
            disabled: this.readonly,

          });
          this.cmdbInstance.lastLevelPropertyCopyList.push({
            key: idx + 2,
            label:
              val.instances[this.cmdbInstance.cmdbSelectedValue.configItemModelName][this.cmdbInstance.cmdbSelectedValue.configItemModelAttributes[0].attributeName
              ],
            data: val.instances[this.cmdbInstance.cmdbSelectedValue.configItemModelName],
            disabled: this.readonly,
          });
        });
        // 回显时候，将已选的索引数组和已选的实例模型填写完整
        if (back === 'showSelected') {
          this.cmdbInstance.cmdbSelectedValue.configItemModelAttributes[0].attributeValue.forEach(item => {
            this.cmdbInstance.lastLevelPropertyCopyList.forEach(item2 => {
              if (item === item2.label) {
                // 索引数组
                this.cmdbInstance.instanceValue.push(item2.key)

              }
            })
          })
          // 已选实例数组
          this.cmdbInstance.selectedList = this.cmdbInstance.cmdbSelectedValue.configItemModelAttributes;
          this.cmdbInstance.selectedList.forEach(item3 => {
            // 要将穿梭框列表的小标题添加进去
            item3.attributeValue.unshift(item3.attributeDesc)
          })
        } else {
          // 正常修改地图路径项， 也需要更新已选的索引数组和已选的实例模型
          this.cmdbInstance.instanceValue = [0];
          if (this.cmdbInstance.selectedList.length !== 0) {
            this.cmdbInstance.selectedList[0].attributeValue.forEach((item4, idx) => {
              if (idx !== 0) {
                for (let i = 0; i < this.cmdbInstance.lastLevelPropertyCopyList.length; i++) {
                  if (item4 === this.cmdbInstance.lastLevelPropertyCopyList[i].label) {
                    this.cmdbInstance.instanceValue.push(i)
                  }
                }

              }
            })
            // 更新实例模型
            this.cmdbInstance.pushConfigItemModelAttribute()
          }
        }
        // 更新地图路径后的主机数据也要进行筛选 但是当筛选条件为空的时候 filterMethod里面会重复赋值
        this.cmdbInstance.filterMethod('instance');
        if (back === 'back') {
          this.cmdbInstance.optDisabled = false;
        }
      });
    },
    // api接口结束
  },
  watch: {
    'cmdbInstance.selectedMapUrl': {
      handler: function (newVal) {
        // 多项地图路径
        if (newVal.value && newVal.key) {
          let params = {
            clientModelKey: newVal.value.split('.')[0],
          };
          this.getInstanceList(params, newVal, 0);
        } else {
          // 只有一项地图路径项
          let returnedAttributes = [];
          let instanceObj = {};
          this.cmdbInstance.cmdbSelectedValue.configItemModelAttributes.forEach(i => {
            instanceObj[i.attributeName] = i.attributeDesc;
          });
          for (let key in instanceObj) {
            returnedAttributes.push(`${this.cmdbInstance.cmdbSelectedValue.configItemModelName}.${key}`);
          }
          let params = {
            mainModel: this.cmdbInstance.cmdbSelectedValue.configItemModelName,
            mapUrlNameKeys: [this.cmdbInstance.selectedMapUrl.name],
            treeify: false,
            returnedAttributes,
            orderBy: [returnedAttributes[0]],
          };
          // 以上是整理接口所需参数
          if (this.cmdbInstance.cmdbSelectedValue.configItemModelAttributes[0].attributeValue.length !== 0) {
            this.getInstances(params, 'showSelected');
            this.cmdbInstance.optDisabled = false;
          } else {
            this.getInstances(params);
          }
        }
      },
    },
    // 嵌入式页面 当地图路径改变时，也要动态返回值
    'cmdbInstance.mapUrlItemList':{
      handler(newVal,oldVal){
        if(!this.modal){
          this.cmdbInstance.determine(this.confirm)
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  overflow: auto;
}
/deep/ .embedded.el-dialog__wrapper{
  position: static !important;
  .el-dialog{
    width: 100% !important;
    margin: auto;
    margin-top: 10px !important;
  }
  .el-transfer-panel{
    width: 36.5%;
  }
  // .el-transfer{
  //   width: 95%;
  //   margin: 0 auto;
  // }
}
/deep/ .el-transfer-panel .el-transfer-panel__footer{
    top: 0;
    left: auto;
    min-width: 150px;
    line-height: 40px;
    background-color: #f5f7fa;
    text-align: right;
    right: 0;
    padding-right: 10px;
    box-sizing: border-box;
    width: auto;
}
/deep/ .el-transfer-panel__body.is-with-footer{
  padding-bottom: 0;
}
.blue {
  font-size: 20px;
  padding-left: 10px;
  border-left: 5px solid #0d71e8;
}
/deep/ .el-select .el-tag__close.el-icon-close {
  top: -7px;
}
/deep/ .el-select__tags-text {
  display: inline-block;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/ .el-transfer-panel__item.el-checkbox .el-checkbox__label {
  overflow: initial;
}
/deep/ .el-transfer-panel .el-transfer-panel__empty {
  line-height: 50px;
}
.publicClass {
  pointer-events: none;
  color: #c7c7c7;
  font-size: 15px;
  &:span {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
}
.left {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -446px;
  margin-top: -100px;
}
.right {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -100px;
}
/deep/ .el-checkbox.el-transfer-panel__item.is-disabled {
  .is-disabled {
    display: none;
  }
}
.span-option {
  width: 33%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/deep/ .el-transfer-panel {
  width: 388px;
}
</style>
