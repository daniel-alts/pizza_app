module.exports = class OrderAPI {
  static async createOrder(req, res) {
    const body = req.body;
    const total_price = body.items.reduce((prev, curr) => {
      prev += curr.price;
      return prev;
    }, 0);
    const order = await orderModel.create({
      items: body.items,
      created_at: moment().toDate(),
      total_price,
    });
    return res.json({ status: true, order });
  }
  static async getOrderByID(req, res) {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }
    return res.json({ status: true, order });
  }
  static async getAllOrders(req, res) {
    const { total_price, date, state } = req.query;
    const limitNumber = 5;
    const queryParameter = {};
    if (total_price) {
      queryParameter.total_price = total_price;
    }
    if (date) {
      queryParameter.date = date;
    }
    if (state) {
      queryParameter.state = state;
    }
    const order = orderModel.find().sort(queryParameter);
    const page = req.query.page || 1;
    const skip = (page - 1) * limitNumber;
    const orders = await order.skip(skip);
    return res.json({ status: true, orders });
  }
  static async updateOrder(req, res) {
    const { id } = req.params;
    const { state } = req.body;
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }
    if (state < order.state) {
      return res
        .status(422)
        .json({ status: false, order: null, message: "Invalid operation" });
    }
    order.state = state;
    await order.save();
    return res.json({ status: true, order });
  }
  static async deleteOrder(req, res) {
    const { id } = req.params;
    const order = await orderModel.deleteOne({ _id: id });
    return res.json({ status: true, order });
  }
};
