var mysql = require('mysql');

var connection = mysql.createConnection({
   host: '33.33.33.1',
   user: 'root',
   password: 'root',
   database: 'food',
   multipleStatements: true
});

connection.connect();

var sql = "";

connection.query("SHOW TABLES", function(err, tables) {
   if (err) {
      console.log(err.stack);
   }

   for (var i = 0; i < tables.length - 48; i++) {
      var tableName = tables[i]["Tables_in_food"];

      sql += "SHOW COLUMNS FROM `" + tableName + "`;\n";
   }
}).on("end", function() {
   console.log(sql);

   connection.query(sql, function(err, results) {
      if (err) {
         console.log(err.stack);
      }

      for (var i = 0; i < results.length; i++) {
         var result = results[i];

         for (var j = 0; j < result.length; j++) {
            var column = result[j];

            console.log(column);
         }
      }
   });
});
