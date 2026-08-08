const express  = require("express");
const router  = express.Router();

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, getProductReviews, deleteReview, createProductReview, getAllProductsAdmin} = require("../controller/productController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
const { validateCreateProduct, validateCreateReview } = require("../middleWare/validators");
 
 

router.route("/product").get(getAllProducts)
router.route("/admin/product/new").post(isAuthentictedUser, authorizeRoles("admin"), validateCreateProduct, createProduct);
router.route("/admin/products").get(isAuthentictedUser , authorizeRoles("admin") , getAllProductsAdmin)
router.route("/admin/product/:id") 
.put(isAuthentictedUser, authorizeRoles("admin"), updateProduct)
.delete(isAuthentictedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review/new").put(isAuthentictedUser, validateCreateReview, createProductReview);
router.route("/reviews").get(getProductReviews) 
router.route("/product/reviews/delete").delete(isAuthentictedUser , authorizeRoles("admin") ,deleteReview);
module.exports = router  