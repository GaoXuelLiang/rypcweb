/**
 * Created by Jiangxu on 2019/05/24
 */
export default {
  abstract: true,
  props: {
    title: {
      type: String,
      default: '操作'
    }
  },
  data () {
    return {
      height: 0,
      isShow: false
    }
  },
  render: function (createElement) {
    if (this.$slots.default) {
      this.height = this.$slots.default[0]
    } else {
      this.height = 0
    }
    return createElement(
      'div',
      [
        createElement(
          'div',
          {
            class: ['div1'],
            style: {
              height: '10px',
              width:'100%',
            },
          },
        ),
        createElement(
          'div',
          {
            on: {
              click: this.clickHandler
            },
            style: {
              display:'flex',
              width:'100%',
              justifyContent: 'space-between',
              padding: '0px 20px 0 20px',
              fontSize: '12px',
              background: 'white',
              cursor: 'pointer',
            },
          },
          [
            createElement(
              'div',{
                style: {
                  display:'flex',
                  alignItems: 'center'
                },
              },
              [
                createElement('img',{
                  attrs: {
                    src: this.isShow ?  '../../../static/lineChat/s.png' : '../../../static/lineChat/x.png'
                  },
                  style:{
                    width: this.isShow ? '11px' : '4px',
                    height:this.isShow ? '5px' : '11px',
                    marginRight: '10px'
                  }
                },),
                createElement('div',{},this.title),
              ]),
          ]
        ),
        createElement(
          'div',
          {
            class: ['collapsible'],
            style: {
              height: 0,
              transition: '0.3s height ease-in-out',
              overflow: 'hidden',
              // padding: '0 20px',
              background: 'white',
              display: 'flex',
              alignItems: 'center'
            },
            ref: 'myRef',
            // on:{
            //   mouseover: this.changeColor,
            //   mouseleave: this.removeColor
            // }
          },
          this.$slots.default
        ),
      ]
    )
  },
  methods: {
    clickHandler () {
      this.isShow = !this.isShow
      if (this.isShow) {
        let height = this.height.elm.offsetHeight
        this.$refs.myRef.style.height = `${height}px`
        this.$refs.myRef.addEventListener('transitionend', () => {
          this.$emit('openEnd')
        })
      } else {
        this.$refs.myRef.style.height = 0
        this.$refs.myRef.addEventListener('transitionend', () => {
          this.$emit('closeEnd')
        })
      }
    },
    // changeColor() {
    //   this.$refs.myRef.style.backgroundColor = '#F2F2F2'
    // },
    // removeColor() {
    //   this.$refs.myRef.style.backgroundColor = 'white'
    // }
  }
}
