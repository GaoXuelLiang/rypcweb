<template>
  <div>
    <P>{{message}}</P>
    <button @click="testaxiosget">testaxiosget</button>
    <button @click="testaxiospost">testaxiospost</button>
    <br>
    <br>
    <button @click="testbase64">testbase64</button>
    <br>
    <br>
    待加密串：<textarea cols="100" rows="1" v-model="encryptb64Str"></textarea><br>
    加密串：  <textarea cols="100" rows="1" v-model="decryptb64Str"></textarea><br>
    解密串：  <textarea cols="100" rows="1" v-model="rtnEncryptb64Str"></textarea>
    <br>
    <button @click="testEncrypt1">testEncrypt1</button>
    <button @click="testDecrypt1">testDecrypt1</button>
    <br>
    待加密串：<textarea cols="100" rows="2" v-model="encryptStr"></textarea><br>
    加密串：  <textarea cols="100" rows="2" v-model="decryptStr"></textarea><br>
    解密串：  <textarea cols="100" rows="2" v-model="rtnEncryptStr"></textarea>
    <br>
    <button @click="testEncrypt2">testEncrypt2</button>
    <button @click="testDecrypt2">testDecrypt2</button>
    <br>
    待加密串：<textarea cols="100" rows="2" v-model="encryptStr2"></textarea><br>
    加密串：  <textarea cols="100" rows="2" v-model="decryptStr2"></textarea><br>
    解密串：  <textarea cols="100" rows="2" v-model="rtnEncryptStr2"></textarea>

  </div>
</template>
<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, aesEncrypt, aesDecrypt} from '@/lib/util'

  export default {
    data() {
      return {
        message: 'this is a test vue mode',
        blogTitle: 'test blogTitle',
        usercode: '-1',
        rtnstate: '-1',
        wxMobile: '13482144167',
        encryptb64Str: 'abcddeee',
        decryptb64Str: '',
        rtnEncryptb64Str: '',
        encryptStr: 'abcddeee',
        decryptStr: '',
        rtnEncryptStr: '',
        encryptStr2: 'abcddeee',
        decryptStr2: '',
        rtnEncryptStr2: '',
      }
    },
    computed: {},
    components: {},
    methods: {
      testaxiosget() {
        const t = this
        let params = {
          _mt: "HRSSCTestAgw.testA",
          companyId: 1000,
          userCode: aesEncrypt(t.usercode),
//          userCode: t.usercode,
          state: t.rtnstate,
          wxMobile: aesEncrypt(t.wxMobile),
//          wxMobile: t.wxMobile,
        }
        getDataLevelNone(params).then((res) => {
          if (isSuccess(res, t)) {
            this.flag = false
            let rtndata = res.data.content[0]
            console.info(rtndata)
          }
        }).catch((res) => {
          console.error(res.data.stat.stateList[0].desc)
        })
      },
      testaxiospost() {
        const t = this
        let params = {
          _mt: "HRSSCTestAgw.testA",
          companyId: 1000,
          userCode: aesEncrypt(t.usercode),
//          userCode: t.usercode,
          state: t.rtnstate,
          wxMobile: aesEncrypt(t.wxMobile),
//          wxMobile: t.wxMobile,
        }
        getDataLevelNone(params).then((res) => {
          if (isSuccess(res, t)) {
            this.flag = false
            let rtndata = res.data.content[0]
            console.info(rtndata)
          }
        }).catch((res) => {
          console.error(res.data.stat.stateList[0].desc)
        })
      },
      testbase64() {
        const t = this
//        console.info(t.encryptb64Str)
        t.decryptb64Str = Base64.encode(t.encryptb64Str)
//        console.info(t.decryptb64Str)
        t.rtnEncryptb64Str = Base64.decode(t.decryptb64Str)
//        console.info(encryptb64Str)
      },
      testEncrypt1() {
        const t = this
//        console.info(t.encryptStr)
        t.decryptStr = aesEncrypt(t.encryptStr)
//        console.info(t.decryptStr)
      },
      testDecrypt1() {
        const t = this
//        console.info(t.decryptStr)
        t.rtnEncryptStr = aesDecrypt(t.decryptStr)
//        console.info(t.rtnEncryptStr)
      },
      testEncrypt2() {
        const t = this
//        console.info(t.encryptStr)
        t.decryptStr2 = aesEncrypt(t.encryptStr2)
//        console.info(t.decryptStr)
      },
      testDecrypt2() {
        const t = this
//        console.info(t.decryptStr)
        t.rtnEncryptStr2 = aesDecrypt(t.decryptStr2)
//        console.info(t.rtnEncryptStr)
      },
    }
  }
</script>

<style>


</style>
