//Rest API demo in Node.js
var express = require('express');//require the express framework
var app = express();
var fs = require('fs');

//Endpoint to get a list of users
app.get('/getusers', function(req, res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data);//you can also use res.send()
    });
})

//Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("RESTnAPI demo app listening at http://%s:%s",host,port)

})