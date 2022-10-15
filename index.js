const express = require("express");
const cookieParser = require('cookie-parser');
const moment = require("moment");
const mongoose = require("mongoose");
const orderModel = require("./orderModel");
const dotEnv = require("dotenv");
const jwt = require('jsonwebtoken');
const {promisify} = require('util') 
const passport = require('passport');
const User = require("./usermodel");
const passport_localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt



dotEnv.config({ path: "./config.env" });

const PORT = 3334;
// const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(cookieParser())

const signToken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRES

})

}

const sendToken = (newUser, res) => {
  const token = signToken(newUser.id)

  //Date for cookie to disappear from the browser
  const cookieOptions = {
    expires: new Date (Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), 
    httpOnly: true,
} 
res.cookie('jwt', token, cookieOptions)
}

// Passport_LocalStrategy SIgn Up Route
passport.use('signup', new passport_localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, 
async(req, username, password, done) => {
  try {
    const {user_Type} = req.body.user_Type || 'user'
    const user =  await User.create({
      username, password
    })
    return done(null, user)
  }
  catch (err){
    done(err)

  }
}))

passport.use('login', new passport_localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, 
async(req, username, password, done) => {
  try {
    const user = await User.findOne({username})
    if (!user || (! await user.comparePasswords(password, user.password))){
      return done(null, false, {message: 'Username or Password Incorrect!'})
    }
    return done (null, user, {message: 'Login Success'})
  }
  catch (err){
    done(err)

  }
}))


passport.use(
  new JWTstrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
  },
  async (token, done) => {
 
    try {
      return done(null, token.user)
    }
    catch (error) {
      return done (error)
    }
  }
  )
 
)


app.post('/signup', passport.authenticate('signup',{session:false}),
async(req, res, next) =>{
  res.json({
    ststus: 'Success',
    message: 'Login Successful',
    user: req.user
  })
})

app.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('Error!')
        return next (error)
      }
      req.login(
        user, {session : false},
        async (error) => {
          if (error) return next (error)
          const body = {_id:user.id}
          const token = jwt.sign({user: body}, process.env.JWT_SECRET)
          res.json({token})
        }
      )
    }
    catch (error){
      return next(error)
    } 
  })(req, res, next)
  }
)



app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.post("/order", async (req, res) => {
  const body = req.body;
  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const order = await orderModel.create({
    items: body.items,
    created_at: moment().toDate(),
    total_price,
    state: req.body.state
  });

  return res.json({ 
    status: true, 
    order, token: req.query.secret_token
  });
});

app.get("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

app.get("/orders", async (req, res) => {
  const orders = await orderModel.find();

  return res.json({ status: true, orders });
});

app.get('/orders/:sort?', async (req, res) => {
  const queryObj = { ...req.query }
  const excludedFields = ['page', 'sort', 'limit', 'fields']
  excludedFields.forEach((el) => delete queryObj[el])

  const { sort } = req.params

  let query = orderModel.find(queryObj)
  if (sort) {
    query = query.sort(sort)
  }
  const page = req.query.page * 1 || 1
  const limit = req.query.limit * 1 || 5
  const skip = (page - 1) * limit

  query = query.skip(skip).limit(limit)
  const orders = await query

  return res.json({
    status: true,
    results: orders.length,
    orders,
  })
})

app.patch("/order/:id", async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = await orderModel.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: "Invalid operation" });
  }

  order.state = state;

  await order.save();

  return res.json({ status: true, order });
});

app.delete("/order/:id", async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

mongoose.connect(process.env.DATABASE_LOCAL);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

console.log(process.env.NODE_ENV);
