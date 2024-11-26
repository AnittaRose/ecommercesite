const usertype = require('../models/users_type')
'use strict';

module.exports = {
  up: (models, mongoose) => {
   
      return models.usertypes.insertMany([  ///seed all cheyan
        {
          _id : "67250c599f68d83a464cce3b",
          user_type :"Admin"
        },
        {
          _id : "67250cd39f68d83a464cce3d",
          user_type : "Buyer"
        },
        {
          _id:"67250d0b9f68d83a464cce3f",
          user_type:"Seller"
        },
         
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    
      return models.usertypes.deleteMany({ //undo cheayn

        _id : {
          $in :[
            "67250c599f68d83a464cce3b",
            "67250cd39f68d83a464cce3d",
            "67250d0b9f68d83a464cce3f"
          ]
            
          
        }

      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  
  }
};
