<template>
  <Row>
    <row class="table-form" ref="table-form">
      <Table  height="300" size="small" border ref="selection" :columns="searchCloumns"   :data="data"></Table>    </row>
  </Row>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  export default {
    data() {
      return {
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 100,
        page: 1,
        searchCloumns: [
          {
            title: '岗位编码',
            key: 'OldPostCode',
          },
          {
            title: '中文简称',
            key: 'postSnameCnDis',
          },
          {
            title: '英文简称',
            key: 'postSnameEnDis',
          },
          {
            title: '所属组织',
            key: 'postUnitName',
          },
          {
            title: '新组织编码',
            key: 'postCode',
          },
          {
            title: '默认成本中心',
            key: 'postDfcostcenterName',
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
                  h('span', {}, params.row.postDfcostcenterName),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                    },
//                    style: {
//                      display: params.row.postDfcostcenterName === undefined ? 'none' : 'block',
//                    },
                    on: {
                      click: () => {
                        this.openUp(params, 'postDfcostcenterName', params.index)
                      },
                    },
                  }, '选择'),
                ]),
              ])
            },
          },
          {
            title: '工作地点',
            key: 'postLocationDis',
            render: (h, params) => {
              return h('div', [
                h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  },
                }, [
                  h('span', {}, params.row.postLocationDis),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                    },
//                    style: {
//                      display: params.row.postLocationDis === undefined ? 'none' : 'block',
//                    },
                    on: {
                      click: () => {
                        this.openUp(params, 'postLocationDis', params.index)
                      },
                    },
                  }, '选择'),
                ]),
              ])
            },
          },
          {
            title: '计划编制',
            key: 'postPlanauth',
          },
        ],
        data: [],
        allIndex: '',
      }
    },
    methods: {
      getData(id, code) {
        const t = this
        console.log(code)
//        t.newId = id
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'OrgUnits.getRangePost',
          id: id,
          funId: '1',
          logType: '原岗位查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let data = res.data.content[0].value
              t.data = []
              data.forEach((item, index) => {
                let length1 = code.length
                let length2 = item.postCode.length
                let length3 = item.postUnitCode.length
                let postCode = item.postCode.substring(length1, length2)
                let postUnitCode = item.postUnitCode.substring(length1, length3)
                let oldTemp = {
                  OldPostCode: item.postCode,
                  postSnameCnDis: item.postSnameCnDis,
                  postSnameEnDis: item.postSnameEnDis,
                  postUnitName: item.postUnitName,
                  postCode: code + postCode,
                  postDfcostcenter: item.postDfcostcenter,
                  postDfcostcenterName: item.postDfcostcenterName,
                  postLocation: item.postLocation,
                  postLocationDis: item.postLocationDis,
                  postPlanauth: item.postPlanauth,
                  postUnitCode: code + postUnitCode,
                  postDfpslevel: item.postDfpslevel,
                  postSex: item.postSex,
                  postFnameDis: item.postFnameDis,
                  postWorkyears: item.postWorkyears,
                  postDftrvlevel: item.postDftrvlevel,
                  id: item.id,
                  postCurauth: item.postCurauth,
                  postEage: item.postEage,
                  postFnameCnDis: item.postFnameCnDis,
                  postSeq: item.postSeq,
                  postManhour: item.postManhour,
                  postEdu: item.postEdu,
                  postUnit: item.postUnit,
                  postJobaim: item.postJobaim,
                  postSuperior: item.postSuperior,
                  postSage: item.postSage,
                  postDfsallevel: item.postDfsallevel,
                  postSnameDis: item.postSnameDis,
                  postStatus: item.postStatus,
                  postFnameEnDis: item.postFnameEnDis,
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
      changePostValue(type, name, id) {
        const t = this
        let dataTmep = t.data
        switch (type) {
          case 'postLocationDis' : //  工作地点
            dataTmep[t.allIndex].postLocationDis = name
            dataTmep[t.allIndex].postLocation = id
            break
          case 'postDfcostcenterName' : //  成本中心
            dataTmep[t.allIndex].postDfcostcenterName = name
            dataTmep[t.allIndex].postDfcostcenter = id
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
          case 'postLocationDis' : //  工作地点
            this.$emit('pickDataTypePost', type)
            break
          case 'postDfcostcenterName' : //  成本中心
            this.$emit('pickDataTypePost', type)
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
