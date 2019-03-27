'use strict';
require('dotenv').config();
const axios  = require('axios'),
PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
SEND_API = process.env.SEND_API,
// Imports dependencies and set up http server
express = require('express'),
bodyParser = require('body-parser');

  
  
  
  
  /*
  *
  *###########################################################################  main keyboard ###############################################################################
  *
  */
  function mainmenu(){
	
	return { 
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
       "text" : "я не понимаю слов пользуйтесь клавиатурой ниже \ud83d\udc47",
        "buttons":[
		
          {
            "type":"postback",
             "title":"помощь/help",
			 "payload": "help",
          },
          {
                "type": "postback",
                "title": "Сервисы",
                "payload": "services",
          },
		 
          {
			    "type": "postback",
                "title": "про AllDataBot",
                "payload": "about",
			  
		  }
		 
		 ]
      }
    }
}
  }
/*
  *
  *###########################################################################  main keyboard ###############################################################################
  *
  */
  /*
  *
  *###########################################################################  Services keyboard ###############################################################################
  *ывывыв
  */
  function services(){
  return { "attachment":{
      "type":"template",
      "payload":{
        "template_type":"media",
          "elements":[
          {
            "media_type":"image",
            "buttons":[
		  {
            "type":"postback",
             "title":"простой поиск ЕДР",
			 "payload": "simle",
          },
          {
                "type": "postback",
                "title": "2 параметра",
                "payload": "twoparam",
          },
		 
          {
			    "type": "postback",
                "title": "3 параметра",
                "payload": "threeparam",
			  
		  }		 
		 
		 ]
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
 }
  /*
  *
  *###########################################################################  Services keyboard ###############################################################################
  *
  */
  
  
  
  
  
  
  module.exports = {
	  mainmenu:mainmenu,
	  services:services
	  
	  
	  }
  