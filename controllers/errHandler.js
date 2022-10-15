const errorHandler = (error, req, res, next) => {
    try {
        if (error.name === "CastError") {
            return res
                .status(400)
                .send({ error: "Unable to find order with provided ID" });
        }
        return res.status(500).send({ error: "Error occured" });
    } catch (error) {
        res.status(400).json({ error: true, message: "Order not to found" });
    }
};

module.exports = errorHandler;