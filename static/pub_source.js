/*
 * @Description:
 * @Author: Gaoxueliang
 * @Date: 2020-09-10 19:42:05
 * @LastEditTime: 2020-12-04 13:52:51
 * @LastEditors: Sok
 */
var pubsource = {

    // 以下为上海开发环境变量配置
    /*
      pub_getlink: "http://tgdev-apigw.hrocloud.com:8099/api/v1",
      clientId: "1000",
      clientPass: "6cc1c430aed64d3bb8516011195a5b56",
      pub_pubf_uploadlink: "http://tgdev-filegw.hrocloud.com/upload?groupId=0",
      pub_prvf_uploadlink: "http://tgdev-filegw.hrocloud.com/upload?groupId=1",
      pub_pubf_downlink: "http://tgdev-publicfile.hrocloud.com/",
      pub_prvf_downlink: "http://tgdev-filegw.hrocloud.com/file?",
      ws: 'ws://10.8.0.62',
      pub_prvf_cur: "http://localhost:8092", //本地
      // webSocketURL: 'ws://192.168.12.39:3048/ws',
  */
    // 以下为西安开发环境变量配置
    pub_getlink: "http://xa-apigw.dhrcloud.com:8099/api/v1",
    clientId: "1000",
    clientPass: "6cc1c430aed64d3bb8516011195a5b56",
    pub_pubf_uploadlink: "http://xa-apigw.dhrcloud.com:9709/upload?groupId=0",
    pub_prvf_uploadlink: "http://xa-apigw.dhrcloud.com:9709/upload?groupId=1",
    pub_pubf_downlink: "http://xa-pubfile.dhrcloud.com:6080/",
    pub_prvf_downlink: "http://xa-apigw.dhrcloud.com:9709/file?",
    ws: 'ws://10.8.0.62',
    pub_prvf_cur: "http://localhost:8080", //本地
    // webSocketURL: 'ws://192.168.12.39:3048/ws',

    // 以下为测试环境变量配置，新变量请同

    /* 以下为测试环境
    pub_getlink : "http://hr.test.sansheng.com:8099/api/v1",
    clientId : "1000",
    clientPass : "6cc1c430aed64d3bb8516011195a5b56",
    pub_pubf_uploadlink : "http://hr.test.sansheng.com:9709/upload?groupId=0",
    pub_prvf_uploadlink : "http://hr.test.sansheng.com:9709/upload?groupId=1",
    pub_pubf_downlink : "http://hrpubf.test.sansheng.com:6080/",
    pub_prvf_downlink : "http://hr.test.sansheng.com:9709/file?",
    //webSocketURL: 'ws://demo.hrocloud.com:3048/ws',
    pub_prvf_cur: "http://hrtestapp.cfldpe.com", //本地
    */

    /* 以下为生产环境
    pub_getlink : "http://sscapigw.hrocloud.com:8012/api/v6",
    clientId : "1000",
    clientPass : "6cc1c430aed64d3bb8516011195a5b56",
    pub_pubf_uploadlink : "http://sscfgw.hrocloud.com:8013/upload?groupId=0",
    pub_prvf_uploadlink : "http://sscfgw.hrocloud.com:8013/upload?groupId=1",
    pub_pubf_downlink : "http://sscpfile.hrocloud.com:8015/",
    pub_prvf_downlink : "http://sscfgw.hrocloud.com:8013/file?",
    webSocketURL: 'ws://sscws.hrocloud.com:8017/ws',
    */

    // 以下为生产环境变量配置，新变量请同开发增加
    /*
    pub_getlink : "https://apigw.hrocloud.com/api/v9",
    clientId : "1000",
    clientPass : "6cc1c430aed64d3bb8516011195a5b56",
    pub_pubf_uploadlink : "https://filegw.hrocloud.com/upload?groupId=0",
    pub_prvf_uploadlink : "https://filegw.hrocloud.com/upload?groupId=1",
    pub_pubf_downlink : "https://pubfile.hrocloud.com/",
    pub_prvf_downlink : "https://filegw.hrocloud.com/file?",
    webSocketURL: 'ws://192.168.11.63:3048/ws',
    pub_prvf_cur: "http://localhost:8092", //本地
    */
    aesKey: "m+yO5ElMjd6kakxgQrRJkx7l",
    aesIv: "w1x4CJr9YabE+pAH",
    // 以下为该变量收尾，新增的请放到该变量前面
    paramsName: "AP",
    webSocketDevice: "pc",
    applicationId: "18",
    companyId: "1000",
    param_mt: 'xian',
    pub_pubsources_end: "该变量收尾，新增的请放到该变量前面"
};
// export default pubsource
