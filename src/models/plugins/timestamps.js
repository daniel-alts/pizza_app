const timestamps = (schema) => {
    //Add create and update time to the schema
    schema.add({
        createdAt: Date,
        updatedAt: Date
    });

    //Set create and update time to now
    schema.pre('save', function(next) {
        this.updatedAt = Date.now();

        //Run only at the initialization of the current record
        if (!this.createdAt) {
            this.createdAt = Date.now();
        }
        next();
    })

}



module.exports = timestamps;