var express = require('express');
var nodemailer = require("nodemailer");
var app=express();
/*
   Here we are configuring our SMTP Server details.
   STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "planovacapp@gmail.com",
        pass: "planovac1234"
    }
});
var schedule = require('node-schedule');
schedule.scheduleJob('29 22 * * *', function(req, res){
    var mailOptions={
        to : 'ravalibolem@gmail.com',
        subject : 'Class Alert',
        text : 'Hello User,',
        html : 'Hello User,'+'<br/>'+'You have '+'<b>'+'Advanced Software Engineering '+'</b>'+'class in 15 mins'
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
        /*------------------SMTP Over-----------------------------*/

        /*------------------Routing Started ------------------------*/

app.listen(8081,function(){
    console.log("Express Started on Port 8081");
});

