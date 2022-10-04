const moment = require('moment');

const timestamps = (schema) => {
    //Add create and update time to the schema
    schema.add({
        createdAt: Date,
        updatedAt: Date
    });

    //Set time created/updated on each save.
    schema.pre('save', function(next) {
        this.updatedAt = moment().toDate();

        //Run only at the initialization of the current record
        if (!this.createdAt) {
            this.createdAt = moment().toDate();
        }
        next();
    })
}



module.exports = timestamps;