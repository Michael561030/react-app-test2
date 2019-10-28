
import {takeLatest, put, call} from 'redux-saga/effects'

// actionTypes
const LOAD_PRODUCT_ASYNC = 'LOAD_PRODUCT_ASYNC';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';

const initialState = {
    data: null,
    loading: false,
    error: null,
    products: [],
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PRODUCT_ASYNC:
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
                data: action.data !== undefined ? action.data : null,
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
        yield put(requestProduct());
        const data = yield call(() => {
                return fetch("http://demo1656942.mockable.io/products.json")
                    .then(res => res.json())
            }
        );
        debugger;
        yield put(requestProductSuccess(data));
    } catch (error) {
        yield put(requestProductError());
    }
}

// Action Creators
const requestProduct = () => {
    return { type: 'REQUESTED_PRODUCT' }
};

const requestProductSuccess = (data) => {
    return { type: 'REQUESTED_PRODUCT_SUCCEEDED', url: data.message }
};

const requestProductError = () => {
    return { type: 'REQUESTED_PRODUCT_FAILED' }
};

const fetchProduct = () => {
    return { type: 'FETCHED_PRODUCT' }
};




export function* watchRequest() {
    debugger;
    yield takeLatest(LOAD_PRODUCT_ASYNC, fetchProductsSaga);
}



