const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
const { validateCreateOrder } = require("../middleWare/validators");
const router = express.Router();
 
router.route("/order/new").post( isAuthentictedUser, validateCreateOrder, newOrder);
router.route("/order/:id").get(isAuthentictedUser , getSingleOrder);
router.route("/orders/myOrders").get(isAuthentictedUser , myOrders)
router.route("/admin/orders").get(isAuthentictedUser , authorizeRoles("admin") ,getAllOrders);
router.route("/admin/order/:id").put(isAuthentictedUser , authorizeRoles("admin") , updateOrder).delete(isAuthentictedUser, authorizeRoles("admin"), deleteOrder);


module.exports = router;