const express = require('express')
const mongoose  = require('mongoose')
const multer = require('multer')

const User = require('./model/User')
const port = 4040

const app = express()
const upload = multer()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(upload.array());
app.use(express.json());

app.use(express.static('css'))

mongoose.connect('mongodb+srv://may831:tempPassword123@smbootcamp2020.dw1al.gcp.mongodb.net/Form_Project?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, 
    function(err, database){
        if(err){
            throw err
        }
        console.log("Connection made to database!")
    }
)

app.get('/', function(req, res){
    res.render('home', {newUser:"", notFound:""})
})

app.get('/findusers', function(req, res){
    let searchName = req.query.user
    console.log(searchName)
    User.find({name: searchName})
        .then(function(user){
            console.log(user)
            if(user.length > 0){
                res.render('users', {fUser: user})
            } else{
                res.render('home', {newUser:"", notFound: "User not found."})
            }
        })
        .catch(function(error){
            console.log(error)
            res.send(error)
        })
})

app.post('/save', function(req, res){
    console.log(req.body)
    let newUser = new User({
        name: req.body.name,
        password: req.body.password
    })
    
    newUser.save()
        .then(function(savedUser){
            console.log(savedUser)
            res.render('home', {newUser:`${savedUser.name} added successfully!`, notFound:""})
        })
        .catch(function(err){
            console.log(err)
        })
})

app.delete('/delete/:id', function(req, res) {
    console.log("DELETE ROUTE hit")
    console.log(req.params.id) 

    User.findByIdAndDelete(req.params.id)
        .then(function(x) {
            console.log("User deleted:")
            console.log(x)
        })
        .catch(function(err) {
            console.log(err)
            res.send(err)
        })
    
});

app.listen(port, function(){
    console.log(`listening at http://localhost:${port}`)
})

