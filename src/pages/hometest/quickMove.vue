<template>
    <div class="card_box">
        <card :bordered="false"
              class="card">
            <p slot="title"
               class="title"><span class="title-tip"></span><span>{{$t('lang_homePage.quickMove.title')}}</span></p>
            <a href="#"
               slot="extra"
               @click="openUp()"
               style="font-size:12px">
                {{$t('lang_homePage.quickMove.set')}}
            </a>
            <div class="block short">
                <div class="fast_block">
                    <div class="fast_item"
                         @click="openFun1(item.funLancodeDis , item.id , item.funCode, item.funAction)"
                         v-for="(item , index) in sysmlvarComment.value"
                         :key="index">
                        <div class="item_admin"
                             :style="'background-image: url(../../../static/indexImg/'+item.authFunImg +')'"></div>
                        <div class="item_title">
                            {{item.funLancodeDis}}
                        </div>
                    </div>
                </div>
            </div>
        </card>
        <Modal v-model="openUpdate"
               :width="0"
               :height="0"
               :closable="false">
            <transition name="fade">
                <editQuickMove v-if="openUpdate"
                               @getIndexFun="getIndexFun"
                               @close="close"
                               @changeinput="changeinput"
                               ref="editQuickMove"></editQuickMove>
            </transition>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import editQuickMove from './editQuickMove'
import { isSuccess, deepCopy } from '../../lib/util'
import Bus from '../../lib/bus'
import { getDataLevelUserLoginData } from '../../axios/axios'

export default {
    data () {
        return {
            openUpdate: false,
            sysmlvarComment: [],
            indexFun: [],
            indexFun2: '',
            indexFun3: '',
            indexFun4: '',
            indexFun5: '',
            indexFun6: '',
        }
    },
    props: {
        roleType: String,
        //      height: String,
    },
    computed: {
        authFunType () {
            return this.$store.state.user.roleType
        },
    },
    components: {
        editQuickMove,
    },
    mounted () {
        this.getIndexFun()
    },
    methods: {
        openFun1 (name, id, code, funAction) {
            const t = this
            const tag = {
                title: name,
                path: '/' + funAction,
                name: funAction,
                query: { id: id, code: code },
                state: true
            }
            this.$store.commit('increateTag', tag)
            t.$router.push({
                path: funAction, query: {
                    id: id,
                    code: code,
                    state: true
                }
            })
        },
        openUp () {
            const t = this          
            t.openUpdate = true
            this.$nextTick(() => {
                // console.log(this.$refs.editQuickMove);
                this.$refs.editQuickMove.getData();
            })
        },
        close () {
            const t = this
            t.openUpdate = false
        },
        getIndexFun () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'SysFunctions.getIndexList',
                APauthFunType: t.$store.state.user.roleType,
                APfunId: ''
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content.length > 0) {
                        this.sysmlvarComment = res.data.content[0]
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        changeinput (name, id) {
            const t = this
            t.rolegrpCode = name
            t.rolegrpCname = id
        },
    },
    watch: {
        // authFunType (value) {
        //     this.getIndexFun()
        // },
        // $lang (value) {
        //     setTimeout(() => {
        //         this.getIndexFun()
        //     }, 500)
        // },
    },
}
</script>
<style lang="scss" scoped>
.card_box {
    height: 100%;
    width: 100%;
    .card {
        width: 100%;
        height: 100%;
    }
    /deep/ .ivu-card-body {
        height: calc(100% - 37px);
    }
}
.item_fun_img {
    height: 100%;
    width: 100%;
}
.item_admin {
    border-radius: 50%;
    transition: all 0.3s;
    height: 100%;
    width: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
}
.short {
    height: 100%;
}
// .height {
//     height: 280px;
// }
.fast_block {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 12px;
    flex-wrap: wrap;
    overflow: auto;
    .fast_item {
        width: 25%;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        margin-top: 30px;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        .item_admin {
            height: 50px;
            width: 50px;
            border-radius: 50%;
        }
        .item_title {
            height: 20px;
            width: 100%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .fast_item:hover .item_icon div {
        background-color: rgba(255, 255, 255, 0.3);
    }
}
.title {
    display: flex;
    justify-content: start;
    align-items: center;
}
/deep/ .ivu-modal-footer {
    border-top: none !important;
}
</style>
