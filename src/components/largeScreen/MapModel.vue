<!---->
<template>
    <div class="map_bg">
        <div id="js-container"
             style="height:100%;">正在加载数据 ...</div>
        <span style="position: absolute;right: 15px;top:15px">
            <Input placeholder="请选择公司"
                   readonly
                   @on-click="opencompetType('org-company-std')"
                   style="width:150px"
                   v-model="form.careerCompDis" />
        </span>
        <transition name="fade">
            <publicTable v-if="showModal"
                         @closeUp="closeModal"
                         :params='params'
                         :searchCloumns=searchCloumns
                         searchText3="输入公司"
                         @changeinput="changeinput1">
            </publicTable>
        </transition>
    </div>
</template>
<script>
import remoteLoad from '@/lib/pub_map'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess, getUrlKey } from '@/lib/util'
import publicTable from './publicTable.vue'
export default {
    props: {
        tableheight: Number,
    },
    data () {
        return {
            dragStatus: false,
            talentShow: false,
            AMapUI: null,
            AMap: null,
            mapImage: require('../../../static/largeScreen/map_icon_other.png'),
            mapImage1: require('../../../static/largeScreen/map_icon.png'),
            mapImage2: require('../../../static/talents/1.png'),
            mapImage3: require('../../../static/talents/2.png'),
            unitXlocation: '',
            unitYlocation: '',
            id: '',
            modiaContent: '',
            showModal: false,
            form: {
                careerCompDis: '',
                careerComp: '',
            },
            changeMapArr: [],
            params: {
                _mt: this.$global.mt + 'Talrtphumef.getByUserId',
                logType: '性别分析',
                userId: this.$store.state.user.userId,
                companyId: pubsource.companyId,
            },
            searchCloumns: [
                {
                    title: '公司编码',
                    key: 'unitCode',
                    className: 'demo-table-info-column'
                },
                {
                    title: '公司名称',
                    key: 'compSnameCnDis',
                    className: 'demo-table-info-column'
                },
            ],
        }
    },
    components: {
        publicTable,
    },
    methods: {
        // 实例化地图
        initMap (markers) {
            const t = this
            let AMapUI = t.AMapUI = window.AMapUI
            let AMap = t.AMap = window.AMap
            let mapChangeIcon = []
            const map = new AMap.Map('js-container', {
                resizeEnable: true,
                zoom: 4, // 初始化地图层级
                center: [t.unitXlocation, t.unitYlocation],
            })
            map.clearMap()  // 清除地图覆盖物
            markers.forEach(function (marker) {
                const NewMarkers = new AMap.Marker({
                    map: map,
                    //                icon: marker.icon,
                    icon: new AMap.Icon({
                        image: marker.icon,
                        size: new AMap.Size(20, 36),  // 图标大小
                    }),
                    position: [marker.position[0], marker.position[1]],
                    offset: new AMap.Pixel(0, 0),
                })
                mapChangeIcon.push(NewMarkers)
                NewMarkers.on('click', showInfoM)  // 每个标记添加点击事件

                function showInfoM (e) {
                    // t.$store.commit('inventoryPortaritSave/setInventoryEmpId', e.target.Qi.label.id)
                    // t.form.careerCompDis = e.target.Qi.label.mapName
                    // t.form.careerComp = e.target.Qi.label.id
                    // for (let i = 0; i < mapChangeIcon.length; i++) {
                    //     mapChangeIcon[i].setIcon(t.mapImage)
                    // }
                    // e.target.setIcon(t.mapImage1)
                }
                NewMarkers.setLabel({
                    offset: new AMap.Pixel(-50, -75),  // 设置文本标注偏移量
                    content: `<div class="markerLabel" style="width: 120px;text-align: center;vertical-align: middle;height:98%;display: table-cell;"><span style="display: block;">${marker.mapName}</span></br><span>员工总数： ${marker.mapNumber}</span></div>`, //设置文本标注内容
                    direction: 'right',
                    id: marker.id,
                    mapName: marker.mapName, // 自定义Name
                })
                let styleName = 'amap://styles/fec9da27fe5954d6c1b30d51afdf1465'
                map.setMapStyle(styleName)
            })
        },
        getData () {
            const t = this
            // const data = {
            //     _mt: this.$global.mt + 'Talrtphumef.getByUserId',
            //     logType: '性别分析',
            //     userId: t.$store.state.user.userId,
            //     companyId: pubsource.companyId,
            // }
            // getDataLevelUserLogin(data).then((res) => {
            let res = {
                "data": {
                    "stat": {
                        "code": 0,
                        "stateList": [
                            [
                                "SUCCESS",
                                0,
                                26703,
                                "成功"
                            ]
                        ],
                        "systime": 1604738384402,
                        "desc": "成功",
                        "cid": "a:60c3fa|t:5022|s:1604738383563"
                    },
                    "content": [
                        {
                            "value": [{ "comment": "不可修改和删除", "compFnameCnDis": "仁云科技集团有限公司", "compFnameEnDis": "HROCLOUD Corporation", "compSnameCnDis": "仁云科技集团", "compSnameEnDis": "HROCLOUD", "companyId": "1000", "deleteFlag": "0", "id": "1000", "invdate": "2020 - 12 - 31", "invreason": "无", "unitAgentno": "HROCLOUD", "unitBkdesc": "仁云HRSSC", "unitCharger": "85", "unitChargerDis": "种建龙", "unitCode": "DF00", "unitCodeCopy": "SC01", "unitDfcostcenter": "1002", "unitDfhirecity": "0", "unitDfworkcity": "0", "unitDlocation": "新意城", "unitIfDefault": "1", "unitLevel": "001", "unitLevelDis": "一级", "unitNumber": "193", "unitPid": "0", "unitPidCode": "", "unitPname": "", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.392937", "unitYlocation": "31.17049", "unitsName": "仁云科技集团有限公司", "unitsSname": "仁云科技集团", "updateBy": "1045", "updateTime": "2020 - 04 - 01 09: 14: 18", "validdate": "2013 - 01 - 01" }, { "comment": "", "compFnameCnDis": "仁云集团管理公司", "compFnameEnDis": "仁云集团管理公司", "compSnameCnDis": "集团管理公司", "compSnameEnDis": "集团管理公司", "companyId": "1000", "createBy": "1006", "createTime": "2018 - 10 - 08 16: 52: 38", "deleteFlag": "0", "id": "1036", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "22112323124142124", "unitCharger": "20", "unitChargerDis": "李明", "unitCode": "DF01", "unitCodeCopy": "DFJT01", "unitDfcostcenter": "1002", "unitDfhirecity": "0", "unitDfworkcity": "0", "unitDlocation": "华林大楼", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "8", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.434787", "unitYlocation": "31.174175", "unitsName": "仁云集团管理公司", "unitsSname": "集团管理公司", "updateBy": "1135", "updateTime": "2019 - 07 - 30 10: 26: 06", "validdate": "2008 - 01 - 01" }, { "comment": "", "compFnameCnDis": "仁云集团技术中心", "compFnameEnDis": "仁云集团技术中心", "compSnameCnDis": "集团技术中心", "compSnameEnDis": "集团技术中心", "companyId": "1000", "createBy": "1006", "createTime": "2018 - 10 - 08 17: 32: 09", "deleteFlag": "0", "id": "1037", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "集团技术中心", "unitCharger": "85", "unitChargerDis": "种建龙", "unitCode": "DF02", "unitCodeCopy": "DFJT02", "unitDfcostcenter": "1002", "unitDfhirecity": "0", "unitDfworkcity": "0", "unitDlocation": "盛夏路", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "31", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.629308", "unitYlocation": "31.206069", "unitsName": "仁云集团技术中心", "unitsSname": "集团技术中心", "updateBy": "1149", "updateTime": "2019 - 06 - 28 09: 03: 03", "validdate": "2008 - 01 - 01" }, { "comment": "", "compFnameCnDis": "上海分公司", "compFnameEnDis": "上海分公司", "compSnameCnDis": "上海分公司", "compSnameEnDis": "上海分公司", "companyId": "1000", "createBy": "1006", "createTime": "2018 - 10 - 08 17: 36: 15", "deleteFlag": "0", "id": "1038", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "上海分公司", "unitCharger": "85", "unitChargerDis": "种建龙", "unitCode": "DF03", "unitCodeCopy": "DFJT03", "unitDfcostcenter": "1002", "unitDfhirecity": "0", "unitDfworkcity": "0", "unitDlocation": "陆家嘴环路", "unitLevel": "001", "unitLevelDis": "一级", "unitNumber": "70", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.507486", "unitYlocation": "31.238648", "unitsName": "上海分公司", "unitsSname": "上海分公司", "updateBy": "1037", "updateTime": "2019 - 07 - 06 10: 12: 54", "validdate": "2008 - 01 - 01" }, { "comment": "", "compFnameCnDis": "西安分公司", "compFnameEnDis": "西安分公司", "compSnameCnDis": "西安分公司", "compSnameEnDis": "西安分公司", "companyId": "1000", "createBy": "1006", "createTime": "2018 - 10 - 08 17: 42: 47", "deleteFlag": "0", "id": "1039", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "西安分公司", "unitCharger": "85", "unitChargerDis": "种建龙", "unitCode": "DF04", "unitCodeCopy": "DFJT04", "unitDfcostcenter": "1002", "unitDfhirecity": "1440", "unitDfhirecityName": "西安市", "unitDfworkcity": "1440", "unitDfworkcityName": "西安市", "unitDlocation": "陕西省西安小学", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "2", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "108.938407", "unitYlocation": "34.270354", "unitsName": "西安分公司", "unitsSname": "西安分公司", "updateBy": "1044", "updateTime": "2019 - 06 - 28 13: 24: 00", "validdate": "2008 - 01 - 01" }, { "compFnameCnDis": "西安传媒有限公司", "compFnameEnDis": "西安传媒", "compSnameCnDis": "西安传媒", "compSnameEnDis": "西安传媒", "companyId": "1000", "createBy": "1201", "createTime": "2019 - 12 - 02 17: 38: 11", "deleteFlag": "0", "id": "1165", "invdate": "9999 - 12 - 31", "unitAgentno": "haioen12345", "unitCharger": "20", "unitChargerDis": "李明", "unitChghistory": "----更新时间：2019 - 12 - 02 17: 25: 08 操作人：licai\n原状态：编辑中 新状态：已生效\n生效时间：2019 - 12 - 01", "unitCode": "DF0401", "unitCodeCopy": "DF0401", "unitDfcostcenter": "1022", "unitDfcostcenterName": "运营实施成本(上海)", "unitDfhirecity": "1440", "unitDfhirecityName": "西安市", "unitDfworkcity": "1440", "unitDfworkcityName": "西安市", "unitDlocation": "西安宾馆", "unitLevel": "001", "unitLevelDis": "一级", "unitNumber": "2", "unitPid": "1039", "unitPidCode": "DF04", "unitPname": "西安分公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "108.946045", "unitYlocation": "34.237237", "unitsName": "西安传媒有限公司", "unitsSname": "西安传媒", "validdate": "2019 - 12 - 01" }, { "comment": "", "compFnameCnDis": "北京分公司", "compFnameEnDis": "北京分公司", "compSnameCnDis": "北京分公司", "compSnameEnDis": "北京分公司", "companyId": "1000", "createBy": "1037", "createTime": "2018 - 10 - 08 17: 56: 31", "deleteFlag": "0", "id": "1040", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "北京分公司", "unitCharger": "85", "unitChargerDis": "种建龙", "unitCode": "DF05", "unitCodeCopy": "DFJT05", "unitDfcostcenter": "1002", "unitDfhirecity": "0", "unitDfworkcity": "0", "unitDlocation": "北京市海淀区体育局", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "25", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "116.302818", "unitYlocation": "39.987221", "unitsName": "北京分公司", "unitsSname": "北京分公司", "updateBy": "1147", "updateTime": "2019 - 06 - 28 14: 08: 34", "validdate": "2018 - 01 - 01" }, { "comment": "", "compFnameCnDis": "广州分公司", "compFnameEnDis": "广州分公司", "compSnameCnDis": "广州分公司", "compSnameEnDis": "广州分公司", "companyId": "1000", "createBy": "1037", "createTime": "2018 - 10 - 08 17: 58: 43", "deleteFlag": "0", "id": "1041", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "广州分公司", "unitCharger": "85", "unitChargerDis": "种建龙", "unitCode": "DF06", "unitCodeCopy": "DFJT06", "unitDfcostcenter": "1002", "unitDfhirecity": "1321", "unitDfhirecityName": "广州市", "unitDfworkcity": "1321", "unitDfworkcityName": "广州市", "unitDlocation": "火车站(公交站)", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "0", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "113.204742", "unitYlocation": "23.378872", "unitsName": "广州分公司", "unitsSname": "广州分公司", "updateBy": "1147", "updateTime": "2019 - 06 - 28 13: 26: 04", "validdate": "2018 - 01 - 01" }, { "comment": "", "compFnameCnDis": "财务有限公司", "compFnameEnDis": "财务有限公司", "compSnameCnDis": "财务有限公司", "compSnameEnDis": "财务有限公司", "companyId": "1000", "createBy": "1037", "createTime": "2018 - 10 - 08 18: 01: 54", "deleteFlag": "0", "id": "1044", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "财务有限公司", "unitCharger": "85", "unitChargerDis": "种建龙", "unitCode": "DF09", "unitCodeCopy": "DFJT09", "unitDfcostcenter": "1002", "unitDfhirecity": "0", "unitDfworkcity": "0", "unitDlocation": "华信财务有限公司", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "0", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.436031", "unitYlocation": "31.209204", "unitsName": "财务有限公司", "unitsSname": "财务有限公司", "updateBy": "1149", "updateTime": "2019 - 06 - 28 09: 06: 49", "validdate": "2018 - 01 - 01" }, { "comment": "", "compFnameCnDis": "仁云网络有限公司", "compFnameEnDis": "仁云有限公司", "compSnameCnDis": "仁云有限公司", "compSnameEnDis": "仁云有限公司", "companyId": "1000", "createBy": "1037", "createTime": "2018 - 10 - 08 18: 42: 36", "deleteFlag": "0", "id": "1061", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "仁云有限公司", "unitCharger": "85", "unitChargerDis": "种建龙", "unitCode": "DF18", "unitCodeCopy": "DFJT18", "unitDfcostcenter": "1002", "unitDfhirecity": "0", "unitDfworkcity": "0", "unitDlocation": "上海仁云图文设计有限公司", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "30", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.379759", "unitYlocation": "31.269769", "unitsName": "仁云网络有限公司", "unitsSname": "仁云有限公司", "updateBy": "1135", "updateTime": "2019 - 12 - 12 13: 22: 56", "validdate": "2018 - 01 - 01" }, { "comment": "", "compFnameCnDis": "成都仁云有限公司", "compFnameEnDis": "成都仁云有限公司", "compSnameCnDis": "成都仁云", "compSnameEnDis": "成都仁云", "companyId": "1000", "createBy": "1006", "createTime": "2018 - 10 - 17 14: 19: 51", "deleteFlag": "0", "id": "1089", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "有限外包公司", "unitCharger": "29", "unitChargerDis": "李橙橙", "unitCode": "DF1801", "unitCodeCopy": "DF1801", "unitDfcostcenter": "1002", "unitDfhirecity": "1410", "unitDfhirecityName": "武汉市", "unitDfworkcity": "1410", "unitDfworkcityName": "武汉市", "unitDlocation": "四川省成都市武侯高级中学", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "26", "unitPid": "1061", "unitPidCode": "DF18", "unitPname": "仁云网络有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "104.009429", "unitYlocation": "30.60156", "unitsName": "成都仁云有限公司", "unitsSname": "成都仁云", "updateBy": "1135", "updateTime": "2019 - 07 - 07 15: 11: 19", "validdate": "2000 - 01 - 01" }, { "comment": "", "compFnameCnDis": "外包一分公司", "compFnameEnDis": "外包一分公司", "compSnameCnDis": "外包一分", "compSnameEnDis": "外包一分", "companyId": "1000", "createBy": "1006", "createTime": "2018 - 10 - 17 14: 29: 26", "deleteFlag": "0", "id": "1093", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "外包一分公司", "unitCharger": "74", "unitChargerDis": "李鑫宇", "unitCode": "DF180101", "unitCodeCopy": "DF180101", "unitDfcostcenter": "1002", "unitDfhirecity": "1410", "unitDfhirecityName": "武汉市", "unitDfworkcity": "1410", "unitDfworkcityName": "武汉市", "unitDlocation": "上海博远劳务服务外包有限公司(第一分公司)", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "13", "unitPid": "1089", "unitPidCode": "DF1801", "unitPname": "成都仁云有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.799407", "unitYlocation": "30.906829", "unitsName": "外包一分公司", "unitsSname": "外包一分", "updateBy": "1149", "updateTime": "2019 - 06 - 28 09: 08: 32", "validdate": "2010 - 01 - 01" }, { "comment": "", "compFnameCnDis": "有限外包二分公司", "compFnameEnDis": "有限外包二分公司", "compSnameCnDis": "外包二分", "compSnameEnDis": "外包二分", "companyId": "1000", "createBy": "1006", "createTime": "2018 - 10 - 17 14: 36: 21", "deleteFlag": "0", "id": "1099", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "有限外包二分公司", "unitCharger": "77", "unitChargerDis": "张明晖", "unitCode": "DF180102", "unitCodeCopy": "DF180102", "unitDfcostcenter": "1002", "unitDfhirecity": "1410", "unitDfhirecityName": "武汉市", "unitDfworkcity": "1410", "unitDfworkcityName": "武汉市", "unitDlocation": "外包公司", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "10", "unitPid": "1089", "unitPidCode": "DF1801", "unitPname": "成都仁云有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.51132", "unitYlocation": "31.236379", "unitsName": "有限外包二分公司", "unitsSname": "外包二分", "updateBy": "1149", "updateTime": "2019 - 06 - 28 09: 08: 49", "validdate": "2010 - 01 - 01" }, { "comment": "", "compFnameCnDis": "外包三分公司", "compFnameEnDis": "外包三分公司", "compSnameCnDis": "外包三分", "compSnameEnDis": "外包三分", "companyId": "1000", "createBy": "1006", "createTime": "2018 - 10 - 17 14: 43: 27", "deleteFlag": "0", "id": "1105", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "外包三分公司", "unitCharger": "72", "unitChargerDis": "王弘文", "unitCode": "DF180103", "unitCodeCopy": "DF180103", "unitDfcostcenter": "1021", "unitDfcostcenterName": "研发成本(上海)", "unitDfhirecity": "1410", "unitDfhirecityName": "武汉市", "unitDfworkcity": "1410", "unitDfworkcityName": "武汉市", "unitDlocation": "上海银雁金融外包服务有限公司", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "0", "unitPid": "1089", "unitPidCode": "DF1801", "unitPname": "成都仁云有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.53376", "unitYlocation": "31.216107", "unitsName": "外包三分公司", "unitsSname": "外包三分", "updateBy": "1149", "updateTime": "2019 - 06 - 28 09: 09: 11", "validdate": "2010 - 01 - 01" }, { "comment": "", "compFnameCnDis": "外包四分公司", "compFnameEnDis": "外包四分公司", "compSnameCnDis": "外包四分", "compSnameEnDis": "外包四分", "companyId": "1000", "createBy": "1006", "createTime": "2018 - 10 - 17 14: 44: 49", "deleteFlag": "0", "id": "1106", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "外包四分公司", "unitCharger": "29", "unitChargerDis": "李橙橙", "unitCode": "DF180104", "unitCodeCopy": "DF180104", "unitDfcostcenter": "1002", "unitDfhirecity": "1410", "unitDfhirecityName": "武汉市", "unitDfworkcity": "1410", "unitDfworkcityName": "武汉市", "unitDlocation": "四分公司", "unitLevel": "001", "unitLevelDis": "一级", "unitNumber": "0", "unitPid": "1089", "unitPidCode": "DF1801", "unitPname": "成都仁云有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.530009", "unitYlocation": "31.263054", "unitsName": "外包四分公司", "unitsSname": "外包四分", "updateBy": "1181", "updateTime": "2019 - 07 - 26 14: 17: 29", "validdate": "2010 - 01 - 01" }, { "comment": "", "compFnameCnDis": "仁云派遣公司", "compFnameEnDis": "有限派遣公司", "compSnameCnDis": "有限派遣", "compSnameEnDis": "有限派遣", "companyId": "1000", "createBy": "1006", "createTime": "2018 - 10 - 17 14: 21: 13", "deleteFlag": "0", "id": "1090", "invdate": "9999 - 12 - 31", "invreason": "", "unitAgentno": "有限派遣", "unitCharger": "29", "unitChargerDis": "李橙橙", "unitCode": "DF1802", "unitCodeCopy": "DF1802", "unitDfcostcenter": "1002", "unitDfhirecity": "1410", "unitDfhirecityName": "武汉市", "unitDfworkcity": "1410", "unitDfworkcityName": "武汉市", "unitDlocation": "湖北省武汉市黄陂三中", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "0", "unitPid": "1061", "unitPidCode": "DF18", "unitPname": "仁云网络有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "114.356865", "unitYlocation": "31.097298", "unitsName": "仁云派遣公司", "unitsSname": "有限派遣", "updateBy": "1135", "updateTime": "2019 - 12 - 12 13: 23: 42", "validdate": "2000 - 01 - 01" }, { "compFnameCnDis": "赤峰文化传媒有限公司", "compFnameEnDis": "赤峰文化传媒", "compSnameCnDis": "赤峰文化传媒", "compSnameEnDis": "赤峰文化传媒", "companyId": "1000", "createBy": "1201", "createTime": "2019 - 12 - 02 17: 59: 27", "deleteFlag": "0", "id": "1171", "invdate": "9999 - 12 - 31", "unitAgentno": "hskljj3456", "unitCharger": "20", "unitChargerDis": "李明", "unitChghistory": "----更新时间：2019 - 12 - 02 17: 59: 32 操作人：洪钰\n原状态：编辑中 新状态：已生效\n生效时间：2019 - 12 - 01", "unitCode": "FC01", "unitCodeCopy": "FC01", "unitDfcostcenter": "1002", "unitDfhirecity": "1453", "unitDfhirecityName": "内蒙古赤峰市", "unitDfworkcity": "1453", "unitDfworkcityName": "内蒙古赤峰市", "unitDlocation": "赤峰宾馆", "unitLevel": "001", "unitLevelDis": "一级", "unitNumber": "3", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "118.958968", "unitYlocation": "42.264157", "unitsName": "赤峰文化传媒有限公司", "unitsSname": "赤峰文化传媒", "updateBy": "1007", "updateTime": "2019 - 12 - 30 17: 59: 15", "validdate": "2019 - 12 - 01" }, { "compFnameCnDis": "HRO19", "compFnameEnDis": "HRO19", "compSnameCnDis": "HRO19", "compSnameEnDis": "HRO19", "companyId": "1000", "createBy": "1006", "createTime": "2020 - 05 - 02 13: 20: 40", "deleteFlag": "0", "id": "1181", "invdate": "9999 - 12 - 31", "unitAgentno": "防守打法", "unitChghistory": "----更新时间：2020 - 05 - 02 13: 20: 46 操作人：darren\n原状态：编辑中 新状态：待生效\n生效时间：2020 - 05 - 06 00: 00: 00.0", "unitCode": "HRO19", "unitCodeCopy": "HRO19", "unitDfcostcenter": "1002", "unitDfhirecity": "1055", "unitDfhirecityName": "上海市", "unitDfworkcity": "1055", "unitDfworkcityName": "上海市", "unitDlocation": "积善里(山阴路)", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "0", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0203tovalid", "unitStateDis": "待生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "121.484693", "unitYlocation": "31.269196", "unitsName": "HRO19", "unitsSname": "HRO19", "validdate": "2020 - 05 - 06" }, { "compFnameCnDis": "南京传媒有限公司", "compFnameEnDis": "南京传媒", "compSnameCnDis": "南京传媒", "compSnameEnDis": "南京传媒", "companyId": "1000", "createBy": "1201", "createTime": "2019 - 12 - 02 17: 52: 27", "deleteFlag": "0", "id": "1169", "invdate": "9999 - 12 - 31", "unitAgentno": "hsjssj1234", "unitCharger": "20", "unitChargerDis": "李明", "unitChghistory": "----更新时间：2019 - 12 - 02 17: 53: 10 操作人：洪钰\n原状态：编辑中 新状态：已生效\n生效时间：2019 - 12 - 01", "unitCode": "NJ01", "unitCodeCopy": "NJ01", "unitDfcostcenter": "1022", "unitDfcostcenterName": "运营实施成本(上海)", "unitDfhirecity": "1227", "unitDfhirecityName": "南京市", "unitDfworkcity": "1227", "unitDfworkcityName": "南京市", "unitDlocation": "南京市", "unitLevel": "001", "unitLevelDis": "一级", "unitNumber": "7", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "118.796623", "unitYlocation": "32.059352", "unitsName": "南京传媒有限公司", "unitsSname": "南京传媒", "updateBy": "1201", "updateTime": "2019 - 12 - 02 17: 53: 06", "validdate": "2019 - 12 - 01" }, { "compFnameCnDis": "陕西老电工有限公司", "compFnameEnDis": "laodiangong", "compSnameCnDis": "老电工", "compSnameEnDis": "ldg", "companyId": "1000", "createBy": "1148", "createTime": "2019 - 12 - 30 09: 40: 38", "deleteFlag": "0", "id": "1180", "invdate": "9999 - 12 - 31", "unitAgentno": "91310115MA1K4EUC6F", "unitCharger": "20", "unitChargerDis": "李明", "unitChghistory": "----更新时间：2019 - 12 - 30 09: 44: 19 操作人：任聪聪\n原状态：编辑中 新状态：已生效\n生效时间：2019 - 12 - 01", "unitCode": "SXLDG001", "unitCodeCopy": "SXLDG001", "unitDfcostcenter": "1002", "unitDfhirecity": "1440", "unitDfhirecityName": "西安市", "unitDfworkcity": "1440", "unitDfworkcityName": "西安市", "unitDlocation": "陕西省西安中学", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "0", "unitPid": "1038", "unitPidCode": "DF03", "unitPname": "上海分公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "108.940112", "unitYlocation": "34.331756", "unitsName": "陕西老电工有限公司", "unitsSname": "老电工", "updateBy": "1283", "updateTime": "2020 - 08 - 22 01: 37: 14", "validdate": "2019 - 12 - 01" }, { "compFnameCnDis": "沈阳文化传媒有限公司", "compFnameEnDis": "沈阳文化传媒有限公司", "compSnameCnDis": "沈阳传媒", "compSnameEnDis": "沈阳传媒", "companyId": "1000", "createBy": "1007", "createTime": "2019 - 12 - 02 17: 25: 02", "deleteFlag": "0", "id": "1163", "invdate": "9999 - 12 - 31", "unitAgentno": "tax1923236444", "unitCharger": "20", "unitChargerDis": "李明", "unitChghistory": "----更新时间：2019 - 12 - 02 17: 25: 08 操作人：licai\n原状态：编辑中 新状态：已生效\n生效时间：2019 - 12 - 01", "unitCode": "SY02", "unitCodeCopy": "SY02", "unitDfcostcenter": "1021", "unitDfcostcenterName": "研发成本(上海)", "unitDfhirecity": "1191", "unitDfhirecityName": "沈阳市", "unitDfworkcity": "1191", "unitDfworkcityName": "沈阳市", "unitDlocation": "沈阳市", "unitLevel": "002", "unitLevelDis": "二级", "unitNumber": "9", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "123.465009", "unitYlocation": "41.677287", "unitsName": "沈阳文化传媒有限公司", "unitsSname": "沈阳传媒", "validdate": "2019 - 12 - 01" }, { "compFnameCnDis": "武汉文化传媒有限公司", "compFnameEnDis": "武汉文化传媒", "compSnameCnDis": "武汉文化传媒", "compSnameEnDis": "武汉文化传媒", "companyId": "1000", "createBy": "1201", "createTime": "2019 - 12 - 02 17: 47: 19", "deleteFlag": "0", "id": "1167", "invdate": "9999 - 12 - 31", "unitAgentno": "hajksgh1234", "unitCharger": "20", "unitChargerDis": "李明", "unitChghistory": "----更新时间：2019 - 12 - 02 17: 25: 08 操作人：licai\n原状态：编辑中 新状态：已生效\n生效时间：2019 - 12 - 01", "unitCode": "WH01", "unitCodeCopy": "WH01", "unitDfcostcenter": "1022", "unitDfcostcenterName": "运营实施成本(上海)", "unitDfhirecity": "1410", "unitDfhirecityName": "武汉市", "unitDfworkcity": "1410", "unitDfworkcityName": "武汉市", "unitDlocation": "武汉站", "unitLevel": "001", "unitLevelDis": "一级", "unitNumber": "3", "unitPid": "1000", "unitPidCode": "DF00", "unitPname": "仁云科技集团有限公司", "unitState": "0206valid", "unitStateDis": "已生效", "unitType": "01company", "unitTypeName": "公司", "unitXlocation": "114.424314", "unitYlocation": "30.606697", "unitsName": "武汉文化传媒有限公司", "unitsSname": "武汉文化传媒", "validdate": "2019 - 12 - 01" }]
                        }
                    ]
                }
            }
            if (res.data.content[0].hasOwnProperty('value')) {
                let mapData = res.data.content[0].value
                let mapArr = []
                t.changeMapArr = []
                mapData.forEach((item) => {
                    let obj = {}
                    let positionArr = []
                    positionArr.push(item.unitXlocation, item.unitYlocation)
                    if (item.unitIfDefault === '1') { // 显示默认当前的公司
                        obj['icon'] = t.mapImage1
                    } else {
                        obj['icon'] = t.mapImage
                    }
                    obj['position'] = positionArr
                    obj['id'] = item.id
                    obj['mapName'] = item.compSnameCnDis
                    obj['mapNumber'] = item.unitNumber
                    obj['unitIfDefault'] = item.unitIfDefault
                    mapArr.push(obj)
                    if (item.unitIfDefault === '1') {
                        t.form.careerCompDis = item.compSnameCnDis
                        t.form.careerComp = item.id
                        t.unitXlocation = Number(item.unitXlocation)
                        t.unitYlocation = Number(item.unitYlocation)
                        // t.$store.commit('inventoryPortaritSave/setInventoryEmpId', item.id)
                    }
                })
                console.log(mapArr, "mapArr")
                t.changeMapArr = mapArr
                t.initMap(mapArr)
            }
            // })
        },
        /*
         弹出选择
        */
        closeModal () {
            this.showModal = false
        },
        changeinput1 (value, id, type) {
            const t = this
            this.form.careerCompDis = value
            this.form.careerComp = id
            this.unitXlocation = 121.467225
            this.unitYlocation = 31.336942
            let mapArr = []
            t.changeMapArr.forEach((item) => {
                let obj = {}
                let positionArr = []
                positionArr.push(item.position[0], item.position[1])
                if (item.id === id) { // 判断选择公司与获取的公司是否相等
                    obj['icon'] = t.mapImage1
                    t.unitXlocation = item.position[0]
                    t.unitYlocation = item.position[1]
                    // t.$store.commit('inventoryPortaritSave/setInventoryEmpId', item.id)
                } else {
                    obj['icon'] = t.mapImage
                }
                obj['position'] = positionArr
                obj['id'] = item.id
                obj['mapName'] = item.mapName
                obj['mapNumber'] = item.mapNumber
                obj['unitIfDefault'] = item.unitIfDefault
                mapArr.push(obj)
            })
            this.initMap(mapArr)
        },
        opencompetType (type) {
            this.showModal = true
            this.modiaContent = type
        },
        talentBack () {
            const t = this
            let mapArr = []
            t.changeMapArr.forEach((item) => {
                let obj = {}
                let positionArr = []
                positionArr.push(item.position[0], item.position[1])
                if (item.id === this.form.careerComp) { // 判断选择公司与获取的公司是否相等
                    obj['icon'] = t.mapImage1
                    t.unitXlocation = item.position[0]
                    t.unitYlocation = item.position[1]
                    // t.$store.commit('inventoryPortaritSave/setInventoryEmpId', item.id)
                } else {
                    obj['icon'] = t.mapImage
                }
                obj['position'] = positionArr
                obj['id'] = item.id
                obj['mapName'] = item.mapName
                obj['mapNumber'] = item.mapNumber
                obj['unitIfDefault'] = item.unitIfDefault
                mapArr.push(obj)
            })
            this.initMap(mapArr)
        },
        talentEnter () {
            this.talentShow = true
        },
        talentLeave () {
            this.talentShow = false
        },
    },
    async created () {
        await remoteLoad('https://webapi.amap.com/maps?v=1.3&key=ae21742cee8e618a1f30efd331f420cb')
        await remoteLoad('https://webapi.amap.com/ui/1.0/main.js')
        setTimeout(() => {
            this.getData()
        }, 500)
    },
}
</script>
<style lang="css"  >
.ivu-table td.demo-table-info-column {
    background-color: #11162f;
    color: #fff;
    border-bottom: 1px solid rgba(0, 144, 255, 1);
}
.m-map {
    min-height: 100%;
    position: relative;
}
.info {
    width: 60px;
    height: 40px;
}
.map_bg {
    width: 100%;
    height: 100%;
    position: relative;
}
.talentImg1 {
    position: absolute;
    right: 0;
    bottom: 0;
    /*width: 60px;*/
    /*height:40px;*/
}
.talentImg1 img {
    width: 100%;
    height: 100%;
}
.amap-marker-label {
    width: 120px;
    display: table;
    background: url("../../../static/largeScreen/new_map_popup.png") no-repeat;
    background-size: 100% 100%;
    background-position: 100% 100%;
    height: 70px;
    color: white;
    border: 0;
    white-space: normal;
    word-break: break-all;
    /* border-radius: 6px; */
    /*position: relative;*/
}
.amap-marker-label:before {
    content: "";
    position: absolute;
    left: 34px;
    bottom: -28px;
    width: 0;
    height: 0;
    border-style: solid dashed dashed;
    border-color: rgba(0, 0, 0, 0) !important;
    overflow: hidden;
    border-width: 15px;
}
.amap-icon {
    /* 修改高德自定义点标记图片出现的显示不完整 */
    overflow: visible !important;
}
.amap-copyright {
    display: none !important;
}
.amap-logo {
    display: none;
}
</style>

