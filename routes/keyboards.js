'use strict';
require('dotenv').config();
const axios  = require('axios'),
PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
SEND_API = process.env.SEND_API,
// Imports dependencies and set up http server
express = require('express'),
bodyParser = require('body-parser'),
index = require('../index.js');
  
  
  
  
  /*
  *
  *###########################################################################  main keyboard ###############################################################################
  *
  */
  function mainmenu(){
	  
	  index.response = { 
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
                "title": "поиск в едр",
                "payload": "edrsearch",
          },
		 
          {
			    "type": "postback",
                "title": "поиск авто",
                "payload": "carsearch",
			  
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
  
  
  
  
  module.exports = {mainmenu:mainmenu}
  