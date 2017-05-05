var express = require('express');
<<<<<<< HEAD
var nodemailer = require("nodemailer");
var app=express();
/*
   Here we are configuring our SMTP Server details.
   STMP is mail server which is responsible for sending and recieving email.
*/
=======
var e;
var t = "31 00 * * *";
var nodemailer = require("nodemailer");
var app=express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://root:root@ds127260.mlab.com:27260/planovac';

MongoClient.connect(url, function(err, db) {

    var cursor = db.collection('users').find();
    cursor.each(function(err, doc){


        for(var i in doc) {
            if(i == "email"){
                e = doc[i];
                console.log(e);
            }
        }
    });
});
>>>>>>> origin/master
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "planovacapp@gmail.com",
        pass: "planovac1234"
    }
});
var schedule = require('node-schedule');
<<<<<<< HEAD
schedule.scheduleJob('29 22 * * *', function(req, res){
    var mailOptions={
        to : 'ravalibolem@gmail.com',
        subject : 'Class Alert',
        text : 'Hello User,',
        html : 'Hello User,'+'<br/>'+'You have '+'<b>'+'Advanced Software Engineering '+'</b>'+'class in 15 mins'
=======
schedule.scheduleJob(t, function(req, res){
    var mailOptions={
        to : e,
        subject : 'Class Alert',
        text : 'Hello User,'
>>>>>>> origin/master
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
<<<<<<< HEAD
        /*------------------SMTP Over-----------------------------*/

        /*------------------Routing Started ------------------------*/

app.listen(8081,function(){
    console.log("Express Started on Port 8081");
});

=======
app.listen(8081,function(){
    console.log("Express Started on Port 3000");
});
>>>>>>> origin/master
