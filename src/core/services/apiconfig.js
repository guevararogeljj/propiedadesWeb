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
            baseURL: process.env.VUE_APP_ROOT_API,
        //      headers: { 'Access-Control-Allow-Origin': 'https://apimarketplaceqa.finastrategy.mx', 
        //      'Content-Type' : 'application/json' 
        // },
            // params:
            // withCredentials:true,    
            
        }
    );
}