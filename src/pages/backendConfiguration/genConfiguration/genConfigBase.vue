<template>
  <div class="cover modal">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
                代码配置信息
            </MenuItem>
            <MenuItem name="content" v-show="$store.state.genConfigJS.mainId">
                字段配置信息
            </MenuItem>
          </Menu>
        </i-col>
        <i-col class="meau-right" span="19">
          <div class="title">
            <div class="title-text">
              <Icon type="ios-bookmark" size="16"></Icon>
              {{logType}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="md-close" size="20"></Icon>
            </Button>
          </div>
          <div class="menu_content">
            <mOption v-show="option" :logType="logType" ref="option" :id="id" @close="handleReset" @update="update"  @newdata="newdata"></mOption>
            <mContent v-show="content" :logType="logType" ref="content" :id="id"></mContent>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>

<script>
import mOption from './editConfig'
import mContent from './genConfigAttrChild'
export default {
    data(){
        return {
            active:'option',
            option:true,
            content:false,
        }
    },
    props:{
        id:Number,
        logType:String
    },
    components:{
        mOption,
        mContent
    },
    methods:{
        pageTo(name){
            this.option = false
            this.content = false
            this.active = name
            this[name] = true
            if(name == 'content'){
              this.$refs.content.getTableHeight()
              this.$refs.content.getData()
            }
        },
        getOptionData(){
          this.$refs.option.getData()
        },
        update(data) {
          this.$emit('update', data)
        },
        newdata(data) {
          this.$emit('getData', data)
        },
        handleReset() {
            this.clear()
            this.$refs.option.clear();
            this.$emit('closeUp')
        },
        clear() {
            this.option = true
            this.content = false
            this.active = 'option'
        },
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../sass/mainChildUpdate.scss";
</style>