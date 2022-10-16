const passport = require('passport');
const { Strategy } = require('passport-local');

const localStrategy = require('./localStrategy');
const jwtStrategy = require('./jwtStrategy');

const passportConfig = () => {
  localStrategy();
  jwtStrategy();
};

module.exports = passportConfig;
