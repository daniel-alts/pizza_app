const passport = require('passport');
const { Strategy } = require('passport-local');

const localStrategy = require('./localStrategy');
const jwtstrategy = require('./jwtstrategy');

const passportConfig = () => {
    localStrategy();
    jwtstrategy();
};

module.exports = passportConfig;