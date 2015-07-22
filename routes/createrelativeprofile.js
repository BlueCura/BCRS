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
    res.render('createrelativeprofile');
});

router.post('/',
    function(request, response) {
        console.log(request.body);
        var firstName = request.body.fname;
        var lastName = request.body.lname;
        var userName = request.body.user_name;
        var passWord = request.body.pass_word;
        var email = request.body.email;
        var phone = request.body.phone;
        var address = request.body.address;
        var city = request.body.city;
        var zipcode = request.body.zipcode;
        var patientusername = request.body.patientusername
        connection.query({
            sql: "SELECT * FROM Patients WHERE userName = ?",
            timeout: 40000,
            values: [patientusername]
        }, function (error, results, fields) {
                if(error)
                    throw error;
                else{
                	if(results.length == 0){
                		response.send('You did not enter a valid user name for your patient!!! Please Try Again');
                	}
                	else{
                		connection.query({
                			sql: "INSERT INTO Relatives (FirstName, LastName, UserName, Pasword, Email, CellPhone, Address, City, ZipCode, PatientID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                			timeout: 40000,
                			values:[firstName, lastName, userName, passWord, email, phone,address, city, zipcode, results[0].ID]

                		}, function(error, results, fields){
                			if(error)
                				throw error;
                			else
                				response.send("You have sucessfully been registered as a relative!!!")
                		})
                	}

                }
                console.log('sucessfully created entry!!');
                response.send('You have created a profile!');
            });

        
        
    });

module.exports = router;