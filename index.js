'use strict';
require('dotenv').config();
const axios  = require('axios'),
PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
SEND_API = process.env.SEND_API,
keyboards = require('./routes/keyboards.js');


// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 8989, () => console.log('webhook is listening on 8989' ));

//handle messages
function handleMessage(sender_psid, received_message) {
    // check if the input is text message
    // users might send smiley which can be filtered out
    if(typeof received_message.text !== "undefined") {
        let message = received_message.text.toLowerCase();
        callSendAPI(sender_psid, { text: message });
    }    
}
//handle messages
/**
 * Calls the Messenger API to send the message
 */
function callSendAPI(psid, message) {
    let data = { 
        "recipient": { "id": psid }, 
        "message": message 
    };
    return axios({
        method: 'POST',
        url: SEND_API,
        params: { access_token: PAGE_ACCESS_TOKEN },
        data: data
    })
    .catch((error) => {
        if (error.response) {
            console.log('PSID: ', psid);
            console.log('Status code: ', error.response.status);
            console.log('Response: ', error.response.data);
        } else if (error.request) {
            console.log('Request: ', error.request); 
        } else {
            console.log('Error: ', error.message);
        }
    });
}
/**
*
* handle message if say "hallo"
*ssdsdsd
*/
function handleMessage(sender_psid, received_message) {
let text = received_message.text;
let response;  
 if (received_message.text==="hello") {
	  	   response = { "text": "Привет, Вы обратились на страницу AllDataBot" + '\n' + "Чтобы узнать что я могу введи help или помощь" }

}
 else if (received_message.text==="помощь" || received_message.text==="help" ) {
	  	   response = { "text": "Привет AllDataBot может : " 
		   + '\n' + "- # - поиск юридичесских лиц по названию, коду ЕДРПО, поиск бенифициаров, поиск по нескольким параметрам - # -" 
		   + '\n' + "- # - поиск автомобилей, по номеру , поиск по номеру техпаспорта- # -"	   
		   
		   }

}
 //##########################################  show keyboard ############################################################
   else {
  keyboards.mainmenu();
   }
  //##########################################  show keyboard ############################################################

callSendAPI(sender_psid, response);
}
/**
*
* handle message if say "hallo"
*
*/

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
	  // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);
// Check if the event is a message or postback and
  // pass the event to the appropriate handler function
  if (webhook_event.message) {
    handleMessage(sender_psid, webhook_event.message);        
  } else if (webhook_event.postback) {
    handlePostback(sender_psid, webhook_event.postback);
  }
	  
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});
// Adds support for GET requests to our webhook
// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

module.exports = {response};