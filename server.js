/*
API Basejump: Timestamp microservice
User stories:
1) I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)
2) If it does, it returns both the Unix timestamp and the natural language form of that date.
3) If it does not contain a date or Unix timestamp, it returns null for those properties.
Example usage:
https://timestamp-ms.herokuapp.com/December%2015,%202015
https://timestamp-ms.herokuapp.com/1450137600
Example output:
{ "unix": 1450137600, "natural": "December 15, 2015" }
*/
var express = require("express");
var app     = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config  = require("./config/config.js");


var months = [  "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"]


app.get("/*", function(req, res){
    var shortValue = (req.url).toString().slice(1 )  ;
    var responseObject = {};
    try{
        var urlDate = new Date( shortValue * 1000 ); 
        if (urlDate == "Invalid Date"){urlDate = new Date( shortValue.replace("%20", " ") )};
        if (urlDate == "Invalid Date"){urlDate = "null" };

        responseObject.unix     = (urlDate.valueOf() /1000) ;
        responseObject.natural  = `${months[urlDate.getMonth()] } ${urlDate.getDate()}, ${urlDate.getFullYear()}`;
    }catch(err){
        if(err){console.error(err)};
        var urlDate = null ;
        responseObject.unix     = urlDate;
        responseObject.natural  = urlDate;
    }

    res.send(responseObject);
});

app.listen(config.port, function(){
    console.log("listening on port: " + config.port );
});