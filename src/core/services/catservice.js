import api from "./apiconfig";
var url = "https://192.168.100.39:7126/api" ;
export default {

    Estados() {
        return  api().get("https://192.168.100.39:7126/api"  +'/filters/states').then(result => {
            if(result.status == 200){
                return result.data
            }

            return null;
        });
    },
    Municipios(id){
        return  api().get("https://192.168.100.39:7126/api"  + '/filters/cities?id=' + id,).then(result => {
            return result.data
        }).catch(error=>{
            return error;
        });
    },
    TipoInmuebles(){
        return   api().get("https://192.168.100.39:7126/api"  + '/filters/propertytype').then(result => {
            if (result.status == 200) {
                return result.data;
            }

            return null
        });
    },
    RangoPrecios(){
        return [
            {id: 1, description: '500,000'},
            {id: 2, description: '1,000,000'},
            {id: 3, description: '2,000,000'},
            {id: 4, description: '3,000,000'},
            {id: 5, description: '4,000,000'},
            {id: 6, description: '5,000,000'},
            {id: 7, description: '6,000,000'},
            {id: 8, description: '7,000,000'},
            {id: 9, description: '8,000,000'},
            {id: 10, description: '9,000,000'},
        ];
        // return  api().get('/filters/').then(result => {
        //     return [
        //         {id: 1, description: '1,000,000'},
        //         {id: 2, description: '2,000,000'},
        //         {id: 3, description: '3,000,000'},
        //         {id: 4, description: '4,000,000'},
        //         {id: 5, description: '5,000,000'},
        //         {id: 6, description: '6,000,000'},
        //         {id: 7, description: '7,000,000'},
        //         {id: 8, description: '8,000,000'},
        //         {id: 9, description: '9,000,000'},
        //         {id: 10, description: '10,000,000'},
        // ]
        // }).catch(error=>{
        //     return error;
        // });
    },
    Habitaciones(){
        return  api().get("https://192.168.100.39:7126/api"  + '/filters/bedrooms').then(result => {
            if (result.status == 200) {
                return result.data;
            }

            return null
            
        }).catch(error=>{
            return error;
        });
    },
    EtapaProcesal(){
        return  api().get("https://192.168.100.39:7126/api"  + '/filters/proceduralStage').then(result => {
            return result.data
        }).catch(error=>{
            return error;
        });
    },
    Banios(){
        return  api().get('/filters/fullbathrooms').then(result => {
            if (result.status == 200) {
                
                return result.data;
            }

            return null
        }).catch(error=>{
            return error;
        });
    },
    Occupations(){
        return  api().get("https://192.168.100.39:7126/api"  + '/filters/occupations').then(result => {
            return result.data
        }).catch(error=>{
            return error;
        });
    },
    Maritalstatus(){
        return  api().get("https://192.168.100.39:7126/api"  +  '/filters/maritalstatus').then(result => {
            return result.data
        }).catch(error=>{
            return error;
        });
    },

}