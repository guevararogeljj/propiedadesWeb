import axios from 'axios'
import cookie from '@/core/utils/cookieByName'
import store from '@/store/index'

export default () => {
    axios.defaults.headers.common["X-XSRF-TOKEN"] = cookie('XSRF-REQUEST-TOKEN');
    axios.defaults.headers.common["_requesttoken"] = store.state.requesttoken;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = '*';
    axios.defaults.withCredentials = true;
    if(store.state.isLogin){
        axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}` ;
    }

    return axios.create(
        {
            baseURL: "https://192.168.100.39:7126/api" ,
        }
    );
}