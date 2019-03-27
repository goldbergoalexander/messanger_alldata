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
        "template_type":"generic",
  "elements":[
  //###########################################################  Element for EDR #############################################################################
     {
      "title":"Поиск  в едр ",
      "image_url":"https://raw.githubusercontent.com/goldbergoalexander/messanger_alldata/master/img/edr.jpg?token=ATNMdg6GxOxd65JMMHkGNrPDZ5gNoHlBks5cm0s5wA%3D%3D",
      "subtitle":"меню пошуку в базі юридичних та фізичних осіб-підтприємців України ",
       "buttons":[
	  {
            "type":"postback",
             "title":"Простой",
			 "payload": "simlpe",
          },
          {
                "type": "postback",
                "title": "2 параметра",
                "payload": "twoparam",
          },
		 
          {
			    "type": "postback",
                "title": "3 параметра",
                "payload": "threeparame",
			  
		  }
		  	  
	  
	  ]      
    },
	//###########################################################  Element for car #############################################################################
	{
      "title":"Поиск  в едр 1 ",
      "image_url":"https://raw.githubusercontent.com/goldbergoalexander/messanger_alldata/master/img/search.png?token=ATNMdqOYbC5COFIdjWVpK_tHdjM06jBOks5cm0vAwA%3D%3D",
      "subtitle":"меню пошуку в базі юридичних та фізичних осіб-підтприємців України ",
       "buttons":[
	  {
            "type":"postback",
             "title":"Простой",
			 "payload": "simlpe",
          },
          {
                "type": "postback",
                "title": "2 параметра",
                "payload": "twoparam",
          },
		 
          {
			    "type": "postback",
                "title": "3 параметра",
                "payload": "threeparame",
			  
		  }
	  
	  ]      
    },
	//###########################################################  Element for wheather #############################################################################
    {
      "title":"Поиск  в едр3 ",
      "image_url":"https://github.com/goldbergoalexander/messanger_alldata/blob/master/img/EDR.jpg?raw=true",
      "subtitle":"меню пошуку в базі юридичних та фізичних осіб-підтприємців України ",
       "buttons":[
	  {
            "type":"postback",
             "title":"Простой",
			 "payload": "simlpe",
          },
          {
                "type": "postback",
                "title": "2 параметра",
                "payload": "twoparam",
          },
		 
          {
			    "type": "postback",
                "title": "3 параметра",
                "payload": "threeparame",
			  
		  }
	  
	  ]      
    },
  ]  
  
          
		  /*
		  {
			    "type": "web_url",
                "url": "http://arhitek.xyz/#contactForm",
                "title": "Написать мне"
			  
		  }
		  */
        
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
  