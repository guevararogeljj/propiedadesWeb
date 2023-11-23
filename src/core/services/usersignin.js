import api from "./apiconfig";

export default {

    signin(data) {
        return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login', data).then(result => {
           // console.log('LOGIN1')
           // console.log(result)
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
    signout(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/logout', data).then(result => {
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
    profile(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/profile', data).then(result => {
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
    favorites(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/favorites', data).then(result => {
                if (result.status == 200) {
                    // console.log(result)
                    if (result.data.success) {
                        return result.data.result;
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
    addfavorite(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/addfavorite', data).then(result => {
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
    removefavorite(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/removefavorite', data).then(result => {
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
    changepassword(data) {
        return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/changepassword', data).then(result => {
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
    removeallfavorites(data) {
        return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/removeallfavorites', data).then(result => {
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
    changeemail(data) {
        return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/changeemail', data).then(result => {
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

    }, uptfaapp(data) {
        return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/updoubleauth', data).then(result => {
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
    validateuptfaapp(data) {
        return api().post('/login/validatedoubleauth', data).then(result => {
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
    uptfaappstatus(data) {
        return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/updoubleauthstatus', data).then(result => {
            if (result.status == 200) {
                if (result.data.success) {
                    return result.data;
                } else {
                    return result.data;
                }
            }
            else {
                // console.log(result.data);
                return null;
            }
        }).catch(error => {
            return error;
        });
    },
    downtfaappstatus(data) {
        return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/downdoubleauthstatus', data).then(result => {
            if (result.status == 200) {
                if (result.data.success) {
                    return result.data;
                } else {
                    return result.data;
                }
            }
            else {
                // console.log(result.data);
                return null;
            }
        }).catch(error => {
            return error;
        });
    },
    
    codephonechange(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/changecellphonesmscode', data).then(result => {
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

    phonenumberchange(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/changecellphone', data).then(result => {
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
    validatedcodephonechange(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/validatechangecellphonesmscode', data).then(result => {
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
    sendpasswordrecovery(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/signup/sendpasswordrecovery', data).then(result => {
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

    passwordrecovery(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/signup/passwordrecovery', data).then(result => {
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

    addcontractdata(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/addcontractdata', data).then(result => {
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

    ndastatus(data) {
        try {
            return api().post("https://apipropiedadesqa.finastrategy.mx/api"  + '/login/ndastatus', data).then(result => {
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