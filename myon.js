var mysql = require('mysql');

var getDatabaseSchema = function(info, callback) {
   var connection = mysql.createConnection({
      host: info.host,
      user: info.user,
      password: info.password,
      database: info.database,
      multipleStatements: true
   });

   connection.connect();

   var tableNames = [];
   var sql = "";

   connection.query("SHOW TABLES", function(err, tables) {
      if (err) {
         return console.log(err.stack);
      }

      for (var i = 0; i < tables.length; i++) {
         var tableName = tables[i][Object.keys(tables[i])[0]];
         tableNames.push(tableName);
         sql += "SHOW COLUMNS FROM `" + tableName + "`;\n";
      }
   }).on("end", function() {
      connection.query(sql, function(err, rows, fields) {
         if (err) {
            return console.log(err.stack);
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

               for (var j in rows[i]) {
                  var field = rows[i][j].Field;

                  myon[name][field] = {
                     type: rows[i][j].Type,
                     notNull: rows[i][j].Null == "NO",
                     key: rows[i][j].Key,
                     defaultValue: rows[i][j].Default,
                     extra: rows[i][j].Extra
                  };
               }
            }
         }

         callback(myon);
         connection.end();
      });
   });
};

exports.getDatabaseSchema = getDatabaseSchema;
