<template>
    <div class="table">
        <Row>
            <i-col span="24">
                <!--<card style="margin: 0">-->
                <Row style="width: 100%;">
                    <div class="homePageLeft">
                        <Row>
                            <toDoList></toDoList>
                            <!-- <quickMove></quickMove>
                            <CareerPlanningPie></CareerPlanningPie>
                                           <calendarList></calendarList>
                            <Row style="display: flex;width: 100%">
                                <Row style="width: 70%">
                                                       <information></information>
                                    <employees></employees>
                                </Row>
                                <Row style="width: 35%">
                                                       <workOrder></workOrder>
                                    <check></check>
                                </Row>
                            </Row> -->
                        </Row>
                    </div>
                    <!--          <div class="homePageRight">-->
                    <!--            <Row style="display: flex;flex-wrap: wrap">-->
                    <!--              <employees></employees>-->
                    <!--              <mailMsg></mailMsg>-->
                    <!--            </Row>-->
                    <!--          </div>-->
                </Row>
                <!--</card>-->
            </i-col>
        </Row>
    </div>
</template>
<script>
import toDoList from './toDoList'
import calendarList from './calendarList'
import employee from './employee'
import quickMove from './quickMove'
import employeeId from './employeeId'
// import information from './information'
import check from './check'
// import workOrder from './workOrder'
import employees from './employees'
import mailMsg from './mailMsg'
import CareerPlanningPie from './careerPlanning/careerPlanningPie'
export default {
    data () {
        return {
            tableheight: document.body.offsetHeight - 122,
            col1Height: '',
            col2Height: '',
        }
    },
    components: {
        toDoList, // 待办事项
        calendarList, // 我的任务
        employee,  // 员工人数
        quickMove, // 快捷操作
        mailMsg, //  我的邮件
        employeeId, //  我的邮件
        // information, //  信息公示
        check, //  当月面试人数
        // workOrder, //  我的工单
        employees, //  右边员工总数
        CareerPlanningPie,
    },
    mounted () {
        if (this.tableheight < 550) {
            this.col1Height = this.tableheight - 50
            this.col2Height = this.tableheight - this.col1Height
        } else {
            this.col1Height = this.tableheight - (177 * 2) + 40
            this.col2Height = this.tableheight - this.col1Height - 20
        }
    },
    computed: {
        roleType () {
            return this.$store.state.user.roleType
        },
    },
    watch: {
    },
    methods: {
    },
}
</script>
<style lang="scss" scoped>
.col {
    padding: 0 10px 10px 0;
}
.table {
    height: 100%;
}
.homePageRight {
    /*flex: 1;*/
    width: 225px;
    height: 100%;
}

.homePageLeft {
    /*width: 150px;*/
    /*height: 150px;*/
    height: 100%;
    flex: 1;
}
</style>
