const fs = require('fs');
import {APIPath } from '../configuration';
const controller = require('./controller')
const app = require('express').Router();
app.put(APIPath + '/search', controller.search);
  
  
  
  app.get(APIPath, controller.getTickets);
  
  app.post(APIPath, controller.postTitle);

module.exports = app;