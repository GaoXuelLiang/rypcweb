<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
            <div class="title">
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
            <div class="newform"
                 ref="nicework">
                <div class="headImg">
                    <div class="header-box">
                        <div class="header-cover"
                             @click="renderHeader">
                            点击上传头像
                        </div>
                        <div class="header"
                             style="">
                            <img :src="cropedImg===''?'../../../static/img/persion1.png':cropedImg"
                                 width="120"
                                 height="120">
                        </div>
                    </div>
                </div>
                <!-- 基本信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <Icon type="compose"
                              style="margin-right: 5px;"></Icon>员工基本信息
                    </div>
                    <Form ref="formValidate"
                          class="form"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="135">
                        <Row>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="姓名"
                                      prop="entEmpname">
                                <Input v-model="formValidateDis.entEmpname"
                                       placeholder="请输入姓名"
                                       disabled></Input>
                            </FormItem>
                            </Col>
                            <!-- <Col span="10"
                                    offset="2">
                                <FormItem label="英文名"
                                        prop="empnEname">
                                    <Input v-model="formValidate.empnEname"
                                        placeholder="请输入英文名"></Input>
                                </FormItem>
                                </Col> -->
                            <Col span="10"
                                 offset="2">
                            <FormItem label="姓名拼音"
                                      prop="entEmppny">
                                <Input v-model="formValidateDis.entEmppny"
                                       disabled
                                       placeholder="请输入姓名拼音"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <!-- <Row> -->
                        <!-- <Col span="10"
                                    offset="2">
                                <FormItem label="曾用名"
                                        prop="empnOld">
                                    <Input v-model="formValidate.empnOld"
                                        placeholder="请输入曾用名"></Input>
                                </FormItem>
                                </Col> 
                            </Row> -->
                        <Row>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="证件类型"
                                      prop="">
                                <Select v-model="formValidateDis.entIdcaype"
                                        @on-change='empnIdcaypechange'
                                        disabled
                                        placeholder="请选择证件类型">
                                    <Option v-for="item in idtypeList"
                                            :value="item.paramCode"
                                            :key="item.id">{{ item.paramInfoCn }}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="证件号码"
                                      prop="entIdcanum">
                                <Input v-model="formValidateDis.entIdcanum"
                                       disabled
                                       placeholder="请输入证件号码"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="性别"
                                      prop="">
                                <Select v-model="formValidateDis.entEmpgender"
                                        placeholder="请选择性别"
                                        disabled>
                                    <Option v-for="item in GenderList"
                                            :value="item.paramCode"
                                            :key="item.id">{{ item.paramInfoCn }}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="出生日期"
                                      prop="entEmpbirdate">
                                <DatePicker type="date"
                                            placeholder="请选择出生日期"
                                            style="width: 100%"
                                            :editable='false'
                                            disabled
                                            format="yyyy-MM-dd"
                                            v-model="formValidateDis.entEmpbirdate">
                                </DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="所属公司"
                                      prop="">
                                <Input v-model="formValidateDis.entEmpunitid"
                                       placeholder="请选择所属公司"
                                       disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="部门"
                                      prop="">
                                <Input v-model="formValidateDis.entEmpdepid"
                                       placeholder="请选择部门"
                                       disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="岗位"
                                      prop="">
                                <Input v-model="formValidateDis.entEmppoid"
                                       placeholder="请选择岗位"
                                       disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="入职日期"
                                      prop="secEntdate">
                                <DatePicker type="date"
                                            placeholder="请选择入职日期"
                                            style="width: 100%"
                                            :editable='false'
                                            disabled
                                            format="yyyy-MM-dd"
                                            v-model="formValidateDis.entEmpedate">
                                </DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="日常办公地"
                                      prop="">
                                <Input v-model="formValidateDis.entWorkplace"
                                       placeholder="请选择日常办公地"
                                       disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="员工分类"
                                      prop="">
                                <Input v-model="formValidateDis.entEmpcate"
                                       placeholder="请选择员工分类"
                                       disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <!-- 个人信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <Icon type="compose"
                              style="margin-right: 5px;"></Icon>个人信息
                    </div>
                    <Form ref="formValidate"
                          class="form"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="135">
                        <Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="英文名"
                                          prop="entEnname">
                                    <Input v-model="formValidate.entEnname"
                                           placeholder="请输入英文名"></Input>
                                </FormItem>
                                </Col>

                                <Col span="10"
                                     offset="2">
                                <FormItem label="曾用名"
                                          prop="entUsednm">
                                    <Input v-model="formValidate.entUsednm"
                                           placeholder="请输入曾用名"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="婚姻状况"
                                          prop="entMarriage">
                                    <Select v-model="formValidate.entMarriage"
                                            placeholder="请选择婚姻状况">
                                        <Option v-for="item in recruitmarriaeList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="个人邮箱"
                                          prop="entPermail">
                                    <Input v-model="formValidate.entPermail"
                                           placeholder="请输入邮箱地址"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="国籍"
                                          prop="entNationality">
                                    <span @dblclick="dubCleareempnCouid">
                                        <Input v-model="entNationality"
                                               placeholder="请选择国籍"
                                               @on-click="openModalempnCouid"
                                               readonly
                                               class="ios-search"
                                               icon='ios-search'></Input>
                                    </span>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="民族"
                                          prop="entNation">
                                    <Select v-model="formValidate.entNation"
                                            placeholder="请选择民族">
                                        <Option v-for="item in nationtypeList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="参加工作开始时间"
                                          prop="entWstime">
                                    <DatePicker type="date"
                                                placeholder="请选择参加工作开始时间"
                                                style="width: 100%"
                                                :editable='false'
                                                format="yyyy-MM-dd"
                                                v-model="formValidate.entWstime">
                                    </DatePicker>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="实际出生日期"
                                          prop="entSjbirth">
                                    <DatePicker type="date"
                                                placeholder="请选择实际出生日期"
                                                style="width: 100%"
                                                :editable='false'
                                                format="yyyy-MM-dd"
                                                v-model="formValidate.entSjbirth">
                                    </DatePicker>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="手机号"
                                          prop="entMobile">
                                    <Input v-model="formValidate.entMobile"
                                           disabled
                                           placeholder="请输入手机号"></Input>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="籍贯"
                                          prop="entProvid">
                                    <Input v-model="formValidate.entProvid"
                                           placeholder="请输入籍贯"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="进入中南集团日期"
                                          prop="entEzndate">
                                    <DatePicker type="date"
                                                placeholder="请选择进入中南集团日期"
                                                style="width: 100%"
                                                :editable='false'
                                                format="yyyy-MM-dd"
                                                v-model="formValidate.entEzndate">
                                    </DatePicker>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="政治面貌"
                                          prop="entPoils">
                                    <Select v-model="formValidate.entPoils"
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
                                     offset="2">
                                <FormItem label="政治面貌开始时间"
                                          prop="entPsdate">
                                    <DatePicker type="date"
                                                placeholder="请选择政治面貌开始时间"
                                                style="width: 100%"
                                                :editable='false'
                                                format="yyyy-MM-dd"
                                                v-model="formValidate.entPsdate">
                                    </DatePicker>
                                </FormItem>
                                </Col>
                                <!-- <Col span="10"
                                    offset="2">
                                <FormItem label="参加工作日期"
                                        prop="empnWstime">
                                    <DatePicker type="date"
                                                placeholder="请选择参加工作日期"
                                                style="width: 100%"
                                                :editable='false'
                                                 format="yyyy-MM-dd"
                                                v-model="formValidate.empnWstime">
                                    </DatePicker>
                                </FormItem>
                                </Col> -->
                                <!-- 党组织关系是否在公司-->
                                <Col span="10"
                                     offset="2">
                                <FormItem label="党组织关系是否转移到公司"
                                          prop="entIsincomp">
                                    <RadioGroup v-model="formValidate.entIsincomp"
                                                type="button"
                                                size="small">
                                        <Radio :label="item.paramCode"
                                               v-for="(item,index) in yesOrNo"
                                               :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="计算机水平"
                                          prop="entCuplevel">
                                    <Select v-model="formValidate.entCuplevel">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in selectComputerlevel"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="英语水平"
                                          prop="entEnglevel">
                                    <Select v-model="formValidate.entEnglevel">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in selectEnglishlevel"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                    <FormItem label="方便背调日期"
                                            prop="entBdtime">
                                        <DatePicker type="date"
                                                    placeholder="请选择方便背调日期"
                                                    style="width: 100%"
                                                    :editable='false'
                                                    format="yyyy-MM-dd"
                                                    v-model="formValidate.entBdtime">
                                        </DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="22"
                                     offset="2">
                                <FormItem label="既往病史"
                                          prop="entAnamnesis">
                                    <Input v-model="formValidate.entAnamnesis"
                                           type="textarea"
                                           placeholder="请输入既往病史" />
                                </FormItem>
                                </Col>
                            </Row>

                        </Row>
                    </Form>
                </div>
                <!-- 银行信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <Icon type="compose"
                              style="margin-right: 5px;"></Icon>银行账号
                    </div>
                    <Form ref="formValidateBank"
                          class="form"
                          :model="formValidateBank"
                          :rules="formBankRule"
                          :label-width="135">
                        <Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="工资银行名称"
                                          prop="entBkname">
                                    <span @dblclick="dubClearesecBaid">
                                        <Input v-model="entBkname"
                                               placeholder="请选择工资银行名称"
                                               @on-click="openModalsecBaid"
                                               readonly
                                               class="ios-search"
                                               icon='ios-search'></Input>
                                    </span>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="工资开户支行"
                                          prop="entBankid">
                                    <Input v-model="formValidateBank.entBankid"
                                           placeholder="请输入工资开户支行"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="工资银行账号"
                                          prop="entBkaccount">
                                    <Input v-model="formValidateBank.entBkaccount"
                                           placeholder="请输入工资银行账号"></Input>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="报销是否同工资卡"
                                          prop="entIsbxcard">
                                    <RadioGroup v-model="formValidateBank.entIsbxcard"
                                                type="button"
                                                size="small"
                                                @on-change="isSameCard">
                                        <Radio :label="item.paramCode"
                                               v-for="(item,index) in yesOrNo"
                                               :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row v-if="baoShow">
                                <Col span="10"
                                     offset="2">
                                <FormItem label="报销银行名称"
                                          prop="entBxbkname">
                                    <span @dblclick="dubClearesecBaid1">
                                        <Input v-model="entBxbkname"
                                               placeholder="请选择报销银行名称"
                                               @on-click="openModalsecBaid1"
                                               readonly
                                               class="ios-search"
                                               icon='ios-search'></Input>
                                    </span>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                     offset="2">
                                <FormItem label="报销开户支行"
                                          prop="">
                                    <Input v-model="formValidateBank.entBxbkid"
                                           placeholder="请输入报销开户支行"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row v-if="baoShow">
                                <Col span="10"
                                     offset="2">
                                <FormItem label="报销银行账号"
                                          prop="">
                                    <Input v-model="formValidateBank.entBxbkat"
                                           placeholder="请输入报销银行账号"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </div>
                <!-- 社保公积金信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <Icon type="compose"
                              style="margin-right: 5px;"></Icon>社保公积金信息
                    </div>
                    <Form ref="formValidateReserve"
                          class="form"
                          :model="formValidateReserve"
                          :rules="formReserveRule"
                          :label-width="135">
                        <Row>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="是否需要公司缴纳（社保公积金)"
                                      prop="entIscomjn">
                                <RadioGroup v-model="formValidateReserve.entIscomjn"
                                            type="button"
                                            size="small"
                                            @on-change="comjnChange">

                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in yesOrNo"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                 offset="2"
                                 v-show="comjinShow">
                            <FormItem label="社保公积金缴纳地"
                                      prop="entSbgjzpl">
                                <span @dblclick="dubClearesecSocplacey">
                                    <Input v-model="entSbgjzpl"
                                           placeholder="请选择社保公积金缴纳地"
                                           @on-click="openModalsecSocplace"
                                           readonly
                                           class="ios-search"
                                           icon='ios-search'></Input>
                                </span>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row v-show="comjinShow">
                            <Col span="10"
                                 offset="2">
                            <FormItem label="期望缴纳开始月份"
                                      prop="entQwsdate">
                                <DatePicker type="month"
                                            placeholder="期望缴纳开始月份"
                                            style="width: 100%"
                                            :editable='false'
                                            v-model="formValidateReserve.entQwsdate">
                                </DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <!-- 地址信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <Icon type="compose"
                              style="margin-right: 5px;"></Icon>地址信息
                    </div>
                    <Form ref="formValidateAddress"
                          class="form"
                          :model="formValidateAddress"
                          :rules="ruleValidateAddress"
                          :label-width="135">
                        <Row>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="户籍国家"
                                      prop="entHjcountry">
                                <span @dblclick="dubCleareaddrCoutid">
                                    <Input v-model="entHjcountry"
                                           placeholder="请选择现户籍国家"
                                           @on-click="openModaladdrCoutid"
                                           readonly
                                           class="ios-search"
                                           icon='ios-search'></Input>
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="户籍省份"
                                      prop="entHjpro">
                                <span @dblclick="dubCleareaddrProid">
                                    <Input v-model="entHjpro"
                                           placeholder="请选择现户籍省份"
                                           @on-click="openModaladdrProid"
                                           readonly
                                           class="ios-search"
                                           icon='ios-search'></Input>
                                </span>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="户籍城市/区县"
                                      prop="entHjcity">
                                <span @dblclick="dubCleareaddrCityid">
                                    <Input v-model="entHjcity"
                                           placeholder="请选择户籍城市/区县"
                                           @on-click="openModaladdrCityid"
                                           readonly
                                           class="ios-search"
                                           icon='ios-search'></Input>
                                </span>
                            </FormItem>
                            </Col>
                            <!-- <Col span="10"
                                 offset="2">
                            <FormItem label="户籍街道"
                                      prop="">
                                <Input v-model="addrCouid"
                                       placeholder="户籍街道"></Input>

                            </FormItem>
                            </Col> -->
                        </Row>
                        <Row>
                            <Col span="22"
                                 offset="2">
                            <FormItem label="户籍详细地址"
                                      prop="entHjaddr">
                                <Input v-model="formValidateAddress.entHjaddr"
                                       placeholder="请输入现居住地详细地址"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="居住是否同户籍"
                                      prop="entIsincomp">
                                <RadioGroup v-model="formValidateAddress.entIslivethj"
                                            type="button"
                                            size="small"
                                            @on-change="isLiveShow">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in yesOrNo"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                 v-if="liveShow"
                                 offset="2">
                            <FormItem label="居住国家"
                                      prop="entLivecy">
                                <span @dblclick="dubCleareaddrCoutid2">
                                    <Input v-model="entLivecy"
                                           placeholder="请选择居住国家"
                                           @on-click="openModaladdrCoutid2"
                                           readonly
                                           class="ios-search"
                                           icon='ios-search'></Input>
                                </span>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row v-if="liveShow">
                            <Col span="10"
                                 offset="2">
                            <FormItem label="居住省份"
                                      prop="entLivepro">
                                <span @dblclick="dubCleareaddrProid1">
                                    <Input v-model="entLivepro"
                                           placeholder="请选择现居住省份"
                                           @on-click="openModaladdrProid1"
                                           readonly
                                           class="ios-search"
                                           icon='ios-search'></Input>
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="10"
                                 offset="2">
                            <FormItem label="居住城市/区县"
                                      prop="entLivecity">
                                <span @dblclick="dubCleareaddrCityid1">
                                    <Input v-model="entLivecity"
                                           placeholder="请选择现居住城市/区县"
                                           @on-click="openModaladdrCityid1"
                                           readonly
                                           class="ios-search"
                                           icon='ios-search'></Input>
                                </span>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row v-if="liveShow">
                            <!-- <Col span="10"
                                 offset="2">
                            <FormItem label="居住街道"
                                      prop="">
                                <Input v-model="entLivestr"
                                       placeholder="居住街道"></Input>

                            </FormItem>
                            </Col> -->
                        </Row>
                        <Row v-if="liveShow">
                            <Col span="22"
                                 offset="2">
                            <FormItem label="居住详细地址"
                                      prop="entLiveaddr">
                                <Input v-model="formValidateAddress.entLiveaddr"
                                       placeholder="请输入居住详细地址"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <!-- 家庭成员信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <Icon type="compose"
                              style="margin-right: 5px;"></Icon>亲属信息
                    </div>
                    <div @click="addfamily()"
                         class="addDataClass"><span class="addCursor">
                            <Icon type="md-add-circle"
                                  size='18' /><span>新增亲属信息</span> <span class="tip">请尽量完善您的亲属信息</span>
                        </span></div>
                    <row class="table-form"
                         ref="table-formfanmily">
                        <Table stripe
                               height='200'
                               size="small"
                               ref="selectionfamily"
                               :row-class-name="rowClassName"
                               :columns="columnsfamily"
                               :data="datafamily"></Table>
                    </row>
                </div>
                <!-- 教育信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <Icon type="compose"
                              style="margin-right: 5px;"></Icon>教育信息
                    </div>
                    <div @click="addeducation()"
                         class="addDataClass"><span class="addCursor">
                            <Icon type="md-add-circle"
                                  size='18' /><span>新增教育信息</span> <span class="tip">请尽量完善您的教育信息</span>
                        </span></div>
                    <row class="table-form"
                         ref="table-formeducationy">
                        <Table stripe
                               height='200'
                               size="small"
                               ref="selectioneducation"
                               :columns="columnseducation"
                               :data="dataeducation"></Table>
                    </row>
                </div>
                <!-- 奖惩信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <Icon type="compose"
                              style="margin-right: 5px;"></Icon>职称证书
                    </div>
                    <div @click="addawars()"
                         class="addDataClass"><span class="addCursor">
                            <Icon type="md-add-circle"
                                  size='18' /><span>新增职称证书</span> <span class="tip">请尽量完善您的职称证书信息</span>
                        </span></div>
                    <row class="table-form"
                         ref="table-formoccupational">
                        <Table stripe
                               height='200'
                               size="small"
                               ref="selectionoccupational"
                               :columns="columnsAwars"
                               :data="dataawars"></Table>
                    </row>
                </div>
                <!-- 工作履历 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <Icon type="compose"
                              style="margin-right: 5px;"></Icon>工作履历
                    </div>
                    <div @click="addoccupational()"
                        class="addDataClass"><span class="addCursor">
                            <Icon type="md-add-circle"
                                size='18' /><span>新增工作履历</span> <span class="tip">请尽量完善您的工作履历信息</span>
                        </span>
                    </div>
                    <row class="table-form"
                         ref="table-formoccupational">
                        <Table stripe
                               height='200'
                               size="small"
                               ref="selectionoccupational"
                               :columns="columnsoccupational"
                               :data="dataoccupational"></Table>
                    </row>
                </div>

                <!-- 附件信息 -->
                <div class="firstblock">
                    <div class="dataBlocksTitle">
                        <Icon type="compose"
                              style="margin-right: 5px;"></Icon>附件信息
                    </div>
                    <Form ref="formValidateaccessory"
                          :model="formValidate"
                          :rules="ruleValidateaccessory"
                          label-position="right">

                        <FormItem label="体检报告"
                                  prop=""
                                  class="formItem"
                                  :label-width="300">
                            <Row>
                                <Col span="8"
                                     offset="2">
                                 <!-- <Input v-show="false" v-model="formValidate.entTjrep"/>      -->
                                <Upload :before-upload="handleUpload"
                                        action=" ">
                                    <!-- <Button icon="ios-cloud-upload-outline">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button> -->
                                    <span class="uploadBtn">
                                        <Icon type="md-cloud-upload"
                                              size="24" />
                                        <span>点击选择文件</span>
                                    </span>
                                </Upload>
                                </Col>
                                <Col span="8"
                                     offset="2">
                                <span v-if="file !== '' && file.name !== '0' "
                                      class="file">
                                    <Col span="20">
                                    <div class="upFile">
                                        <img class="fileImg"
                                             src="../../../static/fileImg/fileImg.png"
                                             alt="">
                                        <span class="fileName">{{$t('lang_role.imp.up2')}} {{ file.name}}</span>
                                    </div>
                                    </Col>
                                </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                     offset="2">
                                <!-- <Icon type="md-alert" size='18'/> -->
                                <!-- <span>背景调查授权书需手写签字，拍照或扫描后打包上传与此位置。</span> -->
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="职称证书(若有)"
                                  prop=""
                                  class="formItem"
                                  :label-width="300">
                            <Row>
                                <Col span="8"
                                     offset="2">
                                <!-- <Input v-show="false" v-model="formValidate.entZcfile"/>  -->
                                <Upload :before-upload="handleUpload1"
                                        action=" ">
                                    <!-- <Button icon="ios-cloud-upload-outline">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button> -->
                                    <span class="uploadBtn">
                                        <Icon type="md-cloud-upload"
                                              size="24" />
                                        <span>点击选择文件</span>
                                    </span>
                                </Upload>
                                </Col>
                                <Col span="8"
                                     offset="2">
                                <span v-if="file1 !== '' && file1.name !== '0' "
                                      class="file">
                                    <Col span="20">
                                    <div class="upFile">
                                        <img class="fileImg"
                                             src="../../../static/fileImg/fileImg.png"
                                             alt="">
                                        <span class="fileName">{{$t('lang_role.imp.up2')}} {{ file1.name}}</span>
                                    </div>
                                    </Col>
                                </span>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="离职证明"
                                  prop=""
                                  class="formItem"
                                  :label-width="300">
                            <Row>
                                <Col span="8"
                                     offset="2">
                                     <!-- <Input v-show="false" v-model="formValidate.entLzfile"/>  -->
                                <Upload :before-upload="handleUpload2"
                                        action=" ">
                                    <!-- <Button icon="ios-cloud-upload-outline">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button> -->
                                    <span class="uploadBtn">
                                        <Icon type="md-cloud-upload"
                                              size="24" />
                                        <span>点击选择文件</span>
                                    </span>
                                </Upload>
                                </Col>
                                <Col span="8"
                                     offset="2">
                                <span v-if="file2 !== '' && file2.name !== '0' "
                                      class="file">
                                    <Col span="20">
                                    <div class="upFile">
                                        <img class="fileImg"
                                             src="../../../static/fileImg/fileImg.png"
                                             alt="">
                                        <span class="fileName">{{$t('lang_role.imp.up2')}} {{ file2.name}}</span>
                                    </div>
                                    </Col>
                                </span>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem prop="entIcfile"
                                  label="身份证正反"
                                  class="formItem"
                                  :label-width="300">
                            <Row>
                                <Col span="8"
                                     offset="2">
                                    <Input v-show="false" v-model="formValidate.entIcfile"/>
                                    <Upload :before-upload="handleUpload3" action=" ">
                                        <!-- <Button icon="ios-cloud-upload-outline">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button> -->
                                        <span class="uploadBtn">
                                            <Icon type="md-cloud-upload" size="24"/>
                                            <span>点击选择文件</span>
                                        </span>
                                    </Upload>
                                </Col> 
                                <Col span="8" offset="2">
                                    <div v-for="(item,index) of uploadList" :key="index">

                                        <span v-if="formValidate.entIcfile !== '' && formValidate.entIcfile !== '0' " class="file">
                                        <Col span="16">
                                            <div class="upFile">
                                            <img class="fileImg" src="../../../static/fileImg/fileImg.png" alt="">
                                            <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.name}}</span>
                                            </div>
                                        </Col>
                                        <Col span="2">
                                            <span >
                                                <Button type="text"
                                                        @click="handleRemove(item,index)"
                                                        >
                                                    删除
                                                </Button>
                                            </span>
                                            
                                        </Col>
                                        <Col span="2" offset="2">
                                            <span>
                                                <Button type="text"
                                                        @click="downloadFile(item.filekey)"
                                                        >
                                                    下载
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
                                    </div>
                                </Col>
                               
                                <!-- <div class="upStyle">
                                    <div class="demo-upload-list"
                                         v-for="(item,index) in uploadList"
                                         :key="index">
                                        <template>
                                            <img :src="item">
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-eye-outline"
                                                      @click.native="handleView(item,index)"></Icon>
                                                <Icon type="ios-trash-outline"
                                                      @click.native="handleRemove(item,index)"></Icon>
                                            </div>
                                        </template>
                                    </div>
                                    <Upload ref="upload"
                                            :show-upload-list="false"
                                            action="/action"
                                            :on-success="handleSuccess"
                                            :format="['jpg','jpeg','png']"
                                            :max-size="2048"
                                            :on-format-error="handleFormatError"
                                            :on-exceeded-size="handleMaxSize"
                                            :before-upload="handleBeforeUpload"
                                            multiple
                                            type="drag"
                                            style="display: inline-block;width:58px;">
                                        <div style="width: 58px;height:58px;line-height: 58px;">
                                            <Icon type="ios-camera"
                                                  size="20"></Icon>
                                        </div>
                                    </Upload>
                                </div>

                                <Modal title="图片预览"
                                       v-model="visible"
                                       @on-ok="handelisOk">
                                    <img :src="imgName"
                                         v-if="visible"
                                         style="width: 100%">
                                </Modal> -->
                            </Row>
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Form>
                        <FormItem>
                            <Row>
                                <Col span="21"
                                     offset="2">
                                <Row type="flex"
                                     justify="center"
                                     align="bottom">
                                    <FormItem v-if="isReSubmit">
                                        <Button type="primary"
                                                @click="handleSubmit"
                                                style="margin-left: 8px;margin-top:40px;background: #be0008;border: 1px solid #be0008;width: 80px;">{{$t('button.subm')}}</Button>
                                    </FormItem>
                                    <FormItem v-if="!isReSubmit">
                                        <div class="noSubmit">您提交的资料正在整理中......</div>
                                    </FormItem>
                                </Row>
                                </Col>
                            </Row>
                        </FormItem>
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
                               @updNewArrayfamily='updNewArrayfamily'
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
        <!-- 任职信息 -->
        <transition name="fade">
            <searchAwars v-show="openAwars"
                         @closeUp="close"
                         :logType='logType'
                         @addNewArrayawars="addNewArrayawars"
                         @updNewArrayawars="updNewArrayawars"
                         ref="searchTableAwars"></searchAwars>
        </transition>
        <!-- 工作经历 -->
        <transition name="fade">
            <searchTableoccupational v-show="openoccupational"
                                     @closeUp="close"
                                     :logType='logType'
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
                                @changeinputaddrCoutid2='changeinputaddrCoutid2'
                                ref="searchTableCountry"></searchTableCountry>
        </transition>
        <!-- 城市信息 -->
        <transition name="fade">
            <searchTableEmpnHproid v-show="openEmpnHproid"
                                   @closeUp="close"
                                   :logType='logType'
                                   :typeName='typeName'
                                   :title="title"
                                   @changeinputEmpnHproid="changeinputEmpnHproid"
                                   @changeinputEmpnHcityid='changeinputEmpnHcityid'
                                   @changeinputEmpnHcouid='changeinputEmpnHcouid'
                                   @changeinputaddrProid='changeinputaddrProid'
                                   @changeinputaddrProid1='changeinputaddrProid1'
                                   @changeinputaddrCityid='changeinputaddrCityid'
                                   @changeinputaddrCityid1='changeinputaddrCityid1'
                                   @changeinputaddrCouid='changeinputaddrCouid'
                                   @changeinputaddrCardproid='changeinputaddrCardproid'
                                   @changeinputaddrCardid='changeinputaddrCardid'
                                   @changeinputaddrCardcouid='changeinputaddrCardcouid'
                                   ref="searchTableEmpnHproid"></searchTableEmpnHproid>
        </transition>

        <!-- 开户行 -->
        <transition name="fade">
            <searchTablesecBaid v-show="opensecBaid"
                                @closeUp="close"
                                :logType='logType'
                                :typeName='typeName'
                                @changeinputsecBaid='changeinputsecBaid'
                                @changeinputsecBaid1='changeinputsecBaid1'
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
    </div>
</template>
<script>

import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile, uploadimage, getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccessNew, deepCopy, isSuccess} from '../../lib/util'
import searchTableCountry from './searchCountry'
import searchTablepolitics from './searchTablepolitics'
import searchTableEmpnHproid from './searchTableEmpnHproid'
import searchTablefamily from './searchTablefamily'
import searchTableeducation from './searchTableeducation'
import searchTableoccupational from './searchTableoccupational'
import searchTablesecBaid from './searchTablesecBaid'
import searchSocialsecurity from './searchSocialsecurity'
import searchAwars from './searchAwars'
import imgEdit from '../../components/imgUpdate/imgEdit'
//import { delete } from 'vue/types/umd'

export default {
    data () {
        const validMobile = (rule, value, callback) => {
            let reg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("不是有效的手机号码"));
            } else {
                return callback();
            }
        }
        return {
            //是否重新提交
            isReSubmit:true,
            //是否需要社保
            comjinShow: true,
            //报销工资卡显隐
            baoShow: false,
            //报销工资卡显隐
            liveShow: false,
            imgName: '',
            visible: false,
            thisValue: '',
            dataId: JSON.parse(localStorage.getItem('params')).dataId,
            entIsallfile: JSON.parse(localStorage.getItem('params')).entIsallfile,
            fmfunId: JSON.parse(localStorage.getItem('params')).fmfunId,
            educfunId: JSON.parse(localStorage.getItem('params')).educfunId,
            certfunId : JSON.parse(localStorage.getItem('params')).certfunId ,
            workepfunId: JSON.parse(localStorage.getItem('params')).workepfunId,
            //dataId:"",
            uploadList: [],
            //头像
            cropedImg: '',
            cropedImgDis: '',
            httpImg: pubsource.pub_pubf_downlink,
            logType: '新增',
            openSocialsecurity: false,
            title: '',
            // 模块名称
            typeName: '',
            // 国籍
            openCountry: false,
            // 政治面貌
            openPolitics: false,
            // 户口所在省
            openEmpnHproid: false,
            // 开户行
            opensecBaid: false,
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

            //身份证正反
            file3: '',
            filekey3: [],
            loadingStatus3: false,


            // 是否
            yesOrNo: [],
            radiodata: [],
            // 性别
            GenderList: [],
            // 民族
            nationtypeList: [],
            // 证件类型
            idtypeList: [],
            // 婚姻
            recruitmarriaeList: [],
            // 户口类型
            householdtypeList: [],
            // 政治面貌
            empnPolidList: [],
            //计算机水平
            selectComputerlevel: [],
            //英语水平
            selectEnglishlevel: [],
            formValidateaccessory: {
                entBdsqsign: '',
                entOffersign: '',
                entIcfile: [],
            },
            // 附件验证
            ruleValidateaccessory: {
                entIcfile:[
                    {required:true,message:'请选择身份证证件上传',trigger:'blur,change'}
                ],
                entLzfile:[
                    {required:true,message:'请选择离职证明进行上传',trigger:'blur,change'}
                ],
                entZcfile:[
                    {required:true,message:'请选择职称证书进行上传',trigger:'blur,change'}
                ],
                entTjrep:[
                    {required:true,message:'请选择体检报告进行上传',trigger:'blur,change'}
                ],
            },
            // 家庭成员
            openfamily: false,
            columnsfamily: [
                {
                    title: '与员工关系',
                    key: 'etrfmRelationshipDis',
                },
                {
                    title: '工作单位',
                    key: 'etrfmWorkunits',
                },
                {
                    title: '联系电话',
                    key: 'etrfmTelephone',
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
                                style: {
                                    marginLeft: '8px'
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
            datafamily: [],
            // 教育信息
            openeducation: false,
            columnseducation: [
                {
                    title: '学校',
                    key: 'etreduSchools',
                },
                {
                    title: '专业',
                    key: 'etreduFstmajor',
                },
                {
                    title: '学历',
                    key: 'etreduEducationDis',
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
                                style: {
                                    marginLeft: '8px'
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
            dataeducation: [],
            //任职信息
            dataawars: [],
            openAwars: false,
            columnsAwars: [
                {
                    title: '证书名称',
                    key: 'etrzcCertname',
                },
                {
                    title: '证书级别',
                    key: 'etrzcCertlevelDis',
                },
                {
                    title: '发证单位',
                    key: 'etrzcLicenseunit',
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
                                        this.openAwarsBox(params.row, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.y.upd')),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                style: {
                                    marginLeft: '8px'
                                },
                                on: {
                                    click: () => {
                                        this.deletawarsbox(params.row, this.$t('button.del'), params.index)
                                    },
                                },
                            }, this.$t('button.del')),
                        ])
                    },
                },
            ],
            // 工作经历
            openoccupational: false,
            columnsoccupational: [
                {
                    title: '工作单位',
                    key: 'etrwkWorkunit',
                },
                {
                    title: '工作部门',
                    key: 'etrwkWorksector',
                },
                {
                    title: '工作岗位',
                    key: 'etrwkJobposition',
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
                                style: {
                                    marginLeft: '8px'
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
            dataoccupational: [],
            // 入职与社保信息
            secTaxplace: '',
            secSocplace: '',
            formValidateSocialsecurity: {
                secEntdate: '',
                secTaxplace: '',
                secTaxunit: '',
                secSocsec: '1',
                secSocplace: '',
                secPeikifirst: '1'
            },
            // 工资卡
            entBkname: '',
            formValidatePaycard: {
                entBkname: '',
                secBacard: '',
                secBadech: ''
            },
            // 特别声明
            formValidateSpecialannouncement: {
                stateLocalrelate: '0',
                commentRz: '',
                stateIllness: '0',
                commentJb: '',
                stateDrug: '0',
                commentXd: '',
                stateOtherelate: '0',
                commentCld: '',
                stateOtherecess: '0',
                commentXg: '',
                stateDispute: '0',
                commentLd: '',
                stateRestrict: '0',
                commentJz: '',
                stateRelation: '0',
                stateRelatName: '',
                stateRelatJob: '',
                stateRelateship: '',
                stateRecomend: '0',
                stateReconame: '',
                stateRecomobile: '',
                stateCommuniate: '1',
                stateInsurance: '0',
                comment: ''
            },
            // offer
            formValidateOffer: {
                empnnJsoffer: '1'
            },
            ruleValidateOffer: {
            },
            spinShow: false,
            // 基本信息
            entNationality: '',
            empnHproid: '',
            empnHcityid: '',
            empnHcouid: '',
            formValidateDis: {
                entEmpname: '',
                entEmppny: '',
                entIdcaype: '',
                entIdcanum: '',
                entEmpgender: '',
                entEmpbirdate: '',
                //所属公司
                entEmpunitid: "",
                entEmpdepid: '',
                entEmppoid: '',
                entEmpedate: '',
                entWorkplace: '',
                entEmpcate: '',
            },
            formValidate: {
                entEnname: '',
                entUsednm: '',
                entNation: '',
                entNationality: '',
                entProvid: '',
                entPoils: '',
                entPsdate: '',
                // empnWstime:'',
                entMarriage: '',
                // empnHoutype:'',
                // empnHproid:'',
                // empnHcityid:'',
                // empnHcouid:'',
                // empnPoscode:'',
                entPermail: '',
                // empnMobile:localStorage.userphone,
                //empnnProssioal:'',
                entWstime: '',
                entSjbirth: '',
                entMobile: '13333333333',
                entEzndate: '',
                entBdtime: '',
                entIsincomp: '0',
                entCuplevel: '',
                entEnglevel: '',
                entAnamnesis: '',
                entOffersign: '',
                entOffersign: '',
                entTjrep: '',
                entZcfile: '',
                entLzfile: '',
                entIcfile: '',

                entPhoto: '',
            },
            //银行账号
            entBkname: '',
            entBxbkname: '',
            formValidateBank: {
                entBkname: '',
                entBankid: '',
                entBkaccount: '',
                entIsbxcard: '1',
                entBxbkname: '',
                entBxbkid: '',
                entBxbkat: ''
            },
            //社保公积金信息
            entSbgjzpl: '',
            formValidateReserve: {
                entIscomjn: '1',
                entSbgjzpl: '',
                entQwsdate: '',
            },
            // 地址信息
            addrCoutid: '',
            addrProid: '',
            addrProid1: '',

            addrCityid: '',
            addrCityid1: '',
            addrCouid: '',
            addrCardproid: '',
            addrCardid: '',
            addrCardcouid: '',

            entHjcountry: '',
            //户籍省份
            entHjpro: '',
            //户籍区县
            entHjcity: '',
            entHjstreet: '',
            entHjaddr: '',

            entLivecy: '',
            //居住省份
            entLivepro: '',
            //居住区县
            entLivecity: '',
            entLivestr: '',
            addrCoutid2: '',
            formValidateAddress: {
                // addrCoutid:'',
                // addrProid:'',
                // addrProid1:'',
                // addrCityid:'',
                // addrCouid:'',
                // addrAddress:'',
                // addrCardproid:'',
                // addrCardid:'',
                // addrCardcouid:'',
                // addrCardaddrs:'',

                entHjcountry: '',
                entHjpro: '',
                entHjcity: '',
                entHjstreet: '',
                entHjaddr: '',
                entIslivethj: '1',

                entLivecy: '',
                entLivepro: '',
                entLivestr: '',
                entLiveaddr: '',
                entLivecity:'',
                // addrCoutid2:'',
                // addrCityid11:''
            },
            // 基本信息验证
            ruleValidate: {
                entEmpname: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' },
                ],
                entEmppny: [
                    { required: true, message: '姓名拼音不能为空', trigger: 'blur' },
                ],
                entEnname: [
                    { required: true, message: '英文名不能为空', trigger: 'blur' },
                ],
                entEmpgender: [
                    { required: true, message: '性别不能为空', trigger: 'change' },
                ],
                entEzndate: [
                    { required: true,  pattern: /.+/, message: '请选择进入中南集团日期', trigger: 'blur,change' },
                ],
                entBdtime: [
                    { required: true,  pattern: /.+/, message: '请选择启动背调日期', trigger: 'blur,change' },
                ],
                entPsdate: [
                    { required: true,  pattern: /.+/, message: '请选择进入政治面貌开始时间', trigger: 'blur,change' },
                ],
                entWstime: [
                    { required: true, pattern: /.+/, message: '请选择参加工作开始时间', trigger: 'blur, change' },
                ],
                entSjbirth: [
                    { required: true,  pattern: /.+/, message: '请选择实际出生日期', trigger: 'blur, change' },
                ],
                entNation: [
                    { required: true, message: '民族不能为空', trigger: 'change' },
                ],
                entNationality: [
                    { required: true, message: '国籍不能为空', trigger: 'change' },
                ],
                entProvid: [
                    { required: true, message: '籍贯不能为空', trigger: 'blur' },
                ],
                entIdcaype: [
                    { required: true, message: '证件类型不能为空', trigger: 'change' },
                ],
                entIsincomp: [
                    { required: true, message: '选择党组织关系', trigger: 'change' },
                ],
                entCuplevel: [
                    { required: true, message: '请选择计算机水平', trigger: 'change' },
                ],
                entEnglevel: [
                    { required: true, message: '请选择英语水平', trigger: 'change' },
                ],
                entAnamnesis: [
                    { required: true, message: '请输入既往病史', trigger: 'change' },
                ],
                entPoils: [
                    { required: true, message: '政治面貌不能为空', trigger: 'change' },
                ],
                empnWstime: [
                    { required: true, type: 'date', message: '参加工作日期不能为空', trigger: 'blur' },
                ],
                entMarriage: [
                    { required: true, message: '婚姻状况不能为空', trigger: 'blur,change' },
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
                entPermail: [
                    { required: true, message: '邮政地址不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入正确邮箱格式', trigger: 'blur' }

                ],
                entMobile: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { type: "string", pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机格式', trigger: 'blur' }
                ],
                entIdcanum: [
                    { required: true, message: '证件号码不能为空', trigger: 'blur' },
                ]
            },
            //银行验证
            formBankRule: {
                entBkname: [
                    { required: true, message: '请选择银行名称', trigger: 'blur，change' },
                ],
                entBankid: [
                    { required: true, message: '请输入开户行', trigger: 'blur' },
                ],
                entBkaccount: [
                    { required: true, message: '请输入工资银行账号', trigger: 'blur' },
                ],
                entIsbxcard: [
                    { required: true, message: '请选择是否同工资卡', trigger: 'blur' },
                ],
            },
            //社保验证
            formReserveRule: {
                entIscomjn: [
                    { required: true, message: '请选择是否缴纳社保', trigger: 'blur' }
                ],
                entSbgjzpl: [
                    { required: true, message: '请选择社保公积金缴纳地', trigger: 'change,blur' }
                ],
                entQwsdate: [
                    { required: true, pattern: /.+/, message: '请选择期望缴纳开始月份', trigger: 'change,blur' }
                ]
            },
            // 地址验证
            ruleValidateAddress: {
                entHjcountry: [
                    { required: true, message: '户籍国家不能为空', trigger: 'change' },
                ],
                entLivecy: [
                    { required: true, message: '居住国家不能为空', trigger: 'change' },
                ],
                entHjpro: [
                    { required: true, message: '户籍省份不能为空', trigger: 'change' },
                ],
                entLivepro: [
                    { required: true, message: '居住省份不能为空', trigger: 'change' },
                ],
                entHjcity: [
                    { required: true, message: '户籍城市/区县不能为空', trigger: 'change' },
                ],
                entLivecity: [
                    { required: true, message: '居住城市/区县不能为空', trigger: 'change' },
                ],
                addrCouid: [
                    { required: true, message: '现居住地所在区县不能为空', trigger: 'change' },
                ],
                entHjaddr: [
                    { required: true, message: '请输入户籍详细地址', trigger: 'blur' },
                ],
                entLiveaddr: [
                    { required: true, message: '请输入居住详细地址', trigger: 'blur' },
                ],
                addrCardproid: [
                    { required: true, message: '身份证所在省', trigger: 'change' },
                ],
                addrCardid: [
                    { required: true, message: '身份证所在市', trigger: 'change' },
                ],
                addrCardcouid: [
                    { required: true, message: '身份证所在区县', trigger: 'change' },
                ],
                addrCardaddrs: [
                    { required: true, message: '身份证详细地址', trigger: 'blur' },
                ]
            },
            // 入职与社保验证
            ruleValidateSocialsecurity: {
                secEntdate: [
                    { required: true, type: 'date', message: '入职日期不能为空', trigger: 'change' },
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
            },

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
        searchAwars,
        imgEdit
    },
    props: {
        id: Number,
        // logType: String,
        index: Number,
    },
    updated () {

    },
    created () {
        this.httpImg = pubsource.pub_pubf_downlink
        //      console.log('value----', this.value)
    },
    mounted () {
        this.getSelect()
        this.initData()
        this.tipMessage()
        //this.uploadList = this.$refs.upload.fileList;
        //判断是否回退
        if(this.dataId){
            this.initSetEntrFmData()
            this.initSetEntrEducData()
            this.initSetEntrCertData()
            this.initSetEntrWorkepData()
        }
    },
    methods: {
        tipMessage(){
            this.$Modal.success({
                title: '提示',
                content: '欢迎您请尽量完善您的子集信息',
            })
        },
        //获取亲属子集数据
        initSetEntrFmData(){
            const t = this
            let params = {
                _mt: t.$global.mt + 'EmpFlowEntrFm.getPage',
                APsort: 'id',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                APffk: `glc${t.fmfunId}`,
                APfunId: t.fmfunId,
            }
            let data =deepCopy(params)
            if(t.dataId){
                data.etrfmEmpfid = t.dataId
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                   
                    t.datafamily=res.data.content[0].rows
                    // for(let i =0;i<t.datafamily.length;i++){

                    //     if(t.datafamily[i].hasOwnProperty("id")){
                    //         delete t.datafamily[i].id
                    //     }
                    // }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
         //获取学历子集数据
        initSetEntrEducData(){
            const t = this
            let params = {
                _mt: t.$global.mt + 'EmpFlowEntrEduc.getPage',
                APsort: 'id',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                APffk: `glc${t.educfunId}`,
                APfunId: t.educfunId,
            }
            let data =deepCopy(params)
            if(t.dataId){
                data.etreduFid = t.dataId
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.dataeducation=res.data.content[0].rows
                    // for(let i =0;i<t.dataeducation.length;i++){

                    //     if(t.dataeducation[i].hasOwnProperty("id")){
                    //         delete t.dataeducation[i].id
                    //     }
                    // }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
         //获取职称证书子集数据
        initSetEntrCertData(){
            const t = this
            let params = {
                _mt: t.$global.mt + 'EmpFlowEntrCert.getPage',
                APsort: 'id',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                APffk: `glc${t.certfunId}`,
                APfunId: t.certfunId,
            }
            let data =deepCopy(params)
            if(t.dataId){
                data.etrzcFid = t.dataId
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                t.dataawars=res.data.content[0].rows
                // for(let i =0;i<t.dataawars.length;i++){

                //     if(t.dataawars[i].hasOwnProperty("id")){
                //         delete t.dataawars[i].id
                //     }
                // }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
         //获取工作履历子集数据
        initSetEntrWorkepData(){
            const t = this
            let params = {
                _mt: t.$global.mt + 'EmpFlowEntrWorkep.getPage',
                APsort: 'id',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                APffk: `glc${t.workepfunId}`,
                APfunId: t.workepfunId,
            }
            let data =deepCopy(params)
            if(t.dataId){
                data.etrwkFid = t.dataId
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                   t.dataoccupational=res.data.content[0].rows
                //    for(let i =0;i<t.dataoccupational.length;i++){

                //         if(t.dataoccupational[i].hasOwnProperty("id")){
                //             delete t.dataoccupational[i].id
                //         }
                //     }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        handelisOk () {

        },
        renderHeader () {
            const t = this
            this.$Modal.confirm({
                onOk: () => {
                    t.imgPack.handlecrop1()
                    // base64转图片的方法
                    const arr = t.imgPack.option1.cropedImg.split(',')
                    const mime = arr[0].match(/:(.*?);/)[1]
                    const bstr = atob(arr[1])
                    let n = bstr.length
                    const u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    const obj = new Blob([u8arr], { type: mime })
                    // base64转图片的方法
                    const formData = new FormData()
                    formData.append('upfile', obj, Date.parse(new Date()) + '.png')
                    uploadimage(formData).then((res) => {
                        if (res) {
                            for (const key in res.data) {
                                t.cropedImg = t.httpImg + res.data[key]
                                t.formValidate.entPhoto = key + ',' + res.data[key]
                            }
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                },
                render: (h) => {
                    return h(imgEdit, {
                        props: {
                            value: this.value,
                        },
                        attrs: {
                            id: 'imgEdit',
                            ref: 'imgEdit',
                        },
                        on: {
                            ok: (self) => {
                                t.imgPack = self
                            },
                        },

                    })
                },
            })
        },
        handleView (name, item) {
            const t = this
            t.visible = true
            t.imgName = name
        },
        downloadFile (row) {
            const t = this
            let filekey = row.split(':')[1]
            let filekeys = row.split(':')[0]
                console.log(row,'2222222')
                let data = {
                    _mt: this.$global.mt + 'UserInfo.getfiletoken',
                    APisprivate: true,
                    APlogType: '导出',
                    APfilekey: filekey,
                    APexpiresecs: 180,
                }
                getDataLevelUserLoginData(data).then((res) => {
                    
                    if (isSuccess(res, t)) {
                      
                        localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
                        if (this.isIE()) {
                            window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filekeys)
                        } else {
                            let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filekeys)
                            let link = document.createElement('a')
                            link.href = doclink
                            link.download = 'downloadfiletemp'
                            link.click()
                        }
                        this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
                        localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
        },

        handleRemove (file,i) {
            // const fileList = this.$refs.upload.fileList;
            // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            let fileName = ''
            this.uploadList.splice(this.uploadList.indexOf(file),1)
            //this.uploadList.splice(this.uploadList.indexOf(file),1)
            this.filekey3.splice(i,1)
            this.filekey3.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            this.formValidate.entIcfile = fileName.substr(0, fileName.length - 1)
            console.log(this.uploadList,'789456123')
            console.log( this.formValidate.entIcfile,'t.formValidate.entIcfile')

        },
        // handleSuccess (res, file) {
        //     console.log(res, 'ressss')
        //     console.log(file, 'fileeeee')
        // },
        // handleFormatError (file) {
        //     const t = this
        //     t.$Modal.warning({
        //         title: '文件格式不正确',
        //         content: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片',
        //     })
        // },
        // handleMaxSize (file) {
        //     const t = this
        //     t.$Modal.warning({
        //         title: '超出文件大小限制',
        //         content: '文件 ' + file.name + ' 太大，不能超过 2M',
        //     })
        // },
        handleUpload3 (file) {
            const t = this
            // const check = this.uploadList.length < 2;
            // if (!check) {
            //     t.$Modal.warning({
            //         title: '超出文件大小限制',
            //         content: '文件不数不能能超过2个',
            //     })
            // } else {
                const formData = new FormData()
                formData.append('upfile', file)
                uploadFile(formData).then((res) => {
                    let fileName = ''
                    for (const key in res.data) {
                        t.filekey3.push(key + ':' + res.data[key])
                        // t.file3.push(key)
                        //t.uploadList.push(t.httpImg + res.data[key])
                        t.uploadList.push({'name':key,'filekey':key + ':' + res.data[key]})

                    }
                    console.log(t.uploadList)
                    t.filekey3.forEach((item, index) => {
                        fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    })
                    t.formValidate.entIcfile = fileName.substr(0, fileName.length - 1)
                    console.log(fileName)
                    console.log( fileName.substr(0, fileName.length - 1),'3698745')
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
                // reader.readAsDataURL(file)
                // reader.onloadend = function (e) {
                // file.url = reader.result
                // t.uploadList.push(file)
                // t.$emit('on-change', file)
                //}
            // }
        },
        updateimg () {
            this.updateImg = true
        },
        closeImg () {
            const t = this
            t.updateImg = false
        },
        handleUploads (file) {
            this.file = file
            //        console.log('file----', file)
            this.thisValue = file.name
            this.loadingStatus = true
        },
        //报销是否同工资卡
        isSameCard (val) {
            if (val == '0') {
                this.baoShow = true
            } else {
                this.baoShow = false
            }
        },
        //居住是否同户籍
        isLiveShow (val) {
            if (val == '0') {
                this.liveShow = true
            } else {
                this.liveShow = false
            }
        },
        //社保公积金改变
        comjnChange (val) {
            if (val == '0') {
                this.comjinShow = false
            } else {
                this.comjinShow = true
            }
        },
        // 证件号码身份证验证
        empnIdcaypechange (value) {
            const t = this
            // 重置证件号码 性别 出生日期，除身份证号类型性别出生日日期无法带出
            t.formValidate.entIdcanum = ''
            t.formValidate.entEmpbirdate = ''
            t.formValidate.entEmpgender = ''
            if (value == '01id') {
                this.ruleValidate.entIdcanum = [{ required: true, validator: this.validIdtype, trigger: 'blur' },]
            } else {
                this.ruleValidate.entIdcanum = [{ required: true, message: '证件号码不能为空', trigger: 'blur' },]
            }
        },
        // 出生日期与身份证匹配
        birthdate (rule, value, callback) {
            const t = this
            if (!value) {
                return callback(new Error("出生日期不能为空"));
            } else if (t.formValidate.entIdcaype == '01id' && t.formValidate.entIdcanum !== '') {
                if ("object" == typeof (value)) {
                    value = value.format("yyyy-MM-dd");
                }
                if (value !== t.getBirthdayFromIdCard(t.formValidate.entIdcanum)) {
                    return callback(new Error("出生日期与身份证不符请重新选择"));
                } else {
                    return callback();
                }
            } else {
                return callback();
            }
        },
        // 根据身份证获取生日
        getBirthdayFromIdCard (idCard) {
            var birthday = "";
            if (idCard != null && idCard != "") {
                if (idCard.length == 15) {
                    birthday = "19" + idCard.substr(6, 6);
                } else if (idCard.length == 18) {
                    birthday = idCard.substr(6, 8);
                }
                birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
                // birthday = new Date(birthday).format('yyyy-MM-dd');
                birthday = this.getDate(birthday)
            }
            return birthday;
        },
        // 
        getDate (date) {
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
                t.formValidate.entEmpbirdate = new Date(item).format('yyyy-MM-dd')
            }
        },
        // 根据身份证获取性别
        getSex (idCard) {
            var sexStr = '';
            if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
                sexStr = 'man';
            }
            else {
                sexStr = 'woman';
            }
            return sexStr;
        },
        rowClassName (row) {
            if (row.fmIsadm == '1') {
                return 'demo-table-info-row';
            } else {
                return '';
            }
            return '';
        },
        //家庭成员新增数据
        addNewArrayfamily (res) {
            const t = this
            t.datafamily.unshift(res)
        },
        updNewArrayfamily (res, index) {
            const t = this
            t.datafamily.splice(index, 1, res)
        },
        // 教育信息新增数据
        addNewArrayeducation (res) {
            const t = this
            t.dataeducation.unshift(res)
        },
        updNewArrayeducation (res, index) {
            const t = this
            t.dataeducation.splice(index, 1, res)
        },
        //任职信息新增
        addNewArrayawars (res) {
            const t = this
            t.dataawars.unshift(res)
        },
        updNewArrayawars (res, index) {
            const t = this
            t.dataawars.splice(index, 1, res)
        },
        // 工作经历新增数据
        addNewArrayworkexp (res) {
            const t = this
            t.dataoccupational.unshift(res)
        },
        updNewArrayworkexp (res, index) {
            const t = this
            t.dataoccupational.splice(index, 1, res)
        },
        validIdtype (rule, value, callback) {
            const t = this
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!value) {
                return callback(new Error("身份证不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("不是有效的身份证号码"));
            } else {
                t.formValidate.entEmpbirdate = t.getBirthdayFromIdCard(value)
                if (t.getSex(value) == 'man') {
                    t.formValidate.entEmpgender = '01male'
                } else if (t.getSex(value) == 'woman') {
                    t.formValidate.entEmpgender = '02female'
                } else {
                    t.formValidate.entEmpgender = '00unknown'
                }
                return callback();
            }
        },
        validPaycard (rule, value, callback) {
            let reg = /^([1-9]{1})(\d{15}|\d{18})$/;
            if (!value) {
                return callback(new Error("卡号不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("不是有效的银行号码"));
            } else {
                return callback();
            }
        },
        // 下拉数据
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                APtypeCode: 'yesno,gender,nationtype,idtype,marrystatus,householdtype,political,computerlevel,englishlevel',
            }).then((res) => {
                if (isSuccessNew(res, t)) {
                    t.yesOrNo = res.data.content[0].value[0].paramList
                    t.GenderList = res.data.content[0].value[1].paramList
                    t.nationtypeList = res.data.content[0].value[2].paramList
                    t.idtypeList = res.data.content[0].value[3].paramList,
                        t.recruitmarriaeList = res.data.content[0].value[4].paramList
                    t.householdtypeList = res.data.content[0].value[5].paramList
                    t.empnPolidList = res.data.content[0].value[6].paramList
                    t.selectComputerlevel = res.data.content[0].value[7].paramList
                    t.selectEnglishlevel = res.data.content[0].value[8].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // 上传文件授权书
        handleUpload (file) {
            this.file = file
            this.uploadLocalFile()
            this.loadingStatus = true
            return false
        },
        uploadLocalFile () {
            const t = this
            const formData = new FormData()
            formData.append('upfile', t.file)
            console.log(formData)
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.file = { name: key }
                    t.filekey = res.data[key]
                    t.formValidate.entTjrep = key + ':' + res.data[key]
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

        // 上传文件信息表
        handleUpload1 (file) {
            this.file1 = file
            this.loadingStatus1 = true
            this.uploadLocalFile1()
            return false
        },
        uploadLocalFile1 () {
            const t = this
            const formData = new FormData()
            formData.append('upfile', t.file1)
            console.log(formData)
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.file1 = { name: key }
                    t.filekey1 = res.data[key]
                    t.formValidate.entZcfile = key + ':' + res.data[key]
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
        // 离职证明
        handleUpload2 (file) {
            this.file2 = file
            this.loadingStatus2 = true
            this.uploadLocalFile2()
            return false
        },
        uploadLocalFile2 () {
            const t = this
            const formData = new FormData()
            formData.append('upfile', t.file2)
            console.log(formData)
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.file2 = { name: key }
                    t.filekey2 = res.data[key]
                    t.formValidate.entLzfile = key + ':' + res.data[key]
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
        addfamily () {
            const t = this
            t.logType = t.$t("button.add")
            t.openfamily = true
        },
        openUpfamily (data, logType, index) {
            const t = this
            t.logType = t.$t("button.y.upd")
            t.openfamily = true
            t.$refs.searchTablefamily.getData(data, logType, index)
        },
        deletefamily (data, logType, index) {
            const t = this
            if (data) {
                t.datafamily.splice(index, 1)
            }
        },
        changeinputfamily () {

        },
        // 教育信息
        addeducation () {
            const t = this
            t.logType = t.$t("button.add")

            t.openeducation = true
        },
        openUpeducation (data, logType, index) {
            const t = this
            t.logType = t.$t("button.y.upd")
            t.openeducation = true
            t.$refs.searchTableeducation.getData(data, logType, index)
        },
        deleteeducation (data, logType, index) {
            const t = this
            if (data) {
                t.dataeducation.splice(index, 1)
            }
        },
        //任职信息
        addawars () {
            const t = this
            t.logType = t.$t("button.add")
            t.openAwars = true
        },
        openAwarsBox (data, logType, index) {
            const t = this
            t.logType = t.$t("button.y.upd")
            t.openAwars = true
            t.$refs.searchTableAwars.getData(data, logType, index)
        },
        deletawarsbox (data, logType, index) {
            const t = this
            if (data) {
                t.dataawars.splice(index, 1)
            }
        },
        changeinputeducation () {

        },
        // 工作经历
        addoccupational (data, logType, index) {
            const t = this
            t.logType = t.$t("button.add")
            t.openoccupational = true
        },
        openUpoccupational (data, logType, index) {
            const t = this
            t.logType = t.$t("button.y.upd")
            t.openoccupational = true
            t.$refs.searchTableoccupational.getData(data, logType, index)
        },
        deleteoccupational (data, logType, index) {
            const t = this
            if (data) {
                t.dataoccupational.splice(index, 1)
            }
        },
        changeinputoccupational () {

        },
        // 国籍
        openModalempnCouid () {
            const t = this
            t.openCountry = true
            t.$refs.searchTableCountry.getData()
            t.typeName = '基本信息'
        },
        changeinputCountry (name, id) {
            const t = this
            t.entNationality = name
            t.formValidate.entNationality = id
        },
        dubCleareempnCouid () {
            const t = this
            t.entNationality = ''
            t.formValidate.entNationality = ''
        },
        // 工资开户行 
        openModalsecBaid () {
            const t = this
            t.opensecBaid = true
            t.$refs.searchTablesecBaid.getData()
            t.typeName = '工资银行'
        },
        changeinputsecBaid (row) {
            const t = this
            t.formValidateBank.entBkname = row.id
            t.entBkname = row.bankCname
        },
        dubClearesecBaid () {
            const t = this
            t.formValidateBank.entBkname = ''
            t.entBkname = ''
        },
        // 撤销开户行 
        openModalsecBaid1 () {
            const t = this
            t.opensecBaid = true
            t.$refs.searchTablesecBaid.getData()
            t.typeName = '报销银行'
        },
        changeinputsecBaid1 (row) {
            const t = this
            t.formValidateBank.entBxbkname = row.id
            t.entBxbkname = row.bankCname
        },
        dubClearesecBaid1 () {
            const t = this
            t.formValidateBank.entBxbkname = ''
            t.entBxbkname = ''
        },
        // 个税缴纳地
        openModalSocialsecurity () {
            const t = this
            t.openSocialsecurity = true
            t.$refs.searchSocialsecurity.getData()
            t.typeName = '个税缴纳地'
        },
        changeinputSocialsecurity (row) {
            const t = this
            t.formValidateSocialsecurity.secTaxplace = row.id
            t.secTaxplace = row.secpDesc
        },
        dubCleareSocialsecurity () {
            const t = this
            t.formValidateSocialsecurity.secTaxplace = ''
            t.secTaxplace = ''
        },
        // 社保缴纳地
        openModalsecSocplace () {
            const t = this
            t.openSocialsecurity = true
            t.$refs.searchSocialsecurity.getData()
            t.typeName = '社保缴纳地'
        },
        changeinputsecSocplace (row) {
            const t = this
            t.formValidateReserve.entSbgjzpl = row.id
            t.entSbgjzpl = row.cityName
        },
        dubClearesecSocplacey () {
            const t = this
            t.formValidateReserve.entSbgjzpl = ''
            t.entSbgjzpl = ''
        },
        // 籍贯弹窗
        openModalempnProvid () {

        },
        dubClearempnProvid () {

        },
        // 户口所在省
        openModalempnHproid () {
            const t = this
            const name = '省份'
            const type = '类型'
            const cityType = '01prov'
            const cityPid = '0'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, cityPid)
            t.title = '户口所在省'
            t.typeName = '基本信息'
        },
        changeinputEmpnHproid (row) {
            const t = this
            t.empnHproid = row.cityName
            t.formValidate.empnHproid = row.id
            t.empnHcityid = ''
            t.formValidate.empnHcityid = ''
            t.empnHcouid = ''
            t.formValidate.empnHcouid = ''
        },
        dubClearempnHproid () {
            const t = this
            t.empnHproid = ''
            t.formValidate.empnHproid = ''
            t.empnHcityid = ''
            t.formValidate.empnHcityid = ''
            t.empnHcouid = ''
            t.formValidate.empnHcouid = ''
        },
        // 户口所在市
        openModalempnHcityid () {
            const t = this
            if (t.formValidate.empnHproid == '') {
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
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, t.formValidate.empnHproid)
            t.title = '户口所在市'
            t.typeName = '基本信息'
        },
        changeinputEmpnHcityid (row) {
            const t = this
            t.empnHcityid = row.cityName
            t.formValidate.empnHcityid = row.id
        },
        dubClearempnHcityid () {
            const t = this
            t.empnHcityid = row.cityName
            t.formValidate.empnHcityid = row.id
        },
        // 户口所在区县
        openModalempnHcouid () {
            const t = this
            if (t.formValidate.empnHcityid == '') {
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
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, t.formValidate.empnHcityid)
            t.title = '户口所在区'
            t.typeName = '基本信息'
        },
        changeinputEmpnHcouid (row) {
            const t = this
            t.empnHcouid = row.cityName
            t.formValidate.empnHcouid = row.id
        },
        dubClearempnHcouid () {
            const t = this
            t.empnHcouid = ''
            t.formValidate.empnHcouid = ''
        },
        // 户籍国家
        openModaladdrCoutid () {
            const t = this
            t.openCountry = true
            t.$refs.searchTableCountry.getData()
            t.typeName = '地址信息1'
        },
        changeinputaddrCoutid (name, id) {
            const t = this
            t.entHjcountry = name
            t.formValidateAddress.entHjcountry = id
        },
        dubCleareaddrCoutid () {
            const t = this
            t.entHjcountry = ''
            t.formValidateAddress.entHjcountry = ''
        },
        // 现居住国家
        openModaladdrCoutid2 () {
            const t = this
            t.openCountry = true
            t.$refs.searchTableCountry.getData()
            t.typeName = '地址信息2'
        },
        changeinputaddrCoutid2 (name, id) {
            const t = this
            t.entLivecy = name
            t.formValidateAddress.entLivecy = id
        },
        dubCleareaddrCoutid2 () {
            const t = this
            t.entLivecy = ''
            t.formValidateAddress.entLivecy = ''
        },
        //户籍所在省
        openModaladdrProid () {
            const t = this
            const name = '省份'
            const type = '类型'
            const cityType = '01prov'
            const cityPid = '0'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, cityPid)
            t.title = '户籍所在省'
            t.typeName = '地址信息'
        },
        changeinputaddrProid (row) {
            const t = this
            t.entHjpro = row.cityName
            t.formValidateAddress.entHjpro = row.id

        },
        dubCleareaddrProid () {
            const t = this
            t.entHjpro = ''
            t.formValidateAddress.entHjpro = ''
        },
        // 现居住所在省
        openModaladdrProid1 () {
            const t = this
            const name = '省份'
            const type = '类型'
            const cityType = '01prov'
            const cityPid = '0'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, cityPid)
            t.title = '现居住地所在省'
            t.typeName = '地址信息'
        },
        changeinputaddrProid1 (row) {
            const t = this
            t.entLivepro = row.cityName
            t.formValidateAddress.entLivepro = row.id

        },
        dubCleareaddrProid1 () {
            const t = this
            t.entLivepro = ''
            t.formValidateAddress.entLivepro = ''

        },
        // 户籍所在所在市
        openModaladdrCityid () {
            const t = this
            if (t.formValidateAddress.entHjpro == '') {
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
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, t.formValidateAddress.entHjpro)
            t.title = '户籍所在市'
            t.typeName = '地址信息'
        },
        changeinputaddrCityid (row) {
            const t = this
            t.entHjcity = row.cityName
            t.formValidateAddress.entHjcity = row.id
        },
        dubCleareaddrCityid () {
            const t = this
            t.entHjcity = ''
            t.formValidateAddress.entHjcity = ''
        },
        // 现居住所在市
        openModaladdrCityid1 () {
            const t = this
            if (t.formValidateAddress.entLivepro == '') {
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
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, t.formValidateAddress.entLivepro)
            t.title = '现居住地所在市'
            t.typeName = '地址信息'
        },
        changeinputaddrCityid1 (row) {
            const t = this
            t.entLivecity = row.cityName
            t.formValidateAddress.entLivecity = row.id
            // console.log(row,  t.formValidateAddress.entLivecity,'789456')
        },
        dubCleareaddrCityid1 () {
            const t = this
            t.entLivecity = ''
            t.formValidateAddress.entLivecity = ''
        },
        // 现居住地所在区县
        openModaladdrCouid () {
            const t = this
            if (t.formValidateAddress.addrCityid == '') {
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
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, t.formValidateAddress.addrCityid)
            t.title = '现居住地所在区县'
            t.typeName = '地址信息'
        },
        changeinputaddrCouid (row) {
            const t = this
            t.addrCouid = row.cityName
            t.formValidateAddress.addrCouid = row.id
        },
        dubCleareaddrCouid () {
            const t = this
            t.addrCouid = ''
            t.formValidateAddress.addrCouid = ''
        },
        // 身份证所在省
        openModaladdrCardproid () {
            const t = this
            const name = '省份'
            const type = '类型'
            const cityType = '01prov'
            const cityPid = '0'
            t.openEmpnHproid = true
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, cityPid)
            t.title = '身份证所在省'
            t.typeName = '地址信息'
        },
        changeinputaddrCardproid (row) {
            const t = this
            t.addrCardproid = row.cityName
            t.formValidateAddress.addrCardproid = row.id
            t.addrCardid = ''
            t.formValidateAddress.addrCardid = ''
            t.addrCardcouid = ''
            t.formValidateAddress.addrCardcouid = ''
        },
        dubCleareaddrCardproid () {
            const t = this
            t.addrCardproid = ''
            t.formValidateAddress.addrCardproid = ''
            t.addrCardid = ''
            t.formValidateAddress.addrCardid = ''
            t.addrCardcouid = ''
            t.formValidateAddress.addrCardcouid = ''
        },
        // 身份证所在市
        openModaladdrCardid () {
            const t = this
            if (t.formValidateAddress.addrCardproid == '') {
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
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, t.formValidateAddress.addrCardproid)
            t.title = '身份证所在市'
            t.typeName = '地址信息'
        },
        changeinputaddrCardid (row) {
            const t = this
            t.addrCardid = row.cityName
            t.formValidateAddress.addrCardid = row.id
        },
        dubCleareaddrCardid () {
            const t = this
            t.addrCardid = ''
            t.formValidateAddress.addrCardid = ''
        },
        // 身份证所在区县
        openModaladdrCardcouid () {
            const t = this
            if (t.formValidateAddress.addrCardid == '') {
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
            t.$refs.searchTableEmpnHproid.getData(name, type, cityType, t.formValidateAddress.addrCardid)
            t.title = '身份证所在区县'
            t.typeName = '地址信息'
        },
        changeinputaddrCardcouid (row) {
            const t = this
            t.addrCardcouid = row.cityName
            t.formValidateAddress.addrCardcouid = row.id
        },
        dubCleareaddrCardcouid () {
            const t = this
            t.addrCardcouid = ''
            t.formValidateAddress.addrCardcouid = ''
        },
        initData () {
            const t = this
            let data = {
                _mt: t.$global.mt + 'EmpFlowEntr.getById',
                APlogType: '查询数据',
                APffk: 0,
                APfunId: 2024,
                APid: t.dataId
                // APid:t.dataId
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccessNew(res, t)) {
                    const myVal = res.data.content[0]
                    if(myVal.curStep && myVal.curStep!==''){
                        if((myVal.curStep==='1712'&&myVal.curStepstate ==='p_flowst_3') || (myVal.curStep==='1713'&&myVal.curStepstate ==='p_flowst_2')){
                            t.isReSubmit = false
                        }
                    }
                    t.formValidateDis.entEmpname = myVal.entEmpname
                    t.formValidateDis.entEmppny = myVal.entEmppny
                    t.formValidateDis.entIdcaype = myVal.entIdcaype
                    t.formValidateDis.entIdcanum = myVal.entIdcanum
                    t.formValidateDis.entEmpgender = myVal.entEmpgender
                    t.formValidateDis.entEmpbirdate = myVal.entEmpbirdate
                    t.formValidateDis.entEmpunitid = myVal.entEmpunitidDis
                    t.formValidateDis.entEmpdepid = myVal.entEmpdepidDis
                    t.formValidateDis.entEmppoid = myVal.entEmppoidDis
                    t.formValidateDis.entEmpedate = myVal.entEmpedate
                    t.formValidateDis.entWorkplace = myVal.entWorkplaceDis
                    t.formValidateDis.entEmpcate = myVal.entEmpcateDis
                    t.formValidate.entPhoto = myVal.entPhoto
                    t.formValidate.entEnname = myVal.entEnname
                    t.formValidate.entUsednm = myVal.entUsednm
                    t.formValidate.entMarriage = myVal.entMarriage
                    t.formValidate.entPermail = myVal.entPermail
                    // t.formValidate.entNation = myVal.entNation
                    if(myVal.entNationalityDis){
                        
                        t.entNationality = myVal.entNationalityDis
                    }
                    // t.formValidate.entNationality = myVal.entNationality
                    t.formValidate.entMobile = myVal.entMobile
                    if(myVal.entBkname){

                        t.entBkname = myVal.entBknameDis
                    }
                    if(myVal.entBxbkname){
                        t.entBxbkname = myVal.entBxbknameDis
                    }
                    console.log('赋值后', t.formValidate);
                    if(myVal.entPhoto){
                         t.cropedImg = t.httpImg + myVal.entPhoto.split(',')[1]
                    }
                    for(let i in t.formValidate){
                        for(let m in myVal){
                            if(i===m && myVal[m]!==''){
                                t.formValidate[i] = myVal[m]
                            }
                        }
                    }
                    for(let i in t.formValidateBank){
                        for(let m in myVal){
                            if(i===m && myVal[m]!==''){
                                t.formValidateBank[i] = myVal[m]
                            }
                        }
                    }
                    if(myVal.entSbgjzpl){
                        t.entSbgjzpl = myVal.entSbgjzplDis
                    }
                    //体检报告
                    if(myVal.entTjrep){
                        t.file ={name:myVal.entTjrep.split(':')[0]}
                    }
                     //职称证书
                    if(myVal.entZcfile){
                        t.file1 ={name:myVal.entZcfile.split(':')[0]}
                    }
                     //离职证明
                    if(myVal.entLzfile){
                        t.file2 ={name:myVal.entLzfile.split(':')[0]}
                    }
                     //身份证
                    if(myVal.entIcfile){
                        console.log(myVal.entIcfile)
                        t.formValidate.entIcfile = myVal.entIcfile
                            let oneImg = myVal.entIcfile.split('|')
                            console.log(oneImg,'2222')
                            for(let i = 0; i< oneImg.length; i++ ){

                                let imgs = oneImg[i].split(':')[1]
                                t.uploadList.push({'name':oneImg[i].split(':')[0],'filekey':oneImg[i].split(':')[0]+':'+oneImg[i].split(':')[1]})
                                t.filekey3.push(oneImg[i].split(':')[0]+':'+oneImg[i].split(':')[1])
                            }
                    }
                    for(let i in t.formValidateReserve){
                        for(let m in myVal){
                            if(i===m && myVal[m]!==''){
                                t.formValidateReserve[i] = myVal[m]
                            }
                        }
                    }
                    if(myVal.entHjcountry){
                        t.entHjcountry = myVal.entHjcountryDis
                        t.entHjpro = myVal.entHjproDis
                        t.entHjcity = myVal.entHjcityDis
                    }
                    if(myVal.entLivecy){
                        t.entLivecy = myVal.entLivecyDis
                        t.entLivepro = myVal.entLiveproDis
                        t.entLivecity = myVal.entLivecityDis
                    }
                    for(let i in t.formValidateAddress){
                        for(let m in myVal){
                            if(i===m && myVal[m]!==''){
                                t.formValidateAddress[i] = myVal[m]
                            }
                        }
                    }
                }
            })
        },
        // 保存
        handleSubmit () {
            const t = this
            this.$refs.formValidate.validate((valid) => {

                if (valid) {
                    console.log(valid, 'formValidate')
                    this.$refs.formValidateBank.validate((valid) => {
                        if (valid) {
                            console.log(valid, 'formValidateBank')
                            this.$refs.formValidateReserve.validate((valid) => {

                                if (valid) {
                                   console.log(valid, 'formValidateReserve')

                                    this.$refs.formValidateAddress.validate((valid) => {
                                        if (valid) {
                                            this.$refs.formValidateaccessory.validate((valid)=>{
                                                if(valid){
                                                      console.log(valid, 'formValidateaccessory')
                                                    t.spinShow = true
                                                    const data = {
                                                        _mt: this.$global.mt + 'EmpFlowEntr.linkSubmit',
                                                        APlogType: t.$t('button.add'),
                                                        APfunId: '2024',
                                                        APflowId: '1066',
                                                        APstepId: '1712',
                                                        AProleType: '3user',
                                                    }
                                                    if ("object" == typeof (t.formValidate.entSjbirth)) {
                                                        t.formValidate.entSjbirth = (t.formValidate.entSjbirth).format("yyyy-MM-dd");
                                                    }
                                                    if ("object" == typeof (t.formValidate.entPsdate)) {
                                                        t.formValidate.entPsdate = (t.formValidate.entPsdate).format("yyyy-MM-dd");
                                                    }
                                                    if ("object" == typeof (t.formValidateReserve.entQwsdate)) {
                                                        t.formValidateReserve.entQwsdate = (t.formValidateReserve.entQwsdate).format("yyyy-MM");
                                                    }
                                                    if ("object" == typeof (t.formValidate.entWstime)) {
                                                        t.formValidate.entWstime = (t.formValidate.entWstime).format("yyyy-MM-dd");
                                                    }
                                                    if ("object" == typeof (t.formValidate.entEzndate)) {
                                                        t.formValidate.entEzndate = (t.formValidate.entEzndate).format("yyyy-MM-dd");
                                                    }
                                                    if ("object" == typeof (t.formValidate.entBdtime)) {
                                                        t.formValidate.entBdtime = (t.formValidate.entBdtime).format("yyyy-MM-dd");
                                                    }
                                                    if ("object" == typeof (t.formValidateSocialsecurity.secEntdate)) {
                                                        t.formValidateSocialsecurity.secEntdate = (t.formValidateSocialsecurity.secEntdate).format("yyyy-MM-dd");
                                                    }
                                                    if ("object" == typeof (t.formValidateSocialsecurity.secEntdate)) {
                                                        t.formValidateSocialsecurity.secEntdate = (t.formValidateSocialsecurity.secEntdate).format("yyyy-MM-dd");
                                                    }
                                                    // 过滤删除为空字段
                                                    for (let i in t.formValidate) {
                                                        if (t.formValidate[i] == '' || t.formValidate[i] == undefined) {
                                                            delete t.formValidate[i]
                                                        }
                                                    }
                                                    for (let i in t.formValidateAddress) {
                                                        if (t.formValidateAddress[i] == '' || t.formValidateAddress[i] == undefined) {
                                                            delete t.formValidateAddress[i]
                                                        }
                                                    }
                                                    for (let i in t.formValidateSocialsecurity) {
                                                        if (t.formValidateSocialsecurity[i] == '' || t.formValidateSocialsecurity[i] == undefined) {
                                                            delete t.formValidateSocialsecurity[i]
                                                        }
                                                    }
                                                    for (let i in t.formValidateBank) {
                                                        if (t.formValidateBank[i] == '' || t.formValidateBank[i] == undefined) {
                                                            delete t.formValidateBank[i]
                                                        }
                                                    }
                                                    for (let i in t.formValidateReserve) {
                                                        if (t.formValidateReserve[i] == '' || t.formValidateReserve[i] == undefined) {
                                                            delete t.formValidateReserve[i]
                                                        }
                                                    }
                                                    for (let i in t.formValidatePaycard) {
                                                        if (t.formValidatePaycard[i] == '' || t.formValidatePaycard[i] == undefined) {
                                                            delete t.formValidatePaycard[i]
                                                        }
                                                    }
                                                    for (let i in t.formValidateSpecialannouncement) {
                                                        if (t.formValidateSpecialannouncement[i] == '' || t.formValidateSpecialannouncement[i] == undefined) {
                                                            delete t.formValidateSpecialannouncement[i]
                                                        }
                                                    }
                                                    for (let i in t.formValidateaccessory) {
                                                        if (t.formValidateaccessory[i] == '' || t.formValidateaccessory[i] == undefined) {
                                                            delete t.formValidateaccessory[i]
                                                        }
                                                    }
                                                    for (let i in t.datafamily) {
                                                        if (t.datafamily[i] == '' || t.datafamily[i] == undefined) {
                                                            delete t.datafamily[i]
                                                        }
                                                    }
                                                    for (let i in t.dataawars) {
                                                        if (t.dataawars[i] == '' || t.dataawars[i] == undefined) {
                                                            delete t.dataawars[i]
                                                        }
                                                    }
                                                    for (let i in t.dataawars) {
                                                        if ('object' == typeof (t.dataawars[i].etrzcDatecert)) {
    
                                                            t.dataawars[i].etrzcDatecert = (t.dataawars[i].etrzcDatecert).format("yyyy-MM-dd");
                                                        }
                                                    }
                                                    for (let i in t.dataoccupational) {
                                                        if ('object' == typeof (t.dataoccupational[i].etrwkBeginyear)) {
    
                                                            t.dataoccupational[i].etrwkBeginyear = (t.dataoccupational[i].etrwkBeginyear).format("yyyy-MM-dd");
                                                        }
                                                    }
                                                    for (let i in t.dataoccupational) {
                                                        if ('object' == typeof (t.dataoccupational[i].etrwkEndyear)) {
    
                                                            t.dataoccupational[i].etrwkEndyear = (t.dataoccupational[i].etrwkEndyear).format("yyyy-MM-dd");
                                                        }
                                                    }
                                                    
                                                    for (let i in t.dataeducation) {
                                                        if ('object' == typeof (t.dataeducation[i].etreduEnrolment)) {
    
                                                            t.dataeducation[i].etreduEnrolment = (t.dataeducation[i].etreduEnrolment).format("yyyy-MM");
                                                        }
                                                    }
                                                    for (let i in t.dataeducation) {
                                                        if ('object' == typeof (t.dataeducation[i].etreduGraduation)) {
    
                                                            t.dataeducation[i].etreduGraduation = (t.dataeducation[i].etreduGraduation).format("yyyy-MM");
                                                        }
                                                    }
                                                    for (let i in t.dataoccupational) {
                                                        if (t.dataoccupational[i] == '' || t.dataoccupational[i] == undefined) {
                                                            delete t.dataoccupational[i]
                                                        }
                                                    }
                                                    for (let i in t.dataoccupational) {
                                                        if (t.dataoccupational[i].workAdmsdate == '' || t.dataoccupational[i].workAdmsdate == undefined) {
                                                            delete t.dataoccupational[i].workAdmsdate
                                                        }
                                                    }
                                                    let basicsData = deepCopy(t.formValidate)
                                                    let addressData = deepCopy(t.formValidateAddress)
                                                    let socialsecuritData = deepCopy(t.formValidateReserve)
                                                    let bankData = deepCopy(t.formValidateBank)
                                                    let target = { id: t.dataId == undefined ? '' : t.dataId }
                                                    //let target = {id:'1210'}
                                                    data.basicData = Object.assign(target, basicsData, addressData, socialsecuritData, bankData)
    
                                                    //data.paycardData = deepCopy(t.formValidatePaycard)
                                                    data.familyData = t.datafamily
    
                                                    data.educationData = t.dataeducation
                                                    data.workExpData = t.dataoccupational
                                                    data.awarsData = t.dataawars
                                                    // data.statementData = deepCopy(t.formValidateSpecialannouncement)
                                                    data.accessoryData = deepCopy(t.formValidateaccessory)
                                                    //data.offerData =   deepCopy(t.formValidateOffer)
                                                    getDataLevelUserLoginData(data).then((res) => {
                                                        if (isSuccessNew(res, t)) {
                                                            t.$Modal.success({
                                                                title: this.$t('reminder.suc'),
                                                                content: this.$t('reminder.savsuccess'),
                                                            })
                                                            setTimeout(() => {
                                                                t.$Modal.remove()
                                                                t.$router.push('/NewemployeeLoginmainzn/NewemployeeLoginzn')
                                                            }, 2000)
                                                        }
                                                    }).catch(() => {
                                                        this.$Modal.error({
                                                            title: this.$t('reminder.err'),
                                                            content: this.$t('reminder.errormessage'),
                                                        })
                                                    }).finally(() => {
                                                        t.spinShow = false
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        },
        // 地址保存
        handleSubmitAddress () {

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
            //任职信息
            t.openAwars = false
        },
        changeinput0 (row) {
            const t = this
            t.formValidate.paramCode = row.lanCode
            t.formValidate.paramInfoCn = row.lanCn
            t.formValidate.paramInfoEn = row.lanEn
        },
        changeinput (name, id) {
            const t = this
            t.paramTypeDis = name
            t.formValidate.paramType = id
        },
        clearParamCode () {
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
    watch: {
    },
}
</script>
<style lang="scss" scoped>
.cover {
    width: 100%;
    height: 100%;
    border-radius: none !important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
    outline: 0;
}
.cover .box .title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    // position: absolute;
    height: 50px;
    width: 100%;
    line-height: 50px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #efefef;
}
.cover .box .title .title-text {
    font-weight: bold;
    font-size: 18px;
    color: #333333;
}
.cover .box .newform {
    // max-height: 43rem;
    flex: 1;
    overflow-y: auto;
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
.cover .box {
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}
.dataBlocksTitle {
    font-size: 14px;
    padding: 0 10px;
    margin: 0 10px 20px 10px;
    height: 18px;
    line-height: 18px;
    font-weight: bold;
    border-left: 4px solid $title-left-color-huaxia;
    color: #333333;
}
.table-form {
    margin: 10px;
}
.ivu-date-picker {
    display: inline-block;
    line-height: normal;
    cursor: pointer;
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
.ivu-upload-select {
    cursor: pointer;
}
.firstblock {
    width: 90%;
    padding: 0px 150px 20px 150px;
}
.firstblocks {
    padding: 40px 50px 20px 50px;
}
.addDataClass {
    margin-left: 17px;
    .addCursor {
        cursor: pointer;
        display: flex;
        span {
            padding-left: 5px;
        }
    }
}
.uploadBtn {
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    span {
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
/deep/ .ivu-radio-group-button .ivu-radio-wrapper:after,
.ivu-radio-group-button .ivu-radio-wrapper:before {
    display: none;
}
/deep/.firstblock .ivu-radio-checked .ivu-radio-inner {
    border-color: #be0008;
}
/deep/.firstblock .ivu-radio-inner:after {
    background-color: #be0008;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked.ivu-radio-focus:first-child {
    box-shadow: 0 0 0 0px rgba(45, 140, 240, 0.2);
}
.ivu-icon-md-alert:before {
    content: "\F333";
    color: #eb9d20;
}
.demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}
.demo-upload-list img {
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}
.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
.likeClick {
    display: inline-block;
    margin-left: 16px;
}
.headImg {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.headImg .header-box {
    background: none;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.headImg .header-box .empBorder {
    display: flex;
    justify-content: center;
}
.headImg .header-box .headerContent {
    padding: 8px;
}
.header-box {
    display: flex;
    position: relative;
    justify-content: flex-end;
}
.tab-box {
    overflow-y: auto;
    height: 370px;
}
.header-cover {
    display: none;
    top: 0;
    right: 0;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 120px;
    height: 120px;
    background-color: rgba(0, 0, 0, 0.3);
}
.header-box:hover .header-cover {
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-box:hover {
    cursor: pointer;
}
.header {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    overflow: hidden;
}
.upStyle {
    margin-left: 7%;
}
.noSubmit{
    letter-spacing: 4px;
    line-height: 32px;
    font-size: 20px;
    font-weight: bold;
}
.tip{
    font-size: 12px;
    font-weight: bold;
    color: #be0008;
}
</style>
