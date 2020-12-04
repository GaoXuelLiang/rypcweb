<template>
  <div class="cover modal">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              {{$t('lang_sysform.sysForm.option')}}
            </MenuItem>
            <MenuItem name="content" v-show="$store.state.sysData.mainId">
              {{$t('lang_sysform.sysForm.content')}}
            </MenuItem>
            <MenuItem name="field" v-show="$store.state.sysData.mainId">
              {{$t('lang_sysform.sysForm.field')}}
            </MenuItem>
          </Menu>
        </i-col>
        <i-col class="meau-right" span="19">
          <div class="title">
            <div class="title-text">
              <Icon type="ios-bookmark" size="16"></Icon>
              {{title}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="md-close" size="20"></Icon>
            </Button>
          </div>
          <div class="menu_content">
            <mOption v-show="option" ref="option" @close="handleReset"></mOption>
            <mContent v-show="content" ref="content" ></mContent>
            <field v-show="field" ref="field"></field>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './option'
  import mContent from './content'
  import field from './field'

  export default {
    data() {
      return {
        title: this.$t('lang_sysform.sysForm.option'),
        active: 'option',
        option: true,
        content: false,
        field: false,
      }
    },
    components: {
      mOption,
      mContent,
      field,
    },
    props: {
      logType: String,
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
        this.$refs.option.getdata()
      },
      reset() {
        this.option = true
        this.content = false
        this.field = false
        this.active = 'option'
        this.title = this.$t('lang_sysform.sysForm.option')
        this.$refs.option.clear()
        this.$refs.content.clear()
      },
      pageTo(name) {
        this.active = name
        this.option = false
        this.content = false
        this.field = false
        switch (name) {
          case 'option':
            this.title = this.$t('lang_sysform.sysForm.option')
            this.$refs.content.clear()
            break
          case 'content':
            this.title = this.$t('lang_sysform.sysForm.content');
            this.$refs[name].getTableHeight(); 
            break
          case 'field':
            this.title = this.$t('lang_sysform.sysForm.field')
            this.$refs.content.clear();
            this.$refs[name].getTableHeight(); 
            break
        }
        this[name] = true
        if (name !== 'option') {
          this.$refs[name].getdata(1)
        } else {
          this.$refs[name].getdata()
        }
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
