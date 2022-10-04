

function deleteUnrequiredProperty(user, props) {
    const userObject = user.toJSON();
    for (const prop of props) {
        if (userObject.hasOwnProperty(prop)) {
            console.log('Working');
            delete userObject[prop];
        }
    }
    return userObject;
}


module.exports = {
    deleteUnrequiredProperty,
}