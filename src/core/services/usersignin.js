import api from "./apiconfig";

export default {

    signin(data) {
        return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/logout', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/profile', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/favorites', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/addfavorite', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/removefavorite', data).then(result => {
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
        return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/changepassword', data).then(result => {
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
        return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/removeallfavorites', data).then(result => {
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
        return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/changeemail', data).then(result => {
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
        return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/updoubleauth', data).then(result => {
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
        return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/updoubleauthstatus', data).then(result => {
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
        return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/downdoubleauthstatus', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/changecellphonesmscode', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/changecellphone', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/validatechangecellphonesmscode', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/signup/sendpasswordrecovery', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/signup/passwordrecovery', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/addcontractdata', data).then(result => {
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
            return api().post(import.meta.env.VITE_APP_ROOT_API  + '/login/ndastatus', data).then(result => {
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

    UpdateDataUser(data) {
        try {
            return api().put(import.meta.env.VITE_APP_ROOT_API  + '/login/UpdateDataUser', data).then(result => {
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