if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 3000;
const request = require('request');
const https = require('https');
const API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.AUDIENCE_ID;
const SERVER_PREFIX = process.env.SERVER_PREFIX;

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: API_KEY,
  server: "us4",
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();

app.use(express.urlencoded({ extended:true }));
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.post('/', (req, res)=>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
        
    };
    async function run() {
        const response = await mailchimp.lists.addListMember(AUDIENCE_ID, {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
          }
        })
        console.log(
            `Successfully added contact as an audience member. The contact's id is ${
              response.id
            }.`
          );
    };
        run();
/*
    var data = {
        members = [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    */
    //var jsonData = JSON.stringify(data);
    //const url = 
   // https.request(url, options, (response)=>{

 //   })
})
app.listen(port, ()=>{
    console.log("Server is up and running.");
})