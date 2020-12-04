<template>
    <div class="warningNotice">
        <div class="notice_box">
            <span class="move_content"
                  v-show="noNotice">
                {{noticeContent}}
            </span>
            <audio v-if="audio1"
                   loop
                   controls
                   autoplay="autoplay"
                   hidden
                   src="../../../static/audios/alarm1.wav">
            </audio>
            <audio v-if="audio2"
                   loop
                   controls
                   autoplay="autoplay"
                   hidden
                   src="../../../static/audios/alarm2.wav">
            </audio>
        </div>
    </div>
</template>
<script>
import { getAlarmTableData } from '../../pages/rest/commonRest'
export default {
    data () {
        return {
            rows: 10,
            page: 1,
            sort: 'createTime',
            order: 'desc',
            scroll: false,
            noNotice: false,
            noticeContent: "",
            companyId: this.$route.query.id,
            // 报警信息数组
            alarmArr: [],
            // 音频的开关控制
            audio1: false,
            audio2: false
        };
    },
    methods: {
        getNotice () {
            const t = this
            let searchObj = {
                isRead: 1,
                companyId: t.companyId
            }
            getAlarmTableData(t, 'skRepAlarm.selectList', searchObj, t.getNoticeCallback)
        },
        getNoticeCallback (data) {
            if (data.rows.length > 0) {
                let newNotice = data.rows[0];
                this.audio1 = false;
                this.audio2 = false;
                this.$nextTick(() => {
                    this.noticeContent = `${newNotice.alarmPlace}${newNotice.createTime}发生${newNotice.alarmRankDis}，请尽快处理!`
                    if (!this.scroll) {
                        // 循环遍历并赋值当前的警告信息数组
                        for (let i = 0; i < 3; i++) {
                            if (data.rows[i]) {
                                this.alarmArr.push(data.rows[i]);
                                //新加后
                                let arr = data.rows[i].alarmRank;
                                if (arr == '01alarmRank') {
                                    this.audio1 = true;
                                } else if (arr == '02alarmrank' || arr == '03alarmrank') {
                                    this.audio2 = true;
                                }
                            }
                        }
                        this.marquee();
                    }

                    this.noNotice = true;
                })
            } else {
                this.noNotice = false;
            }
        },
        marquee () {
            const t = this;
            t.scroll = true;
            t.$nextTick(() => {
                let box_width = document.querySelector('.notice_box').offsetWidth;
                let content_width = document.querySelector('.move_content').offsetWidth;
                let center_d = box_width / 2 + content_width / 2;
                let all_d = box_width + content_width;
                document.querySelector('.move_content').style.transition = '5s'
                document.querySelector('.move_content').style.transform = 'translateX(-' + center_d + 'px)';
                setTimeout(() => {
                    document.querySelector('.move_content').style.transform = 'translateX(-' + all_d + 'px)';
                }, 10000)
                setTimeout(() => {
                    t.scroll = false;
                }, 15000);
            })
        }
    },
    mounted () {
    },
    watch: {
        scroll (val) {
            if (!val) {
                document.querySelector('.move_content').style.transition = '0s'
                document.querySelector('.move_content').style.transform = '';
                this.marquee();
            }
        },
    }
};
</script>
<style lang="scss" scoped>
.warningNotice {
    width: 100%;
    padding: 0 40px;
    .notice_box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        height: 20px;
        position: relative;
        overflow: hidden;
        img {
            width: 22px;
            height: 18px;
            transition: 0.5;
        }
        span {
            padding-left: 27px;
            font-size: 16px;
            color: #ee434b;
            position: absolute;
            left: 100%;
            top: 0;
            width: max-content;
            background: url("../../../static/largeScreen/trumpet.png") 0% center
                no-repeat;
        }
    }
}
</style>