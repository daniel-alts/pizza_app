const user = require('../model/userModel')
const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { authenticateuser } = require('../auth/authenticate');

exports.getAllusers = async (req, res) => {
    try {
        await authenticateuser(req, res);
        const users = await user.find();
        res.status(200).json({
            status: 'success',
            data: {
                users,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user.findById(id);
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newuser = await user.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json({
            status: 'success',
            data: {
                newuser,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        await authenticateuser(req, res);
        const updateduser = await user.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            updateduser,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.loginUser = async (req,res, next) =>{
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }

            if (!user) return next('Username or Password is Incorrect');

            req.login(user, { session: false }, async (err) => {
                if (err) return next(err);

                const body = { _id: user._id, email: user.email };

                const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });

                return res.status(201).json({
                    token,
                });
            });
        } catch (err) {
            return next(err);
        }
    })(req, res, next);
};

exports.signupUser = async (req,res)=>{
    passport.authenticate('signup', { session: false }),
    (req, res) => {
        res.redirect('/login');
    }
}