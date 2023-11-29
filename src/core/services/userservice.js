import api from "./apiconfig";

export default {

    signup(data) {
        return api().post("https://192.168.100.36:7126/api"  + '/signup', data).then(result => {
            if (result.status == 200) {
                // console.log(result.data)
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

    codephone(data) {
        try {
            return api().post("https://192.168.100.36:7126/api"  + '/signup/sendcodesms', data).then(result => {
                if (result.status == 200) {
                    if (result.data.success) {
                        return result.data;
                    } else {
                        return result.data;
                    }
                }
                else {
                    return null;
                }

            }).catch(error => {
                return error;
            });
        }
        catch (ex) {
            console.log(ex)
            return null
        }

    },
    validatecodephone(data) {
        try {
            return api().post("https://192.168.100.36:7126/api"  + '/signup/validatecodesms', data).then(result => {
                if (result.status == 200) {
                    // console.log('api')
                    // console.log(result)
                    if (result.data.success) {
                        // console.log("true success")
                        return result.data;
                    } else {
                        return result.data;
                    }
                }
                else {
                    return null;
                }

            }).catch(error => {
                return error;
            });
        }
        catch (ex) {
            console.log(ex)
            return null
        }

    },

    validateidentification(data) {
        try {
            return api().post('/signup/validateidentification', data).then(result => {
                if (result.status == 200) {
                    if (result.data.success) {
                        return result.data;
                    } else {
                        return result.data;
                    }
                }
                else {
                    return null;
                }

            }).catch(error => {
                return error;
            });
        }
        catch (ex) {
            console.log(ex)
            return null
        }

    },
    validatedata(data) {
        try {
            return api().post("https://192.168.100.36:7126/api"  + '/signup/userinformation', data).then(result => {
                if (result.status == 200) {
                    if (result.data.success) {
                        return result.data;
                    } else {
                        return result.data;
                    }
                }
                else {
                    return null;
                }

            }).catch(error => {
                return error;
            });
        }
        catch (ex) {
            console.log(ex)
            return null
        }

    },

    updatedata(data) {
        try {
            return api().post("https://192.168.100.36:7126/api"  + '/signup/confirmuserinformation', data).then(result => {
                if (result.status == 200) {
                    if (result.data.success) {
                        return result.data;
                    } else {
                        return result.data;
                    }
                }
                else {
                    return null;
                }

            }).catch(error => {
                return error;
            });
        }
        catch (ex) {
            console.log(ex)
            return null
        }

    },
    emailvalidation(email, code) {
        try {
            return api().get("https://192.168.100.36:7126/api"  + `/signup/emailvalidation?email=${email}&code=${code}`).then(result => {
                if (result.status == 200) {
                    if (result.data.success) {
                        return result.data;
                    } else {
                        return result.data;
                    }
                }
                else {
                    return null;
                }

            }).catch(error => {
                return error;
            });
        }
        catch (ex) {
            console.log(ex)
            return null
        }

    },
    sendcodeemail(data) {
        try {
            return api().post(`/signup/sendcodeemail`,data).then(result => {
                if (result.status == 200) {
                    if (result.data.success) {
                        return result.data;
                    } else {
                        return result.data;
                    }
                }
                else {
                    return null;
                }

            }).catch(error => {
                return error;
            });
        }
        catch (ex) {
            console.log(ex)
            return null
        }

    },


}