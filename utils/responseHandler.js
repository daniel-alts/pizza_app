class responseHandler {
	constructor(res, data, statusCode, TOKEN) {
		this.data = data;
		this.TOKEN = TOKEN;
		res.status(statusCode).json({
			length: data.length,
			status: 'success',
			TOKEN: this.TOKEN,
			data: this.data,
		});
	}
}
module.exports = responseHandler;
