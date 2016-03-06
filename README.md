myon
=========
[![Code Climate](https://codeclimate.com/github/paidgeek/myon/badges/gpa.svg)](https://codeclimate.com/github/paidgeek/myon)

Fetching MySQL schema for validation purposes.

## Installation
```
  $ npm install myon --save
```
## Example
```javascript
  var myon = require('myon');

  myon.getDatabaseSchema({
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        database: 'social'
     },
     function(schema) {
        console.log(schema["users"]["userId"];
        // prints
        // { type: 'varchar(25)',
        //   notNull: true,
        //   key: 'PRI',
        //   defaultValue: null,
        //   extra: '' }
     });
```
