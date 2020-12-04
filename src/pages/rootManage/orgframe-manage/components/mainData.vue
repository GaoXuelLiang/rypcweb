<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          推送主数据
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="18"></Icon>
        </Button>
      </div>
      <div ref="scrollBox" style="max-height: 410px;">
        <Form class="content" ref="upFormData" :model="upFormData" :rules="ruleValidate" :label-width="135">
          <Row>
          	<i-col span="21" offset="1">
              <FormItem label="消息消费系统标识" prop="name2">
                <Input v-model="upFormData.name2" placeholder="请输入消息消费系统标识"></Input>
              </FormItem>
           	</i-col>
          </Row>
          <Row>
            <i-col span="21" offset="1">
              <Row type="flex" justify="end">
                <FormItem>
                  <Button @click="handleReset">取消</Button>
                  <Button :loading="loading1" style="margin-left: 8px" type="primary" @click="handleSubmit">确认</Button>
                </FormItem>
              </Row>
            </i-col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin,uploadFile } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  export default {
    data() {
      return {
        upFormData: {
          name2: this.priValue,
        },
        ruleValidate: {
          name2: [
            { required: true, message: '请输入消息消费系统标识', trigger: 'blur' },
          ],
        },
        loading1: false,
      }
    },
    props: {
      mainType: String,
      priValue: String,
    },
    components: {
    },
    mounted() {

    },
    methods: {
      handleSubmit() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'MasterDataPush.pushAll',
          logType: '消息消费系统标识',
          sysmark: t.upFormData.name2,
          mtype: t.mainType,
        }
        this.$refs.upFormData.validate((valid) => {
          if (valid) {
            t.loading1 = true
            getDataLevelUserLogin(data).then((res) => {
              t.loading1 = false
              if (isSuccess(res, t)) {
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: '推送成功',
                })
                this.$emit('getData')
                t.handleReset()
              }
            }).catch(() => {
              t.loading1 = false
//              t.$Modal.warning({
//                title: this.$t('reminder.err'),
//                content: this.$t('reminder.errormessage'),
//              })
            })
          }
        })
      },
      // 关闭弹窗
      handleReset() {
        this.$refs.upFormData.resetFields()
        this.upFormData = {
          name2: this.priValue,
        }
        this.$emit('closePerson')
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
	  background-color: rgba(0,0,0,.5);
	  -webkit-overflow-scrolling: touch;
	  outline: 0;
	  .box{
	    position:relative;
	    width: 600px;
	    background-color: #fff;
	    padding: 60px 20px 0px 20px;
	    border-radius: 10px;
	    .form{
	      max-height: 600px;
	      overflow-y: auto;
	    }
	    .title{
	      display: flex;
	      position: absolute;
	      height: 40px;
	      width: 100%;
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
        .content{
            .last_modul{
              border-bottom: 1px dashed #dedede;
              padding-bottom: 15px;
            }
            .edu-button{
              text-align: center;
              div{
                display: inline-block;
                padding: 10px 50px;
                background-color: #f9f9f9;
                border-radius: 5px;
                cursor: pointer;
                color: #BF0008;
              }
            }
        }
	  }
	}
</style>
