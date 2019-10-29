
import {takeLatest, put, call} from 'redux-saga/effects'

// actionTypes
const LOAD_PRODUCT_ASYNC = 'LOAD_PRODUCT_ASYNC';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';
const LOAD_REQUEST = 'LOAD_REQUEST';

const initialState = {
    products: null,
    loading: false,
    error: null,
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload ? action.payload : null,
                error: null
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                products: null,
                error: action.error

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
        const products = yield call(() => {
                return fetch("http://demo1656942.mockable.io/products.json")
                    .then(res => res.json())
            }
        );
        yield put(requestProductSuccess(products));
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



const requestProductSuccess = (products) => {
    return { type: 'LOAD_SUCCESS', payload: products.hasOwnProperty('products')
        && products.products

    }
};

export const getProducts = products => products.products;


const requestProductError = () => {
    return { type: 'LOAD_FAILURE' }
};

export function* watchRequest() {
    yield takeLatest(LOAD_PRODUCT_ASYNC, fetchProductsSaga);
}












// const watchFetchProduct = () => {
//     return { type: 'FETCHED_PRODUCT' }
// };
