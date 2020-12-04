<template>
  <div class="table" style="max-height: 420px;">
    <Row>
				<Col span="20" style="width:100% !important;">
				<Row>
					<Button type="primary" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
					<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
				</Row>
				<row class="table-form" ref="table-form">
					<Table :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"
						@on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable">
					</Table>
				</row>
				<Row style="display: flex">
					<Page :total="total"  size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" >
					</Page>
					<Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="refresh"></Button>
				</Row>
				</Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUpd="closeUpd" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
import update from './developUpdate.vue'
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
					title: '序号',
					key: 'pchOrder',
				},
				{
					title: '通道名称',
					key: 'pchName',
        },
        {
					title: '目标岗位1',
					key: 'pchTarget1Dis',
        },
        {
					title: '目标岗位2',
					key: 'pchTarget2Dis',
        },
        {
					title: '目标岗位3',
					key: 'pchTarget3Dis',
				},
				{
					title: '目标岗位4',
					key: 'pchTarget4Dis',
				},
				{
					title: '目标岗位5',
					key: 'pchTarget5Dis',
        },
				{
					title: this.$t('button.opr'),
					key: 'action',
					align: 'center',
					// width: 120,
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
				_mt:  this.$global.mt+'OrgPostchannel.getPage',
				funId: '1',
				rows: 10,
				page: 1,
				sort: 'id',
				order: 'asc',
				logType: '查询',
			},
			total: 0,
			index: 0,
			page: 1,
			logType: '',
			levelAll:'',
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
			t.params.pchBillid = this.$store.state.user.masterPublicId
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
		updateArray() {
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
							_mt:  this.$global.mt+'OrgPostchannel.delByIds',
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
      t.$refs.update.getData(id)
      t.$refs.update.level1 = t.levelAll
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
