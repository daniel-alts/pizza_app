const user = (req, res) => {
    return res.json({ message: 'List of users here' })
}

//throwaway login route
const login = (req, res) => {

    return res.json({ message: 'Logged In' })

}

//signup route to create new user without validations
const signup = async(req, res) => {
    const user = await userModel.create(req.body)
    return res.status(200).json({ user: user, message: 'User successfully signed up' })

}



module.exports = { user, login, signup };