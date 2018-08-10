var express = require('express');
var router = express.Router();
var users = [];


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/createUser',function(req, res) {
    console.log("1 hello g");

    req.checkBody('name').notEmpty();
    req.checkBody('email').notEmpty().isEmail;
    req.checkBody('password').notEmpty();

    var error = req.validationErrors();
    console.log("hello g");
    if (error) {
        console.log(error);
        res.json({ status: 500, message: 'Error Occured' + error });
    }

    var userData = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    };
    users.push(userData);
    res.json({status: 200, message: ' User added Successfully'+ userData});
});


router.post('/deleteUser', function (req,res) {

    req.checkBody('name').notEmpty();

    var error = req.validationErrors();

    if (error) {
        console.log(error);
        res.json({ status: 500, message: 'Error Occured' + error });
    }
    users.forEach(function(element,i) {
        if (element.name == req.body.name) {
            users.splice(i,1);
            res.json({status: 200, message: ' User Deleted Successfully'});
        }
    });
    res.json({ status: 500, message: 'user not found' });
});


router.post('/getUser', function (req,res) {

    req.checkBody('name').notEmpty();

    var error = req.validationErrors();

    if (error) {
        console.log(error);
        res.json({status: 500, message: 'Error Occured' + error});
    }
        users.forEach(function (element, i) {
        if (element.name == req.body.name) {
            res.json({status: 200, message: 'Requested User Data => ' + JSON.stringify(element)});
        }
    });
    res.json({ status: 500, message: 'user not found' });
});

router.get('/getAllUsers', function (req,res) {
    res.json({status: 200, message: ' User Data => ' + JSON.stringify(users)});
});



module.exports = router;
