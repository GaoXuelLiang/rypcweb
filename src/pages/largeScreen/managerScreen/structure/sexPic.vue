<template>
  <div class="sex">
    <div class="div1">
      <img src="../../../../../static/largeScreen/team_woman.png" alt="">
      <div class="color1 div2 "><span>女</span><span>{{echartsData.trptProportion2}}</span></div>
    </div>
    <div class="div1">
      <img src="../../../../../static/largeScreen/team_man.png" alt="">
      <div class="color2 div2"><span>男</span><span>{{echartsData.trptProportion1}}</span></div>
   </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess,getUrlKey } from '../../../../lib/util'
  export default{
    data() {
      return {
        
      }
    },
    components: {
      
    },
    props: {
      echartsData: Object
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
      }
    },
    mounted() {
    },
    
    methods: {
      getData() {
        const t = this
        
      },
      
    },
  }
 
</script>
<style lang="scss" scoped>
.color1 {
  color: #F8B52B;
}
.color2 {
  color:#369AE1;
}
.margint {
  margin-top: 4%;
  align-items: center;
}
.sex {
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  .div1 {
    width: 50%;
  }
  .div2 {
    text-align: center;
    margin-top: 2%;
    span:first-child {
      margin-right: 5px;
    }
  }
}

@media screen and (max-width:1366px) {
  
}




</style>
