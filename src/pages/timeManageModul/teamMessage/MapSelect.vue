<template>
  <div id="isShowMap" v-show="isShow" class="map">
    <div class="title-text">
      <!-- <Button type="text" @click="closeMap" style="float:right;">
        <Icon type="md-close" size="20"></Icon>
      </Button> -->
      <img :src="closeImg" alt="" @click="closeMap">
    </div>
    <div id="container" class="container"></div>
    <div class="search-wrapper">
      <div class="tip">
        <input type="text" placeholder="请输入关键字：(选定后搜索)" v-model.trim="searchValue"/>
      </div>
      <ul class="search-list" v-show='searchResult.length'>
        <li v-for="(item, index) in searchResult" :key="index" @click="selectAddress(item)" class="text-ellipsis">
          <span v-text="item.name"></span>
          <span class="text-gray" v-text="item.address"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

  export default {
    props: {
      // 位置信息
      position: {
        type: Object,
        default: {
          adcode: '', // 区代码
          name: '上海', // 地区名称
          latitude: 116.40, // 经度
          longitude: 39.91, // 纬度
        }
      }
    },
    data() {
      return {
        closeImg: require('../../../../static/img/img_close.png'),
        isShow: false, // 显示隐藏地图浮层
        mapObj: null,
        searchValue: '',
        searchResult: [],
        searchResultTem: [],
        map: null,
        wholeLoading: false,
      };
    },
    computed: {
      placeSearch() {
        return new AMap.PlaceSearch({ // 构造地点查询类
          pageSize: 15,
          pageIndex: 1,
          city: '021', // 城市
          map: this.map,
        });
      },
    },
    mounted() {
      this.init();
    },
    methods: {
      selectAddress(item) {
        try {
          this.map.setZoomAndCenter(14, [item.location.lng, item.location.lat]);
          this.$emit('set-position', {
            adcode: Number(item.adcode),
            name: item.name,
            latitude: item.location.lat,
            longitude: item.location.lng,
          });
          this.isShow = false; // 关闭地图框false;
          // this.$emit('set-position-error', '获取地址信息失败，请重试');
        } catch (e) {
          console.log('获取指定位置信息异常：', e);
          this.$emit('set-position-error', '获取地址信息失败，请重试');
        }
      },
      // 显示map
      showMap() {
        this.isShow = true;
      },
      // 关闭map
      closeMap() {
        this.isShow = false;
        this.$emit('close');
      },
      callback(status, result) {
        this.searchResultTem = [];
        this.searchResult = [];
        if (status === 'complete' && result.info === 'OK') {
          console.log(result);
          this.searchResultTem = result.poiList.pois;
          this.searchResultTem.forEach((sig) => {
            if (sig.adcode) this.searchResult.push(sig); // 没有区id的删掉2018.3.16
          });
          const item = this.searchResult[0];
          this.map.setZoomAndCenter(14, [item.location.lng, item.location.lat]);
        }
      },
      /**
       * 定位当前位置并显示地图浮层
       */
      init() {
        if (!this.map) {
          this.map = new AMap.Map('container', {
            resizeEnable: true,
            center: [this.latitude || 116.40, this.longitude || 39.91], // 地图中心点
            zoom: 13, // 地图显示的缩放级别
            keyboardEnable: false
          });
        }
        this.map.plugin('AMap.Geolocation', () => {
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
            convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        // 显示定位按钮，默认：true
            buttonPosition: 'RB',    // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          this.map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', this.onComplete); // 返回定位信息
          AMap.event.addListener(geolocation, 'error', this.onError);      // 返回定位出错信息
        });
        // 初始化搜索框
        AMap.plugin(['AMap.PlaceSearch'], () => {
          this.searchAddress(this.position.name);
        });
      },
      searchAddress(value) {
        if (value === '' || value === undefined) {
          return;
        }
        this.placeSearch.search(value, this.callback);
      },
      // 解析定位结果
      onComplete(data) {
        let str = '定位成功';
        str += `<br>经度：${data.position.getLng()}`;
        str += `纬度：${data.position.getLat()}`;
        if (data.accuracy) {
          str += `精度：${data.accuracy} 米`;
        }
        // 如为IP精确定位结果则没有精度信息
        str += `是否经过偏移：${(data.isConverted ? '是' : '否')}`;
        console.log(str);
      },
      // 解析定位错误信息
      onError(data) {
        console.log('定位失败---', data);
      },
    },
    watch: {
      position(newVal) {
        this.searchValue = newVal.name;
      },
      searchValue(newVal) {
        this.searchAddress(newVal);
      }
    },
    components: {
    }
  };

</script>

<style lang="scss">
  .map {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    .title-text {
      font-weight: bold;
      font-size: 14px;
      padding: 20px;
      padding-top: 0;
      position: absolute;
      right: 20px;
      top: 10px;
      z-index: 100;
      width: 40px;
      height: 40px;
      background-color: #fff;
      text-align: center;
      border-radius: 50%;
      img{
        width: 40px;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
      }
    }
    .left-back {
      position: absolute;
      top: 3px;
      left: 3px;
      z-index: 999;
      width: 30px;
      height: 30px;
    }
    .container {
      width: 100%;
      height: 100%;
    }
    .search-wrapper {
      width: 400px;
      position: absolute;
      top: 30px;
      left: 60px;
      .tip{
        color: #333;
        border: 1px solid silver;
        box-shadow: 3px 4px 3px 0 silver;
        line-height: 30px;
        input[type='text'] {
          height: 35px;
          border: 0;
          padding: 0 10px;
          width: 100%;
          outline: none;
        }
      }
      .search-list{
        overflow: auto;
        position: absolute;
        width: 100%;
        top: 40px;
        left: 0;
        padding: 10px;
        font-size: 14px;
        z-index: 10000;
        background-color: #fff;
        li{
          padding-bottom: 4px;
          padding-top: 4px;
          &:last-child{
            border: none;
          }
          .text-gray{
            padding-left: 6px;
          }
        }
      }
    }
  }
  .text-ellipsis{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

</style>
