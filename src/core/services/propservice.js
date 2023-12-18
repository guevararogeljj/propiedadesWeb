import api from "./apiconfig";

export default {
  Propiedades() {
    return api()
      .get("https://apipropiedadesqa.finastrategy.mx/api" + "/properties")
      .then((result) => {
        if (result.status == 200) {
          // console.log(result)
          return result.data;
        }
      })
      .catch((error) => {
        return error;
      });
  },
  PropertiesRange(page, items, params, order) {
    try {
      let propertyType = params.propertytype;
      let state = params.state;
      let municipality = params.municipality;
      let price = params.price;
      let rooms = params.rooms;
      let bathrooms = params.bathrooms;
      let proceduralStage = params.proceduralStage;
      let oportunity = params.oportunity;
      let isCarrusel = params.isCarrusel;

      const data = {
        pageNumber: page,
        pageSize: items,
        propertyType: propertyType != "" ? propertyType : null,
        state: state != "" ? state : null,
        municipality: municipality != "" ? municipality : null,
        price: price != "" ? price : null,
        rooms: rooms != "" ? rooms : null,
        bathrooms: bathrooms != "" ? bathrooms : null,
        proceduralStage: proceduralStage != "" ? proceduralStage : null,
        oportunity: oportunity != "" ? oportunity : false,
        isCarrusel: isCarrusel != "" ? isCarrusel : false,
      };

      return api()
        .post("https://apipropiedadesqa.finastrategy.mx/api" + `/properties/range`, data)
        .then((result) => {
          if (result.status == 200) {
            if (result.data.success) {
              return result.data;
            } else {
              return result.data;
            }
          } else {
            return null;
          }
        })
        .catch((error) => {
          return error;
        });
    } catch (ex) {
      console.log(ex);
      return null;
    }
  },
  // PropertiesRange(page, items, params,order) {
  //     let url = "https://apipropiedadesqa.finastrategy.mx/api"  + `/properties/range?index=${page}&items=${items}`;
  //     // console.log(order)
  //     if (order) {
  //         url = url + `&order=${order}`;
  //     }
  //     const names = Object.getOwnPropertyNames(params);
  //     names.forEach(element => {
  //         let addparam = `&${element}=${params[element]}`;

  //         url = url + addparam;
  //     });

  //     return  api().get(url).then(result => {
  //         if(result.status == 200)
  //         {
  //             // console.log('PropertiesRange', result)
  //             return result.data;
  //         }
  //     }).catch(error=>{
  //         return error;
  //     });

  // },
  PropertyDetails(id) {
    return api()
      .get("https://apipropiedadesqa.finastrategy.mx/api" + `/properties/details?id=${id}`)
      .then((result) => {
        if (result.status == 200) {
          // console.log(result)
          return result.data;
        }
      })
      .catch((error) => {
        return error;
      });
  },
  legaldata(id) {
    return api()
      .post("https://apipropiedadesqa.finastrategy.mx/api" + `/properties/legaldetails`, id)
      .then((result) => {
        if (result.status == 200) {
          return result.data.result;
        }
      })
      .catch((error) => {
        return error;
      });
  },
};
