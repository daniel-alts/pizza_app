class responseHandler {
	constructor(res, data, statusCode) {
		this.data = data;

		res.status(statusCode).json({
			status: 'success',
			data: this.data,
		});
	}
}
module.exports = responseHandler;
