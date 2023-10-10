import api from "./apiconfig";

export default {

    get() {
        return api().get('/antiforgery').then(result => {
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