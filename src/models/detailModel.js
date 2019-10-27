import axios from 'axios';
export default {
    namespace: 'detail',
    state:{
        //结果
        'id':0,
        'result':[]
    },
    reducers:{
        changeId (state, {id}) {
            return {
                ...state,
                id
            };
        },
        changeResult (state, {result}) {
            return {
                ...state,
                result
            };
        }
    },
    effects:{
        //使用axios获取单个车辆的详细信息
        *initDetailSaga ({id}, {put}) {
            const {result} = yield axios.get('/api/car/' + id).then(data => data.data);
            yield put({'type':'changeId', id});
            yield put({'type':'changeResult', result});
        }
    }
};
