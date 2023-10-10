import usersignin from "@/core/services/usersignin";
import { createStore } from "vuex";


const store = createStore({
    state() {
        return {
            isLogin: false,
            isLoading: false,
            isError: false,
            dataTemp: {},
            email: '',
            cellphone: '',
            username: '',
            userdata: {},
            token: '',
            requesttoken: '',
            messageErrors: '',
            checkpoint: {
                back: false,
                lastPath: '',
                id: null
            },
            isLoginPropiedades: false,
            alertDialogMain: {
                show: false,
                type: '',
                title: '',
                body: {}
            },
            tokenname: "pqowpqow",
            filterSaved: null,
            camera: { frontal: null, tracera: null }
        }
    },
    getters: {
        get_isLoginPropiedades(state) { return state.isLoginPropiedades },
        get_alertDialogMain(state) { return state.alertDialogMain },
        getRequestsaved(state) { return state.filterSaved; },
        getCamera(state) { return state.camera; }
    },
    mutations: {
        LOGIN_SUCCESS(state, data) {
            state.isLogin = true
            state.userdata = data
        },
        LOGOUT(state) {
            state.isLogin = false;
            state.dataTemp = {};
            state.email = '';
            state.cellphone = '';
            state.username = '';
            state.userdata = {};
            state.token = '';
            localStorage.removeItem(state.tokenname);

        },
        setCheckPoint(state, data) {
            //console.log('setCheckPoint.data', data);
            state.checkpoint.back = data.back;
            state.checkpoint.lastPath = data.lastPath;

        },
        SET_OPEN_DIALOG_LOGIN(state, islogin) {
            state.isLoginPropiedades = islogin
        },
        SHOW_ALERT_DIALOG_MAIN(state, data) {
            state.alertDialogMain.show = true
            state.alertDialogMain.title = data.title
            state.alertDialogMain.type = data.type
            state.alertDialogMain.message = data.message
        },
        HIDDEN_ALERT_DIALOG_MAIN(state) {
            state.alertDialogMain.show = false
            state.alertDialogMain.title = ''
            state.alertDialogMain.type = ''
            state.alertDialogMain.message = ''
            state.alertDialogMain.body = {}
        },
        async REMOVETOKEN(state) {
            if (!state.islogin) {

                await usersignin.signout({ cellphone: atob(localStorage.getItem(state.tokenname)) });
                localStorage.removeItem(state.tokenname);
            }
        },
        TOKENIDEM(state) {
            if (state.isLogin) {
                localStorage.setItem(state.tokenname, btoa(this.state.cellphone));
            }
        },
        SAVEREQUEST(state, params) {
            state.filterSaved = params;
        },
        SET_FOTO_CAMERA (state, data) {
            state.camera[data.tipo] = data.foto
        },
        DELETE_FOTO_CAMERA (state) {
            state.camera.frontal = null
            state.camera.tracera = null
        }
    },
})


export default store