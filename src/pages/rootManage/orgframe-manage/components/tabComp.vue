<template>
  <row>
    <row class="table-form" ref="table-form">
      <Table  height="300" size="small" border ref="selection" :columns="Cloumns"  :data="data"></Table>
    </row>
  </row>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  export default {
    data() {
      return {
        Cloumns: [
          {
            title: '组织编码',
            key: 'oldUnitCode',
          },
          {
            title: '中文简称',
            key: 'oldCompSnameCnDis',
          },
          {
            title: '英文简称',
            key: 'oldCompSnameEnDis',
          },
          {
            title: '新组织编码',
            key: 'unitCode',
          },
          {
            title: '管理层级',
            key: 'unitLevelDis',
          },
          {
            title: '负责人',
            key: 'unitChargerDis',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  },
                }, [
                  h('span', {}, params.row.unitChargerDis),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                    },
                    style: {
                      display: params.row.unitChargerDis === undefined ? 'none' : 'block',
                    },
                    on: {
                      click: () => {
                        this.openUp(params, 'unitChargerDis', params.index)
                      },
                    },
                  }, '选择'),
                ]),
              ])
            },
          },
          {
            title: '默认雇佣点',
            key: 'unitDfhirecityName',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  },
                }, [
                  h('span', {}, params.row.unitDfhirecityName),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                    },
                    style: {
                      display: params.row.unitDfhirecityName === undefined ? 'none' : 'block',
                    },
                    on: {
                      click: () => {
                        this.openUp(params, 'unitDfhirecityName', params.index)
                      },
                    },
                  }, '选择'),
                ]),
              ])
            },
          },
          {
            title: '默认工作地点',
            key: 'unitDfworkcityName',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  },
                }, [
                  h('span', {}, params.row.unitDfworkcityName),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                    },
                    style: {
                      display: params.row.unitDfworkcityName === undefined ? 'none' : 'block',
                    },
                    on: {
                      click: () => {
                        this.openUp(params, 'unitDfworkcityName', params.index)
                      },
                    },
                  }, '选择'),
                ]),
              ])
            },
          },
          {
            title: '默认成本中心',
            key: 'unitDfcostcenterName',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  },
                }, [
                  h('span', {}, params.row.unitDfcostcenterName),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                    },
                    style: {
                      display: params.row.unitDfcostcenterName === undefined ? 'none' : 'block',
                    },
                    on: {
                      click: () => {
                        this.openUp(params, 'unitDfcostcenterName', params.index)
                      },
                    },
                  }, '选择'),
                ]),
              ])
            },
          },
        ],
        data: [],
        allParams: '',
        allIndex: '',
      }
    },
    methods: {
      getData(id) {
        const t = this
//        t.newId = id
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'OrgUnits.getSubOrgUnits',
          id: id,
          funId: '1',
          logType: '原组织查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let data = res.data.content[0].value
              t.data = []
              data.forEach((item, index) => {
                let oldTemp = {
                  oldUnitCode: item.unitCode,
                  unitPidCode: item.unitPidCode,
                  unitType: item.unitType,
                  unitXlocation: item.unitXlocation,
                  unitYlocation: item.unitYlocation,
                  oldCompSnameCnDis: item.compSnameCnDis,
                  oldCompSnameEnDis: item.compSnameEnDis,
                  compFnameCnDis: item.compFnameCnDis,
                  compFnameEnDis: item.compFnameEnDis,
                  compSnameCnDis: item.compSnameCnDis,
                  compSnameEnDis: item.compSnameEnDis,
                }
                t.data.push(oldTemp)
              })
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /* 新增新组织 */
      addData(value) {
        const t = this
        console.log(value, '111111111111111111111')
        let dataTmep = t.data
        t.data = []
        dataTmep.forEach((item, index) => {
          let length1 = value.unitCode.length
          let length2 = item.oldUnitCode.length
          let unitCode = item.oldUnitCode.substring(length1, length2)
          let length4 = item.unitPidCode.length
          let unitPidCode = item.oldUnitCode.substring(length1, length4)
            item.unitCode = value.unitCode + unitCode
            item.unitPid = value.unitPid
            item.unitLevelDis = value.unitLevelDis
            item.unitLevel = value.unitLevel
            item.unitChargerDis = value.unitChargerDis
            item.unitCharger = value.unitCharger
            item.unitDfhirecityName = value.unitDfhirecityName
            item.unitDfhirecity = value.unitDfhirecity
            item.unitDfworkcityName = value.unitDfworkcityName
            item.unitDfworkcity = value.unitDfworkcity
            item.unitDfcostcenterName = value.unitDfcostcenterName
            item.unitDfcostcenter = value.unitDfcostcenter
            item.unitPidCode = value.unitCode + unitPidCode
            item.validdate = value.validdate
            item.unitState = value.unitState
//            item.unitXlocation = value.unitXlocation
//            item.unitYlocation = value.unitYlocation
            t.data.push(item)
        })
        this.$emit('changeValue', value)
      },
      changeData(type, name, id) {
        const t = this
        let dataTmep = t.data
        switch (type) {
          case 'unitChargerDis' :    // 负责人
            dataTmep[t.allIndex].unitChargerDis = name
            dataTmep[t.allIndex].unitCharger = id
            break
          case 'unitDfhirecityName' : // 雇佣点
            dataTmep[t.allIndex].unitDfhirecityName = name
            dataTmep[t.allIndex].unitDfhirecity = id
            break
          case 'unitDfworkcityName' : //  工作地点
            dataTmep[t.allIndex].unitDfworkcityName = name
            dataTmep[t.allIndex].unitDfworkcity = id
            break
          case 'unitDfcostcenterName' : //  成本中心
            dataTmep[t.allIndex].unitDfcostcenterName = name
            dataTmep[t.allIndex].unitDfcostcenter = id
            break
        }
        t.data = []
        dataTmep.forEach((item, index) => {
          t.data.push(item)
        })
      },
      openUp(params, type, index) {
        this.allParams = params.row
        this.allIndex = index
        switch (type) {
          case 'unitChargerDis' :    // 负责人
            this.$emit('pickDataType', type)
                break
          case 'unitDfhirecityName' : // 雇佣点
            this.$emit('pickDataType', type)
                break
          case 'unitDfworkcityName' : //  工作地点
            this.$emit('pickDataType', type)
                break
          case 'unitDfcostcenterName' : //  成本中心
            this.$emit('pickDataType', type)
            break
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .age .ivu-input-wrapper{
    width: 45%;
  }
  .ivu-form-item .ivu-form-item-content {
    margin-left: 0 !important;
 }
</style>
