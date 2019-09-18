const express = require('express');
const Router = express.Router();
const {
  saveUser,
  getUser
} = require('./userModel');

const {
  path
} = require('./utils');
 
Router.post('/login', (req, res) => {
  let userDocument = path(req, ['body', 'userDocument'])
  getUser(userDocument)
    .then((dbRes) => {
      const {
        loginId,
        firstName,
        lastName
      } = dbRes;
      const userData = {
        loginId,
        firstName,
        lastName
      }
      const data = {
        userData
      }
      res.statusCode = 200;
      data.httpStatus = 'SUCCESS';
      data.loginResponseStatus = 'SUCCESS';
      res.json(data);
    })
    .catch((dbErr) => {
      if (dbErr.loginResponseStatus) {
        const data = {...dbErr}
        res.statusCode = 200;
        data.httpStatus = 'SUCCESS';
        res.json(data);
      } else {
        const data = {}
        res.statusCode = 500;
        data.httpStatus = 'FAILURE';
        data.msg = `something went wrong`
        res.json(data);
      }
    })
});

Router.post('/register', (req, res) => {
  let userDocument = path(req, ['body', 'userDocument'])
  saveUser(userDocument)
    .then((dbRes) => {
      const {
        loginId,
        firstName,
        lastName
      } = dbRes;
      const userData = {
        loginId,
        firstName,
        lastName
      }
      const data = {
        userData
      }
      res.statusCode = 200;
      data.httpStatus = 'SUCCESS';
      data.loginResponseStatus = 'SUCCESS';
      data.msg = 'test';
      res.json(data);
    })
    .catch((dbErr) => {
      if (dbErr.name === "MongoError" && dbErr.code === 11000) {
        const data = {}
        res.statusCode = 200;
        data.httpStatus = 'SUCCESS';
        data.loginResponseStatus = 'INVALID_REQUEST';
        data.msg = `${dbErr.keyValue.loginId} already exsits`
        res.json(data);
      } else {
        const data = {}
        res.statusCode = 500;
        data.httpStatus = 'FAILURE';
        data.msg = `something went wrong`
        res.json(data);
      }
  })
});

module.exports = Router