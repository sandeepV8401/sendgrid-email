

const express = require('express'); //needed to launch server
const cors = require('cors'); //needed to disable sendgrid security
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails 

const app = express(); //alias from the express function

//sendgrid api key
sgMail.setApiKey('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');

app.use(cors()); //utilize Cors so the browser doesn't restrict data, without it Sendgrid will not send!

// Welcome page of the express server: 
app.get('/', (req, res) => {
    res.send("Welcome to the Sendgrid Emailing Server"); 
});

app.get('/send-email', (req,res) => {
    
    //Get Variables from query string in the search bar
    const { recipient, sender, topic, text } = req.query; 

    //Sendgrid Data Requirements
    const msg = {
        to: recipient, 
        from: sender,
        subject: topic,
        text: text,
    }

    //Send Email
    sgMail.send(msg)
    .then((msg) => console.log(text))
    .catch((error) => {
        console.error(error)
      })
   
});


app.listen(4000, () => console.log("Running on Port 4000")); 

