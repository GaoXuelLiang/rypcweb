/**
 * Created by Aaron on 2017/12/20.
 */
import axios from "axios";
// import pubsource from '../lib/pub_source';
import store from "../vuex/index";
import qs from "qs";
import {
    encrypt,
    encryptNew,
    getCookie,
    encryptSenior,
    encryptNew2,
    encryptNew3,
    encryptAutoData
} from "../lib/util";
/*
  Update Jiangxu  2019/7/13
  qs.stringify  将对象序列化为URL的形式 以Form表单得形式传递 解决 用post传大量数据时，出现413 FULL head
*/
/*
 * 获取图形验证码的方法
 * */

axios.interceptors.request.use(
    function (config) {
        if (config.url.includes("upload")) {
            return config;
        } else {
            let mt = config.data.split("&");
            mt.forEach((item, index) => {
                if (item.includes("_mt")) {
                    config.url = config.url + "?" + mt[index];
                }
            });
            return config;
        }
    },
    function (error) {
        return Promise.reject(error);
    }
);
export const getNoteCode = () => {
    let params = {
        _mt: "verifycode.requestCaptcha",
        clientId: pubsource.clientId,
        clientPass: pubsource.clientPass,
        clientIp: "127.0.0.1"
    };
    for (let v in params) {
        v = pubsource.paramsName + v;
    }
    let requestData = {
        data: params,
        level: "None"
    };
    let data = qs.stringify(encrypt(requestData.level, requestData.data));
    return axios({
        method: "post",
        url: pubsource.pub_getlink,
        // params:data,
        data: data
    });
};
/*
 * 获取后台数据的公用方法
 * 安全级别None
 * params 为对象
 * */
export const getDataLevelNone = params => {
    //   console.log(params)
    const requestData = {
        data: params,
        level: "None"
    };
    let data = qs.stringify(encrypt(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        // params:data,
        data: data
    });
};

/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * params 为对象
 * */
export const getDataLevelUserLogin = params => {
    params.companyId = pubsource.companyId;
    if (store.state.user.childFunId !== "") {
        params.funId = store.state.user.childFunId;
    } else if (store.state.user.funId) {
        params.funId = store.state.user.funId || undefined;
    }

    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encrypt(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        // params:data,
        data: data
    });
};
export const getDataLevelUserLogin1 = params => {
    params.companyId = store.state.user.companyId;
    if (store.state.user.childFunId !== "") {
        // params.funId = store.state.user.childFunId
    } else if (store.state.user.funId) {
        // params.funId = store.state.user.funId || undefined
    }

    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encrypt(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};
/*
 * 我的工单中的业务流程专用接口
 * 不用再url获取funId  直接定义传到方法内
 *
 * */
export const getDataLevelUserLoginId = params => {
    params.companyId = store.state.user.companyId;
    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encrypt(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};
export const getDataLevelUserLoginNewId = params => {
    params.companyId = store.state.user.companyId;
    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encryptNew(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};
export const getDataLevelUserLoginNew2Id = params => {
    params.companyId = store.state.user.companyId;
    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encryptNew2(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};
/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * params 为对象
 * 不加companyid
 * */
export const getDataLevelUserLogin3 = params => {
    // params.companyId = store.state.user.companyId
    if (store.state.user.childFunId !== "") {
        params.funId = store.state.user.childFunId;
    } else if (store.state.user.funId) {
        params.funId = store.state.user.funId || undefined;
    }
    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encrypt(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};
/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * params 为对象
 * */
export const getDataLevelUserLogin2 = params => {
    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encrypt(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};

/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * 需要data
 * params 为对象
 * */
export const getDataLevelUserLoginNew = params => {
    params.companyId = pubsource.companyId;
    if (store.state.user.childFunId !== "") {
        params.funId = store.state.user.childFunId;
    } else {
        params.funId = store.state.user.funId || undefined;
    }
    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encryptNew(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        // params:data,
        data: data
    });
};

/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * 需要data
 * params 为对象
 * 为了不再报页面刚加载的签名问题
 * */
export const getDataLevelUserLoginNew4 = params => {
    params.companyId = store.state.user.companyId;
    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encryptNew(requestData.level, requestData.data));
    console.log(data);
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};

/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * 需要data
 * params 为对象
 * */
export const getDataLevelUserLoginNew2 = params => {
    params.companyId = store.state.user.companyId;
    if (store.state.user.childFunId !== "") {
        params.funId = store.state.user.childFunId;
    } else {
        params.funId = store.state.user.funId || undefined;
    }
    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encryptNew2(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};

/*
 * 获取后台数据的私用用方法   李琪
 * 安全级别UserLogin
 * 需要data
 * params 为对象
 * */
export const getDataLevelUserLoginNew3 = params => {
    params.companyId = store.state.user.companyId;
    if (store.state.user.childFunId !== "") {
        params.funId = store.state.user.childFunId;
    } else {
        params.funId = store.state.user.funId || undefined;
    }
    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encryptNew3(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};

/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * Senior
 * params 为对象
 * */
export const getDataLevelUserLoginSenior = params => {
    params.companyId = store.state.user.companyId;
    if (store.state.user.childFunId !== "") {
        params.funId = store.state.user.childFunId;
    } else {
        params.funId = store.state.user.funId || undefined;
    }
    let requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(
        encryptSenior(requestData.level, requestData.data, [
            "_mt",
            "funId",
            "logType",
            "_aid",
            "companyId"
        ])
    );
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};

export const getDataLevelUserLoginSeniorSetFunId = params => {
    params.companyId = store.state.user.companyId;
    params.funId = "1";
    let requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(
        encryptSenior(requestData.level, requestData.data, [
            "_mt",
            "funId",
            "logType",
            "_aid",
            "companyId"
        ])
    );
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        data: data
    });
};
/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * 需要data
 * params 为对象
 * */
export const getDataLevelUserLoginData = params => {
    if (!params.APfunId) {
        if(store.state.user.childsChildFunId !== ""){
            params.APfunId = store.state.user.childsChildFunId;
        }else if (store.state.user.childFunId !== "") {
            params.APfunId = store.state.user.childFunId;
        } else {
            params.APfunId = store.state.user.funId || undefined;
        }
    }
    const requestData = {
        data: params,
        level: "UserLogin"
    };
    let data = qs.stringify(encryptAutoData(requestData.level, requestData.data));
    return axios({
        method: "post",
        withCredentials: true, //跨域请求时是否需要使用凭证
        url: pubsource.pub_getlink,
        // params:data,
        data: data
    });
};
//上传头像
export const uploadimage = data => {
    let url = pubsource.pub_pubf_uploadlink;
    return axios({
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        url: url,
        data: data
    });
};
//上传文件私有云
export const uploadFile = data => {
    let url = pubsource.pub_prvf_uploadlink;
    return axios({
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        url: url,
        data: data
    });
};

