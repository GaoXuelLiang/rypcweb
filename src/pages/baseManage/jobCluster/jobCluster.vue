<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          职务簇管理
        </p>
        <Row>
          <Col span="20" style="width:100% !important;">
          <Row>
          	<span>
            	<Input placeholder="请输入职务簇编号" style="width: 200px" v-model="form.dutygrpCode"/>
           </span>
          	<span>
            	<Input placeholder="请输入职务簇名称" style="width: 200px" v-model="form.dutygrpName"/>
           </span>
            <span style="margin: 0;"><Button type="primary" :loading="isSpin"  @click="search()">{{$t('button.ser')}}</Button></span>
            <Button type="primary" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
            <Button type="primary" @click="expData">{{$t('button.exp')}}</Button>
						<!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
          </Row>
          <row class="table-form" ref="table-form">
            <Spin fix v-if="isSpin" size="large"></Spin>
            <Table :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"
							@on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable">
						</Table>
          </row>
					<Row style="display: flex">
	          <Row style="display: flex">
              <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" >
              </Page>
            </Row>
	          <Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="refresh"></Button>
          </Row>
          </Col>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUpd="closeUpd" @getData="getData" @update="updateArray" ref="update"></update>
    </transition>
    <transition >
    <expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
    </transition>
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
    <advanced v-show="showAdvanced" @closeAdvanced ="closeAdvanced" ref="advanced" @getData="getData"></advanced>
  </div>
</template>
<script>
import update from './update.vue'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess,getUrlKey } from '../../../lib/util'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import advanced from '../../../components/searchTable/searchAdvanced'

export default {
	name: 'jobCluster',
	components: {
		update,
    expwindow,
    expdow,
		advanced
	},
	data() {
		return {
      isSpin: false,
			openUpdate: false,
      expDataTital: [{ code: 'dutygrpCode', name: '编号' }, { code: 'dutygrpName', name: '职务簇名称' }, { code: 'dutygrpDesc', name: '职务簇说明' },
        { code: 'comment', name: '备注' }],
      openExpDow: false,
      openExp: false,
      filekey: '',
      filename: '',
			tableheight: document.body.offsetHeight - 250,
			tableselected: [],
			form: {
				id: '',
				dutygrpCode: '', //编号
				dutygrpName: '', //名称
			},
			columns: [
				{
					type: 'selection',
					width: 60,
					align: 'center',
				},
				{
					title: '编号',
					key: 'dutygrpCode',
				},
				{
					title: '职务簇名称',
					key: 'dutygrpName',
				},
				// {
				// 	title: '职务簇说明',
				// 	key: 'dutygrpDesc',
				// },
				// {
				// 	title: '备注',
				// 	key: 'comment',
				// 	type: 'text',
				// },
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
      showAdvanced: false,
		}
	},
  mouted() {
    if (eval(getUrlKey('state').toLowerCase())) {
      const t = this
      t.form.dutygrpCode = ''
      t.form.dutygrpName = ''
      t.getData(1)
    }
  },
	methods: {
		advSearch() {
			this.showAdvanced = true
			this.$nextTick(()=>{
				this.$refs.advanced.getData()
			})
		},
		closeAdvanced() {
			this.showAdvanced = false
		},
		getData(page,value) {
			const t = this
      t.isSpin = true
			if (page) {
				t.page = page
			}
			const data = {
				_mt:  this.$global.mt+'BaseDutygroup.getPage',
				funId: t.funId,
				logType: t.$t('button.ser'),
				rows: t.rows,
				page: t.page,
				sort: t.sort,
				order: t.order,
				dutygrpCode: t.form.dutygrpCode,
				dutygrpName: t.form.dutygrpName,
			}
			if(value){
				data.searchData = JSON.stringify(value)
			}
			for (const dat in data) {
				if (data[dat] === '') {
					delete data[dat]
				}
			}
			t.data = [];
			t.total = 0;
			getDataLevelUserLoginNew(data).then((res) => {
        t.isSpin = false
				if (isSuccess(res, t)) {
					t.data = res.data.content[0].rows
					t.total = res.data.content[0].records
				}
			}).catch(() => {
        t.isSpin = false
				t.$Modal.error({
					title: this.$t('reminder.err'),
					content: this.$t('reminder.errormessage'),
				})
			})
		},
    expData() {
      const data = {
        dutygrpCode: this.dutygrpCode,
        dutygrpName: this.dutygrpName,
      }
      this.$refs.expwindow.getData(this.expDataTital, 'baseDutygroup.export', data)
      this.openExp = true
    },
    closeExp() {
      const t = this
      t.openExp = false
    },
    closeExpDowMain() {
      const t = this
      t.openExpDow = false
    },
    setFileKey(filekey, filename, openExpDow) {
      const t = this
      t.filekey = filekey
      t.filename = filename
      t.openExpDow = openExpDow
      t.$refs.expdow.getPriToken(t.filekey)
    },
		// 新增修改后刷新页面
		updateArray() {
			const t = this
			t.getData()
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
							_mt:  this.$global.mt+'BaseDutygroup.delByIds',
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
			if (logType === this.$t('button.y.upd')) {
				t.$refs.update.getData(id)
			} else {
				t.$refs.update.getCode()
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
