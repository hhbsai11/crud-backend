// import cors from "cors";


const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser')
const path = require('path');


const  connectDB = require('./server/database/connection')
const app = express();

// app.use(cors())


dotenv.config({path : 'config.env'})
const PORT=process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

//mongo conn:-
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

// set view engine
app.set("view engine","ejs")
// app.set('views', path.resolve(__dirname,"views/ejs"))


//load assests
app.use('/css',express.static(path.resolve(__dirname,"assests/css")))
app.use('/img',express.static(path.resolve(__dirname,"assests/img")))
app.use('/js',express.static(path.resolve(__dirname,"assests/js")))


// load routers
app.use('/',require('./server/routes/router'))





app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)})