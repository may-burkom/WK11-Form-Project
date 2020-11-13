const express = require('express')
const router = express.Router()

const User = require('./model/User')

router.get('/', function(req, res){
    res.render('home', {newUser:"", notFound:""})
})

router.get('/findusers', function(req, res){
    User.find({name: req.query.user})
        .then(function(userArr){
            if(userArr.length > 0){
                res.render('users', {foundUser: userArr[0]})
            } else{
                res.render('home', {newUser:"", notFound: "User not found."})
            }
        })
        .catch((err) => console.log(err))
})

router.post('/save', function(req, res){
    let newUser = new User({
        name: req.body.name,
        password: req.body.password
    })
    newUser.save()
        .then(function(savedUser){
            res.render('home', {newUser:`${savedUser.name} added successfully!`, notFound:""})
        })
        .catch((err) => console.log(err))
})

router.delete('/delete/:id', function(req, res){
    User.findByIdAndDelete(req.params.id, (dltUser)=> console.log(dltUser))
})

module.exports = router