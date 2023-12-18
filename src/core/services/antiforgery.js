import api from "./apiconfig";

export default {

    get() {
        const url = "https://apipropiedadesqa.finastrategy.mx/api"  + '/antiforgery';
        return api().get(url).then(result => {
            if (result.status == 200) {
                if (result.data.success) {


                    return result.data.result;
                } else {
                    return null;
                }
            }
            else {
                // console.log(result.data)
                return null;
            }
        }).catch(error => {
            return error;
        });

    }
}