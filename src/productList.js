import axios from 'axios';

export const getProductList = async() => {
    const { data }  = await axios.get('https://dummyjson.com/products');
    return data;
}