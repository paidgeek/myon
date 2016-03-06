var myon = require("myon");

myon.getDatabaseSchema({
      host: '33.33.33.1',
      user: 'root',
      password: 'root',
      database: 'food'
   },
   function(schema) {
      console.log(schema);

      console.log(schema["fir_food"]["ORIGFDCD"]);
   });
