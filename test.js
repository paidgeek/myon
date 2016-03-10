var myon = require("myon");

myon.getDatabaseSchema({
      host: 'hostIp',
      user: 'user',
      password: 'password',
      database: 'database'
   },
   function(schema) {
      console.log(schema);

      //console.log(schema["table"]["column"]);
   });
