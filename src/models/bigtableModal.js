import axios from 'axios';
export default {
    //命名空间
    namespace:'bigtable',
    //数据
    state : {
        current:1,
        columnArr:[],
        results:[]
    },
    reducers:{
        changeColumns (state, {columnArr}) {
            return {
                ...state,
                columnArr
            };
        },
        changeResults (state, {results}){
            return {
                ...state,
                results
            };
        }
    },
    effects:{
        *getColumnsFromLocalStorage (action, {put}) {
            //试着从本地存储中读取column字段
            const columnsFromLocalStorage = localStorage.getItem('columns');
            //如果这个字段读取出来时null,表示用户第一次来本网站或者清空缓存
            if (columnsFromLocalStorage === null) {
                //第一次进入，给用户本地赋予一个值
                localStorage.setItem('columns', JSON.stringify(['image', 'id', 'brand', 'series', 'color']));
            }
            //再次从本地存储列表存储信息，并转换
            const columnArr = JSON.parse(localStorage.getItem('columns'));
            //将数据字典转为数组
            // console.log(columnArr);
            yield put({'type':'changeColumns', columnArr});
        },
        *setColunmsToLocalStorage ({columnArr}, {put}) {
            // console.log(12345);
            // console.log(columnArr);
            //设置本地存储
            localStorage.setItem('columns', JSON.stringify(columnArr));
            yield put({'type':'changeColumns', columnArr});
        },
        //读取ajax
        *init (action, {put}){
            const {results, total} = yield axios.get('/api/car').then(data=>data.data);
            yield put({'type': 'changeResults', results});
        }
    }
};
