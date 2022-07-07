const express = require("express");
const {
  register,
  login,
  followUser,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getMyPosts,
  getUserPosts,
} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/follow/:id", isAuthenticated, followUser);

router.get("/logout", logout);

router.put("/update/password", isAuthenticated, updatePassword);

router.put("/update/profile", isAuthenticated, updateProfile);

router.delete("/delete/me", isAuthenticated, deleteMyProfile);

router.get("/me", isAuthenticated, myProfile);

router.get("/user/:id", isAuthenticated, getUserProfile);

router.get("/users", isAuthenticated, getAllUsers);

router.post("/forgot/password", forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.get("/my/posts", isAuthenticated, getMyPosts);

router.get("/userposts/:id", isAuthenticated, getUserPosts);

module.exports = router;
