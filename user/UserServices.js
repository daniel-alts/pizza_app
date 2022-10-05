const User = require('./User');
const userNotFound = require('./UserNotFound')


const create = async (body) => {
    const { username, email, password } = body;
    await User.create({ username, email, password});
  }


//   const getUsers = async (pagination) => {
//     const { page, size } = pagination;
  
//     const usersWithCount = await User.findAndCountAll({
//       limit: size,
//       offset: page * size,
//       attributes: ['id', 'username', 'email']
//     });
//     return {
//       content: usersWithCount.rows,
//       totalPages: Math.ceil(usersWithCount.count / Number.parseInt(size))
//     };
//   }


  const getUser = async (id) => {
    const user = await User.findOne({
      where: {id: id},
      attributes: ['id', 'username', 'email']
    });
    if(!user) {
      throw new userNotFound();
    }
    return user;
  }
  
  const findByEmail = async (email) => {
    return await User.findOne({where: {email: email}});
  }
  
  module.exports = {
    create,
    // getUsers,
    getUser,
    findByEmail
  }