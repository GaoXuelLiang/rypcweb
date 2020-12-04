<template>
  <div class="cover modal">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="updPlatDocTemp">
              {{$t('lang_platdoc.platDoc.title1')}}
            </MenuItem>
            <MenuItem name="docTempVar" v-show="$store.state.docTemp.mainId">
              {{$t('lang_platdoc.platDoc.title2')}}
            </MenuItem>
          </Menu>
        </i-col>
        <i-col class="meau-right" span="19">
          <div class="title">
            <div class="title-text">
              <Icon type="ios-bookmark" size="16"></Icon>{{title}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="md-close" size="20"></Icon>
            </Button>
          </div>
            <div class="menu_content">
            <updPlatDocTemp v-show="updPlatDocTemp" ref="updPlatDocTemp" @closeModel="handleReset"></updPlatDocTemp>
            <docTempVar v-show="docTempVar" ref="docTempVar" ></docTempVar>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import updPlatDocTemp from './updPlatDocTemp'
  import docTempVar from './docTempVar'

  export default {
    data() {
      return {
        title: this.$t('lang_platdoc.platDoc.title1'),
        active: 'updPlatDocTemp',
        updPlatDocTemp: true,
        docTempVar: false,
      }
    },
    components: {
      updPlatDocTemp,
      docTempVar,
    },
    methods: {
      handleReset() {
        this.reset()
        this.$emit('closeUp')
      },
      /*
       * Option修改时初始数据
       * */
      getOptionData() {
        this.$refs.updPlatDocTemp.getdata()
      },
      reset() {
        this.updPlatDocTemp = true
        this.docTempVar = false
        this.active = 'updPlatDocTemp'
        this.title = this.$t('lang_platdoc.platDoc.title1')
        this.$refs.updPlatDocTemp.clear()
      },
      pageTo(name) {
        this.active = name
        this.updPlatDocTemp = false
        this.docTempVar = false
        switch (name) {
          case 'updPlatDocTemp': this.title = this.$t('lang_platdoc.platDoc.title1')
            break
          case 'docTempVar': this.title = this.$t('lang_platdoc.platDoc.title2');
            this.$refs[name].getTableHeight();
            break
        }
        this[name] = true
        this.$refs[name].getdata()
      },
    },
  }
</script>
<style>
  .ivu-menu-vertical.ivu-menu-light:after{
    background-color: transparent;
  }
</style>
<style lang="scss" scoped>
  @import "../../../sass/mainChildUpdate.scss";
</style>
