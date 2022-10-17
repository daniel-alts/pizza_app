const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const router = express.Router()

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
	res.json({
		message: 'Signup successful',
		user: req.user
	})
	next()
})

router.post('/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err){
				return next(err)
			}
			if(!user) {
				const err = new Error('Invalid username or password')
				return next(err)
			}
			req.login(user, { session: false },
					async (err) => {
				if (err){
					return next(err)
				}
				const body = { _id: user.id, email: user.email }

				const token = jwt.sign({ user: body }, process.env.JWT_SECRET)

						return res.json({ token })
					})
		}catch (err){
			return next(err)
		}
	})(req, res, next)
})

module.exports = router