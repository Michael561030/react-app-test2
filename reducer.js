
import {takeLatest, put, call} from 'redux-saga/effects'

// actionTypes
const LOAD_PRODUCT_ASYNC = 'LOAD_PRODUCT_ASYNC';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';
const LOAD_REQUEST = 'LOAD_REQUEST';

const initialState = {
    data: null,
    loading: false,
    error: null,
    products: [],
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                search: null
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload ? action.payload.map(product => product.brand.toLowerCase()) : null,
                error: null
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                data: null
            };
        default:
            return state;
    }
}

// Saga
 function* fetchProductsSaga() {
    debugger;
    try {
        yield put(requestForProducts());
        const data = yield call(() => {
                return fetch("http://demo1656942.mockable.io/products.json")
                    .then(res => res.json())
            }
        );
        yield put(requestProductSuccess(data));
    } catch (error) {
        yield put(requestProductError());
    }
}

// Action Creators
export const requestProduct = () => {
    return { type: 'LOAD_PRODUCT_ASYNC' }
};

const requestForProducts = () => ({
    type: LOAD_REQUEST
});


const requestProductSuccess = (data) => {
    return { type: 'LOAD_SUCCESS', payload: data.hasOwnProperty('products') && data.products}
};

const requestProductError = () => {
    return { type: 'LOAD_FAILURE' }
};


export function* watchRequest() {
    yield takeLatest(LOAD_PRODUCT_ASYNC, fetchProductsSaga);
}











// const watchFetchProduct = () => {
//     return { type: 'FETCHED_PRODUCT' }
// };
