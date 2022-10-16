const User = require('../resources/user/user.model')
const path = require('path')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
dotenv.config({ path: path.join(__dirname, '../config/.env')})

// Protect Route with Basic authentication
// const protectRoute = async (
// 	req,
// 	res,
// 	next,
// ) => {
// 	const header = req.headers
//     //protecting route from auth.js
// 	if (!header.authorization) {
// 		return res
// 			.status(403)
// 			.send({ message: 'Forbidden' })
// 	}
// 	let token =
// 		header.authorization.split(
// 			'Basic ',
// 		)[1]
// 	if (!token) {
// 		return res.status(401).end()
// 	}

// 	try {
// 		const decoded = Buffer.from(
// 			token,
// 			'base64',
// 		).toString('ascii')
// 		const [username, password] =
// 			decoded.split(':')
// 		const authenticatedUser =
// 			await User.findOne({ username })
// 		const match =
// 			await authenticatedUser.comparePassword(
// 				password,
// 			)
// 		if (match) {
// 			req.authenticatedUser = {
// 				username:
// 					authenticatedUser.username,
// 				role: authenticatedUser.user_type,
// 			}
// 		}else {
// 			return res.status(401).send({message: "unauthorised access"})
// 		}
// 		next()

// 	} catch (err) {
// 		// console.log('Forbidden')
// 		console.log(err)
// 		// return res
// 		// 	.status(401)
// 		// 	.send({ message: 'forbidden' })
// 		next(err)
// 	}
// }

// Signup for basic authentication
// const signUp = async (req, res) => {
// 	const body = req.body
// 	if (!body.username || !body.password) {
// 		return res.status(400).send({
// 			success: false,
// 			error: {
// 				message:
// 					'email and password required',
// 			},
// 		})
// 	}
// 	try {
// 		const user = await User.create(body)
// 		const createdUser = {
// 			username: user.username,
// 			user_type: user.user_type,
// 		}
// 		console.log(createdUser)
// 		return res
// 			.status(201)
// 			.json({ data: createdUser })
// 	} catch (err) {
// 		console.log(err)
// 		res.status(400).send({
// 			message: 'unable to create user',
// 		})
// 	}
// }

// Protect Route with token authentication(jwt)
const newToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.SECRET,
    { expiresIn: 10000 }
  )
}

const verifyToken = (token) => {
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.SECRET,
      (err, payload) => {
        if (err) return reject(err)
        return resolve(payload)
      }
    )
  })
}

// const getTokenFrom = (req, res) => {
//   const authorization = req.get(
//     'authorization'
//   )
//   if (
//     authorization &&
//     authorization
//       .toLowerCase()
//       .startsWith('bearer ')
//   ) {
//     return authorization.split(
//       'bearer '
//     )[1]
//   }
//   return null
// }

const protectRoute = async (
  req,
  res,
  next
) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }
  let token =
    req.headers.authorization.split(
      'Bearer '
    )[1]
	console.log(token)
  if (!token) {
    return res.status(401).end()
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET)
	console.log(payload)
    const user = await User.findById(
      payload.id
    )
	console.log(user)
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

// Signup using token authentication with jwt
const signUp = async (req, res) => {
  const body = req.body
  if (
    !body.username ||
    !body.password
  ) {
    return res.status(400).send({
      success: false,
      error: {
        message:
          'email and password required'
      }
    })
  }

  const {
    username,
    password,
    user_type
  } = body
  try {
    const notUniqueUser =
      await User.findOne({ username })
    if (notUniqueUser) {
      return res.status(400).send({
        message: 'User already exists'
      })
    }
    const newUser = new User({
      username,
      password,
      user_type
    })

    await newUser.save()

    const token = newToken(newUser)
    return res
      .status(200)
      .json({ data: token })
  } catch (err) {
    res.status(500).send({
      message: 'unable to create user'
    })
  }
}

const signIn = async (req, res, next) => {
  try {
    const { username, password } =
      req.body

    const user = await User.findOne({
      username
    })
    const passwordCorrect =
      user === null
        ? false
        : await user.comparePassword(
            password
          )

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error:
          'invalid username or password'
      })
    }
    const userForToken = {
      username: user.username,
      id: user.id,
      user_type: user.user_type
    }


    const token = jwt.sign(
      userForToken,
      process.env.SECRET
    )

    res.status(200).send({
      token,
      username: user.username
    })
  } catch (err) {
	next(err)
    // res.status(500).send({
    //   message: 'server error'
    // })
  }
}

module.exports = {
  protectRoute,
  signUp,
  signIn
  //   getTokenFrom
}
