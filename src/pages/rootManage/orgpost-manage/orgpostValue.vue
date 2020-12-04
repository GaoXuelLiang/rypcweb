<template>
  <div class="table" style="max-height: 420px;">
    <Row>
      <Col span="24">
          <Col span="20" style="width:100% !important;">
          <Row>
            <Button type="primary" @click="openUp(id,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
          </Row>
          <row class="table-form" ref="table-form">
            <Table :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"
							@on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable">
						</Table>
          </row>
					<Row style="display: flex">
						<Page :total="total" size="small" show-elevator show-sizer placement="top" :current="params.page" @on-page-size-change="sizeChange"
              @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
	          <Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="refresh"></Button>
          </Row>
          </Col>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUpd="closeUpd" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
import update from './valueUpdate.vue'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
export default {
	components: {
		update,
	},
	data() {
		return {
			openUpdate: false,
			tableheight: document.body.offsetHeight - 250,
			tableselected: [],
			columns: [
				{
					type: 'selection',
					width: 60,
					align: 'center',
				},
				{
					title: this.$t('lang_organization.orgpost.pvfCode'),
					key: 'pvfCode',
				},
				{
					title: this.$t('lang_organization.orgpost.pvfDuty'),
					key: 'pvfDuty',
        },
        {
					title: this.$t('lang_organization.orgpost.pvfWorkstandard'),
					key: 'pvfWorkstandard',
        },
        {
					title: this.$t('lang_organization.orgpost.pvfAchievement'),
					key: 'pvfAchievement',
        },
        {
					title: this.$t('lang_organization.orgpost.pvfPerfstandard'),
					key: 'pvfPerfstandard',
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
						])
					},
				},
			],
			data:[],
			params: {
				_mt:  this.$global.mt+'OrgPostvaluefield.getPage',
				funId: '1',
				rows: 10,
				page: 1,
				sort: 'id',
				order: 'asc',
				logType: '查询',
			},
			total: 0,
			index: '',
			page: 1,
      logType: '',
		}
	},
	props: {
		id: Number,
	},
	mounted() {
	},
	methods: {
		getData(page) {
			const t = this
      if (page) {
        t.params.page = page
      }
			t.params.pvfBillid = this.$store.state.user.masterPublicId
			const data = deepCopy(t.params)
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
		updateArray(res) {
			const t = this
      t.data.splice(t.index, 1, res)
		},
		addNewArray(res) {
			const t = this
			if (t.data.length === 0) {
				t.data.push(res)
			} else {
				t.data.unshift(res)
			}
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
							_mt:  this.$global.mt+'OrgPostvaluefield.delByIds',
							funId: '',
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
      }
			// else {
			// 	t.$refs.update.getCode()
			// }
		},
		closeUpd() {
			const t = this
			t.openUpdate = false
		},
		search() {
			this.params.page = 1
			this.getData()
		},
		sortable(column) {
			this.params.sort = column.key
			this.params.order = column.order
			if (this.params.order !== 'normal') {
				this.getData()
			} else {
				this.params.order = 'desc'
			}
		},
		sizeChange(size) {
			const t = this
			t.params.rows = size
			t.getData()
		},
		pageChange(page) {
			const t = this
			t.params.page = page
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
		.ivu-table-tip {
			height: 400px;
			td{
				height: 400px;
			}
		}
		overflow: hidden;
  }
	.ivu-table-wrapper{
		height: 420px !important;
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
