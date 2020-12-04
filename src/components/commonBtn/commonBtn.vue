<template>
    <div class="btnList">
        <Button :type="item.type"
                v-for="(item,index) in btnList"
                :key="index"
                :style="item.code=='button_query'?'width:56px':''"
                @click="openUp(item.code)"
                :loading="item.code=='button_query'?loading:false"
                class="btnStyle">
            <span v-if="item.code=='button_query'&&!loading">查询</span>
            <span v-if="item.code!=='button_query'">{{item.name}}</span>
        </Button>
    </div>
</template>
<style  lang="scss" scoped>
</style>
<script>
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
export default {
    filters: {
        transitionCode (value) {
            return value
        },
    },
    data () {
        return {
            btnList: [
                {
                    name: "查询",
                    type: "info",
                    code: "button_query"
                }
            ],
            oprBtn: [],
            loading: false
        }
    },
    props: {
    },
    mounted () {
        this.getBtnList();
    },
    methods: {
        getBtnList () {
            const t = this;
            const data = {
                _mt: this.$global.mt + 'AuthRolePower.getFunBtnByRole',
                AProleType: localStorage.roleType,
                APlogType: '权限按钮的控制',
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    console.log("123")
                    try {
                        res.data.content[0].value.map(item => {
                            if (item.btnLancode === 'button_y_upd' || item.btnLancode === 'button_view') {
                                t.oprBtn.push(item)
                            } else {
                                let type = "primary";
                                switch (item.btnLancode) {
                                    case "button_add":
                                        type = 'warning'
                                        break
                                    case "button_del":
                                        type = 'error'
                                        break
                                    case "button_invalid":
                                        type = 'error'
                                        break
                                    case "button_confirm":
                                        type = 'success'
                                        break
                                    case "button_submit":
                                        type = 'success'
                                        break
                                    case "button_init":
                                        type = "warning";
                                        break
                                }
                                var obj = {
                                    name: item.btnLanCn,
                                    type: type,
                                    code: item.btnLancode
                                }
                                t.btnList.push(obj);
                            }
                        })
                        console.log(t.oprBtn, " t.oprBtn")
                        this.$emit("operatorBtn", t.oprBtn)
                    } catch (err) {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    }
                }
            }).catch((err) => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        openUp (code) {
            this.$emit("openUp", code)
        }
    },
}
</script>
<style lang="scss" scoped>
.btnList {
    display: inline-block;
    .btnStyle {
        margin-right: 10px;
    }
}
</style>
