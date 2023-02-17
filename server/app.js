const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this domain
};


// midelware
app.use(cors(corsOptions));
// parse application/json
app.use(bodyParser.json())


// connect to data base
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hassan12",
    database: 'sys'
});


// Roting
// اضافة الموظفين
app.post('/users', (req, res) => {
    const {name , motherName , status, sex , birthdate, education, address,note} = req.body;
    const sql = 'INSERT INTO n (name , motherName , status, sex , birthdate, education, address,note) VALUES (?, ?, ?,?,?,?,?,?)';
    connection.query(sql, [name , motherName , status, sex , birthdate, education, address,note], (err, result) => {
        if (err) throw err;
        res.json("User added successfully");
    });
});


// قراءة جميع الموظفيين
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM n';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


//قراءة موظف واحد  عن طريق  الرقم الوظيفي
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM n WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//تحديث بيانات موظف واحد
app.put('/users/:id', (req, res) => {
    const { name , motherName , status, sex , birthdate, education, address,note} = req.body;
    const id = req.params.id;
    const sql = 'UPDATE n SET name = ? , motherName = ? , status = ? , sex = ? , birthdate = ? , education = ?, address = ? , note = ? WHERE id = ?';
    connection.query(sql, [name , motherName , status, sex , birthdate, education, address,note, id], (err, result) => {
        if (err) throw err;
        res.json('User updated successfully');
    });
});


// حذف موظف من قاعدة البيانات
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM n WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});

app.listen(port, () => {
    console.log('Server started on port',port);
});




// المشاكل 
// التاريخ 
// عدم تحديث السلكت
// عدم وظع عداد
// جلب البيانات
// اكمال بقية الصفحات