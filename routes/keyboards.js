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
            "url":"https://scontent.fiev21-1.fna.fbcdn.net/v/t1.0-9/49375917_874307449627689_2650600686898642944_n.jpg?_nc_cat=105&_nc_ht=scontent.fiev21-1.fna&oh=d14a2826aef4891dd02a791219144008&oe=5D0F3F23", //changed domain
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
  