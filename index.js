'use strict';

// Imports dependencies and set up http server
var PAGE_ACCESS_TOKEN1="EAALRhyvrhYIBAHphZAGs0fnBX7PKaD56n2Xy7Pw4V5uzTsZCX9PlEBZCbxRZCA5n8f1nVS2CpfGzwHqStZBivBvpIeTWQPLJFFxUnyMSYEeKsLzLbgFD3VUJ9CzuwjBsgrO6TyCLRAzfeoZAuxmVsf2KjLZCYomb544GPK1ZCbbE5LRsExSJ8CDT";
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()), // creates express http server
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN1,
  request = require('request');
  
  

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening on 1337'));
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
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "messanger"
    
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

//add functions 

function askTemplate(text){
	
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": `Выберите тип обекта`,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Квартира",
                        "payload":"flat"
                    },
                    {
                        "type":"postback",
                        "title":"Дом",
                        "payload":"house"
                    },
					{
                        "type":"postback",
                        "title":"Гараж",
                        "payload":"garage"
                    }
					
                ]
            }
        }
    }
};

//add persistend menu 
function persistendmenu(text){
return {
  "persistent_menu":[
    {
      "locale":"default",
      "composer_input_disabled": true,
      "call_to_actions":[
        {
          "title":"My Account",
          "type":"nested",
          "call_to_actions":[
            {
              "title":"Pay Bill",
              "type":"postback",
              "payload":"PAYBILL_PAYLOAD"
            },
            {
              "title":"History",
              "type":"postback",
              "payload":"HISTORY_PAYLOAD"
            },
            {
              "title":"Contact Info",
              "type":"postback",
              "payload":"CONTACT_INFO_PAYLOAD"
            }
          ]
        },
        {
          "type":"web_url",
          "title":"Latest News",
          "url":"http://www.messenger.com/",
          "webview_height_ratio":"full"
        }
      ]
    },
    {
      "locale":"zh_CN",
      "composer_input_disabled":false,
      "call_to_actions":[
        {
          "title":"Pay Bill",
          "type":"postback",
          "payload":"PAYBILL_PAYLOAD"
        }
      ]    
    }
  ]
 }
}












// Handles messages events
function handleMessage(sender_psid, received_message) {
let response;
let text = received_message.text;


  // Check if the message contains text
  if (received_message.text) {    
  

    // Create the payload for a basic text message
    //response = {"text": `Привет вы написали мне уведомление: "${received_message.text}". Что Вас интересует?` } //old respose 
	  
	     response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":`Привет Вы написали мне уведомление. Я помогу Вам. Нажмите ниже на интетесующюю Вас Кнопку `,
        "buttons":[
          {
            "type":"web_url",
            "url":"http://arhitek.xyz/#contactForm", //changed domain
            "title":"Напишите Нам"
          },
          {
                "type": "postback",
                "title": "Цены за услуги",
                "payload": "price",
          },
          {
			    "type": "postback",
                "title": "Узнать типы Техпаспортов",
                "payload": "typetech",
			  
		  }
		  /*
		  {
			    "type": "web_url",
                "url": "http://arhitek.xyz/#contactForm",
                "title": "Написать мне"
			  
		  }
		  */
        ]
      }
    }
}
  /*
  response  =
  {"persistent_menu":[
    {
      "locale":"default",
      "composer_input_disabled": true,
      "call_to_actions":[
        {
          "title":"My Account",
          "type":"nested",
          "call_to_actions":[
            {
              "title":"Pay Bill",
              "type":"postback",
              "payload":"PAYBILL_PAYLOAD"
            },
            {
              "title":"History",
              "type":"postback",
              "payload":"HISTORY_PAYLOAD"
            },
            {
              "title":"Contact Info",
              "type":"postback",
              "payload":"CONTACT_INFO_PAYLOAD"
            }
          ]
        },
        {
          "type":"web_url",
          "title":"Latest News",
          "url":"http://www.messenger.com/",
          "webview_height_ratio":"full"
        }
      ]
    },
    {
      "locale":"zh_CN",
      "composer_input_disabled":false,
      "call_to_actions":[
        {
          "title":"Pay Bill",
          "type":"postback",
          "payload":"PAYBILL_PAYLOAD"
        }
      ]    
    }
  ]
 }*/
   
  // console.log(received_message.text);
  //console.log(received_message);
 }

  
  	     
	     

else if (received_message.attachments) {
  
    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
     response = 
	 {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Да!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "Нет!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
   
    }  

 
  // Sends the response message
  
callSendAPI(sender_psid, response)
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
let response;
/*function askTemplate(text){
		  return {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Цена на какой тип обекта Вас интересует?",
        "buttons":[
          {
                "type": "postback",
                "title": "Квартира",
                "payload": "flat",
          },
          {
                "type": "postback",
                "title": "Дом",
                "payload": "house",
          },
          {
			    "type": "postback",
                "title": "Гараж",
                "payload": "garage",
			  
		  },
		  {
			    "type": "postback",
                "title": "Другое",
                "payload": "other",
			  
		  }
        ]
      }
    }
  }
}*/

  
  // Get the payload for the postback
  let payload = received_postback.payload;
  
  //set if paload is price
  if (payload === 'price') {
	  
	  
	  
	  
	  response = askTemplate('Цены');
	  callSendAPI(sender_psid, response);
  
  
  
  }
  

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Спасибо!" }
	callSendAPI(sender_psid, response);
  } else if (payload === 'no') {
    response = { "text": "Ой,Попробуйте отправить другое изображение ." }
	callSendAPI(sender_psid, response);
  }
   else if (payload === 'typetech') {
    response = { "text": "Мы делаем техничесские паспорта на : Квартиры, жылые дома, гаражи, нежылые помещения, складские помещения" }
	callSendAPI(sender_psid, response);
  }
  
  
  //else if (payload === 'price') {
    //response = { "text": "Ой,Попробуйте отправить другое изображение ." }
	//	  }
	  else if (payload === 'flat') {
    response = { "text": "Стоимость изготовления техпаспорта на квартиру варируется от 600-800 грн." }
	callSendAPI(sender_psid, response);
  }
  else if (payload === 'house') {
    response = { "text": "Стоимость изготовления техпаспорта на Дом варируется от 800-1000 грн." }
	callSendAPI(sender_psid, response);
  }
  else if (payload === 'garage') {
    response = { "text": "Стоимость изготовления техпаспорта на гараж варируется от 700-800 грн." }
	callSendAPI(sender_psid, response);
  }
  else if (payload === 'other') {
    response = { "text": "Стоимость изготовления техпаспорта на другое(нежилое помещение, складское помещение) варируется от 800-1000 грн." }
	callSendAPI(sender_psid, response);
  }
  
  // Send the message to acknowledge the postback
  


}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
// Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
 // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN1 },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });

  
}


console.log ("Start working :-)")
