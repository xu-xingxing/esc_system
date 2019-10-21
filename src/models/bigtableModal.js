import axios from 'axios';
import querystring from 'querystring';
export default {
    namespace:'bigtable',
    state:{
        'current':1,
        'columns':[],
        'results':[],
        //筛选
        'color':[],
        'exhaust':[],
        'fuel':[],
        'engine':[],
        'total':0
    },
    reducers:{
        changeColumns (state, {columns}) {
            return {
                ...state,
                columns
            };
        },
        changeResults (state, {results, total}) {
            return {
                ...state,
                results,
                total
            };
        },
        changeFilter (state, {k, v}) {
            return {
                ...state,
                [k]: v
            };
        },
        changeCurrent (state, {current}) {
            return {
                ...state,
                current
            };
        }
    },
    effects:{
        *getColumnsFromLocalStorage (action, {put}) {
            //获取本地存储中的列
            let columns = localStorage.getItem('columns');
            if (columns === null) {
                localStorage.setItem('columns', '["id", "img", "brand", "fuel", "price"]');
            }
            //["id","brand"],这是一个字符串，将字符串转为数组，使用JSON.parse
            columns = JSON.parse(columns);
            yield put({'type':'changeColumns', columns});
        },
        *setColumnsToLocalStorage ({columns}, {put}) {
            //将用户选择的列，存储到本地
            localStorage.setItem('columns', JSON.stringify(columns));
            //再从本地中获取数据
            yield put({'type':'getColumnsFromLocalStorage'});
        },
        //通过ajax获取表格数据
        *initTableData (action, {put, select}) {
            const {current, color, exhaust, fuel, engine} = yield select(({bigtable})=>bigtable);
            const {results, total} = yield axios.get('http://www.aiqianduan.com:7897/cars?'
            + querystring.stringify({
                'page':current,
                'color':color.join('v'),
                'exhaust':exhaust.join('v'),
                'fuel':fuel.join('v'),
                'engine':engine.join('v')
            })).then(data=>data.data);
            yield put({'type':'changeResults', results, total});
        },
        //分页
        *changeCurrentHandle ({current}, {put}) {
            yield put({'type':'changeCurrent', current});
            yield put({'type':'initTableData'});
        },
        *changeFilterSaga ({k, v}, {put}){
            yield put({'type':'changeFilter', k, v});
            yield put({'type':'initTableData'});
            yield put({'type':'changeCurrent', 'current':1});
        }
    }
};