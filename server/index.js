const express = require("express")
var bodyParser = require('body-parser');
const mysql = require("mysql")
// const path = require("path");
const cons = require("consolidate");
const app = new express()
// app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.static(__dirname + '/public'));



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




app.post("/upload",(req,res)=>{
    const rollnumber = req.body.rollnumber
    const date = req.body.date
    const hour = req.body.hour
    const status = req.body.status
    console.log(rollnumber)
    res.send("Success")
})




app.get("/login",(req,res)=>{
    console.log("Dei")
    res.send("login")
});

app.get("/admin",(req,res)=>{
    if(req.body.username=="sanjay457"  && req.body.password=="123456") localStorage.setItem("auth")
    if(localStorage.getItem('auth')) res.render('admin.ejs');
    else res.redirect("/login")
})
app.post("/admin",(req,res)=>{
    if(req.body.username=="sanjay457"  && req.body.password=="123456") localStorage.setItem("auth","true")
    if(localStorage.getItem('auth')) res.render('admin.ejs');
    else res.redirect("/login")
})

app.get("/logout",(req,res)=>{
    localStorage.removeItem("auth");
    res.redirect("/admin")
})

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
app.get("/",(req,res)=>{
    console.log("Riksi Access")
    res.send("Jobi");
})
// app.get("/",(req,res)=>{
//     let sql="select * from movies";
//     con.query(sql,(err,result)=>{
//         if(err) throw err;
//         var r=result[0]
//         var len=result.length;
//         var movies=new Array();
//         for(var i=0;i<len;i++){
//             r=result[i]
//             var data={
//                 name : r.name,
//                 storyline : r.storyline,
//                 directors :  r.directors,	
//                 writers: r.writers,
//                 productionCompany:r.productionCompany,	
//                 rating:r.rating,	
//                 releaseDate :r.releaseDate,
//                 stars :r.stars,
//                 length:r.length,
//                 genre: r.genre	
//             }
//             movies[i]=data;
//         }
//         shuffle(movies)
//         res.render('home',{movies:movies})
        
//     })
    
// })

app.post("/insert",(req,res)=>{

    let sql = "insert into tamilmovies.movies (name,storyline,directors,writers,productionCompany,rating,releaseDate,stars,length,genre) values (?,?,?,?,?,?,?,?,?,?)"
    con.query(sql,[req.body.name,req.body.storyline,req.body.directors,req.body.writers,req.body.productioncompany,req.body.rating,req.body.releasedate,req.body.stars,req.body.length,req.body.genre], function (err, result) {
      if (err) console.log(err);
      console.log("Done");
    res.redirect("/admin")
  });

})


app.post("/find",(req,res)=>{
    let sql="select * from movies where name='"+req.body.name+"'";
    con.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.render("nope")
        }
        var r=result[0]
        var len=result.length;
        var movies=new Array();
        for(var i=0;i<len;i++){
            r=result[i]
            var data={
                name : r.name,
                storyline : r.storyline,
                directors :  r.directors,	
                writers: r.writers,
                productionCompany:r.productionCompany,	
                rating:r.rating,	
                releaseDate :r.releaseDate,
                stars :r.stars,
                length:r.length,
                genre: r.genre	
            }
            movies[i]=data;
        }
        res.render('home',{movies:movies})
        

    })

    
})