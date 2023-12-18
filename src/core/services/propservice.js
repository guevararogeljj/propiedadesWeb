import api from "./apiconfig";

export default {

    Propiedades() {
        return  api().get("https://apipropiedadesqa.finastrategy.mx/api"  + '/properties').then(result => {
            if(result.status == 200)
            {
                // console.log(result)
                return result.data;
            }
        }).catch(error=>{
            return error;
        });

    },
    PropertiesRange(page, items, params,order) {
        let url = "https://apipropiedadesqa.finastrategy.mx/api"  + `/properties/range?index=${page}&items=${items}`;
        // console.log(order)
        if (order) {
            url = url + `&order=${order}`;
        }
        const names = Object.getOwnPropertyNames(params);
        names.forEach(element => {
            let addparam = `&${element}=${params[element]}`;
            
            url = url + addparam;
        });

        return  api().get(url).then(result => {
            if(result.status == 200)
            {
                // console.log('PropertiesRange', result)
                return result.data;
            }
        }).catch(error=>{
            return error;
        });

    },
    PropertyDetails(id)
    {
        return  api().get("https://apipropiedadesqa.finastrategy.mx/api"  + `/properties/details?id=${id}`).then(result => {
            if(result.status == 200)
            {
                // console.log(result)
                return result.data;
            }
        }).catch(error=>{
            return error;
        });

    },
    legaldata(id)
    {
        return  api().post("https://apipropiedadesqa.finastrategy.mx/api"  + `/properties/legaldetails`,id).then(result => {
            if(result.status == 200)
            {
                return result.data.result;
            }
        }).catch(error=>{
            return error;
        });

    }

}