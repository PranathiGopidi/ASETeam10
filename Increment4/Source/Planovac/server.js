var express = require('express');
var e = [];
var f = 1;
var t = "01 01 * * *";
var nodemailer = require("nodemailer");
var app=express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://root:root@ds127260.mlab.com:27260/planovac';

MongoClient.connect(url, function(err, db) {

    var cursor = db.collection('users').find();
    cursor.each(function(err, doc){


        for(var i in doc) {
            if(i == "email"){
                e = e + doc[i] + ",";
            }

        }

    });
});
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "planovacapp@gmail.com",
        pass: "planovac1234"
    }
});
var schedule = require('node-schedule');
schedule.scheduleJob(t, function(req, res){
    var mailOptions={
        to : e,
        subject : 'Class Alert',
        text : 'Hello User,'
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});
app.listen(8081,function(){
    console.log("Express Started on Port 3000");
});