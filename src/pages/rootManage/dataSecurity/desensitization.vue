<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          脱敏格式定义
        </p>
        <Row>
          <Col span="20" style="width:100% !important;">
          <Row>
          	<span>
            	<Input placeholder="请输入格式名称" style="width: 200px" v-model="form.baseDesfmtName"/>
           </span>
					 <!-- <Dropdown>
							<Button type="primary">
								{{statusDis}}
								<Icon type="md-arrow-dropdown" size="18"></Icon>
							</Button>
							<DropdownMenu slot="list" >
								<span v-for="(item,index) in dropdownMenuList" :key="index" @click="getPageByState(item.paramCode,item.paramInfoCn)">
										<DropdownItem>{{item.paramInfoCn}}</DropdownItem>
									</span>
							</DropdownMenu>
						</Dropdown> -->
            <span style="margin: 0;"><Button type="primary"  @click="search()">{{$t('button.ser')}}</Button></span>
						<Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
						<!-- <Button type="success" v-show="dutyStatus === '01draft' || dutyStatus === '03invalid'" @click="modifystatu('02valid')">{{$t('status.valid')}}</Button> -->
          </Row>
          <row class="table-form" ref="table-form">
            <Table :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"
							@on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable">
						</Table>
          </row>
					<Row style="display: flex">
	          <Row style="display: flex">
              <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" >
              </Page>
              <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
            </Row>
	          <Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="refresh"></Button>
          </Row>
          </Col>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" @closeUpd="closeUpd" @getData="getData" @addNewArray="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
import update from './update.vue'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess,getUrlKey } from '../../../lib/util'
export default {
	name: 'baseDesensitisefmtList',
	data() {
		return {
			openUpdate: false,
			tableheight: document.body.offsetHeight - 250,
			tableselected: [],
			// statusDis: this.$t('status.valid'),
			form: {
				baseDesfmtName: '', //名称
			},
			columns: [
				{
					type: 'selection',
					width: 60,
					align: 'center',
				},
				{
					title: '格式编号',
					key: 'baseDesfmtNo',
					sortable: 'custom',
				},
				{
					title: '格式名称',
					key: 'baseDesfmtName',
					sortable: 'custom',
				},
				{
					title: '格式',
					key: 'baseDesfmtFormatDis',
				},
				{
					title: '首X位',
					key: 'baseDesfmtFbit',
				},
				{
					title: '末X位',
					key: 'baseDesfmtEbit',
				},
				{
					title: this.$t('button.opr'),
					key: 'action',
					align: 'center',
					width: 120,
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'info',
									size: 'small',
								},
								style: {
									marginLeft: '5px',
								},
								on: {
									click: () => {
										this.openUp(params.row.id, this.$t('button.y.upd'))
									},
								},
							}, this.$t('button.y.upd')),
							h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.view'))
                    },
                  },
                }, this.$t('button.view')),
						])
					},
				},
      ],
      data:[],
			logType: '',
			total: 0,
			index: 0,
			sort: 'id',
			order: 'desc',
			rows: 10,
			page: 1,
			funId: '1000',
			dutyStatus: '02valid',
			dropdownMenuList: [],
			updateId: NaN,
		}
	},
	components: {
		update,
	},
//	mounted() {
//		this.getData()
//		this.getSelect()
//	},
  mouted() {
    if (eval(getUrlKey('state').toLowerCase())) {
      const t = this
      t.getData(1)
      t.getSelect()
    }
  },
	methods: {
		getData(page) {
			const t = this
			if (page) {
				t.page = page
			}
			const data = {
				_mt:  this.$global.mt+'BaseDesensitisefmt.getPage',
				funId: t.funId,
				logType: t.$t('button.ser'),
				rows: t.rows,
				page: t.page,
				sort: t.sort,
				order: t.order,
				baseDesfmtName: t.form.baseDesfmtName
			}
			for (const dat in data) {
				if (data[dat] === '') {
					delete data[dat]
				}
			}
			t.data = [];
			t.total = 0;
			getDataLevelUserLoginNew(data).then((res) => {
				if (isSuccess(res, t)) {
					t.data = res.data.content[0].rows
					t.total = res.data.content[0].records
				}
			}).catch(() => {
				t.$Modal.error({
					title: this.$t('reminder.err'),
					content: this.$t('reminder.errormessage'),
				})
			})
		},
		// 新增修改后刷新页面
		addNewArray(res) {
			const t = this
			if (t.data.length === 0) {
				t.data.push(res)
			} else {
				t.data.unshift(res)
			}
		},
		updateArray(res) {
			const t = this
			t.data.splice(t.index, 1, res)
		},
		selectedtable(selection) {
			const newArr = []
			for (let i = 0; i < selection.length; i++) {
				newArr.push(selection[i].id)
			}
			this.tableselected = newArr
		},
		deletemsg() {
			const t = this
			if (t.tableselected.length === 0) {
				t.$Modal.warning({
					title: this.$t('reminder.remind'),
					content: this.$t('reminder.leastone'),
				})
			} else {
				t.$Modal.confirm({
					title: this.$t('reminder.remind'),
					content: this.$t('reminder.confirmdelete'),
					onOk: () => {
						getDataLevelUserLogin({
							_mt:  this.$global.mt+'BaseDesensitisefmt.delByIds',
							funId: '1',
							logType: this.$t('button.del'),
							ids: t.tableselected.toString(),
						}).then((res) => {
							if (isSuccess(res, t)) {
								t.tableselected = []
								t.getData()
							}
						}).catch(() => {
							t.$Modal.error({
								title: this.$t('reminder.err'),
								content: this.$t('reminder.errormessage'),
							})
						})
					},
					onCancel: () => {},
				})
			}
		},
		// 新增
		openUp(id, logType) {
			const t = this
			t.openUpdate = true
			t.logType = logType
			t.updateId = parseInt(id, 10)
			if (logType === this.$t('button.y.upd')  || logType === this.$t('button.view')) {
				t.$refs.update.getData(t.updateId)
			}
		},
		closeUpd() {
			const t = this
			t.openUpdate = false
		},
		search() {
			this.page = 1
			this.getData()
		},
		sortable(column) {
			this.sort = column.key
			this.order = column.order
			if (this.order !== 'normal') {
				this.getData()
			} else {
				this.order = 'desc'
			}
		},
		sizeChange(size) {
			const t = this
			t.rows = size
			t.getData()
		},
		pageChange(page) {
			const t = this
			t.page = page
			t.getData()
		},
		refresh() {
			this.getData(1)
		},
		// 获取下拉状态
		getSelect() {
			const t = this
			t.dropdownMenuList = []
			getDataLevelUserLogin({
				_mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
				typeCode: 'pubuserstatus',
			}).then((res) => {
				if (isSuccess(res, t)) {
					t.dropdownMenuList = res.data.content[0].value[0].paramList
				}
			}).catch(() => {
				this.$Modal.error({
					title: this.$t('reminder.err'),
					content: this.$t('reminder.errormessage'),
				})
			})
		},
		/**
		 * 状态的更改
		 * @param paramCode
		 * @param paramInfoName
		 */
		getPageByState(paramCode, paramInfoName) {
			const t = this
			if (paramCode === '00all') {
				t.dutyStatus = ''
			} else {
				t.dutyStatus = paramCode
			}
			t.getData()
			t.statusDis = paramInfoName
		},
		// 更新数据的状态
		modifystatu(state) {
			const t = this
			let logType = ''
			if (state === '02valid') {
				logType = '生效'
			} else if (state === '03invalid') {
				logType = '失效'
			} else if (state === '01draft') {
				logType = '编辑中'
			}
			if (t.tableselected.length === 0) {
				t.$Modal.warning({
					title: this.$t('reminder.remind'),
					content: this.$t('reminder.leastone'),
				})
			} else {
				getDataLevelUserLogin({
					_mt:  this.$global.mt+'OrgDuty.updState',
					dutyStatus: state,
					ids: t.tableselected.toString(),
				}).then((res) => {
					if (isSuccess(res, t)) {
						t.getData(1)
						t.$Modal.success({
							title: this.$t('reminder.suc'),
							content: '操作完成',
						})
					}
				}).catch(() => {
					t.$Modal.error({
						title: this.$t('reminder.err'),
						content: this.$t('reminder.errormessage'),
					})
				})
			}
		},
	}
}
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
