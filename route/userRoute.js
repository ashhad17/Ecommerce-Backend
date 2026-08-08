const express = require("express");

const router = express.Router();
 
    
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, deleteUser, updateUserRole,  } = require("../controller/userConttroler");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
const { validateRegisterUser, validateLoginUser, validateForgotPassword, validateResetPassword, validateUpdatePassword, validateUpdateProfile } = require("../middleWare/validators");

router.route("/register").post(validateRegisterUser, registerUser);
router.route("/login").post(validateLoginUser, loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/reset/:token").put(validateResetPassword, resetPassword);
router.route("/profile").get(isAuthentictedUser , getUserDetails);
router.route("/password/forgot").post(validateForgotPassword, forgotPassword);

router.route("/password/update").put(isAuthentictedUser, validateUpdatePassword, updatePassword);
router.route("/profile/update").put(isAuthentictedUser, validateUpdateProfile, updateProfile);
router.route("/admin/users").get(isAuthentictedUser , authorizeRoles("admin") ,getAllUser);

router.route("/admin/user/:id").get(isAuthentictedUser , authorizeRoles("admin") , getSingleUser).put(isAuthentictedUser , authorizeRoles("admin") , updateUserRole).delete(isAuthentictedUser , authorizeRoles("admin") , deleteUser)

module.exports = router;