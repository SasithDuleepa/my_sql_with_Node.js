const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"test_db"
});
con.connect(function(err){
    if(err) throw err;
    console.log('database connectted!!');
});

//create table
app.post("/table/create", (req,res)=>{
    const DBname = req.body.DBname;
    var sql = `CREATE DATABASE ${DBname}`;
    con.query(sql, (err)=>{
        if(err) throw err;
        res.send('database created!');       
    });
});

//save data
app.post("/save", (req,res)=>{
    const name = req.body.name;
    const address= req.body.address;
    var sql = `INSERT INTO customers (name,address) VALUES ('${name}', '${address}')`;
    con.query(sql, (err)=>{
        if(err) throw err;
        res.send('data inserted!');
        })
});

//find all
app.get("/findall",(req,res)=>{
    const DB = req.body.database;
    con.query(`SELECT * FROM ${DB}`, function (err, result, fields){
        if(err) throw err;
        res.send(result)
        console.log(result);
    });
});

//find one
app.get("/find",(req,res)=>{
    const name = req.body.name;
    con.query(`SELECT * FROM customers WHERE name = '${name}'`, function (err, result, fields){
        if(err) throw err;
        res.send(result)
        console.log(result);
    });
});

//find order by
app.get("/find/order",(req,res)=>{
    const column = req.body.column;
    con.query(`SELECT * FROM customers ORDER BY ${column}`, function (err, result, fields){
        if(err) throw err;
        res.send(result);
        console.log(result);
    });
});

//delete data
app.delete("/data",(req,res)=>{
    const name = req.body.name;
    con.query(`DELETE FROM customers WHERE name = '${name}'`, function (err, result, fields){
        if(err) throw err;
        res.send(result)
        console.log(result);
    });
});

//delete table
app.delete("/delete/table",(req,res)=>{
    const table = req.body.table;
    con.query(`DROP TABLE ${table}`, function (err, result, fields){
        if(err) throw err;
        res.send("table deleted!")
        console.log(result);
    });
});

//update data
app.post("/update",(req,res)=>{
    const oldname = req.body.oldname;
    const newname = req.body.newname;
    con.query(`UPDATE customers set name = '${newname}' WHERE name = '${oldname}'`, function (err, result, fields){
        if(err) throw err;
        console.log(result);
    });
});

//first 5 data 
app.get("/first5",(req,res)=>{
    con.query("SELECT * FROM customers LIMIT 5", function (err, result, fields){
        if(err) throw err;
        res.send(result);
        console.log(result);
    });
});

//joins


app.listen(8080,(()=>{
    console.log('server is runnong on port 8080!!!')
}))

