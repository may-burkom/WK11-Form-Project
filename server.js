const express = require('express')
const mongoose  = require('mongoose')

const routes = require('./Routes')

const app = express()

/////////////////////// middleware /////////////////////////////////
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static('css'))

///////////////////// database /////////////////////////////////////
mongoose.connect('mongodb+srv://may831:tempPassword123@smbootcamp2020.dw1al.gcp.mongodb.net/Form_Project?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connection made to database!")
)

//////////////////// routes ///////////////////
app.use(routes)

///////// 404 handling ////////////////////////
app.all('*', function (req, res){
    res.render('404')
})

app.listen(4040, ()=> console.log(`listening at http://localhost:4040`))