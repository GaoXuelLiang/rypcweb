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
                             width="150"
                             height="150">
                    </div>
                </div>
            </div>
            <div class="menuInfo">
                <Menu active-name="baseInfo"
                      width="auto">
                    <MenuItem name="baseInfo">
                    <a href="#baseInfo"
                       @click="newColor(this)">{{$t('lang_employee.empmaster.title1')}}</a>
                    </MenuItem>
                    <MenuItem name="companyInfo">
                    <a href="#companyInfo"
                       @click="newColor(this)">{{$t('lang_employee.empmaster.title2')}}</a>
                    </MenuItem>
                    <MenuItem name="contractInfo">
                    <a href="#contractInfo">{{$t('lang_employee.empmaster.title3')}}</a>
                    </MenuItem>
                    <MenuItem name="educationInfo">
                    <a href="#educationInfo">{{$t('lang_employee.empmaster.title5')}}</a>
                    </MenuItem>
                    <MenuItem name="addressInfo">
                    <a href="#addressInfo">{{$t('lang_employee.empmaster.title6')}}</a>
                    </MenuItem>
                </Menu>
            </div>
            </Col>

            <Col span="19"
                 style="border-radius:0 10px 10px 0;">
            <Row>
                <div class="title"
                     style="padding-top: 20px;padding-bottom: 20px;height: 50px;">
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
                    class="topMar"
                    >
                    <Form ref="formEmpValidate"
                          :rules="ruleValidate"
                          :model="formEmpValidate"
                          :label-width="135">
                        <a name="baseInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{$t('lang_employee.baseInfo.title')}}
                        </a>
                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseCname')"
                                      prop="baseCname">
                                <Input :placeholder="$t('lang_employee.baseInfo.baseCnameDis')"
                                       v-model="formEmpValidate.baseCname" />
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.idsType')"
                                      prop="idsType">
                                <Select v-model="formEmpValidate.idsType">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectIdsType"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.idsNo')"
                                      prop="idsNo">
                                <Input :placeholder="$t('lang_employee.baseInfo.idsNoDis')"
                                       v-model="formEmpValidate.idsNo" />
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.baseBirthdate')"
                                      prop="baseBirthdate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.baseInfo.baseBirthdateDis')"
                                            v-model="formEmpValidate.baseBirthdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseGender')"
                                      prop="baseGender">
                                <Select v-model="formEmpValidate.baseGender">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectGender"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.baseMarriage')"
                                      prop="baseMarriage">
                                <Select v-model="formEmpValidate.baseMarriage">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectMarriage"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>

                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseNation')"
                                      prop="baseNation">
                                <span @dblclick="dbNation">
                                    <Input :placeholder="$t('lang_employee.baseInfo.baseNationDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.baseNation"
                                           @on-click="selectNation" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.basePolitical')"
                                      prop="basePolitical">
                                <Select v-model="formEmpValidate.basePolitical">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectPolitical"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseTechnicaltitle')"
                                      prop="">
                                <Select v-model="formEmpValidate.baseTechnicaltitle">
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
                                       v-model="formEmpValidate.baseTechspec" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.baseInfo.baseFirstworkdate')"
                                      prop="baseFirstworkdate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.baseInfo.baseFirstworkdateDis')"
                                            v-model="formEmpValidate.baseFirstworkdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.baseInfo.baseTechdate')">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.baseInfo.baseTechdateDis')"
                                            v-model="formEmpValidate.baseTechdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem label="系统账号"
                                      prop="empSysaccountOa">
                                <Input placeholder="请输入系统账号"
                                       v-model="formEmpValidate.empSysaccountOa" />
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="账号密码"
                                      prop="empSysaccpwdOa">
                                <Input placeholder="请输入账号密码"
                                       type="password"
                                       v-model="formEmpValidate.empSysaccpwdOa" />
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem label="排序号"
                                      prop="empOrderOa">
                                <Input placeholder="请输入排序号"
                                       v-model="formEmpValidate.empOrderOa" />
                            </FormItem>
                            </Col>
                        </Row>
                        <a name="companyInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{$t('lang_employee.companyInfo.title')}}
                        </a>
                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.companyInfo.pkiWorkno')"
                                      prop="pkiWorkno">
                                <Input :placeholder="$t('lang_employee.companyInfo.pkiWorknoDis')"
                                       v-model="formEmpValidate.pkiWorkno" />
                            </FormItem>
                            </Col>
                            <!--      						<Col span="11" offset="1">-->
                            <!--      							<FormItem :label="$t('lang_employee.companyInfo.pkiEmptype')" prop="pkiEmptype">-->
                            <!--      								<Select v-model="formEmpValidate.pkiEmptype">-->
                            <!--      									<Option :value="item.paramCode" v-for="(item,index) in selectEmptype" :key="index">{{item.paramInfoCn}}</Option>-->
                            <!--      								</Select>-->
                            <!--      							</FormItem>-->
                            <!--      						</Col>-->
                            <Col span="23">
                            <FormItem label="基准岗位"
                                      prop="empcompBnchpostDis">
                                <span @dblclick="clearData('empcompBnchpost')">
                                    <Input placeholder="基准岗位"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empcompBnchpostDis"
                                           @on-click="searchBncs" />
                                </span>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.companyInfo.compHirecompany')"
                                      prop="compHirecompany">
                                <span @dblclick="dbHCompany">
                                    <Input :placeholder="$t('lang_employee.companyInfo.compHirecompanyDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.compHirecompany"
                                           @on-click="selectHCompany" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.companyInfo.compDept')"
                                      prop="compDept">
                                <span @dblclick="dbDept">
                                    <Input :placeholder="$t('lang_employee.companyInfo.compDeptDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.compDept"
                                           @on-click="selectDept" />
                                </span>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.companyInfo.compPost')"
                                      prop="compPost">
                                <span @dblclick="dbPost">
                                    <Input :placeholder="$t('lang_employee.companyInfo.compPostDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.compPost"
                                           @on-click="selectPost" />
                                </span>
                            </FormItem>
                            </Col>
                            <!--      						<Col span="11" offset="1">-->
                            <!--      							<FormItem :label="$t('lang_employee.companyInfo.compCostcenter')" prop="compCostcenter">-->
                            <!--      								<span @dblclick="dbCostcenter">-->
                            <!--      								<Input :placeholder="$t('lang_employee.companyInfo.compCostcenterDis')"  icon="ios-search" :readonly="true" v-model="formEmpValidate.compCostcenter" @on-click="selectCostcenter"/>-->
                            <!--      								</span>-->
                            <!--      							</FormItem>-->
                            <!--      						</Col>-->
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.companyInfo.compHirelocation')"
                                      prop="">
                                <span @dblclick="dbHirelocation">
                                    <Input :placeholder="$t('lang_employee.companyInfo.compHirelocationDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.compHirelocation"
                                           @on-click="selectHirelocation($t('lang_employee.searchTableTitle.hirelocation'))" />
                                </span>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.companyInfo.compWorklocation')"
                                      prop="">
                                <span @dblclick="dbWorklocation">
                                    <Input :placeholder="$t('lang_employee.companyInfo.compWorklocationDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.compWorklocation"
                                           @on-click="selectWorklocation($t('lang_employee.searchTableTitle.worklocation'))" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="汇报人"
                                      prop="compBuspmp">
                                <span @dblclick="dbBuspmp">
                                    <Input placeholder="汇报人"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.compBuspmp"
                                           @on-click="selectBuspmp($t('lang_employee.searchTableTitle.manger'))" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- <Col span="11" >
                    <FormItem label="汇报人" prop="compBuspmp">
                        <span @dblclick="clearData('compBuspmp')">
                        <Input placeholder="请选择汇报人"  icon="ios-search" :readonly="true" v-model="formEmpValidate.compBuspmpDis" @on-click="selectOpen('compBuspmp')"/>
                        </span>
                    </FormItem>
                  </Col>-->
                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.companyInfo.compEntrydate')"
                                      prop="compEntrydate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.companyInfo.compEntrydateDis')"
                                            v-model="formEmpValidate.compEntrydate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <!--      						<Col span="11" offset="1">-->
                            <!--      							<FormItem :label="$t('lang_employee.companyInfo.compServicedate')" prop="compServicedate">-->
                            <!--      								<DatePicker type="date" :placeholder="$t('lang_employee.companyInfo.compServicedateDis')" v-model="formEmpValidate.compServicedate" style="width: 100%"></DatePicker>-->
                            <!--      							</FormItem>-->
                            <!--      						</Col>-->
                            <Col span="11"
                                 offset="1">
                            <FormItem label="职位级别"
                                      prop="empcompPostlevel">
                                <Select v-model="formEmpValidate.empcompPostlevel">
                                    <Option :value="item.positionLevel"
                                            v-for="(item,index) in selectEmpcompPostlevel"
                                            :key="index">{{item.positionLevel}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <!--      						<Col span="11">-->
                            <!--      							<FormItem :label="$t('lang_employee.companyInfo.compCertificatedate')" prop="compCertificatedate">-->
                            <!--      								<DatePicker type="date" :placeholder="$t('lang_employee.companyInfo.compCertificatedateDis')" v-model="formEmpValidate.compCertificatedate" style="width: 100%"></DatePicker>-->
                            <!--      							</FormItem>-->
                            <!--      						</Col>-->
                            <!--      						<Col span="11">-->
                            <!--      							<FormItem label="人资事项审核人" prop="compHr">-->
                            <!--      								<span @dblclick="dbCompHR">-->
                            <!--      								<Input placeholder="人资事项审核人" v-model="formEmpValidate.compHr"  icon="ios-search" :readonly="true" @on-click="selectCompHR($t('lang_employee.searchTableTitle.compHR'))"/>-->
                            <!--      								</span>-->
                            <!--      							</FormItem>-->
                            <!--      						</Col>-->
                            <Col span="11">
                            <FormItem label="条线">
                                <span @dblclick="clearData('empcompPostseq')">
                                    <Input placeholder="条线"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empcompPostseqDis"
                                           @on-click="selectOpen('empcompPostseq')" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="编制类别"
                                      prop="empkiEstablishment">
                                <Select v-model="formEmpValidate.empkiEstablishment">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEstablishmenttype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11">
                            <FormItem label="管培生届数"
                                      prop="">
                                <DatePicker v-model="formEmpValidate.empkiTraineeounds"
                                            style="width:100%"
                                            type="year"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="人员类型"
                                      prop="empkiEmpmapping">
                                <Select v-model="formEmpValidate.empkiEmpmapping">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEmpmapping"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11">
                            <FormItem label="薪制类别"
                                      prop="empkiPaystyle">
                                <Select v-model="formEmpValidate.empkiPaystyle">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectPayofftype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="是否享受异地派遣福利"
                                      prop="empcompTravelaward">
                                <RadioGroup v-model="formEmpValidate.empcompTravelaward" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="11">
                            <FormItem label="是否享受异地引进福利"
                                      prop="empcompImportaward">
                                <RadioGroup v-model="formEmpValidate.empcompImportaward" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
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
                            <Col span="11">
                            <FormItem label="是否退休返聘"
                                      prop="empctIsrehire">
                                <RadioGroup v-model="formEmpValidate.empctIsrehire" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="合同类别"
                                      prop="empctCategory">
                                <Select v-model="formEmpValidate.empctCategory">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in seleempctCategory"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>

                            <Col span="11">
                            <FormItem label="合同主体公司"
                                      prop="empctMaincomp">
                                <span @dblclick="clearData('empctMaincomp')">
                                    <Input placeholder="合同主体公司"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.empctMaincompDis"
                                           @on-click="selectOpen('empctMaincomp')" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="签订类型"
                                      prop="empctSigntype">
                                <Select v-model="formEmpValidate.empctSigntype">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectSigntype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11">
                            <FormItem label="合同类型"
                                      prop="ctContracttype">
                                <Select v-model="formEmpValidate.ctContracttype"
                                        @on-change="selectctContracttype">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContracttype"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="合同期限"
                                      prop="ctContractperiod">
                                <Select v-model="formEmpValidate.ctContractperiod"
                                        :disabled="ContractperiodShow">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContractperiod"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11">
                            <FormItem label="合同开始日期"
                                      prop="ctContractsdate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.contractInfo.ctContractsdateDis')"
                                            v-model="formEmpValidate.ctContractsdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="合同到期日期"
                                      prop="ctContractedate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.contractInfo.ctContractedateDis')"
                                            :disabled="ContractperiodShow"
                                            v-model="formEmpValidate.ctContractedate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11">
                            <FormItem label="合同到期通知时间(天数)">
                                <Select v-model="formEmpValidate.ctContractprom">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectContractprom"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="签署日期"
                                      prop="ctSigndate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.contractInfo.ctSigndateDis')"
                                            v-model="formEmpValidate.ctSigndate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11">
                            <FormItem label="保密协议"
                                      prop="ctConfidential">
                                <Select v-model="formEmpValidate.ctConfidential">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectConfidential"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="合同工作时间"
                                      prop="ctContractworktime">
                                <Select v-model="formEmpValidate.ctContractworktime">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectctContractworktime"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>

                            <Col span="11">
                            <FormItem label="试用期限"
                                      prop="ctProbation">
                                <Select v-model="formEmpValidate.ctProbation"
                                        @on-change="selectctCtProbation">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectctProbation"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1"
                                 v-if="ctProbationdateShow">
                            <FormItem label="试用到期时间">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.contractInfo.ctProbationdateDis')"
                                            disabled
                                            v-model="formEmpValidate.ctProbationdate"
                                            style="width: 100%"></DatePicker>
                                <!--<Input placeholder="试用到期时间..." />-->
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 v-if="ctProbationdateShow">
                            <FormItem label="试用到期通知时间(天数)">
                                <Select v-model="formEmpValidate.ctProbationprom"
                                        disabled>
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectProbationprom"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1"
                                 v-if="!ctProbationdateShow">
                            <FormItem label="试用到期时间"
                                      prop="ctProbationdate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.contractInfo.ctProbationdateDis')"
                                            v-model="formEmpValidate.ctProbationdate"
                                            style="width: 100%"></DatePicker>
                                <!--<Input placeholder="试用到期时间..." />-->
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 v-if="!ctProbationdateShow">
                            <FormItem label="试用到期通知时间(天数)"
                                      prop="ctProbationprom">
                                <Select v-model="formEmpValidate.ctProbationprom">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectProbationprom"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!--<Col span="11">-->
                            <!--<FormItem label="合同工作时间" prop="empctContractworktime">-->
                            <!--<Select v-model="formEmpValidate.empctContractworktime">-->
                            <!--<Option :value="item.paramCode" v-for="(item,index) in selectWorktimetype" :key="index">{{item.paramInfoCn}}</Option>-->
                            <!--</Select>-->
                            <!--</FormItem>-->
                            <!--</Col>-->

                        </Row>
                        <a name="educationInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{$t('lang_employee.educationInfo.title')}}
                        </a>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.educationInfo.edSdate')"
                                      prop="edSdate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.educationInfo.edSdateDis')"
                                            v-model="formEmpValidate.edSdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.educationInfo.edEdate')"
                                      prop="edEdate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_employee.educationInfo.edEdateDis')"
                                            v-model="formEmpValidate.edEdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem label="学历"
                                      prop="edQualifications">
                                <Select v-model="formEmpValidate.edQualifications">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="学位"
                                      prop="edDegree">
                                <Select v-model="formEmpValidate.edDegree">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel1"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.educationInfo.edCuntry')"
                                      prop="edCuntry">
                                <Select v-model="formEmpValidate.edCuntry">
                                    <Option :value="item.id"
                                            v-for="(item,index) in selectEdCuntry"
                                            :key="index">{{item.countryName}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.educationInfo.edSchool')"
                                      prop="edSchool">
                                <Input :placeholder="$t('lang_employee.educationInfo.edSchoolDis')"
                                       v-model="formEmpValidate.edSchool" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.educationInfo.edSpecialty')">
                                <Input :placeholder="$t('lang_employee.educationInfo.edSpecialtyDis')"
                                       v-model="formEmpValidate.edSpecialty" />
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="学校类型"
                                      prop="edSchooltype">
                                <Select v-model="formEmpValidate.edSchooltype">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel2"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <!--<Col span="11">-->
                            <!--<FormItem :label="$t('lang_employee.educationInfo.edDegree')" prop="edDegree">-->
                            <!--<Input :placeholder="$t('lang_employee.educationInfo.edDegreeDis')" v-model="formEmpValidate.edDegree"/>-->
                            <!--</FormItem>-->
                            <!--</Col>-->
                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem label="学习方式"
                                      prop="edLearntype">
                                <Select v-model="formEmpValidate.edLearntype">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEducationlevel3"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem label="是否最高学位">
                                <RadioGroup v-model="formEmpValidate.edIshighest" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="11">
                            <FormItem label="是否第一学历">
                                <RadioGroup v-model="formEmpValidate.edIsfirstqua" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in selectYesno"
                                           :key="index">{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                        </Row>

                        <a name="addressInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{$t('lang_employee.addressInfo.title')}}
                        </a>
                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaMobile')"
                                      prop="ctaMobile">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaMobileDis')"
                                       v-model="formEmpValidate.ctaMobile" />
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaPhone')">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaPhoneDis')"
                                       v-model="formEmpValidate.ctaPhone" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaPersmail')">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaPersmailDis')"
                                       v-model="formEmpValidate.ctaPersmail" />
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaCompmail')"
                                      prop="ctaCompmail">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaCompmailDis')"
                                       v-model="formEmpValidate.ctaCompmail" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaQq')">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaQqDis')"
                                       v-model="formEmpValidate.ctaQq" />
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaWechat')">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaWechatDis')"
                                       v-model="formEmpValidate.ctaWechat" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaEmergcontact')"
                                      prop="ctaEmergcontact">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaEmergcontactDis')"
                                       v-model="formEmpValidate.ctaEmergcontact" />
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaEmcrelation')">
                                <Select v-model="formEmpValidate.ctaEmcrelation">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectEmcrelation"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaEmcphone')"
                                      prop="ctaEmcphone">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaEmcphoneDis')"
                                       v-model="formEmpValidate.ctaEmcphone" />
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.ctaEmcaddr')">
                                <Input :placeholder="$t('lang_employee.addressInfo.ctaEmcaddrDis')"
                                       v-model="formEmpValidate.ctaEmcaddr" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.addCuntry')"
                                      prop="addCuntry">
                                <Select v-model="formEmpValidate.addCuntry">
                                    <Option :value="item.id"
                                            v-for="(item,index) in selectCuntry"
                                            :key="index">{{item.countryName}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.addProvince')"
                                      prop="addProvince">
                                <span @dblclick="dbaddProvince">
                                    <Input :placeholder="$t('lang_employee.addressInfo.addProvinceDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.addProvince"
                                           @on-click="selectProvince($t('lang_employee.searchTableTitle.province'))" />
                                </span>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.addCity')"
                                      prop="addCity">
                                <span @dblclick="dbaddCity">
                                    <Input :placeholder="$t('lang_employee.addressInfo.addCityDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.addCity"
                                           @on-click="selectCity($t('lang_employee.searchTableTitle.city'))" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.addStreet')"
                                      prop="addStreet">
                                <Input :placeholder="$t('lang_employee.addressInfo.addStreetDis')"
                                       v-model="formEmpValidate.addStreet" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.addZip')">
                                <Input :placeholder="$t('lang_employee.addressInfo.addZipDis')"
                                       v-model="formEmpValidate.addZip" />
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.addrCuntry')"
                                      prop="addrCuntry">
                                <Select v-model="formEmpValidate.addrCuntry">
                                    <Option :value="item.id"
                                            v-for="(item,index) in selectrCuntry"
                                            :key="index">{{item.countryName}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.addrProvince')"
                                      prop="addrProvince">
                                <span @dblclick="dbrProvince">
                                    <Input :placeholder="$t('lang_employee.addressInfo.addrProvinceDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.addrProvince"
                                           @on-click="selectAddrProvince($t('lang_employee.searchTableTitle.rProvince'))" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.addrCity')"
                                      prop="addrCity">
                                <span @dblclick="dbrCity">
                                    <Input :placeholder="$t('lang_employee.addressInfo.addrCityDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           v-model="formEmpValidate.addrCity"
                                           @on-click="selectAddrCity($t('lang_employee.searchTableTitle.rCity'))" />
                                </span>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="23">
                            <FormItem :label="$t('lang_employee.addressInfo.addrStreet')"
                                      prop="addrStreet">
                                <Input :placeholder="$t('lang_employee.addressInfo.addrStreetDis')"
                                       v-model="formEmpValidate.addrStreet" />
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="11">
                            <FormItem :label="$t('lang_employee.addressInfo.addrRegisterproperty')"
                                      prop="addrRegisterproperty">
                                <Select v-model="formEmpValidate.addrRegisterproperty">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectRegisterproperty"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="11"
                                 offset="1">
                            <FormItem :label="$t('lang_employee.addressInfo.addrZip')">
                                <Input :placeholder="$t('lang_employee.addressInfo.addrZipDis')"
                                       v-model="formEmpValidate.addrZip" />
                            </FormItem>
                            </Col>
                        </Row>

                    </Form>
                </div>
                <div style="padding-bottom: 20px;"  class="btnAlign">
                       
                    <Button @click="closeAddEmp">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            :loading="isSpin"
                            @click="handleSubmit">{{$t('button.sav')}}</Button>
                </div>
            </Row>
            </Col>
            </Row>

        </div>
        <!--民族-->
        <transition name="fade">
            <searchNation v-show="openNation"
                          @closeEmp="closeNation"
                          :searchClo="searchNationCol"
                          @inputNation="inputNation"
                          :params="params"
                          ref="searchNation"></searchNation>
        </transition>
        <!--银行-->
        <transition name="fade">
            <searchBank v-show="openBank"
                        @closeBank="closeBank"
                        :searchBankCol="searchBankCol"
                        @inputBank="inputBank"
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
                         :modiaContent=modiaContent
                         :dataParame=dataParame
                         dataType="row"
                         @changeinput="changeinput2"
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadimage } from '../../../axios/axios'
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

export default {
    data () {
        return {
            spinShow: false,
            searchBnc: false,
            ContractperiodShow: false,
            ctProbationdateShow: false,
            isSpin: false,
            showModal: false,
            modiaContent: '',
            dataParame: {},
            selectType: '',
            logType: '',
            httpImg: '',
            cropedImg: '',
            cropedImgDis: '',
            empHeader: '',
            cityType: '',
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
                _mt: 'xianBaseLang.getPage',
                sort: 'lanCode',
                order: 'asc',
                rows: 11,
                page: 1,
                funId: '1',
                logType: '弹出框',
                lanType: 'param_info_nationtype',
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
                _mt: 'xianBaseBankinfo.getPage',
                rows: 11,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1100',
                logType: '开户银行',
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
                rows: 11,
                page: 1,
                sort: 'id',
                order: 'asc',
                sihfpcyType: '',
                logType: '查询List',
            },
            //      雇佣公司
            searchHCClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '公司名称',
                    key: 'compFnameCnDis',
                },
                //          {
                //            title: this.$t('lang_employee.searchColumn.compEnFullName'),
                //            key: 'compFnameEnDis',
                //          },
            ],
            paramsHCompany: {
                _mt: 'xianOrgUnits.getByOrgFramePageList',
                rows: 11,
                page: 1,
                sort: 'id',
                order: 'desc',
                unitType: '01company,10area',
                // unitPid: '0',
                logType: '雇佣公司',
            },
            paramsBnchClo: {
                _mt: 'xianOrgBenchmarkpost.getPage',
                rows: 11,
                page: 1,
                sort: 'id',
                order: 'desc',
                logType: '基准岗位',
            },
            //      部门
            searchDeptClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '部门名称',
                    key: 'compFnameCnDis',
                },
                //          {
                //            title: this.$t('lang_employee.searchColumn.departEnFullName'),
                //            key: 'compFnameEnDis',
                //          },
            ],
            paramsDept: {
                _mt: 'xianOrgUnits.getByOrgFramePageList',
                rows: 11,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1106',
                logType: '部门',
                unitType: '70dept,20city,30busi',
            },
            //      岗位
            searchPostClo: [
                {
                    title: this.$t('lang_employee.searchColumn.postCode'),
                    key: 'postCode',
                    sortable: 'custom',
                },
                {
                    title: '岗位名称',
                    key: 'postFnameCnDis',
                },
                //          {
                //            title: this.$t('lang_employee.searchColumn.postFnameEnDis'),
                //            key: 'postFnameEnDis',
                //          },
            ],
            paramsPost: {
                _mt: 'orgUnitPostService.getPost',
                rows: 11,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1107',
                logType: '岗位',
            },
            //      成本中心
            searchCloumns: [
                {
                    title: this.$t('lang_organization.orgcostcenter.costCode'),
                    key: 'costCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_organization.orgcostcenter.cname'),
                    key: 'cname',
                },
                {
                    title: this.$t('lang_organization.orgcostcenter.ename'),
                    key: 'ename',
                },
            ],
            paramsOrgcostcenter: {
                _mt: 'xianOrgCostcenter.getPage',
                rows: 11,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1107',
                logType: '成本中心查询',
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
                    key: 'cityTypeName',
                    sortable: 'custom',
                    width: 379,
                },
            ],
            paramsHirelocation: {
                _mt: 'xianBaseCity.getPage',
                sort: 'id',
                order: 'desc',
                rows: 11,
                page: 1,
                funId: '1',
                logType: '地点',
                data: '{"cityIsvalid" : "1"}',
            },
            //      上级经理s
            searchMangerClo: [
                {
                    title: '员工姓名',
                    key: 'empCname',
                    sortable: 'custom',
                },
                {
                    title: '员工工号',
                    key: 'empkiWorkno',
                    sortable: 'custom',
                },
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
                _mt: 'xianViewEmpMaster.getPage',
                sort: 'id',
                order: 'desc',
                rows: 11,
                page: 1,
                logType: '员工查询',
                data: '{}',
            },
            ruleValidate: {
                // baseGid: [
                //   { required: true, message: this.$t('lang_employee.empmasterCheck.baseGid'), trigger: 'blur' },
                // ],
                baseCname: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseCname'), trigger: 'blur' },
                ],
                baseLastname: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseLastname'), trigger: 'blur' },
                ],
                baseFirstname: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseFirstname'), trigger: 'blur' },
                ],
                idsType: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.idsType'), trigger: 'blur, change' },
                ],
                idsNo: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.idsNo'), trigger: 'blur' },
                ],
                baseBirthdate: [
                    { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.baseBirthdate'), trigger: 'blur, change' },
                ],
                baseGender: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseGender'), trigger: 'blur, change' },
                ],
                baseMarriage: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseMarriage'), trigger: 'blur, change' },
                ],
                baseNation: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseNation'), trigger: 'blur, change' },
                ],
                basePolitical: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.basePolitical'), trigger: 'blur, change' },
                ],
                baseTechnicaltitle: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseTechnicaltitle'), trigger: 'blur, change' },
                ],
                baseTechspec: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.baseTechspec'), trigger: 'blur' },
                ],
                baseFirstworkdate: [
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
                edSchool: [
                    { required: true, message: '学校不能为空', trigger: 'blur, change' },
                ],
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
                pkiWorkno: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.pkiWorkno'), trigger: 'blur' },
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
                edSchool: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.edSchool'), trigger: 'blur' },
                ],
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
                edQualifications: [
                    { required: true, message: '请选择学历', trigger: 'change' },
                ],
                ctaMobile: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaMobile'), trigger: 'blur' },
                ],
                ctaPhone: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaPhone'), trigger: 'blur' },
                ],
                ctaPersmail: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaPersmail'), trigger: 'blur' },
                ],
                ctaCompmail: [
                    { required: true, message: this.$t('lang_employee.empmasterCheck.ctaCompmail'), trigger: 'blur' },
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
    },
    mounted () {
        this.getSelect()
        this.getSelectCountry()
        // this.getSelectSalSet()
    },
    created () {
        this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
        resetField () {
            const t = this
            t.$refs.formEmpValidate.resetFields()
        },
        handleSubmit () {
            const t = this
            const dataValue = deepCopy(t.formEmpValidate)
            //      基本信息
            let empBase = {
                // empGid: dataValue.baseGid,
                empCname: dataValue.baseCname,
                // empFirstname: dataValue.baseLastname,
                // empLastname: dataValue.baseFirstname,
                //        	empAlias: dataValue.baseAlias,
                empGender: dataValue.baseGender,
                empBirthdate: dataValue.baseBirthdate === '' ? '' : new Date(dataValue.baseBirthdate).format('yyyy-MM-dd'),
                empNation: dataValue.nationPCode,
                empMarriage: dataValue.baseMarriage,
                empPolitical: dataValue.basePolitical,
                empFirstworkdate: dataValue.baseFirstworkdate === '' ? '' : new Date(dataValue.baseFirstworkdate).format('yyyy-MM-dd'),
                empTechnicaltitle: dataValue.baseTechnicaltitle,
                empTechspec: dataValue.baseTechspec,
                empSysaccountOa: dataValue.empSysaccountOa,
                empSysaccpwdOa: dataValue.empSysaccpwdOa,
                empOrderOa: dataValue.empOrderOa,
                empTechdate: dataValue.baseTechdate === '' ? '' : new Date(dataValue.baseTechdate).format('yyyy-MM-dd'),
            }
            //      证件信息
            let empIds = {
                empidType: dataValue.idsType,
                empidNo: dataValue.idsNo,
            }
            //      员工信息
            let empKeyInfo = {
                empkiWorkno: dataValue.pkiWorkno,
                empkiEmptype: dataValue.pkiEmptype,
                empkiEstablishment: dataValue.empkiEstablishment,
                empkiTraineeounds: dataValue.empkiTraineeounds === '' ? '' : new Date(dataValue.empkiTraineeounds).format('yyyy'),
                empkiEmpmapping: dataValue.empkiEmpmapping,
                empkiPaystyle: dataValue.empkiPaystyle,
            }
            //      公司信息
            let empCompany = {
                empcompHirecompany: dataValue.compHirecompanyPid,
                empcompDept: dataValue.compDeptPid,
                empcompPost: dataValue.compPostPid,
                empcompCostcenter: dataValue.compCostcenterPid,
                empcompHirelocation: dataValue.compHirelocationPid,
                empcompWorklocation: dataValue.compWorklocationPid,
                empcompBuspmp: dataValue.compBuspmpPid,
                empcompFunpmp: dataValue.compFunpmpPid,
                empcompEntrydate: dataValue.compEntrydate === '' ? '' : new Date(dataValue.compEntrydate).format('yyyy-MM-dd'),
                empcompServicedate: dataValue.compServicedate === '' ? '' : new Date(dataValue.compServicedate).format('yyyy-MM-dd'),
                empcompCertificatedate: dataValue.compCertificatedate === '' ? '' : new Date(dataValue.compCertificatedate).format('yyyy-MM-dd'),
                // empcompHr: dataValue.comPHRPid,
                empcompPostlevel: dataValue.empcompPostlevel,
                empcompPostseq: dataValue.empcompPostseq,
                empcompTravelaward: dataValue.empcompTravelaward,
                empcompImportaward: dataValue.empcompImportaward,
                empcompBnchpost: dataValue.empcompBnchpost,
                empcompBnchpostDis: dataValue.empcompBnchpostDis,
            }
            //      合同信息
            let empContract = {
                empctContracttype: dataValue.ctContracttype,
                empctCategory: dataValue.empctCategory,
                empctContractperiod: dataValue.ctContractperiod,
                empctMaincomp: dataValue.empctMaincomp,
                empctSigntype: dataValue.empctSigntype,
                empctIsrehire: dataValue.empctIsrehire,
                empctMaincompDis: dataValue.empctMaincompDis,
                empctContractsdate: dataValue.ctContractsdate === '' ? '' : new Date(dataValue.ctContractsdate).format('yyyy-MM-dd'),
                empctContractedate: dataValue.ctContractedate === '' ? '' : new Date(dataValue.ctContractedate).format('yyyy-MM-dd'),
                empctContractprom: dataValue.ctContractprom,
                empctConfidential: dataValue.ctConfidential,
                empctContractworktime: dataValue.ctContractworktime,
                empctSigndate: dataValue.ctSigndate === '' ? '' : new Date(dataValue.ctSigndate).format('yyyy-MM-dd'),
                empctProbation: dataValue.ctProbation,
                empctProbationdate: dataValue.ctProbationdate === '' ? '' : new Date(dataValue.ctProbationdate).format('yyyy-MM-dd'),
                empctProbationprom: dataValue.ctProbationprom,
            }
            //      薪资信息
            let empPayrollSalaryBase = {
                empsalbsPostlevel: dataValue.salPostlevel,
                empsalbsSalarylevel: dataValue.salSalarylevel,
                empsalbsTravellevel: dataValue.salTravellevel,
                empsalbsAdminlevel: dataValue.salAdminlevel,
                empsalbsSalaryset: dataValue.salSalaryset,
                //      	empsalbsTaxlocation: dataValue.salTaxlocation,
                //      	empsalbsSalarycurrency: dataValue.salSalarycurrency,
            }
            //      社保信息
            //        let empSihfBenefit = {
            //        	empbntBenefitlocation: dataValue.sbBenefitlocationPid,
            //        	empbntBenefitpolicy: dataValue.sbBenefitpolicyPid,
            //        	empbntBenefittype: dataValue.sbBenefittype,
            //        }
            //      社保信息
            //        let empSihfHfund = {
            //          empbntHfundlocatio: dataValue.sbHfundlocatioPid,
            //          empbntHfundpolicy: dataValue.sbHfundpolicyPid,
            //          empbntHfundtype: dataValue.sbHfundtype,
            //        }
            //      银行信息
            //        let empBank = {
            //        	empbkBank: dataValue.bkBankPid,
            //        	empbkAccount: dataValue.bkAccount,
            //        	empbkAccnane: dataValue.bkAccnane,
            //        }
            //      最高学历信息
            let empEducation = {
                //        	empedEducationlevel: dataValue.edEducationlevel,
                empedSdate: dataValue.edSdate === '' ? '' : new Date(dataValue.edSdate).format('yyyy-MM-dd'),
                empedEdate: dataValue.edEdate === '' ? '' : new Date(dataValue.edEdate).format('yyyy-MM-dd'),
                empedQualifications: dataValue.edQualifications,
                empedDegree: dataValue.edDegree,
                empedCuntry: dataValue.edCuntry,
                empedSchool: dataValue.edSchool,
                empedSpecialty: dataValue.edSpecialty,
                empedSchooltype: dataValue.edSchooltype,
                empedLearntype: dataValue.edLearntype,
                empedIshighest: dataValue.edIshighest,
                empedIsfirstqua: dataValue.edIsfirstqua,
            }
            //      联系地址信息
            let empContact = {
                empctaMobile: dataValue.ctaMobile,
                empctaPhone: dataValue.ctaPhone,
                empctaPersmail: dataValue.ctaPersmail,
                empctaCompmail: dataValue.ctaCompmail,
                empctaQq: dataValue.ctaQq,
                empctaWechat: dataValue.ctaWechat,
                empctaEmergcontact: dataValue.ctaEmergcontact,
                empctaEmcrelation: dataValue.ctaEmcrelation,
                empctaEmcphone: dataValue.ctaEmcphone,
                empctaEmcaddr: dataValue.ctaEmcaddr,
            }
            //      地址信息
            let empAddress = {
                empaddrCuntry: dataValue.addCuntry,
                empaddrProvince: dataValue.addProvincePid,
                empaddrCity: dataValue.addCityPid,
                empaddrStreet: dataValue.addStreet,
                empaddrZip: dataValue.addZip,
            }
            //      地址2
            let empAddress2 = {
                empaddrCuntry: dataValue.addrCuntry,
                empaddrProvince: dataValue.addrProvincePid,
                empaddrCity: dataValue.addrCityPid,
                empaddrStreet: dataValue.addrStreet,
                empaddrZip: dataValue.addrZip,
                empaddrRegisterproperty: dataValue.addrRegisterproperty,
            }
            let data = {
                empBase: empBase,
                empIds: empIds,
                empKeyInfo: empKeyInfo,
                empCompany: empCompany,
                empContract: empContract,
                // empPayrollSalaryBase: empPayrollSalaryBase,
                //					empSihfBenefit: empSihfBenefit,
                //          empSihfHfund: empSihfHfund,
                //					empBank: empBank,
                empEducation: empEducation,
                empContact: empContact,
                empAddress: empAddress,
                empAddress2: empAddress2,
                _mt: 'xianEmpMaster.addOrUpd',
                logType: '新增员工主数据',
            }
            //				for (const dat in data) {
            //        if (data[dat] === '') {
            //          delete data[dat]
            //        }
            //      }
            t.$refs.formEmpValidate.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginSenior(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            t.$emit('closeEmp')
                            t.$emit('getData', res.data.content[0])
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
            getDataLevelUserLogin({
                _mt: 'xianBaseParmInfo.getSelectValue',
                logType: this.$t('button.ser'),
                typeCode: 'gender,marrystatus,political,techlevel,emptype,contrpertype,postlevel,salarylevel,travellevel,adminlevel,education,relationship,benefitacctype,idtype,registerproperty,worktimetype,contperiod,noticedays,confidential,probperiod,contractcategary,yesno,worktimetype,contract_signtype,degreelevel,schooltype,learnstyle,establishmenttype,empmapping,payofftype',
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
                    t.selectEducationlevel = res.data.content[0].value[11].paramList
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
                    getDataLevelUserLogin({
                        _mt: 'xianOrgPostlevelmapping.getSelectValue',
                    }).then((res1) => {
                        if (isSuccess(res1, t)) {
                            t.selectEmpcompPostlevel = res1.data.content[0].value
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getSelectCountry () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'xianBaseCountry.getSelectValue',
                data: '{}',
                logType: '国家查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectEdCuntry = res.data.content[0].value
                    t.selectCuntry = res.data.content[0].value
                    t.selectrCuntry = res.data.content[0].value
                }
            }).catch(() => {
                //          this.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
        },
        getSelectSalSet () {
            const t = this
            getDataLevelUserLogin({
                _mt: 'xianPaySalSet.getSelectValue',
                data: '{}',
                logType: '薪资账套查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectSalaryset = res.data.content[0].value
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
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
            t.openBank = true
        },
        inputBank (name, id) {
            const t = this
            t.formEmpValidate.bkBank = name
            t.formEmpValidate.bkBankPid = id
        },
        dbbkBank () {
            const t = this
            t.formEmpValidate.bkBank = ''
            t.formEmpValidate.bkBankPid = ''
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
            t.formEmpValidate.compHirecompany = name
            t.formEmpValidate.compHirecompanyPid = id
        },
        dbHCompany () {
            const t = this
            t.formEmpValidate.compHirecompany = ''
            t.formEmpValidate.compHirecompanyPid = ''
            t.dbDept()
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
            if (t.formEmpValidate.compHirecompanyPid === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_employee.empmaster.empHireCompDis'),
                })
            } else {
                const paramsDept = deepCopy(t.paramsDept)
                t.$refs.searchDept.getData(paramsDept, t.formEmpValidate.compHirecompanyPid)
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
            t.formEmpValidate.compDept = name
            t.formEmpValidate.compDeptPid = id
            //  		localStorage.setItem('postUNIT', 'unit' + id)
        },
        dbDept () {
            const t = this
            t.formEmpValidate.compDept = ''
            t.formEmpValidate.compDeptPid = ''
            t.dbPost()
        },
        //  	岗位
        selectPost () {
            const t = this
            if (t.formEmpValidate.compDeptPid === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_employee.empmaster.empPostDis'),
                })
            } else {
                const paramsPost = deepCopy(t.paramsPost)
                //	    		paramsPost.postUnit = 'unit' + t.formEmpValidate.compDeptPid
                t.$refs.searchPost.getData(paramsPost,t.formEmpValidate.compDeptPid)
                t.openPost = true
            }
        },
        closePost () {
            const t = this
            t.$refs.searchPost.postCode = ''
            t.openPost = false
        },
        inputPost (name, id, postName, postId) {
            const t = this
            t.formEmpValidate.compPost = name
            t.formEmpValidate.compPostPid = id
            t.formEmpValidate.compCostcenter = postName
            t.formEmpValidate.compCostcenterPid = postId
        },
        dbPost () {
            const t = this
            t.formEmpValidate.compPost = ''
            t.formEmpValidate.compPostPid = ''
            t.dbCostcenter()
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
            t.formEmpValidate.compCostcenter = name
            t.formEmpValidate.compCostcenterPid = id
        },
        dbCostcenter () {
            const t = this
            t.formEmpValidate.compCostcenter = ''
            t.formEmpValidate.compCostcenterPid = ''
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
            t.formEmpValidate.compHirelocation = name
            t.formEmpValidate.compHirelocationPid = id
        },
        dbHirelocation () {
            const t = this
            t.formEmpValidate.compHirelocation = ''
            t.formEmpValidate.compHirelocationPid = ''
        },
        inputWorklocation (name, id) {
            const t = this
            t.formEmpValidate.compWorklocation = name
            t.formEmpValidate.compWorklocationPid = id
        },
        dbWorklocation () {
            const t = this
            t.formEmpValidate.compWorklocation = ''
            t.formEmpValidate.compWorklocationPid = ''
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
            t.formEmpValidate.compBuspmp = name
            t.formEmpValidate.compBuspmpPid = id
        },
        dbBuspmp () {
            const t = this
            t.formEmpValidate.compBuspmp = ''
            t.formEmpValidate.compBuspmpPid = ''
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
                                t.cropedImgDis = key + ',' + res.data[key]
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
        //  	导航点击
        newColor (that) {
            //  		if (!(this.dqq === 0)) {
            //					this.dqq.style.color = 'red'
            //				}
            //				a.style.color = 'blue'
            //				this.dqq = a
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
        selectctCtProbation (value) {
            if (value === '0') {
                this.formEmpValidate.ctProbationdate = ''
                this.formEmpValidate.ctProbationprom = ''
                this.$refs['formEmpValidate'].fields.forEach((v, i) => {
                    if (v.prop === 'ctProbationdate' || v.prop === 'ctProbationprom') {
                        v.validateDisabled = true
                        v.validateState = ''
                        v.validateMessage = ''
                        v.isRequired = false
                    }
                })
                this.ctProbationdateShow = true
            } else {
                this.ctProbationdateShow = false
                this.$nextTick(() => {
                    this.$refs['formEmpValidate'].fields.forEach((v, i) => {
                        if (v.prop === 'ctProbationdate' || v.prop === 'ctProbationprom') {
                            v.isRequired = true
                        }
                    })
                })
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
                            content: '请先选择雇佣公司',
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
            getDataLevelUserLogin({
                // _mt: 'xianBasePubTools.getPinYinByName',
                _mt: 'xianBasePubTools.getShortPYAccount',
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
@import "../../../sass/updateAndAdd";
@import "../../../sass/mainChildUpdate";
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
.cover .box {
    .meau-left{
        padding:0;
    }
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
.menuInfo /deep/ .ivu-menu-item{
    height:60px;
    padding:10px 15px;
    display:flex;
    justify-content: center;
    align-items: center;
}
.menuInfo a {
    display: block;
    font-size: 14px;
    color: #000000;
    font-family: "微软雅黑";
    width: 100%;
    // height: 50px;
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
.header-cover {
    display: none;
    top: 16px;
    right: 14px;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 150px;
    height: 150px;
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
    height: 150px;
    width: 150px;
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
    height: 50px;
}
.topMar{
    padding-left: 15px;
    max-height: 478px;
    overflow-y: auto;
    margin-right: 20px;
    margin-bottom: 20px;
}
.btnAlign{
    text-align: end;
    margin-right: 59px;
    button{
        margin-left: 8px;
    }
}
/deep/ .ivu-radio-wrapper-checked{
    background: rgba(45, 140, 240, 1);
    color:#fff;
}
/deep/ .ivu-radio-group-button .ivu-radio-wrapper-checked:hover{
    color:#fff;
}
/deep/ .ivu-menu-item-active:not(.ivu-menu-submenu){
    background:#fff;
}
/deep/ .ivu-menu-item-active:not(.ivu-menu-submenu):after{
    width:4px !important;
    height:70%;
    left:0;
    top:8px !important;
}
/deep/ .ivu-menu-vertical.ivu-menu-light:after{
    background:#fff !important;
}
/deep/ .ivu-menu-light{
    background:#F5F5F5;
}
/deep/ .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    background:#fff;
}
</style>
