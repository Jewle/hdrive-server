const path = require('path')
const express =require('express')
const app = express()
const passport = require('./middleware/passport')

const download = require('./routes/download')
const mongoose =require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mainRoute = require('./routes/main')
const auth = require('./routes/auth')
const public = require('./routes/public')

app.use('/files', express.static(path.join(__dirname,'./files')))
app.use(express.static(__dirname + './files'));
app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(morgan('combined'))


app.use(passport.initialize())

app.use('/api/main', passport.authenticate('jwt',{session:false}), mainRoute)
app.use('/api/auth', auth)
app.use('/api/download',download)


app.use('/public',passport.authenticate('jwt',{session:false}), public)
mongoose.connect('mongodb+srv://art-user123:root123@cluster0.qcqay.mongodb.net/hdrive?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    .then(response=>{
        console.log('Connected ')
        app.listen(5000,()=>{
            console.log('Server is running')
        })
    })
    .catch(error=>{
        console.log('Error!', error)
    })



