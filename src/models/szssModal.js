import axios from 'axios';
export default {
    namespace: 'szss',
    state: {
        products: {}
    },
    reducers: {
        loadObtainResult ({state}, {products}) {
            return {
                ...state,
                products
            };
        }
    },
    effects: {
        *loadResult (ation, {put}) {
            const {products} = yield axios.get('http://192.168.2.250:8922/product').then(data => data.data);
            yield put({'type': 'loadObtainResult', products});
        }
    }
};