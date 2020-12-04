/*
 * @Author: chneY
 * @Date: 2020-07-27 11:04:24
 * @Last Modified by: chenY
 * @Last Modified time: 2020-09-07 20:13:44
 */

export const mixinTable = {
    data () {
        return {
            tableheight: 200, //table高度
            logType: "", //操作类型
            data: [], //table数据
            columns: [], //table列
            tableselected: [], //多选选中项
            total: 0, //总页码
            index: 0, //选中index
            sort: "id", //排序字段
            order: "desc", //排序方式
            rows: 10, //一页显示条数
            page: 1, //页码
            noData: '<div id="noData"></div>' //暂无数据显示图
        };
    },
    mounted () {
        //表格高度自适应
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    methods: {
        //排序
        sortable (column) {
            this.sort = column.key;
            if (column.order !== "normal") {
                this.order = column.order;
                this.getData();
            }
        },
        //改变rows
        sizeChange (size) {
            const t = this;
            t.rows = size;
            t.getData();
        },
        //改变page
        pageChange (page) {
            const t = this;
            t.page = page;
            t.getData();
        },
        //table勾选项
        selectedtable (selection) {
            const newArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            this.tableselected = newArr;
        },
        // 新增不刷新
        getUpData (res) {
            const t = this;
            if(t.showBtnStatus) {
                t.getData()
            } else{
                t.data.unshift(res);
            }
            t.index = 0;
            if(t.hasOwnProperty('getTree')) {
                t.getTree()
            }
        },
        //修改不刷新
        updataTable (res) {
            const t = this;
            if(t.showBtnStatus) {
                t.getData()
            } else {
                t.data.splice(t.index, 1, res);
            }
            if(t.hasOwnProperty('getTree')) {
                t.getTree()
            }
        },
        // 改变logType--主子表新增成功后变为修改
        changeLogtype (logType) {
            const t = this;
            t.logType = logType;
        }
    }
};
