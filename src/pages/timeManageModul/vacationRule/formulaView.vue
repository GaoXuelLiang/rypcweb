<template >
  <div class="cover" >
    <div class="box">
      <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          计算公式
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Col span="4" class="colTree">
      <div class="Header">{{$t('lang_payroll.payFormula.itemHead')}}</div>
      <div class="divtree" :style="{height:treeheight + 'px',width: 200 +'px'} ">
        <i-col class="meau-left">
          <span v-for="(item,index) in items" :key="index" >
            <DropdownItem @click.native="insert(' [' + item + '] ')" style="color: #4495f1">{{item}}</DropdownItem>
          </span>
        </i-col>
      </div>
      </Col>
      <Col span="4" class="mula">
      <div class="Header">{{$t('lang_payroll.payFormula.contentHead')}}</div>
          <Input :style="{height:treeheight1 + 'px'}" id="content" v-model="attRptitFormula" type="textarea" :autosize="{minRows: 15,maxRows: 15}" ></Input>
            <!--<div :id="'editor'" style="z-index: 0;"></div>-->
            <!--<div id="txt" v-model="content" v-show="false"></div>-->
      </Col>
      <Col span="4" class="mula">
      <div class="Header">{{$t('lang_payroll.payFormula.comment')}}</div>
      <Input :style="{height:treeheight2 + 'px'}" v-model="attRptitFormulacomment" type="textarea" :autosize="{minRows: 6,maxRows: 6}" ></Input>
      <!--<div :id="'editor'" style="z-index: 0;"></div>-->
      <!--<div id="txt" v-model="content" v-show="false"></div>-->
      </Col>
      <div class="Header">{{$t('lang_payroll.payFormula.calHead')}}</div>
      <div class="right" :style="{height:treeheight3 + 'px'} ">
        <i-col class="meau-left">
          <Button type="info" @click="insert('9')" class="button">9</Button>
          <Button type="info" @click="insert('8')" class="button">8</Button>
          <Button type="info" @click="insert('7')" class="button">7</Button>
          <Button type="info" @click="insert(' + ')" class="button">+</Button>
          <Button type="info" @click="insert(' - ')" class="button">-</Button><br/>
          <Button type="info" @click="insert('6')" class="button">6</Button>
          <Button type="info" @click="insert('5')" class="button">5</Button>
          <Button type="info" @click="insert('4')" class="button">4</Button>
          <Button type="info" @click="insert(' * ')" class="button">*</Button>
          <Button type="info" @click="insert(' / ')" class="button">/</Button><br/>
          <Button type="info" @click="insert('3')" class="button">3</Button>
          <Button type="info" @click="insert('2')" class="button">2</Button>
          <Button type="info" @click="insert('1')" class="button">1</Button>
          <Button type="info" @click="insert(' ( ')" class="button">(</Button>
          <Button type="info" @click="insert(' ) ')" class="button">)</Button><br/>
          <Button type="info" @click="insert('0')" class="button">0</Button>
          <Button type="info" @click="insert('00')" class="button">00</Button>
          <Button type="info" @click="insert('.')" class="button">.</Button>
          <Button type="info" @click="insert(' 大于 ')" class="button">&gt;</Button>
          <Button type="info" @click="insert(' 大于等于 ')" class="button">&gt;=</Button><br/>
          <Button type="info" @click="insert(' = ')" class="button">=</Button>
          <Button type="info" @click="insert(' 等于 ')" class="button">==</Button>
          <Button type="info" @click="insert(' 不等于 ')" class="button">!=</Button>
          <Button type="info" @click="insert(' 小于 ')" class="button">&lt;</Button>
          <Button type="info" @click="insert(' 小于等于 ')" class="button">&lt;=</Button><br/>
          <Button type="info" @click="insert('{')" class="button">{</Button>
          <Button type="info" @click="insert('}')" class="button">}</Button>
          <Button type="info" @click="insert(' 否则 ')" class="button">否则</Button>
          <Button type="info" @click="insert(' 或 ')" class="button">或</Button>
          <Button type="info" @click="insert(' 并且 ')" class="button">并且</Button>
          <br/>
          <Button type="info" @click="insert(' 如果 ')"  class="button">如果</Button>
          <Button type="info" @click="insert(' 否则如果 ')" style="width: 83px" class="button">否则如果</Button>
          <Button type="info" @click="insert(' 结果 ')"  style="width: 84px"  class="button">结果</Button>
        </i-col>
      </div>
      <div class="Header">{{$t('lang_payroll.payFormula.itemHead')}}</div>
      <div class="right" :style="{height:220 + 'px',width: 240 +'px'} ">
        <i-col class="meau-left">
          <span v-for="(item,index) in dataTree" :key="index" >
            <DropdownItem @click.native="insert(item.value)" style="color: #4495f1">{{item.title}}</DropdownItem>
          </span>
        </i-col>
      </div>
        <Row type="flex" style="padding-top: 5px;" justify="end">
            <Button @click="close" style="margin-left: 8px;">{{$t('button.cal')}}</Button>
            <Button type="primary" @click="save" style="margin-left: 8px;">{{$t('button.sav')}}</Button>
          <Button type="primary" @click="check" style="margin-left: 8px;">{{$t('button.cek')}}</Button>
        </Row>
    </div>
  </div>
</template>
<script>
  import { isSuccess, deepCopy } from '../../../lib/util'
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'

//  let editor
  export default {
    data() {
      return {
        spinShow:false,
        attRptitFormula: '',
        attRptitFormulacomment: '', // 公式备注
        rowId: '',
        dataTree: [
          {
            title: 'toFixed(2)------四舍五入',
            expand: true,
            value: ' toFixed() ',
          },
          {
            title: 'abs()------取绝对值',
            expand: true,
            value: ' abs() ',
          },
          {
            title: 'floor()------取整数部分',
            expand: true,
            value: ' floor() ',
          },
          {
            title: 'min(,)------取小',
            expand: true,
            value: ' min(,) ',
          },
          {
            title: 'max(,)------取大',
            expand: true,
            value: ' max(,) ',
          },
          {
            title: 'round------新四舍五入',
            expand: true,
            value: ' round ',
          },
        ],
        items: [],
        treeheight: 520,
        treeheight1: 350,
        treeheight2: 150,
        treeheight3: 270,
      }
    },
    components: {
    },
    props: {
      id: String,
    },
    mounted() {
    },
    methods: {
      /**
       *  查看计算项目的内容
       * @param id
       */
      getItem(attRptitType) {
        const t = this
        t.spinShow = true
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'AttendRptitem.getAttProject',
          logType: '考勤项目',
          type: attRptitType,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.items = res.data.content[0].value.split(',')
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.spinShow = false
        })
      },
      // 获取之前设置的公式内容
      getData(row) {
        this.attRptitFormula = row.attRptitFormula
        this.attRptitFormulacomment = row.attRptitFormulacomment
      },
      // 设置公式的值
      insert(flvarName, flvarMark) {
        if (this.attRptitFormula) {
          this.attRptitFormula = this.attRptitFormula + flvarName
        } else {
          this.attRptitFormula = flvarName
        }
      },
      close() {
        this.$emit('hideMsg')
        this.attRptitFormula = ''
        this.attRptitFormulacomment = ''
        this.rowId = ''
      },
      // 保存
      save() {
        const t = this
        console.log(t.attRptitFormula, t.attRptitFormulacomment)
        t.$emit('htem', t.attRptitFormula, t.attRptitFormulacomment)
      },
      check() {
        const t = this
        const params = {}
        params._mt =  this.$global.mt+'AttendRptitem.checkJs'
        params.id = t.rowId
        params.logType = this.$t('button.y.upd')
        params.attRptitFormula = t.attRptitFormula
        getDataLevelUserLoginNew(params).then((res) => {
          if (res.data.content[0].value === 1) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '校验通过!',
            })
          } else {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: '公式异常!请重新检查!',
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .colTree{
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
    width: 220px;
  }
  .mula{
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
    width: 500px;
  }
  .right{
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
  }
  .mulabody{
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
  }
  .divtree{
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
  }

  .cover .box{
    padding: 50px 20px 5px 20px;
    width: 1000px;
  }
  .button {
    color: #000000;
    width: 40px;
    margin-top: 5px;
    padding-left: 1%;
    padding-right: 1%;
    background-color: rgba(213, 243, 255, 0.56);
    border:none;
  }
  .btn{
    position: relative;
    bottom: 20px;
    right: 36px;
  }
</style>
