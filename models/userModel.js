const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");

// defining the number of rounds for the salt to be generated to hash the password
const saltRounds = 10;

const User = (sequelize) => {
  const user = sequelize.define(
    "User",
    {
      // Model attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        trim: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM,
        values: ["user", "admin"],
        defaultValue: "user",
      },
    },
    {
      timestamps: true,
    },
    {
      tableName: "users",
    }
  );

  // Defining a custom method to check if the password is correct
  function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
  user.prototype.checkPassword = checkPassword;

  // Defining a hook to automatically hash the password before saving it to the database
  user.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    // user.passwordConfirm = undefined;
  });

  user.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
      user.passwordConfirm = undefined;
    }
  });

  return user;
};

module.exports = User;
