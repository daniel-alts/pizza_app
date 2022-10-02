const errorHandler = (error, req, res, next) => {
    if (error.name === "CastError") {
        return res
            .status(400)
            .send({ error: "Unable to find order with provided ID" });
    }
    return res.status(500).send({ error: "Error occured" });
};

module.exports = errorHandler;