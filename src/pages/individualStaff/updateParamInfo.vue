<template>
    <div class="cover">
         <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
        <div class="box">
          
            <div class="title">
                <div class="title-logo">
                    <img src="../../../static/entryImg/huaxiaLogo.png" alt="">
                    <span>欢迎新同学加入~</span>
                </div>
                <div class="title-text">
                    <!-- <Icon type="ios-bookmark"
                          size="16"></Icon> -->
                   个人信息入职登记表
                </div>
                <!-- <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button> -->
            </div>
            <div class="newform" ref="nicework">
                <!-- banner -->
                <div class="banner">
                    <img src="../../../static/entryImg/banner.png" alt="">
                </div>
                <!-- 基本信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <img src="../../../static/entryImg/form_basic.png" alt="">
                        <span>基本信息</span>
                    </div>
                    <Form ref="formValidate"
                                class="form"
                            :model="formValidate"
                            :rules="ruleValidate"
                            :label-width="135">
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="姓名"
                                        prop="empnName">
                                    <Input v-model="formValidate.empnName"
                                        placeholder="请输入姓名"
                                        disabled
                                        ></Input>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="英文名"
                                        prop="empnEname">
                                    <Input v-model="formValidate.empnEname"
                                        placeholder="请输入英文名"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="姓名拼音"
                                        prop="empnPiny">
                                    <Input v-model="formValidate.empnPiny"
                                        placeholder="请输入姓名拼音"></Input>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="曾用名"
                                        prop="empnOld">
                                    <Input v-model="formValidate.empnOld"
                                        placeholder="请输入曾用名"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="证件类型"
                                        prop="empnIdcaype">
                                <Select v-model="formValidate.empnIdcaype"
                                            @on-change='empnIdcaypechange'
                                            placeholder="请选择证件类型">
                                        <Option v-for="item in idtypeList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="证件号码"
                                        prop="empnIdcanum">
                                    <Input v-model="formValidate.empnIdcanum"
                                        placeholder="请输入证件号码"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                            <Col span="10"
                                    offset="1">
                                <FormItem label="证件有效开始日期"
                                        prop="empnValsdate">
                                        <DatePicker type="date"
                                            placeholder="请选择证件有效开始日期"
                                            style="width: 100%"
                                            :editable='false'
                                            format="yyyy-MM-dd"
                                            v-model="formValidate.empnValsdate">
                                        </DatePicker>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="证件有效结束日期"
                                        prop="empnValedate">
                                        <DatePicker type="date"
                                            placeholder="请选择证件有效结束日期"
                                            style="width: 100%"
                                            :editable='false'
                                            format="yyyy-MM-dd"
                                            v-model="formValidate.empnValedate">
                                        </DatePicker>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="性别"
                                        prop="empnGender">
                                    <Select v-model="formValidate.empnGender"
                                            placeholder="请选择性别" :disabled="formValidate.empnIdcaype=='01id'">
                                        <Option v-for="item in GenderList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="出生日期"
                                        prop="empnBirthdate">
                                    <DatePicker type="date"
                                                placeholder="请选择出生日期"
                                                style="width: 100%"
                                                :editable='false'
                                                :disabled="formValidate.empnIdcaype=='01id'"

                                                format="yyyy-MM-dd"
                                                v-model="formValidate.empnBirthdate">
                                    </DatePicker>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="民族"
                                        prop="empnNation">
                                    <Select v-model="formValidate.empnNation"
                                            placeholder="请选择民族">
                                        <Option v-for="item in nationtypeList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="国籍"
                                    prop="empnCouid">
                                    <span @dblclick="dubCleareempnCouid">
                                            <Input
                                                v-model="empnCouid"
                                                placeholder="请选择国籍"
                                                @on-click="openModalempnCouid"
                                                readonly
                                                class="ios-search"
                                                icon='ios-search'
                                            ></Input>
                                        </span>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="籍贯"
                                        prop="empnProvid">
                                    <!-- <Input v-model="formValidate.empnProvid"
                                        placeholder="请输入籍贯"></Input> -->
                                        <span @dblclick="dubClearempnProvid">
                                            <Input
                                                v-model="empnProvid"
                                                placeholder="请选择人事档案所在地"
                                                @on-click="openModalempnProvid"
                                                readonly
                                                class="ios-search"
                                                icon='ios-search'
                                            ></Input>
                                        </span>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="政治面貌"
                                        prop="empnPolid">
                                <Select v-model="formValidate.empnPolid"
                                            placeholder="请选择政治面貌">
                                        <Option v-for="item in empnPolidList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="政治面貌开始时间"
                                        prop="empnPolitime">
                                    <DatePicker type="date"
                                                placeholder="请选择政治面貌开始时间"
                                                style="width: 100%"
                                                :editable='false'
                                                format="yyyy-MM-dd"
                                                v-model="formValidate.empnPolitime">
                                    </DatePicker>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="参加工作日期"
                                        prop="empnWstime">
                                    <DatePicker type="date"
                                                placeholder="请选择参加工作日期"
                                                style="width: 100%"
                                                :editable='false'
                                                 format="yyyy-MM-dd"
                                                 @on-change='empnWstimeChange'
                                                v-model="formValidate.empnWstime">
                                    </DatePicker>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="婚姻状况"
                                        prop="empnMarriage">
                                    <Select v-model="formValidate.empnMarriage"
                                            placeholder="请选择婚姻状况">
                                        <Option v-for="item in recruitmarriaeList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="户口类别"
                                        prop="empnHoutype">
                                <Select v-model="formValidate.empnHoutype"
                                            placeholder="请选择户口类别">
                                        <Option v-for="item in householdtypeList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="户口所在省"
                                        prop="empnHproid">
                                    <span @dblclick="dubClearempnHproid">
                                            <Input
                                                v-model="empnHproid"
                                                placeholder="请选择户口所在省"
                                                @on-click="openModalempnHproid"
                                                readonly
                                                class="ios-search"
                                                icon='ios-search'
                                            ></Input>
                                        </span>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="户口所在市"
                                        prop="empnHcityid">
                                    <span @dblclick="dubClearempnHcityid">
                                            <Input
                                                v-model="empnHcityid"
                                                placeholder="请选择户口所在市"
                                                @on-click="openModalempnHcityid"
                                                readonly
                                                class="ios-search"
                                                icon='ios-search'
                                            ></Input>
                                        </span>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="户口所在县"
                                        prop="empnHcouid">
                                    <span @dblclick="dubClearempnHcouid">
                                            <Input
                                                v-model="empnHcouid"
                                                placeholder="请选择户口所在县"
                                                @on-click="openModalempnHcouid"
                                                readonly
                                                class="ios-search"
                                                icon='ios-search'
                                            ></Input>
                                        </span>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="邮政编码"
                                        prop="empnPoscode">
                                    <Input v-model="formValidate.empnPoscode"
                                        placeholder="请输入邮政编码"
                                        ></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="电子邮箱地址"
                                        prop="empnPosaddrs">
                                    <Input v-model="formValidate.empnPosaddrs"
                                        placeholder="请输入电子邮箱地址"></Input>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="移动电话"
                                        prop="empnMobile">
                                    <Input v-model="formValidate.empnMobile"
                                        placeholder="请输入移动电话"
                                        ></Input>
                                </FormItem>
                                </Col>

                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="职称及资格"
                                        prop="empnnProssioal">
                                    <Input v-model="formValidate.empnnProssioal"
                                        placeholder="请输入职称及资格"></Input>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="人事档案所在地"
                                    prop="empPerarch">
                                    <span @dblclick="dubCleareempPerarch">
                                            <Input
                                                v-model="empPerarch"
                                                placeholder="请选择人事档案所在地"
                                                @on-click="openModalempPerarch"
                                                readonly
                                                class="ios-search"
                                                icon='ios-search'
                                            ></Input>
                                        </span>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="出生地点"
                                    prop="empPerarch">
                                    <span @dblclick="dubClearempbirPlace">
                                            <Input
                                                v-model="empBirthplace"
                                                placeholder="请选择出生地点"
                                                @on-click="openModalempbirPlace"
                                                readonly
                                                class="ios-search"
                                                icon='ios-search'
                                            ></Input>
                                        </span>
                                </FormItem>
                                </Col>
                            </Row>
                        </Form>
                </div>
                <!-- 地址信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <img src="../../../static/entryImg/form_site.png" alt="">
                        <span>地址信息</span>
                    </div>
                    <Form ref="formValidateAddress"
                            class="form"
                        :model="formValidateAddress"
                        :rules="ruleValidateAddress"
                        :label-width="135">
                        <Row>
                            <Col span="10"
                                offset="1">
                            <FormItem label="现居住国家"
                                    prop="addrCoutid">
                                <span @dblclick="dubCleareaddrCoutid">
                                        <Input
                                            v-model="addrCoutid"
                                            placeholder="请选择现居住国家"
                                            @on-click="openModaladdrCoutid"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                offset="1"
                                v-if="isChina">
                            <FormItem label="现居住地所在省"
                                    prop="addrProid">
                                <span @dblclick="dubCleareaddrProid">
                                        <Input
                                            v-model="addrProid"
                                            placeholder="请选择现居住地所在省"
                                            @on-click="openModaladdrProid"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10"
                                offset="1"
                                v-if="isChina">
                            <FormItem label="现居住地所在市"
                                    prop="addrCityid">
                                <span @dblclick="dubCleareaddrCityid">
                                        <Input
                                            v-model="addrCityid"
                                            placeholder="请选择现居住地所在市"
                                            @on-click="openModaladdrCityid"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                offset="1">
                            <FormItem label="现居住地所在区县"
                                    prop="addrCouid"
                                    v-if="isChina">
                                <span @dblclick="dubCleareaddrCouid">
                                        <Input
                                            v-model="addrCouid"
                                            placeholder="请选择现居住地所在区县"
                                            @on-click="openModaladdrCouid"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="21"
                                offset="1">
                            <FormItem label="现居住地详细地址"
                                    prop="addrAddress">
                                <Input v-model="formValidateAddress.addrAddress"
                                    placeholder="请输入现居住地详细地址"
                                    ></Input>
                            </FormItem>
                            </Col>
                            <Col span="21"
                                offset="1">
                                <FormItem>
                                    <Row type="flex">
                                        <Col span="24">
                                            <div class="message">现居住地详细地址请精确到楼栋和门牌号(例:几栋几单元零几)</div>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10"
                                offset="1">
                            <FormItem label="身份证所在省"
                                    prop="addrCardproid"
                                    v-if="isChina">
                                <span @dblclick="dubCleareaddrCardproid">
                                        <Input
                                            v-model="addrCardproid"
                                            placeholder="请选择身份证所在省"
                                            @on-click="openModaladdrCardproid"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                offset="1">
                            <FormItem label="身份证所在市"
                                    prop="addrCardid"
                                    v-if="isChina">
                                <span @dblclick="dubCleareaddrCardproid">
                                        <Input
                                            v-model="addrCardid"
                                            placeholder="请选择身份证所在市"
                                            @on-click="openModaladdrCardid"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10"
                                offset="1">
                            <FormItem label="身份证所在区县"
                                    prop="addrCardcouid"
                                    v-if="isChina">
                                <span @dblclick="dubCleareaddrCardcouid">
                                        <Input
                                            v-model="addrCardcouid"
                                            placeholder="请选择身份证所在区县"
                                            @on-click="openModaladdrCardcouid"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>

                        </Row>
                         <Row>
                            <Col span="21"
                                offset="1">
                            <FormItem label="身份证详细地址"
                                    prop="addrCardaddrs"
                                    v-if="isChina">
                                <Input v-model="formValidateAddress.addrCardaddrs"
                                    placeholder="请输入身份证详细地址"></Input>
                            </FormItem>
                            </Col>
                            <Col span="21"
                                offset="1">
                                <FormItem v-if="isChina">
                                    <Row type="flex">
                                        <Col span="24">
                                            <div class="message">身份证详细地址请精确到楼栋和门牌号(例:几栋几单元零几)</div>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <!-- 家庭成员信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <img src="../../../static/entryImg/table_family.png" alt="">
                        <span>家庭成员信息</span>(请务必准确填写， 且必须勾选一位主要联系人(勾选后有背景颜色标注)。 如需为子女投保补充医疗商业保险，请入职后登录OA系统发起申请)
                    </div>
                    <row class="table-form" ref="table-formfanmily">
                        <Table stripe  height='200' size="small" ref="selectionfamily" :row-class-name="rowClassName" :columns="columnsfamily" :data="datafamily"></Table>
                    </row>
                    <div @click="addfamily()" class="addDataClass"><span class="addCursor"><Icon type="md-add-circle" size='18'/><span>新增家庭成员</span></span></div>
                </div>
                <!-- 教育信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <img src="../../../static/entryImg/table_educate.png" alt="">
                        <span>教育信息</span>(请完整填写自高中以来的所有教育经历,该信息将用于背景调查,请如实填写)
                    </div>
                    <row class="table-form" ref="table-formeducationy">
                        <Table stripe  height='200' size="small" ref="selectioneducation" :columns="columnseducation" :data="dataeducation"></Table>
                    </row>
                    <div @click="addeducation()" class="addDataClass"><span class="addCursor"><Icon type="md-add-circle" size='18'/><span>新增教育信息</span></span></div>
                </div>
                <!-- 工作经历 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <img src="../../../static/entryImg/table_workEx.png" alt="">
                        <span>工作经历</span>(必须填写自参加工作以来所有工作经历，期间为工作的课填写脱产学习或待业，该信息将用于背景调查，请如实填写)
                    </div>
                    <row class="table-form" ref="table-formoccupational">
                        <Table stripe  height='200' size="small" ref="selectionoccupational" :columns="columnsoccupational" :data="dataoccupational"></Table>
                    </row>
                    <div @click="addoccupational()" class="addDataClass"><span class="addCursor"><Icon type="md-add-circle" size='18'/><span>新增工作经历</span></span></div>
                </div>
                <!-- 入职与社保信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <img src="../../../static/entryImg/form_social.png" alt="">
                        <span>入职与社保信息</span>
                    </div>
                    <Form ref="formValidateSocialsecurity"
                            class="form"
                        :model="formValidateSocialsecurity"
                        :rules="ruleValidateSocialsecurity"
                        :label-width="135">
                        <Row>

                            <Col span="10"
                                offset="1">
                            <FormItem label="个税缴纳地"
                                    prop="secTaxplace">
                                <span @dblclick="dubCleareSocialsecurity">
                                        <Input
                                            v-model="secTaxplace"
                                            placeholder="请选择个税缴纳地"
                                            @on-click="openModalSocialsecurity"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                offset="1">
                                <FormItem label="报税公司"
                                        prop="secTaxunit">
                                    <!-- <Input v-model="formValidateSocialsecurity.secTaxunit"
                                        placeholder="请输入报税公司"
                                        ></Input> -->
                                        <span @dblclick="dubCleareSecTaxunit">
                                        <Input
                                            v-model="secTaxunit"
                                            placeholder="请选择报税公司"
                                            @on-click="openModalSecTaxunit"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                             <Col span="10"
                                offset="1">
                            <FormItem label="社保缴纳地"
                                    prop="secSocplace">
                                <span @dblclick="dubClearesecSocplacey">
                                        <Input
                                            v-model="secSocplace"
                                            placeholder="请选择社保缴纳地"
                                            @on-click="openModalsecSocplace"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>
                             <Col span="10"
                                offset="1">
                            <FormItem label="社保缴纳公司"
                                    prop="secSocomp">
                                <span @dblclick="delClearSocSecunit">
                                        <Input
                                            v-model="secSocomp"
                                            placeholder="请选择社保缴纳公司"
                                            @on-click="openModalSocSecunit"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                           <Col span="10"
                                offset="1">
                                <FormItem label="入职日期"
                                        prop="secEntdate">
                                        <DatePicker type="date"
                                            placeholder="请选择入职日期"
                                            style="width: 100%"
                                            :editable='false'
                                            format="yyyy-MM-dd"
                                            v-model="formValidateSocialsecurity.secEntdate">
                                        </DatePicker>
                                </FormItem>
                            </Col>
                            <Col span="10"
                                offset="1">
                                <FormItem label="是否需要办理社保卡"
                                            prop="secSocsec">
                                    <RadioGroup v-model="formValidateSocialsecurity.secSocsec"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="10"
                                offset="1">
                                <FormItem label="北京第一次参保"
                                            prop="secPeikifirst">
                                    <RadioGroup v-model="formValidateSocialsecurity.secPeikifirst"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                             

                        </Row>
                    </Form>
                </div>
                 <!-- 工资卡信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <img src="../../../static/entryImg/form_payCard.png" alt="">
                        <span>工资卡信息</span>
                    </div>
                    <Form ref="formValidatePaycard"
                            class="form"
                        :model="formValidatePaycard"
                        :rules="ruleValidatePaycard"
                        :label-width="135">
                        <Row>
                            <Col span="10"
                                offset="1">
                            <FormItem label="开户行"
                                    prop="secBaid">
                                <span @dblclick="dubClearesecBaid">
                                        <Input
                                            v-model="secBaid"
                                            placeholder="请选择开户行"
                                            @on-click="openModalsecBaid"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'
                                        ></Input>
                                    </span>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                offset="1">
                                <FormItem label="卡号"
                                        prop="secBacard">
                                    <Input v-model="formValidatePaycard.secBacard"
                                        placeholder="请输入卡号"
                                        ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10"
                                offset="1">
                                <FormItem label="分行"
                                        prop="secBadech">
                                    <Input v-model="formValidatePaycard.secBadech"
                                        placeholder="请输入分行"
                                        ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <!-- 特别声明 -->
                <div class="firstblocks">
                    <div class="dataBlocksTitle">
                        <img src="../../../static/entryImg/form_statement.png" alt="">
                        <span>特别声明</span>
                    </div>
                    <Form ref="formValidateSpecialannouncement"
                            class="forms"
                            :label-width="420"
                        :model="formValidateSpecialannouncement"
                        :rules="ruleValidateSpecialannouncement"
                        >
                        <Row>
                            <Col span="9"
                                offset="1">
                                <FormItem label="是否曾在本公司任职或者建立过劳动关系"

                                            prop="stateLocalrelate">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateLocalrelate"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="11"
                                offset="1" v-if="formValidateSpecialannouncement.stateLocalrelate=='1'" class="specialmentComment">
                                <FormItem  label="备注"
                                :label-width='50'
                                        prop="commentRz">
                                    <Input v-model="formValidateSpecialannouncement.commentRz"
                                        placeholder="请输入备注"
                                        ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="9"
                                offset="1">
                                <FormItem label="是否有任何疾病/精神病"

                                            prop="stateIllness">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateIllness"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="11"
                                offset="1" v-if="formValidateSpecialannouncement.stateIllness=='1'" class="specialmentComment">
                                <FormItem label="备注"
                                :label-width='50'
                                        prop="commentJb">
                                    <Input v-model="formValidateSpecialannouncement.commentJb"
                                        placeholder="请输入备注"
                                        ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="9"
                                offset="1">
                                <FormItem label="是否吸毒"

                                            prop="stateDrug">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateDrug"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="11"
                                offset="1" v-if="formValidateSpecialannouncement.stateDrug=='1'" class="specialmentComment">
                                <FormItem label="备注"
                                :label-width='50'
                                        prop="commentXd">
                                    <Input v-model="formValidateSpecialannouncement.commentXd"
                                        placeholder="请输入备注"
                                        ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="9"
                                offset="1">
                                <FormItem label="是否于其他单位存在劳动或者用人关系"

                                            prop="stateOtherelate">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateOtherelate"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="11"
                                offset="1" v-if="formValidateSpecialannouncement.stateOtherelate=='1'" class="specialmentComment">
                                <FormItem label="备注"
                                :label-width='50'
                                        prop="commentCld">
                                    <Input v-model="formValidateSpecialannouncement.commentCld"
                                        placeholder="请输入备注"
                                        ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="9"
                                offset="1">
                                <FormItem label="是否为其他单位内退、下岗待岗、停薪留职、经营性停产放长假人员"

                                            prop="stateOtherecess">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateOtherecess"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="11"
                                offset="1" v-if="formValidateSpecialannouncement.stateOtherecess=='1'" class="specialmentComment">
                                <FormItem label="备注"
                                :label-width='50'
                                        prop="commentXg">
                                    <Input v-model="formValidateSpecialannouncement.commentXg"
                                        placeholder="请输入备注"
                                        ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="9"
                                offset="1">
                                <FormItem label="是否有未结的劳动争议纠纷，或尚未履行完的刑期或刑罚"

                                            prop="stateDispute">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateDispute"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="11"
                                offset="1" v-if="formValidateSpecialannouncement.stateDispute=='1'" class="specialmentComment">
                                <FormItem label="备注"
                                :label-width='50'
                                        prop="commentLd">
                                    <Input v-model="formValidateSpecialannouncement.commentLd"
                                        placeholder="请输入备注"
                                        ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                         <Row>
                            <Col span="9"
                                offset="1">
                                <FormItem label="是否对其他公司负竞业限制义务"

                                            prop="stateRestrict">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateRestrict"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="11"
                                offset="1" v-if="formValidateSpecialannouncement.stateRestrict=='1'" class="specialmentComment">
                                <FormItem label="备注"
                                :label-width='50'
                                        prop="commentJz">
                                    <Input v-model="formValidateSpecialannouncement.commentJz"
                                        placeholder="请输入备注"
                                        ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row class="specialment">
                            <Col span="9"
                                offset="1">
                                <FormItem label="是否亲属在本公司任职"

                                            prop="stateRelation">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateRelation"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="3"
                            offset="1" v-if="formValidateSpecialannouncement.stateRelation=='1'" class="specialment1">
                                <FormItem label="亲属姓名"
                                :label-width='80'
                                        prop="stateRelatName">
                                    <Input v-model="formValidateSpecialannouncement.stateRelatName"
                                        placeholder="请输入亲属姓名"
                                        ></Input>
                                </FormItem>
                            </Col>
                            <Col span="5" v-if="formValidateSpecialannouncement.stateRelation=='1'"  class="specialment2">
                                <FormItem label="亲属任职部门及岗位"
                                :label-width='135'
                                        prop="stateRelatJob">
                                    <Input v-model="formValidateSpecialannouncement.stateRelatJob"
                                        placeholder="请输入亲属任职部门及岗位"
                                        ></Input>
                                </FormItem>
                            </Col>
                            <Col span="3" v-if="formValidateSpecialannouncement.stateRelation=='1'"  class="specialment3">
                                <FormItem label="关系"
                                :label-width='50'
                                        prop="stateRelateship">
                                    <Select v-model="formValidateSpecialannouncement.stateRelateship"
                                            :label-in-value="true"
                                            placeholder="请选择关系">
                                            <Option v-for="item in relationshipList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}
                                            </Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="9"
                                offset="1">
                                <FormItem label="是否内部推荐"

                                            prop="stateRecomend">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateRecomend"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="3"  offset="1" v-if="formValidateSpecialannouncement.stateRecomend=='1'"  class="specialment4">
                                <FormItem label="推荐人姓名"
                                :label-width='85'
                                        prop="stateReconame">
                                    <Input v-model="formValidateSpecialannouncement.stateReconame"
                                        placeholder="请输入推荐人姓名"
                                        ></Input>
                                </FormItem>
                            </Col>
                            <Col span="4" v-if="formValidateSpecialannouncement.stateRecomend=='1'" class="specialment5">
                                <FormItem label="推荐人手机"
                                :label-width='85'
                                        prop="stateRecomobile">
                                    <Input v-model="formValidateSpecialannouncement.stateRecomobile"
                                        placeholder="请输入推荐人手机"
                                        ></Input>
                                </FormItem>
                            </Col>
                            <Col span="4" v-if="formValidateSpecialannouncement.stateRecomend=='1'" class="specialment6">
                                <FormItem label="与您进行过意愿沟通"
                                    :label-width='130'
                                            prop="stateCommuniate">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateCommuniate"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="9"
                                offset="1">
                                <FormItem label="是否需要公司在您入职后为您未满18周岁的子女购买商业保险"

                                            prop="stateInsurance">
                                    <RadioGroup v-model="formValidateSpecialannouncement.stateInsurance"
                                                type="button"
                                                size="small">
                                        <Radio v-for="(item, index) in yesOrNo"
                                                :key="index"
                                                :label="item.paramCode"
                                                >{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="11"
                                offset="1" v-if="formValidateSpecialannouncement.stateInsurance=='1'" class="specialmentComment">
                                <FormItem label="备注"
                                :label-width='50'
                                        prop="comment">
                                    <Input v-model="formValidateSpecialannouncement.comment"
                                        placeholder="请输入备注"
                                        ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <!-- 附件信息 -->
                <div class="firstblock">
                     <div class="dataBlocksTitle">
                        <img src="../../../static/entryImg/form_accessory.png" alt="">
                        <span>附件信息</span>
                    </div>
                     <Form ref="formValidateaccessory" class="forms" :model="formValidateaccessory" :rules="ruleValidateaccessory" label-position="right" >
                        <FormItem label="背景调查授权书" prop="empnnBjfile" class="formItem" :label-width="300">
                            <Row>
                                <Col span="10">
                                    <Icon type="md-alert" size='18'/>
                                    <span>背景调查授权书需手写签字，拍照或扫描后打包上传与此位置。</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="3" >
                                <Upload :before-upload="handleUpload" action=" ">
                                    <!-- <Button icon="ios-cloud-upload-outline">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button> -->
                                    <span class="uploadBtn">
                                        <Icon type="md-cloud-upload" size="24"/>
                                        <span>点击选择文件</span>
                                    </span>
                                </Upload>
                                </Col>
                                <Col span="20">
                                    <span v-if="file !== '' && file.name !== '0' " class="file">
                                    <Col span="18">
                                        <div class="upFile">
                                        <img class="fileImg" src="../../../static/fileImg/fileImg.png" alt="">
                                        <span class="fileName">{{$t('lang_role.imp.up2')}} {{ file.name}}</span>
                                        </div>
                                    </Col>
                                    <Col span="2">
                                        <span >
                                            <Button type="text"
                                                    @click="removeFile1(file)"
                                                    >
                                                删除
                                            </Button>
                                        </span>
                                    </Col> 
                                    <!-- <Col span="4">
                                        <Button type="text"  @click="uploadLocalFile" v-if="loadingStatus">
                                        {{$t('lang_platdoc.platDoc.plat_upload')}}
                                        </Button>
                                        <Button type="text"  @click="downloadFile" v-if="!loadingStatus">
                                        {{$t('lang_platdoc.platDoc.plat_download')}}
                                        </Button>
                                    </Col> -->
                                    </span>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="工牌照片附件" prop="empnnPhotofile" class="formItem" :label-width="300">
                            <Row>
                                <Col span="10" >
                                    <Icon type="md-alert" size='18'/>
                                    <span>工牌照片需免冠白底半身（腰部以上）正装照</span>
                                </Col>
                            </Row>
                            <Row>
                                <Input v-show="false" v-model="formValidateaccessory.empnnPhotofile"/>
                                <Col span="3" >
                                <Upload :before-upload="handleUpload3" action=" ">
                                    <!-- <Button icon="ios-cloud-upload-outline">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button> -->
                                    <span class="uploadBtn">
                                        <Icon type="md-cloud-upload" size="24"/>
                                        <span>点击选择文件</span>
                                    </span>
                                </Upload>
                                </Col>
                                <Col span="20">
                                    <span v-if="file3 !== '' && file3.name !== '0' " class="file">
                                    <Col span="18">
                                        <div class="upFile">
                                        <img class="fileImg" src="../../../static/fileImg/fileImg.png" alt="">
                                        <span class="fileName">{{$t('lang_role.imp.up2')}} {{ file3.name}}</span>
                                        </div>
                                    </Col>
                                    <Col span="2">
                                        <span >
                                            <Button type="text"
                                                    @click="removeFile3(file3)"
                                                    >
                                                删除
                                            </Button>
                                        </span>
                                    </Col> 
                                    <!-- <Col span="4">
                                        <Button type="text"  @click="uploadLocalFile" v-if="loadingStatus">
                                        {{$t('lang_platdoc.platDoc.plat_upload')}}
                                        </Button>
                                        <Button type="text"  @click="downloadFile" v-if="!loadingStatus">
                                        {{$t('lang_platdoc.platDoc.plat_download')}}
                                        </Button>
                                    </Col> -->
                                    </span>
                                </Col>
                            </Row>

                        </FormItem>
                        <!-- <FormItem label="背景调查信息表" prop="empnnBjinfile" class="formItem" :label-width="300">
                            <Row>
                            <Col span="3" offset="1">
                            <Upload :before-upload="handleUpload1" action=" ">
                                <Button icon="ios-cloud-upload-outline">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button>
                                <span class="uploadBtn">
                                    <Icon type="md-cloud-upload" size="24"/>
                                    <span>点击选择文件</span>
                                </span>
                            </Upload>
                            </Col>
                            <Col span="8" offset="1">
                                <span v-if="file1 !== '' && file1.name !== '0' " class="file">
                                <Col span="20">
                                    <div class="upFile">
                                    <img class="fileImg" src="../../../static/fileImg/fileImg.png" alt="">
                                    <span class="fileName">{{$t('lang_role.imp.up2')}} {{ file1.name}}</span>
                                    </div>
                                </Col>
                                <Col span="4">
                                    <Button type="text"  @click="uploadLocalFile1" v-if="loadingStatus1">
                                    {{$t('lang_platdoc.platDoc.plat_upload')}}
                                    </Button>
                                    <Button type="text"  @click="downloadFile1" v-if="!loadingStatus1">
                                    {{$t('lang_platdoc.platDoc.plat_download')}}
                                    </Button>
                                </Col>
                                </span>
                            </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="子女出生证明/户口页(18岁以下)" prop="empnnBirfile" class="formItem" :label-width="300">
                            <Row>
                            <Col span="3" offset="1">
                            <Upload :before-upload="handleUpload2" action=" ">
                                <Button icon="ios-cloud-upload-outline">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button>
                                <span class="uploadBtn">
                                    <Icon type="md-cloud-upload" size="24"/>
                                    <span>点击选择文件</span>
                                </span>
                            </Upload>
                            </Col>
                            <Col span="8" offset="1">
                                <span v-if="file2 !== '' && file2.name !== '0' " class="file">
                                <Col span="20">
                                    <div class="upFile">
                                    <img class="fileImg" src="../../../static/fileImg/fileImg.png" alt="">
                                    <span class="fileName">{{$t('lang_role.imp.up2')}} {{ file2.name}}</span>
                                    </div>
                                </Col>
                                <Col span="4">
                                    <Button type="text"  @click="uploadLocalFile2" v-if="loadingStatus2">
                                    {{$t('lang_platdoc.platDoc.plat_upload')}}
                                    </Button>
                                    <Button type="text"  @click="downloadFile2" v-if="!loadingStatus2">
                                    {{$t('lang_platdoc.platDoc.plat_download')}}
                                    </Button>
                                </Col>
                                </span>
                            </Col>
                            </Row>
                            <Row>
                                <Col span="20" offset="1">
                                    <Icon type="md-alert" size='18'/>
                                    <span>子女出生证明/户口页为公司为您子女购买商业保险的所需材料，若您上传成功，在您入职后，您将会在员工OA登录界面收到待办流程再次确认您子女信息。经您确认后，公司会自动为您未满18周岁的子女购买商业保险。若您需要上传多个文件，请务必以打包形式统一进行操作。</span>
                                </Col>
                            </Row>
                        </FormItem> -->
                    </Form>
                </div>
                <!-- Offer确认 -->
                <div class="firstblock">
                     <div class="dataBlocksTitle">
                        <img src="../../../static/entryImg/form_offer.png" alt="">
                        <span>Offer确认</span>
                    </div>
                    <Form ref="formValidateOffer"
                            class="form"
                        :model="formValidateOffer"
                        :rules="ruleValidateOffer"
                        >
                        <Row>
                            <Col span="10"
                                offset="2">
                                <FormItem
                                            prop="empnnJsoffer">
                                    <RadioGroup v-model="formValidateOffer.empnnJsoffer"
                                                 vertical>
                                        <Radio label="1">
                                            <!-- <Icon type="social-apple"></Icon> -->
                                            <span>接受Offer，并确保我所提供信息和材料真实性，如果资料有任何不符我将承担全部后果及责任。</span>
                                        </Radio>
                                        <Radio label="0">
                                            <!-- <Icon type="social-android"></Icon> -->
                                            <span>拒绝Offer</span>
                                        </Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="17" offset="5">
                                <Icon type="md-alert" size='18'/>
                                <span>本信息填写后将作为背景调查信息比对的唯一依据，不支持修改与变更,请您谨慎填写，仔细核对后提报，以免信息有误引发背调结果差异影响您的入职办理。</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="21"
                                    offset="1">
                                <Row type="flex"
                                        justify="center" align="bottom">
                                    <FormItem>
                                            <Button type="primary"
                                                    @click="handleSubmit(1)"
                                                    style="margin-left: 8px;margin-top:40px;background: #be0008;border: 1px solid #be0008;width: 80px;">{{$t('button.sav')}}</Button>
                                            <Button type="primary"
                                                    @click="handleSubmit(2)"
                                                    style="margin-left: 8px;margin-top:40px;background: #be0008;border: 1px solid #be0008;width: 80px;">{{$t('button.subm')}}</Button>
                                    </FormItem>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
        <!-- 家庭成员 -->
        <transition name="fade">
            <searchTablefamily v-show="openfamily"
                         @closeUp="close"
                         :logType='logType'
                         @changeinputfamily="changeinputfamily"
                         @addNewArrayfamily='addNewArrayfamily'
                         @updNewArrayfamily ='updNewArrayfamily'
                         ref="searchTablefamily"></searchTablefamily>
        </transition>
        <!-- 教育信息 -->
         <transition name="fade">
            <searchTableeducation v-show="openeducation"
                         @closeUp="close"
                         :logType='logType'
                         @changeinputeducation="changeinputeducation"
                         @addNewArrayeducation='addNewArrayeducation'
                         @updNewArrayeducation='updNewArrayeducation'
                         ref="searchTableeducation"></searchTableeducation>
        </transition>
         <!-- 工作经历 -->
         <transition name="fade">
            <searchTableoccupational v-show="openoccupational"
                         @closeUp="close"
                         :logType='logType'
                         :basicInformationDate='basicInformationDate'
                         @changeinputoccupational="changeinputoccupational"
                         @addNewArrayworkexp='addNewArrayworkexp'
                         @updNewArrayworkexp='updNewArrayworkexp'
                         ref="searchTableoccupational"></searchTableoccupational>
        </transition>
        <!-- 国籍 -->
         <transition name="fade">
            <searchTableCountry v-show="openCountry"
                         @closeUp="close"
                         :logType='logType'
                         :typeName='typeName'
                         @changeinputCountry="changeinputCountry"
                         @changeinputaddrCoutid='changeinputaddrCoutid'
                         ref="searchTableCountry"></searchTableCountry>
        </transition>
        <!-- 城市信息 -->
         <transition name="fade">
            <searchTableEmpnHproid v-show="openEmpnHproid"
                         @closeUp="close"
                         :logType='logType'
                         :typeName='typeName'
                         :title="title"
                         @changeinputEmpnProvid='changeinputEmpnProvid'
                         @changeinputEmpnHproid="changeinputEmpnHproid"
                         @changeinputEmpnHcityid='changeinputEmpnHcityid'
                         @changeinputEmpnHcouid='changeinputEmpnHcouid'
                         @changeinputaddrProid='changeinputaddrProid'
                         @changeinputaddrCityid='changeinputaddrCityid'
                         @changeinputaddrCouid='changeinputaddrCouid'
                         @changeinputaddrCardproid='changeinputaddrCardproid'
                         @changeinputaddrCardid='changeinputaddrCardid'
                         @changeinputaddrCardcouid='changeinputaddrCardcouid'
                         @changeinputempPerarch='changeinputempPerarch'
                         @changeinputSocialsecurity='changeinputSocialsecurity'
                         @changeinputsecSocplace='changeinputsecSocplace'
                         @changeinputempBirPlace='changeinputempBirPlace'
                         ref="searchTableEmpnHproid"></searchTableEmpnHproid>
        </transition>
        <!-- 开户行 -->
         <transition name="fade">
            <searchTablesecBaid v-show="opensecBaid"
                         @closeUp="close"
                         :logType='logType'
                         :typeName='typeName'
                         @changeinputsecBaid='changeinputsecBaid'
                         ref="searchTablesecBaid"></searchTablesecBaid>
        </transition>
         <!-- 缴纳地 -->
         <transition name="fade">
            <searchSocialsecurity v-show="openSocialsecurity"
                         @closeUp="close"
                         :logType='logType'
                         :typeName='typeName'
                         @changeinputSocialsecurity='changeinputSocialsecurity'
                         @changeinputsecSocplace='changeinputsecSocplace'
                         ref="searchSocialsecurity"></searchSocialsecurity>
        </transition>
        <!-- 缴纳地 -->
         <transition name="fade">
            <searchSecTaxunit v-show="openSecTaxunit"
                         @closeUp="close"
                         :logType='logType'
                         :typeName='typeName'
                         @changeinputSecTaxunit='changeinputSecTaxunit'
                         ref="searchSecTaxunit"></searchSecTaxunit>
        </transition>
        <!-- 缴纳公司 -->
        <transition name="fade">
            <searchSocSecunit v-show="openSocSecunit"
                         @closeUp="close"
                         :logType='logType'
                         :typeName='typeName'
                         :cityId='secSocplaceId'
                         @changeinputSocSecunit='changeinputSocSecunit'
                         ref="searchSocSecunit"></searchSocSecunit>
        </transition>
        <!-- 社保缴纳地 -->
        <transition name="fade">
            <searchSsecKickplace v-show="openSsecKickplace"
                         @closeUp="close"
                         :logType='logType'
                         @changeinputSsecKickplace='changeinputsecSocplace'
                         ref="searchSsecKickplace"></searchSsecKickplace>
        </transition>
    </div>
</template>
<script>

import { getDataLevelUserLoginSenior, getDataLevelUserLogin,uploadFile,getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccessNew, deepCopy } from '../../lib/util'
import searchTableCountry from './searchCountry'
import searchTablepolitics from './searchTablepolitics'
import searchTableEmpnHproid from './searchTableEmpnHproid'
import searchTablefamily from './searchTablefamily'
import searchTableeducation from './searchTableeducation'
import searchTableoccupational from './searchTableoccupational'
import searchTablesecBaid from './searchTablesecBaid'
import searchSocialsecurity from './searchSocialsecurity'
import searchSecTaxunit from './searchSecTaxunit'
import searchSocSecunit from './searchSocSecunit'
import searchSsecKickplace from './searchSsecKickplace'
export default {
    data () {
         const empnValTime = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请选择证件有效开始日期"));
            } else {
                //开始时间不能大于结束时间   this.formValidate.unitValdate和this.formValidate.unitInvdate  这两个值是根据你当前页面 日期时间绑定的变量
                let startTimeNum = (new Date(this.formValidate.empnValsdate)).getTime();
                let endTimeNum = (new Date(this.formValidate.empnValedate)).getTime();
                if (startTimeNum > endTimeNum) {
                    callback(new Error('证件有效开始日期不能大于证件有效结束日期'))
                }
                callback()
            }
        };
        return {
            logType:'新增',
            openSocialsecurity:false,
            openSecTaxunit:false,
            title:'',
            // 模块名称
            typeName:'',
            // 国籍
            openCountry:false,
            // 政治面貌
            openPolitics:false,
            // 户口所在省
            openEmpnHproid:false,
            // 开户行
            opensecBaid:false,
            // 社保缴纳地
            openSsecKickplace: false,
            // 背景调查授权书
            file: '',
            filekey: '',
            loadingStatus: false,
            // 背景调查信息表
            file1: '',
            filekey1: '',
            loadingStatus1: false,
            // 背景调查信息表
            file2: '',
            filekey2: '',
            loadingStatus2: false,
            // 工牌附件
            file3: '',
            filekey3: '',
            loadingStatus3: false,
             // 是否
            yesOrNo: [],
            radiodata:[],
             // 性别
            GenderList:[],
            // 民族
            nationtypeList:[],
            // 证件类型
            idtypeList:[],
            // 婚姻
            recruitmarriaeList:[],
            // 户口类型
            householdtypeList:[],
            // 政治面貌
            empnPolidList:[],
            // 与员工关系
            relationshipList: [],
            formValidateaccessory: {
                empnnBjfile:'',
                empnnPhotofile: '',
                // empnnBjinfile: '',
                // empnnBirfile: '',
            },
            // 附件验证
            ruleValidateaccessory: {
                empnnPhotofile: [
                    { required: true, message: '工牌照片不能为空', trigger: 'change' },
                ]
            },
            // 家庭成员
            openfamily:false,
            columnsfamily:[
                {
                    title: '与员工关系',
                    key: 'fmErelatDis',
                },
                {
                    title: '工作单位',
                    key: 'fmCompany',
                },
                {
                    title: '职业',
                    key: 'fmJob',
                },
                 {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 120,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'success',
                                size: 'small',
                            },
                            on: {
                                click: () => {
                                this.openUpfamily(params.row, this.$t('button.y.upd'), params.index)
                                },
                            },
                        }, this.$t('button.y.upd')),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small',
                            },
                            style:{
                                marginLeft:'8px'
                            },
                            on: {
                                click: () => {
                                this.deletefamily(params.row, this.$t('button.del'), params.index)
                                },
                            },
                        }, this.$t('button.del')),
                    ])
                    },
                },
            ],
            datafamily:[],
            // 教育信息
            openeducation:false,
            columnseducation:[
                {
                    title: '入学日期',
                    key: 'eduEnttime',
                },
                {
                    title: '毕业日期',
                    key: 'eduGrtime',
                },
                {
                    title: '学校',
                    key: 'eduSchool',
                },
                {
                    title: '专业',
                    key: 'eduMajtypeDis',
                },
                {
                    title: '学历',
                    key: 'eduAcidDis',
                },
                 {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 120,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                    return h('div', [
                        h('Button', {
                        props: {
                            type: 'success',
                            size: 'small',
                        },
                        on: {
                            click: () => {
                            this.openUpeducation(params.row, this.$t('button.y.upd'), params.index)
                            },
                        },
                        }, this.$t('button.y.upd')),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small',
                            },
                            style:{
                                marginLeft:'8px'
                            },
                            on: {
                                click: () => {
                                this.deleteeducation(params.row, this.$t('button.del'), params.index)
                                },
                            },
                        }, this.$t('button.del')),
                    ])
                    },
                },
            ],
            dataeducation:[],
            // 工作经历
            openoccupational:false,
            columnsoccupational:[
              {
                  title: '开始日期',
                  key: 'workSdate',
              },
              {
                  title: '结束日期',
                  key: 'workEdate',
              },
                 {
                    title: '公司名称',
                    key: 'workUnitname',
                },
                {
                    title: '任职部门',
                    key: 'workDepart',
                },
                {
                    title: '企业所属行业类别',
                    key: 'workComcateDis',
                },
                 {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 120,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                    return h('div', [
                        h('Button', {
                        props: {
                            type: 'success',
                            size: 'small',
                        },
                        on: {
                            click: () => {
                            this.openUpoccupational(params.row, this.$t('button.y.upd'), params.index)
                            },
                        },
                        }, this.$t('button.y.upd')),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small',
                            },
                            style:{
                                marginLeft:'8px'
                            },
                            on: {
                                click: () => {
                                this.deleteoccupational(params.row, this.$t('button.del'), params.index)
                                },
                            },
                        }, this.$t('button.del')),
                    ])
                    },
                },
            ],
            dataoccupational:[],
            // 入职与社保信息
            openSocSecunit:false,
            secSocplaceId:localStorage.getItem('secSocplaceId') ? localStorage.getItem('secSocplaceId') : '',
            secTaxplace:'',
            secSocplace:'',
            secTaxunit:'',
            secSocomp:'',
            formValidateSocialsecurity:{
                secEntdate:'',
                secTaxplace:'',
                secTaxunit:'',
                secSocsec:'0',
                secSocplace:'',
                secPeikifirst:'0',
                secSocomp:''
            },
            // 工资卡
            secBaid:'',
            formValidatePaycard:{
                secBaid:'',
                secBacard:'',
                secBadech:''
            },
            // 特别声明
            formValidateSpecialannouncement:{
                stateLocalrelate:'0',
                commentRz:'',
                stateIllness:'0',
                commentJb:'',
                stateDrug:'0',
                commentXd:'',
                stateOtherelate:'0',
                commentCld:'',
                stateOtherecess:'0',
                commentXg:'',
                stateDispute:'0',
                commentLd:'',
                stateRestrict:'0',
                commentJz:'',
                stateRelation:'0',
                stateRelatName:'',
                stateRelatJob:'',
                stateRelateship:'',
                stateRecomend:'0',
                stateReconame:'',
                stateRecomobile:'',
                stateCommuniate:'1',
                stateInsurance:'0',
                comment:''
            },
            // offer
            formValidateOffer:{
                empnnJsoffer:'1'
            },
            ruleValidateOffer:{
            },
            spinShow: false,
            // 基本信息
            empnCouid:'',
            empnHproid:'',
            empnHcityid:'',
            empnHcouid:'',
            empPerarch:'',
            empBirthplace:'',
            empnProvid: '',
            formValidate: {
                id: "",
                empnName:localStorage.name,
                empnEname:'',
                empnPiny:'',
                empnOld:'',
                empnGender:'',
                empnBirthdate:'',
                empnNation:'',
                empnCouid:'',
                empnProvid:'',
                empnIdcaype:'',
                empnIdcanum:'',
                empnPolid:'',
                empnPolitime:'',
                empnWstime:'',
                empnMarriage:'',
                empnHoutype:'',
                empnHproid:'',
                empnHcityid:'',
                empnHcouid:'',
                empnPoscode:'',
                empnPosaddrs:'',
                empnMobile:localStorage.userphone,
                empnnProssioal:'',
                empBirthplace:'',
                empnValedate:'',
                empnValsdate:''
            },
            basicInformationDate:'',
            // 地址信息
            addrCoutid:'',
            addrProid:'',
            addrCityid:'',
            addrCouid:'',
            addrCardproid:'',
            addrCardid:'',
            addrCardcouid:'',
            formValidateAddress:{
                addrCoutid:'',
                addrProid:'',
                addrCityid:'',
                addrCouid:'',
                addrAddress:'',
                addrCardproid:'',
                addrCardid:'',
                addrCardcouid:'',
                addrCardaddrs:'',
            },
            // 基本信息验证
            ruleValidate: {
                empnName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' },
                ],
                empnPiny: [
                    { required: true, message: '姓名拼音不能为空', trigger: 'blur' },
                ],
                empnGender: [
                    { required: true, message: '性别不能为空', trigger: 'change' },
                ],
                empnBirthdate: [
                    { required: true,type:'date', message: '出生日期不能为空', trigger: 'blur' },
                ],
                 empnValsdate: [
                    { required: true, type: 'date',validator: empnValTime,trigger: 'blur' },
                ],
                 empnValedate: [
                    { required: true, type: 'date',message: '证件失效结束时间不能为空', trigger: 'blur' },
                ],
                 empnNation: [
                    { required: true, message: '民族不能为空', trigger: 'change' },
                ],
                 empnCouid: [
                    { required: true, message:'国籍不能为空', trigger: 'change' },
                ],
                 empnProvid: [
                    { required: true, message: '籍贯不能为空', trigger: 'change' },
                ],
                 empnIdcaype: [
                    { required: true, message: '证件类型不能为空', trigger: 'change' },
                ],
                 empnPolid: [
                    { required: true, message: '政治面貌不能为空', trigger: 'change' },
                ],
                 empnWstime: [
                    { required: true, type:'date',message: '参加工作日期不能为空', trigger: 'blur' },
                ],
                empnMarriage: [
                    { required: true, message: '婚姻状况不能为空', trigger: 'change' },
                ],
                empnHoutype: [
                    { required: true, message: '户口类别不能为空', trigger: 'change' },
                ],
                empnHproid: [
                    { required: true, message: '户口所在省不能为空', trigger: 'change' },
                ],
                empnHcityid: [
                    { required: true, message: '户口所在市不能为空', trigger: 'change' },
                ],
                empnHcouid: [
                    { required: true, message: '户口所在区县不能为空', trigger: 'change' },
                ],
                empnPoscode: [
                    { required: true, message: '邮政编码不能为空', trigger: 'blur' },
                ],
                empnPosaddrs: [
                    { required: true, validator: this.validEmail, trigger: 'blur' },
                ],
                empnMobile: [
                    { required: true, validator: this.validMobile, trigger: 'blur' },
                ],
                empnIdcanum :[
                    { required: true, message: '证件号码不能为空', trigger: 'blur' },
                ]
            },
            // 地址验证
            ruleValidateAddress:{
                addrCoutid: [
                    { required: true, message: '现居住国家不能为空', trigger: 'change' },
                ],
                addrProid: [
                    { required: true, message: '现居住地所在省不能为空', trigger: 'change' },
                ],
                addrCityid: [
                    { required: true, message: '现居住地所在市不能为空', trigger: 'change' },
                ],
                addrCouid: [
                    { required: true, message: '现居住地所在区县不能为空', trigger: 'change' },
                ],
                addrAddress:[
                    { required: true, message: '现居住地详细地址', trigger: 'blur' },
                ],
                addrCardproid :[
                    { required: true, message: '身份证所在省', trigger: 'change' },
                ],
                addrCardid :[
                    { required: true, message: '身份证所在市', trigger: 'change' },
                ],
                addrCardcouid :[
                    { required: true, message: '身份证所在区县', trigger: 'change' },
                ],
                addrCardaddrs :[
                    { required: true, message: '身份证详细地址', trigger: 'blur' },
                ]
            },
            // 入职与社保验证
            ruleValidateSocialsecurity:{
                secEntdate: [
                    { required: true, type:'date',message: '入职日期不能为空', trigger: 'change' },
                ],
                secTaxplace: [
                    { required: true, message: '个税缴纳地不能为空', trigger: 'change' },
                ],
                secSocsec: [
                    { required: true, message: '是否需要办理社保卡不能为空', trigger: 'blur' },
                ],
                secSocplace: [
                    { required: true, message: '社保缴纳地不能为空', trigger: 'change' },
                ],
                secSocomp: [
                    { required: true, message: '社保缴纳公司不能为空', trigger: 'change' },
                ]
            },
            // 工资卡验证
            ruleValidatePaycard:{
                secBaid: [
                    { required: true, message: '开户行不能为空', trigger: 'change' },
                ],
                secBacard: [
                    { required: true, validator: this.validPaycard, trigger: 'blur' },
                ],
                secBadech: [
                    { required: true, message: '分行不能为空', trigger: 'blur' },
                ],
            },
            // 特别声明验证
            ruleValidateSpecialannouncement:{
                commentRz: [
                    { required: true, message: '备注不能为空', trigger: 'blur' },
                ],
                 commentJb: [
                    { required: true, message: '备注不能为空', trigger: 'blur' },
                ],
                 commentXd: [
                    { required: true, message: '备注不能为空', trigger: 'blur' },
                ],
                 commentCld: [
                    { required: true, message: '备注不能为空', trigger: 'blur' },
                ],
                 commentXg: [
                    { required: true, message: '备注不能为空', trigger: 'blur' },
                ],
                 commentLd: [
                    { required: true, message: '备注不能为空', trigger: 'blur' },
                ],
                 commentJz: [
                    { required: true, message: '备注不能为空', trigger: 'blur' },
                ],
                 stateRelatName: [
                    { required: true, message: '亲属姓名不能为空', trigger: 'blur' },
                ],
                 stateRelatJob: [
                    { required: true, message: '亲属认知部门及岗位不能为空', trigger: 'blur' },
                ],
                 stateRelateship: [
                    { required: true, message: '关系不能为空', trigger: 'blur' },
                ],
                 stateReconame: [
                    { required: true, message: '推荐人不能为空', trigger: 'blur' },
                ],
                 stateRecomobile: [
                    { required: true, message: '推荐人手机号不能为空', trigger: 'blur' },
                ],
                 comment: [
                    { required: true, message: '备注不能为空', trigger: 'blur' },
                ],
            },
            // 保存状态
            buttontype: ""
        }
    },
    components: {
        searchTablefamily,
        searchTableeducation,
        searchTableoccupational,
        searchTableCountry,
        searchTablepolitics,
        searchTableEmpnHproid,
        searchTablesecBaid,
        searchSocialsecurity,
        searchSecTaxunit,
        searchSocSecunit,
        searchSsecKickplace
    },
    props: {
        id: Number,
        // logType: String,
        index: Number,
    },
    updated () {

    },
    mounted(){
        this.getSelect();
        // 获取当期信息
        this.getHisData();
    },
    computed: {
        isChina () {
            if(this.addrCoutid === '中国' || this.addrCoutid === '') {
                return true
            }else {
                return false
            }
        }
    },
    methods: {
        // 保存参加工作日期
        empnWstimeChange(emptime,date){
            const t = this
            t.basicInformationDate = emptime
        },
        // 证件号码身份证验证
        empnIdcaypechange(value){
            const t = this
            // 重置证件号码 性别 出生日期，除身份证号类型性别出生日日期无法带出
            t.formValidate.empnIdcanum = ''
            t.formValidate.empnBirthdate = ''
            t.formValidate.empnGender = ''
            if(value=='01id'){
                this.ruleValidate.empnIdcanum = [ { required: true, validator: this.validIdtype, trigger: 'blur' },]
            }else{
                this.ruleValidate.empnIdcanum =[{ required: true, message: '证件号码不能为空', trigger: 'blur' },]
            }
        },
        // 出生日期与身份证匹配
        birthdate(rule, value, callback){
            const t = this
            if (!value) {
                return callback(new Error("出生日期不能为空"));
            } else if (t.formValidate.empnIdcaype=='01id'&&t.formValidate.empnIdcanum!=='') {
                if ("object" == typeof (value)) {
                    value = value.format("yyyy-MM-dd");
                }
                if(value!==t.getBirthdayFromIdCard(t.formValidate.empnIdcanum)){
                    return callback(new Error("出生日期与身份证不符请重新选择"));
                }  else {
                    return callback();
                }
            } else {
                return callback();
            }
        },
        // 根据身份证获取生日
        getBirthdayFromIdCard(idCard){
            var birthday = "";
            if(idCard != null && idCard != ""){
                if(idCard.length == 15){
                    birthday = "19"+idCard.substr(6,6);
                } else if(idCard.length == 18){
                    birthday = idCard.substr(6,8);
                }
                birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
                // birthday = new Date(birthday).format('yyyy-MM-dd');
                birthday = this.getDate(birthday)
            }
            return birthday;
        },
        //
        getDate(date){
            var t = Date.parse(date);
            if (!isNaN(t)) {
                return new Date(Date.parse(date.replace(/-/g, "/")));
            } else {
                return new Date();
            }
        },
        //日期修改
        DataChange (item) {
            if (item) {
                 t.formValidate.empnBirthdate = new Date(item).format('yyyy-MM-dd')
            }
        },
        // 根据身份证获取性别
        getSex(idCard){
            var sexStr = '';
            if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
                sexStr = 'man';
            }
            else {
                sexStr = 'woman';
            }
            return sexStr;
        },
        rowClassName(row){
            if(row.fmIsadm=='1'){
                return 'demo-table-info-row';
            }   else  {
                return '';
            }
            return '';
        },
        //家庭成员新增数据
        addNewArrayfamily (res) {
            const t = this
            t.datafamily.unshift(res)
        },
        updNewArrayfamily(res,index){
            const t = this
            t.datafamily.splice(index,1,res)
        },
        // 教育信息新增数据
        addNewArrayeducation(res){
            const t = this
            t.dataeducation.unshift(res)
        },
        updNewArrayeducation(res,index){
            const t = this
            t.dataeducation.splice(index,1,res)
        },
         // 工作经历新增数据
        addNewArrayworkexp(res){
            const t = this
            t.dataoccupational.unshift(res)
        },
        updNewArrayworkexp(res,index){
            const t = this
            t.dataoccupational.splice(index,1,res)
        },
         validMobile (rule, value, callback) {
            let reg = new RegExp("^[1][3,4,5,6,7,8,9][0-9]{9}$");
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("不是有效的手机号码"));
            } else {
                return callback();
            }
        },
        validEmail(rule, value, callback) {
            const t = this
            let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if (!value) {
                return callback(new Error("电子邮箱地址不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("不是有效的电子邮箱地址"));
            } else {
                return callback();
            }
        },
        validIdtype (rule, value, callback) {
            const t = this
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!value) {
                return callback(new Error("身份证不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("不是有效的身份证号码"));
            } else {
                t.formValidate.empnBirthdate = t.getBirthdayFromIdCard(value)
                if(t.getSex(value)=='man'){
                    t.formValidate.empnGender='01male'
                }else if(t.getSex(value)=='woman'){
                    t.formValidate.empnGender='02female'
                }else{
                    t.formValidate.empnGender='00unknown'
                }
                return callback();
            }
        },
        validPaycard (rule, value, callback) {
            let reg = /^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18})$/;
            if (!value) {
                return callback(new Error("卡号不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("不是有效的银行号码"));
            } else {
                return callback();
            }
        },
        // 下拉数据
        getSelect() {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'yesno,gender,nationtype,idtype,marriagestatus,householdtype,political,contactrelation',
            }).then((res) => {
                if (isSuccessNew(res, t)) {
                    t.yesOrNo = res.data.content[0].value[0].paramList
                    t.GenderList = res.data.content[0].value[1].paramList
                    t.nationtypeList = res.data.content[0].value[2].paramList
                    t.idtypeList = res.data.content[0].value[3].paramList,
                    t.recruitmarriaeList = res.data.content[0].value[4].paramList
                    t.householdtypeList = res.data.content[0].value[5].paramList
                    t.empnPolidList = res.data.content[0].value[6].paramList
                    t.relationshipList = res.data.content[0].value[7].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // 获取雇佣员工信息
        getHisData () {
            // 判断条件
            const t = this
            t.spinShow = true
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'EmpNewbaseinfo.baseByIds'
            }).then((res) => {
                if (isSuccessNew(res, t)) {
                    let datas = res.data.content[0].value
                    if ( datas && datas !== "{}") {
                        let data = JSON.parse(datas)
                        // console.log(data,"回显数据")
                        // 基本信息
                        t.formValidate.id = data.basicData.id
                        t.formValidate.empnName = data.basicData.empnName
                        t.formValidate.empnEname = data.basicData.empnEname
                        t.formValidate.empnPiny = data.basicData.empnPiny
                        t.formValidate.empnOld = data.basicData.empnOld
                        t.formValidate.empnGender = data.basicData.empnGender
                        t.formValidate.empnBirthdate = data.basicData.empnBirthdate
                        t.formValidate.empnValsdate = data.basicData.empnValsdate 
                        t.formValidate.empnValedate = data.basicData.empnValedate
                        t.formValidate.empnNation = data.basicData.empnNation
                        t.formValidate.empnCouid = data.basicData.empnCouid
                        t.formValidate.empnProvid = data.basicData.empnProvid
                        t.formValidate.empnIdcaype = data.basicData.empnIdcaype
                        t.formValidate.empnIdcanum = data.basicData.empnIdcanum
                        t.formValidate.empnPolid = data.basicData.empnPolid
                        t.formValidate.empnPolitime = data.basicData.empnPolitime
                        t.formValidate.empnWstime = data.basicData.empnWstime
                        t.formValidate.empnMarriage = data.basicData.empnMarriage
                        t.formValidate.empnHoutype = data.basicData.empnHoutype
                        t.formValidate.empnHproid = data.basicData.empnHproid
                        t.formValidate.empnHcityid = data.basicData.empnHcityid
                        t.formValidate.empnHcouid = data.basicData.empnHcouid
                        t.formValidate.empnPoscode = data.basicData.empnPoscode
                        t.formValidate.empnPosaddrs = data.basicData.empnPosaddrs
                        t.formValidate.empnMobile = data.basicData.empnMobile
                        t.formValidate.empnnProssioal = data.basicData.empnnProssioal
                        t.formValidate.empPerarch = data.basicData.empPerarch
                        t.formValidate.empBirthplace = data.basicData.empBirthplace
                        // 特殊回显
                        t.empnProvid = data.basicData.empnProvidDis
                        t.empnCouid = data.basicData.empnCouidDis
                        t.empnHproid = data.basicData.empnHproidDis
                        t.empnHcityid = data.basicData.empnHcityidDis
                        t.empnHcouid = data.basicData.empnHcouidDis
                        t.empPerarch = data.basicData.empPerarchDis
                        t.empBirthplace = data.basicData.empBirthplaceDis

                        // 地址信息
                        t.formValidateAddress.addrCoutid = data.addressData.addrCoutid
                        t.addrCoutid = data.addressData.addrCoutidDis
                        t.formValidateAddress.addrProid = data.addressData.addrProid
                        t.addrProid = data.addressData.addrProidDis
                        t.formValidateAddress.addrCityid = data.addressData.addrCityid
                        t.addrCityid = data.addressData.addrCityidDis
                        t.formValidateAddress.addrCouid = data.addressData.addrCouid
                        t.addrCouid = data.addressData.addrCouidDis
                        t.formValidateAddress.addrAddress = data.addressData.addrAddress
                        t.formValidateAddress.addrCardproid = data.addressData.addrCardproid
                        t.addrCardproid = data.addressData.addrCardproidDis
                        t.formValidateAddress.addrCardid = data.addressData.addrCardid
                        t.addrCardid = data.addressData.addrCardidDis
                        t.formValidateAddress.addrCardcouid = data.addressData.addrCardcouid
                        t.addrCardcouid = data.addressData.addrCardcouidDis
                        t.formValidateAddress.addrCardaddrs = data.addressData.addrCardaddrs

                        // 家庭成员信息
                        t.datafamily = data.familyData;
                        // 教育信息
                        if(data.educationData) {
                            t.dataeducation = data.educationData;
                        }
                        // 工作经历
                        t.dataoccupational = data.workExpData;
                        // 入职与社保信息
                        t.formValidateSocialsecurity.secEntdate = data.socialsecuritData.secEntdate
                        t.formValidateSocialsecurity.secTaxplace = data.socialsecuritData.secTaxplace
                        t.secTaxplace = data.socialsecuritData.secTaxplaceDis
                        t.formValidateSocialsecurity.secTaxunit = data.socialsecuritData.secTaxunit
                        t.secTaxunit =  data.socialsecuritData.secTaxunitDis
                        t.formValidateSocialsecurity.secSocsec = data.socialsecuritData.secSocsec ? data.socialsecuritData.secSocsec : '0'
                        t.formValidateSocialsecurity.secSocplace = data.socialsecuritData.secSocplace
                        t.secSocplace = data.socialsecuritData.secSocplaceDis
                        t.formValidateSocialsecurity.secSocomp = data.socialsecuritData.secSocomp
                        t.secSocomp = data.socialsecuritData.secSocompDis
                        t.formValidateSocialsecurity.secPeikifirst = data.socialsecuritData.secPeikifirst ? data.socialsecuritData.secPeikifirst : '0'
                        // 工资卡
                        // debugger
                        t.formValidatePaycard.secBaid = data.paycardData.secBaid
                        t.secBaid = data.paycardData.secBaidDis
                        t.formValidatePaycard.secBacard = data.paycardData.secBacard
                        t.formValidatePaycard.secBadech = data.paycardData.secBadech
                        // 特别声明
                        t.formValidateSpecialannouncement.stateLocalrelate = data.statementData.stateLocalrelate ? data.statementData.stateLocalrelate:'0'
                        t.formValidateSpecialannouncement.commentRz = data.statementData.commentRz
                        t.formValidateSpecialannouncement.stateIllness = data.statementData.stateIllness ? data.statementData.stateIllness : '0'
                        t.formValidateSpecialannouncement.commentJb = data.statementData.commentJb
                        t.formValidateSpecialannouncement.stateDrug = data.statementData.stateDrug ? data.statementData.stateDrug : '0'
                        t.formValidateSpecialannouncement.commentXd = data.statementData.commentXd
                        t.formValidateSpecialannouncement.stateOtherelate = data.statementData.stateOtherelate ? data.statementData.stateOtherelate : '0'
                        t.formValidateSpecialannouncement.commentCld = data.statementData.commentCld
                        t.formValidateSpecialannouncement.stateOtherecess = data.statementData.stateOtherecess ? data.statementData.stateOtherecess : '0'
                        t.formValidateSpecialannouncement.commentXg = data.statementData.commentXg
                        t.formValidateSpecialannouncement.stateDispute = data.statementData.stateDispute ? data.statementData.stateDispute : '0'
                        t.formValidateSpecialannouncement.commentLd = data.statementData.commentLd
                        t.formValidateSpecialannouncement.stateRestrict = data.statementData.stateRestrict ? data.statementData.stateRestrict : '0'
                        t.formValidateSpecialannouncement.commentJz = data.statementData.commentJz
                        t.formValidateSpecialannouncement.stateRelation = data.statementData.stateRelation ? data.statementData.stateRelation : '0'
                        t.formValidateSpecialannouncement.stateRelatName = data.statementData.stateRelatName
                        t.formValidateSpecialannouncement.stateRelatJob = data.statementData.stateRelatJob
                        t.formValidateSpecialannouncement.stateRelateship = data.statementData.stateRelateship
                        t.formValidateSpecialannouncement.stateRecomend = data.statementData.stateRecomend ? data.statementData.stateRecomend : '0'
                        t.formValidateSpecialannouncement.stateReconame = data.statementData.stateReconame
                        t.formValidateSpecialannouncement.stateRecomobile = data.statementData.stateRecomobile
                        t.formValidateSpecialannouncement.stateCommuniate = data.statementData.stateCommuniate ? data.statementData.stateCommuniate : '1'
                        t.formValidateSpecialannouncement.stateInsurance = data.statementData.stateInsurance ? data.statementData.stateInsurance : '0'
                        t.formValidateSpecialannouncement.comment = data.statementData.comment
                        // 附件信息
                        if(data.accessoryData.empnnBjfile) {
                            t.formValidateaccessory.empnnBjfile = data.accessoryData.empnnBjfile;
                            t.file = { name: data.accessoryData.empnnBjfile.split(':')[0]}
                        }
                        if(data.accessoryData.empnnPhotofile) {
                            t.formValidateaccessory.empnnPhotofile = data.accessoryData.empnnPhotofile;
                            t.file3 = { name: data.accessoryData.empnnPhotofile.split(':')[0]}
                        }
                        // offer确认
                        t.formValidateOffer.empnnJsoffer = data.offerData.empnnJsoffer ? data.offerData.empnnJsoffer : '1'

                        // accessoryData
                    } else {
                        // console.log("员工第一次进入");
                        return;
                    }

                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(()=>{
                t.spinShow = false
            })

        },
        // 上传文件授权书
        handleUpload(file) {
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                this.file = file
                this.uploadLocalFile()
                this.loadingStatus = true
                return false
                // if (t.formValidate.maemXlfile.length >= 5) {
                //     t.$Modal.warning({
                //         title: t.$t('reminder.remind'),
                //         content: '附件最多只能上传五个',
                //     })
                //     return
                // }
            } else {
                this.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 3,
                })
                return false
            }
            
        },
        removeFile3(){
            const t = this
            t.file= ''
            t.filekey = ''
            t.formValidateaccessory.empnnBjfile = ''
        },
        uploadLocalFile() {
            const t = this
            const formData = new FormData()
            formData.append('upfile', t.file)
            console.log(formData)
            uploadFile(formData).then(res => {
            for (const key in res.data) {
                t.file =  { name: key }
                t.filekey = res.data[key]
                t.formValidateaccessory.empnnBjfile = key + ':' + res.data[key]
            }
                t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: '上传成功',
                onOk: () => {
                    t.loadingStatus = false
                },
                })
            }).catch(() => {
            t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
            })
            })
        },
        // 上传工牌附件
        handleUpload3(file) {
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                this.file3 = file
                this.loadingStatus3 = true
                this.uploadLocalFile3()
                return false
            } else {
                this.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 3,
                })
                return false
            }
        },
        uploadLocalFile3() {
            const t = this
            const formData = new FormData()
            formData.append('upfile', t.file3)
            console.log(formData)
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.file3 =  { name: key }
                    t.filekey3 = res.data[key]
                    t.formValidateaccessory.empnnPhotofile = key + ':' + res.data[key]
                }
                t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: '上传成功',
                    onOk: () => {
                        t.loadingStatus3 = false
                    },
                })
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        removeFile3(){
            const t = this
            t.file3= ''
            t.filekey3 = ''
            t.formValidateaccessory.empnnPhotofile = ''
        },
        // 上传文件信息表
        handleUpload1(file) {
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                this.file1 = file
                this.loadingStatus1 = true
                this.uploadLocalFile1()
                return false
            } else {
                this.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 3,
                })
                return false
            }
        },
        uploadLocalFile1() {
            const t = this
            const formData = new FormData()
            formData.append('upfile', t.file1)
            console.log(formData)
            uploadFile(formData).then(res => {
            for (const key in res.data) {
                t.file1 =  { name: key }
                t.filekey1 = res.data[key]
                t.formValidate.empnnBjinfile = key + ':' + res.data[key]
            }
            t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: '上传成功',
                onOk: () => {
                    t.loadingStatus1 = false
                },
                })
            }).catch(() => {
            t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
            })
            })
        },
        removeFile1(){
            const t = this
            t.file= ''
            t.filekey = ''
            t.formValidateaccessory.empnnBjinfile = ''
        },
         // 子女出生证明/户口页(18岁以下)
        handleUpload2(file) {
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                this.file2 = file
                this.loadingStatus2 = true
                this.uploadLocalFile2()
                return false
            } else {
                this.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
        },
        uploadLocalFile2() {
            const t = this
            const formData = new FormData()
            formData.append('upfile', t.file2)
            console.log(formData)
            uploadFile(formData).then(res => {
            for (const key in res.data) {
                t.file2 =  { name: key }
                t.filekey2 = res.data[key]
                t.formValidate.empnnBirfile = key + ':' + res.data[key]
            }
            t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: '上传成功',
                onOk: () => {
                    t.loadingStatus1 = false
                },
            })
            }).catch(() => {
            t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
            })
            })
        },
        // 家庭成员
        addfamily(){
            const t = this
            t.logType =  t.$t("button.add")
            t.openfamily  = true
        },
        openUpfamily(data,logType,index){
            const t = this
            t.logType =  t.$t("button.y.upd")
            t.openfamily  = true
            t.$refs.searchTablefamily.getData(data,logType,index)
        },
        deletefamily(data,logType,index){
            const t = this
            if(data){
                t.datafamily.splice(index,1)
            }
        },
        changeinputfamily(){

        },
         // 教育信息
        addeducation(){
            const t = this
            t.logType =  t.$t("button.add")
            t.openeducation = true
        },
        openUpeducation(data,logType,index){
            const t = this
            t.logType =  t.$t("button.y.upd")
            t.openeducation = true
            t.$refs.searchTableeducation.getData(data,logType,index)
        },
        deleteeducation(data,logType,index){
            const t = this
            if(data){
                t.dataeducation.splice(index,1)
            }
        },
        changeinputeducation(){

        },
        // 工作经历
        addoccupational(data,logType,index){
            const t = this
            t.logType =  t.$t("button.add")
            t.openoccupational = true
        },
        openUpoccupational(data,logType,index){
            const t = this
            t.logType =  t.$t("button.y.upd")
            t.openoccupational = true
            t.$refs.searchTableoccupational.getData(data,logType,index)
        },
        deleteoccupational(data,logType,index){
            const t = this
            if(data){
                t.dataoccupational.splice(index,1)
            }
        },
        changeinputoccupational(){

        },
        //人事档案所在地
        openModalempPerarch(){
            const t = this
            const name = '城市'
            const type = '类型'
            const cityType = '02city'
            const cityPid = ''
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,cityPid)
            t.title = '人事档案所在地'
            t.typeName = '基本信息'
        },
        openModalempbirPlace(){
            const t = this
            const name = '城市'
            const type = '类型'
            const cityType = '02city'
            const cityPid = ''
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,cityPid)
            t.title = '出生地点'
            t.typeName = '基本信息'
        },
        changeinputempBirPlace(row){
            const t = this
            t.formValidate.empBirthplace = row.id
            t.empBirthplace = row.cityName
        },
        dubClearempbirPlace(){
            const t = this
            t.formValidate.empBirthplace = ''
            t.empBirthplace = ''
        },
        // 国籍
        openModalempnCouid(){
            const t = this
            t.openCountry = true
            t.$refs.searchTableCountry.getData()
            t.typeName = '基本信息'
        },
        changeinputCountry(name,id){
            const t = this
            t.empnCouid = name
            t.formValidate.empnCouid = id
        },
        dubCleareempnCouid(){
            const t = this
            t.empnCouid = ''
            t.formValidate.empnCouid = ''
        },
        dubCleareempPerarch(){
            const t = this
            t.empPerarch = ''
            t.formValidate.empPerarch = ''
        },
        // 开户行
        openModalsecBaid(){
            const t = this
            t.opensecBaid = true
            t.$refs.searchTablesecBaid.getData()
            t.typeName = '工资卡信息'
        },
        changeinputsecBaid(row){
            const t = this
            t.formValidatePaycard.secBaid = row.id
            t.secBaid = row.cpbkName
        },
        dubClearesecBaid(){
            const t = this
            t.formValidatePaycard.secBaid = ''
            t.secBaid = ''
        },
        // 个税缴纳地
        openModalSocialsecurity(){
            const t = this
            const name = '城市'
            const type = '类型'
            const cityType = '02city'
            const cityPid = ''
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,cityPid)
            t.title = '个税缴纳地'
            t.typeName = '入职与社保信息'
            // t.openSocialsecurity = true
            // t.$refs.searchSocialsecurity.getData()
            // t.typeName = '个税缴纳地'
        },
        changeinputSocialsecurity(row){
            const t = this
            t.formValidateSocialsecurity.secTaxplace = row.id
            t.secTaxplace = row.cityName
        },
        // changeinputSocialsecurity(row){
        //     const t = this
        //     t.formValidateSocialsecurity.secTaxplace = row.id
        //     t.secTaxplace = row.secpDesc
        // },
        dubCleareSocialsecurity(){
            const t = this
            t.formValidateSocialsecurity.secTaxplace = ''
            t.secTaxplace = ''
        },
        // 报税公司
        openModalSecTaxunit(){
            const t = this
            t.openSecTaxunit = true
            t.$refs.searchSecTaxunit.getData()
            t.typeName = '报税公司'
        },
        changeinputSecTaxunit(row){
            const t = this
            t.formValidateSocialsecurity.secTaxunit = row.id
            t.secTaxunit = row.legtStdescribe
        },
        dubCleareSecTaxunit(){
            const t = this
            t.formValidateSocialsecurity.secTaxunit = ''
            t.secTaxunit = ''
        },
        // 社保缴纳地
        openModalsecSocplace(){
            // const t = this
            // const name = '城市'
            // const type = '类型'
            // const cityType = '02city'
            // const cityPid = ''
            // t.openEmpnHproid = true
            // t.$refs.searchTableEmpnHproid.getData(name,type,cityType,cityPid)
            // t.title = '社保缴纳地'
            // t.typeName = '入职与社保信息'
            // const t = this
            // t.openSocialsecurity = true
            // t.$refs.searchSocialsecurity.getData()
            // t.typeName = '社保缴纳地'
            const t = this;
            t.openSsecKickplace = true;
            t.$refs.searchSsecKickplace.getData()
        },
        changeinputsecSocplace (row) {
            const t = this
            t.formValidateSocialsecurity.secSocplace = row.id
            t.secSocplace = row.placCityidDis
            t.secSocplaceId = row.placCityid
            localStorage.setItem('secSocplaceId', row.placCityid)
        },
        // changeinputsecSocplace(row){
        //     const t = this
        //     t.formValidateSocialsecurity.secSocplace = row.id
        //     t.secSocplace = row.cityName
        // },
        // changeinputsecSocplace(row){
        //     const t = this
        //     t.formValidateSocialsecurity.secSocplace = row.id
        //     t.secSocplace = row.secpDesc
        // },
        dubClearesecSocplacey(){
            const t = this
            t.formValidateSocialsecurity.secSocplace = ''
            t.secSocplace = ''
            t.secSocplaceId = ''
        },
        // 社保缴纳公司
        openModalSocSecunit() {
            const t = this
            if(!t.secSocplaceId) {
                t.$Modal.warning({
                    title:'提示',
                    content: '请先选择社保缴纳地'
                })
                return
            }
            // t.secSocplaceId = t.formValidateSocialsecurity.secSocplace
            t.openSocSecunit = true
            t.$nextTick(() => {
                t.$refs.searchSocSecunit.getData()
            })
            t.typeName = '社保缴纳公司'
        },
        changeinputSocSecunit (row) {
            const t = this
            t.formValidateSocialsecurity.secSocomp = row.conCompid
            t.secSocomp = row.conCompidDis
        },
        delClearSocSecunit () {
            const t = this
            t.formValidateSocialsecurity.secSocomp = ''
            t.secSocomp = ''
        },
        // 籍贯弹窗
        openModalempnProvid(){
            const t = this
            const name = '城市'
            const type = '类型'
            const cityType = '02city'
            const cityPid = ''
            t.openEmpnHproid = true
            let col = {
                title: '省份城市',
                key: 'cityRegion',
                sortable: 'custom',
            }
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,cityPid,col)
            t.title = '籍贯'
            t.typeName = '基本信息'
        },
        changeinputEmpnProvid (row){
            const t = this
            t.formValidate.empnProvid = row.id
            t.empnProvid = row.cityRegion
        },
        dubClearempnProvid(){
            const t = this
            t.formValidate.empnProvid = ''
            t.empnProvid = ''
        },
        // 户口所在省
        openModalempnHproid(){
            const t = this
            const name = '省份'
            const type = '类型'
            const cityType = '01prov'
            const cityPid = '0'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,cityPid)
            t.title = '户口所在省'
            t.typeName = '基本信息'
        },
        changeinputEmpnHproid(row){
            const t = this
            t.empnHproid = row.cityName
            t.formValidate.empnHproid = row.id
            t.empnHcityid = ''
            t.formValidate.empnHcityid = ''
            t.empnHcouid = ''
            t.formValidate.empnHcouid =''
        },
        dubClearempnHproid(){
            const t = this
            t.empnHproid = ''
            t.formValidate.empnHproid = ''
            t.empnHcityid = ''
            t.formValidate.empnHcityid = ''
            t.empnHcouid = ''
            t.formValidate.empnHcouid =''
        },
        // 户口所在市
        openModalempnHcityid(){
            const t = this
            if(t.formValidate.empnHproid==''){
                t.$Modal.warning({
                    title: '提示',
                    content: '请先选择省份',
                })
                return
            }
            const name = '城市'
            const type = '类型'
            const cityType = '02city'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,t.formValidate.empnHproid)
            t.title = '户口所在市'
            t.typeName = '基本信息'
        },
         changeinputEmpnHcityid(row){
            const t = this
            t.empnHcityid = row.cityName
            t.formValidate.empnHcityid = row.id
        },
        changeinputempPerarch(row){
            const t = this
            t.empPerarch = row.cityName
            t.formValidate.empPerarch = row.id
        },
        dubClearempnHcityid(){
            const t = this
            t.empnHcityid = row.cityName
            t.formValidate.empnHcityid = row.id
        },
        // 户口所在区县
        openModalempnHcouid(){
            const t = this
            if(t.formValidate.empnHcityid==''){
                t.$Modal.warning({
                    title: '提示',
                    content: '请先选择城市',
                })
                return
            }
            const name = '区县'
            const type = '类型'
            const cityType = '03county'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,t.formValidate.empnHcityid)
            t.title = '户口所在区'
            t.typeName = '基本信息'
        },
        changeinputEmpnHcouid(row){
            const t = this
            t.empnHcouid = row.cityName
            t.formValidate.empnHcouid = row.id
        },
        dubClearempnHcouid(){
            const t = this
            t.empnHcouid = ''
            t.formValidate.empnHcouid = ''
        },
        // 现居住国家
        openModaladdrCoutid(){
            const t = this
            t.openCountry = true
            t.$refs.searchTableCountry.getData()
            t.typeName = '地址信息'
        },
        changeinputaddrCoutid(name,id){
            const t = this
            t.addrCoutid = name
            t.formValidateAddress.addrCoutid = id
            t.notChinaClear(name)
        },
        dubCleareaddrCoutid(){
            const t = this
            t.addrCoutid = ''
            t.formValidateAddress.addrCoutid = ''
        },
        // 现居住国家不是中国，隐藏现居住省市区，清空值
        notChinaClear(name) {
            const t = this
            let arr = ['addrProid','addrCityid','addrCouid','addrCardproid','addrCardid','addrCardcouid','addrCardaddrs']
            for(let v of arr) {
                if(name !== '中国') {
                    t.formValidateAddress[v] = ''
                    t[v] = ''
                }
            }
        },
        // 现居住所在省
        openModaladdrProid(){
            const t = this
            const name = '省份'
            const type = '类型'
            const cityType = '01prov'
            const cityPid = '0'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,cityPid)
            t.title = '现居住地所在省'
            t.typeName = '地址信息'
        },
        changeinputaddrProid(row){
            const t = this
            t.addrProid = row.cityName
            t.formValidateAddress.addrProid = row.id
             t.addrCityid = ''
            t.formValidateAddress.addrCityid = ''
            t.addrCouid = ''
            t.formValidateAddress.addrCouid =''
        },
        dubCleareaddrProid(){
            const t = this
            t.addrProid = ''
            t.formValidateAddress.addrProid = ''
              t.addrCityid = ''
            t.formValidateAddress.addrCityid = ''
            t.addrCouid = ''
            t.formValidateAddress.addrCouid =''
        },
        // 现居住所在市
        openModaladdrCityid(){
            const t = this
            if(t.formValidateAddress.addrProid==''){
                t.$Modal.warning({
                    title: '提示',
                    content: '请先选择省份',
                })
                return
            }
            const name = '城市'
            const type = '类型'
            const cityType = '02city'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,t.formValidateAddress.addrProid)
            t.title = '现居住地所在市'
            t.typeName = '地址信息'
        },
        changeinputaddrCityid(row){
            const t = this
            t.addrCityid = row.cityName
            t.formValidateAddress.addrCityid = row.id
        },
        dubCleareaddrCityid(){
            const t = this
            t.addrCityid = ''
            t.formValidateAddress.addrCityid = ''
        },
        // 现居住地所在区县
        openModaladdrCouid(){
            const t = this
            if(t.formValidateAddress.addrCityid==''){
                t.$Modal.warning({
                    title: '提示',
                    content: '请先选择城市',
                })
                return
            }
            const name = '区县'
            const type = '类型'
            const cityType = '03county'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,t.formValidateAddress.addrCityid)
            t.title = '现居住地所在区县'
            t.typeName = '地址信息'
        },
        changeinputaddrCouid(row){
            const t = this
            t.addrCouid = row.cityName
            t.formValidateAddress.addrCouid = row.id
        },
        dubCleareaddrCouid(){
            const t = this
            t.addrCouid = ''
            t.formValidateAddress.addrCouid = ''
        },
        // 身份证所在省
        openModaladdrCardproid(){
            const t = this
            const name = '省份'
            const type = '类型'
            const cityType = '01prov'
            const cityPid = '0'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,cityPid)
            t.title = '身份证所在省'
            t.typeName = '地址信息'
        },
        changeinputaddrCardproid(row){
            const t = this
            t.addrCardproid = row.cityName
            t.formValidateAddress.addrCardproid = row.id
            t.addrCardid = ''
            t.formValidateAddress.addrCardid = ''
            t.addrCardcouid = ''
            t.formValidateAddress.addrCardcouid =''
        },
        dubCleareaddrCardproid(){
            const t = this
            t.addrCardproid = ''
            t.formValidateAddress.addrCardproid = ''
             t.addrCardid = ''
            t.formValidateAddress.addrCardid = ''
            t.addrCardcouid = ''
            t.formValidateAddress.addrCardcouid =''
        },
        // 身份证所在市
        openModaladdrCardid(){
            const t = this
            if(t.formValidateAddress.addrCardproid==''){
                t.$Modal.warning({
                    title: '提示',
                    content: '请先选择市',
                })
                return
            }
            const name = '城市'
            const type = '类型'
            const cityType = '02city'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,t.formValidateAddress.addrCardproid)
            t.title = '身份证所在市'
            t.typeName = '地址信息'
        },
        changeinputaddrCardid (row){
            const t = this
            t.addrCardid = row.cityName
            t.formValidateAddress.addrCardid = row.id
        },
        dubCleareaddrCardid(){
            const t = this
            t.addrCardid = ''
            t.formValidateAddress.addrCardid = ''
        },
        // 身份证所在区县
        openModaladdrCardcouid(){
            const t = this
            if(t.formValidateAddress.addrCardid==''){
                t.$Modal.warning({
                    title: '提示',
                    content: '请先选择城市',
                })
                return
            }
            const name = '区县'
            const type = '类型'
            const cityType = '03county'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name,type,cityType,t.formValidateAddress.addrCardid)
            t.title = '身份证所在区县'
            t.typeName = '地址信息'
        },
        changeinputaddrCardcouid (row){
            const t = this
            t.addrCardcouid = row.cityName
            t.formValidateAddress.addrCardcouid = row.id
        },
        dubCleareaddrCardcouid(){
             const t = this
            t.addrCardcouid = ''
            t.formValidateAddress.addrCardcouid = ''
        },
        // 保存
        save () {
            const t = this;
        } ,
        // 提交
        handleSubmit (val) {
            if (val == 1) {
                console.log("保存")
                this.buttontype = "update";
            } else if (val == 2) {
                console.log("提交")
                this.buttontype = "submit";
            }
            const t = this
            // 基本信息
            if ("string" == typeof (t.formValidate.empnBirthdate)&& t.formValidate.empnBirthdate !== "") {
                t.formValidate.empnBirthdate = new Date(t.formValidate.empnBirthdate)
            }
            if ("string" == typeof (t.formValidate.empnPolitime)&& t.formValidate.empnPolitime !== "") {
                t.formValidate.empnPolitime = new Date(t.formValidate.empnPolitime)
            }
            if ("string" == typeof (t.formValidate.empnWstime)&& t.formValidate.empnWstime !== "") {
                t.formValidate.empnWstime = new Date(t.formValidate.empnWstime);
            }
            if ("string" == typeof (t.formValidate.empnValsdate)&& t.formValidate.empnValsdate !== "") {
                t.formValidate.empnValsdate = new Date(t.formValidate.empnValsdate);
            }
            if ("string" == typeof (t.formValidate.empnValedate)&& t.formValidate.empnValedate !== "") {
                t.formValidate.empnValedate = new Date(t.formValidate.empnValedate);
            }
            console.log( t.formValidate,'基本信息表单')
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                     // 地址信息
                    this.$refs.formValidateAddress.validate((valid) => {
                        if(valid){
                            // 家庭成员信息
                            if(this.datafamily.length==0){
                                this.$Modal.warning({
                                    title: this.$t('reminder.remind'),
                                    content: '至少填写一条家庭成员信息',
                                })
                                this.$refs.nicework.scrollTop = 1066;
                                return
                            }
                            // 教育信息
                            if(this.dataeducation.length==0){
                                this.$Modal.warning({
                                    title: this.$t('reminder.remind'),
                                    content: '至少填写一条教育信息',
                                })
                                this.$refs.nicework.scrollTop = 1353;
                                return
                            }
                            // 教育信息
                            if(this.dataoccupational.length==0){
                                this.$Modal.warning({
                                    title: this.$t('reminder.remind'),
                                    content: '至少填写一条工作经历信息',
                                })
                                this.$refs.nicework.scrollTop = 1645;
                                return
                            }
                            if ("string" == typeof (t.formValidateSocialsecurity.secEntdate)&& t.formValidateSocialsecurity.secEntdate !== "") {
                                t.formValidateSocialsecurity.secEntdate = new Date(t.formValidateSocialsecurity.secEntdate);
                            }
                            // 入职与社保信息
                            this.$refs.formValidateSocialsecurity.validate((valid) => {
                                if(valid){
                                    // 工资卡
                                    this.$refs.formValidatePaycard.validate((valid) => {
                                        if(valid){
                                            // 特别声明
                                              this.$refs.formValidateSpecialannouncement.validate((valid) => {
                                                if(valid){
                                                    // 附件信息
                                                    this.$refs.formValidateaccessory.validate((valid) => {
                                                        if(valid){
                                                        t.spinShow = true
                                                        const data = {
                                                            _mt:  this.$global.mt+'EmpNewbaseinfo.addOrUpData',
                                                            APlogType:t.$t('button.add'),
                                                            buttontype: t.buttontype

                                                        }
                                                        if ("object" == typeof (t.formValidate.empnBirthdate)) {
                                                            t.formValidate.empnBirthdate = (t.formValidate.empnBirthdate).format("yyyy-MM-dd");
                                                        }
                                                        if ("object" == typeof (t.formValidate.empnPolitime)) {
                                                            t.formValidate.empnPolitime = (t.formValidate.empnPolitime).format("yyyy-MM-dd");
                                                        }
                                                        if ("object" == typeof (t.formValidate.empnWstime)) {
                                                            t.formValidate.empnWstime = (t.formValidate.empnWstime).format("yyyy-MM-dd");
                                                        }
                                                        if ("object" == typeof (t.formValidateSocialsecurity.secEntdate)) {
                                                            t.formValidateSocialsecurity.secEntdate = (t.formValidateSocialsecurity.secEntdate).format("yyyy-MM-dd");
                                                        }
                                                        if ("object" == typeof (t.formValidate.empnValsdate)) {
                                                            t.formValidate.empnValsdate = (t.formValidate.empnValsdate).format("yyyy-MM-dd");
                                                        }
                                                        if ("object" == typeof (t.formValidate.empnValedate)) {
                                                            t.formValidate.empnValedate = (t.formValidate.empnValedate).format("yyyy-MM-dd");
                                                        }
                                                        // 过滤删除为空字段
                                                        for(let i in t.formValidate){
                                                            if(t.formValidate[i]==''||t.formValidate[i]==undefined){
                                                                delete t.formValidate[i]
                                                            }
                                                        }
                                                        for(let i in t.formValidateAddress){
                                                            if(t.formValidateAddress[i]==''||t.formValidateAddress[i]==undefined){
                                                                delete t.formValidateAddress[i]
                                                            }
                                                        }
                                                        for(let i in t.formValidateSocialsecurity){
                                                            if(t.formValidateSocialsecurity[i]==''||t.formValidateSocialsecurity[i]==undefined){
                                                                delete t.formValidateSocialsecurity[i]
                                                            }
                                                        }
                                                        for(let i in t.formValidatePaycard){
                                                            if(t.formValidatePaycard[i]==''||t.formValidatePaycard[i]==undefined){
                                                                delete t.formValidatePaycard[i]
                                                            }
                                                        }
                                                        for(let i in t.formValidateSpecialannouncement){
                                                            if(t.formValidateSpecialannouncement[i]==''||t.formValidateSpecialannouncement[i]==undefined){
                                                                delete t.formValidateSpecialannouncement[i]
                                                            }
                                                        }
                                                        for(let i in t.formValidateaccessory){
                                                            if(t.formValidateaccessory[i]==''||t.formValidateaccessory[i]==undefined){
                                                                delete t.formValidateaccessory[i]
                                                            }
                                                        }
                                                        for(let i in t.datafamily){
                                                            if(t.datafamily[i].fmBirthdate==''||t.datafamily[i].fmBirthdate==undefined){
                                                                delete t.datafamily[i].fmBirthdate
                                                            }
                                                        }
                                                        for(let i in t.dataoccupational){
                                                            if(t.dataoccupational[i].workAdmsdate==''||t.dataoccupational[i].workAdmsdate==undefined){
                                                                delete t.dataoccupational[i].workAdmsdate
                                                            }
                                                        }
                                                        data.basicData = deepCopy(t.formValidate)
                                                        data.addressData = deepCopy(t.formValidateAddress)
                                                        data.socialsecuritData = deepCopy(t.formValidateSocialsecurity)
                                                        data.paycardData = deepCopy(t.formValidatePaycard)
                                                        data.familyData = t.datafamily
                                                        data.educationData = t.dataeducation
                                                        data.workExpData = t.dataoccupational
                                                        data.statementData = deepCopy(t.formValidateSpecialannouncement)
                                                        data.accessoryData = deepCopy(t.formValidateaccessory)
                                                        data.offerData =   deepCopy(t.formValidateOffer)
                                                        if(val === 2) {
                                                            t.$Modal.confirm({
                                                                title: '提示',
                                                                content: '提交后您将无法再进入当前页面修改信息，请保证您的所有信息填写无误，是否继续提交？',
                                                                onOk: () => {
                                                                    getDataLevelUserLoginData(data).then((res) => {
                                                                        if (isSuccessNew(res, t)) {
                                                                            setTimeout(()=>{
                                                                                t.$Modal.success({
                                                                                    title: this.$t('reminder.suc'),
                                                                                    content: '提交成功',
                                                                                })
                                                                            },1200)
                                                                            setTimeout(()=>{
                                                                                // 清除保存状态
                                                                                t.$Modal.remove()
                                                                                t.$router.push('/NewemployeeLoginmain/NewemployeeLogin')
                                                                                // 禁止回退
                                                                                history.pushState(null, null, document.URL);
                                                                                window.addEventListener('popstate', function () {
                                                                                    history.pushState(null, null, document.URL);
                                                                                });
                                                                            },2000)
                                                                        }
                                                                    }).catch(() => {
                                                                        this.$Modal.error({
                                                                            title: this.$t('reminder.err'),
                                                                            content: this.$t('reminder.errormessage'),
                                                                        })
                                                                    }).finally(()=>{
                                                                        t.spinShow = false
                                                                    })
                                                                },
                                                                onCancel: () => {
                                                                    t.spinShow = false
                                                                }
                                                            })
                                                        }else {
                                                            getDataLevelUserLoginData(data).then((res) => {
                                                                if (isSuccessNew(res, t)) {
                                                                    t.$Modal.success({
                                                                        title: this.$t('reminder.suc'),
                                                                        content: '保存成功',
                                                                    })
                                                                }
                                                            }).catch(() => {
                                                                this.$Modal.error({
                                                                    title: this.$t('reminder.err'),
                                                                    content: this.$t('reminder.errormessage'),
                                                                })
                                                            }).finally(()=>{
                                                                t.spinShow = false
                                                            })
                                                        }
                                                        }else{
                                                            this.validateError()
                                                        }
                                                    })
                                                    }else{
                                                        this.validateError()
                                                    }
                                                })
                                            }else{
                                                this.validateError()
                                            }
                                        })
                                        
                                }else{
                                    this.validateError()
                                }
                            })
                        }else{
                            this.validateError()
                        }
                    })
                }else{
                    this.validateError()
                }
            })
        },
        validateError () {
            this.$nextTick(() => {
                let tt = document.querySelectorAll(".ivu-form-item-error");
                let dom = document.getElementsByClassName('box')[0];
                dom.scrollTop = tt[0].parentNode.parentNode.offsetTop - 130;
            });
        },
        // 地址保存
        handleSubmitAddress(){

        },
        dubClear () {
            const t = this
            if (t.logType !== this.$t('button.y.upd')) {
                t.paramTypeDis = ''
                t.formValidate.paramTypeDis = ''
            }
        },
        close () {
            const t = this
            t.openfamily = false
            t.openeducation = false
            t.openoccupational = false
            // 国籍弹窗
            t.openCountry = false
            // 政治面貌
            t.openPolitics = false
            // 省份
            t.openEmpnHproid = false
            // 开户行
            t.opensecBaid = false
            // 缴纳地
            t.openSocialsecurity = false
            // 报税公司
            t.openSecTaxunit = false
            // 社保缴纳公司
            t.openSocSecunit = false
            // 社保缴纳地
            t.openSsecKickplace = false
        },
        changeinput0(row){
            const t = this
            t.formValidate.paramCode = row.lanCode
            t.formValidate.paramInfoCn = row.lanCn
            t.formValidate.paramInfoEn =  row.lanEn
        },
        changeinput (name, id) {
            const t = this
            t.paramTypeDis = name
            t.formValidate.paramType = id
        },
        clearParamCode(){
            const t = this
            if (t.logType !== this.$t('button.y.upd')) {
                t.formValidate.paramCode = ''
                t.formValidate.paramInfoCn = ''
                t.formValidate.paramInfoEn = ''
            }
        },
        handleReset () {
            this.$refs.formValidate.resetFields()
            this.$refs.formValidateAddress.resetFields()
            this.$refs.formValidateSocialsecurity.resetFields()
            this.$emit('closeUp')
        },
    },
    watch: {},
}
</script>
<style lang="scss" scoped>
@import "../../sass/updateAndAdd";
/deep/.cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    /* align-items: center; */
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    background-image: url(../../../static/entryImg/background.png);
    background-size: cover;
    .box {
        position: absolute;
        width: 100%;
        background: none;
        padding: 130px 200px 0px 200px;
        // border-radius: 10px;
        max-height: 100%;
        overflow: auto;
    }

}
.cover .box .title {
    // display: -webkit-box;
    // display: -ms-flexbox;
    display: block;
    position: fixed;
    height: auto;
    width: 100%;
    // line-height: 40px;
    // -webkit-box-pack: justify;
    // -ms-flex-pack: justify;
    // justify-content: center;
    // -webkit-box-align: center;
    // -ms-flex-align: center;
    // align-items: center;
    padding-left: 0;
    top: 0;
    // border-bottom: 1px solid #efefef;
    left: 0;
    z-index: 1000;
    background: #fff;
}
.cover .box .title .title-logo {
    padding: 15px 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    img{
        width: 200px;
        height: 44px;
        display: block;
    }
}
.cover .box .title .title-text {
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    font-size: 22px;
    color: #fff;
    background: rgba(191, 0, 8, 1);
    text-align: center;
}
.cover .box .newform{
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
    box-shadow: 0px 5px 10px 5px #f5f5f5;
}
.ios-search {
  cursor: pointer;
}
.cover .box .form {
    max-height: 1000px;
    overflow-y: visible;
    margin: 10px;
    scrollbar-width: thin;
}

.dataBlocksTitle {
    font-size: 14px;
    color: #333333;
    position: relative;
    font-weight: bold;
    margin: 0 0 30px 0;
    span{
        display: block;
        width: 110px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        position: absolute;
        top: 0;
        left: 40px;
    }
}
.table-form{
    margin: 10px 0;
}
.ivu-date-picker {
    display: inline-block;
    line-height: normal;
    cursor: pointer;
}
.banner {
    padding: 0 50px;
    margin: 10px 0 30px 0;
    img{
        width: 100%;
    }
}
// /deep/ .firstblocks  .ivu-form .ivu-form-item-label {
//         font-size: 12px !important;
//         height: 32px !important;
//         width: 70% !important;
//     }
/deep/ .firstblocks .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 0 !important;
}
/deep/ .specialment1 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 80px !important;
}
/deep/ .specialment2 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 135px !important;
}
/deep/ .specialment3 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 50px !important;
}
/deep/ .specialment4 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 85px !important;
}
/deep/ .specialment5 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 85px !important;
}
/deep/ .specialment6 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 130px !important;
}
/deep/ .specialmentComment .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 50px !important;
}
.ivu-upload-select{
    cursor: pointer;
}
.firstblock{
    padding: 0px 50px 20px 50px;
}
.firstblocks{
    padding: 40px 50px 20px 50px;
}
.addDataClass{
    margin-left: 17px;
    .addCursor{
        cursor: pointer;
        display: flex;
        span{
            padding-left: 5px;
        }
    }
}
.message {
    background-color: #f7e2e4;
    padding: 0 10px;
}
.uploadBtn{
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    span{
        padding-left: 10px;
    }
}
    /deep/ .firstblock .ivu-table .demo-table-info-row td {
        background-color: #f7e2e4 !important;
        color: #333;
    }
    .ivu-table .demo-table-error-row td {
        background-color: #7ccd7c !important;
        color: #fff;
    }
    .ivu-table .demo-error-row td {
        /* background-color: #ff0000 !important; */
        color: #f00;
    }
    .ivu-table .demo-table-warning1-row td {
        background-color: #ed4014;
        color: #fff;
    }
    .ivu-radio-group-small .ivu-radio-wrapper-checked {
        background: #be0008;
        color: #fff;
    }
    .ivu-radio-group-button .ivu-radio-wrapper-checked {
        background: #be0008;
        border-color: #be0008;
        color: #fff;
        box-shadow: 1px 0 0 0 #be0008;
        z-index: 1;
    }
    /deep/ .ivu-radio-group-button .ivu-radio-wrapper:after, .ivu-radio-group-button .ivu-radio-wrapper:before{
        display: none;
    }
    /deep/.firstblock .ivu-radio-checked .ivu-radio-inner {
        border-color: #be0008;
    }
    /deep/.firstblock .ivu-radio-inner:after {
        background-color: #be0008;
    }
    .ivu-radio-group-button .ivu-radio-wrapper-checked.ivu-radio-focus:first-child{
        box-shadow: 0 0 0 0px rgba(45,140,240,.2);
    }
    .ivu-icon-md-alert:before {
        content: "\F333";
        color: #eb9d20;
    }
    /deep/  .uploadBtn .ivu-icon {
        color: #CC4649 !important;
    }
</style>
