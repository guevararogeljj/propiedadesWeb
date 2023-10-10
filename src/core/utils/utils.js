export default {

    setAllPropsObject(obj, val) {
        Object.keys(obj).forEach((prop) => (obj[prop] = val));
    },
    
    currencyFormart(number) {
        let currencESLocale = Intl.NumberFormat("es-MX");
        const price = currencESLocale.format(number, {
          style: "currency",
          currency: "USD",
        });
        return `$${price}`;
      },
      cloneObject(obj){
        return JSON.parse(JSON.stringify(obj));
      }
}