const moment = require("moment");

//Helper para validar fechas validas y que existan
const isDate = ( value  ) => {

    if ( !value ) {
        return false;
    }

    const date = moment (value);

    if ( date.isValid() ) {
        return true;
    } else {
        return false;
    }

}


module.exports = { isDate };