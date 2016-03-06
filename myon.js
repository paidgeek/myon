var mysql = require('mysql');

var connection = mysql.createConnection({
   host: '33.33.33.1',
   user: 'root',
   password: 'root',
   database: 'food',
   multipleStatements: true
});

connection.connect();

var tableNames = [];
var sql = "";

connection.query("SHOW TABLES", function(err, tables) {
   if (err) {
      console.log(err.stack);
   }

   for (var i = 0; i < tables.length - 47; i++) {
      var tableName = tables[i]["Tables_in_food"];

      tableNames.push(tableName);
      sql += "SHOW COLUMNS FROM `" + tableName + "`;\n";
   }
}).on("end", function() {
   connection.query(sql, function(err, rows, fields) {
      if (err) {
         console.log(err.stack);
      }

      var myon = {};

      if (tableNames.length == 1) {
         var name = tableNames[0];
         myon[name] = {};

         for (var i in rows) {
            var field = rows[i].Field;

            myon[name][field] = {
               type: rows[i].Type,
               notNull: rows[i].Null == "NO",
               key: rows[i].Key,
               defaultValue: rows[i].Default,
               extra: rows[i].Extra
            };
         }
      } else if (tableNames.length > 1) {
         for (var i in rows) {
            var name = tableNames[i];
            myon[name] = {};

            console.log(rows[i]);

            myon[name]["field"] = rows[i].Field;
            myon[name]["type"] = rows[i].Type;
            myon[name]["notNull"] = rows[i].Null == "NO";
            myon[name]["key"] = rows[i].Key;
            myon[name]["default"] = rows[i].Default;
            myon[name]["extra"] = rows[i].Extra;
         }
      }

      console.log(myon["fc_celiac_members"]["CODE"]);

      console.log("-- MYON --");
      console.log(myon);
   });
});
