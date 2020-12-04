<!---->
<template>
  <div style="width: 100%;height:90%">
    <div class="cap_model">
      <div class="cap mar2">
        <img class="cap_img" src="../../../../../static/largeScreen/people_all.png" draggable="false" alt="">
        <div class="cap_inner">
          <div class="white1">
            <div class="bot" >
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <div class="bot">员工总数（人）</div>
          </div>
          <div style="color: #F4726D"><span class="dLink" @click="getDetail()" style="font-size: 26px;">{{staffList.empTotalCount}}</span></div>
        </div>
      </div>
      <div class="cap mar2">
        <img class="cap_img" src="../../../../../static/largeScreen/people_enter.png" draggable="false" alt="">
        <div class="cap_inner">
          <div class="white1">
            <div class="bot" >
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <div class="bot">本月入职（人）</div>
          </div>
          <div style="color: #58C46C"><span style="font-size: 26px;">{{staffList.empProCount}}</span></div>
        </div>
      </div>
      <div class="cap mar2">
        <img class="cap_img" src="../../../../../static/largeScreen/people_become.png" draggable="false" alt="">
        <div class="cap_inner">
          <div class="white1">
            <div class="bot" >
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <div class="bot">本月转正（人）</div>
          </div>
          <div style="color: #7268E5"><span style="font-size: 26px;">{{staffList.empNewhireCount}}</span></div>
        </div>
      </div>
      <div class="cap ">
        <img class="cap_img" src="../../../../../static/largeScreen/people_pass.png" draggable="false" alt="">
        <div class="cap_inner">
          <div class="white1">
            <div class="bot" >
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <div class="bot">本月离职（人）</div>
          </div>
          <div style="color: #F4B24E"><span style="font-size: 26px;">{{staffList.empDisCount}}</span></div>
        </div>
      </div>
    </div>

    <detail v-show="showDetail" ref="detail" @closeInfo="closeInfo"
      :reportType="reportType" :empcompHirecompany="inventoryEmpId">
    </detail>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess } from '../../../../lib/util'
  import detail from './detail'

  export default {
    data() {
      return {
        staffList: {
          empTotalCount: '',
          empProCount: '',
          empNewhireCount: '',
          empDisCount: '',
        },
        showDetail: false,
        reportType: 'total',
      }
    },
    computed: {
      inventoryEmpId() {
        return this.$store.state.inventoryPortaritSave.inventoryEmpId
      },
    },
    watch: {
    },
//    mounted() {
//      this.getData()
//    },

    components: {
      detail,
    },
    methods: {
      getData() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptEmpChg.rtnEveryStateEmp',
          funId: '1',
          logType: '员工数据查询',
        }
        data.selectCompid = t.inventoryEmpId
        getDataLevelUserLogin(data).then((res) => {
          t.staffList = res.data.content[0]
        }).catch((err) => {
          console.log(err)
        })
      },
      getDetail() {
        const t = this
        t.showDetail = true
        t.$refs.detail.getData()
      },
      closeInfo() {
        const t = this
        t.showDetail = false
      },
    },
  }
</script>
<style lang="scss" scoped>
.white1 {
 color: rgba(255,255,255,1)
}
@media screen and (min-width:1400px) {
  .cap_model {

    .cap {
      padding: 10px 0 10px 30px !important;
      .cap_img {
        width: 30% !important;
      }
      .cap_inner {
        width: 67% !important;
      }
    }
  }
  .mar2 {
    margin-right: 30px !important;
  }
}
.mar2 {
  margin-right: 1%;
}
.cap_model {
  display: flex;
  width:100%;
  height:100%;
  flex-wrap: wrap;
  align-items: center;
  .cap {
    background: url('../../../../../static/largeScreen/people_title.png') no-repeat;
    background-size: 100% 100%;
    background-position: 100% 100%;
    padding: 10px 0 10px 1%;
    flex: 1;
    .cap_img {
      width: 25%;
      display: inline-block;
      max-width: 60px;
    }
    .cap_inner {
      width: 70%;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
    }
  }
}
.bot {
  display: inline-block;
  vertical-align: bottom;
}
.dot {
  width: 6px;
  height: 6px;
  margin: 2px;
  background-color: #FF7300;
  border:1px solid rgba(253,228,17,1);
}
.dLink {
  cursor:pointer
}
</style>

