<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;&nbsp;详情
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="16"></Icon>
        </Button>
      </div>
			<div class="content">
        <Spin v-if="loading" size="large" fix></Spin>
        <Row class="tit" v-if="!loading">
          <div>
            <span>岗位名称：</span>
            <span>{{topData.talentPostDis}}</span>
          </div>
          <div>
            <span>所属组织：</span>
            <span>{{topData.talentOrgDis}}</span>
          </div>
          <div>
            <span>生效日期：</span>
            <span>{{topData.talentSdate}}</span>
          </div>
          <div>
            <span>失效日期：</span>
            <span>{{topData.talentEdate}}</span>
          </div>
          <div>
            <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
            <span>{{topData.talentStateDis}}</span>
          </div>
          <div>
            <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
            <span>{{topData.labelRemark}}</span>
          </div>
        </Row>
        <Row v-if="!loading" style="border-bottom: 1px dashed #ccc;">
          <Col span="3" style="text-align: left;font-size:14px;height:90px;line-height:90px;">
            <span>当前在岗人员</span>
          </Col>
          <Col span="18">
            <Tooltip v-show="dataNow.length > 0" placement="right" v-for="(item ,index) in dataNow" :key="index" class="tooltip_top">
                <div class="ech_inner" >
                  <div style="magin-top:10px;">
                    <img draggable="false" :src="item.empphotouploadbigicon" alt="">
                  </div>
                  <div style="text-align:center;">{{item.empCname}}</div>
                </div>
                <div slot="content" :style="{left:clientWidth + 'px'}">
                  <Row class="tool_bg">
                    <div style=""><img draggable="false" :src="item.empphotouploadbigicon" alt=""></div>
                    <div>{{item.empCname}}</div>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>性别：</span><span>{{item.empGenderDis}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>岗位：</span><span>{{item.empcompPostDis}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="24"><span>部门：</span><span>{{item.empcompDeptDis}}</span></Col>
                  </Row>
                   <Row class="tool_inner">
                    <Col span="12"><span>司龄：</span><span>{{item.ageOfCompany}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>出生年月：</span><span>{{item.empBirthdateDis}}</span></Col>
                  </Row>
                </div>
            </Tooltip>
            <div v-show="dataNow.length < 1 " style="height: 90px;line-height: 93px;">暂无人员</div>
          </Col>
        </Row>
        <Row v-if="!loading" style="border-bottom: 1px dashed #ccc;">
          <Col span="3" style="text-align: left;font-size:14px;height:90px;line-height:90px;">
            <span>一级准备度人员</span>
          </Col>
          <Col span="18">
            <Tooltip placement="right" v-for="(item ,index) in dataOne" :key="index" >
                <div class="ech_inner" >
                  <div style="margin-top:10px;">
                    <img draggable="false" :src="item.empphotouploadbigicon" alt="">
                  </div>
                  <div style="text-align:center;">{{item.empCname}}</div>
                </div>
                <div slot="content" :style="{left:clientWidth + 'px'}">
                  <Row class="tool_bg">
                    <div style=""><img draggable="false" :src="item.empphotouploadbigicon" alt=""></div>
                    <div>{{item.empCname}}</div>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>性别：</span><span>{{item.empGenderDis}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>岗位：</span><span>{{item.empcompPostDis}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="24"><span>部门：</span><span>{{item.empcompDeptDis}}</span></Col>
                  </Row>
                   <Row class="tool_inner">
                    <Col span="12"><span>司龄：</span><span>{{item.ageOfCompany}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>出生年月：</span><span>{{item.empBirthdateDis}}</span></Col>
                  </Row>
                </div>
            </Tooltip>
            <div @click="talentLevel('1',dataOne)" class="add_class">
              <img draggable="false" src="../../../../static/talents/echelon_add.png" alt="">
            </div>
          </Col>
        </Row>
        <Row v-if="!loading" style="border-bottom: 1px dashed #ccc;">
          <Col span="3" style="text-align: left;font-size:14px;height:90px;line-height:90px;">
            <span>二级准备度人员</span>
          </Col>
          <Col span="18">
            <Tooltip placement="right" v-for="(item ,index) in dataTwo" :key="index">
                <div class="ech_inner">
                  <div style="margin-top:10px;">
                    <img draggable="false" :src="item.empphotouploadbigicon" alt="">
                  </div>
                  <div style="text-align:center;">{{item.empCname}}</div>
                </div>
                <div slot="content">
                  <Row class="tool_bg">
                    <div style=""><img draggable="false" :src="item.empphotouploadbigicon" alt=""></div>
                    <div>{{item.empCname}}</div>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>性别：</span><span>{{item.empGenderDis}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>岗位：</span><span>{{item.empcompPostDis}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="24"><span>部门：</span><span>{{item.empcompDeptDis}}</span></Col>
                  </Row>
                   <Row class="tool_inner">
                    <Col span="12"><span>司龄：</span><span>{{item.ageOfCompany}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>出生年月：</span><span>{{item.empBirthdateDis}}</span></Col>
                  </Row>
                </div>
            </Tooltip>
            <div @click="talentLevel('2',dataTwo)" class="add_class">
              <img draggable="false" src="../../../../static/talents/echelon_add.png" alt="">
            </div>
          </Col>
        </Row>
        <Row v-if="!loading"  style="border-bottom: 1px dashed #ccc;">
          <Col span="3" style="text-align: left;font-size:14px;height:90px;line-height:90px;">
            <span>三级准备度人员</span>
          </Col>
          <Col span="18">
            <Tooltip placement="right" v-for="(item ,index) in dataThree" :key="index">
                <div class="ech_inner">
                  <div style="margin-top:10px;">
                    <img draggable="false" :src="item.empphotouploadbigicon" alt="">
                  </div>
                  <div style="text-align:center;">{{item.empCname}}</div>
                </div>
                <div slot="content">
                  <Row class="tool_bg">
                    <div style=""><img draggable="false" :src="item.empphotouploadbigicon" alt=""></div>
                    <div>{{item.empCname}}</div>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>性别：</span><span>{{item.empGenderDis}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>岗位：</span><span>{{item.empcompPostDis}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="24"><span>部门：</span><span>{{item.empcompDeptDis}}</span></Col>
                  </Row>
                   <Row class="tool_inner">
                    <Col span="12"><span>司龄：</span><span>{{item.ageOfCompany}}</span></Col>
                  </Row>
                  <Row class="tool_inner">
                    <Col span="12"><span>出生年月：</span><span>{{item.empBirthdateDis}}</span></Col>
                  </Row>
                </div>
            </Tooltip>
            <div @click="talentLevel('3',dataThree)" class="add_class">
              <img draggable="false" src="../../../../static/talents/echelon_add.png" alt="">
            </div>
          </Col>
        </Row>
			</div>
    </div>
    <searchPubName v-show="showModal1" :talentNum="talentNum"
      @closeUp="hideMsg" @changeinput="changeinput"  ref="searchPubName">
    </searchPubName>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchPubName from './searchPubName'
  export default {
    data() {
      return {
        dataNow: [],
        dataOne: [],
        dataTwo: [],
        dataThree: [],
        loading: false,
        showModal1: false,
        talentNum: '', //级别，
        clientWidth: document.body.clientWidth - 500,
        topData: {},
      }
    },
    components: {
      searchPubName
    },
    props: {
      userId: String,
      mainData: Object,
		},
    mounted() {

    },
    methods: {
      getData(id) {
        const t = this
        t.loading = true
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'ViewEmpMaster.getEchEmp',
          logType: '梯队详情',
          postId: id,
        }).then((res) => {
          t.loading = false
          if (isSuccess(res, t)) {
            t.loading = false
            t.getTopData(id)
            if(res.data.content[0].hasOwnProperty('value')) {
              let dataArr = res.data.content[0].value
              dataArr.forEach(element => {
                if(element.empphotouploadbigicon){
                  element.empphotouploadbigicon = pubsource.pub_pubf_downlink + element.empphotouploadbigicon.split(',')[1]
                }else {
                  if(element.empGender == '02female') {
                    element.empphotouploadbigicon = '../../../../static/talents/talents15_g.png'
                  }else if (element.empGender == '01male') {
                    element.empphotouploadbigicon = '../../../../static/talents/talents15_b.png'
                  }
                }
                switch(element.echLevel){
                  case '0':
                    t.dataNow.push(element)
                  break
                  case '1':
                    t.dataOne.push(element)
                  break
                  case '2':
                    t.dataTwo.push(element)
                  break;
                  case '3':
                    t.dataThree.push(element)
                  break;
                }
              });
            }
          }
        }).catch(() => {
          t.loading = false
          this.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 顶部信息查询
      getTopData(id) {
        const t = this
        const data = {
          _mt:  this.$global.mt+'TalentEchelon.getByPostId',
          logType: '梯队信息',
          postId: id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if(res.data.content[0].hasOwnProperty('value')){
              t.topData = res.data.content[0].value[0]
            }
          }
        }).catch(() => {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 新增
      talentLevel(talentNum,arr) {
        const t = this
        t.talentNum = talentNum
        t.showModal1 = true
        if(arr.length > 0){
          let nameId = []
          arr.forEach(element => {
            nameId.push(element.id)
          })
          // t.$refs.searchPubName.getData(1,nameId)
          t.$refs.searchPubName.getData(1)
          t.$refs.searchPubName.getRightData(arr)
        }else {
          t.$refs.searchPubName.getData(1)
        }
      },
      hideMsg() {
        let t = this
        t.showModal1 = false
      },
      changeinput(name, id, talentNum) {
        //name员工名字, id, talentNum 梯队等级,
        const t = this
        t.addData(talentNum,id.join(','))
      },
      addData(talentNum,id){
        const t = this
        t.loading = true
				const data = {
          _mt:  this.$global.mt+'TalentEchelon.addOrUpd',
          logType: '新增员工',
          id: t.topData.id,
          talentPost: t.topData.talentPost,
          talentSdate: t.topData.talentSdate,
          talentEdate: t.topData.talentEdate,
          talentState: t.topData.talentState,
        }
        switch(talentNum) {
          case '1':
            data['talentLevel1']= id
          break;
          case '2':
            data['talentLevel2']= id
          break;
          case '3':
            data['talentLevel3']= id
          break;
        }
        getDataLevelUserLoginNew(data).then((res) => {
          t.loading = false
          if (isSuccess(res, t)) {
            t.dataNow = []
            t.dataOne = []
            t.dataTwo = []
            t.dataThree = []
            t.getData(res.data.content[0].talentPost)
          }
        }).catch(() => {
          t.loading = false
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
			handleReset() {
        this.$emit('closeEchelon')
        this.topData = []
        this.dataNow = []
        this.dataOne = []
        this.dataTwo = []
        this.dataThree = []
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cover{
	  position: fixed;
	  overflow: auto;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  z-index: 1000;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  background-color: rgba(0,0,0,.4);
	  -webkit-overflow-scrolling: touch;
    outline: 0;
	  .box{
	    position:relative;
	    width: 1000px;
	    background-color: #fff;
	    padding: 60px 20px 30px 20px;
	    border-radius: 10px;
	    .content{
	      overflow-y: auto;
        height: 500px;
	      position:relative;
        .tit {
          margin-bottom: 10px;
          span {
            height: 30px;
            font-size: 14px;
            cursor: pointer;
          }
          :nth-child(1) {
            margin-right: 10px;
          }
        }
        .active_span {
          color: #bf0008;
          font-weight: 600;
          border-bottom: 1px solid #bf0008;
        }
	    }
	    .title{
	      display: flex;
	      position: absolute;
	      height: 40px;
	      width: 98%;
	      line-height: 40px;
	      justify-content: space-between;
	      align-items: center;
	      padding-left: 20px;
	      top: 0;
	      border-bottom: 1px solid #efefef;
	      left: 0;
	      .title-text{
	        font-weight: bold;
	        font-size: 14px;
	      }
	    }
	  }
  }
  .tit {
  margin-bottom: 25px;
  padding-left: 5px;
  padding-top: 10px;
  border-bottom: 1px dashed #ccc;
  div {
    height: 30px;
    :nth-child(1) {
      font-size: 14px;
    }
    :nth-child(2) {
      margin-left: 10px;
    }
  }
}
.tooltip_top {
  /deep/ .ivu-tooltip-popper {
    position: fixed !important;
    top: unset !important;
    left: unset !important;
    margin-top: -180px;
    margin-left: 70px;
  }
}
/deep/ .ivu-tooltip-rel {
  margin-right: 50px;
}
/deep/ .ivu-tooltip-inner {
  color: unset;
  background-color: #fff;
  width: 350px;
  height: 240px;
  // overflow-y: auto;
  max-width: initial;
  min-height: initial;
  padding: 0 0 5px 0;
  .ivu-row {
    margin: 6px;
  }
  .tool_bg {
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    width: 100%;
    padding: 5px;
    background-size: auto;
    background-position: 0 0;
    margin: 0;
    div {
      display: inline-block;
      font-size: 16px;
      font-weight: 600;
      margin-left: 10px;
    }
  }
  .tool_inner {
    /deep/ .ivu-col {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span:nth-child(1) {
        color: #a0a0a0;
      }
      span:nth-child(2) {

      }
    }
  }
}
  .ech_inner {
    display: inline-block;
    margin-bottom: 10px;
    cursor: pointer;
    div {
      text-align: center;
    }
  }
  img{
    width: 65px;
    height: 75px;
  }
  .add_class {
    cursor: pointer;
    height: 90px;
    line-height: 90px;
    width: 120px;
    display: inline-block;
    vertical-align: text-bottom;
    img {
      width: 45px;
      height: 45px;
    }
  }
</style>
