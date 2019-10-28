import AwesomeDebouncePromise from 'awesome-debounce-promise';

const API = "http://demo1656942.mockable.io/products.json";

    const fetchMovies = () => fetch(API)
        .then(products => products.json());

export default {
    fetchMovies: AwesomeDebouncePromise(fetchMovies, 1000)
};