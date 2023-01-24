const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors')
dotenv.config();
const port = process.env.PORT
const app = express()
const userAccount=require("./routes/userAccount")
app.use(cors())
app.use('/', userAccount)
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log("Connected to MongoDB")
    if (err) {
        console.log(err)
    } else {
        app.listen(process.env.PORT || port, () => { console.log(`Your server is running on ${port}....`) })
    }
});

