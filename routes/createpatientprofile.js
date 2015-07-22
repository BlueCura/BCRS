var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'aaa',
    database : 'AlzApp'
})

 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });
 


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('createpatientprofile');
});

router.post('/',
    function(request, response) {
        console.log(request.body);
        var firstName = request.body.fname;
        var lastName = request.body.lname;
        var userName = request.body.user_name;
        var passWord = request.body.pass_word;
        var email = request.body.email;
        connection.query({
            sql: "INSERT INTO Patients (FirstName, LastName, UserName, Password,  Email) VALUES (?, ?, ?, ?, ?)",
            timeout: 40000,
            values: [firstName, lastName, userName, passWord, email]
        }, function (error, results, fields) {
                if(error)
                    throw error;
                console.log('sucessfully created entry!!');
                response.send('You have created a profile!');
            });

        
        
    });

module.exports = router;