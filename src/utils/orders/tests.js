require('dotenv').config();


//Returns true if the state property of each record in the collection matches what was specfied in the queryparams.     
const validateState = (records, query) => {
    let validated = true;
    for (const record of records) {
        if (record.state != query.state) {
            validated = false;
            return validated;
        }
    }
    return validated;
}

//Returns true if sorting was done in the order specified.
const validateQueryResult = (records, orderBy, sortBy) => {
    let min;
    let max;
    if (sortBy == '') {
        min = records[0][orderBy];
        max = records[records.length - 1][orderBy];
        if (min < max) {
            return true;
        }
    } else if (sortBy == 'desc') {
        min = records[records.length - 1][orderBy];
        max = records[0];
        if (max > min) {
            return true;
        }
    }         
}

//Validate that number of records in the collection returned is less than or equal to pagination limit
const validatePagination = record => {
    const ORDER_PAGE_LIMIT = process.env.ORDER_PAGE_LIMIT
    if (record.length <= ORDER_PAGE_LIMIT) {
        return true;
    }
}

module.exports = {
    validateState,
    validateQueryResult,
    validatePagination,
}