<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">

        <Row>
          <Col span="10" offset="1">
          <FormItem label="代码" prop="tmccityCode">
            <Input disabled v-model="formValidate.tmccityCode" placeholder="代码"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="名称" prop="tmccityName">
              <Input disabled v-model="formValidate.tmccityName" placeholder="名称"></Input>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="10" offset="1">
          <FormItem label="父级名称" prop="tmccityPname">
            <Input disabled v-model="formValidate.tmccityPname" placeholder="父级名称"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem label="省份" prop="tmccityProvince">
            <Input disabled v-model="formValidate.tmccityProvince" placeholder="省份"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem label="区域" prop="tmccityRegion">
            <Input disabled v-model="formValidate.tmccityRegion" placeholder="区域"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem label="等级" prop="tmccityLevel">
            <Input disabled v-model="formValidate.tmccityLevel" placeholder="等级"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem label="是否热点城市" prop="tmccityIshot">
            <Input disabled v-model="formValidate.tmccityIshotDis" placeholder="是否热点城市"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem label="缩写名称" prop="tmccityAbbname">
            <Input disabled v-model="formValidate.tmccityAbbname" placeholder="缩写名称"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem label="相邻城市" prop="tmccityNearby">
            <Input disabled v-model="formValidate.tmccityNearby" placeholder="相邻城市"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        isSpin: false,
        selectType: [],
        formValidate: {
        },
        ruleValidate: {
        },
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    updated() {

    },
    mounted() {
      // this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseTmccity.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate = res.data.content[0]
            if (t.formValidate.tmccityIshot=== '1') {
              t.formValidate.tmccityIshotDis = '是'
            } else {
              t.formValidate.tmccityIshotDis = '否'
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        this.formValidate = {}
        this.$emit('closeUp')
        this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
