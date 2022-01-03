const Settings = require('../models/Settings');
const admin = require('firebase-admin');

//SI EL TOKEN CAMBIA SIN QUE EL USUARIO ENTRE A LA PAGINA ESTO HARIA QUE NO SE LE ENVIE LA NOTIFICACION, LO CUAL ES UN PROBLEMON
//VER SI PUEDO SOLUCIONAR DE ALGUNA MANERA, Y SI NO ES UN IMPEDIMENTO Y YA

  module.exports = {
    intervalFunc: async () => {

        try {

            const settings = await Settings.find({"notification.active":true, "notification.token" : {"$exists" : true, "$ne" : ""}}); 
        
            let dateNow = new Date()            

            const filteredSettings = settings.filter(({notification})=>(
                                                                    notification.time.getHours()===dateNow.getHours() && 
                                                                    notification.time.getMinutes()===dateNow.getMinutes()
                                                    ))

                                                    
            const registrationTokens = filteredSettings.map((settings)=>(settings.notification.token))
           
            const message = {

                tokens: registrationTokens,  
            };

            if(registrationTokens.length!==0){

                admin.messaging().sendMulticast(message)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log('Error occurred while sending push', error);
                    });
            }else {
                console.log('No reg tokens at this time')
            }

            

        } catch (error) {
            console.log(error)
        }
        
      }
  };
  