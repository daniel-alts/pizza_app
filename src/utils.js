

function deleteUnrequiredProperty(obj, ...props) {
    for (const prop of props) {
        if (obj.hasOwnProperty) {
            delete obj.prop;
        }
    }
}


module.exports = {
    deleteUnrequiredProperty,
}