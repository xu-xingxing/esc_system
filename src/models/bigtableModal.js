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
        'buydate':[],
        //所有品牌
        'allbs':[],
        'brand':'',
        'series':'',
        'total':0,
        'price':[0, 120],
        'km':[0, 2000000]
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
        },
        loadAllBs (state, {allbs}){
            return {
                ...state,
                allbs
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
            const {current, color, exhaust, fuel, engine, buydate, brand, series, price, km} = yield select(({bigtable})=>bigtable);
            const {results, total} = yield axios.get('/api/car?'
            + querystring.stringify({
                'page':current,
                'color':color.join('v'),
                'exhaust':exhaust.join('v'),
                'fuel':fuel.join('v'),
                'engine':engine.join('v'),
                'buydate':buydate.join('to'),
                'price':price.join('to'),
                'km':km.join('to'),
                brand,
                series
            })).then(data=>data.data);
            yield put({'type':'changeResults', results, total});
        },
        //分页
        *changeCurrentHandle ({current}, {put}) {
            yield put({'type':'changeCurrent', current});
            yield put({'type':'initTableData'});
        },
        //改变筛选条件
        *changeFilterSaga ({k, v}, {put}){
            yield put({'type':'changeFilter', k, v});
            //如果改变的是brand，那么要多一次put，把品牌弄掉（应对的情况是，直接点brand的tag的叉
            if (k === 'brand') {
                yield put({'type': 'changeFilter', 'k': 'series', 'v': ''});
            }
            //重新拉取
            yield put({'type':'initTableData'});
            yield put({'type':'changeCurrent', 'current':1});
        },
        //加载品牌和车系
        *loadAllBsSaga (aciton, {put}){
            const allbs = yield axios.get('/api/allbs').then(data=>data.data);
            yield put({'type': 'loadAllBs', allbs});
        }
    }
};