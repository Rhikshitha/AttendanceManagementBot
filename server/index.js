const express = require("express")
var bodyParser = require('body-parser');
const mysql = require("mysql")
const cons = require("consolidate");
const app = new express()
app.use(bodyParser.urlencoded({extended:true}))

var con = mysql.createConnection({
    host: "localhost",
    port:"4306",
    user: "root",
    password: "",
    database:"hackabot"
  });
  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  });


app.listen(5555)

function convertDateFormat(dateString) {
    var dateParts = dateString.split("/");
    var year = dateParts[2];
    var month = dateParts[1];
    var day = dateParts[0];
    var convertedDate = year + "-" + day + "-" + month;
    return convertedDate;
}

app.post("/upload",(req,res)=>{
    
    console.log(req.body);
    console.log("Called");
    const rollnumber = req.body.rollnumber
    let date = req.body.date
    const hour = req.body.hour
    const status = req.body.status
    var convertedDate = convertDateFormat(date.substring(0,10));
    // date=convertedDate.substring(0,11)
    console.log(convertedDate);
    let sql = "insert into hackabot.attendance_transactions (roll_no,date,hour,status) values (?,?,?,?)"
    con.query(sql,[rollnumber,convertedDate,hour,status], function (err, result) {
      if (err) console.log(err);
      console.log("Done");
    }
    )
    
    res.send("Success")
})
