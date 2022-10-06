const router = require('express').Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");


router.post("/:email/:password",auth.userAuthenticated, orderController.createOrder);
router.get("/:id/:email/:password",auth.userAuthenticated,orderController.getOrder);
router.get("/:email/:password",auth.adminAuthenticated, orderController.allOrder);
router.put("/:id/:email/:password",auth.adminAuthenticated, orderController.updateOrder);
router.delete("/:id/:email/:password",auth.adminAuthenticated, orderController.deleteOrder);


module.exports = router