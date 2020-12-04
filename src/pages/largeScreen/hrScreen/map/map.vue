<!---->
<template>
    <div class="map_bg"
         style="width: 100%;height:100%;padding: 5px 5px;position: relative">
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
            mapImage: require('../../../../../static/largeScreen/map_icon_other.png'),
            mapImage1: require('../../../../../static/largeScreen/map_icon.png'),
            mapImage2: require('../../../../../static/talents/1.png'),
            mapImage3: require('../../../../../static/talents/2.png'),
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
                    t.$store.commit('inventoryPortaritSave/setInventoryEmpId', e.target.Qi.label.id)
                    t.form.careerCompDis = e.target.Qi.label.mapName
                    t.form.careerComp = e.target.Qi.label.id
                    for (let i = 0; i < mapChangeIcon.length; i++) {
                        mapChangeIcon[i].setIcon(t.mapImage)
                    }
                    e.target.setIcon(t.mapImage1)
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
            const data = {
                _mt: this.$global.mt + 'Talrtphumef.getByUserId',
                logType: '性别分析',
                userId: t.$store.state.user.userId,
                companyId: pubsource.companyId,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (res.data.content[0].hasOwnProperty('value')) {
                    let mapData = JSON.parse(res.data.content[0].value)
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
                            t.$store.commit('inventoryPortaritSave/setInventoryEmpId', item.id)
                        }
                    })
                    t.changeMapArr = mapArr
                    t.initMap(mapArr)
                }
            })
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
                    t.$store.commit('inventoryPortaritSave/setInventoryEmpId', item.id)
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
                    t.$store.commit('inventoryPortaritSave/setInventoryEmpId', item.id)
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
        await this.getData()
        await remoteLoad('https://webapi.amap.com/maps?v=1.3&key=ae21742cee8e618a1f30efd331f420cb')
        await remoteLoad('https://webapi.amap.com/ui/1.0/main.js')
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
    background: url("../../../../../static/largeScreen/map_bg.png") no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
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
    background: url("../../../../../static/largeScreen/new_map_popup.png")
        no-repeat;
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

