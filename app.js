if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 3000;
const request = require('request');

app.use(express.urlencoded({ extended:true }));
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.post('/', (req, res)=>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    console.log(req.body.firstName);
})
app.listen(port, ()=>{
    console.log("Server is up and running.");
})