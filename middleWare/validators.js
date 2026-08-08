const { body, param, query, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }
  next();
};

const validateRegisterUser = [
  body("name").trim().isLength({ min: 4, max: 30 }).withMessage("Name must be between 4 and 30 characters"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  handleValidationErrors,
];

const validateLoginUser = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

const validateForgotPassword = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  handleValidationErrors,
];

const validateResetPassword = [
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("confirmPassword").isLength({ min: 8 }).withMessage("Confirm password must be at least 8 characters"),
  handleValidationErrors,
];

const validateUpdatePassword = [
  body("oldPassword").notEmpty().withMessage("Old password is required"),
  body("newPassword").isLength({ min: 8 }).withMessage("New password must be at least 8 characters"),
  body("confirmPassword").isLength({ min: 8 }).withMessage("Confirm password must be at least 8 characters"),
  handleValidationErrors,
];

const validateUpdateProfile = [
  body("name").optional().trim().isLength({ min: 4, max: 30 }).withMessage("Name must be between 4 and 30 characters"),
  body("email").optional().isEmail().withMessage("Please enter a valid email"),
  handleValidationErrors,
];

const validateCreateProduct = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Product description is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  body("info").notEmpty().withMessage("Product info is required"),
  body("category").notEmpty().withMessage("Product category is required"),
  body("Stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  handleValidationErrors,
];

const validateCreateReview = [
  body("productId").notEmpty().withMessage("Product ID is required"),
  body("ratings").isInt({ min: 1, max: 5 }).withMessage("Ratings must be between 1 and 5"),
  body("comment").notEmpty().withMessage("Comment is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("recommend").optional().isBoolean().withMessage("Recommend must be a boolean"),
  handleValidationErrors,
];

const validateCreateOrder = [
  body("shippingInfo.firstName").notEmpty().withMessage("Shipping first name is required"),
  body("shippingInfo.lastName").notEmpty().withMessage("Shipping last name is required"),
  body("shippingInfo.address").notEmpty().withMessage("Shipping address is required"),
  body("shippingInfo.city").notEmpty().withMessage("Shipping city is required"),
  body("shippingInfo.state").notEmpty().withMessage("Shipping state is required"),
  body("shippingInfo.country").notEmpty().withMessage("Shipping country is required"),
  body("shippingInfo.pinCode").notEmpty().withMessage("Shipping pin code is required"),
  body("shippingInfo.phoneNo").notEmpty().withMessage("Shipping phone number is required"),
  body("shippingInfo.email").isEmail().withMessage("Shipping email must be valid"),
  body("orderItems").isArray({ min: 1 }).withMessage("At least one order item is required"),
  body("paymentInfo.id").notEmpty().withMessage("Payment ID is required"),
  body("paymentInfo.status").notEmpty().withMessage("Payment status is required"),
  body("itemsPrice").isFloat({ gt: 0 }).withMessage("Items price must be greater than 0"),
  body("totalPrice").isFloat({ gt: 0 }).withMessage("Total price must be greater than 0"),
  handleValidationErrors,
];

const validatePaymentProcess = [
  body("amount").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
  handleValidationErrors,
];

module.exports = {
  validateRegisterUser,
  validateLoginUser,
  validateForgotPassword,
  validateResetPassword,
  validateUpdatePassword,
  validateUpdateProfile,
  validateCreateProduct,
  validateCreateReview,
  validateCreateOrder,
  validatePaymentProcess,
};
