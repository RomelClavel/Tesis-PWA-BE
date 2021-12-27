const Settings = require('../models/Settings');
const admin = require('firebase-admin');

//SI EL TOKEN CAMBIA SIN QUE EL USUARIO ENTRE A LA PAGINA ESTO HARIA QUE NO SE LE ENVIE LA NOTIFICACION, LO CUAL ES UN PROBLEMON
//VER SI PUEDO SOLUCIONAR DE ALGUNA MANERA, Y SI NO ES UN IMPEDIMENTO Y YA

  module.exports = {
    intervalFunc: async () => {

        try {

            const settings = await Settings.find({"notification.active":true, "notification.token" : {"$exists" : true, "$ne" : ""}}); 
        
            let dateNow = new Date()
            console.log()
            
            const filteredSettings = settings.filter(({notification})=>(
                                                                    notification.time.getHours()===dateNow.getHours() && 
                                                                    notification.time.getMinutes()===dateNow.getMinutes()
                                                    ))

                                                    
            const registrationTokens = filteredSettings.map((settings)=>(settings.notification.token))
            console.log(registrationTokens)

           
            /*
            const payload = {
                notification: {
                    title: 'Reminder',
                    body: 'Jaja'
                }
            };
            const options = {
                priority: 'high'
            };
            */

            const message = {

                notification: {
                    
                    title:"PWA Card Diary Tesis",
                    body: 'Here is a notification body!',
                },
                icon: 'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/95/22/9d/95229d6e-621b-ec09-6564-205b924aa380/source/200x200bb.jpg',
                tokens: registrationTokens,
                
            };

            admin.messaging().sendMulticast(message)
                .then(response => {
                    console.log(response.responses[0].error);
                })
                .catch(error => {
                    console.log('Error occurred while sending push', error);
                });
            

        } catch (error) {
            console.log(error)
        }
        
      }
  };
  