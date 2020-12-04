
<template>
    <div class="cover modal">
        <div class="box">
            <Col span="5"
                 class="meau-left">
                 <div class="headImg">
                <div class="header-box">
                    <div class="header-cover"
                         @click="render1">
                        点击上传头像
                    </div>
                    <div class="header"
                         style="">
                        <img :src="cropedImg===''?'../../../static/img/persion1.png':cropedImg"
                             width="70"
                             height="70">
                    </div>
                </div>
            </div>
            <div class="menuInfo">
                <Menu active-name="baseInfo"
                      width="auto">
                    <MenuItem name="baseInfo">
                    <a href="#baseInfo">{{$t('lang_employee.empmaster.title1')}}</a>
                    </MenuItem>
                    <MenuItem name="companyInfo">
                    <a href="#companyInfo">{{$t('lang_employee.empmaster.title2')}}</a>
                    </MenuItem>
                    <MenuItem name="contractInfo">
                    <a href="#contractInfo">{{$t('lang_employee.empmaster.title3')}}</a>
                    </MenuItem>
                    <MenuItem name="bank">
                    <a href="#bank">{{'员工银行卡信息'}}</a>
                    </MenuItem>
                    <MenuItem name="educationInfo">
                    <a href="#educationInfo">{{$t('lang_employee.empmaster.title5')}}</a>
                    </MenuItem>
                    <MenuItem name="addressInfo"
                              v-show="isEmpedcFirstVal">
                    <a href="#addressInfo">{{$t('lang_employee.empmaster.title6')}}</a>
                    </MenuItem>
                </Menu>
            </div>
            </Col>

            <Col span="19"
                 style="border-radius:0 10px 10px 0;"
                 class="right">
            <Row>
                <div class="title"
                     style="padding-top: 20px;padding-bottom: 20px;">
                    <div class="title-text">
                        <Icon type="ios-bookmark"
                              size="16"></Icon>新增
                    </div>
                    <Button type="text"
                            @click="handleClose">
                        <Icon type="md-close"
                              size="20"></Icon>
                    </Button>
                </div>
                <div ref="scrollBox"
                     class="topMar">
                    <Form ref="formEmpValidate"
                          :rules="ruleValidate"
                          :model="formEmpValidate"
                          :label-width="135">
                        <a name="baseInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{$t('lang_employee.baseInfo.title')}}
                        </a>
                        <!-- 员工基本信息 -->
                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseGid')"
                                      prop="baseGid">
                                <Input :placeholder="$t('lang_employee.baseInfo.baseGidDis')"
                                       disabled
                                       v-model="formEmpValidate.empGid" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseCname')"
                                      prop="empName">
                                <Input :placeholder="$t('lang_employee.baseInfo.baseCnameDis')"
                                       v-model="formEmpValidate.empName"
                                       @on-change="nameChange" />
                            </FormItem>
                            </Col>
                            <!-- //姓名拼音 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.basePin')"
                                      prop="empPiny">
                                <Input :placeholder="$t('lang_employee.baseInfo.basePinDis')"
                                       v-model="formEmpValidate.empPiny" />
                            </FormItem>
                            </Col>
                            <!-- //lastName -->
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseLastname')">
                                <Input :placeholder="$t('lang_employee.baseInfo.baseLastnameDis')"
                                       v-model="formEmpValidate.empLastname" />
                            </FormItem>
                            </Col>
                            <!-- //firstName -->
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.baseFirstname')">
                                <Input :placeholder="$t('lang_employee.baseInfo.baseFirstnameDis')"
                                       v-model="formEmpValidate.empFirstname" />
                            </FormItem>
                            </Col>
                            <!-- 证件类型 -->
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.idsType')"
                                      prop="empPaptype">
                                <Select v-model="formEmpValidate.empPaptype"
                                        @on-change="selectEmpTypeChange">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectIdsType"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!-- 证件号码 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.idsNo')"
                                      prop="empPopcode">
                                <Input :placeholder="$t('lang_employee.baseInfo.idsNoDis')"
                                       v-model="formEmpValidate.empPopcode"
                                       @on-change="idChange" />
                            </FormItem>
                            </Col>
                            <!-- 性别 -->
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseGender')"
                                      prop="empGender">
                                <Select v-model="formEmpValidate.empGender">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectGender"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.baseBirthdate')"
                                      prop="empBirthdate">
                                <DatePicker type="date"
                                            transfer
                                            :disabled="birthDis"
                                            :placeholder="$t('lang_employee.baseInfo.baseBirthdateDis')"
                                            v-model="formEmpValidate.empBirthdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <!-- //实际出生日期 -->
                            <Col span="11">
                            <FormItem label="实际出生日期"
                                      prop="empBirthdatereal">
                                <DatePicker type="date"
                                            transfer
                                            placeholder="请选择实际出生日期"
                                            v-model="formEmpValidate.empBirthdatereal"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="国籍"
                                      prop="empCitizen">
                                <span @dblclick="dbCountry1">
                                    <Input placeholder="请选择国籍"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empCitizen"
                                           @on-click="selectCountry1" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 曾用名 -->
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseAlias')">

                                <Input :placeholder="$t('lang_employee.baseInfo.baseAliasDis')"
                                       v-model="formEmpValidate.empAlias" />

                            </FormItem>
                            </Col>
                            <!-- 民族 -->

                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.baseNation')">
                                <Select v-model="formEmpValidate.empNation">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectNationtype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!-- 手机号 -->
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaMobile')"
                                      prop="empctaMobile">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaMobileDis')"
                                       v-model="formEmpValidate.empctaMobile" />
                            </FormItem>
                            </Col>
                            <!-- 公司邮箱 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaCompmail')"
                                      prop="empctaCompmail">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaCompmailDis')"
                                       v-model="formEmpValidate.empctaCompmail" />
                            </FormItem>
                            </Col>
                            <!-- 籍贯 -->
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.households')"
                                      prop="empNative">
                                <Input :placeholder="$t('lang_employee.addressInfo.householdsDis')"
                                       v-model="formEmpValidate.empNative" />
                            </FormItem>
                            </Col>
                            <!-- 户籍性质 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.addrRegisterproperty')"
                                      prop="empHoutype">
                                <Select v-model="formEmpValidate.empHoutype">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectRegisterproperty"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!-- 婚育状况 -->
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseMarriage')"
                                      prop="empMarriage">
                                <Select v-model="formEmpValidate.empMarriage">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectMarriage"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!-- 政治面貌 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.basePolitical')"
                                      prop="empPoils">
                                <Select v-model="formEmpValidate.empPoils">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectPolitical"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!-- 政治面貌开始日期 -->
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.PoliticalStart')">
                                <DatePicker type="date"
                                            transfer
                                            :placeholder="$t('lang_employee.baseInfo.PoliticalStartDis')"
                                            v-model="formEmpValidate.empPsdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <!-- 党组织关系是否在公司-->
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.organizationRelationship')"
                                      prop="empIsincomp">
                                <RadioGroup v-model="formEmpValidate.empIsincomp"
                                            type="button"
                                            size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>

                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseTechnicaltitle')"
                                      prop="empZhic">
                                <Select v-model="formEmpValidate.empZhic">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectTechnicaltitle"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.baseTechspec')"
                                      prop="">
                                <Input :placeholder="$t('lang_employee.baseInfo.baseTechspecDis')"
                                       v-model="formEmpValidate.empZcspecialty" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <!-- 职称取得时间 -->
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseTechdate')">
                                <DatePicker type="date"
                                            transfer
                                            :placeholder="$t('lang_employee.baseInfo.baseTechdateDis')"
                                            v-model="formEmpValidate.empZcDate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <!-- 首次参加工作时间 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.baseFirstworkdate')"
                                      prop="empFworkdate">
                                <DatePicker type="date"
                                            transfer
                                            :placeholder="$t('lang_employee.baseInfo.baseFirstworkdateDis')"
                                            v-model="formEmpValidate.empFworkdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem label="是否残疾"
                                      prop="empIscj">
                                <RadioGroup v-model="formEmpValidate.empIscj"
                                            type="button"
                                            size="small"
                                            @on-change="isCjChange">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>

                            </FormItem>
                            </Col>
                            <!-- //残疾证号 -->
                            <Col span="11"
                                 offset="1"
                                 v-if="isVasiable">
                            <FormItem label="残疾证号"
                                      prop="empCjno">
                                <Input placeholder="请输入残疾证号"
                                       v-model="formEmpValidate.empCjno" />
                            </FormItem>
                            </Col>
                            <!-- 残障等级 -->
                            <Col span="11"
                                 v-if="isVasiable">
                            <FormItem label="残障等级"
                                      prop="">
                                <Select v-model="formEmpValidate.empCzlevel">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectDisabilitylevel"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>
                        <a name="companyInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{$t('lang_employee.companyInfo.title')}}
                        </a>
                        <Row>
                            <!-- 员工公司信息 -->
                            <Col span="11">
                            <FormItem label="工号"
                                      prop="">
                                <Input placeholder="请输入员工工号"
                                       v-model="formEmpValidate.empkeyEmpno" />
                            </FormItem>
                            </Col>
                            <!-- 员工状态 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="员工状态"
                                      prop="empkeyEmpstatus">
                                <Select v-model="formEmpValidate.empkeyEmpstatus">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEmpStatus"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!-- 入职日期 -->
                            <Col span="11">
                            <FormItem label="入职日期"
                                      prop="empkeyEndate">
                                <DatePicker type="date"
                                            transfer
                                            @on-change="enChange"
                                            placeholder="请选择入职日期"
                                            v-model="formEmpValidate.empkeyEndate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <!-- 公司资历日期 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="公司资历日期"
                                      prop="empkeySendate">
                                <DatePicker type="date"
                                            transfer
                                            placeholder="请选择公司资历日期"
                                            v-model="formEmpValidate.empkeySendate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <!-- 进入中南集团日期 -->
                            <Col span="11">
                            <FormItem label="进入中南集团日期">
                                <DatePicker type="date"
                                            transfer
                                            placeholder="请选择进入中南集团日期"
                                            v-model="formEmpValidate.empkeyEzndate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <!-- //员工分类 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="员工分类"
                                      prop="empkeyEmpmode">
                                <Select v-model="formEmpValidate.empkeyEmpmode">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEmpcategory"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <!-- 是否重新雇佣
                             <Col span="11">
                            <FormItem label="是否重新雇佣"
                                >
                                 <RadioGroup v-model="formEmpValidate.empkeyIscxemp" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>

                            </FormItem>
                            </Col> -->
                            <!-- 是否二次入职 -->
                            <Col span="11">
                            <FormItem label="是否二次入职 ">
                                <RadioGroup v-model="formEmpValidate.empkeyIscxemp"
                                            type="button"
                                            size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>

                            </FormItem>
                            </Col>
                            <!-- 是否退休返聘 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="是否退休返聘">
                                <RadioGroup v-model="formEmpValidate.empkeyIstxemp"
                                            type="button"
                                            size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>

                            </FormItem>
                            </Col>
                            <!-- 主岗 兼岗 -->
                            <Col span="11">
                            <FormItem label="主岗/兼岗"
                                      prop="">
                                <RadioGroup v-model="formEmpValidate.empappZjpost"
                                            type="button"
                                            size="small">
                                    <Radio :label="item.paramCode"
                                           disabled
                                           v-for="(item,index) in selectPostprop"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>

                            </FormItem>
                            </Col>

                            <!-- 所属板块 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="所属板块"
                                      prop="empappPanel">
                                <Select v-model="formEmpValidate.empappPanel">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectBussector"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!-- 任职公司 -->
                            <Col span="11">
                            <FormItem label="任职公司"
                                      prop="empappUnitid">
                                <span @dblclick="dbHCompany">
                                    <Input placeholder="请选择任职公司"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empappUnitid"
                                           @on-click="selectHCompany" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 法律实体 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="法律实体">
                                <!-- prop="empconFlstid" -->
                                <span @dblclick="dbLegalety">
                                    <Input placeholder="请选择法律实体"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empconFlstid"
                                           @on-click="selectLegalety('法律实体')" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 任职部门 -->
                            <Col span="11">
                            <FormItem label="任职部门"
                                      prop="empapDeptid">
                                <span @dblclick="dbDept">
                                    <Input placeholder="请选择任职部门"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empapDeptid"
                                           @on-click="selectDept" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 任职岗位 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="任职岗位"
                                      prop="empapPostid">
                                <span @dblclick="dbPost">
                                    <Input placeholder="请选择任职岗位"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empapPostid"
                                           @on-click="selectPost" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 是否管培生 -->
                            <Col span="11">
                            <FormItem label="是否管培生">
                                <RadioGroup v-model="formEmpValidate.empIsgps"
                                            type="button"
                                            size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>

                            </FormItem>
                            </Col>
                            <!-- 组织范围 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="组织范围">

                                <Input placeholder="请输入组织范围"
                                       disabled
                                       v-model="formEmpValidate.empappUnitscope" />

                            </FormItem>
                            </Col>

                        </Row>

                        <Row>
                            <!-- 岗位序列 -->
                            <Col span="11">
                            <FormItem label="岗位序列">
                                <span>
                                    <Input placeholder="请选择岗位序列"
                                           icon="ios-search"
                                           :readonly="true"
                                           :disabled="true"
                                           v-model="formEmpValidate.empapPtodid" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 业务领域/职类 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="业务领域/职类">
                                <span>
                                    <Input placeholder="请选业务领域/职类"
                                           icon="ios-search"
                                           :readonly="true"
                                           :disabled="true"
                                           v-model="formEmpValidate.postBusridDis" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- /业务模块/职能  -->
                            <Col span="11">
                            <FormItem label="业务模块/职能 ">
                                <span>
                                    <Input placeholder="请选择业务模块/职能 "
                                           icon="ios-search"
                                           :readonly="true"
                                           :disabled="true"
                                           v-model="formEmpValidate.postBumdidDis" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 职务 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="职务 ">
                                <span>
                                    <Input placeholder="请选择职务"
                                           icon="ios-search"
                                           :readonly="true"
                                           :disabled="true"
                                           v-model="formEmpValidate.empperDutyid" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 职等 -->
                            <Col span="11">
                            <FormItem label="职等 ">
                                <span>
                                    <Input placeholder="请选择职等"
                                           icon="ios-search"
                                           :readonly="true"
                                           :disabled="true"
                                           v-model="formEmpValidate.empperRankid" />
                                </span>
                            </FormItem>
                            </Col>

                            <Col span="11"
                                 offset="1">
                            <FormItem label="职级">
                                <Input placeholder="请选择职级"
                                       :readonly="true"
                                       :disabled="true"
                                       v-model="formEmpValidate.postRankinfoDis" />
                                <!-- <Select v-model="formEmpValidate.postRankinfoDis" disabled >
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in selectEmptype"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                        </Select> -->
                            </FormItem>
                            </Col>
                            <!-- 成本中心 -->
                            <!-- <Col span="11">
                            <FormItem label="成本中心"
                                      prop="empappCotcid">
                                <span @dblclick="dbCostcenter">
                                    <Input placeholder="请选成本中心"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empappCotcid"
                                           @on-click="selectCostcenter" />
                                </span>
                            </FormItem>
                            </Col> -->
                            <!-- 成本中心分摊比例 -->
                            <Col span="11">
                            <FormItem label="成本中心分摊比例"
                                      prop="empappCotcratio">

                                <Input placeholder="请输入成本中心分摊比例"
                                       v-model="formEmpValidate.empappCotcratio" />

                            </FormItem>
                            </Col>
                            <!-- 雇佣地点 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="雇佣地点">
                                <span @dblclick="dbHirelocation">
                                    <Input placeholder="请选雇佣地点"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empappEmpcity"
                                           @on-click="selectHirelocation('雇佣地点')" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 工作地点 -->
                            <Col span="11">
                            <FormItem label="日常办公地">
                                <span @dblclick="dbWorklocation">
                                    <Input placeholder="请选日常办公地"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empappWkcity"
                                           @on-click="selectHirelocation('工作地点')" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 直接上级 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="直接上级">
                                <span @dblclick="dbBuspmp">
                                    <Input placeholder="请选直接上级"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empappZpid"
                                           @on-click="selectBuspmp('直接上级')" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 是否加入工会 -->
                            <Col span="11">
                            <FormItem label="是否加入工会">
                                <RadioGroup v-model="formEmpValidate.empkeyIsjoinh"
                                            type="button"
                                            size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>

                            </FormItem>
                            </Col>
                            <!-- 人事档案所在地 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="人事档案所在地">
                                <Input placeholder="请输入人事档案所在地"
                                       v-model="formEmpValidate.empkeyRcityid" />
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem label="计算机水平">
                                <Select v-model="formEmpValidate.empkeyCuplevel">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectComputerlevel"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="英语水平">
                                <Select v-model="formEmpValidate.empkeyEnglevel">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEnglishlevel"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!-- HRBP对接人 -->
                            <!-- <Col span="11">
                            <FormItem label="HRBP对接人">
                               <Input placeholder="请输入HRBP对接人"
                                     v-model="formEmpValidate.empkeyHrbp"/>
                            </FormItem>
                            </Col> -->
                            <!-- HRBP对接人 -->
                            <Col span="11">
                            <FormItem label="HRBP对接人">
                                <span @dblclick="dbHrbp">
                                    <Input placeholder="请选择HRBP对接人"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empkeyHrbp"
                                           @on-click="selectHrbp()" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 行政对接人 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="行政对接人">
                                <span @dblclick="dbHzdjr">
                                    <Input placeholder="请选择行政对接人"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empkeyHzdjr"
                                           @on-click="selectHzdjr()" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 行政对接人 -->
                            <!-- <Col span="11" offset="1">
                            <FormItem label="行政对接人">
                               <Input placeholder="请输入行政对接人"
                                     v-model="formEmpValidate.empkeyHzdjr"/>
                            </FormItem>
                            </Col> -->
                            <!-- 电脑补贴 -->
                            <Col span="11">
                            <!-- <FormItem label="电脑补贴" prop="empkeyCpubt">
                               <Input placeholder="请输入电脑补贴"
                                     v-model="formEmpValidate.empkeyCpubt"/>
                            </FormItem> -->
                            <FormItem label="电脑补贴"
                                      prop="empkeyCpubt">
                                <Select v-model="formEmpValidate.empkeyCpubt">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectComputerSubsidy"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>
                        <!-- 合同信息-->
                        <a name="contractInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{$t('lang_employee.contractInfo.title')}}
                        </a>
                        <Row>
                            <!-- <Col span="11">
                            <FormItem label="是否退休返聘"
                                      prop="empctIsrehire">
                                <RadioGroup v-model="formEmpValidate.empctIsrehire" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col> -->
                            <Col span="11">
                            <FormItem label="合同类型"
                                      prop="empconCategory">
                                <Select v-model="formEmpValidate.empconCategory">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContracttypezn"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!-- 合同签署类型 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="合同签署类型"
                                      prop="empconCstype">
                                <Select v-model="formEmpValidate.empconCstype">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContractsigntype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>

                            <Col span="11">
                            <FormItem label="合同期限"
                                      prop="empconDuration">
                                <Select v-model="formEmpValidate.empconDuration"
                                        @on-change="empconDuration"
                                        :disabled="ContractperiodShow">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContractperiod"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="合同开始日期"
                                      prop="empconSdate">
                                <DatePicker type="date"
                                            transfer
                                            @on-change="empconSdateStart"
                                            :placeholder="$t('lang_employee.contractInfo.ctContractsdateDis')"
                                            v-model="formEmpValidate.empconSdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11">

                            <FormItem label="合同预计结束日期">
                                <DatePicker type="date"
                                            transfer
                                            placeholder="请选择合同预计结束日期"
                                            :disabled="ContractperiodShow"
                                            v-model="formEmpValidate.empconYedate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <!-- <Col span="11"
                                 offset="1">

                            <FormItem label="签署日期"
                                      prop="empconQsdate">
                                <DatePicker type="date"
                                            transfer
                                            :placeholder="$t('lang_employee.contractInfo.ctSigndateDis')"
                                            v-model="formEmpValidate.empconQsdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col> -->
                            <Col span="11"  offset="1">
                            <FormItem label="合同签订次数">
                                <Input placeholder="请输入合同签订次数"
                                       disabled
                                       v-model="formEmpValidate.empconQdcs" />
                            </FormItem>
                            </Col>
                            <!-- <Col span="11"
                                 offset="1">
                            <FormItem label="保密协议"
                                      prop="empconBmxy">
                                <Select v-model="formEmpValidate.empconBmxy">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectConfidential"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col> -->
                            <Col span="11">
                            <FormItem label="工时类型"
                                      prop="empWttype">
                                <Select v-model="formEmpValidate.empWttype">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectctContractworktime"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="合同到期通知天数">
                                <Select v-model="formEmpValidate.empconDuedate">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContractprom"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>

                            <Col span="11">
                            <FormItem label="试用期限"
                                      prop="empconTrialperiod">
                                <Select v-model="formEmpValidate.empconTrialperiod"
                                        @on-change="selectctCtProbation">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectctProbation"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="试用期开始日期">
                                <DatePicker type="date"
                                            @on-change="startChange"
                                            transfer
                                            placeholder="请选择试用期开始日期"
                                            v-model="formEmpValidate.empconPsdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11">
                            <FormItem label="试用期结束日期">
                                <DatePicker type="date"
                                            placeholder="请选择试用期结束日期"
                                            transfer
                                            v-model="formEmpValidate.empconPedate"
                                            style="width: 100%"></DatePicker>
                                <!--<Input placeholder="试用到期时间..." />-->
                            </FormItem>
                            </Col>

                            <Col span="11"
                                 offset="1">
                            <FormItem label="试用到期通知天数">
                                <Select v-model="formEmpValidate.empconPduedate">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectProbationprom"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>

                        </Row>
                        <a name="bank">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'银行卡信息'}}
                        </a>
                        <Row>
                            <!-- 银行名称 -->
                            <Col span="11">
                            <FormItem label="银行名称"
                                      prop="empbkNameid">
                                <span @dblclick="dbbkBank">
                                    <Input placeholder="请选择银行名称"
                                           icon="ios-search"
                                           v-model="formEmpValidate.empbkNameid"
                                           @on-click="selectBank" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 银行账号 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="银行账号"
                                      prop="empbkAccount">
                                <span>
                                    <Input placeholder="请输入银行账号"
                                           v-model="formEmpValidate.empbkAccount" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 开户行 -->
                            <Col span="11">
                            <FormItem label="所属支行">
                                <!--  @dblclick="dbHCompany" -->
                                <span>
                                    <Input placeholder="请输入所属支行"
                                           v-model="formEmpValidate.empbkDeposit" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="报销是否同工资"
                                      prop="empAccIsReim">
                                <RadioGroup @on-change="isEmpAccIsReim"
                                            v-model="formEmpValidate.empAccIsReim"
                                            type="button"
                                            size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <!-- 报销银行名称 -->
                            <Col span="11"
                                 v-if="isEmpAcc">
                            <FormItem label="报销银行名称"
                                      prop="empbkNameid">
                                <span @dblclick="dbbkBank1">
                                    <Input placeholder="请选择报销银行名称"
                                           icon="ios-search"
                                           v-model="formEmpValidate.empReimBank"
                                           @on-click="selectBank1" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 报销银行账号 -->
                            <Col span="11"
                                 offset="1"
                                 v-if="isEmpAcc">
                            <FormItem label="报销银行账号"
                                      prop="empReimAcct">
                                <Input placeholder="请输入报销银行账号"
                                       v-model="formEmpValidate.empReimAcct" />
                            </FormItem>
                            </Col>
                            <!-- 报销开户行 -->
                            <Col span="11"
                                 v-if="isEmpAcc">
                            <FormItem label="报销开户行">
                                <Input placeholder="请输入报销开户行"
                                       v-model="formEmpValidate.empReimDepo" />
                            </FormItem>
                            </Col>
                        </Row>
                        <a name="educationInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{$t('lang_employee.educationInfo.title')}}
                        </a>

                        <Row>
                            <Col span="11">
                            <FormItem label="入学年月"
                                      prop="empedcEsdate">
                                <DatePicker type="month"
                                            transfer
                                            placeholder="请选择入学年月"
                                            v-model="formEmpValidate.empedcEsdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="毕业年月"
                                      prop="empedcBydate">
                                <DatePicker type="month"
                                            transfer
                                            placeholder="请选择毕业年月"
                                            v-model="formEmpValidate.empedcBydate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem label="学历"
                                      prop="empedcBackgd">
                                <Select v-model="formEmpValidate.empedcBackgd">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="学位"
                                      prop="empedcDegree">
                                <Select v-model="formEmpValidate.empedcDegree">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel1"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem label="国家"
                                      prop="empedcContid">
                                <span @dblclick="dbCountry">
                                    <Input placeholder="请选择国家"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empedcContid"
                                           @on-click="selectCountry" />
                                </span>
                            </FormItem>
                            </Col>

                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.educationInfo.edSchool')"
                                      prop="empedcSchool">
                                <Input :placeholder="$t('lang_employee.educationInfo.edSchoolDis')"
                                       v-model="formEmpValidate.empedcSchool" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>

                            <Col span="11">
                            <FormItem label="学校类型"
                                      prop="empedcSchooltype">
                                <Select v-model="formEmpValidate.empedcSchooltype">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel2"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="学习方式"
                                      prop="empedcLearntype">
                                <Select v-model="formEmpValidate.empedcLearntype">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel3"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>

                        </Row>
                        <Row>
                            <!-- 第一专业 -->
                            <Col span="11">
                            <FormItem label="第一专业"
                                      prop="empedcFirstzy">
                                <Input placeholder="请输入第一专业"
                                       v-model="formEmpValidate.empedcFirstzy" />
                            </FormItem>
                            </Col>
                            <!-- 第二专业 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="第二专业">
                                <Input placeholder="请输入第二专业"
                                       v-model="formEmpValidate.empedcSecondzy" />
                            </FormItem>
                            </Col>

                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem label="是否第一学历"
                                      prop="empedcFirst">
                                <RadioGroup @on-change="isEmpedcFirst"
                                            v-model="formEmpValidate.empedcFirst"
                                            type="button"
                                            size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                        </Row>

                        <a name="addressInfo"
                           v-show="isEmpedcFirstVal">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'第一学历信息'}}
                        </a>
                        <Row v-if="isEmpedcFirstVal">
                            <Col span="11">
                            <FormItem label="入学年月"
                                      prop="empedcEsdate1">
                                <DatePicker type="month"
                                            transfer
                                            placeholder="请选择入学年月"
                                            v-model="formEmpValidate.empedcEsdate1"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="毕业年月"
                                      prop="empedcBydate1">
                                <DatePicker type="month"
                                            transfer
                                            placeholder="请选择毕业年月"
                                            v-model="formEmpValidate.empedcBydate1"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row v-if="isEmpedcFirstVal">
                            <Col span="11">
                            <FormItem label="学历"
                                      prop="empedcBackgd1">
                                <Select v-model="formEmpValidate.empedcBackgd1">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="学位"
                                      prop="empedcDegree1">
                                <Select v-model="formEmpValidate.empedcDegree1">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel1"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row v-if="isEmpedcFirstVal">
                            <Col span="11">
                            <FormItem label="国家"
                                      prop="empedcContid1">
                                <span @dblclick="dbCountry2">
                                    <Input placeholder="请选择国家"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empedcContid1"
                                           @on-click="selectCountry2" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.educationInfo.edSchool')"
                                      prop="empedcSchool1">
                                <Input :placeholder="$t('lang_employee.educationInfo.edSchoolDis')"
                                       v-model="formEmpValidate.empedcSchool1" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row v-if="isEmpedcFirstVal">

                            <Col span="11">
                            <FormItem label="学校类型"
                                      prop="empedcSchooltype1">
                                <Select v-model="formEmpValidate.empedcSchooltype1">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel2"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="学习方式"
                                      prop="empedcLearntype1">
                                <Select v-model="formEmpValidate.empedcLearntype1">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel3"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>

                        </Row>
                        <Row v-if="isEmpedcFirstVal">
                            <!-- 第一专业 -->
                            <Col span="11">
                            <FormItem label="第一专业"
                                      prop="empedcFirstzy1">
                                <Input placeholder="请输入第一专业"
                                       v-model="formEmpValidate.empedcFirstzy1" />
                            </FormItem>
                            </Col>
                            <!-- 第二专业 -->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="第二专业">
                                <Input placeholder="请输入第二专业"
                                       v-model="formEmpValidate.empedcSecondzy1" />
                            </FormItem>
                            </Col>

                        </Row>
                    </Form>
                </div>
                <div style="padding-bottom: 20px;"
                     class="btnAlign">

                    <Button @click="closeAddEmp">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            :loading="isSpin"
                            @click="handleSubmit">
                        <span v-if="!isSpin">{{$t('button.sav')}}</span>
                    </Button>
                </div>
            </Row>
            </Col>
            </Row>

        </div>
        <!--民族-->
        <!-- <transition name="fade">
            <searchNation v-show="openNation"
                          @closeEmp="closeNation"
                          :searchClo="searchNationCol"
                          @inputNation="inputNation"
                          :params="params"
                          ref="searchNation"></searchNation>
        </transition> -->
        <!--银行-->
        <transition name="fade">
            <searchBank v-show="openBank"
                        @closeBank="closeBank"
                        :searchBankCol="searchBankCol"
                        @inputBank="inputBank"
                        @inputBank1="inputBank1"
                        :bankChack="bankChack"
                        :params="paramsBank"
                        ref="searchBank"></searchBank>
        </transition>
        <!--社保政策-->
        <transition name="fade">
            <searchSbPolicy @inputBenefitpolicy="inputBenefitpolicy"
                            @inputHfundpolicy="inputHfundpolicy"
                            v-show="openSbPolicy"
                            :logType="logType"
                            @closeSbPolicy="closeSbPolicy"
                            :searchSbPolicyCol="searchSbPolicyCol"
                            @inputSbPolicy="inputSbPolicy"
                            :params="paramsSbPolicy"
                            ref="searchSbPolicy"></searchSbPolicy>
        </transition>
        <!--雇佣公司-->
        <transition name="fade">
            <searchHCompany v-show="openHCompany"
                            @closeHCompany="closeHCompany"
                            :searchHCClo="searchHCClo"
                            @inputHCompany="inputHCompany"
                            :params="paramsHCompany"
                            ref="searchHCompany"></searchHCompany>
        </transition>
        <!--部门-->
        <transition name="fade">
            <searchDept v-show="openDept"
                        @closeDept="closeDept"
                        :searchDeptClo="searchDeptClo"
                        @inputDept="inputDept"
                        :params="paramsDept"
                        ref="searchDept"></searchDept>
        </transition>
        <!--岗位-->
        <transition name="fade">
            <searchPost v-show="openPost"
                        @closePost="closePost"
                        :searchPostClo="searchPostClo"
                        @inputPost="inputPost"
                        :params="paramsPost"
                        ref="searchPost"></searchPost>
        </transition>
        <!--成本中心-->
        <transition name="fade">
            <searchOrgcostcenter v-show="openOrgcostcenter"
                                 @closeOrgcostcenter="closeOrgcostcenter"
                                 :searchCloumns="searchCloumns"
                                 @changeinput="changeinput"
                                 :params="paramsOrgcostcenter"
                                 ref="searchOrgcostcenter"></searchOrgcostcenter>
        </transition>
        <!--雇佣、工作、居住地点市-->
        <transition name="fade">
            <searchHirelocation v-show="openHirelocation"
                                :logType="logType"
                                :cityType="cityType"
                                @closeHirelocation="closeHirelocation"
                                :searchHirelocationClo="searchHirelocationClo"
                                @inputHirelocation="inputHirelocation"
                                @inputWorklocation="inputWorklocation"
                                @inputBenefitlocation="inputBenefitlocation"
                                @inputHfundlocatio="inputHfundlocatio"
                                @inputProvince="inputProvince"
                                @inputCity="inputCity"
                                @inputrProvince="inputrProvince"
                                @inputrCity="inputrCity"
                                :params="paramsHirelocation"
                                ref="searchHirelocation"></searchHirelocation>
        </transition>
        <!--上级经理-->
        <transition name="fade">
            <searchManager v-show="openManger"
                           :logType="logType"
                           @closeManger="closeManger"
                           :searchMangerClo="searchMangerClo"
                           @inputManger="inputManger"
                           @inputGManger="inputGManger"
                           @inputCompHR="inputCompHR"
                           :params="paramsManger"
                           ref="searchManager"></searchManager>
        </transition>
        <!--基准岗位-->
        <transition name="fade">
            <searchBnchpost v-show="searchBnc"
                            :logType="logType"
                            @closeUpBn="closeUpBn"
                            :searchBnchClo="searchBnchClo"
                            @inputBnchClo="inputBnchClo"
                            :params="paramsBnchClo"
                            ref="searchBnchClo"></searchBnchpost>
        </transition>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent="modiaContent"
                         :dataParame="dataParame"
                         dataType="row"
                         @changeinput="changeinput2"
                         urlType="loginNew">
        </autoSearchtable>
        <transition name="fade">
            <searchCountry v-show="showCountry"
                           :countryName="countryName"
                           @closeCountry="closeCountry"
                           @inputCountry="inputCountry"
                           @inputCountry1="inputCountry1"
                           @inputCountry2="inputCountry2"></searchCountry>
        </transition>
        //法律实体
        <transition name="fade">
            <searchLegalety v-show="showLegalety"
                            @closeLegalety="closeLegalety"
                            @inputLegalety="inputLegalety"
                            :searchLegaletyClo="searchLegaletyClo"
                            :params="paramsLegalety"
                            ref="searchLegalety"></searchLegalety>
        </transition>
        //HRBP对接人
        <transition name="fade">
            <searchHrbp v-show="showHrbp"
                        @closeHrbp="closeHrbp"
                        @inputHrbp="inputHrbp"
                        :searchHrbpClo="searchHrbpClo"
                        :params="paramsHrbp"
                        ref="searchHrbp"></searchHrbp>
        </transition>
        //行政对接人
        <transition name="fade">
            <searchHzdjr v-show="showHzdjr"
                         @closeHzdjr="closeHzdjr"
                         @inputHzdjr="inputHzdjr"
                         :searchHzdjrClo="searchHzdjrClo"
                         :params="paramsHzdjr"
                         ref="searchHzdjr"></searchHzdjr>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadimage, getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchNation from '../../../components/searchTable/searchNation'
import searchBank from '../../../components/searchTable/searchBank'
import searchSbPolicy from '../../../components/searchTable/searchSbPolicy'
import searchHCompany from '../../../components/searchTable/searchHCompany'
import searchDept from '../../../components/searchTable/searchDept'
import searchPost from '../../../components/searchTable/searchPost'
import searchOrgcostcenter from '../../../components/searchTable/searchOrgcostcenter'
import searchHirelocation from '../../../components/searchTable/searchHirelocation'
import searchManager from '../../../components/searchTable/searchManager'
import searchBnchpost from '../../../components/searchTable/searchBnchpost'
import imgEdit from '../../../components/imgUpdate/imgEdit'
import searchCountry from '../../../components/searchTable/searchCountry'
import searchLegalety from '../../../components/searchTable/searchLegalety'
import searchHrbp from '../../../components/searchTable/searchHrbp'
import searchHzdjr from '../../../components/searchTable/searchHzdjr'
import pinyin from '../../../../node_modules/js-pinyin/index'
export default {
    data () {
        const validateIdTypeCheck = (rule, value, callback) => {
            let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
            const t = this
            if (value == '') {
                callback(new Error('证件号码不能为空'))
            } else if (this.formEmpValidate.empPaptype == '01id' && !reg.test(value)) {
                callback(new Error('请输入正确的身份证号'))
            } else {

                callback()
            }
        }
        const validateCotcratio = (rule, value, callback) => {
            let reg = /^[0-9]+\.?[0-9]*/
            if (value !== '') {
                if (!reg.test(value)) {
                    callback(new Error('请输入数字'))
                } else if (Number(value) > 1) {
                    callback(new Error('数值不能大于1'))
                } else if (value.indexOf('.') > -1) {
                    if (value.split('.')[1].length > 1) {
                        callback(new Error('小数点后1位'))
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            } else {
                callback(new Error('请输成本中心分摊比例'))
            }
        }
        const validateDate = (rule, value, callback) => {
            const t = this
            let start = new Date(value)
            let end = new Date(t.formEmpValidate.empedcBydate)
            if (value == '') {
                callback(new Error('请选择开学日期'))
            } else if (start > end) {
                callback(new Error('入学年月不能大于毕业年月'))
            } else {
                callback()
            }
        }
        return {
            spinShow: false,
            searchBnc: false,
            showHrbp: false,
            showHzdjr: false,
            showLegalety: false,
            showCountry: false,
            ContractperiodShow: false,
            ctProbationdateShow: false,
            isSpin: false,
            showModal: false,
            modiaContent: '',
            isVasiable: false,
            isEmpAcc: false,
            birthDis: false,
            countryName: '',
            dataParame: {},
            selectType: '',
            isEmpedcFirstVal: null,
            logType: '',
            httpImg: '',
            cropedImg: '',
            cropedImgDis: '',
            empHeader: '',
            cityType: '',
            bankChack: '',
            openNation: false,
            openBank: false,
            openSbPolicy: false,
            openHCompany: false,
            openDept: false,
            openPost: false,
            openOrgcostcenter: false,
            openHirelocation: false,
            openManger: false,
            selectGender: [],
            selectIdsType: [],
            selectMarriage: [],
            selectPolitical: [],
            selectTechnicaltitle: [],
            selectEmpcompPostlevel: [],
            selectEmptype: [],
            selectContracttype: [],
            seleempctCategory: [],
            selectWorktimetype: [],
            selectSigntype: [],
            selectYesno: [],
            selectContractperiod: [],
            selectPostlevel: [],
            selectSalarylevel: [],
            selectTravellevel: [],
            selectAdminlevel: [],
            selectSalaryset: [],
            selectEducationlevel: [],
            selectEducationlevel1: [],
            selectEducationlevel2: [],
            selectEducationlevel3: [],
            selectEmcrelation: [],
            selectsbBenefittype: [],
            selectEdCuntry: [],
            selectCuntry: [],
            selectrCuntry: [],
            selectRegisterproperty: [],
            selectctContractworktime: [],
            selectContractprom: [],
            selectProbationprom: [],
            selectConfidential: [],
            selectctProbation: [],
            selectEstablishmenttype: [],
            selectEmpmapping: [],
            selectPayofftype: [],
            selectDisabilitylevel: [],
            selectEmpStatus: [],
            selectEmpcategory: [],
            selectContracttype1: [],
            selectContractsigntype: [],
            selectNationtype: [],
            selectBussector: [],
            selectPostprop: [],
            selectComputerlevel: [],
            selectEnglishlevel: [],
            selectContracttypezn: [],
            selectComputerSubsidy: [],
            formEmpValidate: {
                // baseGid: '',
                baseCname: '',
                //      		baseAlias: '',
                baseLastname: '',
                baseFirstname: '',
                idsType: '',
                idsNo: '',
                baseBirthdate: '',
                baseGender: '',
                baseMarriage: '',
                baseNation: '',
                basePolitical: '',
                baseTechnicaltitle: '',
                empcompPostlevel: '',
                empcompPostseq: '',
                empcompPostseqDis: '',
                empcompTravelaward: '0',
                empcompImportaward: '0',
                baseTechspec: '',
                baseFirstworkdate: '',
                baseTechdate: '',
                empSysaccountOa: '',
                empSysaccpwdOa: '',
                empOrderOa: '',
                pkiWorkno: 'xxxxxx',
                pkiEmptype: '',
                compHirecompany: '',
                empcompBnchpostDis: '',
                empcompBnchpost: '',
                compDept: '',
                compPost: '',
                compCostcenter: '',
                compHirelocation: '',
                compWorklocation: '',
                compBuspmp: '',
                compBuspmpDis: '',
                compFunpmp: '',
                compEntrydate: '',
                compServicedate: '',
                compCertificatedate: '',
                // compHr: '',
                ctContracttype: '',
                empctSigntype: '',
                empctIsrehire: '0',
                //          empctContractworktime: '',
                empctCategory: '',
                ctContractperiod: '',
                empctMaincomp: '',
                empctMaincompDis: '',
                ctContractsdate: '',
                ctContractedate: '',
                ctContractprom: '',
                ctConfidential: '',
                ctContractworktime: '',
                ctSigndate: '',
                ctProbation: '',
                ctProbationdate: '',
                ctProbationprom: '',
                salPostlevel: '',
                salSalarylevel: '',
                salTravellevel: '',
                salAdminlevel: '',
                salSalaryset: '',
                bkBank: '',
                bkAccount: '',
                bkAccnane: '',
                sbBenefitlocation: '',
                sbBenefitpolicy: '',
                //      		sbBenefittype: '',
                //      		edEducationlevel: '',
                edCuntry: '',
                edSchool: '',
                edDegree: '',
                edSpecialty: '',
                edSchooltype: '',
                edLearntype: '',
                edIshighest: '0',
                edIsfirstqua: '0',
                edSdate: '',
                edEdate: '',
                edQualifications: '',
                ctaMobile: '',
                ctaPhone: '',
                ctaPersmail: '',
                ctaCompmail: '',
                ctaQq: '',
                ctaWechat: '',
                ctaEmergcontact: '',
                ctaEmcrelation: '',
                ctaEmcphone: '',
                ctaEmcaddr: '',
                addCuntry: '',
                addProvince: '',
                addCity: '',
                addStreet: '',
                addZip: '',
                addrCuntry: '',
                addrProvince: '',
                addrCity: '',
                addrStreet: '',
                addrRegisterproperty: '',
                addrZip: '',
                nationPCode: '',
                compHirecompanyPid: '',
                compDeptPid: '',
                compPostPid: '',
                compCostcenterPid: '',
                compHirelocationPid: '',
                compWorklocationPid: '',
                compBuspmpPid: '',
                compFunpmpPid: '',
                bkBankPid: '',
                //      		sbBenefitlocationPid: '',
                //      		sbBenefitpolicyPid: '',
                addCuntryPid: '',
                addProvincePid: '',
                addCityPid: '',
                addrProvincePid: '',
                addrCityPid: '',
                comPHRPid: '',
                //          sbHfundpolicyPid: '',
                //          sbHfundlocatioPid: '',
                sbHfundlocatio: '',
                sbHfundpolicy: '',
                empkiEstablishment: '',
                empkiTraineeounds: '',
                empkiEmpmapping: '',
                empkiPaystyle: '',
                //          sbHfundtype: '',

                /////////基本信息
                empGid: 'XXXXXXXX',
                empName: '',
                empPiny: '',
                empLastname: '',
                empFirstname: '',
                empPaptype: '01id',
                empPopcode: '',
                empGender: '',
                empBirthdate: '',
                empBirthdatereal: '',
                empAlias: '',
                empNation: '10',
                empctaMobile: '',
                empctaCompmail: '',
                empNative: '',
                empHoutype: '',
                empMarriage: '',
                empPoils: '80common',
                empPsdate: '',
                empIsincomp: '0',
                empZhic: 'zs00',
                empZcspecialty: '',
                empZcDate: '',
                empFworkdate: '',
                empIscj: '0',
                empCjno: '',
                empCzlevel: '',


                ////////////员工工号XXXXX
                empkeyEmpno: '',
                empkeyEmpstatus: '01active',
                empkeyEndate: '',
                empkeySendate: '',
                empkeyEzndate: '',
                empkeyEmptype: '',
                empkeyEmpmode: '',
                empkeyIscxemp: '0',
                empkeyIstxemp: '0',
                empIsgps: '0',
                empappZjpost: '01major',
                empappPanel: '',
                empappUnitid: '',
                empappUnitidPid: '',
                empconFlstid: '',
                empconFlstidPid: '',
                empapDeptid: '',
                empapDeptidPid: '',
                empapPostid: '',
                empapPostidPid: '',
                // 组织范围字段
                empappUnitscope: '',
                empapPtodid: '',
                empapPtodidPid: '',
                // 业务领域/职类
                postBusridDis: '',
                //业务模块/职能
                postBumdidDis: '',
                empperDutyid: '',
                empperRankid: '',
                //职级
                postRankinfoDis: '',
                empappCotcid: '',
                empappCotcidPid: '',
                empappCotcratio: '1',
                empappEmpcity: '',
                empappEmpcityPid: '',
                empappWkcity: '',
                empappWkcityPid: '',
                empappZpid: '',
                empappZpidPid: '',
                empkeyIsjoinh: '0',
                ////////////
                empkeyRcityid: '',
                empkeyCuplevel: '',
                empkeyEnglevel: '',
                //对接人
                empkeyHrbp: '',
                empkeyHrbpPid: '',
                empkeyHzdjr: '',
                empkeyHzdjrPid: '',
                empkeyCpubt: '',
                ////////合同
                empconCategory: '01labour',
                empconCstype: '01new',
                empconDuration: '99',
                empconSdate: '',
                empconYedate: '',
                empconQsdate: '',
                empconQdcs: '1',
                empconBmxy: '01None',
                empWttype: '01standard',
                empconDuedate: '060',
                empconTrialperiod: '6',
                empconPsdate: '',
                empconPedate: '',
                empconPduedate: '030',
                ///////银行
                empbkNameid: '',
                empbkNameidPid: '',
                empbkAccount: '',
                empReimAcct: '',
                empReimDepo: '',
                empbkDeposit: '',
                empAccIsReim: '1',
                empReimBank: '',
                empReimBankPid: '',

                //////最高学历
                empedcEsdate: '',
                empedcBydate: '',
                empedcBackgd: '',
                empedcDegree: '',
                empedcContid: '',
                empedcContidPid: '',
                empCitizen: '',
                empCitizenPid: '',
                empedcSchool: '',
                empedcSchooltype: '',
                empedcLearntype: '0200',
                empedcFirstzy: '',
                empedcSecondzy: '',
                empedcFirst: '1',
                ////第一学历
                empedcEsdate1: '',
                empedcBydate1: '',
                empedcBackgd1: '',
                empedcDegree1: '',
                empedcContid1: '',
                empedcContidPid1: '',
                empedcSchool1: '',
                empedcSchooltype1: '',
                empedcLearntype1: '',
                empedcFirstzy1: '',
                empedcSecondzy1: '',
                //头像
                empHead:'',
            },
            //    	民族
            searchNationCol: [
                {
                    title: '名称',
                    key: 'lanCn',
                    sortable: 'custom',
                    width: 380,
                },
                //          {
                //            title: this.$t('lang_employee.searchColumn.nationEn'),
                //            key: 'lanEn',
                //            sortable: 'custom',
                //            width: 379,
                //          },
            ],
            params: {
                _mt: 'znjsBaseLang.getPage',
                APsort: 'lanCode',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                APfunId: '1',
                APlogType: '弹出框',
                lanType: 'param_info_nationtype',
            },
            //  HRBP对接人
            searchHrbpClo: [
                {
                    title: '员工姓名',
                    key: 'empName',
                    sortable: 'custom',
                },
                {
                    title: '平台',
                    key: 'empPanelDis',
                    width:200,
                },
                {
                    title: '任职公司',
                    key: 'empUnitidDis',
                },
                {
                    title: '任职部门',
                    key: 'empDeptidDis',
                },
                {
                    title: '任职岗位',
                    key: 'empPostidDis',
                },
                {
                    title: '职务',
                    key: 'empDutyIdDis',
                },
                {
                    title: '职等',
                    key: 'empRankinfoIdDis',
                },
                {
                    title: '职能',
                    key: 'empBumdidDis',
                },
            ],
            paramsHrbp: {
                _mt: 'znjsEmpInfo.getSelPerson',
                APsort: 'lanCode',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                APfunId: '1',
                APlogType: '弹出框',
                APperType: 'HrbpPer'

            },
            //  Hzdjr对接人
            searchHzdjrClo: [
                {
                    title: '员工姓名',
                    key: 'empName',
                    sortable: 'custom',
                },
                {
                    title: '平台',
                    key: 'empPanelDis',
                    width:200,
                },
                {
                    title: '任职公司',
                    key: 'empUnitidDis',
                },
                {
                    title: '任职部门',
                    key: 'empDeptidDis',
                },
                {
                    title: '任职岗位',
                    key: 'empPostidDis',
                },
                {
                    title: '职务',
                    key: 'empDutyIdDis',
                },
                {
                    title: '职等',
                    key: 'empRankinfoIdDis',
                },
                {
                    title: '职能',
                    key: 'empBumdidDis',
                },

            ],
            paramsHzdjr: {
                _mt: 'znjsEmpInfo.getSelPerson',
                APsort: 'lanCode',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                APfunId: '1',
                APlogType: '弹出框',
                APperType: 'AdminPer'

            },
            //      银行
            searchBankCol: [
                {
                    title: this.$t('lang_baseManage.baseBankinfo.bankCname'),
                    key: 'bankCname',
                    sortable: 'custom',
                    //          width: 380,
                },
                {
                    title: this.$t('lang_baseManage.baseBankinfo.bankCode'),
                    key: 'bankCode',
                    sortable: 'custom',
                    //          width: 379,
                },
            ],
            paramsBank: {
                _mt: 'znjsBaseBankinfo.getPage',
                AProws: 10,
                APpage: 1,
                APsort: 'id',
                APffk: 0,
                APorder: 'asc',
                APfunId: '1100',
                APlogType: '开户银行',
            },
            //      社保政策
            searchSbPolicyCol: [
                {
                    title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyCn'),
                    key: 'sihfpcyCn',
                    sortable: 'custom',
                    width: 380,
                },
                {
                    title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyNo'),
                    key: 'sihfpcyNo',
                    sortable: 'custom',
                    width: 379,
                },
            ],
            paramsSbPolicy: {
                _mt: 'sihfPolicy.getPage',
                AProws: 10,
                APpage: 1,
                APsort: 'id',
                APorder: 'asc',
                sihfpcyType: '',
                APlogType: '查询List',
            },
            //      雇佣公司
            searchHCClo: [
                {
                    title: '公司名称',
                    key: 'unitFnameCn',
                },
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '所属上级',
                    key: 'unitPidDis',
                },
                {
                    title: '所属上级',
                    key: 'unitPidDis',
                },
                {
                    title: '组织范围',
                    key: 'unitScope',
                },
                {
                    title: '组织类型',
                    key: 'unitTypeDis',
                },
            ],
            paramsHCompany: {
                _mt: 'znjsOrgUnits.getPage',
                AProws: 10,
                APpage: 1,
                APsort: 'id',
                APffk: 0,
                APorder: 'asc',
                unitType: '01company',
                //unitPid: '0',
                APlogType: '雇佣公司',
                importFlag:"-9",
            },
            paramsBnchClo: {
                _mt: 'xianOrgBenchmarkpost.getPage',
                AProws: 10,
                APpage: 1,
                APsort: 'id',
                APorder: 'asc',
                APlogType: '基准岗位',
            },
            //      部门
            searchDeptClo: [

                {
                    title: '部门名称',
                    key: 'unitFnameCn',
                },
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: "所属上级",
                    key: 'unitPidDis',
                    sortable: 'custom',
                },
                {
                    title: "组织范围",
                    key: 'unitScope',
                    sortable: 'custom',
                },
                {
                    title: "组织类型",
                    key: 'unitTypeDis',
                    sortable: 'custom',
                },
            ],
            paramsDept: {
                _mt: 'znjsOrgUnits.getPage',
                AProws: 10,
                APpage: 1,
                APsort: 'id',
                APorder: 'asc',
                APffk: 0,
                APfunId: '1106',
                APlogType: '部门',
                unitType:"02dept",
                status:"02valid",
                importFlag:"-9",
                //unitPid: formEmpValidate.empappUnitidPid,
            },
            //      岗位
            searchPostClo: [

                {
                    title: '岗位名称',
                    key: 'unptPostidDis',
                },

                {
                    title: '职能',
                    key: 'unptBumdidDis',
                },
                {
                    title: '所属部门',
                    key: 'unptDeptidDis',
                },
                {
                    title: '职类',
                    key: 'unptBusridDis',
                },
                {
                    title: '职务',
                    key: 'unptDutyidDis',
                },
                {
                    title: '职等',
                    key: 'unptRankidDis',
                },

            ],
            paramsPost: {
                _mt: 'znjsOrgUnitpost.getPage',
                AProws: 10,
                APpage: 1,
                APsort: 'id',
                APffk: 0,
                APorder: 'asc',
                APfunId: '1107',
                APlogType: '岗位',
            },
            //法律实体
            searchLegaletyClo: [
                {
                    title: '实体编号',
                    key: 'legtCode',
                    sortable: 'custom',
                },
                {
                    title: '名称',
                    key: 'legtName',
                },
                //          {
                //            title: this.$t('lang_employee.searchColumn.postFnameEnDis'),
                //            key: 'postFnameEnDis',
                //          },
            ],
            paramsLegalety: {
                _mt: 'znjsOrgLegalety.getPage',
                AProws: 10,
                APpage: 1,
                APsort: 'id',
                APffk: 0,
                APorder: 'asc',
                APfunId: '1107',
                APlogType: '法律实体',
            },

            //      成本中心
            searchCloumns: [
                {
                    title: this.$t('lang_organization.orgcostcenter.costCode'),
                    key: 'cotcCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_organization.orgcostcenter.cname'),
                    key: 'cotcCname',
                },
                {
                    title: this.$t('lang_organization.orgcostcenter.ename'),
                    key: 'cotcEname',
                },
            ],
            paramsOrgcostcenter: {
                _mt: 'znjsOrgCostcen.getPage',
                AProws: 10,
                APpage: 1,
                APsort: 'id',
                APffk: 0,
                APorder: 'asc',
                APfunId: '1107',
                APlogType: '成本中心查询',
            },
            //      雇佣/工作地点
            searchHirelocationClo: [
                {
                    title: this.$t('lang_baseManage.baseCity.cityName'),
                    key: 'cityName',
                    sortable: 'custom',
                    width: 380,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityTypeName'),
                    key: 'cityTypeDis',
                    sortable: 'custom',
                    width: 379,
                },
            ],
            paramsHirelocation: {
                _mt: 'znjsBaseCity.getPage',
                APsort: 'id',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                APffk: 0,
                APfunId: '1',
                APogType: '地点',
                APdata: '',
            },
            //      上级经理s
            searchMangerClo: [
                {
                    title: '员工姓名',
                    key: 'empName',
                    sortable: 'custom',
                },
                // {
                //     title: '性别',
                //     key: 'empGenderDis',
                //     sortable: 'custom',
                // },
                {
                    title: '主岗/兼岗',
                    key: 'empZjpostDis',
                },
                {
                    title: '平台',
                    key: 'empPanelDis',
                },
                {
                    title: '任职公司',
                    key: 'empUnitidDis',
                },
                {
                    title: '任职部门',
                    key: 'empDeptidDis',
                },
                {
                    title: '任职岗位',
                    key: 'empPostidDis',
                },
                {
                    title: '岗位序列',
                    key: 'empPostordIdDis',
                },
                {
                    title: '职务',
                    key: 'empDutyIdDis',
                },
                {
                    title: '职等',
                    key: 'empRankinfoIdDis',
                },
                {
                    title: '职能',
                    key: 'empBumdidDis',
                },
                // {
                //     title: '职级',
                //     key: 'empRankinfo',
                // },
            ],
            //      基准岗位
            searchBnchClo: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '岗位名称',
                    key: 'postbsName',
                },
                {
                    title: '岗位条线',
                    key: 'postbsSeqDis',
                },
            ],
            paramsManger: {
                _mt: 'znjsEmpInfo.getPage',
                APsort: 'id',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                APffk: 0,
                APlogType: '员工查询',
            },
            ruleValidate: {

                empName: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseCname'), trigger: 'blur' },
                ],
                empPiny: [
                    { required: true, message: '请输入姓名拼音', trigger: 'blur' },
                ],

                empPaptype: [
                    { required: true, message: '证件类型不能为空', trigger: 'blur, change' },
                ],
                empPopcode: [
                    { validator: validateIdTypeCheck, required: true, trigger: 'blur' },
                ],
                empGender: [
                    { required: true, message: '请选择性别', trigger: 'blur, change' },
                ],
                empBirthdate: [
                    { required: true, pattern: /.+/, message: this.$t('lang_employee.empmasterCheck.baseBirthdate'), trigger: 'blur, change' },
                ],
                empBirthdatereal: [
                    { required: true, pattern: /.+/, message: '请选择实际出生日期', trigger: 'blur, change' },
                ],
                empNative: [
                    { required: true, message: '请输入籍贯', trigger: 'blur' },
                ],
                empCitizen: [
                    { required: true, message: '请选择国籍', trigger: 'blur,change' },
                ],
                empHoutype: [
                    { required: true, message: '请选择户籍性质', trigger: 'blur,change' },
                ],
                empMarriage: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseMarriage'), trigger: 'blur, change' },
                ],
                baseNation: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseNation'), trigger: 'blur, change' },
                ],
                empPoils: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.basePolitical'), trigger: 'blur, change' },
                ],
                empIsincomp: [
                    { required: true, trigger: 'blur, change' },
                ],
                empZhic: [
                    { required: true, message: '请选择职称', trigger: 'blur, change' },
                ],
                empCjno: [
                    { required: true, message: '请输入残疾证号', trigger: 'blur, change' },
                ],
                paramCode: [
                    { required: true, message: '请选择残障等级', trigger: 'blur, change' },
                ],
                empIscj: [
                    { required: true, message: '请选择是否残疾', trigger: 'blur, change' },
                ],
                empAccIsReim: [
                    { required: true, message: '请选择是否同工资', trigger: 'blur, change' },
                ],
                baseTechnicaltitle: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseTechnicaltitle'), trigger: 'blur, change' },
                ],
                baseTechspec: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseTechspec'), trigger: 'blur' },
                ],
                empFworkdate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.baseFirstworkdate'), trigger: 'blur, change' },
                ],
                baseTechdate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.baseTechdate'), trigger: 'blur, change' },
                ],
                empSysaccountOa: [
                    { required: true, message: '系统账号不能为空', trigger: 'blur, change' },
                ],
                empctMaincomp: [
                    { required: true, message: '合同主体公司不能为空', trigger: 'blur, change' },
                ],
                empSysaccpwdOa: [
                    { required: true, message: '账号密码不能为空', trigger: 'blur, change' },
                ],
                empOrderOa: [
                    { required: true, message: '排序号不能为空', trigger: 'blur, change' },
                ],
                empkiEstablishment: [
                    { required: true, message: '编制类别不能为空', trigger: 'blur, change' },
                ],
                empkiEmpmapping: [
                    { required: true, message: '人员类型不能为空', trigger: 'blur, change' },
                ],
                edDegree: [
                    { required: true, message: '学位不能为空', trigger: 'blur, change' },
                ],
                // edSchool: [
                //     { required: true, message: '学校不能为空', trigger: 'blur, change' },
                // ],
                empcompPostlevel: [
                    { required: true, message: '职位级别不能为空', trigger: 'blur, change' },
                ],
                edSchooltype: [
                    { required: true, message: '学校类型不能为空', trigger: 'blur, change' },
                ],
                edLearntype: [
                    { required: true, message: '学习方式不能为空', trigger: 'blur, change' },
                ],
                empkiPaystyle: [
                    { required: true, message: '薪制类别不能为空', trigger: 'blur, change' },
                ],
                empkeyEndate: [
                    { required: true, type: 'date', message: '请选择入职日期', trigger: 'change' },
                ],
                empkeySendate: [
                    { required: true, type: 'date', message: '请选择公司资历日期', trigger: 'blur, change' },
                ],
                empkeyEmptype: [
                    { required: true, message: '请选择员工类别', trigger: 'blur, change' },
                ],
                empkeyEmpmode: [
                    { required: true, message: '请选择员工分类', trigger: 'blur, change' },
                ],
                empkeyCpubt: [
                    { required: true, message: '请选择电脑补贴', trigger: 'blur, change' },
                ],
                empappZjpost: [
                    { required: true, message: '请选择主岗兼岗', trigger: 'blur, change' },
                ],
                empappPanel: [
                    { required: true, message: '请选择所属板块', trigger: 'blur, change' },
                ],
                empappUnitid: [
                    { required: true, message: '请选择任职公司', trigger: 'blur, change' },
                ],
                empconFlstid: [
                    { required: true, message: '请选择法律实体', trigger: 'blur, change' },
                ],
                empapDeptid: [
                    { required: true, message: '请选择任职部门', trigger: 'blur, change' },
                ],
                empapPostid: [
                    { required: true, message: '请选择任职岗位', trigger: 'blur, change' },
                ],
                empappCotcid: [
                    { required: true, message: '请选择成本中心', trigger: 'blur, change' },
                ],
                empappCotcratio: [
                    { validator: validateCotcratio, required: true, trigger: 'blur, change' },
                ],
                empconCategory: [
                    { required: true, message: '请选择合同类型', trigger: 'blur, change' },
                ],
                empconCstype: [
                    { required: true, message: '请选择合同签署类型', trigger: 'blur, change' },
                ],
                empconDuration: [
                    { required: true, message: '请选择合同期限', trigger: 'blur, change' },
                ],
                empconSdate: [
                    { required: true, type: 'date', message: '请选择合同开始日期', trigger: 'blur, change' },
                ],
                empconQsdate: [
                    { required: true, type: 'date', message: '请选择合同签署日期', trigger: 'blur, change' },
                ],
                empedcEsdate: [
                    { validator: validateDate, required: true, type: 'date', trigger: 'blur, change' },
                ],
                empedcBydate: [
                    { required: true, type: 'date', message: '请选择毕业年月', trigger: 'blur, change' },
                ],
                empedcEsdate1: [
                    { validator: validateDate, required: true, type: 'date', trigger: 'blur, change' },
                ],
                empedcBydate1: [
                    { required: true, type: 'date', message: '请选择毕业年月', trigger: 'blur, change' },
                ],
                empconBmxy: [
                    { required: true, message: '请选择保密协议类型', trigger: 'blur, change' },
                ],
                empWttype: [
                    { required: true, message: '请选择工时类型', trigger: 'blur, change' },
                ],
                empbkAccount: [
                    { required: true, message: '请输入银行账号', trigger: 'blur, change' },
                ],
                empReimAcct: [
                    { required: true, message: '请输入报销银行账号', trigger: 'blur, change' },
                ],
                empconTrialperiod: [
                    { required: true, message: '请选择试用期限', trigger: 'blur, change' },
                ],
                empbkNameid: [
                    { required: true, message: '请选择银行名称', trigger: 'blur, change' },
                ],
                empedcFirst: [
                    { required: true, trigger: 'blur, change' },
                ],
                empkeyEmpno: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.pkiWorkno'), trigger: 'blur' },
                ],
                empkeyEmpstatus: [
                    { required: true, message: '请选择员工状态', trigger: 'blur, change' },
                ],
                pkiEmptype: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.pkiEmptype'), trigger: 'blur, change' },
                ],
                compHirecompany: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.compHirecompany'), trigger: 'blur, change' },
                ],
                compDept: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.compDept'), trigger: 'blur, change' },
                ],
                compPost: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.compPost'), trigger: 'blur, change' },
                ],
                compCostcenter: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.compCostcenter'), trigger: 'blur, change' },
                ],
                compHirelocation: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.compHirelocation'), trigger: 'blur, change' },
                ],
                compWorklocation: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.compWorklocation'), trigger: 'blur, change' },
                ],
                compBuspmp: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.compBuspmp'), trigger: 'blur, change' },
                ],
                compFunpmp: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.compFunpmp'), trigger: 'blur, change' },
                ],
                compEntrydate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.compEntrydate'), trigger: 'blur, change' },
                ],
                compServicedate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.compServicedate'), trigger: 'blur, change' },
                ],
                compCertificatedate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.compCertificatedate'), trigger: 'blur, change' },
                ],
                // compHr: [
                //   { required: true, message: this.$t('lang_employee.empmasterCheck.compHr'), trigger: 'blur, change' },
                // ],
                ctContracttype: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctContracttype'), trigger: 'blur, change' },
                ],
                empctSigntype: [
                    { required: true, message: '不能为空', trigger: 'blur, change' },
                ],
                empctIsrehire: [
                    { required: true, message: '不能为空', trigger: 'blur, change' },
                ],
                empctCategory: [
                    { required: true, message: '合同类别不能为空', trigger: 'blur, change' },
                ],
                ctContractworktime: [
                    { required: true, message: '不能为空', trigger: 'blur, change' },
                ],
                ctContractperiod: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctContractperiod'), trigger: 'blur' },
                ],
                ctContractsdate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.ctContractsdate'), trigger: 'blur, change' },
                ],
                ctContractedate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.ctContractedate'), trigger: 'blur' },
                ],
                ctContractprom: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctContractprom'), trigger: 'blur, change' },
                ],
                ctConfidential: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctConfidential'), trigger: 'blur, change' },
                ],
                ctContractworktime: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctContractworktime'), trigger: 'blur, change' },
                ],
                ctSigndate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.ctSigndate'), trigger: 'blur, change' },
                ],
                ctProbation: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctProbation'), trigger: 'blur, change' },
                ],
                salPostlevel: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.salPostlevel'), trigger: 'blur, change' },
                ],
                salSalarylevel: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.salSalarylevel'), trigger: 'blur, change' },
                ],
                salTravellevel: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.salTravellevel'), trigger: 'blur, change' },
                ],
                salAdminlevel: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.salAdminlevel'), trigger: 'blur, change' },
                ],
                salSalaryset: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.salSalaryset'), trigger: 'blur, change' },
                ],
                bkBank: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.bkBank'), trigger: 'blur, change' },
                ],
                bkAccount: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.bkAccount'), trigger: 'blur' },
                ],
                bkAccnane: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.bkAccnane'), trigger: 'blur' },
                ],
                sbBenefitlocation: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.sbBenefitlocation'), trigger: 'blur, change' },
                ],
                sbHfundlocatio: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.sbHfundlocatio'), trigger: 'blur, change' },
                ],
                sbBenefitpolicy: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.sbBenefitpolicy'), trigger: 'blur, change' },
                ],
                //          sbBenefittype: [
                //            { required: true, message: this.$t('lang_employee.empmasterCheck.sbBenefittype'), trigger: 'blur, change' },
                //          ],
                sbHfundpolicy: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.sbHfundpolicy'), trigger: 'blur, change' },
                ],
                //          sbHfundtype: [
                //            { required: true, message: this.$t('lang_employee.empmasterCheck.sbHfundtype'), trigger: 'blur, change' },
                //          ],
                //          edEducationlevel: [
                //            { required: true, message: '请选择学历', trigger: 'blur, change' },
                //          ],
                edCuntry: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.edCuntry'), trigger: 'blur, change' },
                ],
                // edSchool: [
                //     { required: true, message: this.$t('lang_employee.empmasterCheck.edSchool'), trigger: 'blur' },
                // ],
                edDegree: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.edDegree'), trigger: 'blur' },
                ],
                edSpecialty: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.edSpecialty'), trigger: 'blur' },
                ],
                edSdate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.edSdate'), trigger: 'blur, change' },
                ],
                edEdate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.edEdate'), trigger: 'blur, change' },
                ],
                empedcEsdate: [
                    { validator: validateDate, required: true, type: 'date', trigger: 'blur, change' },
                ],
                empedcBydate: [
                    { required: true, type: 'date', message: '请选择毕业年月', trigger: 'blur, change' },
                ],
                empedcBackgd: [
                    { required: true, message: '请选择学历', trigger: 'change' },
                ],
                empedcDegree: [
                    { required: true, message: '请选择学位', trigger: 'change' },
                ],
                empedcContid: [
                    { required: true, message: '请选择国家', trigger: 'change' },
                ],
                empedcSchool: [
                    { required: true, message: '请输入学校', trigger: 'change' },
                ],
                empedcSchooltype: [
                    { required: true, message: '请选择学校类型', trigger: 'change' },
                ],
                empedcLearntype: [
                    { required: true, message: '请选择学习方式', trigger: 'change' },
                ],
                empedcFirstzy: [
                    { required: true, message: '请输入第一专业', trigger: 'change' },
                ],
                empedcEsdate1: [
                    { validator: validateDate, required: true, type: 'date', trigger: 'blur, change' },
                ],
                empedcBydate1: [
                    { required: true, type: 'date', message: '请选择毕业年月', trigger: 'blur, change' },
                ],
                empedcBackgd1: [
                    { required: true, message: '请选择学历', trigger: 'change' },
                ],
                empedcDegree1: [
                    { required: true, message: '请选择学位', trigger: 'change' },
                ],
                empedcContid1: [
                    { required: true, message: '请选择国家', trigger: 'change' },
                ],
                empedcSchool1: [
                    { required: true, message: '请输入学校', trigger: 'change' },
                ],
                empedcSchooltype1: [
                    { required: true, message: '请选择学校类型', trigger: 'change' },
                ],
                empedcLearntype1: [
                    { required: true, message: '请选择学习方式', trigger: 'change' },
                ],
                empedcFirstzy1: [
                    { required: true, message: '请输入第一专业', trigger: 'change' },
                ],
                empctaMobile: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaMobile'), trigger: 'blur' },
                    { type: "string", pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机格式', trigger: 'blur' }
                ],
                ctaPhone: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaPhone'), trigger: 'blur' },
                ],
                ctaPersmail: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaPersmail'), trigger: 'blur' },
                ],
                empctaCompmail: [
                    { required: false, message: this.$t('lang_employee.empmasterCheck.ctaCompmail'), trigger: 'blur' },
                    { type: 'email', message: '请输入正确邮箱格式', trigger: 'blur' }
                ],
                ctaQq: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaQq'), trigger: 'blur' },
                ],
                ctaWechat: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaWechat'), trigger: 'blur' },
                ],
                ctaEmergcontact: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaEmergcontact'), trigger: 'blur' },
                ],
                ctaEmcrelation: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaEmcrelation'), trigger: 'blur, change' },
                ],
                ctaEmcphone: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaEmcphone'), trigger: 'blur' },
                ],
                ctaEmcaddr: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaEmcaddr'), trigger: 'blur' },
                ],
                addCuntry: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addCuntry'), trigger: 'blur, change' },
                ],
                addProvince: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addProvince'), trigger: 'blur, change' },
                ],
                addCity: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addCity'), trigger: 'blur, change' },
                ],
                addStreet: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addStreet'), trigger: 'blur' },
                ],
                addZip: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addZip'), trigger: 'blur' },
                ],
                addrCuntry: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addrCuntry'), trigger: 'blur, change' },
                ],
                addrProvince: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addrProvince'), trigger: 'blur, change' },
                ],
                addrCity: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addrCity'), trigger: 'blur, change' },
                ],
                addrStreet: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addrStreet'), trigger: 'blur' },
                ],
                addrRegisterproperty: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addrRegisterproperty'), trigger: 'blur, change' },
                ],
                addrZip: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.addrZip'), trigger: 'blur' },
                ],
                empcompPostseq: [
                    { required: true, message: '请输入条线', trigger: 'blur' },
                ],
                ctProbationdate: [
                    { required: true, type: 'date', message: '请输入试用到期时间', trigger: 'blur' },
                ],
                ctProbationprom: [
                    { required: true, message: '请选择试用到期通知时间(天数)', trigger: 'blur' },
                ],
            },
        }
    },
    props: {
        id: Number,
        //    	logType: String,
    },
    watch: {

    },
    updated () {
    },
    components: {
        searchNation,
        searchBank,
        searchSbPolicy,
        searchHCompany,
        searchDept,
        searchPost,
        searchOrgcostcenter,
        searchHirelocation,
        searchManager,
        searchBnchpost,
        searchCountry,
        searchLegalety,
        searchHrbp,
        searchHzdjr
    },
    mounted () {
        this.getSelect()
        //this.getSelectCountry()
        // this.getSelectSalSet()
    },
    created () {
        this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
        //是否第一学历change事件
        isEmpedcFirst (val) {
            val == '0' ? this.isEmpedcFirstVal = true : this.isEmpedcFirstVal = false
        },
        isCjChange (val) {
            const t = this
            t.formEmpValidate.empIscj = val
            if (t.formEmpValidate.empIscj === '1') {
                t.isVasiable = true
            } else {
                t.isVasiable = false
            }
        },
        //合同开始日期
        empconSdateStart (val) {
            console.log(val, '555555555')
            const t = this
            let addYear = t.formEmpValidate.empconDuration
            console.log(addYear, '11111333339999')
            if (val !== '') {
                let initYear = parseInt(addYear)
                if (initYear >= 1 && initYear < 10) {
                    console.log(addYear, '11111113333337777777')
                    let enDates = new Date(val)
                    let enDate = enDates.setFullYear(enDates.getFullYear() + parseInt(addYear))
                    let m = enDates.getMonth() + 1
                    let y = enDates.getFullYear()
                    let qLastMonth = (Math.floor(m / 3) + 1) * 3
                    enDates.setMonth(qLastMonth)
                    enDates.setDate(0)
                    let mm = enDates.getMonth() + 1
                    let day = enDates.getDate()
                    let days = y + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (day < 10 ? '0' + day : day)
                    if (days) {
                        t.formEmpValidate.empconYedate = days
                    }
                }else {
                    t.formEmpValidate.empconYedate = ''
                }
            }
        },
        //合同开始日期
        empconDuration (val) {
            console.log(val, '555555555')
            const t = this
            let addYear = t.formEmpValidate.empconSdate
            console.log(addYear, '11111333339999')
            if (val !== '') {
                let initYear = parseInt(val)
                if (initYear >= 1 && initYear < 10) {
                    console.log(addYear, '11111113333337777777')
                    let enDates = new Date(addYear)
                    let enDate = enDates.setFullYear(enDates.getFullYear() + parseInt(val))
                    let m = enDates.getMonth() + 1
                    let y = enDates.getFullYear()
                    let qLastMonth = (Math.floor(m / 3) + 1) * 3
                    enDates.setMonth(qLastMonth)
                    enDates.setDate(0)
                    let mm = enDates.getMonth() + 1
                    let day = enDates.getDate()
                    let days = y + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (day < 10 ? '0' + day : day)
                    if (days) {
                        t.formEmpValidate.empconYedate = days
                    }
                }else{
                     t.formEmpValidate.empconYedate = ''
                }
            } else {
                t.formEmpValidate.empconYedate = ''
            }
        },
        //试用日期
        startChange (val) {
            console.log(val, '333355584')
            const t = this
            let addMonth = t.formEmpValidate.empconTrialperiod
            let months = parseInt(addMonth)
            console.log(addMonth, '3333555841111111')
            if (val !== '' && months !== NaN) {
                let enDates = new Date(val)
                let m = enDates.getMonth() + 1
                let qLastMonth = m + months
                enDates.setMonth(qLastMonth)
                let y = enDates.getFullYear()
                let mm = enDates.getMonth()
                let day = enDates.getDate() - 1
                let days = y + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (day < 10 ? '0' + day : day)
                if (days) {
                    t.formEmpValidate.empconPedate = days
                }
            } else {
                t.formEmpValidate.empconPedate = ''
            }
        },
        enChange (val) {
            const t = this
            let Sendate = t.formEmpValidate.empkeySendate
            let Ezndate = t.formEmpValidate.empkeyEzndate
            if (val !== '' && Sendate == '' && Ezndate == '') {
                t.formEmpValidate.empkeySendate = val
                t.formEmpValidate.empkeyEzndate = val
                t.formEmpValidate.empconPsdate = val
            }
        },
        resetField () {
            const t = this
            t.$refs.formEmpValidate.resetFields()
        },
        handleSubmit () {
            const t = this
            console.log(22222222, '3333333')
            const dataValue = deepCopy(t.formEmpValidate)
            let empInfo = {
                empHead: dataValue.empHead,
                empGid: dataValue.empGid,
                empName: dataValue.empName,
                empPiny: dataValue.empPiny,
                empLastname: dataValue.empLastname,
                empFirstname: dataValue.empFirstname,

                empPaptype: dataValue.empPaptype,
                empPopcode: dataValue.empPopcode,
                empGender: dataValue.empGender,
                empBirthdate: dataValue.empBirthdate === '' ? '' : new Date(dataValue.empBirthdate).format('yyyy-MM-dd'),
                empBirthdatereal: dataValue.empBirthdatereal === '' ? '' : new Date(dataValue.empBirthdatereal).format('yyyy-MM-dd'),
                empCitizen: dataValue.empCitizenPid,
                empAlias: dataValue.empAlias,
                empNation: dataValue.empNation,
                empMobile: dataValue.empctaMobile,
                empCompmail: dataValue.empctaCompmail,

                empNative: dataValue.empNative,
                empHoutype: dataValue.empHoutype,
                empMarriage: dataValue.empMarriage,
                empPoils: dataValue.empPoils,

                empPsdate: dataValue.empPsdate === '' ? '' : new Date(dataValue.empPsdate).format('yyyy-MM-dd'),
                empIsincomp: dataValue.empIsincomp,
                //empZhic: dataValue.empZhic, 
                //empZcspecialty: dataValue.empZcspecialty, 
                //empZcDate: dataValue.empZcDate === '' ? '' : new Date(dataValue.empZcDate).format('yyyy-MM-dd'),
                empFworkdate: dataValue.empFworkdate === '' ? '' : new Date(dataValue.empFworkdate).format('yyyy-MM-dd'),
                empIsdisability: dataValue.empIscj,
                empDisno: dataValue.empCjno,
                empDislevel: dataValue.empCzlevel,
                empEmpno: dataValue.empkeyEmpno,
                empEmpstatus: dataValue.empkeyEmpstatus,
                empEndate: dataValue.empkeyEndate === '' ? '' : new Date(dataValue.empkeyEndate).format('yyyy-MM-dd'),
                empSendate: dataValue.empkeySendate === '' ? '' : new Date(dataValue.empkeySendate).format('yyyy-MM-dd'),
                empEzndate: dataValue.empkeyEzndate === '' ? '' : new Date(dataValue.empkeyEzndate).format('yyyy-MM-dd'),
                //empEmptype: dataValue.empkeyEmptype,
                empEmpmode: dataValue.empkeyEmpmode,
                empIscxemp: dataValue.empkeyIscxemp,
                empIstxemp: dataValue.empkeyIstxemp,
                empIsgps: dataValue.empIsgps,
                empZjpost: dataValue.empappZjpost,


                // empcompHr: dataValue.comPHRPid,


                empPanel: dataValue.empappPanel,
                empUnitid: dataValue.empappUnitidPid,
                empLegalid: dataValue.empconFlstidPid,
                empDeptid: dataValue.empapDeptidPid,
                empPostid: dataValue.empapPostidPid,

                //组织范围字段
                //empUnitscope: dataValue.empappUnitscope,
                //////业务领域，岗位序列

                // 虚拟 ：
                //empapPtodid: dataValue.empapPtodidPid,
                // postBusridDis: dataValue.postBusridDis,
                // postBumdidDis: dataValue.postBumdidDis,

                // empperDutyid: dataValue.empperDutyid,
                // empperRankid: dataValue.empperRankid,
                // postRankinfoDis: dataValue.postRankinfoDis,

                empCotcratio: dataValue.empappCotcratio,
                empEmpcity: dataValue.empappEmpcityPid,
                empWkcity: dataValue.empappWkcityPid,
                empWcityid: dataValue.empappWkcityPid,
                empZpid: dataValue.empappZpidPid,
                empIsjoinh: dataValue.empkeyIsjoinh,
                empRcityid: dataValue.empkeyRcityid,
                empCuplevel: dataValue.empkeyCuplevel,
                empEnglevel: dataValue.empkeyEnglevel,
                //新增字段，主表待定
                empHrbp: dataValue.empkeyHrbpPid,
                empHzdjr: dataValue.empkeyHzdjrPid,
                empCpubt: dataValue.empkeyCpubt,
                empCategory: dataValue.empconCategory,
                empCstype: dataValue.empconCstype,
                empDuration: dataValue.empconDuration,
                empSdate: dataValue.empconSdate === '' ? '' : new Date(dataValue.empconSdate).format('yyyy-MM-dd'),
                empYedate: dataValue.empconYedate === '' ? '' : new Date(dataValue.empconYedate).format('yyyy-MM-dd'),
                empQsdate: dataValue.empconQsdate === '' ? '' : new Date(dataValue.empconQsdate).format('yyyy-MM-dd'),
                empQdcs: dataValue.empconQdcs,
                empBmxy: dataValue.empconBmxy,
                empWttype: dataValue.empWttype,
                empDuedate: dataValue.empconDuedate,
                empTrialperiod: dataValue.empconTrialperiod,
                empPsdate: dataValue.empconPsdate === '' ? '' : new Date(dataValue.empconPsdate).format('yyyy-MM-dd'),
                empPedate: dataValue.empconPedate === '' ? '' : new Date(dataValue.empconPedate).format('yyyy-MM-dd'),

                empPduedate: dataValue.empconPduedate,
                empNameid: dataValue.empbkNameidPid,
                empAccount: dataValue.empbkAccount,
                empReimAcct: dataValue.empReimAcct,
                empReimDepo: dataValue.empReimDepo,
                empDeposit: dataValue.empbkDeposit,
                empAccIsReim: dataValue.empAccIsReim,
                empReimBank: dataValue.empReimBankPid,

                empEsdateh: dataValue.empedcEsdate === '' ? '' : new Date(dataValue.empedcEsdate).format('yyyy-MM-dd'),
                empBydateh: dataValue.empedcBydate === '' ? '' : new Date(dataValue.empedcBydate).format('yyyy-MM-dd'),
                empBackgdh: dataValue.empedcBackgd,
                empDegreeh: dataValue.empedcDegree,
                empContidh: dataValue.empedcContidPid,
                empSchoolh: dataValue.empedcSchool,
                empSchooltypeh: dataValue.empedcSchooltype,
                empLearntypeh: dataValue.empedcLearntype,
                empFirstzyh: dataValue.empedcFirstzy,
                empSecondzyh: dataValue.empedcSecondzy,
                empFirst: dataValue.empedcFirst,
                //第一学历
                empEsdate: dataValue.empedcEsdate1 === '' ? '' : new Date(dataValue.empedcEsdate1).format('yyyy-MM-dd'),
                empBydate: dataValue.empedcBydate1 === '' ? '' : new Date(dataValue.empedcBydate1).format('yyyy-MM-dd'),
                empBackgd: dataValue.empedcBackgd1,
                empDegree: dataValue.empedcDegree1,
                empContid: dataValue.empedcContidPid1,
                empSchool: dataValue.empedcSchool1,
                empSchooltype: dataValue.empedcSchooltype1,
                empLearntype: dataValue.empedcLearntype1,
                empFirstzy: dataValue.empedcFirstzy1,
                empSecondzy: dataValue.empedcSecondzy1,
            }

            //      基本信息
            let empBaseinfo = {
                // empbaseName: dataValue.empName,
                // empbasePiny:dataValue.empPiny,
                // empbaseLastname:dataValue.empLastname,
                // empbaseFirstname:dataValue.empFirstname,

                empcerType: dataValue.empPaptype,
                empcerNumber: dataValue.empPopcode,
                // empbaseGender: dataValue.empGender,
                // empbaseBirthdate: dataValue.empBirthdate === '' ? '' : new Date(dataValue.empBirthdate).format('yyyy-MM-dd'),
                // empbaseAlias: dataValue.empAlias,
                // empbaseNation: dataValue.empNation,


                // empbaseNative: dataValue.empNative,
                // empbaseHoutype: dataValue.empHoutype,
                // empbaseMarriage: dataValue.empMarriage,
                // empbasePoils: dataValue.empPoils,

                // empbasePsdate: dataValue.empPsdate === '' ? '' : new Date(dataValue.empPsdate).format('yyyy-MM-dd'),
                // empbaseIsincomp: dataValue.empIsincomp,
                // //empZhic: dataValue.empZhic,
                // //empZcspecialty: dataValue.empZcspecialty,
                // //empZcDate: dataValue.empZcDate === '' ? '' : new Date(dataValue.empZcDate).format('yyyy-MM-dd'),
                // empbaseFworkdate: dataValue.empFworkdate === '' ? '' : new Date(dataValue.empFworkdate).format('yyyy-MM-dd'),
                // empbaseIsdisability: dataValue.empIscj,
                // empbaseDisno: dataValue.empCjno,
                // empbaseDislevel: dataValue.empCzlevel,

            }
            let empContact = {
                empctaMobile: dataValue.empctaMobile,
                empctaCompmail: dataValue.empctaCompmail,
            }
            //      公司信息
            let empKeyinfo = {
                empkeyEmpno: dataValue.empkeyEmpno,
                empkeyEmpstatus: dataValue.empkeyEmpstatus,
                empkeyEndate: dataValue.empkeyEndate === '' ? '' : new Date(dataValue.empkeyEndate).format('yyyy-MM-dd'),
                empkeySendate: dataValue.empkeySendate === '' ? '' : new Date(dataValue.empkeySendate).format('yyyy-MM-dd'),
                empkeyEzndate: dataValue.empkeyEzndate === '' ? '' : new Date(dataValue.empkeyEzndate).format('yyyy-MM-dd'),

                empkeyEmpmode: dataValue.empkeyEmpmode,
                empkeyIscxemp: dataValue.empkeyIscxemp,
                empkeyIstxemp: dataValue.empkeyIstxemp,
                empIsgps: dataValue.empIsgps,



                empkeyIsjoinh: dataValue.empkeyIsjoinh,
                empkeyRcityid: dataValue.empkeyRcityid,
                empkeyCuplevel: dataValue.empkeyCuplevel,
                empkeyEnglevel: dataValue.empkeyEnglevel,
                //新增字段，主表待定
                empkeyHrbp: dataValue.empkeyHrbp,
                empkeyHzdjr: dataValue.empkeyHzdjr,
                empkeyCpubt: dataValue.empkeyCpubt,
            }
            let empAppinfo = {
                empappZjpost: dataValue.empappZjpost,
                // empcompHr: dataValue.comPHRPid,


                empappPanel: dataValue.empappPanel,
                empappUnitid: dataValue.empappUnitidPid,
                empappLegalid: dataValue.empconFlstidPid,
                empappDeptid: dataValue.empapDeptidPid,
                empappPostid: dataValue.empapPostidPid,
                empappUnitscope: dataValue.empappUnitscope,
                //////业务领域，岗位序列

                // 虚拟 ：
                //empapPtodid: dataValue.empapPtodidPid,
                // postBusridDis: dataValue.postBusridDis,
                // postBumdidDis: dataValue.postBumdidDis,

                // empperDutyid: dataValue.empperDutyid,
                // empperRankid: dataValue.empperRankid,
                // postRankinfoDis: dataValue.postRankinfoDis,
                //车

                empappCotcid: dataValue.empappCotcidPid,
                empappCotcratio: dataValue.empappCotcratio,
                empappEmpcity: dataValue.empappEmpcityPid,
                empappWkcity: dataValue.empappWkcityPid,
                empappZpid: dataValue.empappZpidPid,
            }
            //      合同信息
            let empContract = {
                empconCategory: dataValue.empconCategory,
                empconCstype: dataValue.empconCstype,
                empconDuration: dataValue.empconDuration,
                empconSdate: dataValue.empconSdate === '' ? '' : new Date(dataValue.empconSdate).format('yyyy-MM-dd'),
                empconYedate: dataValue.empconYedate === '' ? '' : new Date(dataValue.empconYedate).format('yyyy-MM-dd'),
                empconQsdate: dataValue.empconQsdate === '' ? '' : new Date(dataValue.empconQsdate).format('yyyy-MM-dd'),
                empconQdcs: dataValue.empconQdcs,
                empconBmxy: dataValue.empconBmxy,
                empconDuedate: dataValue.empconDuedate,
                empconTrialperiod: dataValue.empconTrialperiod,
                empconPsdate: dataValue.empconPsdate === '' ? '' : new Date(dataValue.empconPsdate).format('yyyy-MM-dd'),
                empconPedate: dataValue.empconPedate === '' ? '' : new Date(dataValue.empconPedate).format('yyyy-MM-dd'),

                empconPduedate: dataValue.empconPduedate,

            }
            //银行卡信息
            let empBank = {
                empbkNameid: dataValue.empbkNameidPid,
                empbkAccount: dataValue.empbkAccount,
                empbkDeposit: dataValue.empbkDeposit,
            }

            //      最高学历信息
            let empEducation = {
                //        	empedEducationlevel: dataValue.edEducationlevel,
                empedcEsdate: dataValue.empedcEsdate === '' ? '' : new Date(dataValue.empedcEsdate).format('yyyy-MM-dd'),
                empedcBydate: dataValue.empedcBydate === '' ? '' : new Date(dataValue.empedcBydate).format('yyyy-MM-dd'),
                empedcBackgd: dataValue.empedcBackgd,
                empedcDegree: dataValue.empedcDegree,
                empedcContid: dataValue.empedcContidPid,
                empedcSchool: dataValue.empedcSchool,
                empedcSchooltype: dataValue.empedcSchooltype,
                empedcLearntype: dataValue.empedcLearntype,
                empedcFirstzy: dataValue.empedcFirstzy,
                empedcSecondzy: dataValue.empedcSecondzy,
                empedcFirst: dataValue.empedcFirst,
            }
            //    第一学历信息
            let empOneEducation = {
                //        	empedEducationlevel: dataValue.edEducationlevel,
                empedcEsdate: dataValue.empedcEsdate1 === '' ? '' : new Date(dataValue.empedcEsdate1).format('yyyy-MM-dd'),
                empedcBydate: dataValue.empedcBydate1 === '' ? '' : new Date(dataValue.empedcBydate1).format('yyyy-MM-dd'),
                empedcBackgd: dataValue.empedcBackgd1,
                empedcDegree: dataValue.empedcDegree1,
                empedcContid: dataValue.empedcContidPid1,
                empedcSchool: dataValue.empedcSchool1,
                empedcSchooltype: dataValue.empedcSchooltype1,
                empedcLearntype: dataValue.empedcLearntype1,
                empedcFirstzy: dataValue.empedcFirstzy1,
                empedcSecondzy: dataValue.empedcSecondzy1,

            }

            let data = {
                APempInfo: empInfo,
                _mt: 'znjsEmpInfo.addMain',
                APlogType: '新增员工主数据',
            }
            //    if(t.isEmpedcFirstVal){
            //         data = {
            //             APempInfo: empInfo,
            //             APempCertinfo:empBaseinfo,
            //             APempContact: empContact,
            //             APempKeyInfo: empKeyinfo,
            //             APempAppInfo:empAppinfo,
            //             APempContract:empContract,
            //             APempBank:empBank,
            //             APempEducation: empEducation,
            //             APempOneEducation:empOneEducation,
            //             _mt: 'znjsEmpInfo.addMain',
            //             APlogType: '新增员工主数据',
            //         }
            //    }else{
            //         data = {
            //             APempInfo: empInfo,
            //             APempCertinfo:empBaseinfo,
            //             APempContact: empContact,
            //             APempKeyInfo: empKeyinfo,
            //             APempAppInfo:empAppinfo,
            //             APempContract:empContract,
            //             APempBank:empBank,
            //             APempEducation: empEducation,
            //             _mt: 'znjsEmpInfo.addMain',
            //             APlogType: '新增员工主数据',
            //         }
            // }
            t.$refs.formEmpValidate.validate((valid) => {
                console.log(valid, '333333333333')
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginData(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            t.$emit('closeEmp')
                            //t.$emit('getData', res.data.content[0])
                            t.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: this.$t('reminder.addsuccess'),
                            })
                        }
                    }).catch(() => {
                        t.isSpin = false
                        // this.$Modal.error({
                        //   title: this.$t('reminder.err'),
                        //   content: this.$t('reminder.errormessage'),
                        // })
                    })
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        //              tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
                    })
                }
            })
        },
        handleClose () {
            const t = this
            t.$refs.formEmpValidate.resetFields()
            t.$emit('closeEmp')
        },
        closeAddEmp () {
            const t = this
            t.$emit('closeEmp')
        },
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: 'znjsBaseParamInfo.getSelectValue',
                APlogType: this.$t('button.ser'),
                APtypeCode: 'gender,marrystatus,political,techlevel,emptype,contrpertype,postlevel,salarylevel,travellevel,adminlevel,education,relationship,benefitacctype,idtype,registerproperty,worktimetype,contperiod,noticedays,confidential,probperiod,contractcategary,yesno,worktimetype,contract_signtype,degreelevel,schooltype,learnstyle,establishmenttype,empmapping,payofftype,disabilitylevel,empstatus,empcategory,contracttype,contractsigntype,nationtype,bussector,postprop,computerlevel,englishlevel,contracttypezn,computerSubsidy',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectGender = res.data.content[0].value[0].paramList
                    t.selectMarriage = res.data.content[0].value[1].paramList
                    t.selectPolitical = res.data.content[0].value[2].paramList
                    t.selectTechnicaltitle = res.data.content[0].value[3].paramList
                    t.selectEmptype = res.data.content[0].value[4].paramList
                    t.selectContracttype = res.data.content[0].value[5].paramList
                    t.selectPostlevel = res.data.content[0].value[6].paramList
                    t.selectSalarylevel = res.data.content[0].value[7].paramList
                    t.selectTravellevel = res.data.content[0].value[8].paramList
                    t.selectAdminlevel = res.data.content[0].value[9].paramList
                    t.selectEducationlevel = res.data.content[0].value[10].paramList
                    t.selectEmcrelation = res.data.content[0].value[11].paramList
                    //            t.selectsbBenefittype = res.data.content[0].value[12].paramList
                    t.selectIdsType = res.data.content[0].value[13].paramList
                    t.selectRegisterproperty = res.data.content[0].value[14].paramList
                    t.selectctContractworktime = res.data.content[0].value[15].paramList
                    t.selectContractperiod = res.data.content[0].value[16].paramList
                    t.selectContractprom = res.data.content[0].value[17].paramList
                    t.selectProbationprom = res.data.content[0].value[17].paramList
                    t.selectConfidential = res.data.content[0].value[18].paramList
                    t.selectctProbation = res.data.content[0].value[19].paramList
                    t.seleempctCategory = res.data.content[0].value[20].paramList
                    t.selectYesno = res.data.content[0].value[21].paramList
                    t.selectWorktimetype = res.data.content[0].value[22].paramList
                    t.selectSigntype = res.data.content[0].value[23].paramList
                    t.selectEducationlevel1 = res.data.content[0].value[24].paramList
                    t.selectEducationlevel2 = res.data.content[0].value[25].paramList
                    t.selectEducationlevel3 = res.data.content[0].value[26].paramList
                    t.selectEstablishmenttype = res.data.content[0].value[27].paramList // 编制类别
                    t.selectEmpmapping = res.data.content[0].value[28].paramList // 人员类型
                    t.selectPayofftype = res.data.content[0].value[29].paramList // 薪资级别
                    t.selectDisabilitylevel = res.data.content[0].value[30].paramList
                    t.selectEmpStatus = res.data.content[0].value[31].paramList
                    t.selectEmpcategory = res.data.content[0].value[32].paramList
                    t.selectContracttype1 = res.data.content[0].value[33].paramList
                    t.selectContractsigntype = res.data.content[0].value[34].paramList
                    t.selectNationtype = res.data.content[0].value[35].paramList
                    t.selectBussector = res.data.content[0].value[36].paramList
                    t.selectPostprop = res.data.content[0].value[37].paramList
                    t.selectComputerlevel = res.data.content[0].value[38].paramList
                    t.selectEnglishlevel = res.data.content[0].value[39].paramList
                    t.selectContracttypezn = res.data.content[0].value[40].paramList
                    t.selectComputerSubsidy = res.data.content[0].value[41].paramList
                    // getDataLevelUserLoginData({
                    //     _mt: 'znjsOrgPostlevelmapping.getSelectValue',
                    // }).then((res1) => {
                    //     if (isSuccess(res1, t)) {
                    //         t.selectEmpcompPostlevel = res1.data.content[0].value
                    //     }
                    // }).catch(() => {
                    //     this.$Modal.error({
                    //         title: this.$t('reminder.err'),
                    //         content: this.$t('reminder.errormessage'),
                    //     })
                    // })
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        nameChange () {
            const t = this
            let pinyin = require('js-pinyin')
            let node = t.formEmpValidate.empName
            pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
            let re = /[^\u4e00-\u9fa5]/;
            const isChinese = str => !re.test(str);
            if (!isChinese(node)) {
                return false;
            } else {
                let entEmppny = pinyin.getFullChars(node)
                //let entEnname = pinyin.getCamelChars(node)
                t.formEmpValidate.empPiny = entEmppny
            }
        },
        //身份证带出
        idChange (val) {
            const t = this
            let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
            let value = t.formEmpValidate.empPopcode
            if (t.formEmpValidate.empPaptype == '01id' && reg.test(value)) {
                t.birthDis = true
                let birth = value.substring(6, 10) + "-" + value.substring(10, 12) + "-" + value.substring(12, 14)
                t.formEmpValidate.empBirthdate = birth
                t.formEmpValidate.empBirthdatereal = birth
                t.formEmpValidate.empBirthdate = new Date(t.formEmpValidate.empBirthdate).format('yyyy-MM-dd')
                console.log(typeof (t.formEmpValidate.empBirthdate), '3335555444888999')

                if (parseInt(value.substr(16, 1)) % 2 == 1) {
                    t.formEmpValidate.empGender = '01male'
                } else {
                    t.formEmpValidate.empGender = '02female'
                }
            } else if (t.formEmpValidate.empPaptype !== '01id') {
                t.birthDis = false
            }
        },
        isEmpAccIsReim (val) {
            //console.log(val)
            const t = this
            val == '0' ? t.isEmpAcc = true : t.isEmpAcc = false
        },
        selectEmpTypeChange (val) {
            //console.log(val,'222222222222222222')
            const t = this
            if (val === '01id') {
                //  t.$refs['formEmpValidate'].fields.forEach((v, i) => {
                //         if (v.prop === 'empPopcode') {
                //             v.validateState = ''
                //             v.validateMessage = ''
                //             v.isRequired = false
                //         }
                //     })
            }
        },

        //    民族
        selectNation () {
            const t = this
            t.$refs.searchNation.getData(this.params)
            t.openNation = true
        },
        closeNation () {
            const t = this
            t.$refs.searchNation.nationName = ''
            t.openNation = false
        },
        inputNation (name, code) {
            const t = this
            t.formEmpValidate.baseNation = name
            t.formEmpValidate.nationPCode = code
        },
        dbNation () {
            const t = this
            t.formEmpValidate.baseNation = ''
            t.formEmpValidate.nationPCode = ''
        },
        //  	银行
        selectBank () {
            const t = this
            t.$refs.searchBank.getData(this.paramsBank)
            t.bankChack = "yinh"
            t.openBank = true
        },
        inputBank (name, id) {
            const t = this
            t.formEmpValidate.empbkNameid = name
            t.formEmpValidate.empbkNameidPid = id
        },
        dbbkBank () {
            const t = this
            t.formEmpValidate.empbkNameid = ''
            t.formEmpValidate.empbkNameidPid = ''
        },
        selectBank1 () {
            const t = this
            t.$refs.searchBank.getData(this.paramsBank)
            t.bankChack = "baoyinh"
            t.openBank = true
        },
        inputBank1 (name, id) {
            const t = this
            t.formEmpValidate.empReimBank = name
            t.formEmpValidate.empReimBankPid = id
        },
        dbbkBank1 () {
            const t = this
            t.formEmpValidate.empReimBank = ''
            t.formEmpValidate.empReimBankPid = ''
        },
        closeBank () {
            const t = this
            t.$refs.searchBank.bankCname = ''
            t.openBank = false
        },
        //  	社保政策
        selectBenefitpolicy (logType, num) {
            const t = this
            t.logType = logType
            if (num === '1') {
                t.paramsSbPolicy.sihfpcyType = '01social'
            } else if (num === '2') {
                t.paramsSbPolicy.sihfpcyType = '02hfund'
            }
            t.$refs.searchSbPolicy.getData(this.paramsSbPolicy)
            t.openSbPolicy = true
        },
        inputSbPolicy (name, id) {
            const t = this
            t.formEmpValidate.sbBenefitpolicy = name
            t.formEmpValidate.sbBenefitpolicyPid = id
        },
        dbsbBenefitpolicy () {
            const t = this
            t.formEmpValidate.sbBenefitpolicy = ''
            t.formEmpValidate.sbBenefitpolicyPid = ''
        },
        inputBenefitpolicy (name, id) {
            const t = this
            t.formEmpValidate.sbBenefitpolicy = name
            t.formEmpValidate.sbBenefitpolicyPid = id
        },
        dbsbHfundpolicy () {
            const t = this
            t.formEmpValidate.sbHfundpolicy = ''
            t.formEmpValidate.sbHfundpolicyPid = ''
        },
        inputHfundpolicy (name, id) {
            const t = this
            t.formEmpValidate.sbHfundpolicy = name
            t.formEmpValidate.sbHfundpolicyPid = id
        },
        closeSbPolicy () {
            const t = this
            t.$refs.searchSbPolicy.sihfpcyCn = ''
            t.openSbPolicy = false
        },
        selectHrbp () {
            const t = this
             if (t.formEmpValidate.empappUnitidPid === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请先选择任职公司',
                })
            } else{

                t.showHrbp = true
                t.$refs.searchHrbp.getData(t.paramsHrbp,t.formEmpValidate.empappUnitidPid)
            }
        },
        closeHrbp () {
            const t = this
            t.showHrbp = false
        },
        inputHrbp (name, id) {
            const t = this
            t.formEmpValidate.empkeyHrbp = name
            t.formEmpValidate.empkeyHrbpPid = id
        },
        dbHrbp () {
            const t = this
            t.formEmpValidate.empkeyHrbp = ''
            t.formEmpValidate.empkeyHrbpPid = ''
        },
        selectHzdjr () {
            const t = this
            if (t.formEmpValidate.empappUnitidPid === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请先选择任职公司',
                })
            } else{

                t.showHzdjr = true
                t.$refs.searchHzdjr.getData(t.paramsHzdjr,t.formEmpValidate.empappUnitidPid)
            }
        },
        closeHzdjr () {
            const t = this
            t.showHzdjr = false
        },
        inputHzdjr (name, id) {
            const t = this
            t.formEmpValidate.empkeyHzdjr = name
            t.formEmpValidate.empkeyHzdjrPid = id
        },
        dbHzdjr () {
            const t = this
            t.formEmpValidate.empkeyHzdjr = ''
            t.formEmpValidate.empkeyHzdjrPid = ''
        },
        closeLegalety () {
            const t = this
            t.showLegalety = false
        },
        inputCountry (name, id) {

            const t = this
            t.formEmpValidate.empedcContid = name
            t.formEmpValidate.empedcContidPid = id
        },
        inputCountry2 (name, id) {
            const t = this
            t.formEmpValidate.empedcContid1 = name
            t.formEmpValidate.empedcContidPid1 = id
        },
        inputCountry1 (name, id) {

            const t = this
            t.formEmpValidate.empCitizen = name
            t.formEmpValidate.empCitizenPid = id
        },
        selectCountry () {

            const t = this
            t.countryName = "guojia"
            t.showCountry = true

        },
        selectCountry1 () {

            const t = this
            t.countryName = "guoji"
            t.showCountry = true

        },
        selectCountry2 () {

            const t = this
            t.countryName = "guojif"
            t.showCountry = true

        },
        closeCountry () {
            const t = this
            t.showCountry = false
        },
        dbCountry () {
            const t = this
            t.formEmpValidate.empedcContid = ''
            t.formEmpValidate.empedcContidPid = ''
        },
        dbCountry2 () {
            const t = this
            t.formEmpValidate.empedcContid1 = ''
            t.formEmpValidate.empedcContidPid1 = ''
        },
        dbCountry1 () {
            const t = this
            t.formEmpValidate.empCitizen = ''
            t.formEmpValidate.empCitizenPid = ''
        },
        //  	雇佣公司
        selectHCompany () {
            const t = this
            t.$refs.searchHCompany.getData(this.paramsHCompany)
            t.openHCompany = true
        },
        closeHCompany () {
            const t = this
            t.$refs.searchHCompany.unitCode = ''
            t.openHCompany = false
        },
        inputHCompany (name, id) {
            const t = this
            t.formEmpValidate.empappUnitid = name
            t.formEmpValidate.empappUnitidPid = id
        },
        dbHCompany () {
            const t = this
            t.formEmpValidate.empappUnitid = ''
            t.formEmpValidate.empappUnitidPid = ''
            t.dbDept()
            t.dbLegalety()
        },
        //  	基准岗位
        searchBncs () {
            const t = this
            t.$refs.searchBnchClo.getData(this.paramsBnchClo)
            t.$refs.searchBnchClo.changTagData(t.formEmpValidate.empcompBnchpost, t.formEmpValidate.empcompBnchpostDis)
            t.searchBnc = true
        },
        closeUpBn () {
            const t = this
            t.$refs.searchBnchClo.unitCode = ''
            t.searchBnc = false
        },
        inputBnchClo (arr, arr1) {
            const t = this
            t.formEmpValidate.empcompBnchpost = arr.join()
            t.formEmpValidate.empcompBnchpostDis = arr1.join()
            t.searchBnc = false
        },
        //  	部门
        selectDept () {
            const t = this
            if (t.formEmpValidate.empappUnitidPid === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请先选择任职公司',
                })
            } else {
                const paramsDept = deepCopy(t.paramsDept)
                t.$refs.searchDept.getData(paramsDept, t.formEmpValidate.empappUnitidPid)
                t.openDept = true
            }
        },
        closeDept () {
            const t = this
            t.$refs.searchDept.unitCode = ''
            t.openDept = false
        },
        inputDept (name, id) {
            const t = this
            t.formEmpValidate.empapDeptid = name
            t.formEmpValidate.empapDeptidPid = id
            //  		localStorage.setItem('postUNIT', 'unit' + id)
        },
        dbDept () {
            const t = this
            t.formEmpValidate.empapDeptid = ''
            t.formEmpValidate.empapDeptidPid = ''
            t.dbPost()
        },
        //  	岗位
        selectPost () {
            const t = this
            if (t.formEmpValidate.empapDeptidPid === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_employee.empmaster.empPostDis'),
                })
            } else {
                const paramsPost = deepCopy(t.paramsPost)
                //	    		paramsPost.postUnit = 'unit' + t.formEmpValidate.compDeptPid
                t.$refs.searchPost.getData(paramsPost, t.formEmpValidate.empapDeptidPid)
                t.openPost = true
            }
        },
        closePost () {
            const t = this
            t.$refs.searchPost.unptDeptid = ''
            t.openPost = false
        },
        inputPost (name, id, row) {
            const t = this
            t.formEmpValidate.empapPostid = name
            t.formEmpValidate.empapPostidPid = id
            if (row) {
                t.formEmpValidate.empapPtodid = row.unptPtodidDis
                t.formEmpValidate.postBusridDis = row.unptBusridDis
                t.formEmpValidate.postBumdidDis = row.unptBumdidDis
                t.formEmpValidate.empperDutyid = row.unptDutyidDis
                t.formEmpValidate.empperRankid = row.unptRankidDis
                t.formEmpValidate.postRankinfoDis = row.unptRankinfoDis
            }
        },
        dbPost () {
            const t = this
            t.formEmpValidate.empapPostid = ''
            t.formEmpValidate.empapPostidPid = ''
            t.dbCostcenter()
            t.emptyOut()
        },
        emptyOut () {
            const t = this
            t.formEmpValidate.empapPtodid = ''
            t.formEmpValidate.postBusridDis = ''
            t.formEmpValidate.postBumdidDis = ''
            t.formEmpValidate.empperDutyid = ''
            t.formEmpValidate.empperRankid = ''
            t.formEmpValidate.postRankinfoDis = ''
        },
        //  	成本中心
        selectCostcenter () {
            const t = this
            t.$refs.searchOrgcostcenter.getData(this.paramsOrgcostcenter)
            t.openOrgcostcenter = true
        },
        closeOrgcostcenter () {
            const t = this
            t.$refs.searchOrgcostcenter.costCode = ''
            t.openOrgcostcenter = false
        },
        changeinput (name, id) {
            const t = this
            t.formEmpValidate.empappCotcid = name
            t.formEmpValidate.empappCotcidPid = id
        },
        dbCostcenter () {
            const t = this
            t.formEmpValidate.empappCotcid = ''
            t.formEmpValidate.empappCotcidPid = ''
        },
        //法律实体
        selectLegalety (logType) {
            const t = this
            t.logType = logType
            if (t.formEmpValidate.empappUnitidPid === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请先选择任职公司',
                })
            } else {
                const paramsLegalety = deepCopy(t.paramsLegalety)
                t.$refs.searchLegalety.getData(paramsLegalety, t.formEmpValidate.empappUnitidPid)
                t.showLegalety = true
            }
        },
        inputLegalety (name, id) {
            const t = this

            t.formEmpValidate.empconFlstid = name
            t.formEmpValidate.empconFlstidPid = id
        },
        dbLegalety () {
            const t = this
            t.formEmpValidate.empconFlstid = ''
            t.formEmpValidate.empconFlstidPid = ''
        },
        //  	雇佣、工作地点
        //					雇佣
        selectHirelocation (logType) {
            const t = this
            t.logType = logType
            t.cityType = '02city'
            t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city')
            t.openHirelocation = true
        },
        //  	工作
        selectWorklocation (logType) {
            const t = this
            t.logType = logType
            t.cityType = '02city'
            t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city')
            t.openHirelocation = true
        },


        //  	社保
        selectBenefitlocation (logType) {
            const t = this
            t.logType = logType
            t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city\',\'03county')
            t.openHirelocation = true
        },
        //  	公积金
        selectHfundlocatio (logType) {
            const t = this
            t.logType = logType
            t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city\',\'03county')
            t.openHirelocation = true
        },
        //  	居住省份
        selectProvince (logType) {
            const t = this
            t.logType = logType
            t.cityType = '01prov'
            t.$refs.searchHirelocation.getData(this.paramsHirelocation, '01prov')
            t.openHirelocation = true
        },
        //  	居住城市
        selectCity (logType) {
            const t = this
            t.logType = logType
            t.cityType = '02city'
            t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city')
            t.openHirelocation = true
        },
        //  	户籍省份
        selectAddrProvince (logType) {
            const t = this
            t.logType = logType
            t.cityType = '01prov'
            t.$refs.searchHirelocation.getData(this.paramsHirelocation, '01prov')
            t.openHirelocation = true
        },
        //  	户籍城市
        selectAddrCity (logType) {
            const t = this
            t.logType = logType
            t.cityType = '02city'
            t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city')
            t.openHirelocation = true
        },
        closeHirelocation () {
            const t = this
            t.$refs.searchHirelocation.cityName = ''
            t.$refs.searchHirelocation.theCityType = ''
            t.openHirelocation = false
        },
        inputHirelocation (name, id) {

            const t = this
            t.formEmpValidate.empappEmpcity = name
            t.formEmpValidate.empappEmpcityPid = id
        },
        dbHirelocation () {
            const t = this
            t.formEmpValidate.empappEmpcity = ''
            t.formEmpValidate.empappEmpcityPid = ''
        },
        inputWorklocation (name, id) {
            const t = this
            t.formEmpValidate.empappWkcity = name
            t.formEmpValidate.empappWkcityPid = id
        },
        dbWorklocation () {
            const t = this
            t.formEmpValidate.empappWkcity = ''
            t.formEmpValidate.empappWkcityPid = ''
        },
        inputBenefitlocation (name, id) {
            const t = this
            t.formEmpValidate.sbBenefitlocation = name
            t.formEmpValidate.sbBenefitlocationPid = id
        },
        dbsbBenefitlocation () {
            const t = this
            t.formEmpValidate.sbBenefitlocation = ''
            t.formEmpValidate.sbBenefitlocationPid = ''
        },
        inputHfundlocatio (name, id) {
            const t = this
            t.formEmpValidate.sbHfundlocatio = name
            t.formEmpValidate.sbHfundlocatioPid = id
        },
        dbsbHfundlocatio () {
            const t = this
            t.formEmpValidate.sbHfundlocatio = ''
            t.formEmpValidate.sbHfundlocatioPid = ''
        },
        inputProvince (name, id) {
            const t = this
            t.formEmpValidate.addProvince = name
            t.formEmpValidate.addProvincePid = id
        },
        dbaddProvince () {
            const t = this
            t.formEmpValidate.addProvince = ''
            t.formEmpValidate.addProvincePid = ''
        },
        inputCity (name, id) {
            const t = this
            t.formEmpValidate.addCity = name
            t.formEmpValidate.addCityPid = id
        },
        dbaddCity () {
            const t = this
            t.formEmpValidate.addCity = ''
            t.formEmpValidate.addCityPid = ''
        },
        inputrProvince (name, id) {
            const t = this
            t.formEmpValidate.addrProvince = name
            t.formEmpValidate.addrProvincePid = id
        },
        dbrProvince () {
            const t = this
            t.formEmpValidate.addrProvince = ''
            t.formEmpValidate.addrProvincePid = ''
        },
        inputrCity (name, id) {
            const t = this
            t.formEmpValidate.addrCity = name
            t.formEmpValidate.addrCityPid = id
        },
        dbrCity () {
            const t = this
            t.formEmpValidate.addrCity = ''
            t.formEmpValidate.addrCityPid = ''
        },
        //  	业务上级经理
        selectBuspmp (logType) {
            const t = this
            t.logType = logType
            t.$refs.searchManager.getData(this.paramsManger)
            t.openManger = true
        },
        //  	功能经理
        selectFunpmp (logType) {
            const t = this
            t.logType = logType
            t.$refs.searchManager.getData(this.paramsManger)
            t.openManger = true
        },
        //  	HR顾问
        selectCompHR (logType) {
            const t = this
            t.logType = logType
            t.$refs.searchManager.getData(this.paramsManger)
            t.openManger = true
        },
        closeManger () {
            const t = this
            t.$refs.searchManager.empCname = ''
            t.openManger = false
        },
        inputManger (name, id) {
            const t = this
            t.formEmpValidate.empappZpid = name
            t.formEmpValidate.empappZpidPid = id
        },
        dbBuspmp () {
            const t = this
            t.formEmpValidate.empappZpid = ''
            t.formEmpValidate.empappZpidPid = ''
        },
        inputGManger (name, id) {
            const t = this
            t.formEmpValidate.compFunpmp = name
            t.formEmpValidate.compFunpmpPid = id
        },
        dbFunpmp () {
            const t = this
            t.formEmpValidate.compFunpmp = ''
            t.formEmpValidate.compFunpmpPid = ''
        },
        inputCompHR (name, id) {
            const t = this
            t.formEmpValidate.compHr = name
            t.formEmpValidate.comPHRPid = id
        },
        dbCompHR () {
            const t = this
            t.formEmpValidate.compHr = ''
            t.formEmpValidate.comPHRPid = ''
        },
        render1 () {
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
                                //t.cropedImgDis = key + ',' + res.data[key]
                                t.formEmpValidate.empHead = key + ',' + res.data[key]
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

        selectctContracttype (value) {
            if (value === '02nonfixedperiod') {
                this.ContractperiodShow = true
                this.formEmpValidate.ctContractperiod = '0'
                this.formEmpValidate.ctContractedate = '9999-12-31'
            } else {
                this.ContractperiodShow = false
                this.formEmpValidate.ctContractperiod = ''
                this.formEmpValidate.ctContractedate = ''
            }
        },
        selectctCtProbation (val) {
            const t = this
            let date = t.formEmpValidate.empconPsdate
            let months = parseInt(val)
            if (val !== '' && months !== NaN) {
                let enDates = new Date(date)
                let m = enDates.getMonth() + 1
                let qLastMonth = m + months
                enDates.setMonth(qLastMonth)
                let y = enDates.getFullYear()
                let mm = enDates.getMonth()
                let day = enDates.getDate() - 1
                let days = y + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (day < 10 ? '0' + day : day)
                if (days) {
                    t.formEmpValidate.empconPedate = days
                }
            } else {
                t.formEmpValidate.empconPedate = ''
            }
        },
        /*
      * 弹出选择
      * */
        selectOpen (type) {
            const t = this
            t.selectType = type
            t.dataParame = {}
            switch (type) {
                case 'empcompBnchpost':
                    t.modiaContent = 'org-benchpost-std'
                    t.showModal = true
                    break
                case 'empctMaincomp':
                    t.modiaContent = 'org-conComp-std'
                    if (t.formEmpValidate.compHirecompanyPid) {
                        t.dataParame = {
                            concompUnit: t.formEmpValidate.compHirecompanyPid,
                        }
                        t.showModal = true
                    } else {
                        t.$Modal.warning({
                            title: this.$t('reminder.remind'),
                            content: '请先选择任职公司',
                        })
                    }
                    break
                case 'empcompPostseq':
                    t.modiaContent = 'org-Postseq-std'
                    t.showModal = true
                    break
                case 'compBuspmp':
                    t.modiaContent = 'org-Postseq-std'
                    t.showModal = true
                    break
            }
        },
        clearData (type) {
            const t = this
            switch (type) {
                case 'empcompBnchpost':
                    t.formEmpValidate.empcompBnchpostDis = ''
                    t.formEmpValidate.empcompBnchpost = ''
                    break
                case 'empctMaincomp':
                    t.formEmpValidate.empctMaincompDis = ''
                    t.formEmpValidate.empctMaincomp = ''
                    break
                case 'empcompPostseq':
                    t.formEmpValidate.empcompPostseqDis = ''
                    t.formEmpValidate.empcompPostseq = ''
                    break
            }
        },
        closeModal () {
            const t = this
            t.showModal = false
        },
        changeinput2 (row, type) {
            const t = this
            switch (type) {
                case 'org-benchpost-std':
                    t.formEmpValidate.empcompBnchpostDis = row.postbsName
                    t.formEmpValidate.empcompBnchpost = row.id
                    break
                case 'org-conComp-std':
                    t.formEmpValidate.empctMaincompDis = row.concompName
                    t.formEmpValidate.empctMaincomp = row.id
                    break
                case 'org-Postseq-std':
                    t.formEmpValidate.empcompPostseqDis = row.seqName
                    t.formEmpValidate.empcompPostseq = row.id
                    break
            }
        },
        getShortPYAccount (cname) {
            const t = this
            getDataLevelUserLoginData({
                // _mt: 'xianBasePubTools.getPinYinByName',
                _mt: 'znjsBasePubTools.getShortPYAccount',
                name: cname,
            }).then((res) => {
                const data = JSON.parse(res.data.content[0].value)
                t.formEmpValidate.empSysaccountOa = data.Account
            }).catch(() => {
                // this.$Modal.warning({
                //   title: this.$t('reminder.remind'),
                //   content: '请输入正确得姓名',
                // })
            })
        },
    },
    watch: {
        /// 01id   baseGender baseBirthdate
        'formEmpValidate.idsNo': {
            handler (newVal, oldVal) {
                let idcard = newVal
                let date = newVal
                if (this.formEmpValidate.idsType === '01id') {
                    if (idcard.length === 18) {
                        if (idcard.substr(16, 1) % 2 === 1) {
                            this.formEmpValidate.baseGender = '01male'
                        } else {
                            this.formEmpValidate.baseGender = '02female'
                        }
                        this.formEmpValidate.baseBirthdate = date.substring(6, 14)
                        this.formEmpValidate.empSysaccpwdOa = date.substring(12, 18)
                    }
                }
            },
        },
        'formEmpValidate.baseCname': {
            handler (newVal, oldVal) {
                if (newVal) {
                    this.getShortPYAccount(newVal)
                }
            },
        },
    },
}
</script>
<style lang="scss" scoped>
//@import "../../../sass/updateAndAdd";
@import "~@/sass/mainChildUpdate.scss";
.ivu-form a {
    display: block;
    color: #000000;
    margin: 10px 0;
    padding-left: 10px;
    height: 26px;
    line-height: 26px;
    //border-bottom: #EEEEEE solid 1px;
    padding-bottom: 5px;
    font-weight: bold;
    //background: #d3e8ff;
    font-size: 14px;
}
.ivu-menu-item a {
    text-align: center !important;
}
.ivu-menu-vertical.ivu-menu-light:after {
    background: none;
}
.ivu-form a::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 16px;
    background: rgba(9, 161, 251, 1);
    position: relative;
    top: 3px;
    margin-right: 10px;
}
.modal .box .header{
    width: 70px;
    height: 70px;
}
.cover .box {
    .meau-left {
        padding: 0;
        width: 200px;
    }
    .right {
        width: 900px;
    }
}
.headImg {
    margin: 20px 0;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal .box .meau-left .ivu-menu-light{
    height: auto;
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
.menuInfo {
   // margin-top: 40px;
}
.menuInfo .ivu-menu a:active {
    color: #318ef0;
}
// .menuInfo .ivu-menu-item:hover {
//     background: #ffffff;
//     /*color: #318EF0;*/
// }
.menuInfo .ivu-menu-item a:hover {
    color: #318ef0;
}
.menuInfo .ivu-menu-item {
    padding: 0;
}
// .menuInfo /deep/ .ivu-menu-item{
//     height:60px;
//     padding:10px 15px;
//     display:flex;
//     justify-content: center;
//     align-items: center;
// }
.menuInfo a {
    display: block;
    font-size: 14px;
    color: #000000;
    font-family: "微软雅黑";
    width: 100%;
    padding: 14px 24px;
    // height: 40px;
    // padding-right: 15px;
    text-align: left;
    // padding-top: 15px;
    // padding-left: 20px;
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
.modal .box .header-cover{
    width: 70px;
    height: 70px;
}
.header-cover {
    display: none;
    top: 16px;
    right: 14px;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 50px;
    height: 50px;
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
    height: 70px;
    width: 70px;
    border-radius: 50%;
    overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.tab-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    // height: 50px;
}
.topMar {
    padding-left: 15px;
    max-height: 478px;
    overflow-y: auto;
    margin-right: 20px;
    margin-bottom: 20px;
}
.btnAlign {
    text-align: end;
    margin-right: 59px;
    button {
        margin-left: 8px;
    }
}
/deep/ .ivu-radio-wrapper-checked {
    background: rgba(45, 140, 240, 1);
    color: #fff;
}
/deep/ .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
    color: #fff;
}
/deep/ .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: #fff;
}
/deep/ .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    width: 4px !important;
    height: 70%;
    left: 0;
    top: 8px !important;
}
/deep/ .ivu-menu-vertical.ivu-menu-light:after {
    background: #fff !important;
}
/deep/ .ivu-menu-light {
    background: #f5f5f5;
}
/deep/
    .ivu-menu-light.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: #fff;
}
/deep/ .ivu-input-icon {
    cursor: pointer;
}
</style>
