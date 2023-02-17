const express = require('express');
const mysql = require('mysql')
require('dotenv').config()

const app = express();
const port = process.env.PORT;

// middleware
app.use((req, res, next) => {

})


// routes
app.get('/', (req,res) => {
    res.json({msg: "hi from node js"})
})

var con = mysql.createPool({
  host: "sql.freedb.tech",
  user: "freedb_hassan-hr",
  password: "A?@m2t7xXQm$JYn",
  database: "freedb_hr-project"
});


con.getConnection(function(err) {
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
      ['hasan', 'Highway 71'],
      ['Peter', 'Lowstreet 4'],
      ['Amy', 'Apple st 652'],
      ['Hannah', 'Mountain 21'],
      ['Michael', 'Valley 345'],
      ['Sandy', 'Ocean blvd 2'],
      ['Betty', 'Green Grass 1'],
      ['Richard', 'Sky st 331'],
      ['Susan', 'One way 98'],
      ['Vicky', 'Yellow Garden 2'],
      ['Ben', 'Park Lane 38'],
      ['William', 'Central st 954'],
      ['Chuck', 'Main Road 989'],
      ['Viola', 'Sideway 1633']
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });


// listen
app.listen(port, () => {
    console.log('the server listen at port!!', port);
})

