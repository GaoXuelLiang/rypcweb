<template>
    <div class="cover">
        <div class="box"
             id="dragMainBox">
            <Spin size="large"
                  v-if="isSpin"
                  fix></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"
                          style="margin-right: 10px;"></Icon>{{'工资单明细'}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="form_box"
                 ref="scrollBox"
                 @scroll="formScroll">
            <Form ref="upFormData"
                  :model="upFormData"
                  :rules="ruleValidate"
                  :label-width="135">
                <Row>
                    <Col span="11"
                         :offset="index%2 == 0 ? 0:1"
                         v-for="(value,key,index) in dataForm"
                         :key="index">
                    <FormItem :label="key"
                              prop="">
                        <Input :value="value"
                               disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            </div>
        <!-- </Row> -->
        <Row>
            <Col span="22"
                 offset="1">
                    <Row type="flex"
                         justify="end"
                         :class="[isScorllY?'btnSize1':'btnSize']">
                        <Button @click="handleReset">{{$t('button.cal')}}</Button>
                    </Row>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import { isSuccess, deepCopy } from "@/lib/util";
import { getDataLevelUserLoginData } from "@/axios/axios";
export default {
    data () {
        return {
            isScorllY: null,
            isSpin: false,
            ruleValidate: {},
            upFormData: {},
            dataTitle: [],
            dataValue: [],
            dataForm: {}
        };
    },
    components: {
    },
    props: {
    },
    mounted () {
    },
    computed: {
        empId () {
            return this.$store.state.user.empId;
        },
        funId () {
            return this.$store.state.user.funId
        },
    },
    methods: {
        lookSalary (salid, dataId) {
            const t = this;
            t.isSpin = true;
            t.dataId = dataId;
            let data = {
                _mt: this.$global.mt + 'PaysProject.getPage',
                APsort: "id",
                APorder: "asc",
                AProws: 0,
                APpage: 1,
                APffk: `glc${t.funId}`,
                APfunId: t.funId,
                proIspayref: "1",
                proIsuse: "1",
            };
            data.atyId = salid
            for (let v in data) {
                if (data[v] === undefined || data[v] === '') {
                    delete data[v]
                }
            }
            getDataLevelUserLoginData(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].rows) {
                            t.dataTitle = res.data.content[0].rows;
                            console.log(res.data.content[0].rows, 'tttt')
                            t.lookSalaryValue();
                        }
                    }
                })
                .catch(() => {
                    t.isSpin = false;
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                }).finally(() => {
                    t.isSpin = false;
                })

        },
        lookSalaryValue () {
            const t = this;
            t.isSpin = true;
            let data = {
                _mt: this.$global.mt + 'PayList.getById',
                APsort: "id",
                APorder: "desc",
                AProws: 0,
                APpage: 1,
                APffk: `glc${t.funId}`,
                APfunId: t.funId,
                APid: t.dataId,
            };
            for (let v in data) {
                if (data[v] === undefined || data[v] === '') {
                    delete data[v]
                }
            }
            getDataLevelUserLoginData(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0]) {
                            t.dataValue = res.data.content[0];
                            t.filterData()
                        }
                    }
                })
                .catch(() => {
                    t.isSpin = false;
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                }).finally(() => {
                    t.isSpin = false;
                })
        },
        filterData () {
            const t = this;
            let Form = {};
            for (let v of t.dataTitle) {
                if (t.dataValue.hasOwnProperty(v.proParam)) {
                    Form[v.proSalidDis] = t.dataValue[v.proParam]
                }
            }
            t.$nextTick(() => {
                t.dataForm = Form;
            })
        },
        handleReset () {
            this.close();
        },
        close () {
            this.$emit("closeSalaryModel");
            this.clear()
        },
        clear () {
            this.dataTitle = [];
            this.dataValue = [];
        },
        //form滚动事件
        formScroll () {
            let selectDom = document.getElementsByClassName("ivu-select-visible");
            let datePickerDom = document.getElementsByClassName(
                "ivu-date-picker-focused"
            );
            if (selectDom.length > 0 || datePickerDom.length > 0) {
                let modal = document.getElementsByClassName("cover")[0];
                modal.click();
            }
        },
        // 是否超出滚动
        isScorll () {
            this.$nextTick(() => {
                const scroll = document.getElementsByClassName("table_form");
                scroll[0].scrollHeight > scroll[0].clientHeight ||
                    scroll[0].offsetHeight > scroll[0].clientHeight
                    ? (this.isScorllY = true)
                    : (this.isScorllY = false);
            })
        },
    }
};
</script>
<style lang="scss" scoped>
@import "~@/sass/updateAndAdd.scss";
.cover .box .form[data-v-44a257f4] {
    overflow-y: hidden;
}
/deep/ .btnSize {
    margin: 20px 0;
    padding-right: 7px;

    button {
        margin-left: 10px;
    }
}
// @import "~@/sass/mainChildUpdate.scss";
// .option-main {
//     position: fixed;
//     overflow: auto;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     z-index: 999;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: rgba(0, 0, 0, 0.5);
//     -webkit-overflow-scrolling: touch;
//     outline: 0;
//     min-width: 1000px;
//     overflow: auto;
//     .form_box {
//         position: relative;
//         width: 1000px;
//         background-color: #fff;
//         padding: 60px 20px 0px 20px;
//         border-radius: 10px;
//         .form {
//             max-height: 500px;
//             overflow-y: auto;
//             .speTip {
//                 background: lightseagreen;
//             }
//         }
//         .title {
//             display: flex;
//             position: absolute;
//             height: 40px;
//             width: 100%;
//             line-height: 40px;
//             justify-content: space-between;
//             align-items: center;
//             padding-left: 20px;
//             top: 0;
//             border-bottom: 1px solid #efefef;
//             left: 0;
//             .title-text {
//                 font-weight: bold;
//                 font-size: 14px;
//             }
//         }
//     }
// }
</style>
