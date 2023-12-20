import api from "./apiconfig";

export default {

    send(data) {
        return api().post(import.meta.env.VITE_APP_ROOT_API  + '/contact', data).then(result => {
            if (result.status == 200) {
                if (result.data.success) {
                    return result.data;
                } else {
                    return result.data;
                }
            }
            else {
                return {success: false,  message: 'Valida los datos que nos estas proporcionando.'};
            }
        }).catch(error => {
            console.log(error.message)
            return {success: false,  message: 'Valida los datos que nos estas proporcionando.'};
        });

    },
    share(email,creditnumber) {
        return api().get(import.meta.env.VITE_APP_ROOT_API  + `/contact/shareproperty?email=${email}&creditnumber=${creditnumber}`).then(result => {
            if (result.status == 200) {
                if (result.data.success) {
                    return result.data;
                } else {
                    return result.data;
                }
            }
            else {
                // console.log(result.data)
                return null;
            }
        }).catch(error => {
            return error;
        });
    },
    requestinfo(email,creditnumber) {
        return api().get("https://192.168.100.39:7126/api"  + `/contact/requestinformation?email=${email}&reference=${creditnumber}`).then(result => {
            if (result.status == 200) {
                if (result.data.success) {
                    return result.data;
                } else {
                    return result.data;
                }
            }
            else {
                // console.log(result.data)
                return null;
            }
        }).catch(error => {
            return error;
        });

    },

}