<template>
  <div class="org-tree-container">
    <div class="org-tree" :class="{horizontal, collapsable}" @click="addSpan">
      <org-tree-node
        :data="data"
        :props="props"
        :horizontal="horizontal"
        :label-width="labelWidth"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-class-name="labelClassName"
        @on-expand="$emit('on-expand', $event)"
        @on-node-click="(e, data) => {$emit('on-node-click', e, data) }"
      ></org-tree-node>
    </div>
  </div>
</template>

<script>
import render from './node'
import { Span } from './span.js'

export default {
  name: 'Vue2OrgTree',
  components: {
    OrgTreeNode: {
      render,
      functional: true
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    props: {
      type: Object,
      default: () => ({
        label: 'label',
        expand: 'expand',
        children: 'children'
      })
    },
    horizontal: Boolean,
    collapsable: Boolean,
    renderContent: Function,
    labelWidth: [String, Number],
    labelClassName: [Function, String]
  },
  created () {
    // setTimeout(this.addSpan,6000);
  },
  methods:{
    addSpan(){
      // Span();
      // let aaa = document.getElementsByClassName('org-tree-node-children');
      // let bbb = document.getElementsByClassName('org-tree-node');
      // let ccc = document.createElement('span')
      // ccc.innerHTML = 'span节点'
      // for( let i = 0;i < bbb.length;i++ ){
      //   console.log(aaa[0])
      //   aaa[0].insertBefore(ccc.cloneNode(true),bbb[i]);
      // }
    }
  }
}
</script>

<style lang="less">
  @import '../../../static/orgtree/org-tree.less';
</style>
